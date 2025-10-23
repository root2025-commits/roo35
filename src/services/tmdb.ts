import { BASE_URL, API_OPTIONS } from "/src/config/api.ts";
import { apiService } from "/src/services/api.ts";
import { contentFilterService } from "/src/services/contentFilter.ts";
class TMDBService {
  FRESH_CONTENT_CACHE_DURATION = 30 * 60 * 1e3;
  // 30 minutes for fresh content
  DETAILS_CACHE_DURATION = 60 * 60 * 1e3;
  // 1 hour for details
  async fetchData(endpoint, useCache = true) {
    if (endpoint.includes("/popular") || endpoint.includes("/trending") || endpoint.includes("/now_playing")) {
      return this.fetchWithFreshCache(endpoint, useCache);
    }
    return apiService.fetchWithCache(endpoint, useCache);
  }
  async fetchWithFreshCache(endpoint, useCache = true) {
    const cacheKey = `fresh_${endpoint}`;
    if (useCache) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const isExpired = Date.now() - timestamp > this.FRESH_CONTENT_CACHE_DURATION;
          if (!isExpired) {
            return data;
          }
        } catch (error) {
          localStorage.removeItem(cacheKey);
        }
      }
    }
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS);
      if (!response.ok) {
        if (response.status === 404 && endpoint.includes("/videos")) {
          console.warn(`Videos not found for endpoint: ${endpoint}`);
          return { results: [] };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (useCache) {
        localStorage.setItem(cacheKey, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      }
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      if (endpoint.includes("/videos")) {
        return { results: [] };
      }
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { data } = JSON.parse(cached);
          console.warn(`Using expired cache for ${endpoint}`);
          return data;
        } catch (parseError) {
          localStorage.removeItem(cacheKey);
        }
      }
      throw error;
    }
  }
  // Enhanced video fetching with better filtering
  async getVideosWithFallback(endpoint) {
    try {
      try {
        const spanishVideos = await this.fetchData(`${endpoint}?language=es-ES`);
        if (spanishVideos.results && spanishVideos.results.length > 0) {
          const spanishTrailers = spanishVideos.results.filter(
            (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
          );
          if (spanishTrailers.length === 0) {
            try {
              const englishVideos = await this.fetchData(`${endpoint}?language=en-US`);
              const englishTrailers = englishVideos.results.filter(
                (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
              );
              return {
                results: [...spanishVideos.results, ...englishTrailers]
              };
            } catch (englishError) {
              return spanishVideos;
            }
          }
          return spanishVideos;
        }
      } catch (spanishError) {
        console.warn("Spanish videos not available, trying English");
      }
      try {
        const englishVideos = await this.fetchData(`${endpoint}?language=en-US`);
        return englishVideos;
      } catch (englishError) {
        console.warn("English videos not available either");
        return { results: [] };
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      return { results: [] };
    }
  }
  // Movies
  async getPopularMovies(page = 1) {
    const [spanishResults, englishResults] = await Promise.all([
      this.fetchData(`/movie/popular?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/movie/popular?language=en-US&page=${page}&region=US`, page === 1)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (movie) => !spanishResults.results.some((spanishMovie) => spanishMovie.id === movie.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  async getTopRatedMovies(page = 1) {
    const [spanishResults, englishResults] = await Promise.all([
      this.fetchData(`/movie/top_rated?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/movie/top_rated?language=en-US&page=${page}&region=US`, page === 1)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (movie) => !spanishResults.results.some((spanishMovie) => spanishMovie.id === movie.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  async getUpcomingMovies(page = 1) {
    const [spanishResults, englishResults, nowPlayingResults] = await Promise.all([
      this.fetchData(`/movie/upcoming?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/movie/upcoming?language=en-US&page=${page}&region=US`, page === 1),
      this.fetchData(`/movie/now_playing?language=es-ES&page=${page}&region=ES`, page === 1)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (movie) => !spanishResults.results.some((spanishMovie) => spanishMovie.id === movie.id)
      ),
      ...nowPlayingResults.results.filter(
        (movie) => !spanishResults.results.some((spanishMovie) => spanishMovie.id === movie.id) && !englishResults.results.some((englishMovie) => englishMovie.id === movie.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  // Add method to get now playing movies
  async getNowPlayingMovies(page = 1) {
    const [spanishResults, englishResults] = await Promise.all([
      this.fetchData(`/movie/now_playing?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/movie/now_playing?language=en-US&page=${page}&region=US`, page === 1)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (movie) => !spanishResults.results.some((spanishMovie) => spanishMovie.id === movie.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  async searchMovies(query, page = 1) {
    const encodedQuery = encodeURIComponent(query);
    const [spanishResults, englishResults] = await Promise.all([
      this.fetchData(`/search/movie?query=${encodedQuery}&language=es-ES&page=${page}&include_adult=false`),
      this.fetchData(`/search/movie?query=${encodedQuery}&language=en-US&page=${page}&include_adult=false`)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (movie) => !spanishResults.results.some((spanishMovie) => spanishMovie.id === movie.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  async getMovieDetails(id) {
    try {
      const spanishDetails = await this.fetchData(`/movie/${id}?language=es-ES&append_to_response=credits,videos,images`, true);
      if (spanishDetails) {
        return spanishDetails;
      }
    } catch (error) {
      console.warn(`Spanish details not available for movie ${id}, trying English`);
    }
    const englishDetails = await this.fetchData(`/movie/${id}?language=en-US&append_to_response=credits,videos,images`, true);
    if (englishDetails) {
      return englishDetails;
    }
    return null;
  }
  async getMovieVideos(id) {
    return this.getVideosWithFallback(`/movie/${id}/videos`);
  }
  async getMovieCredits(id) {
    const credits = await this.fetchData(`/movie/${id}/credits?language=es-ES`, true);
    return credits || { cast: [], crew: [] };
  }
  // TV Shows
  async getPopularTVShows(page = 1) {
    const [spanishResults, englishResults, airingTodayResults] = await Promise.all([
      this.fetchData(`/tv/popular?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/tv/popular?language=en-US&page=${page}&region=US`, page === 1),
      this.fetchData(`/tv/airing_today?language=es-ES&page=${page}&region=ES`, page === 1)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (show) => !spanishResults.results.some((spanishShow) => spanishShow.id === show.id)
      ),
      ...airingTodayResults.results.filter(
        (show) => !spanishResults.results.some((spanishShow) => spanishShow.id === show.id) && !englishResults.results.some((englishShow) => englishShow.id === show.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  async getTopRatedTVShows(page = 1) {
    const [spanishResults, englishResults] = await Promise.all([
      this.fetchData(`/tv/top_rated?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/tv/top_rated?language=en-US&page=${page}&region=US`, page === 1)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (show) => !spanishResults.results.some((spanishShow) => spanishShow.id === show.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  // Add method to get airing today TV shows
  async getAiringTodayTVShows(page = 1) {
    const [spanishResults, englishResults] = await Promise.all([
      this.fetchData(`/tv/airing_today?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/tv/airing_today?language=en-US&page=${page}&region=US`, page === 1)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (show) => !spanishResults.results.some((spanishShow) => spanishShow.id === show.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  // Add method to get on the air TV shows
  async getOnTheAirTVShows(page = 1) {
    const [spanishResults, englishResults] = await Promise.all([
      this.fetchData(`/tv/on_the_air?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/tv/on_the_air?language=en-US&page=${page}&region=US`, page === 1)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (show) => !spanishResults.results.some((spanishShow) => spanishShow.id === show.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  async searchTVShows(query, page = 1) {
    const encodedQuery = encodeURIComponent(query);
    const [spanishResults, englishResults] = await Promise.all([
      this.fetchData(`/search/tv?query=${encodedQuery}&language=es-ES&page=${page}&include_adult=false`),
      this.fetchData(`/search/tv?query=${encodedQuery}&language=en-US&page=${page}&include_adult=false`)
    ]);
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (show) => !spanishResults.results.some((spanishShow) => spanishShow.id === show.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  async getTVShowDetails(id) {
    try {
      const spanishDetails = await this.fetchData(`/tv/${id}?language=es-ES&append_to_response=credits,videos,images`, true);
      if (spanishDetails) {
        return spanishDetails;
      }
    } catch (error) {
      console.warn(`Spanish details not available for TV show ${id}, trying English`);
    }
    const englishDetails = await this.fetchData(`/tv/${id}?language=en-US&append_to_response=credits,videos,images`, true);
    if (englishDetails) {
      return englishDetails;
    }
    return null;
  }
  async getTVShowVideos(id) {
    return this.getVideosWithFallback(`/tv/${id}/videos`);
  }
  async getTVShowCredits(id) {
    const credits = await this.fetchData(`/tv/${id}/credits?language=es-ES`, true);
    return credits || { cast: [], crew: [] };
  }
  // Anime (using discover with Japanese origin)
  async getPopularAnime(page = 1) {
    return this.fetchData(`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=${page}&sort_by=popularity.desc&include_adult=false`, page === 1);
  }
  async getTopRatedAnime(page = 1) {
    return this.fetchData(`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=${page}&sort_by=vote_average.desc&vote_count.gte=100&include_adult=false`, page === 1);
  }
  async searchAnime(query, page = 1) {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(`/search/tv?query=${encodedQuery}&language=es-ES&page=${page}&with_genres=16&with_origin_country=JP`);
  }
  // Enhanced anime discovery with multiple sources
  async getAnimeFromMultipleSources(page = 1) {
    try {
      const [japaneseAnime, animationGenre, koreanAnimation] = await Promise.all([
        this.fetchData(`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=${page}&sort_by=popularity.desc&include_adult=false`, page === 1),
        this.fetchData(`/discover/tv?with_genres=16&language=es-ES&page=${page}&sort_by=popularity.desc&include_adult=false`, page === 1),
        this.fetchData(`/discover/tv?with_origin_country=KR&with_genres=16&language=es-ES&page=${page}&sort_by=popularity.desc&include_adult=false`, page === 1)
      ]);
      const combinedResults = [
        ...japaneseAnime.results,
        ...animationGenre.results.filter(
          (item) => !japaneseAnime.results.some((jp) => jp.id === item.id)
        ),
        ...koreanAnimation.results.filter(
          (item) => !japaneseAnime.results.some((jp) => jp.id === item.id) && !animationGenre.results.some((an) => an.id === item.id)
        )
      ];
      return {
        ...japaneseAnime,
        results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
      };
    } catch (error) {
      console.error("Error fetching anime from multiple sources:", error);
      return this.getPopularAnime(page);
    }
  }
  // Genres
  async getMovieGenres() {
    return this.fetchData("/genre/movie/list?language=es-ES", true);
  }
  async getTVGenres() {
    return this.fetchData("/genre/tv/list?language=es-ES", true);
  }
  // Multi search
  async searchMulti(query, page = 1) {
    const encodedQuery = encodeURIComponent(query);
    const [spanishResults, englishResults, personResults] = await Promise.all([
      this.fetchData(`/search/multi?query=${encodedQuery}&language=es-ES&page=${page}&include_adult=false`),
      this.fetchData(`/search/multi?query=${encodedQuery}&language=en-US&page=${page}&include_adult=false`),
      this.fetchData(`/search/person?query=${encodedQuery}&language=es-ES&page=${page}&include_adult=false`)
    ]);
    let personContent = [];
    if (personResults.results.length > 0) {
      personContent = personResults.results.flatMap(
        (person) => person.known_for || []
      );
    }
    const combinedResults = [
      ...spanishResults.results,
      ...englishResults.results.filter(
        (item) => !spanishResults.results.some((spanishItem) => spanishItem.id === item.id)
      ),
      ...personContent.filter(
        (item) => !spanishResults.results.some((spanishItem) => spanishItem.id === item.id) && !englishResults.results.some((englishItem) => englishItem.id === item.id)
      )
    ];
    return {
      ...spanishResults,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  // Trending content - synchronized with TMDB
  async getTrendingAll(timeWindow = "day", page = 1) {
    const [spanishTrending, globalTrending, usTrending] = await Promise.all([
      this.fetchData(`/trending/all/${timeWindow}?language=es-ES&page=${page}&region=ES`, page === 1),
      this.fetchData(`/trending/all/${timeWindow}?language=es-ES&page=${page}`, page === 1),
      this.fetchData(`/trending/all/${timeWindow}?language=es-ES&page=${page}&region=US`, page === 1)
    ]);
    const combinedResults = [
      ...spanishTrending.results,
      ...globalTrending.results.filter(
        (item) => !spanishTrending.results.some((spanishItem) => spanishItem.id === item.id)
      ),
      ...usTrending.results.filter(
        (item) => !spanishTrending.results.some((spanishItem) => spanishItem.id === item.id) && !globalTrending.results.some((globalItem) => globalItem.id === item.id)
      )
    ];
    return {
      ...spanishTrending,
      results: contentFilterService.filterContent(this.removeDuplicates(combinedResults))
    };
  }
  async getTrendingMovies(timeWindow = "day", page = 1) {
    const response = await this.fetchData(`/trending/movie/${timeWindow}?language=es-ES&page=${page}`, page === 1);
    return {
      ...response,
      results: contentFilterService.filterContent(response.results)
    };
  }
  async getTrendingTV(timeWindow = "day", page = 1) {
    const response = await this.fetchData(`/trending/tv/${timeWindow}?language=es-ES&page=${page}`, page === 1);
    return {
      ...response,
      results: contentFilterService.filterContent(response.results)
    };
  }
  // Enhanced content discovery methods
  async getDiscoverMovies(params = {}) {
    const { genre, year, sortBy = "popularity.desc", page = 1 } = params;
    let endpoint = `/discover/movie?language=es-ES&page=${page}&sort_by=${sortBy}&include_adult=false`;
    if (genre) endpoint += `&with_genres=${genre}`;
    if (year) endpoint += `&year=${year}`;
    const response = await this.fetchData(endpoint);
    return {
      ...response,
      results: contentFilterService.filterContent(response.results)
    };
  }
  async getDiscoverTVShows(params = {}) {
    const { genre, year, sortBy = "popularity.desc", page = 1, country } = params;
    let endpoint = `/discover/tv?language=es-ES&page=${page}&sort_by=${sortBy}&include_adult=false`;
    if (genre) endpoint += `&with_genres=${genre}`;
    if (year) endpoint += `&first_air_date_year=${year}`;
    if (country) endpoint += `&with_origin_country=${country}`;
    const response = await this.fetchData(endpoint);
    return {
      ...response,
      results: contentFilterService.filterContent(response.results)
    };
  }
  // Utility method to remove duplicates from combined results
  removeDuplicates(items) {
    const seen = /* @__PURE__ */ new Set();
    return items.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }
  // Get fresh trending content for hero carousel (no duplicates)
  async getHeroContent() {
    try {
      const [trendingDay, trendingWeek, popularMovies, popularTV, nowPlayingMovies, airingTodayTV] = await Promise.all([
        this.getTrendingAll("day", 1),
        this.getTrendingAll("week", 1),
        this.getPopularMovies(1),
        this.getPopularTVShows(1),
        this.getNowPlayingMovies(1),
        this.getAiringTodayTVShows(1)
      ]);
      const combinedItems = [
        ...trendingDay.results.slice(0, 6),
        ...trendingWeek.results.slice(0, 4),
        ...nowPlayingMovies.results.slice(0, 3),
        ...airingTodayTV.results.slice(0, 3),
        ...popularMovies.results.slice(0, 2),
        ...popularTV.results.slice(0, 2)
      ];
      const uniqueItems = contentFilterService.filterContent(this.removeDuplicates(combinedItems)).slice(0, 12);
      const itemsWithSpanishOverview = await Promise.all(
        uniqueItems.map(async (item) => {
          if (!item.overview || item.overview.trim().length < 20) {
            try {
              const isMovie = "title" in item;
              const details = isMovie ? await this.getMovieDetails(item.id) : await this.getTVShowDetails(item.id);
              if (details && details.overview) {
                return { ...item, overview: details.overview };
              }
            } catch (error) {
              console.warn(`Could not fetch details for item ${item.id}`);
            }
          }
          return item;
        })
      );
      return itemsWithSpanishOverview;
    } catch (error) {
      console.error("Error fetching hero content:", error);
      return [];
    }
  }
  // Enhanced search for people and their content
  async searchPeople(query, page = 1) {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(`/search/person?query=${encodedQuery}&language=es-ES&page=${page}&include_adult=false`);
  }
  // Get person details and their filmography
  async getPersonDetails(id) {
    try {
      const [personDetails, movieCredits, tvCredits] = await Promise.all([
        this.fetchData(`/person/${id}?language=es-ES`),
        this.fetchData(`/person/${id}/movie_credits?language=es-ES`),
        this.fetchData(`/person/${id}/tv_credits?language=es-ES`)
      ]);
      return {
        ...personDetails,
        movie_credits: movieCredits,
        tv_credits: tvCredits
      };
    } catch (error) {
      console.error(`Error fetching person details for ${id}:`, error);
      throw error;
    }
  }
  // Force refresh all cached content
  async forceRefreshAllContent() {
    this.clearCache();
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith("fresh_") || key.includes("trending") || key.includes("popular")) {
        localStorage.removeItem(key);
      }
    });
    console.log("All content caches cleared, fresh data will be fetched");
  }
  // Batch fetch videos for multiple items
  async batchFetchVideos(items) {
    const videoMap = /* @__PURE__ */ new Map();
    try {
      const videoPromises = items.map(async (item) => {
        const key = `${item.type}-${item.id}`;
        try {
          const videos = item.type === "movie" ? await this.getMovieVideos(item.id) : await this.getTVShowVideos(item.id);
          const trailers = videos.results.filter(
            (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
          );
          return { key, videos: trailers };
        } catch (error) {
          console.warn(`No videos available for ${key}`);
          return { key, videos: [] };
        }
      });
      const results = await Promise.allSettled(videoPromises);
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { key, videos } = result.value;
          videoMap.set(key, videos);
        }
      });
    } catch (error) {
      console.error("Error in batch fetch videos:", error);
    }
    return videoMap;
  }
  // Clear API cache
  clearCache() {
    apiService.clearCache();
  }
  // Get cache statistics
  getCacheStats() {
    return {
      size: apiService.getCacheSize(),
      items: apiService.getCacheInfo()
    };
  }
  // Enhanced sync method for better content freshness
  async syncAllContent() {
    try {
      const [
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        popularTV,
        topRatedTV,
        popularAnime,
        topRatedAnime,
        trendingDay,
        trendingWeek
      ] = await Promise.all([
        this.getPopularMovies(1),
        this.getTopRatedMovies(1),
        this.getUpcomingMovies(1),
        this.getPopularTVShows(1),
        this.getTopRatedTVShows(1),
        this.getAnimeFromMultipleSources(1),
        this.getTopRatedAnime(1),
        this.getTrendingAll("day", 1),
        this.getTrendingAll("week", 1)
      ]);
      const movies = this.removeDuplicates([
        ...popularMovies.results,
        ...topRatedMovies.results,
        ...upcomingMovies.results
      ]);
      const tvShows = this.removeDuplicates([
        ...popularTV.results,
        ...topRatedTV.results
      ]);
      const anime = this.removeDuplicates([
        ...popularAnime.results,
        ...topRatedAnime.results
      ]);
      const trending = this.removeDuplicates([
        ...trendingDay.results,
        ...trendingWeek.results
      ]);
      return { movies, tvShows, anime, trending };
    } catch (error) {
      console.error("Error syncing all content:", error);
      return { movies: [], tvShows: [], anime: [], trending: [] };
    }
  }
}
export const tmdbService = new TMDBService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRtZGIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQkFTRV9VUkwsIEFQSV9PUFRJT05TIH0gZnJvbSAnLi4vY29uZmlnL2FwaSc7XG5pbXBvcnQgeyBhcGlTZXJ2aWNlIH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgY29udGVudEZpbHRlclNlcnZpY2UgfSBmcm9tICcuL2NvbnRlbnRGaWx0ZXInO1xuaW1wb3J0IHR5cGUgeyBNb3ZpZSwgVFZTaG93LCBNb3ZpZURldGFpbHMsIFRWU2hvd0RldGFpbHMsIFZpZGVvLCBBUElSZXNwb25zZSwgR2VucmUsIENhc3QsIENhc3RNZW1iZXIgfSBmcm9tICcuLi90eXBlcy9tb3ZpZSc7XG5cbmNsYXNzIFRNREJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBGUkVTSF9DT05URU5UX0NBQ0hFX0RVUkFUSU9OID0gMzAgKiA2MCAqIDEwMDA7IC8vIDMwIG1pbnV0ZXMgZm9yIGZyZXNoIGNvbnRlbnRcbiAgcHJpdmF0ZSByZWFkb25seSBERVRBSUxTX0NBQ0hFX0RVUkFUSU9OID0gNjAgKiA2MCAqIDEwMDA7IC8vIDEgaG91ciBmb3IgZGV0YWlsc1xuXG4gIHByaXZhdGUgYXN5bmMgZmV0Y2hEYXRhPFQ+KGVuZHBvaW50OiBzdHJpbmcsIHVzZUNhY2hlOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8VD4ge1xuICAgIC8vIEZvciBmcmVzaCBjb250ZW50LCB1c2Ugc2hvcnRlciBjYWNoZSBkdXJhdGlvblxuICAgIGlmIChlbmRwb2ludC5pbmNsdWRlcygnL3BvcHVsYXInKSB8fCBlbmRwb2ludC5pbmNsdWRlcygnL3RyZW5kaW5nJykgfHwgZW5kcG9pbnQuaW5jbHVkZXMoJy9ub3dfcGxheWluZycpKSB7XG4gICAgICByZXR1cm4gdGhpcy5mZXRjaFdpdGhGcmVzaENhY2hlPFQ+KGVuZHBvaW50LCB1c2VDYWNoZSk7XG4gICAgfVxuICAgIHJldHVybiBhcGlTZXJ2aWNlLmZldGNoV2l0aENhY2hlPFQ+KGVuZHBvaW50LCB1c2VDYWNoZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGZldGNoV2l0aEZyZXNoQ2FjaGU8VD4oZW5kcG9pbnQ6IHN0cmluZywgdXNlQ2FjaGU6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxUPiB7XG4gICAgLy8gVXNlIGEgc2VwYXJhdGUgY2FjaGUgd2l0aCBzaG9ydGVyIGR1cmF0aW9uIGZvciBmcmVzaCBjb250ZW50XG4gICAgY29uc3QgY2FjaGVLZXkgPSBgZnJlc2hfJHtlbmRwb2ludH1gO1xuICAgIFxuICAgIGlmICh1c2VDYWNoZSkge1xuICAgICAgY29uc3QgY2FjaGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVLZXkpO1xuICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgZGF0YSwgdGltZXN0YW1wIH0gPSBKU09OLnBhcnNlKGNhY2hlZCk7XG4gICAgICAgICAgY29uc3QgaXNFeHBpcmVkID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCA+IHRoaXMuRlJFU0hfQ09OVEVOVF9DQUNIRV9EVVJBVElPTjtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoIWlzRXhwaXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfSR7ZW5kcG9pbnR9YCwgQVBJX09QVElPTlMpO1xuICAgICAgXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwNCAmJiBlbmRwb2ludC5pbmNsdWRlcygnL3ZpZGVvcycpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBWaWRlb3Mgbm90IGZvdW5kIGZvciBlbmRwb2ludDogJHtlbmRwb2ludH1gKTtcbiAgICAgICAgICByZXR1cm4geyByZXN1bHRzOiBbXSB9IGFzIFQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgXG4gICAgICBpZiAodXNlQ2FjaGUpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oY2FjaGVLZXksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBBUEkgRXJyb3IgZm9yICR7ZW5kcG9pbnR9OmAsIGVycm9yKTtcbiAgICAgIFxuICAgICAgaWYgKGVuZHBvaW50LmluY2x1ZGVzKCcvdmlkZW9zJykpIHtcbiAgICAgICAgcmV0dXJuIHsgcmVzdWx0czogW10gfSBhcyBUO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBUcnkgdG8gcmV0dXJuIGNhY2hlZCBkYXRhIGV2ZW4gaWYgZXhwaXJlZFxuICAgICAgY29uc3QgY2FjaGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oY2FjaGVLZXkpO1xuICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gSlNPTi5wYXJzZShjYWNoZWQpO1xuICAgICAgICAgIGNvbnNvbGUud2FybihgVXNpbmcgZXhwaXJlZCBjYWNoZSBmb3IgJHtlbmRwb2ludH1gKTtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvLyBFbmhhbmNlZCB2aWRlbyBmZXRjaGluZyB3aXRoIGJldHRlciBmaWx0ZXJpbmdcbiAgcHJpdmF0ZSBhc3luYyBnZXRWaWRlb3NXaXRoRmFsbGJhY2soZW5kcG9pbnQ6IHN0cmluZyk6IFByb21pc2U8eyByZXN1bHRzOiBWaWRlb1tdIH0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gVHJ5IFNwYW5pc2ggZmlyc3Qgd2l0aCBlcnJvciBoYW5kbGluZ1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc3BhbmlzaFZpZGVvcyA9IGF3YWl0IHRoaXMuZmV0Y2hEYXRhPHsgcmVzdWx0czogVmlkZW9bXSB9PihgJHtlbmRwb2ludH0/bGFuZ3VhZ2U9ZXMtRVNgKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzcGFuaXNoVmlkZW9zLnJlc3VsdHMgJiYgc3BhbmlzaFZpZGVvcy5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBJZiBTcGFuaXNoIHZpZGVvcyBleGlzdCBidXQgbm8gdHJhaWxlcnMsIHRyeSB0byBjb21iaW5lIHdpdGggRW5nbGlzaFxuICAgICAgICAgIGNvbnN0IHNwYW5pc2hUcmFpbGVycyA9IHNwYW5pc2hWaWRlb3MucmVzdWx0cy5maWx0ZXIoXG4gICAgICAgICAgICB2aWRlbyA9PiB2aWRlby5zaXRlID09PSAnWW91VHViZScgJiYgKHZpZGVvLnR5cGUgPT09ICdUcmFpbGVyJyB8fCB2aWRlby50eXBlID09PSAnVGVhc2VyJylcbiAgICAgICAgICApO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChzcGFuaXNoVHJhaWxlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBlbmdsaXNoVmlkZW9zID0gYXdhaXQgdGhpcy5mZXRjaERhdGE8eyByZXN1bHRzOiBWaWRlb1tdIH0+KGAke2VuZHBvaW50fT9sYW5ndWFnZT1lbi1VU2ApO1xuICAgICAgICAgICAgICBjb25zdCBlbmdsaXNoVHJhaWxlcnMgPSBlbmdsaXNoVmlkZW9zLnJlc3VsdHMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIHZpZGVvID0+IHZpZGVvLnNpdGUgPT09ICdZb3VUdWJlJyAmJiAodmlkZW8udHlwZSA9PT0gJ1RyYWlsZXInIHx8IHZpZGVvLnR5cGUgPT09ICdUZWFzZXInKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzOiBbLi4uc3BhbmlzaFZpZGVvcy5yZXN1bHRzLCAuLi5lbmdsaXNoVHJhaWxlcnNdXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGNhdGNoIChlbmdsaXNoRXJyb3IpIHtcbiAgICAgICAgICAgICAgLy8gSWYgRW5nbGlzaCBhbHNvIGZhaWxzLCByZXR1cm4gU3BhbmlzaCB2aWRlb3NcbiAgICAgICAgICAgICAgcmV0dXJuIHNwYW5pc2hWaWRlb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiBzcGFuaXNoVmlkZW9zO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChzcGFuaXNoRXJyb3IpIHtcbiAgICAgICAgLy8gSWYgU3BhbmlzaCBmYWlscywgdHJ5IEVuZ2xpc2hcbiAgICAgICAgY29uc29sZS53YXJuKCdTcGFuaXNoIHZpZGVvcyBub3QgYXZhaWxhYmxlLCB0cnlpbmcgRW5nbGlzaCcpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBUcnkgRW5nbGlzaCBhcyBmYWxsYmFja1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZW5nbGlzaFZpZGVvcyA9IGF3YWl0IHRoaXMuZmV0Y2hEYXRhPHsgcmVzdWx0czogVmlkZW9bXSB9PihgJHtlbmRwb2ludH0/bGFuZ3VhZ2U9ZW4tVVNgKTtcbiAgICAgICAgcmV0dXJuIGVuZ2xpc2hWaWRlb3M7XG4gICAgICB9IGNhdGNoIChlbmdsaXNoRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdFbmdsaXNoIHZpZGVvcyBub3QgYXZhaWxhYmxlIGVpdGhlcicpO1xuICAgICAgICAvLyBSZXR1cm4gZW1wdHkgcmVzdWx0cyBpbnN0ZWFkIG9mIHRocm93aW5nXG4gICAgICAgIHJldHVybiB7IHJlc3VsdHM6IFtdIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHZpZGVvczonLCBlcnJvcik7XG4gICAgICByZXR1cm4geyByZXN1bHRzOiBbXSB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIE1vdmllc1xuICBhc3luYyBnZXRQb3B1bGFyTW92aWVzKHBhZ2U6IG51bWJlciA9IDEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPE1vdmllPj4ge1xuICAgIC8vIEdldCBib3RoIFNwYW5pc2ggYW5kIEVuZ2xpc2ggcmVzdWx0cyBmb3IgYmV0dGVyIGNvdmVyYWdlXG4gICAgY29uc3QgW3NwYW5pc2hSZXN1bHRzLCBlbmdsaXNoUmVzdWx0c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmZldGNoRGF0YShgL21vdmllL3BvcHVsYXI/bGFuZ3VhZ2U9ZXMtRVMmcGFnZT0ke3BhZ2V9JnJlZ2lvbj1FU2AsIHBhZ2UgPT09IDEpLFxuICAgICAgdGhpcy5mZXRjaERhdGEoYC9tb3ZpZS9wb3B1bGFyP2xhbmd1YWdlPWVuLVVTJnBhZ2U9JHtwYWdlfSZyZWdpb249VVNgLCBwYWdlID09PSAxKVxuICAgIF0pO1xuICAgIFxuICAgIC8vIENvbWJpbmUgcmVzdWx0cyBhbmQgcmVtb3ZlIGR1cGxpY2F0ZXMsIHByaW9yaXRpemluZyBTcGFuaXNoXG4gICAgY29uc3QgY29tYmluZWRSZXN1bHRzID0gW1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMucmVzdWx0cyxcbiAgICAgIC4uLmVuZ2xpc2hSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKG1vdmllID0+IFxuICAgICAgICAhc3BhbmlzaFJlc3VsdHMucmVzdWx0cy5zb21lKHNwYW5pc2hNb3ZpZSA9PiBzcGFuaXNoTW92aWUuaWQgPT09IG1vdmllLmlkKVxuICAgICAgKVxuICAgIF07XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNwYW5pc2hSZXN1bHRzLFxuICAgICAgcmVzdWx0czogY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudCh0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoY29tYmluZWRSZXN1bHRzKSlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0VG9wUmF0ZWRNb3ZpZXMocGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8TW92aWU+PiB7XG4gICAgY29uc3QgW3NwYW5pc2hSZXN1bHRzLCBlbmdsaXNoUmVzdWx0c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmZldGNoRGF0YShgL21vdmllL3RvcF9yYXRlZD9sYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0mcmVnaW9uPUVTYCwgcGFnZSA9PT0gMSksXG4gICAgICB0aGlzLmZldGNoRGF0YShgL21vdmllL3RvcF9yYXRlZD9sYW5ndWFnZT1lbi1VUyZwYWdlPSR7cGFnZX0mcmVnaW9uPVVTYCwgcGFnZSA9PT0gMSlcbiAgICBdKTtcbiAgICBcbiAgICBjb25zdCBjb21iaW5lZFJlc3VsdHMgPSBbXG4gICAgICAuLi5zcGFuaXNoUmVzdWx0cy5yZXN1bHRzLFxuICAgICAgLi4uZW5nbGlzaFJlc3VsdHMucmVzdWx0cy5maWx0ZXIobW92aWUgPT4gXG4gICAgICAgICFzcGFuaXNoUmVzdWx0cy5yZXN1bHRzLnNvbWUoc3BhbmlzaE1vdmllID0+IHNwYW5pc2hNb3ZpZS5pZCA9PT0gbW92aWUuaWQpXG4gICAgICApXG4gICAgXTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMsXG4gICAgICByZXN1bHRzOiBjb250ZW50RmlsdGVyU2VydmljZS5maWx0ZXJDb250ZW50KHRoaXMucmVtb3ZlRHVwbGljYXRlcyhjb21iaW5lZFJlc3VsdHMpKVxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRVcGNvbWluZ01vdmllcyhwYWdlOiBudW1iZXIgPSAxKTogUHJvbWlzZTxBUElSZXNwb25zZTxNb3ZpZT4+IHtcbiAgICAvLyBHZXQgdXBjb21pbmcgbW92aWVzIGZyb20gbXVsdGlwbGUgcmVnaW9ucyBmb3IgYmV0dGVyIGNvdmVyYWdlXG4gICAgY29uc3QgW3NwYW5pc2hSZXN1bHRzLCBlbmdsaXNoUmVzdWx0cywgbm93UGxheWluZ1Jlc3VsdHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5mZXRjaERhdGEoYC9tb3ZpZS91cGNvbWluZz9sYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0mcmVnaW9uPUVTYCwgcGFnZSA9PT0gMSksXG4gICAgICB0aGlzLmZldGNoRGF0YShgL21vdmllL3VwY29taW5nP2xhbmd1YWdlPWVuLVVTJnBhZ2U9JHtwYWdlfSZyZWdpb249VVNgLCBwYWdlID09PSAxKSxcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvbW92aWUvbm93X3BsYXlpbmc/bGFuZ3VhZ2U9ZXMtRVMmcGFnZT0ke3BhZ2V9JnJlZ2lvbj1FU2AsIHBhZ2UgPT09IDEpXG4gICAgXSk7XG4gICAgXG4gICAgY29uc3QgY29tYmluZWRSZXN1bHRzID0gW1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMucmVzdWx0cyxcbiAgICAgIC4uLmVuZ2xpc2hSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKG1vdmllID0+IFxuICAgICAgICAhc3BhbmlzaFJlc3VsdHMucmVzdWx0cy5zb21lKHNwYW5pc2hNb3ZpZSA9PiBzcGFuaXNoTW92aWUuaWQgPT09IG1vdmllLmlkKVxuICAgICAgKSxcbiAgICAgIC4uLm5vd1BsYXlpbmdSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKG1vdmllID0+IFxuICAgICAgICAhc3BhbmlzaFJlc3VsdHMucmVzdWx0cy5zb21lKHNwYW5pc2hNb3ZpZSA9PiBzcGFuaXNoTW92aWUuaWQgPT09IG1vdmllLmlkKSAmJlxuICAgICAgICAhZW5nbGlzaFJlc3VsdHMucmVzdWx0cy5zb21lKGVuZ2xpc2hNb3ZpZSA9PiBlbmdsaXNoTW92aWUuaWQgPT09IG1vdmllLmlkKVxuICAgICAgKVxuICAgIF07XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNwYW5pc2hSZXN1bHRzLFxuICAgICAgcmVzdWx0czogY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudCh0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoY29tYmluZWRSZXN1bHRzKSlcbiAgICB9O1xuICB9XG5cbiAgLy8gQWRkIG1ldGhvZCB0byBnZXQgbm93IHBsYXlpbmcgbW92aWVzXG4gIGFzeW5jIGdldE5vd1BsYXlpbmdNb3ZpZXMocGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8TW92aWU+PiB7XG4gICAgY29uc3QgW3NwYW5pc2hSZXN1bHRzLCBlbmdsaXNoUmVzdWx0c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmZldGNoRGF0YShgL21vdmllL25vd19wbGF5aW5nP2xhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZyZWdpb249RVNgLCBwYWdlID09PSAxKSxcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvbW92aWUvbm93X3BsYXlpbmc/bGFuZ3VhZ2U9ZW4tVVMmcGFnZT0ke3BhZ2V9JnJlZ2lvbj1VU2AsIHBhZ2UgPT09IDEpXG4gICAgXSk7XG4gICAgXG4gICAgY29uc3QgY29tYmluZWRSZXN1bHRzID0gW1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMucmVzdWx0cyxcbiAgICAgIC4uLmVuZ2xpc2hSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKG1vdmllID0+IFxuICAgICAgICAhc3BhbmlzaFJlc3VsdHMucmVzdWx0cy5zb21lKHNwYW5pc2hNb3ZpZSA9PiBzcGFuaXNoTW92aWUuaWQgPT09IG1vdmllLmlkKVxuICAgICAgKVxuICAgIF07XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNwYW5pc2hSZXN1bHRzLFxuICAgICAgcmVzdWx0czogY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudCh0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoY29tYmluZWRSZXN1bHRzKSlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgc2VhcmNoTW92aWVzKHF1ZXJ5OiBzdHJpbmcsIHBhZ2U6IG51bWJlciA9IDEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPE1vdmllPj4ge1xuICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSk7XG4gICAgLy8gU2VhcmNoIGluIGJvdGggU3BhbmlzaCBhbmQgRW5nbGlzaCBmb3IgYmV0dGVyIGNvdmVyYWdlXG4gICAgY29uc3QgW3NwYW5pc2hSZXN1bHRzLCBlbmdsaXNoUmVzdWx0c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmZldGNoRGF0YShgL3NlYXJjaC9tb3ZpZT9xdWVyeT0ke2VuY29kZWRRdWVyeX0mbGFuZ3VhZ2U9ZXMtRVMmcGFnZT0ke3BhZ2V9JmluY2x1ZGVfYWR1bHQ9ZmFsc2VgKSxcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvc2VhcmNoL21vdmllP3F1ZXJ5PSR7ZW5jb2RlZFF1ZXJ5fSZsYW5ndWFnZT1lbi1VUyZwYWdlPSR7cGFnZX0maW5jbHVkZV9hZHVsdD1mYWxzZWApXG4gICAgXSk7XG4gICAgXG4gICAgY29uc3QgY29tYmluZWRSZXN1bHRzID0gW1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMucmVzdWx0cyxcbiAgICAgIC4uLmVuZ2xpc2hSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKG1vdmllID0+IFxuICAgICAgICAhc3BhbmlzaFJlc3VsdHMucmVzdWx0cy5zb21lKHNwYW5pc2hNb3ZpZSA9PiBzcGFuaXNoTW92aWUuaWQgPT09IG1vdmllLmlkKVxuICAgICAgKVxuICAgIF07XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNwYW5pc2hSZXN1bHRzLFxuICAgICAgcmVzdWx0czogY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudCh0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoY29tYmluZWRSZXN1bHRzKSlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0TW92aWVEZXRhaWxzKGlkOiBudW1iZXIpOiBQcm9taXNlPE1vdmllRGV0YWlscyB8IG51bGw+IHtcbiAgICAvLyBUcnkgU3BhbmlzaCBmaXJzdCwgZmFsbGJhY2sgdG8gRW5nbGlzaCBpZiBuZWVkZWRcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3BhbmlzaERldGFpbHMgPSBhd2FpdCB0aGlzLmZldGNoRGF0YTxNb3ZpZURldGFpbHMgfCBudWxsPihgL21vdmllLyR7aWR9P2xhbmd1YWdlPWVzLUVTJmFwcGVuZF90b19yZXNwb25zZT1jcmVkaXRzLHZpZGVvcyxpbWFnZXNgLCB0cnVlKTtcbiAgICAgIGlmIChzcGFuaXNoRGV0YWlscykge1xuICAgICAgICByZXR1cm4gc3BhbmlzaERldGFpbHM7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUud2FybihgU3BhbmlzaCBkZXRhaWxzIG5vdCBhdmFpbGFibGUgZm9yIG1vdmllICR7aWR9LCB0cnlpbmcgRW5nbGlzaGApO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBlbmdsaXNoRGV0YWlscyA9IGF3YWl0IHRoaXMuZmV0Y2hEYXRhPE1vdmllRGV0YWlscyB8IG51bGw+KGAvbW92aWUvJHtpZH0/bGFuZ3VhZ2U9ZW4tVVMmYXBwZW5kX3RvX3Jlc3BvbnNlPWNyZWRpdHMsdmlkZW9zLGltYWdlc2AsIHRydWUpO1xuICAgIGlmIChlbmdsaXNoRGV0YWlscykge1xuICAgICAgcmV0dXJuIGVuZ2xpc2hEZXRhaWxzO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGdldE1vdmllVmlkZW9zKGlkOiBudW1iZXIpOiBQcm9taXNlPHsgcmVzdWx0czogVmlkZW9bXSB9PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmlkZW9zV2l0aEZhbGxiYWNrKGAvbW92aWUvJHtpZH0vdmlkZW9zYCk7XG4gIH1cblxuICBhc3luYyBnZXRNb3ZpZUNyZWRpdHMoaWQ6IG51bWJlcik6IFByb21pc2U8Q2FzdD4ge1xuICAgIGNvbnN0IGNyZWRpdHMgPSBhd2FpdCB0aGlzLmZldGNoRGF0YTxDYXN0IHwgbnVsbD4oYC9tb3ZpZS8ke2lkfS9jcmVkaXRzP2xhbmd1YWdlPWVzLUVTYCwgdHJ1ZSk7XG4gICAgcmV0dXJuIGNyZWRpdHMgfHwgeyBjYXN0OiBbXSwgY3JldzogW10gfTtcbiAgfVxuXG4gIC8vIFRWIFNob3dzXG4gIGFzeW5jIGdldFBvcHVsYXJUVlNob3dzKHBhZ2U6IG51bWJlciA9IDEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPFRWU2hvdz4+IHtcbiAgICAvLyBHZXQgVFYgc2hvd3MgZnJvbSBtdWx0aXBsZSByZWdpb25zIGFuZCBzb3VyY2VzXG4gICAgY29uc3QgW3NwYW5pc2hSZXN1bHRzLCBlbmdsaXNoUmVzdWx0cywgYWlyaW5nVG9kYXlSZXN1bHRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvdHYvcG9wdWxhcj9sYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0mcmVnaW9uPUVTYCwgcGFnZSA9PT0gMSksXG4gICAgICB0aGlzLmZldGNoRGF0YShgL3R2L3BvcHVsYXI/bGFuZ3VhZ2U9ZW4tVVMmcGFnZT0ke3BhZ2V9JnJlZ2lvbj1VU2AsIHBhZ2UgPT09IDEpLFxuICAgICAgdGhpcy5mZXRjaERhdGEoYC90di9haXJpbmdfdG9kYXk/bGFuZ3VhZ2U9ZXMtRVMmcGFnZT0ke3BhZ2V9JnJlZ2lvbj1FU2AsIHBhZ2UgPT09IDEpXG4gICAgXSk7XG4gICAgXG4gICAgY29uc3QgY29tYmluZWRSZXN1bHRzID0gW1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMucmVzdWx0cyxcbiAgICAgIC4uLmVuZ2xpc2hSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKHNob3cgPT4gXG4gICAgICAgICFzcGFuaXNoUmVzdWx0cy5yZXN1bHRzLnNvbWUoc3BhbmlzaFNob3cgPT4gc3BhbmlzaFNob3cuaWQgPT09IHNob3cuaWQpXG4gICAgICApLFxuICAgICAgLi4uYWlyaW5nVG9kYXlSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKHNob3cgPT4gXG4gICAgICAgICFzcGFuaXNoUmVzdWx0cy5yZXN1bHRzLnNvbWUoc3BhbmlzaFNob3cgPT4gc3BhbmlzaFNob3cuaWQgPT09IHNob3cuaWQpICYmXG4gICAgICAgICFlbmdsaXNoUmVzdWx0cy5yZXN1bHRzLnNvbWUoZW5nbGlzaFNob3cgPT4gZW5nbGlzaFNob3cuaWQgPT09IHNob3cuaWQpXG4gICAgICApXG4gICAgXTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMsXG4gICAgICByZXN1bHRzOiBjb250ZW50RmlsdGVyU2VydmljZS5maWx0ZXJDb250ZW50KHRoaXMucmVtb3ZlRHVwbGljYXRlcyhjb21iaW5lZFJlc3VsdHMpKVxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRUb3BSYXRlZFRWU2hvd3MocGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8VFZTaG93Pj4ge1xuICAgIGNvbnN0IFtzcGFuaXNoUmVzdWx0cywgZW5nbGlzaFJlc3VsdHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5mZXRjaERhdGEoYC90di90b3BfcmF0ZWQ/bGFuZ3VhZ2U9ZXMtRVMmcGFnZT0ke3BhZ2V9JnJlZ2lvbj1FU2AsIHBhZ2UgPT09IDEpLFxuICAgICAgdGhpcy5mZXRjaERhdGEoYC90di90b3BfcmF0ZWQ/bGFuZ3VhZ2U9ZW4tVVMmcGFnZT0ke3BhZ2V9JnJlZ2lvbj1VU2AsIHBhZ2UgPT09IDEpXG4gICAgXSk7XG4gICAgXG4gICAgY29uc3QgY29tYmluZWRSZXN1bHRzID0gW1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMucmVzdWx0cyxcbiAgICAgIC4uLmVuZ2xpc2hSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKHNob3cgPT4gXG4gICAgICAgICFzcGFuaXNoUmVzdWx0cy5yZXN1bHRzLnNvbWUoc3BhbmlzaFNob3cgPT4gc3BhbmlzaFNob3cuaWQgPT09IHNob3cuaWQpXG4gICAgICApXG4gICAgXTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMsXG4gICAgICByZXN1bHRzOiBjb250ZW50RmlsdGVyU2VydmljZS5maWx0ZXJDb250ZW50KHRoaXMucmVtb3ZlRHVwbGljYXRlcyhjb21iaW5lZFJlc3VsdHMpKVxuICAgIH07XG4gIH1cblxuICAvLyBBZGQgbWV0aG9kIHRvIGdldCBhaXJpbmcgdG9kYXkgVFYgc2hvd3NcbiAgYXN5bmMgZ2V0QWlyaW5nVG9kYXlUVlNob3dzKHBhZ2U6IG51bWJlciA9IDEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPFRWU2hvdz4+IHtcbiAgICBjb25zdCBbc3BhbmlzaFJlc3VsdHMsIGVuZ2xpc2hSZXN1bHRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvdHYvYWlyaW5nX3RvZGF5P2xhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZyZWdpb249RVNgLCBwYWdlID09PSAxKSxcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvdHYvYWlyaW5nX3RvZGF5P2xhbmd1YWdlPWVuLVVTJnBhZ2U9JHtwYWdlfSZyZWdpb249VVNgLCBwYWdlID09PSAxKVxuICAgIF0pO1xuICAgIFxuICAgIGNvbnN0IGNvbWJpbmVkUmVzdWx0cyA9IFtcbiAgICAgIC4uLnNwYW5pc2hSZXN1bHRzLnJlc3VsdHMsXG4gICAgICAuLi5lbmdsaXNoUmVzdWx0cy5yZXN1bHRzLmZpbHRlcihzaG93ID0+IFxuICAgICAgICAhc3BhbmlzaFJlc3VsdHMucmVzdWx0cy5zb21lKHNwYW5pc2hTaG93ID0+IHNwYW5pc2hTaG93LmlkID09PSBzaG93LmlkKVxuICAgICAgKVxuICAgIF07XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNwYW5pc2hSZXN1bHRzLFxuICAgICAgcmVzdWx0czogY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudCh0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoY29tYmluZWRSZXN1bHRzKSlcbiAgICB9O1xuICB9XG5cbiAgLy8gQWRkIG1ldGhvZCB0byBnZXQgb24gdGhlIGFpciBUViBzaG93c1xuICBhc3luYyBnZXRPblRoZUFpclRWU2hvd3MocGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8VFZTaG93Pj4ge1xuICAgIGNvbnN0IFtzcGFuaXNoUmVzdWx0cywgZW5nbGlzaFJlc3VsdHNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5mZXRjaERhdGEoYC90di9vbl90aGVfYWlyP2xhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZyZWdpb249RVNgLCBwYWdlID09PSAxKSxcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvdHYvb25fdGhlX2Fpcj9sYW5ndWFnZT1lbi1VUyZwYWdlPSR7cGFnZX0mcmVnaW9uPVVTYCwgcGFnZSA9PT0gMSlcbiAgICBdKTtcbiAgICBcbiAgICBjb25zdCBjb21iaW5lZFJlc3VsdHMgPSBbXG4gICAgICAuLi5zcGFuaXNoUmVzdWx0cy5yZXN1bHRzLFxuICAgICAgLi4uZW5nbGlzaFJlc3VsdHMucmVzdWx0cy5maWx0ZXIoc2hvdyA9PiBcbiAgICAgICAgIXNwYW5pc2hSZXN1bHRzLnJlc3VsdHMuc29tZShzcGFuaXNoU2hvdyA9PiBzcGFuaXNoU2hvdy5pZCA9PT0gc2hvdy5pZClcbiAgICAgIClcbiAgICBdO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAuLi5zcGFuaXNoUmVzdWx0cyxcbiAgICAgIHJlc3VsdHM6IGNvbnRlbnRGaWx0ZXJTZXJ2aWNlLmZpbHRlckNvbnRlbnQodGhpcy5yZW1vdmVEdXBsaWNhdGVzKGNvbWJpbmVkUmVzdWx0cykpXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHNlYXJjaFRWU2hvd3MocXVlcnk6IHN0cmluZywgcGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8VFZTaG93Pj4ge1xuICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSk7XG4gICAgLy8gU2VhcmNoIGluIGJvdGggU3BhbmlzaCBhbmQgRW5nbGlzaCBmb3IgYmV0dGVyIGNvdmVyYWdlXG4gICAgY29uc3QgW3NwYW5pc2hSZXN1bHRzLCBlbmdsaXNoUmVzdWx0c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmZldGNoRGF0YShgL3NlYXJjaC90dj9xdWVyeT0ke2VuY29kZWRRdWVyeX0mbGFuZ3VhZ2U9ZXMtRVMmcGFnZT0ke3BhZ2V9JmluY2x1ZGVfYWR1bHQ9ZmFsc2VgKSxcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvc2VhcmNoL3R2P3F1ZXJ5PSR7ZW5jb2RlZFF1ZXJ5fSZsYW5ndWFnZT1lbi1VUyZwYWdlPSR7cGFnZX0maW5jbHVkZV9hZHVsdD1mYWxzZWApXG4gICAgXSk7XG4gICAgXG4gICAgY29uc3QgY29tYmluZWRSZXN1bHRzID0gW1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMucmVzdWx0cyxcbiAgICAgIC4uLmVuZ2xpc2hSZXN1bHRzLnJlc3VsdHMuZmlsdGVyKHNob3cgPT4gXG4gICAgICAgICFzcGFuaXNoUmVzdWx0cy5yZXN1bHRzLnNvbWUoc3BhbmlzaFNob3cgPT4gc3BhbmlzaFNob3cuaWQgPT09IHNob3cuaWQpXG4gICAgICApXG4gICAgXTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3BhbmlzaFJlc3VsdHMsXG4gICAgICByZXN1bHRzOiBjb250ZW50RmlsdGVyU2VydmljZS5maWx0ZXJDb250ZW50KHRoaXMucmVtb3ZlRHVwbGljYXRlcyhjb21iaW5lZFJlc3VsdHMpKVxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRUVlNob3dEZXRhaWxzKGlkOiBudW1iZXIpOiBQcm9taXNlPFRWU2hvd0RldGFpbHMgfCBudWxsPiB7XG4gICAgLy8gVHJ5IFNwYW5pc2ggZmlyc3QsIGZhbGxiYWNrIHRvIEVuZ2xpc2ggaWYgbmVlZGVkXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNwYW5pc2hEZXRhaWxzID0gYXdhaXQgdGhpcy5mZXRjaERhdGE8VFZTaG93RGV0YWlscyB8IG51bGw+KGAvdHYvJHtpZH0/bGFuZ3VhZ2U9ZXMtRVMmYXBwZW5kX3RvX3Jlc3BvbnNlPWNyZWRpdHMsdmlkZW9zLGltYWdlc2AsIHRydWUpO1xuICAgICAgaWYgKHNwYW5pc2hEZXRhaWxzKSB7XG4gICAgICAgIHJldHVybiBzcGFuaXNoRGV0YWlscztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKGBTcGFuaXNoIGRldGFpbHMgbm90IGF2YWlsYWJsZSBmb3IgVFYgc2hvdyAke2lkfSwgdHJ5aW5nIEVuZ2xpc2hgKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZW5nbGlzaERldGFpbHMgPSBhd2FpdCB0aGlzLmZldGNoRGF0YTxUVlNob3dEZXRhaWxzIHwgbnVsbD4oYC90di8ke2lkfT9sYW5ndWFnZT1lbi1VUyZhcHBlbmRfdG9fcmVzcG9uc2U9Y3JlZGl0cyx2aWRlb3MsaW1hZ2VzYCwgdHJ1ZSk7XG4gICAgaWYgKGVuZ2xpc2hEZXRhaWxzKSB7XG4gICAgICByZXR1cm4gZW5nbGlzaERldGFpbHM7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYXN5bmMgZ2V0VFZTaG93VmlkZW9zKGlkOiBudW1iZXIpOiBQcm9taXNlPHsgcmVzdWx0czogVmlkZW9bXSB9PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmlkZW9zV2l0aEZhbGxiYWNrKGAvdHYvJHtpZH0vdmlkZW9zYCk7XG4gIH1cblxuICBhc3luYyBnZXRUVlNob3dDcmVkaXRzKGlkOiBudW1iZXIpOiBQcm9taXNlPENhc3Q+IHtcbiAgICBjb25zdCBjcmVkaXRzID0gYXdhaXQgdGhpcy5mZXRjaERhdGE8Q2FzdCB8IG51bGw+KGAvdHYvJHtpZH0vY3JlZGl0cz9sYW5ndWFnZT1lcy1FU2AsIHRydWUpO1xuICAgIHJldHVybiBjcmVkaXRzIHx8IHsgY2FzdDogW10sIGNyZXc6IFtdIH07XG4gIH1cblxuICAvLyBBbmltZSAodXNpbmcgZGlzY292ZXIgd2l0aCBKYXBhbmVzZSBvcmlnaW4pXG4gIGFzeW5jIGdldFBvcHVsYXJBbmltZShwYWdlOiBudW1iZXIgPSAxKTogUHJvbWlzZTxBUElSZXNwb25zZTxUVlNob3c+PiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hEYXRhKGAvZGlzY292ZXIvdHY/d2l0aF9vcmlnaW5fY291bnRyeT1KUCZ3aXRoX2dlbnJlcz0xNiZsYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0mc29ydF9ieT1wb3B1bGFyaXR5LmRlc2MmaW5jbHVkZV9hZHVsdD1mYWxzZWAsIHBhZ2UgPT09IDEpO1xuICB9XG5cbiAgYXN5bmMgZ2V0VG9wUmF0ZWRBbmltZShwYWdlOiBudW1iZXIgPSAxKTogUHJvbWlzZTxBUElSZXNwb25zZTxUVlNob3c+PiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hEYXRhKGAvZGlzY292ZXIvdHY/d2l0aF9vcmlnaW5fY291bnRyeT1KUCZ3aXRoX2dlbnJlcz0xNiZsYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0mc29ydF9ieT12b3RlX2F2ZXJhZ2UuZGVzYyZ2b3RlX2NvdW50Lmd0ZT0xMDAmaW5jbHVkZV9hZHVsdD1mYWxzZWAsIHBhZ2UgPT09IDEpO1xuICB9XG5cbiAgYXN5bmMgc2VhcmNoQW5pbWUocXVlcnk6IHN0cmluZywgcGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8VFZTaG93Pj4ge1xuICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hEYXRhKGAvc2VhcmNoL3R2P3F1ZXJ5PSR7ZW5jb2RlZFF1ZXJ5fSZsYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0md2l0aF9nZW5yZXM9MTYmd2l0aF9vcmlnaW5fY291bnRyeT1KUGApO1xuICB9XG5cbiAgLy8gRW5oYW5jZWQgYW5pbWUgZGlzY292ZXJ5IHdpdGggbXVsdGlwbGUgc291cmNlc1xuICBhc3luYyBnZXRBbmltZUZyb21NdWx0aXBsZVNvdXJjZXMocGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8VFZTaG93Pj4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBbamFwYW5lc2VBbmltZSwgYW5pbWF0aW9uR2VucmUsIGtvcmVhbkFuaW1hdGlvbl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuZmV0Y2hEYXRhPEFQSVJlc3BvbnNlPFRWU2hvdz4+KGAvZGlzY292ZXIvdHY/d2l0aF9vcmlnaW5fY291bnRyeT1KUCZ3aXRoX2dlbnJlcz0xNiZsYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0mc29ydF9ieT1wb3B1bGFyaXR5LmRlc2MmaW5jbHVkZV9hZHVsdD1mYWxzZWAsIHBhZ2UgPT09IDEpLFxuICAgICAgICB0aGlzLmZldGNoRGF0YTxBUElSZXNwb25zZTxUVlNob3c+PihgL2Rpc2NvdmVyL3R2P3dpdGhfZ2VucmVzPTE2Jmxhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZzb3J0X2J5PXBvcHVsYXJpdHkuZGVzYyZpbmNsdWRlX2FkdWx0PWZhbHNlYCwgcGFnZSA9PT0gMSksXG4gICAgICAgIHRoaXMuZmV0Y2hEYXRhPEFQSVJlc3BvbnNlPFRWU2hvdz4+KGAvZGlzY292ZXIvdHY/d2l0aF9vcmlnaW5fY291bnRyeT1LUiZ3aXRoX2dlbnJlcz0xNiZsYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0mc29ydF9ieT1wb3B1bGFyaXR5LmRlc2MmaW5jbHVkZV9hZHVsdD1mYWxzZWAsIHBhZ2UgPT09IDEpXG4gICAgICBdKTtcblxuICAgICAgLy8gQ29tYmluZSBhbmQgcmVtb3ZlIGR1cGxpY2F0ZXNcbiAgICAgIGNvbnN0IGNvbWJpbmVkUmVzdWx0cyA9IFtcbiAgICAgICAgLi4uamFwYW5lc2VBbmltZS5yZXN1bHRzLFxuICAgICAgICAuLi5hbmltYXRpb25HZW5yZS5yZXN1bHRzLmZpbHRlcihpdGVtID0+IFxuICAgICAgICAgICFqYXBhbmVzZUFuaW1lLnJlc3VsdHMuc29tZShqcCA9PiBqcC5pZCA9PT0gaXRlbS5pZClcbiAgICAgICAgKSxcbiAgICAgICAgLi4ua29yZWFuQW5pbWF0aW9uLnJlc3VsdHMuZmlsdGVyKGl0ZW0gPT4gXG4gICAgICAgICAgIWphcGFuZXNlQW5pbWUucmVzdWx0cy5zb21lKGpwID0+IGpwLmlkID09PSBpdGVtLmlkKSAmJlxuICAgICAgICAgICFhbmltYXRpb25HZW5yZS5yZXN1bHRzLnNvbWUoYW4gPT4gYW4uaWQgPT09IGl0ZW0uaWQpXG4gICAgICAgIClcbiAgICAgIF07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmphcGFuZXNlQW5pbWUsXG4gICAgICAgIHJlc3VsdHM6IGNvbnRlbnRGaWx0ZXJTZXJ2aWNlLmZpbHRlckNvbnRlbnQodGhpcy5yZW1vdmVEdXBsaWNhdGVzKGNvbWJpbmVkUmVzdWx0cykpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBhbmltZSBmcm9tIG11bHRpcGxlIHNvdXJjZXM6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UG9wdWxhckFuaW1lKHBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdlbnJlc1xuICBhc3luYyBnZXRNb3ZpZUdlbnJlcygpOiBQcm9taXNlPHsgZ2VucmVzOiBHZW5yZVtdIH0+IHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaERhdGEoJy9nZW5yZS9tb3ZpZS9saXN0P2xhbmd1YWdlPWVzLUVTJywgdHJ1ZSk7XG4gIH1cblxuICBhc3luYyBnZXRUVkdlbnJlcygpOiBQcm9taXNlPHsgZ2VucmVzOiBHZW5yZVtdIH0+IHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaERhdGEoJy9nZW5yZS90di9saXN0P2xhbmd1YWdlPWVzLUVTJywgdHJ1ZSk7XG4gIH1cblxuICAvLyBNdWx0aSBzZWFyY2hcbiAgYXN5bmMgc2VhcmNoTXVsdGkocXVlcnk6IHN0cmluZywgcGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8TW92aWUgfCBUVlNob3c+PiB7XG4gICAgY29uc3QgZW5jb2RlZFF1ZXJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KTtcbiAgICAvLyBFbmhhbmNlZCBtdWx0aS1zZWFyY2ggd2l0aCBiZXR0ZXIgY292ZXJhZ2VcbiAgICBjb25zdCBbc3BhbmlzaFJlc3VsdHMsIGVuZ2xpc2hSZXN1bHRzLCBwZXJzb25SZXN1bHRzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvc2VhcmNoL211bHRpP3F1ZXJ5PSR7ZW5jb2RlZFF1ZXJ5fSZsYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0maW5jbHVkZV9hZHVsdD1mYWxzZWApLFxuICAgICAgdGhpcy5mZXRjaERhdGEoYC9zZWFyY2gvbXVsdGk/cXVlcnk9JHtlbmNvZGVkUXVlcnl9Jmxhbmd1YWdlPWVuLVVTJnBhZ2U9JHtwYWdlfSZpbmNsdWRlX2FkdWx0PWZhbHNlYCksXG4gICAgICB0aGlzLmZldGNoRGF0YShgL3NlYXJjaC9wZXJzb24/cXVlcnk9JHtlbmNvZGVkUXVlcnl9Jmxhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZpbmNsdWRlX2FkdWx0PWZhbHNlYClcbiAgICBdKTtcbiAgICBcbiAgICAvLyBJZiBzZWFyY2hpbmcgZm9yIGEgcGVyc29uLCBnZXQgdGhlaXIga25vd25fZm9yIGNvbnRlbnRcbiAgICBsZXQgcGVyc29uQ29udGVudDogKE1vdmllIHwgVFZTaG93KVtdID0gW107XG4gICAgaWYgKHBlcnNvblJlc3VsdHMucmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICBwZXJzb25Db250ZW50ID0gcGVyc29uUmVzdWx0cy5yZXN1bHRzLmZsYXRNYXAocGVyc29uID0+IFxuICAgICAgICBwZXJzb24ua25vd25fZm9yIHx8IFtdXG4gICAgICApO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBjb21iaW5lZFJlc3VsdHMgPSBbXG4gICAgICAuLi5zcGFuaXNoUmVzdWx0cy5yZXN1bHRzLFxuICAgICAgLi4uZW5nbGlzaFJlc3VsdHMucmVzdWx0cy5maWx0ZXIoaXRlbSA9PiBcbiAgICAgICAgIXNwYW5pc2hSZXN1bHRzLnJlc3VsdHMuc29tZShzcGFuaXNoSXRlbSA9PiBzcGFuaXNoSXRlbS5pZCA9PT0gaXRlbS5pZClcbiAgICAgICksXG4gICAgICAuLi5wZXJzb25Db250ZW50LmZpbHRlcihpdGVtID0+IFxuICAgICAgICAhc3BhbmlzaFJlc3VsdHMucmVzdWx0cy5zb21lKHNwYW5pc2hJdGVtID0+IHNwYW5pc2hJdGVtLmlkID09PSBpdGVtLmlkKSAmJlxuICAgICAgICAhZW5nbGlzaFJlc3VsdHMucmVzdWx0cy5zb21lKGVuZ2xpc2hJdGVtID0+IGVuZ2xpc2hJdGVtLmlkID09PSBpdGVtLmlkKVxuICAgICAgKVxuICAgIF07XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNwYW5pc2hSZXN1bHRzLFxuICAgICAgcmVzdWx0czogY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudCh0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoY29tYmluZWRSZXN1bHRzKSlcbiAgICB9O1xuICB9XG5cbiAgLy8gVHJlbmRpbmcgY29udGVudCAtIHN5bmNocm9uaXplZCB3aXRoIFRNREJcbiAgYXN5bmMgZ2V0VHJlbmRpbmdBbGwodGltZVdpbmRvdzogJ2RheScgfCAnd2VlaycgPSAnZGF5JywgcGFnZTogbnVtYmVyID0gMSk6IFByb21pc2U8QVBJUmVzcG9uc2U8TW92aWUgfCBUVlNob3c+PiB7XG4gICAgLy8gR2V0IHRyZW5kaW5nIGZyb20gbXVsdGlwbGUgcmVnaW9ucyBmb3IgY29tcHJlaGVuc2l2ZSBjb3ZlcmFnZSwgcHJpb3JpdGl6aW5nIFNwYW5pc2hcbiAgICBjb25zdCBbc3BhbmlzaFRyZW5kaW5nLCBnbG9iYWxUcmVuZGluZywgdXNUcmVuZGluZ10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmZldGNoRGF0YShgL3RyZW5kaW5nL2FsbC8ke3RpbWVXaW5kb3d9P2xhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZyZWdpb249RVNgLCBwYWdlID09PSAxKSxcbiAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvdHJlbmRpbmcvYWxsLyR7dGltZVdpbmRvd30/bGFuZ3VhZ2U9ZXMtRVMmcGFnZT0ke3BhZ2V9YCwgcGFnZSA9PT0gMSksXG4gICAgICB0aGlzLmZldGNoRGF0YShgL3RyZW5kaW5nL2FsbC8ke3RpbWVXaW5kb3d9P2xhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZyZWdpb249VVNgLCBwYWdlID09PSAxKVxuICAgIF0pO1xuXG4gICAgY29uc3QgY29tYmluZWRSZXN1bHRzID0gW1xuICAgICAgLi4uc3BhbmlzaFRyZW5kaW5nLnJlc3VsdHMsXG4gICAgICAuLi5nbG9iYWxUcmVuZGluZy5yZXN1bHRzLmZpbHRlcihpdGVtID0+XG4gICAgICAgICFzcGFuaXNoVHJlbmRpbmcucmVzdWx0cy5zb21lKHNwYW5pc2hJdGVtID0+IHNwYW5pc2hJdGVtLmlkID09PSBpdGVtLmlkKVxuICAgICAgKSxcbiAgICAgIC4uLnVzVHJlbmRpbmcucmVzdWx0cy5maWx0ZXIoaXRlbSA9PlxuICAgICAgICAhc3BhbmlzaFRyZW5kaW5nLnJlc3VsdHMuc29tZShzcGFuaXNoSXRlbSA9PiBzcGFuaXNoSXRlbS5pZCA9PT0gaXRlbS5pZCkgJiZcbiAgICAgICAgIWdsb2JhbFRyZW5kaW5nLnJlc3VsdHMuc29tZShnbG9iYWxJdGVtID0+IGdsb2JhbEl0ZW0uaWQgPT09IGl0ZW0uaWQpXG4gICAgICApXG4gICAgXTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zcGFuaXNoVHJlbmRpbmcsXG4gICAgICByZXN1bHRzOiBjb250ZW50RmlsdGVyU2VydmljZS5maWx0ZXJDb250ZW50KHRoaXMucmVtb3ZlRHVwbGljYXRlcyhjb21iaW5lZFJlc3VsdHMpKVxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRUcmVuZGluZ01vdmllcyh0aW1lV2luZG93OiAnZGF5JyB8ICd3ZWVrJyA9ICdkYXknLCBwYWdlOiBudW1iZXIgPSAxKTogUHJvbWlzZTxBUElSZXNwb25zZTxNb3ZpZT4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2hEYXRhPEFQSVJlc3BvbnNlPE1vdmllPj4oYC90cmVuZGluZy9tb3ZpZS8ke3RpbWVXaW5kb3d9P2xhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfWAsIHBhZ2UgPT09IDEpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXNwb25zZSxcbiAgICAgIHJlc3VsdHM6IGNvbnRlbnRGaWx0ZXJTZXJ2aWNlLmZpbHRlckNvbnRlbnQocmVzcG9uc2UucmVzdWx0cylcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0VHJlbmRpbmdUVih0aW1lV2luZG93OiAnZGF5JyB8ICd3ZWVrJyA9ICdkYXknLCBwYWdlOiBudW1iZXIgPSAxKTogUHJvbWlzZTxBUElSZXNwb25zZTxUVlNob3c+PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmZldGNoRGF0YTxBUElSZXNwb25zZTxUVlNob3c+PihgL3RyZW5kaW5nL3R2LyR7dGltZVdpbmRvd30/bGFuZ3VhZ2U9ZXMtRVMmcGFnZT0ke3BhZ2V9YCwgcGFnZSA9PT0gMSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3BvbnNlLFxuICAgICAgcmVzdWx0czogY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudChyZXNwb25zZS5yZXN1bHRzKVxuICAgIH07XG4gIH1cblxuICAvLyBFbmhhbmNlZCBjb250ZW50IGRpc2NvdmVyeSBtZXRob2RzXG4gIGFzeW5jIGdldERpc2NvdmVyTW92aWVzKHBhcmFtczoge1xuICAgIGdlbnJlPzogbnVtYmVyO1xuICAgIHllYXI/OiBudW1iZXI7XG4gICAgc29ydEJ5Pzogc3RyaW5nO1xuICAgIHBhZ2U/OiBudW1iZXI7XG4gIH0gPSB7fSk6IFByb21pc2U8QVBJUmVzcG9uc2U8TW92aWU+PiB7XG4gICAgY29uc3QgeyBnZW5yZSwgeWVhciwgc29ydEJ5ID0gJ3BvcHVsYXJpdHkuZGVzYycsIHBhZ2UgPSAxIH0gPSBwYXJhbXM7XG4gICAgbGV0IGVuZHBvaW50ID0gYC9kaXNjb3Zlci9tb3ZpZT9sYW5ndWFnZT1lcy1FUyZwYWdlPSR7cGFnZX0mc29ydF9ieT0ke3NvcnRCeX0maW5jbHVkZV9hZHVsdD1mYWxzZWA7XG4gICAgXG4gICAgaWYgKGdlbnJlKSBlbmRwb2ludCArPSBgJndpdGhfZ2VucmVzPSR7Z2VucmV9YDtcbiAgICBpZiAoeWVhcikgZW5kcG9pbnQgKz0gYCZ5ZWFyPSR7eWVhcn1gO1xuICAgIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5mZXRjaERhdGE8QVBJUmVzcG9uc2U8TW92aWU+PihlbmRwb2ludCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3BvbnNlLFxuICAgICAgcmVzdWx0czogY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudChyZXNwb25zZS5yZXN1bHRzKVxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXREaXNjb3ZlclRWU2hvd3MocGFyYW1zOiB7XG4gICAgZ2VucmU/OiBudW1iZXI7XG4gICAgeWVhcj86IG51bWJlcjtcbiAgICBzb3J0Qnk/OiBzdHJpbmc7XG4gICAgcGFnZT86IG51bWJlcjtcbiAgICBjb3VudHJ5Pzogc3RyaW5nO1xuICB9ID0ge30pOiBQcm9taXNlPEFQSVJlc3BvbnNlPFRWU2hvdz4+IHtcbiAgICBjb25zdCB7IGdlbnJlLCB5ZWFyLCBzb3J0QnkgPSAncG9wdWxhcml0eS5kZXNjJywgcGFnZSA9IDEsIGNvdW50cnkgfSA9IHBhcmFtcztcbiAgICBsZXQgZW5kcG9pbnQgPSBgL2Rpc2NvdmVyL3R2P2xhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZzb3J0X2J5PSR7c29ydEJ5fSZpbmNsdWRlX2FkdWx0PWZhbHNlYDtcbiAgICBcbiAgICBpZiAoZ2VucmUpIGVuZHBvaW50ICs9IGAmd2l0aF9nZW5yZXM9JHtnZW5yZX1gO1xuICAgIGlmICh5ZWFyKSBlbmRwb2ludCArPSBgJmZpcnN0X2Fpcl9kYXRlX3llYXI9JHt5ZWFyfWA7XG4gICAgaWYgKGNvdW50cnkpIGVuZHBvaW50ICs9IGAmd2l0aF9vcmlnaW5fY291bnRyeT0ke2NvdW50cnl9YDtcbiAgICBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2hEYXRhPEFQSVJlc3BvbnNlPFRWU2hvdz4+KGVuZHBvaW50KTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzcG9uc2UsXG4gICAgICByZXN1bHRzOiBjb250ZW50RmlsdGVyU2VydmljZS5maWx0ZXJDb250ZW50KHJlc3BvbnNlLnJlc3VsdHMpXG4gICAgfTtcbiAgfVxuXG4gIC8vIFV0aWxpdHkgbWV0aG9kIHRvIHJlbW92ZSBkdXBsaWNhdGVzIGZyb20gY29tYmluZWQgcmVzdWx0c1xuICByZW1vdmVEdXBsaWNhdGVzPFQgZXh0ZW5kcyB7IGlkOiBudW1iZXIgfT4oaXRlbXM6IFRbXSk6IFRbXSB7XG4gICAgY29uc3Qgc2VlbiA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICBpZiAoc2Vlbi5oYXMoaXRlbS5pZCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgc2Vlbi5hZGQoaXRlbS5pZCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEdldCBmcmVzaCB0cmVuZGluZyBjb250ZW50IGZvciBoZXJvIGNhcm91c2VsIChubyBkdXBsaWNhdGVzKVxuICBhc3luYyBnZXRIZXJvQ29udGVudCgpOiBQcm9taXNlPChNb3ZpZSB8IFRWU2hvdylbXT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgdGhlIG1vc3QgY3VycmVudCBhbmQgZGl2ZXJzZSBjb250ZW50IGZvciBoZXJvIHdpdGggU3BhbmlzaCBsYW5ndWFnZSBwcmlvcml0eVxuICAgICAgY29uc3QgW3RyZW5kaW5nRGF5LCB0cmVuZGluZ1dlZWssIHBvcHVsYXJNb3ZpZXMsIHBvcHVsYXJUViwgbm93UGxheWluZ01vdmllcywgYWlyaW5nVG9kYXlUVl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuZ2V0VHJlbmRpbmdBbGwoJ2RheScsIDEpLFxuICAgICAgICB0aGlzLmdldFRyZW5kaW5nQWxsKCd3ZWVrJywgMSksXG4gICAgICAgIHRoaXMuZ2V0UG9wdWxhck1vdmllcygxKSxcbiAgICAgICAgdGhpcy5nZXRQb3B1bGFyVFZTaG93cygxKSxcbiAgICAgICAgdGhpcy5nZXROb3dQbGF5aW5nTW92aWVzKDEpLFxuICAgICAgICB0aGlzLmdldEFpcmluZ1RvZGF5VFZTaG93cygxKVxuICAgICAgXSk7XG5cbiAgICAgIC8vIENvbWJpbmUgYW5kIHByaW9yaXRpemUgdHJlbmRpbmcgY29udGVudFxuICAgICAgY29uc3QgY29tYmluZWRJdGVtcyA9IFtcbiAgICAgICAgLi4udHJlbmRpbmdEYXkucmVzdWx0cy5zbGljZSgwLCA2KSxcbiAgICAgICAgLi4udHJlbmRpbmdXZWVrLnJlc3VsdHMuc2xpY2UoMCwgNCksXG4gICAgICAgIC4uLm5vd1BsYXlpbmdNb3ZpZXMucmVzdWx0cy5zbGljZSgwLCAzKSxcbiAgICAgICAgLi4uYWlyaW5nVG9kYXlUVi5yZXN1bHRzLnNsaWNlKDAsIDMpLFxuICAgICAgICAuLi5wb3B1bGFyTW92aWVzLnJlc3VsdHMuc2xpY2UoMCwgMiksXG4gICAgICAgIC4uLnBvcHVsYXJUVi5yZXN1bHRzLnNsaWNlKDAsIDIpXG4gICAgICBdO1xuXG4gICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBhbmQgcmV0dXJuIHRvcCBpdGVtc1xuICAgICAgY29uc3QgdW5pcXVlSXRlbXMgPSBjb250ZW50RmlsdGVyU2VydmljZS5maWx0ZXJDb250ZW50KHRoaXMucmVtb3ZlRHVwbGljYXRlcyhjb21iaW5lZEl0ZW1zKSkuc2xpY2UoMCwgMTIpO1xuXG4gICAgICAvLyBFbnN1cmUgYWxsIGl0ZW1zIGhhdmUgU3BhbmlzaCBvdmVydmlldyBieSBmZXRjaGluZyBkZXRhaWxzIGlmIG5lZWRlZFxuICAgICAgY29uc3QgaXRlbXNXaXRoU3BhbmlzaE92ZXJ2aWV3ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHVuaXF1ZUl0ZW1zLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICAgIC8vIElmIG92ZXJ2aWV3IGlzIG1pc3Npbmcgb3IgdmVyeSBzaG9ydCwgdHJ5IHRvIGdldCBpdCBmcm9tIGRldGFpbHNcbiAgICAgICAgICBpZiAoIWl0ZW0ub3ZlcnZpZXcgfHwgaXRlbS5vdmVydmlldy50cmltKCkubGVuZ3RoIDwgMjApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzTW92aWUgPSAndGl0bGUnIGluIGl0ZW07XG4gICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBpc01vdmllXG4gICAgICAgICAgICAgICAgPyBhd2FpdCB0aGlzLmdldE1vdmllRGV0YWlscyhpdGVtLmlkKVxuICAgICAgICAgICAgICAgIDogYXdhaXQgdGhpcy5nZXRUVlNob3dEZXRhaWxzKGl0ZW0uaWQpO1xuXG4gICAgICAgICAgICAgIGlmIChkZXRhaWxzICYmIGRldGFpbHMub3ZlcnZpZXcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5pdGVtLCBvdmVydmlldzogZGV0YWlscy5vdmVydmlldyB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmZXRjaCBkZXRhaWxzIGZvciBpdGVtICR7aXRlbS5pZH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gaXRlbXNXaXRoU3BhbmlzaE92ZXJ2aWV3O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBoZXJvIGNvbnRlbnQ6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8vIEVuaGFuY2VkIHNlYXJjaCBmb3IgcGVvcGxlIGFuZCB0aGVpciBjb250ZW50XG4gIGFzeW5jIHNlYXJjaFBlb3BsZShxdWVyeTogc3RyaW5nLCBwYWdlOiBudW1iZXIgPSAxKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBlbmNvZGVkUXVlcnkgPSBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLmZldGNoRGF0YShgL3NlYXJjaC9wZXJzb24/cXVlcnk9JHtlbmNvZGVkUXVlcnl9Jmxhbmd1YWdlPWVzLUVTJnBhZ2U9JHtwYWdlfSZpbmNsdWRlX2FkdWx0PWZhbHNlYCk7XG4gIH1cblxuICAvLyBHZXQgcGVyc29uIGRldGFpbHMgYW5kIHRoZWlyIGZpbG1vZ3JhcGh5XG4gIGFzeW5jIGdldFBlcnNvbkRldGFpbHMoaWQ6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IFtwZXJzb25EZXRhaWxzLCBtb3ZpZUNyZWRpdHMsIHR2Q3JlZGl0c10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvcGVyc29uLyR7aWR9P2xhbmd1YWdlPWVzLUVTYCksXG4gICAgICAgIHRoaXMuZmV0Y2hEYXRhKGAvcGVyc29uLyR7aWR9L21vdmllX2NyZWRpdHM/bGFuZ3VhZ2U9ZXMtRVNgKSxcbiAgICAgICAgdGhpcy5mZXRjaERhdGEoYC9wZXJzb24vJHtpZH0vdHZfY3JlZGl0cz9sYW5ndWFnZT1lcy1FU2ApXG4gICAgICBdKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucGVyc29uRGV0YWlscyxcbiAgICAgICAgbW92aWVfY3JlZGl0czogbW92aWVDcmVkaXRzLFxuICAgICAgICB0dl9jcmVkaXRzOiB0dkNyZWRpdHNcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHBlcnNvbiBkZXRhaWxzIGZvciAke2lkfTpgLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvLyBGb3JjZSByZWZyZXNoIGFsbCBjYWNoZWQgY29udGVudFxuICBhc3luYyBmb3JjZVJlZnJlc2hBbGxDb250ZW50KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIENsZWFyIGFsbCBjYWNoZXNcbiAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgICBcbiAgICAvLyBDbGVhciBmcmVzaCBjb250ZW50IGNhY2hlXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSk7XG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ2ZyZXNoXycpIHx8IGtleS5pbmNsdWRlcygndHJlbmRpbmcnKSB8fCBrZXkuaW5jbHVkZXMoJ3BvcHVsYXInKSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdBbGwgY29udGVudCBjYWNoZXMgY2xlYXJlZCwgZnJlc2ggZGF0YSB3aWxsIGJlIGZldGNoZWQnKTtcbiAgfVxuXG4gIC8vIEJhdGNoIGZldGNoIHZpZGVvcyBmb3IgbXVsdGlwbGUgaXRlbXNcbiAgYXN5bmMgYmF0Y2hGZXRjaFZpZGVvcyhpdGVtczogeyBpZDogbnVtYmVyOyB0eXBlOiAnbW92aWUnIHwgJ3R2JyB9W10pOiBQcm9taXNlPE1hcDxzdHJpbmcsIFZpZGVvW10+PiB7XG4gICAgY29uc3QgdmlkZW9NYXAgPSBuZXcgTWFwPHN0cmluZywgVmlkZW9bXT4oKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmlkZW9Qcm9taXNlcyA9IGl0ZW1zLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBgJHtpdGVtLnR5cGV9LSR7aXRlbS5pZH1gO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHZpZGVvcyA9IGl0ZW0udHlwZSA9PT0gJ21vdmllJyBcbiAgICAgICAgICAgID8gYXdhaXQgdGhpcy5nZXRNb3ZpZVZpZGVvcyhpdGVtLmlkKVxuICAgICAgICAgICAgOiBhd2FpdCB0aGlzLmdldFRWU2hvd1ZpZGVvcyhpdGVtLmlkKTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCB0cmFpbGVycyA9IHZpZGVvcy5yZXN1bHRzLmZpbHRlcihcbiAgICAgICAgICAgIHZpZGVvID0+IHZpZGVvLnNpdGUgPT09ICdZb3VUdWJlJyAmJiAodmlkZW8udHlwZSA9PT0gJ1RyYWlsZXInIHx8IHZpZGVvLnR5cGUgPT09ICdUZWFzZXInKVxuICAgICAgICAgICk7XG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHsga2V5LCB2aWRlb3M6IHRyYWlsZXJzIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBObyB2aWRlb3MgYXZhaWxhYmxlIGZvciAke2tleX1gKTtcbiAgICAgICAgICByZXR1cm4geyBrZXksIHZpZGVvczogW10gfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQodmlkZW9Qcm9taXNlcyk7XG4gICAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ2Z1bGZpbGxlZCcpIHtcbiAgICAgICAgICBjb25zdCB7IGtleSwgdmlkZW9zIH0gPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgdmlkZW9NYXAuc2V0KGtleSwgdmlkZW9zKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIGJhdGNoIGZldGNoIHZpZGVvczonLCBlcnJvcik7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB2aWRlb01hcDtcbiAgfVxuXG4gIC8vIENsZWFyIEFQSSBjYWNoZVxuICBjbGVhckNhY2hlKCk6IHZvaWQge1xuICAgIGFwaVNlcnZpY2UuY2xlYXJDYWNoZSgpO1xuICB9XG5cbiAgLy8gR2V0IGNhY2hlIHN0YXRpc3RpY3NcbiAgZ2V0Q2FjaGVTdGF0cygpOiB7IHNpemU6IG51bWJlcjsgaXRlbXM6IHsga2V5OiBzdHJpbmc7IGFnZTogbnVtYmVyIH1bXSB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgc2l6ZTogYXBpU2VydmljZS5nZXRDYWNoZVNpemUoKSxcbiAgICAgIGl0ZW1zOiBhcGlTZXJ2aWNlLmdldENhY2hlSW5mbygpXG4gICAgfTtcbiAgfVxuXG4gIC8vIEVuaGFuY2VkIHN5bmMgbWV0aG9kIGZvciBiZXR0ZXIgY29udGVudCBmcmVzaG5lc3NcbiAgYXN5bmMgc3luY0FsbENvbnRlbnQoKTogUHJvbWlzZTx7XG4gICAgbW92aWVzOiBNb3ZpZVtdO1xuICAgIHR2U2hvd3M6IFRWU2hvd1tdO1xuICAgIGFuaW1lOiBUVlNob3dbXTtcbiAgICB0cmVuZGluZzogKE1vdmllIHwgVFZTaG93KVtdO1xuICB9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IFtcbiAgICAgICAgcG9wdWxhck1vdmllcyxcbiAgICAgICAgdG9wUmF0ZWRNb3ZpZXMsXG4gICAgICAgIHVwY29taW5nTW92aWVzLFxuICAgICAgICBwb3B1bGFyVFYsXG4gICAgICAgIHRvcFJhdGVkVFYsXG4gICAgICAgIHBvcHVsYXJBbmltZSxcbiAgICAgICAgdG9wUmF0ZWRBbmltZSxcbiAgICAgICAgdHJlbmRpbmdEYXksXG4gICAgICAgIHRyZW5kaW5nV2Vla1xuICAgICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpcy5nZXRQb3B1bGFyTW92aWVzKDEpLFxuICAgICAgICB0aGlzLmdldFRvcFJhdGVkTW92aWVzKDEpLFxuICAgICAgICB0aGlzLmdldFVwY29taW5nTW92aWVzKDEpLFxuICAgICAgICB0aGlzLmdldFBvcHVsYXJUVlNob3dzKDEpLFxuICAgICAgICB0aGlzLmdldFRvcFJhdGVkVFZTaG93cygxKSxcbiAgICAgICAgdGhpcy5nZXRBbmltZUZyb21NdWx0aXBsZVNvdXJjZXMoMSksXG4gICAgICAgIHRoaXMuZ2V0VG9wUmF0ZWRBbmltZSgxKSxcbiAgICAgICAgdGhpcy5nZXRUcmVuZGluZ0FsbCgnZGF5JywgMSksXG4gICAgICAgIHRoaXMuZ2V0VHJlbmRpbmdBbGwoJ3dlZWsnLCAxKVxuICAgICAgXSk7XG5cbiAgICAgIC8vIENvbWJpbmUgYW5kIGRlZHVwbGljYXRlIGNvbnRlbnRcbiAgICAgIGNvbnN0IG1vdmllcyA9IHRoaXMucmVtb3ZlRHVwbGljYXRlcyhbXG4gICAgICAgIC4uLnBvcHVsYXJNb3ZpZXMucmVzdWx0cyxcbiAgICAgICAgLi4udG9wUmF0ZWRNb3ZpZXMucmVzdWx0cyxcbiAgICAgICAgLi4udXBjb21pbmdNb3ZpZXMucmVzdWx0c1xuICAgICAgXSk7XG5cbiAgICAgIGNvbnN0IHR2U2hvd3MgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoW1xuICAgICAgICAuLi5wb3B1bGFyVFYucmVzdWx0cyxcbiAgICAgICAgLi4udG9wUmF0ZWRUVi5yZXN1bHRzXG4gICAgICBdKTtcblxuICAgICAgY29uc3QgYW5pbWUgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoW1xuICAgICAgICAuLi5wb3B1bGFyQW5pbWUucmVzdWx0cyxcbiAgICAgICAgLi4udG9wUmF0ZWRBbmltZS5yZXN1bHRzXG4gICAgICBdKTtcblxuICAgICAgY29uc3QgdHJlbmRpbmcgPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoW1xuICAgICAgICAuLi50cmVuZGluZ0RheS5yZXN1bHRzLFxuICAgICAgICAuLi50cmVuZGluZ1dlZWsucmVzdWx0c1xuICAgICAgXSk7XG5cbiAgICAgIHJldHVybiB7IG1vdmllcywgdHZTaG93cywgYW5pbWUsIHRyZW5kaW5nIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHN5bmNpbmcgYWxsIGNvbnRlbnQ6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIHsgbW92aWVzOiBbXSwgdHZTaG93czogW10sIGFuaW1lOiBbXSwgdHJlbmRpbmc6IFtdIH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0bWRiU2VydmljZSA9IG5ldyBUTURCU2VydmljZSgpOyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxVQUFVLG1CQUFtQjtBQUN0QyxTQUFTLGtCQUFrQjtBQUMzQixTQUFTLDRCQUE0QjtBQUdyQyxNQUFNLFlBQVk7QUFBQSxFQUNDLCtCQUErQixLQUFLLEtBQUs7QUFBQTtBQUFBLEVBQ3pDLHlCQUF5QixLQUFLLEtBQUs7QUFBQTtBQUFBLEVBRXBELE1BQWMsVUFBYSxVQUFrQixXQUFvQixNQUFrQjtBQUVqRixRQUFJLFNBQVMsU0FBUyxVQUFVLEtBQUssU0FBUyxTQUFTLFdBQVcsS0FBSyxTQUFTLFNBQVMsY0FBYyxHQUFHO0FBQ3hHLGFBQU8sS0FBSyxvQkFBdUIsVUFBVSxRQUFRO0FBQUEsSUFDdkQ7QUFDQSxXQUFPLFdBQVcsZUFBa0IsVUFBVSxRQUFRO0FBQUEsRUFDeEQ7QUFBQSxFQUVBLE1BQWMsb0JBQXVCLFVBQWtCLFdBQW9CLE1BQWtCO0FBRTNGLFVBQU0sV0FB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