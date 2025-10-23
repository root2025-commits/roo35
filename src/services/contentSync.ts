import { tmdbService } from "/src/services/tmdb.ts";
import { contentFilterService } from "/src/services/contentFilter.ts";
class ContentSyncService {
  lastDailyUpdate = null;
  lastWeeklyUpdate = null;
  syncInProgress = false;
  constructor() {
    this.initializeAutoSync();
  }
  initializeAutoSync() {
    setInterval(() => {
      this.checkAndSync();
    }, 60 * 60 * 1e3);
    this.checkAndSync();
  }
  async checkAndSync() {
    if (this.syncInProgress) return;
    const now = /* @__PURE__ */ new Date();
    const shouldDailyUpdate = this.shouldPerformDailyUpdate(now);
    const shouldWeeklyUpdate = this.shouldPerformWeeklyUpdate(now);
    if (shouldDailyUpdate || shouldWeeklyUpdate) {
      await this.performSync(shouldWeeklyUpdate);
    }
  }
  shouldPerformDailyUpdate(now) {
    if (!this.lastDailyUpdate) return true;
    const timeDiff = now.getTime() - this.lastDailyUpdate.getTime();
    const hoursDiff = timeDiff / (1e3 * 60 * 60);
    return hoursDiff >= 24;
  }
  shouldPerformWeeklyUpdate(now) {
    if (!this.lastWeeklyUpdate) return true;
    const timeDiff = now.getTime() - this.lastWeeklyUpdate.getTime();
    const daysDiff = timeDiff / (1e3 * 60 * 60 * 24);
    return daysDiff >= 7;
  }
  async performSync(isWeeklyUpdate = false) {
    try {
      this.syncInProgress = true;
      console.log(`Performing ${isWeeklyUpdate ? "weekly" : "daily"} content sync...`);
      await Promise.all([
        this.syncTrendingContent("day"),
        this.syncTrendingContent("week"),
        this.syncPopularContent(),
        this.syncCurrentContent(),
        this.syncAnimeContent(),
        this.syncVideosForPopularContent()
      ]);
      const now = /* @__PURE__ */ new Date();
      this.lastDailyUpdate = now;
      if (isWeeklyUpdate) {
        this.lastWeeklyUpdate = now;
      }
      console.log("Content sync completed successfully");
    } catch (error) {
      console.error("Error during content sync:", error);
    } finally {
      this.syncInProgress = false;
    }
  }
  async syncCurrentContent() {
    try {
      const [nowPlayingMovies, airingTodayTV, onTheAirTV] = await Promise.all([
        tmdbService.getNowPlayingMovies(1),
        tmdbService.getAiringTodayTVShows(1),
        tmdbService.getOnTheAirTVShows(1)
      ]);
      localStorage.setItem("now_playing_movies", JSON.stringify({
        content: nowPlayingMovies.results,
        lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
      }));
      localStorage.setItem("airing_today_tv", JSON.stringify({
        content: airingTodayTV.results,
        lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
      }));
      localStorage.setItem("on_the_air_tv", JSON.stringify({
        content: onTheAirTV.results,
        lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
      }));
      return { nowPlayingMovies: nowPlayingMovies.results, airingTodayTV: airingTodayTV.results, onTheAirTV: onTheAirTV.results };
    } catch (error) {
      console.error("Error syncing current content:", error);
      return { nowPlayingMovies: [], airingTodayTV: [], onTheAirTV: [] };
    }
  }
  async syncVideosForPopularContent() {
    try {
      const [moviesRes, tvRes, animeRes, nowPlayingRes, airingTodayRes] = await Promise.all([
        tmdbService.getPopularMovies(1),
        tmdbService.getPopularTVShows(1),
        tmdbService.getAnimeFromMultipleSources(1),
        tmdbService.getNowPlayingMovies(1),
        tmdbService.getAiringTodayTVShows(1)
      ]);
      const items = [
        ...moviesRes.results.slice(0, 8).map((movie) => ({ id: movie.id, type: "movie" })),
        ...tvRes.results.slice(0, 8).map((tv) => ({ id: tv.id, type: "tv" })),
        ...animeRes.results.slice(0, 6).map((anime) => ({ id: anime.id, type: "tv" })),
        ...nowPlayingRes.results.slice(0, 8).map((movie) => ({ id: movie.id, type: "movie" })),
        ...airingTodayRes.results.slice(0, 6).map((tv) => ({ id: tv.id, type: "tv" }))
      ];
      const uniqueItems = items.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id && t.type === item.type)
      );
      try {
        const videoMap = await tmdbService.batchFetchVideos(uniqueItems);
        const videoData = {};
        videoMap.forEach((videos, key) => {
          videoData[key] = videos;
        });
        localStorage.setItem("content_videos", JSON.stringify({
          videos: videoData,
          lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
        }));
        console.log(`Synced videos for ${uniqueItems.length} unique items`);
      } catch (videoError) {
        console.warn("Some videos could not be synced:", videoError);
      }
    } catch (error) {
      console.error("Error syncing videos:", error);
    }
  }
  async syncTrendingContent(timeWindow) {
    try {
      const response = await tmdbService.getTrendingAll(timeWindow, 1);
      const filteredContent = contentFilterService.filterContent(response.results);
      const uniqueContent = tmdbService.removeDuplicates(filteredContent);
      localStorage.setItem(`trending_${timeWindow}`, JSON.stringify({
        content: uniqueContent,
        lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
      }));
      return uniqueContent;
    } catch (error) {
      console.error(`Error syncing trending ${timeWindow} content:`, error);
      return [];
    }
  }
  async syncPopularContent() {
    try {
      const [movies, tvShows] = await Promise.all([
        tmdbService.getPopularMovies(1),
        tmdbService.getPopularTVShows(1)
      ]);
      const filteredMovies = contentFilterService.filterContent(movies.results);
      const filteredTVShows = contentFilterService.filterContent(tvShows.results);
      localStorage.setItem("popular_movies", JSON.stringify({
        content: filteredMovies,
        lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
      }));
      localStorage.setItem("popular_tv", JSON.stringify({
        content: filteredTVShows,
        lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
      }));
      return { movies: filteredMovies, tvShows: filteredTVShows };
    } catch (error) {
      console.error("Error syncing popular content:", error);
      return { movies: [], tvShows: [] };
    }
  }
  async syncAnimeContent() {
    try {
      const anime = await tmdbService.getAnimeFromMultipleSources(1);
      const filteredAnime = contentFilterService.filterContent(anime.results);
      localStorage.setItem("popular_anime", JSON.stringify({
        content: filteredAnime,
        lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
      }));
      return filteredAnime;
    } catch (error) {
      console.error("Error syncing anime content:", error);
      return [];
    }
  }
  // Public methods for components to use
  async getTrendingContent(timeWindow) {
    const cached = localStorage.getItem(`trending_${timeWindow}`);
    if (cached) {
      try {
        const { content, lastUpdate } = JSON.parse(cached);
        const updateTime = new Date(lastUpdate);
        const now = /* @__PURE__ */ new Date();
        const hoursDiff = (now.getTime() - updateTime.getTime()) / (1e3 * 60 * 60);
        if (hoursDiff < 6) {
          return content;
        }
      } catch (error) {
        console.error("Error parsing cached content:", error);
      }
    }
    return await this.syncTrendingContent(timeWindow);
  }
  async getPopularContent() {
    const [movies, tvShows, anime] = await Promise.all([
      this.getCachedOrFresh("popular_movies", () => tmdbService.getPopularMovies(1)),
      this.getCachedOrFresh("popular_tv", () => tmdbService.getPopularTVShows(1)),
      this.getCachedOrFresh("popular_anime", () => tmdbService.getAnimeFromMultipleSources(1))
    ]);
    return {
      movies: movies.results || movies,
      tvShows: tvShows.results || tvShows,
      anime: anime.results || anime
    };
  }
  // Get cached videos for content
  getCachedVideos(id, type) {
    try {
      const cached = localStorage.getItem("content_videos");
      if (cached) {
        const { videos } = JSON.parse(cached);
        const key = `${type}-${id}`;
        return videos[key] || [];
      }
    } catch (error) {
      console.error("Error getting cached videos:", error);
    }
    return [];
  }
  async getCachedOrFresh(key, fetchFn) {
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const { content, lastUpdate } = JSON.parse(cached);
        const updateTime = new Date(lastUpdate);
        const now = /* @__PURE__ */ new Date();
        const hoursDiff = (now.getTime() - updateTime.getTime()) / (1e3 * 60 * 60);
        if (hoursDiff < 12) {
          return content;
        }
      } catch (error) {
        console.error(`Error parsing cached ${key}:`, error);
      }
    }
    const fresh = await fetchFn();
    localStorage.setItem(key, JSON.stringify({
      content: fresh.results || fresh,
      lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
    }));
    return fresh.results || fresh;
  }
  // Force refresh all content
  async forceRefresh() {
    this.lastDailyUpdate = null;
    this.lastWeeklyUpdate = null;
    await tmdbService.forceRefreshAllContent();
    localStorage.removeItem("content_videos");
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes("trending") || key.includes("popular") || key.includes("now_playing") || key.includes("airing")) {
        localStorage.removeItem(key);
      }
    });
    await this.performSync(true);
  }
  // Get sync status
  getSyncStatus() {
    return {
      lastDaily: this.lastDailyUpdate,
      lastWeekly: this.lastWeeklyUpdate,
      inProgress: this.syncInProgress
    };
  }
}
export const contentSyncService = new ContentSyncService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRlbnRTeW5jLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRtZGJTZXJ2aWNlIH0gZnJvbSAnLi90bWRiJztcbmltcG9ydCB7IGNvbnRlbnRGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29udGVudEZpbHRlcic7XG5pbXBvcnQgdHlwZSB7IE1vdmllLCBUVlNob3cgfSBmcm9tICcuLi90eXBlcy9tb3ZpZSc7XG5cbmNsYXNzIENvbnRlbnRTeW5jU2VydmljZSB7XG4gIHByaXZhdGUgbGFzdERhaWx5VXBkYXRlOiBEYXRlIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbGFzdFdlZWtseVVwZGF0ZTogRGF0ZSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN5bmNJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQXV0b1N5bmMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUF1dG9TeW5jKCkge1xuICAgIC8vIENoZWNrIGZvciB1cGRhdGVzIGV2ZXJ5IGhvdXJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrQW5kU3luYygpO1xuICAgIH0sIDYwICogNjAgKiAxMDAwKTsgLy8gMSBob3VyXG5cbiAgICAvLyBJbml0aWFsIGNoZWNrXG4gICAgdGhpcy5jaGVja0FuZFN5bmMoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2hlY2tBbmRTeW5jKCkge1xuICAgIGlmICh0aGlzLnN5bmNJblByb2dyZXNzKSByZXR1cm47XG5cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHNob3VsZERhaWx5VXBkYXRlID0gdGhpcy5zaG91bGRQZXJmb3JtRGFpbHlVcGRhdGUobm93KTtcbiAgICBjb25zdCBzaG91bGRXZWVrbHlVcGRhdGUgPSB0aGlzLnNob3VsZFBlcmZvcm1XZWVrbHlVcGRhdGUobm93KTtcblxuICAgIGlmIChzaG91bGREYWlseVVwZGF0ZSB8fCBzaG91bGRXZWVrbHlVcGRhdGUpIHtcbiAgICAgIGF3YWl0IHRoaXMucGVyZm9ybVN5bmMoc2hvdWxkV2Vla2x5VXBkYXRlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3VsZFBlcmZvcm1EYWlseVVwZGF0ZShub3c6IERhdGUpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMubGFzdERhaWx5VXBkYXRlKSByZXR1cm4gdHJ1ZTtcbiAgICBcbiAgICBjb25zdCB0aW1lRGlmZiA9IG5vdy5nZXRUaW1lKCkgLSB0aGlzLmxhc3REYWlseVVwZGF0ZS5nZXRUaW1lKCk7XG4gICAgY29uc3QgaG91cnNEaWZmID0gdGltZURpZmYgLyAoMTAwMCAqIDYwICogNjApO1xuICAgIFxuICAgIHJldHVybiBob3Vyc0RpZmYgPj0gMjQ7XG4gIH1cblxuICBwcml2YXRlIHNob3VsZFBlcmZvcm1XZWVrbHlVcGRhdGUobm93OiBEYXRlKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmxhc3RXZWVrbHlVcGRhdGUpIHJldHVybiB0cnVlO1xuICAgIFxuICAgIGNvbnN0IHRpbWVEaWZmID0gbm93LmdldFRpbWUoKSAtIHRoaXMubGFzdFdlZWtseVVwZGF0ZS5nZXRUaW1lKCk7XG4gICAgY29uc3QgZGF5c0RpZmYgPSB0aW1lRGlmZiAvICgxMDAwICogNjAgKiA2MCAqIDI0KTtcbiAgICBcbiAgICByZXR1cm4gZGF5c0RpZmYgPj0gNztcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcGVyZm9ybVN5bmMoaXNXZWVrbHlVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnN5bmNJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKGBQZXJmb3JtaW5nICR7aXNXZWVrbHlVcGRhdGUgPyAnd2Vla2x5JyA6ICdkYWlseSd9IGNvbnRlbnQgc3luYy4uLmApO1xuXG4gICAgICAvLyBFbmhhbmNlZCBzeW5jIHdpdGggY29tcHJlaGVuc2l2ZSBjb250ZW50IGZldGNoaW5nXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuc3luY1RyZW5kaW5nQ29udGVudCgnZGF5JyksXG4gICAgICAgIHRoaXMuc3luY1RyZW5kaW5nQ29udGVudCgnd2VlaycpLFxuICAgICAgICB0aGlzLnN5bmNQb3B1bGFyQ29udGVudCgpLFxuICAgICAgICB0aGlzLnN5bmNDdXJyZW50Q29udGVudCgpLFxuICAgICAgICB0aGlzLnN5bmNBbmltZUNvbnRlbnQoKSxcbiAgICAgICAgdGhpcy5zeW5jVmlkZW9zRm9yUG9wdWxhckNvbnRlbnQoKVxuICAgICAgXSk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICB0aGlzLmxhc3REYWlseVVwZGF0ZSA9IG5vdztcbiAgICAgIFxuICAgICAgaWYgKGlzV2Vla2x5VXBkYXRlKSB7XG4gICAgICAgIHRoaXMubGFzdFdlZWtseVVwZGF0ZSA9IG5vdztcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coJ0NvbnRlbnQgc3luYyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBjb250ZW50IHN5bmM6JywgZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnN5bmNJblByb2dyZXNzID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzeW5jQ3VycmVudENvbnRlbnQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFN5bmMgY3VycmVudC9ub3cgcGxheWluZyBjb250ZW50IGZvciB0aGUgbW9zdCB1cC10by1kYXRlIHRpdGxlc1xuICAgICAgY29uc3QgW25vd1BsYXlpbmdNb3ZpZXMsIGFpcmluZ1RvZGF5VFYsIG9uVGhlQWlyVFZdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICB0bWRiU2VydmljZS5nZXROb3dQbGF5aW5nTW92aWVzKDEpLFxuICAgICAgICB0bWRiU2VydmljZS5nZXRBaXJpbmdUb2RheVRWU2hvd3MoMSksXG4gICAgICAgIHRtZGJTZXJ2aWNlLmdldE9uVGhlQWlyVFZTaG93cygxKVxuICAgICAgXSk7XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdub3dfcGxheWluZ19tb3ZpZXMnLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvbnRlbnQ6IG5vd1BsYXlpbmdNb3ZpZXMucmVzdWx0cyxcbiAgICAgICAgbGFzdFVwZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICB9KSk7XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhaXJpbmdfdG9kYXlfdHYnLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvbnRlbnQ6IGFpcmluZ1RvZGF5VFYucmVzdWx0cyxcbiAgICAgICAgbGFzdFVwZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICB9KSk7XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbl90aGVfYWlyX3R2JywgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjb250ZW50OiBvblRoZUFpclRWLnJlc3VsdHMsXG4gICAgICAgIGxhc3RVcGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgfSkpO1xuXG4gICAgICByZXR1cm4geyBub3dQbGF5aW5nTW92aWVzOiBub3dQbGF5aW5nTW92aWVzLnJlc3VsdHMsIGFpcmluZ1RvZGF5VFY6IGFpcmluZ1RvZGF5VFYucmVzdWx0cywgb25UaGVBaXJUVjogb25UaGVBaXJUVi5yZXN1bHRzIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHN5bmNpbmcgY3VycmVudCBjb250ZW50OicsIGVycm9yKTtcbiAgICAgIHJldHVybiB7IG5vd1BsYXlpbmdNb3ZpZXM6IFtdLCBhaXJpbmdUb2RheVRWOiBbXSwgb25UaGVBaXJUVjogW10gfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHN5bmNWaWRlb3NGb3JQb3B1bGFyQ29udGVudCgpIHtcbiAgICB0cnkge1xuICAgICAgLy8gR2V0IGNvbXByZWhlbnNpdmUgY29udGVudCB0byBzeW5jIHZpZGVvcyBpbmNsdWRpbmcgY3VycmVudCBjb250ZW50XG4gICAgICBjb25zdCBbbW92aWVzUmVzLCB0dlJlcywgYW5pbWVSZXMsIG5vd1BsYXlpbmdSZXMsIGFpcmluZ1RvZGF5UmVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgdG1kYlNlcnZpY2UuZ2V0UG9wdWxhck1vdmllcygxKSxcbiAgICAgICAgdG1kYlNlcnZpY2UuZ2V0UG9wdWxhclRWU2hvd3MoMSksXG4gICAgICAgIHRtZGJTZXJ2aWNlLmdldEFuaW1lRnJvbU11bHRpcGxlU291cmNlcygxKSxcbiAgICAgICAgdG1kYlNlcnZpY2UuZ2V0Tm93UGxheWluZ01vdmllcygxKSxcbiAgICAgICAgdG1kYlNlcnZpY2UuZ2V0QWlyaW5nVG9kYXlUVlNob3dzKDEpXG4gICAgICBdKTtcblxuICAgICAgLy8gUHJlcGFyZSBpdGVtcyBmb3IgYmF0Y2ggdmlkZW8gZmV0Y2hpbmdcbiAgICAgIGNvbnN0IGl0ZW1zID0gW1xuICAgICAgICAuLi5tb3ZpZXNSZXMucmVzdWx0cy5zbGljZSgwLCA4KS5tYXAobW92aWUgPT4gKHsgaWQ6IG1vdmllLmlkLCB0eXBlOiAnbW92aWUnIGFzIGNvbnN0IH0pKSxcbiAgICAgICAgLi4udHZSZXMucmVzdWx0cy5zbGljZSgwLCA4KS5tYXAodHYgPT4gKHsgaWQ6IHR2LmlkLCB0eXBlOiAndHYnIGFzIGNvbnN0IH0pKSxcbiAgICAgICAgLi4uYW5pbWVSZXMucmVzdWx0cy5zbGljZSgwLCA2KS5tYXAoYW5pbWUgPT4gKHsgaWQ6IGFuaW1lLmlkLCB0eXBlOiAndHYnIGFzIGNvbnN0IH0pKSxcbiAgICAgICAgLi4ubm93UGxheWluZ1Jlcy5yZXN1bHRzLnNsaWNlKDAsIDgpLm1hcChtb3ZpZSA9PiAoeyBpZDogbW92aWUuaWQsIHR5cGU6ICdtb3ZpZScgYXMgY29uc3QgfSkpLFxuICAgICAgICAuLi5haXJpbmdUb2RheVJlcy5yZXN1bHRzLnNsaWNlKDAsIDYpLm1hcCh0diA9PiAoeyBpZDogdHYuaWQsIHR5cGU6ICd0dicgYXMgY29uc3QgfSkpXG4gICAgICBdO1xuXG4gICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBmcm9tIGl0ZW1zIGxpc3RcbiAgICAgIGNvbnN0IHVuaXF1ZUl0ZW1zID0gaXRlbXMuZmlsdGVyKChpdGVtLCBpbmRleCwgc2VsZikgPT4gXG4gICAgICAgIGluZGV4ID09PSBzZWxmLmZpbmRJbmRleCh0ID0+IHQuaWQgPT09IGl0ZW0uaWQgJiYgdC50eXBlID09PSBpdGVtLnR5cGUpXG4gICAgICApO1xuXG4gICAgICAvLyBCYXRjaCBmZXRjaCB2aWRlb3Mgd2l0aCBlcnJvciBoYW5kbGluZ1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmlkZW9NYXAgPSBhd2FpdCB0bWRiU2VydmljZS5iYXRjaEZldGNoVmlkZW9zKHVuaXF1ZUl0ZW1zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFN0b3JlIHZpZGVvIGRhdGFcbiAgICAgICAgY29uc3QgdmlkZW9EYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueVtdIH0gPSB7fTtcbiAgICAgICAgdmlkZW9NYXAuZm9yRWFjaCgodmlkZW9zLCBrZXkpID0+IHtcbiAgICAgICAgICB2aWRlb0RhdGFba2V5XSA9IHZpZGVvcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbnRlbnRfdmlkZW9zJywgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHZpZGVvczogdmlkZW9EYXRhLFxuICAgICAgICAgIGxhc3RVcGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYFN5bmNlZCB2aWRlb3MgZm9yICR7dW5pcXVlSXRlbXMubGVuZ3RofSB1bmlxdWUgaXRlbXNgKTtcbiAgICAgIH0gY2F0Y2ggKHZpZGVvRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdTb21lIHZpZGVvcyBjb3VsZCBub3QgYmUgc3luY2VkOicsIHZpZGVvRXJyb3IpO1xuICAgICAgICAvLyBDb250aW51ZSB3aXRob3V0IGZhaWxpbmcgdGhlIGVudGlyZSBzeW5jXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHN5bmNpbmcgdmlkZW9zOicsIGVycm9yKTtcbiAgICAgIC8vIERvbid0IHRocm93LCBqdXN0IGxvZyB0aGUgZXJyb3JcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHN5bmNUcmVuZGluZ0NvbnRlbnQodGltZVdpbmRvdzogJ2RheScgfCAnd2VlaycpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0bWRiU2VydmljZS5nZXRUcmVuZGluZ0FsbCh0aW1lV2luZG93LCAxKTtcbiAgICAgIGNvbnN0IGZpbHRlcmVkQ29udGVudCA9IGNvbnRlbnRGaWx0ZXJTZXJ2aWNlLmZpbHRlckNvbnRlbnQocmVzcG9uc2UucmVzdWx0cyk7XG4gICAgICBjb25zdCB1bmlxdWVDb250ZW50ID0gdG1kYlNlcnZpY2UucmVtb3ZlRHVwbGljYXRlcyhmaWx0ZXJlZENvbnRlbnQpO1xuICAgICAgXG4gICAgICAvLyBTdG9yZSBpbiBsb2NhbFN0b3JhZ2UgZm9yIHF1aWNrIGFjY2Vzc1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHRyZW5kaW5nXyR7dGltZVdpbmRvd31gLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvbnRlbnQ6IHVuaXF1ZUNvbnRlbnQsXG4gICAgICAgIGxhc3RVcGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgfSkpO1xuICAgICAgXG4gICAgICByZXR1cm4gdW5pcXVlQ29udGVudDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3Igc3luY2luZyB0cmVuZGluZyAke3RpbWVXaW5kb3d9IGNvbnRlbnQ6YCwgZXJyb3IpO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc3luY1BvcHVsYXJDb250ZW50KCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBbbW92aWVzLCB0dlNob3dzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgdG1kYlNlcnZpY2UuZ2V0UG9wdWxhck1vdmllcygxKSxcbiAgICAgICAgdG1kYlNlcnZpY2UuZ2V0UG9wdWxhclRWU2hvd3MoMSlcbiAgICAgIF0pO1xuXG4gICAgICBjb25zdCBmaWx0ZXJlZE1vdmllcyA9IGNvbnRlbnRGaWx0ZXJTZXJ2aWNlLmZpbHRlckNvbnRlbnQobW92aWVzLnJlc3VsdHMpO1xuICAgICAgY29uc3QgZmlsdGVyZWRUVlNob3dzID0gY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudCh0dlNob3dzLnJlc3VsdHMpO1xuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncG9wdWxhcl9tb3ZpZXMnLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvbnRlbnQ6IGZpbHRlcmVkTW92aWVzLFxuICAgICAgICBsYXN0VXBkYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICAgIH0pKTtcblxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BvcHVsYXJfdHYnLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvbnRlbnQ6IGZpbHRlcmVkVFZTaG93cyxcbiAgICAgICAgbGFzdFVwZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICB9KSk7XG5cbiAgICAgIHJldHVybiB7IG1vdmllczogZmlsdGVyZWRNb3ZpZXMsIHR2U2hvd3M6IGZpbHRlcmVkVFZTaG93cyB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzeW5jaW5nIHBvcHVsYXIgY29udGVudDonLCBlcnJvcik7XG4gICAgICByZXR1cm4geyBtb3ZpZXM6IFtdLCB0dlNob3dzOiBbXSB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc3luY0FuaW1lQ29udGVudCgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYW5pbWUgPSBhd2FpdCB0bWRiU2VydmljZS5nZXRBbmltZUZyb21NdWx0aXBsZVNvdXJjZXMoMSk7XG4gICAgICBjb25zdCBmaWx0ZXJlZEFuaW1lID0gY29udGVudEZpbHRlclNlcnZpY2UuZmlsdGVyQ29udGVudChhbmltZS5yZXN1bHRzKTtcbiAgICAgIFxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BvcHVsYXJfYW5pbWUnLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNvbnRlbnQ6IGZpbHRlcmVkQW5pbWUsXG4gICAgICAgIGxhc3RVcGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgfSkpO1xuXG4gICAgICByZXR1cm4gZmlsdGVyZWRBbmltZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc3luY2luZyBhbmltZSBjb250ZW50OicsIGVycm9yKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvLyBQdWJsaWMgbWV0aG9kcyBmb3IgY29tcG9uZW50cyB0byB1c2VcbiAgYXN5bmMgZ2V0VHJlbmRpbmdDb250ZW50KHRpbWVXaW5kb3c6ICdkYXknIHwgJ3dlZWsnKTogUHJvbWlzZTwoTW92aWUgfCBUVlNob3cpW10+IHtcbiAgICBjb25zdCBjYWNoZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgdHJlbmRpbmdfJHt0aW1lV2luZG93fWApO1xuICAgIFxuICAgIGlmIChjYWNoZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgY29udGVudCwgbGFzdFVwZGF0ZSB9ID0gSlNPTi5wYXJzZShjYWNoZWQpO1xuICAgICAgICBjb25zdCB1cGRhdGVUaW1lID0gbmV3IERhdGUobGFzdFVwZGF0ZSk7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGhvdXJzRGlmZiA9IChub3cuZ2V0VGltZSgpIC0gdXBkYXRlVGltZS5nZXRUaW1lKCkpIC8gKDEwMDAgKiA2MCAqIDYwKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFVzZSBjYWNoZWQgY29udGVudCBpZiBsZXNzIHRoYW4gNiBob3VycyBvbGRcbiAgICAgICAgaWYgKGhvdXJzRGlmZiA8IDYpIHtcbiAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcGFyc2luZyBjYWNoZWQgY29udGVudDonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmV0Y2ggZnJlc2ggY29udGVudFxuICAgIHJldHVybiBhd2FpdCB0aGlzLnN5bmNUcmVuZGluZ0NvbnRlbnQodGltZVdpbmRvdyk7XG4gIH1cblxuICBhc3luYyBnZXRQb3B1bGFyQ29udGVudCgpOiBQcm9taXNlPHsgbW92aWVzOiBNb3ZpZVtdOyB0dlNob3dzOiBUVlNob3dbXTsgYW5pbWU6IFRWU2hvd1tdIH0+IHtcbiAgICBjb25zdCBbbW92aWVzLCB0dlNob3dzLCBhbmltZV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmdldENhY2hlZE9yRnJlc2goJ3BvcHVsYXJfbW92aWVzJywgKCkgPT4gdG1kYlNlcnZpY2UuZ2V0UG9wdWxhck1vdmllcygxKSksXG4gICAgICB0aGlzLmdldENhY2hlZE9yRnJlc2goJ3BvcHVsYXJfdHYnLCAoKSA9PiB0bWRiU2VydmljZS5nZXRQb3B1bGFyVFZTaG93cygxKSksXG4gICAgICB0aGlzLmdldENhY2hlZE9yRnJlc2goJ3BvcHVsYXJfYW5pbWUnLCAoKSA9PiB0bWRiU2VydmljZS5nZXRBbmltZUZyb21NdWx0aXBsZVNvdXJjZXMoMSkpXG4gICAgXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbW92aWVzOiBtb3ZpZXMucmVzdWx0cyB8fCBtb3ZpZXMsXG4gICAgICB0dlNob3dzOiB0dlNob3dzLnJlc3VsdHMgfHwgdHZTaG93cyxcbiAgICAgIGFuaW1lOiBhbmltZS5yZXN1bHRzIHx8IGFuaW1lXG4gICAgfTtcbiAgfVxuXG4gIC8vIEdldCBjYWNoZWQgdmlkZW9zIGZvciBjb250ZW50XG4gIGdldENhY2hlZFZpZGVvcyhpZDogbnVtYmVyLCB0eXBlOiAnbW92aWUnIHwgJ3R2Jyk6IGFueVtdIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY2FjaGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbnRlbnRfdmlkZW9zJyk7XG4gICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgIGNvbnN0IHsgdmlkZW9zIH0gPSBKU09OLnBhcnNlKGNhY2hlZCk7XG4gICAgICAgIGNvbnN0IGtleSA9IGAke3R5cGV9LSR7aWR9YDtcbiAgICAgICAgcmV0dXJuIHZpZGVvc1trZXldIHx8IFtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBnZXR0aW5nIGNhY2hlZCB2aWRlb3M6JywgZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldENhY2hlZE9yRnJlc2goa2V5OiBzdHJpbmcsIGZldGNoRm46ICgpID0+IFByb21pc2U8YW55Pikge1xuICAgIGNvbnN0IGNhY2hlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgXG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBjb250ZW50LCBsYXN0VXBkYXRlIH0gPSBKU09OLnBhcnNlKGNhY2hlZCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZVRpbWUgPSBuZXcgRGF0ZShsYXN0VXBkYXRlKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgaG91cnNEaWZmID0gKG5vdy5nZXRUaW1lKCkgLSB1cGRhdGVUaW1lLmdldFRpbWUoKSkgLyAoMTAwMCAqIDYwICogNjApO1xuICAgICAgICBcbiAgICAgICAgaWYgKGhvdXJzRGlmZiA8IDEyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHBhcnNpbmcgY2FjaGVkICR7a2V5fTpgLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmV0Y2ggZnJlc2ggY29udGVudFxuICAgIGNvbnN0IGZyZXNoID0gYXdhaXQgZmV0Y2hGbigpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY29udGVudDogZnJlc2gucmVzdWx0cyB8fCBmcmVzaCxcbiAgICAgIGxhc3RVcGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgIH0pKTtcblxuICAgIHJldHVybiBmcmVzaC5yZXN1bHRzIHx8IGZyZXNoO1xuICB9XG5cbiAgLy8gRm9yY2UgcmVmcmVzaCBhbGwgY29udGVudFxuICBhc3luYyBmb3JjZVJlZnJlc2goKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5sYXN0RGFpbHlVcGRhdGUgPSBudWxsO1xuICAgIHRoaXMubGFzdFdlZWtseVVwZGF0ZSA9IG51bGw7XG4gICAgXG4gICAgLy8gQ2xlYXIgYWxsIGNvbnRlbnQgY2FjaGVzXG4gICAgYXdhaXQgdG1kYlNlcnZpY2UuZm9yY2VSZWZyZXNoQWxsQ29udGVudCgpO1xuICAgIFxuICAgIC8vIENsZWFyIGNhY2hlZCB2aWRlb3NcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY29udGVudF92aWRlb3MnKTtcbiAgICBcbiAgICAvLyBDbGVhciBhbGwgY29udGVudCBjYWNoZXNcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKTtcbiAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChrZXkuaW5jbHVkZXMoJ3RyZW5kaW5nJykgfHwga2V5LmluY2x1ZGVzKCdwb3B1bGFyJykgfHwga2V5LmluY2x1ZGVzKCdub3dfcGxheWluZycpIHx8IGtleS5pbmNsdWRlcygnYWlyaW5nJykpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBhd2FpdCB0aGlzLnBlcmZvcm1TeW5jKHRydWUpO1xuICB9XG5cbiAgLy8gR2V0IHN5bmMgc3RhdHVzXG4gIGdldFN5bmNTdGF0dXMoKTogeyBsYXN0RGFpbHk6IERhdGUgfCBudWxsOyBsYXN0V2Vla2x5OiBEYXRlIHwgbnVsbDsgaW5Qcm9ncmVzczogYm9vbGVhbiB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFzdERhaWx5OiB0aGlzLmxhc3REYWlseVVwZGF0ZSxcbiAgICAgIGxhc3RXZWVrbHk6IHRoaXMubGFzdFdlZWtseVVwZGF0ZSxcbiAgICAgIGluUHJvZ3Jlc3M6IHRoaXMuc3luY0luUHJvZ3Jlc3NcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjb250ZW50U3luY1NlcnZpY2UgPSBuZXcgQ29udGVudFN5bmNTZXJ2aWNlKCk7Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLDRCQUE0QjtBQUdyQyxNQUFNLG1CQUFtQjtBQUFBLEVBQ2Ysa0JBQStCO0FBQUEsRUFDL0IsbUJBQWdDO0FBQUEsRUFDaEMsaUJBQWlCO0FBQUEsRUFFekIsY0FBYztBQUNaLFNBQUssbUJBQW1CO0FBQUEsRUFDMUI7QUFBQSxFQUVRLHFCQUFxQjtBQUUzQixnQkFBWSxNQUFNO0FBQ2hCLFdBQUssYUFBYTtBQUFBLElBQ3BCLEdBQUcsS0FBSyxLQUFLLEdBQUk7QUFH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