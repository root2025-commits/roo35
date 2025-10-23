import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useCallback = __vite__cjsImport0_react["useCallback"];
export function usePerformance() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    cacheHitRate: 0
  });
  const [isOptimized, setIsOptimized] = useState(false);
  const measurePerformance = useCallback(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    const memoryInfo = performance.memory;
    const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0;
    setMetrics((prev) => ({
      ...prev,
      loadTime,
      memoryUsage,
      renderTime: performance.now()
    }));
  }, []);
  const optimizePerformance = useCallback(() => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          if (name.includes("old") || name.includes("temp")) {
            caches.delete(name);
          }
        });
      });
    }
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.loading) {
        img.loading = "lazy";
      }
    });
    setIsOptimized(true);
    setTimeout(() => setIsOptimized(false), 3e3);
  }, []);
  useEffect(() => {
    const timer = setTimeout(measurePerformance, 1e3);
    return () => clearTimeout(timer);
  }, [measurePerformance]);
  return {
    metrics,
    isOptimized,
    optimizePerformance,
    measurePerformance
  };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZVBlcmZvcm1hbmNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgUGVyZm9ybWFuY2VNZXRyaWNzIHtcbiAgbG9hZFRpbWU6IG51bWJlcjtcbiAgcmVuZGVyVGltZTogbnVtYmVyO1xuICBtZW1vcnlVc2FnZTogbnVtYmVyO1xuICBjYWNoZUhpdFJhdGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVBlcmZvcm1hbmNlKCkge1xuICBjb25zdCBbbWV0cmljcywgc2V0TWV0cmljc10gPSB1c2VTdGF0ZTxQZXJmb3JtYW5jZU1ldHJpY3M+KHtcbiAgICBsb2FkVGltZTogMCxcbiAgICByZW5kZXJUaW1lOiAwLFxuICAgIG1lbW9yeVVzYWdlOiAwLFxuICAgIGNhY2hlSGl0UmF0ZTogMFxuICB9KTtcblxuICBjb25zdCBbaXNPcHRpbWl6ZWQsIHNldElzT3B0aW1pemVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBtZWFzdXJlUGVyZm9ybWFuY2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgbmF2aWdhdGlvbiA9IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoJ25hdmlnYXRpb24nKVswXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmc7XG4gICAgY29uc3QgbG9hZFRpbWUgPSBuYXZpZ2F0aW9uLmxvYWRFdmVudEVuZCAtIG5hdmlnYXRpb24ubG9hZEV2ZW50U3RhcnQ7XG4gICAgXG4gICAgLy8gTWVhc3VyZSBtZW1vcnkgdXNhZ2UgaWYgYXZhaWxhYmxlXG4gICAgY29uc3QgbWVtb3J5SW5mbyA9IChwZXJmb3JtYW5jZSBhcyBhbnkpLm1lbW9yeTtcbiAgICBjb25zdCBtZW1vcnlVc2FnZSA9IG1lbW9yeUluZm8gPyBtZW1vcnlJbmZvLnVzZWRKU0hlYXBTaXplIC8gMTAyNCAvIDEwMjQgOiAwO1xuXG4gICAgc2V0TWV0cmljcyhwcmV2ID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgbG9hZFRpbWUsXG4gICAgICBtZW1vcnlVc2FnZSxcbiAgICAgIHJlbmRlclRpbWU6IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgfSkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb3B0aW1pemVQZXJmb3JtYW5jZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAvLyBDbGVhciB1bnVzZWQgY2FjaGVzXG4gICAgaWYgKCdjYWNoZXMnIGluIHdpbmRvdykge1xuICAgICAgY2FjaGVzLmtleXMoKS50aGVuKG5hbWVzID0+IHtcbiAgICAgICAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICBpZiAobmFtZS5pbmNsdWRlcygnb2xkJykgfHwgbmFtZS5pbmNsdWRlcygndGVtcCcpKSB7XG4gICAgICAgICAgICBjYWNoZXMuZGVsZXRlKG5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPcHRpbWl6ZSBpbWFnZXNcbiAgICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKTtcbiAgICBpbWFnZXMuZm9yRWFjaChpbWcgPT4ge1xuICAgICAgaWYgKCFpbWcubG9hZGluZykge1xuICAgICAgICBpbWcubG9hZGluZyA9ICdsYXp5JztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNldElzT3B0aW1pemVkKHRydWUpO1xuICAgIFxuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SXNPcHRpbWl6ZWQoZmFsc2UpLCAzMDAwKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KG1lYXN1cmVQZXJmb3JtYW5jZSwgMTAwMCk7XG4gICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcik7XG4gIH0sIFttZWFzdXJlUGVyZm9ybWFuY2VdKTtcblxuICByZXR1cm4ge1xuICAgIG1ldHJpY3MsXG4gICAgaXNPcHRpbWl6ZWQsXG4gICAgb3B0aW1pemVQZXJmb3JtYW5jZSxcbiAgICBtZWFzdXJlUGVyZm9ybWFuY2VcbiAgfTtcbn0iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsVUFBVSxXQUFXLG1CQUFtQjtBQVMxQyxnQkFBUyxpQkFBaUI7QUFDL0IsUUFBTSxDQUFDLFNBQVMsVUFBVSxJQUFJLFNBQTZCO0FBQUEsSUFDekQsVUFBVTtBQUFBLElBQ1YsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsY0FBYztBQUFBLEVBQ2hCLENBQUM7QUFFRCxRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBUyxLQUFLO0FBRXBELFFBQU0scUJBQXFCLFlBQVksTUFBTTtBQUMzQyxVQUFNLGFBQWEsWUFBWSxpQkFBaUIsWUFBWSxFQUFFLENBQUM7QUFDL0QsVUFBTSxXQUFXLFdBQVcsZUFBZSxXQUFXO0FBR3RELFVBQU0sYUFBYyxZQUFvQjtBQUN4QyxVQUFNLGNBQWMsYUFBYSxXQUFXLGlCQUFpQixPQUFPLE9BQU87QUFFM0UsZUFBVyxXQUFTO0FBQUEsTUFDbEIsR0FBRztBQUFBLE1BQ0g7QUFBQSxNQUNBO0FBQUEsTUFDQSxZQUFZLFlBQVksSUFBSTtBQUFBLElBQzlCLEVBQUU7QUFBQSxFQUNKLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxzQkFBc0IsWUFBWSxNQUFNO0FBRTVDLFFBQUksWUFBWSxRQUFRO0FBQ3RCLGFBQU8sS0FBSyxFQUFFLEtBQUssV0FBUztBQUMxQixjQUFNLFFBQVEsVUFBUTtBQUNwQixjQUFJLEtBQUssU0FBUyxLQUFLLEtBQUssS0FBSyxTQUFTLE1BQU0sR0FBRztBQUNqRCxtQkFBTyxPQUFPLElBQUk7QUFBQSxVQUNwQjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0g7QUFHQSxVQUFNLFNBQVMsU0FBUyxpQkFBaUIsS0FBSztBQUM5QyxXQUFPLFFBQVEsU0FBTztBQUNwQixVQUFJLENBQUMsSUFBSSxTQUFTO0FBQ2hCLFlBQUksVUFBVTtBQUFBLE1BQ2hCO0FBQUEsSUFDRixDQUFDO0FBRUQsbUJBQWUsSUFBSTtBQUVuQixlQUFXLE1BQU0sZUFBZSxLQUFLLEdBQUcsR0FBSTtBQUFBLEVBQzlDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsWUFBVSxNQUFNO0FBQ2QsVUFBTSxRQUFRLFdBQVcsb0JBQW9CLEdBQUk7QUFDakQsV0FBTyxNQUFNLGFBQWEsS0FBSztBQUFBLEVBQ2pDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztBQUV2QixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjsiLCJuYW1lcyI6W119