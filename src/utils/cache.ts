// Advanced caching system for better performance

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize = 100;
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Global cache instance
export const cacheManager = new CacheManager();

// Auto cleanup every 5 minutes
setInterval(() => {
  cacheManager.cleanup();
}, 5 * 60 * 1000);

// Cache utilities for specific use cases
export const createApiCache = (baseKey: string) => ({
  get: <T>(endpoint: string): T | null => 
    cacheManager.get(`${baseKey}:${endpoint}`),
  
  set: <T>(endpoint: string, data: T, ttl?: number): void => 
    cacheManager.set(`${baseKey}:${endpoint}`, data, ttl),
  
  invalidate: (endpoint: string): boolean => 
    cacheManager.delete(`${baseKey}:${endpoint}`),
  
  invalidateAll: (): void => {
    const keys = Array.from(cacheManager.getStats().keys);
    keys.forEach(key => {
      if (key.startsWith(`${baseKey}:`)) {
        cacheManager.delete(key);
      }
    });
  }
});

// Image cache for better performance
export const imageCache = createApiCache('images');

// API response cache
export const apiCache = createApiCache('api');

// Content cache with longer TTL
export const contentCache = createApiCache('content');