import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Movies.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/Movies.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"];
import { Clapperboard, Filter } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useOptimizedContent } from "/src/hooks/useOptimizedContent.ts";
import { tmdbService } from "/src/services/tmdb.ts";
import { MovieCard } from "/src/components/MovieCard.tsx";
import { LoadingSpinner } from "/src/components/LoadingSpinner.tsx";
import { ErrorMessage } from "/src/components/ErrorMessage.tsx";
export function Movies() {
  _s();
  const [category, setCategory] = useState("popular");
  const categoryTitles = {
    popular: "Populares",
    top_rated: "Mejor Valoradas",
    upcoming: "Próximos Estrenos",
    now_playing: "En Cartelera"
  };
  const getFetchFunction = (selectedCategory) => {
    switch (selectedCategory) {
      case "top_rated":
        return tmdbService.getTopRatedMovies.bind(tmdbService);
      case "upcoming":
        return tmdbService.getUpcomingMovies.bind(tmdbService);
      case "now_playing":
        return tmdbService.getNowPlayingMovies.bind(tmdbService);
      default:
        return tmdbService.getPopularMovies.bind(tmdbService);
    }
  };
  const { data: movies, loading, error, hasMore, loadMore } = useOptimizedContent(
    getFetchFunction(category),
    [category]
  );
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  if (loading && movies.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
      fileName: "/home/project/src/pages/Movies.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Movies.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this);
  }
  if (error && movies.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(ErrorMessage, { message: error }, void 0, false, {
      fileName: "/home/project/src/pages/Movies.tsx",
      lineNumber: 74,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Movies.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-6", children: [
        /* @__PURE__ */ jsxDEV(Clapperboard, { className: "mr-3 h-8 w-8 text-blue-600" }, void 0, false, {
          fileName: "/home/project/src/pages/Movies.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-bold text-gray-900", children: [
          "Películas ",
          categoryTitles[category]
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Movies.tsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Movies.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-3 sm:p-4 shadow-sm w-full", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
          /* @__PURE__ */ jsxDEV(Filter, { className: "h-4 w-4 text-gray-500 mr-2" }, void 0, false, {
            fileName: "/home/project/src/pages/Movies.tsx",
            lineNumber: 94,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-medium text-gray-700", children: "Categoría:" }, void 0, false, {
            fileName: "/home/project/src/pages/Movies.tsx",
            lineNumber: 95,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Movies.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: Object.entries(categoryTitles).map(
          ([key, title]) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCategoryChange(key),
              className: `px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${category === key ? "bg-blue-600 text-white shadow-md transform scale-105" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200"}`,
              children: title
            },
            key,
            false,
            {
              fileName: "/home/project/src/pages/Movies.tsx",
              lineNumber: 99,
              columnNumber: 15
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/home/project/src/pages/Movies.tsx",
          lineNumber: 97,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Movies.tsx",
        lineNumber: 92,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Movies.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8", children: movies.map(
      (movie) => /* @__PURE__ */ jsxDEV(MovieCard, { item: movie, type: "movie" }, `${movie.id}-${category}`, false, {
        fileName: "/home/project/src/pages/Movies.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this)
    ) }, void 0, false, {
      fileName: "/home/project/src/pages/Movies.tsx",
      lineNumber: 116,
      columnNumber: 9
    }, this),
    hasMore && /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: loadMore,
        disabled: loading,
        className: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors",
        children: loading ? "Cargando..." : "Cargar más películas"
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/pages/Movies.tsx",
        lineNumber: 125,
        columnNumber: 13
      },
      this
    ) }, void 0, false, {
      fileName: "/home/project/src/pages/Movies.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/Movies.tsx",
    lineNumber: 81,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/pages/Movies.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
}
_s(Movies, "CTD+n/Ht7agx6t/kngGxThpJCVk=", false, function() {
  return [useOptimizedContent];
});
_c = Movies;
var _c;
$RefreshReg$(_c, "Movies");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/Movies.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/Movies.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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VDFCLGFBQWEwQixNQUNULHlEQUNBLDJFQUEyRTtBQUFBLGNBR2hGQztBQUFBQTtBQUFBQSxZQVJJRDtBQUFBQSxZQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFVQTtBQUFBLFFBQ0QsS0FiSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBY0E7QUFBQSxXQW5CRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBb0JBO0FBQUEsU0E3QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQThCQTtBQUFBLElBR0EsdUJBQUMsU0FBSSxXQUFVLDJGQUNaWCxpQkFBT1U7QUFBQUEsTUFBSSxDQUFDRyxVQUNYLHVCQUFDLGFBQTBDLE1BQU1BLE9BQU8sTUFBSyxXQUE3QyxHQUFHQSxNQUFNQyxFQUFFLElBQUk3QixRQUFRLElBQXZDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBb0U7QUFBQSxJQUNyRSxLQUhIO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FJQTtBQUFBLElBR0NrQixXQUNDLHVCQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxTQUFTQztBQUFBQSxRQUNULFVBQVVIO0FBQUFBLFFBQ1YsV0FBVTtBQUFBLFFBRVRBLG9CQUFVLGdCQUFnQjtBQUFBO0FBQUEsTUFMN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsS0FQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBUUE7QUFBQSxPQW5ESjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBcURBLEtBdERGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F1REE7QUFFSjtBQUFDakIsR0ExR2VELFFBQU07QUFBQSxVQXVCd0NMLG1CQUFtQjtBQUFBO0FBQUFxQyxLQXZCakVoQztBQUFNLElBQUFnQztBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJDbGFwcGVyYm9hcmQiLCJGaWx0ZXIiLCJ1c2VPcHRpbWl6ZWRDb250ZW50IiwidG1kYlNlcnZpY2UiLCJNb3ZpZUNhcmQiLCJMb2FkaW5nU3Bpbm5lciIsIkVycm9yTWVzc2FnZSIsIk1vdmllcyIsIl9zIiwiY2F0ZWdvcnkiLCJzZXRDYXRlZ29yeSIsImNhdGVnb3J5VGl0bGVzIiwicG9wdWxhciIsInRvcF9yYXRlZCIsInVwY29taW5nIiwibm93X3BsYXlpbmciLCJnZXRGZXRjaEZ1bmN0aW9uIiwic2VsZWN0ZWRDYXRlZ29yeSIsImdldFRvcFJhdGVkTW92aWVzIiwiYmluZCIsImdldFVwY29taW5nTW92aWVzIiwiZ2V0Tm93UGxheWluZ01vdmllcyIsImdldFBvcHVsYXJNb3ZpZXMiLCJkYXRhIiwibW92aWVzIiwibG9hZGluZyIsImVycm9yIiwiaGFzTW9yZSIsImxvYWRNb3JlIiwiaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UiLCJuZXdDYXRlZ29yeSIsImxlbmd0aCIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJrZXkiLCJ0aXRsZSIsIm1vdmllIiwiaWQiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJNb3ZpZXMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2xhcHBlcmJvYXJkLCBGaWx0ZXIgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgdXNlT3B0aW1pemVkQ29udGVudCB9IGZyb20gJy4uL2hvb2tzL3VzZU9wdGltaXplZENvbnRlbnQnO1xuaW1wb3J0IHsgdG1kYlNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90bWRiJztcbmltcG9ydCB7IE1vdmllQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvTW92aWVDYXJkJztcbmltcG9ydCB7IExvYWRpbmdTcGlubmVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Mb2FkaW5nU3Bpbm5lcic7XG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21wb25lbnRzL0Vycm9yTWVzc2FnZSc7XG5pbXBvcnQgdHlwZSB7IE1vdmllIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG50eXBlIE1vdmllQ2F0ZWdvcnkgPSAncG9wdWxhcicgfCAndG9wX3JhdGVkJyB8ICd1cGNvbWluZycgfCAnbm93X3BsYXlpbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gTW92aWVzKCkge1xuICBjb25zdCBbY2F0ZWdvcnksIHNldENhdGVnb3J5XSA9IHVzZVN0YXRlPE1vdmllQ2F0ZWdvcnk+KCdwb3B1bGFyJyk7XG5cbiAgY29uc3QgY2F0ZWdvcnlUaXRsZXMgPSB7XG4gICAgcG9wdWxhcjogJ1BvcHVsYXJlcycsXG4gICAgdG9wX3JhdGVkOiAnTWVqb3IgVmFsb3JhZGFzJyxcbiAgICB1cGNvbWluZzogJ1Byw7N4aW1vcyBFc3RyZW5vcycsXG4gICAgbm93X3BsYXlpbmc6ICdFbiBDYXJ0ZWxlcmEnXG4gIH07XG5cbiAgY29uc3QgZ2V0RmV0Y2hGdW5jdGlvbiA9IChzZWxlY3RlZENhdGVnb3J5OiBNb3ZpZUNhdGVnb3J5KSA9PiB7XG4gICAgc3dpdGNoIChzZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgICBjYXNlICd0b3BfcmF0ZWQnOlxuICAgICAgICByZXR1cm4gdG1kYlNlcnZpY2UuZ2V0VG9wUmF0ZWRNb3ZpZXMuYmluZCh0bWRiU2VydmljZSk7XG4gICAgICBjYXNlICd1cGNvbWluZyc6XG4gICAgICAgIHJldHVybiB0bWRiU2VydmljZS5nZXRVcGNvbWluZ01vdmllcy5iaW5kKHRtZGJTZXJ2aWNlKTtcbiAgICAgIGNhc2UgJ25vd19wbGF5aW5nJzpcbiAgICAgICAgcmV0dXJuIHRtZGJTZXJ2aWNlLmdldE5vd1BsYXlpbmdNb3ZpZXMuYmluZCh0bWRiU2VydmljZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdG1kYlNlcnZpY2UuZ2V0UG9wdWxhck1vdmllcy5iaW5kKHRtZGJTZXJ2aWNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgeyBkYXRhOiBtb3ZpZXMsIGxvYWRpbmcsIGVycm9yLCBoYXNNb3JlLCBsb2FkTW9yZSB9ID0gdXNlT3B0aW1pemVkQ29udGVudChcbiAgICBnZXRGZXRjaEZ1bmN0aW9uKGNhdGVnb3J5KSxcbiAgICBbY2F0ZWdvcnldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UgPSAobmV3Q2F0ZWdvcnk6IE1vdmllQ2F0ZWdvcnkpID0+IHtcbiAgICBzZXRDYXRlZ29yeShuZXdDYXRlZ29yeSk7XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcgJiYgbW92aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICAgIDxMb2FkaW5nU3Bpbm5lciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChlcnJvciAmJiBtb3ZpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTBcIj5cbiAgICAgICAgPEVycm9yTWVzc2FnZSBtZXNzYWdlPXtlcnJvcn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktOFwiPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLThcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTZcIj5cbiAgICAgICAgICAgIDxDbGFwcGVyYm9hcmQgY2xhc3NOYW1lPVwibXItMyBoLTggdy04IHRleHQtYmx1ZS02MDBcIiAvPlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+XG4gICAgICAgICAgICAgIFBlbMOtY3VsYXMge2NhdGVnb3J5VGl0bGVzW2NhdGVnb3J5XX1cbiAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2F0ZWdvcnkgRmlsdGVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC1sZyBwLTMgc206cC00IHNoYWRvdy1zbSB3LWZ1bGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItM1wiPlxuICAgICAgICAgICAgICA8RmlsdGVyIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC1ncmF5LTUwMCBtci0yXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwXCI+Q2F0ZWdvcsOtYTo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtMlwiPlxuICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoY2F0ZWdvcnlUaXRsZXMpLm1hcCgoW2tleSwgdGl0bGVdKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDYXRlZ29yeUNoYW5nZShrZXkgYXMgTW92aWVDYXRlZ29yeSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHNtOnB4LTQgcHktMiBzbTpweS0zIHJvdW5kZWQtbGcgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSA9PT0ga2V5XG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctYmx1ZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgdHJhbnNmb3JtIHNjYWxlLTEwNSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtYmx1ZS02MDAgaG92ZXI6YmctYmx1ZS01MCBib3JkZXIgYm9yZGVyLWdyYXktMjAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3RpdGxlfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTW92aWVzIEdyaWQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBtZDpncmlkLWNvbHMtMyBsZzpncmlkLWNvbHMtNCB4bDpncmlkLWNvbHMtNSBnYXAtNiBtYi04XCI+XG4gICAgICAgICAge21vdmllcy5tYXAoKG1vdmllKSA9PiAoXG4gICAgICAgICAgICA8TW92aWVDYXJkIGtleT17YCR7bW92aWUuaWR9LSR7Y2F0ZWdvcnl9YH0gaXRlbT17bW92aWV9IHR5cGU9XCJtb3ZpZVwiIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMb2FkIE1vcmUgQnV0dG9uICovfVxuICAgICAgICB7aGFzTW9yZSAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtsb2FkTW9yZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWJsdWUtNjAwIGhvdmVyOmJnLWJsdWUtNzAwIGRpc2FibGVkOmJnLWJsdWUtNDAwIHRleHQtd2hpdGUgcHgtOCBweS0zIHJvdW5kZWQtbGcgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bG9hZGluZyA/ICdDYXJnYW5kby4uLicgOiAnQ2FyZ2FyIG3DoXMgcGVsw61jdWxhcyd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJmaWxlIjoiL2hvbWUvcHJvamVjdC9zcmMvcGFnZXMvTW92aWVzLnRzeCJ9