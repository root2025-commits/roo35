export class PerformanceOptimizer {
  static instance;
  observers = /* @__PURE__ */ new Map();
  static getInstance() {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }
  // Lazy loading for images
  setupLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              imageObserver.unobserve(img);
            }
          }
        });
      });
      this.observers.set("images", imageObserver);
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }
  // Debounce function for search and other frequent operations
  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  // Preload critical resources
  preloadResource(url, type) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = url;
    switch (type) {
      case "image":
        link.as = "image";
        break;
      case "script":
        link.as = "script";
        break;
      case "style":
        link.as = "style";
        break;
    }
    document.head.appendChild(link);
  }
  // Clean up observers
  cleanup() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}
export const performanceOptimizer = PerformanceOptimizer.getInstance();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcmZvcm1hbmNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiB1dGlsaXRpZXNcbmV4cG9ydCBjbGFzcyBQZXJmb3JtYW5jZU9wdGltaXplciB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQZXJmb3JtYW5jZU9wdGltaXplcjtcbiAgcHJpdmF0ZSBvYnNlcnZlcnM6IE1hcDxzdHJpbmcsIEludGVyc2VjdGlvbk9ic2VydmVyPiA9IG5ldyBNYXAoKTtcblxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGVyZm9ybWFuY2VPcHRpbWl6ZXIge1xuICAgIGlmICghUGVyZm9ybWFuY2VPcHRpbWl6ZXIuaW5zdGFuY2UpIHtcbiAgICAgIFBlcmZvcm1hbmNlT3B0aW1pemVyLmluc3RhbmNlID0gbmV3IFBlcmZvcm1hbmNlT3B0aW1pemVyKCk7XG4gICAgfVxuICAgIHJldHVybiBQZXJmb3JtYW5jZU9wdGltaXplci5pbnN0YW5jZTtcbiAgfVxuXG4gIC8vIExhenkgbG9hZGluZyBmb3IgaW1hZ2VzXG4gIHNldHVwTGF6eUxvYWRpbmcoKTogdm9pZCB7XG4gICAgaWYgKCdJbnRlcnNlY3Rpb25PYnNlcnZlcicgaW4gd2luZG93KSB7XG4gICAgICBjb25zdCBpbWFnZU9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBpbWcgPSBlbnRyeS50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChpbWcuZGF0YXNldC5zcmMpIHtcbiAgICAgICAgICAgICAgaW1nLnNyYyA9IGltZy5kYXRhc2V0LnNyYztcbiAgICAgICAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcbiAgICAgICAgICAgICAgaW1hZ2VPYnNlcnZlci51bm9ic2VydmUoaW1nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMub2JzZXJ2ZXJzLnNldCgnaW1hZ2VzJywgaW1hZ2VPYnNlcnZlcik7XG5cbiAgICAgIC8vIE9ic2VydmUgYWxsIGltYWdlcyB3aXRoIGRhdGEtc3JjXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWdbZGF0YS1zcmNdJykuZm9yRWFjaChpbWcgPT4ge1xuICAgICAgICBpbWFnZU9ic2VydmVyLm9ic2VydmUoaW1nKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIERlYm91bmNlIGZ1bmN0aW9uIGZvciBzZWFyY2ggYW5kIG90aGVyIGZyZXF1ZW50IG9wZXJhdGlvbnNcbiAgZGVib3VuY2U8VCBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PihcbiAgICBmdW5jOiBULFxuICAgIHdhaXQ6IG51bWJlclxuICApOiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gdm9pZCB7XG4gICAgbGV0IHRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0O1xuICAgIHJldHVybiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYyguLi5hcmdzKSwgd2FpdCk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIFRocm90dGxlIGZ1bmN0aW9uIGZvciBzY3JvbGwgZXZlbnRzXG4gIHRocm90dGxlPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4oXG4gICAgZnVuYzogVCxcbiAgICBsaW1pdDogbnVtYmVyXG4gICk6ICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiB2b2lkIHtcbiAgICBsZXQgaW5UaHJvdHRsZTogYm9vbGVhbjtcbiAgICByZXR1cm4gKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pID0+IHtcbiAgICAgIGlmICghaW5UaHJvdHRsZSkge1xuICAgICAgICBmdW5jKC4uLmFyZ3MpO1xuICAgICAgICBpblRocm90dGxlID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBpblRocm90dGxlID0gZmFsc2UsIGxpbWl0KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gUHJlbG9hZCBjcml0aWNhbCByZXNvdXJjZXNcbiAgcHJlbG9hZFJlc291cmNlKHVybDogc3RyaW5nLCB0eXBlOiAnaW1hZ2UnIHwgJ3NjcmlwdCcgfCAnc3R5bGUnKTogdm9pZCB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBsaW5rLnJlbCA9ICdwcmVsb2FkJztcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgIGxpbmsuYXMgPSAnaW1hZ2UnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NjcmlwdCc6XG4gICAgICAgIGxpbmsuYXMgPSAnc2NyaXB0JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdHlsZSc6XG4gICAgICAgIGxpbmsuYXMgPSAnc3R5bGUnO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgfVxuXG4gIC8vIENsZWFuIHVwIG9ic2VydmVyc1xuICBjbGVhbnVwKCk6IHZvaWQge1xuICAgIHRoaXMub2JzZXJ2ZXJzLmZvckVhY2gob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpKTtcbiAgICB0aGlzLm9ic2VydmVycy5jbGVhcigpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwZXJmb3JtYW5jZU9wdGltaXplciA9IFBlcmZvcm1hbmNlT3B0aW1pemVyLmdldEluc3RhbmNlKCk7Il0sIm1hcHBpbmdzIjoiQUFDTyxhQUFNLHFCQUFxQjtBQUFBLEVBQ2hDLE9BQWU7QUFBQSxFQUNQLFlBQStDLG9CQUFJLElBQUk7QUFBQSxFQUUvRCxPQUFPLGNBQW9DO0FBQ3pDLFFBQUksQ0FBQyxxQkFBcUIsVUFBVTtBQUNsQywyQkFBcUIsV0FBVyxJQUFJLHFCQUFxQjtBQUFBLElBQzNEO0FBQ0EsV0FBTyxxQkFBcUI7QUFBQSxFQUM5QjtBQUFBO0FBQUEsRUFHQSxtQkFBeUI7QUFDdkIsUUFBSSwwQkFBMEIsUUFBUTtBQUNwQyxZQUFNLGdCQUFnQixJQUFJLHFCQUFxQixDQUFDLFlBQVk7QUFDMUQsZ0JBQVEsUUFBUSxXQUFTO0FBQ3ZCLGNBQUksTUFBTSxnQkFBZ0I7QUFDeEIsa0JBQU0sTUFBTSxNQUFNO0FBQ2xCLGdCQUFJLElBQUksUUFBUSxLQUFLO0FBQ25CLGtCQUFJLE1BQU0sSUFBSSxRQUFRO0FBQ3RCLGtCQUFJLGdCQUFnQixVQUFVO0FBQzlCLDRCQUFjLFVBQVUsR0FBRztBQUFBLFlBQzdCO0FBQUEsVUFDRjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVELFdBQUssVUFBVSxJQUFJLFVBQVUsYUFBYTtBQUcxQyxlQUFTLGlCQUFpQixlQUFlLEVBQUUsUUFBUSxTQUFPO0FBQ3hELHNCQUFjLFFBQVEsR0FBRztBQUFBLE1BQzNCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxTQUNFLE1BQ0EsTUFDa0M7QUFDbEMsUUFBSTtBQUNKLFdBQU8sSUFBSSxTQUF3QjtBQUNqQyxtQkFBYSxPQUFPO0FBQ3BCLGdCQUFVLFdBQVcsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUk7QUFBQSxJQUNoRDtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsU0FDRSxNQUNBLE9BQ2tDO0FBQ2xDLFFBQUk7QUFDSixXQUFPLElBQUksU0FBd0I7QUFDakMsVUFBSSxDQUFDLFlBQVk7QUFDZixhQUFLLEdBQUcsSUFBSTtBQUNaLHFCQUFhO0FBQ2IsbUJBQVcsTUFBTSxhQUFhLE9BQU8sS0FBSztBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsZ0JBQWdCLEtBQWEsTUFBMEM7QUFDckUsVUFBTSxPQUFPLFNBQVMsY0FBYyxNQUFNO0FBQzFDLFNBQUssTUFBTTtBQUNYLFNBQUssT0FBTztBQUVaLFlBQVEsTUFBTTtBQUFBLE1BQ1osS0FBSztBQUNILGFBQUssS0FBSztBQUNWO0FBQUEsTUFDRixLQUFLO0FBQ0gsYUFBSyxLQUFLO0FBQ1Y7QUFBQSxNQUNGLEtBQUs7QUFDSCxhQUFLLEtBQUs7QUFDVjtBQUFBLElBQ0o7QUFFQSxhQUFTLEtBQUssWUFBWSxJQUFJO0FBQUEsRUFDaEM7QUFBQTtBQUFBLEVBR0EsVUFBZ0I7QUFDZCxTQUFLLFVBQVUsUUFBUSxjQUFZLFNBQVMsV0FBVyxDQUFDO0FBQ3hELFNBQUssVUFBVSxNQUFNO0FBQUEsRUFDdkI7QUFDRjtBQUVPLGFBQU0sdUJBQXVCLHFCQUFxQixZQUFZOyIsIm5hbWVzIjpbXX0=