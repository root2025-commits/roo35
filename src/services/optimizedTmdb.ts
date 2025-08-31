import { BASE_URL, API_OPTIONS } from '../config/api';
import { apiCache, contentCache } from '../utils/cache';
import { debounce, memoize } from '../utils/performance';
import type { Movie, TVShow, MovieDetails, TVShowDetails, Video, APIResponse, Genre, Cast } from '../types/movie';

class OptimizedTMDBService {
  private requestQueue: Map<string, Promise<any>> = new Map();
  private batchSize = 10;
  private requestDelay = 100; // ms between requests

  private async fetchWithCache<T>(endpoint: string, cacheKey?: string, ttl?: number): Promise<T> {
    const key = cacheKey || endpoint;
    
    // Check cache first
    const cached = apiCache.get<T>(key);
    if (cached) {
      return cached;
    }

    // Check if request is already in progress
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key);
    }

    // Create new request
    const request = this.fetchData<T>(endpoint);
    this.requestQueue.set(key, request);

    try {
      const result = await request;
      apiCache.set(key, result, ttl);
      return result;
    } finally {
      this.requestQueue.delete(key);
    }
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Batch request processing
  private async processBatch<T>(requests: (() => Promise<T>)[]): Promise<T[]> {
    const results: T[] = [];
    
    for (let i = 0; i < requests.length; i += this.batchSize) {
      const batch = requests.slice(i, i + this.batchSize);
      const batchResults = await Promise.all(batch.map(req => req()));
      results.push(...batchResults);
      
      // Add delay between batches to avoid rate limiting
      if (i + this.batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, this.requestDelay));
      }
    }
    
    return results;
  }

  // Enhanced video fetching with better caching
  private async getVideosWithFallback(endpoint: string, id: number, type: 'movie' | 'tv'): Promise<{ results: Video[] }> {
    const cacheKey = `videos:${type}:${id}`;
    
    try {
      // Check content cache first (longer TTL for videos)
      const cached = contentCache.get<{ results: Video[] }>(cacheKey);
      if (cached) {
        return cached;
      }

      // Try Spanish first
      const spanishVideos = await this.fetchData<{ results: Video[] }>(`${endpoint}?language=es-ES`);
      
      // If no Spanish videos, try English
      if (!spanishVideos.results || spanishVideos.results.length === 0) {
        const englishVideos = await this.fetchData<{ results: Video[] }>(`${endpoint}?language=en-US`);
        contentCache.set(cacheKey, englishVideos, 30 * 60 * 1000); // 30 minutes
        return englishVideos;
      }
      
      // Filter for quality videos
      const qualityVideos = spanishVideos.results.filter(
        video => video.site === 'YouTube' && 
                (video.type === 'Trailer' || video.type === 'Teaser') &&
                video.official
      );
      
      const result = { results: qualityVideos };
      contentCache.set(cacheKey, result, 30 * 60 * 1000); // 30 minutes
      return result;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return { results: [] };
    }
  }

  // Optimized duplicate removal with Set for O(n) complexity
  removeDuplicates<T extends { id: number }>(items: T[]): T[] {
    const seen = new Set<number>();
    return items.filter(item => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }

  // Movies with caching
  async getPopularMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchWithCache(`/movie/popular?language=es-ES&page=${page}`, `popular_movies_${page}`, 10 * 60 * 1000);
  }

  async getTopRatedMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchWithCache(`/movie/top_rated?language=es-ES&page=${page}`, `top_rated_movies_${page}`, 15 * 60 * 1000);
  }

  async getUpcomingMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchWithCache(`/movie/upcoming?language=es-ES&page=${page}`, `upcoming_movies_${page}`, 30 * 60 * 1000);
  }

  async searchMovies(query: string, page: number = 1): Promise<APIResponse<Movie>> {
    const encodedQuery = encodeURIComponent(query);
    const cacheKey = `search_movies_${encodedQuery}_${page}`;
    return this.fetchWithCache(`/search/movie?query=${encodedQuery}&language=es-ES&page=${page}`, cacheKey, 5 * 60 * 1000);
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.fetchWithCache(`/movie/${id}?language=es-ES`, `movie_details_${id}`, 60 * 60 * 1000);
  }

  async getMovieVideos(id: number): Promise<{ results: Video[] }> {
    return this.getVideosWithFallback(`/movie/${id}/videos`, id, 'movie');
  }

  async getMovieCredits(id: number): Promise<Cast> {
    return this.fetchWithCache(`/movie/${id}/credits?language=es-ES`, `movie_credits_${id}`, 60 * 60 * 1000);
  }

  // TV Shows with caching
  async getPopularTVShows(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchWithCache(`/tv/popular?language=es-ES&page=${page}`, `popular_tv_${page}`, 10 * 60 * 1000);
  }

  async getTopRatedTVShows(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchWithCache(`/tv/top_rated?language=es-ES&page=${page}`, `top_rated_tv_${page}`, 15 * 60 * 1000);
  }

  async searchTVShows(query: string, page: number = 1): Promise<APIResponse<TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    const cacheKey = `search_tv_${encodedQuery}_${page}`;
    return this.fetchWithCache(`/search/tv?query=${encodedQuery}&language=es-ES&page=${page}`, cacheKey, 5 * 60 * 1000);
  }

  async getTVShowDetails(id: number): Promise<TVShowDetails> {
    return this.fetchWithCache(`/tv/${id}?language=es-ES`, `tv_details_${id}`, 60 * 60 * 1000);
  }

  async getTVShowVideos(id: number): Promise<{ results: Video[] }> {
    return this.getVideosWithFallback(`/tv/${id}/videos`, id, 'tv');
  }

  async getTVShowCredits(id: number): Promise<Cast> {
    return this.fetchWithCache(`/tv/${id}/credits?language=es-ES`, `tv_credits_${id}`, 60 * 60 * 1000);
  }

  // Optimized anime fetching
  async getAnimeFromMultipleSources(page: number = 1): Promise<APIResponse<TVShow>> {
    const cacheKey = `anime_multi_${page}`;
    const cached = contentCache.get<APIResponse<TVShow>>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const [japaneseAnime, animationGenre] = await Promise.all([
        this.fetchWithCache<APIResponse<TVShow>>(`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=${page}&sort_by=popularity.desc&include_adult=false`, `jp_anime_${page}`),
        this.fetchWithCache<APIResponse<TVShow>>(`/discover/tv?with_genres=16&language=es-ES&page=${page}&sort_by=popularity.desc&include_adult=false`, `animation_${page}`)
      ]);

      const combinedResults = [
        ...japaneseAnime.results,
        ...animationGenre.results.filter(item => 
          !japaneseAnime.results.some(jp => jp.id === item.id)
        )
      ];

      const result = {
        ...japaneseAnime,
        results: this.removeDuplicates(combinedResults)
      };

      contentCache.set(cacheKey, result, 15 * 60 * 1000); // 15 minutes
      return result;
    } catch (error) {
      console.error('Error fetching anime:', error);
      return { page, results: [], total_pages: 0, total_results: 0 };
    }
  }

  async getTopRatedAnime(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchWithCache(`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=${page}&sort_by=vote_average.desc&vote_count.gte=100&include_adult=false`, `top_anime_${page}`, 20 * 60 * 1000);
  }

  async searchAnime(query: string, page: number = 1): Promise<APIResponse<TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    const cacheKey = `search_anime_${encodedQuery}_${page}`;
    return this.fetchWithCache(`/search/tv?query=${encodedQuery}&language=es-ES&page=${page}`, cacheKey, 5 * 60 * 1000);
  }

  // Trending content with smart caching
  async getTrendingAll(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<Movie | TVShow>> {
    const ttl = timeWindow === 'day' ? 2 * 60 * 60 * 1000 : 6 * 60 * 60 * 1000; // 2h for day, 6h for week
    return this.fetchWithCache(`/trending/all/${timeWindow}?language=es-ES&page=${page}`, `trending_${timeWindow}_${page}`, ttl);
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<Movie>> {
    const ttl = timeWindow === 'day' ? 2 * 60 * 60 * 1000 : 6 * 60 * 60 * 1000;
    return this.fetchWithCache(`/trending/movie/${timeWindow}?language=es-ES&page=${page}`, `trending_movies_${timeWindow}_${page}`, ttl);
  }

  async getTrendingTV(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<TVShow>> {
    const ttl = timeWindow === 'day' ? 2 * 60 * 60 * 1000 : 6 * 60 * 60 * 1000;
    return this.fetchWithCache(`/trending/tv/${timeWindow}?language=es-ES&page=${page}`, `trending_tv_${timeWindow}_${page}`, ttl);
  }

  // Multi search with intelligent caching
  async searchMulti(query: string, page: number = 1): Promise<APIResponse<Movie | TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    const cacheKey = `search_multi_${encodedQuery}_${page}`;
    return this.fetchWithCache(`/search/multi?query=${encodedQuery}&language=es-ES&page=${page}`, cacheKey, 5 * 60 * 1000);
  }

  // Optimized hero content with smart refresh
  async getHeroContent(): Promise<(Movie | TVShow)[]> {
    const cacheKey = 'hero_content';
    const cached = contentCache.get<(Movie | TVShow)[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const [trendingDay, popularMovies, popularTV] = await Promise.all([
        this.getTrendingAll('day', 1),
        this.getPopularMovies(1),
        this.getPopularTVShows(1)
      ]);

      const combinedItems = [
        ...trendingDay.results.slice(0, 6),
        ...popularMovies.results.slice(0, 2),
        ...popularTV.results.slice(0, 2)
      ];

      const result = this.removeDuplicates(combinedItems).slice(0, 8);
      contentCache.set(cacheKey, result, 60 * 60 * 1000); // 1 hour
      return result;
    } catch (error) {
      console.error('Error fetching hero content:', error);
      return [];
    }
  }

  // Optimized batch video fetching
  async batchFetchVideos(items: { id: number; type: 'movie' | 'tv' }[]): Promise<Map<string, Video[]>> {
    const videoMap = new Map<string, Video[]>();
    
    const requests = items.map(item => async () => {
      const key = `${item.type}-${item.id}`;
      try {
        const videos = item.type === 'movie' 
          ? await this.getMovieVideos(item.id)
          : await this.getTVShowVideos(item.id);
        
        const trailers = videos.results.filter(
          video => video.site === 'YouTube' && 
                  (video.type === 'Trailer' || video.type === 'Teaser') &&
                  video.official
        );
        
        return { key, videos: trailers };
      } catch (error) {
        console.error(`Error fetching videos for ${key}:`, error);
        return { key, videos: [] };
      }
    });

    const results = await this.processBatch(requests);
    results.forEach(({ key, videos }) => {
      videoMap.set(key, videos);
    });
    
    return videoMap;
  }

  // Memoized genre fetching
  getMovieGenres = memoize(async (): Promise<{ genres: Genre[] }> => {
    return this.fetchWithCache('/genre/movie/list?language=es-ES', 'movie_genres', 24 * 60 * 60 * 1000);
  });

  getTVGenres = memoize(async (): Promise<{ genres: Genre[] }> => {
    return this.fetchWithCache('/genre/tv/list?language=es-ES', 'tv_genres', 24 * 60 * 60 * 1000);
  });

  // Optimized discovery with intelligent caching
  async getDiscoverMovies(params: {
    genre?: number;
    year?: number;
    sortBy?: string;
    page?: number;
  } = {}): Promise<APIResponse<Movie>> {
    const { genre, year, sortBy = 'popularity.desc', page = 1 } = params;
    let endpoint = `/discover/movie?language=es-ES&page=${page}&sort_by=${sortBy}&include_adult=false`;
    
    if (genre) endpoint += `&with_genres=${genre}`;
    if (year) endpoint += `&year=${year}`;
    
    const cacheKey = `discover_movies_${JSON.stringify(params)}`;
    return this.fetchWithCache(endpoint, cacheKey, 20 * 60 * 1000);
  }

  async getDiscoverTVShows(params: {
    genre?: number;
    year?: number;
    sortBy?: string;
    page?: number;
    country?: string;
  } = {}): Promise<APIResponse<TVShow>> {
    const { genre, year, sortBy = 'popularity.desc', page = 1, country } = params;
    let endpoint = `/discover/tv?language=es-ES&page=${page}&sort_by=${sortBy}&include_adult=false`;
    
    if (genre) endpoint += `&with_genres=${genre}`;
    if (year) endpoint += `&first_air_date_year=${year}`;
    if (country) endpoint += `&with_origin_country=${country}`;
    
    const cacheKey = `discover_tv_${JSON.stringify(params)}`;
    return this.fetchWithCache(endpoint, cacheKey, 20 * 60 * 1000);
  }

  // Cache management methods
  clearCache(): void {
    apiCache.invalidateAll();
    contentCache.invalidateAll();
  }

  getCacheStats() {
    return {
      api: apiCache.getStats?.() || { size: 0, maxSize: 0, keys: [] },
      content: contentCache.getStats?.() || { size: 0, maxSize: 0, keys: [] }
    };
  }

  // Preload critical content
  async preloadCriticalContent(): Promise<void> {
    try {
      await Promise.all([
        this.getHeroContent(),
        this.getPopularMovies(1),
        this.getPopularTVShows(1),
        this.getTrendingAll('day', 1)
      ]);
    } catch (error) {
      console.error('Error preloading content:', error);
    }
  }
}

export const optimizedTmdbService = new OptimizedTMDBService();

// Backward compatibility
export const tmdbService = optimizedTmdbService;