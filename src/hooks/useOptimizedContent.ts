import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useCallback = __vite__cjsImport0_react["useCallback"];
import { tmdbService } from "/src/services/tmdb.ts";
import { errorHandler } from "/src/utils/errorHandler.ts";
import { performanceOptimizer } from "/src/utils/performance.ts";
export function useOptimizedContent(fetchFunction, dependencies = []) {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
    hasMore: true,
    page: 1
  });
  const debouncedFetch = useCallback(
    performanceOptimizer.debounce(async (page, append = false) => {
      try {
        if (!append) {
          setState((prev) => ({ ...prev, loading: true, error: null }));
        }
        const response = await errorHandler.handleAsyncError(
          fetchFunction(page),
          "useOptimizedContent"
        );
        const uniqueResults = tmdbService.removeDuplicates(response.results);
        setState((prev) => ({
          ...prev,
          data: append ? tmdbService.removeDuplicates([...prev.data, ...uniqueResults]) : uniqueResults,
          loading: false,
          hasMore: page < response.total_pages,
          page
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Error al cargar el contenido. Por favor, intenta de nuevo."
        }));
      }
    }, 300),
    [fetchFunction]
  );
  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      const nextPage = state.page + 1;
      setState((prev) => ({ ...prev, page: nextPage }));
      debouncedFetch(nextPage, true);
    }
  }, [state.loading, state.hasMore, state.page, debouncedFetch]);
  const refresh = useCallback(() => {
    setState((prev) => ({ ...prev, page: 1 }));
    debouncedFetch(1, false);
  }, [debouncedFetch]);
  useEffect(() => {
    debouncedFetch(1, false);
  }, dependencies);
  return {
    ...state,
    loadMore,
    refresh
  };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZU9wdGltaXplZENvbnRlbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0bWRiU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RtZGInO1xuaW1wb3J0IHsgZXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vdXRpbHMvZXJyb3JIYW5kbGVyJztcbmltcG9ydCB7IHBlcmZvcm1hbmNlT3B0aW1pemVyIH0gZnJvbSAnLi4vdXRpbHMvcGVyZm9ybWFuY2UnO1xuaW1wb3J0IHR5cGUgeyBNb3ZpZSwgVFZTaG93IH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG5pbnRlcmZhY2UgQ29udGVudFN0YXRlIHtcbiAgZGF0YTogKE1vdmllIHwgVFZTaG93KVtdO1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBlcnJvcjogc3RyaW5nIHwgbnVsbDtcbiAgaGFzTW9yZTogYm9vbGVhbjtcbiAgcGFnZTogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlT3B0aW1pemVkQ29udGVudChcbiAgZmV0Y2hGdW5jdGlvbjogKHBhZ2U6IG51bWJlcikgPT4gUHJvbWlzZTxhbnk+LFxuICBkZXBlbmRlbmNpZXM6IGFueVtdID0gW11cbikge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPENvbnRlbnRTdGF0ZT4oe1xuICAgIGRhdGE6IFtdLFxuICAgIGxvYWRpbmc6IHRydWUsXG4gICAgZXJyb3I6IG51bGwsXG4gICAgaGFzTW9yZTogdHJ1ZSxcbiAgICBwYWdlOiAxXG4gIH0pO1xuXG4gIGNvbnN0IGRlYm91bmNlZEZldGNoID0gdXNlQ2FsbGJhY2soXG4gICAgcGVyZm9ybWFuY2VPcHRpbWl6ZXIuZGVib3VuY2UoYXN5bmMgKHBhZ2U6IG51bWJlciwgYXBwZW5kOiBib29sZWFuID0gZmFsc2UpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghYXBwZW5kKSB7XG4gICAgICAgICAgc2V0U3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBsb2FkaW5nOiB0cnVlLCBlcnJvcjogbnVsbCB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGVycm9ySGFuZGxlci5oYW5kbGVBc3luY0Vycm9yKFxuICAgICAgICAgIGZldGNoRnVuY3Rpb24ocGFnZSksXG4gICAgICAgICAgJ3VzZU9wdGltaXplZENvbnRlbnQnXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgdW5pcXVlUmVzdWx0cyA9IHRtZGJTZXJ2aWNlLnJlbW92ZUR1cGxpY2F0ZXMocmVzcG9uc2UucmVzdWx0cyk7XG5cbiAgICAgICAgc2V0U3RhdGUocHJldiA9PiAoe1xuICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgZGF0YTogYXBwZW5kID8gdG1kYlNlcnZpY2UucmVtb3ZlRHVwbGljYXRlcyhbLi4ucHJldi5kYXRhLCAuLi51bmlxdWVSZXN1bHRzXSkgOiB1bmlxdWVSZXN1bHRzLFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIGhhc01vcmU6IHBhZ2UgPCByZXNwb25zZS50b3RhbF9wYWdlcyxcbiAgICAgICAgICBwYWdlXG4gICAgICAgIH0pKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNldFN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiAnRXJyb3IgYWwgY2FyZ2FyIGVsIGNvbnRlbmlkby4gUG9yIGZhdm9yLCBpbnRlbnRhIGRlIG51ZXZvLidcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0sIDMwMCksXG4gICAgW2ZldGNoRnVuY3Rpb25dXG4gICk7XG5cbiAgY29uc3QgbG9hZE1vcmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5sb2FkaW5nICYmIHN0YXRlLmhhc01vcmUpIHtcbiAgICAgIGNvbnN0IG5leHRQYWdlID0gc3RhdGUucGFnZSArIDE7XG4gICAgICBzZXRTdGF0ZShwcmV2ID0+ICh7IC4uLnByZXYsIHBhZ2U6IG5leHRQYWdlIH0pKTtcbiAgICAgIGRlYm91bmNlZEZldGNoKG5leHRQYWdlLCB0cnVlKTtcbiAgICB9XG4gIH0sIFtzdGF0ZS5sb2FkaW5nLCBzdGF0ZS5oYXNNb3JlLCBzdGF0ZS5wYWdlLCBkZWJvdW5jZWRGZXRjaF0pO1xuXG4gIGNvbnN0IHJlZnJlc2ggPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBwYWdlOiAxIH0pKTtcbiAgICBkZWJvdW5jZWRGZXRjaCgxLCBmYWxzZSk7XG4gIH0sIFtkZWJvdW5jZWRGZXRjaF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZGVib3VuY2VkRmV0Y2goMSwgZmFsc2UpO1xuICB9LCBkZXBlbmRlbmNpZXMpO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbG9hZE1vcmUsXG4gICAgcmVmcmVzaFxuICB9O1xufSJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxVQUFVLFdBQVcsbUJBQW1CO0FBQ2pELFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsNEJBQTRCO0FBVzlCLGdCQUFTLG9CQUNkLGVBQ0EsZUFBc0IsQ0FBQyxHQUN2QjtBQUNBLFFBQU0sQ0FBQyxPQUFPLFFBQVEsSUFBSSxTQUF1QjtBQUFBLElBQy9DLE1BQU0sQ0FBQztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFFBQU0saUJBQWlCO0FBQUEsSUFDckIscUJBQXFCLFNBQVMsT0FBTyxNQUFjLFNBQWtCLFVBQVU7QUFDN0UsVUFBSTtBQUNGLFlBQUksQ0FBQyxRQUFRO0FBQ1gsbUJBQVMsV0FBUyxFQUFFLEdBQUcsTUFBTSxTQUFTLE1BQU0sT0FBTyxLQUFLLEVBQUU7QUFBQSxRQUM1RDtBQUVBLGNBQU0sV0FBVyxNQUFNLGFBQWE7QUFBQSxVQUNsQyxjQUFjLElBQUk7QUFBQSxVQUNsQjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGdCQUFnQixZQUFZLGlCQUFpQixTQUFTLE9BQU87QUFFbkUsaUJBQVMsV0FBUztBQUFBLFVBQ2hCLEdBQUc7QUFBQSxVQUNILE1BQU0sU0FBUyxZQUFZLGlCQUFpQixDQUFDLEdBQUcsS0FBSyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUk7QUFBQSxVQUNoRixTQUFTO0FBQUEsVUFDVCxTQUFTLE9BQU8sU0FBUztBQUFBLFVBQ3pCO0FBQUEsUUFDRixFQUFFO0FBQUEsTUFDSixTQUFTLE9BQU87QUFDZCxpQkFBUyxXQUFTO0FBQUEsVUFDaEIsR0FBRztBQUFBLFVBQ0gsU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFFBQ1QsRUFBRTtBQUFBLE1BQ0o7QUFBQSxJQUNGLEdBQUcsR0FBRztBQUFBLElBQ04sQ0FBQyxhQUFhO0FBQUEsRUFDaEI7QUFFQSxRQUFNLFdBQVcsWUFBWSxNQUFNO0FBQ2pDLFFBQUksQ0FBQyxNQUFNLFdBQVcsTUFBTSxTQUFTO0FBQ25DLFlBQU0sV0FBVyxNQUFNLE9BQU87QUFDOUIsZUFBUyxXQUFTLEVBQUUsR0FBRyxNQUFNLE1BQU0sU0FBUyxFQUFFO0FBQzlDLHFCQUFlLFVBQVUsSUFBSTtBQUFBLElBQy9CO0FBQUEsRUFDRixHQUFHLENBQUMsTUFBTSxTQUFTLE1BQU0sU0FBUyxNQUFNLE1BQU0sY0FBYyxDQUFDO0FBRTdELFFBQU0sVUFBVSxZQUFZLE1BQU07QUFDaEMsYUFBUyxXQUFTLEVBQUUsR0FBRyxNQUFNLE1BQU0sRUFBRSxFQUFFO0FBQ3ZDLG1CQUFlLEdBQUcsS0FBSztBQUFBLEVBQ3pCLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFFbkIsWUFBVSxNQUFNO0FBQ2QsbUJBQWUsR0FBRyxLQUFLO0FBQUEsRUFDekIsR0FBRyxZQUFZO0FBRWYsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOyIsIm5hbWVzIjpbXX0=