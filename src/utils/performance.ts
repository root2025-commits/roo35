// Performance optimization utilities

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
};

export const createImageLoader = () => {
  const imageCache = new Map<string, Promise<string>>();
  
  return (src: string): Promise<string> => {
    if (imageCache.has(src)) {
      return imageCache.get(src)!;
    }
    
    const promise = new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = reject;
      img.src = src;
    });
    
    imageCache.set(src, promise);
    return promise;
  };
};

export const preloadImages = async (urls: string[]): Promise<void> => {
  const imageLoader = createImageLoader();
  
  try {
    await Promise.all(urls.map(url => imageLoader(url)));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Memory management
export const clearUnusedCache = () => {
  // Clear old localStorage entries
  const keys = Object.keys(localStorage);
  const now = Date.now();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
  
  keys.forEach(key => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed.timestamp && (now - new Date(parsed.timestamp).getTime()) > maxAge) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      // Invalid JSON, remove it
      localStorage.removeItem(key);
    }
  });
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

export const createPerformanceObserver = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    return observer;
  }
  return null;
};