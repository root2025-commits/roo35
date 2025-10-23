import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/TVShows.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/TVShows.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"];
import { Monitor, Filter } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useOptimizedContent } from "/src/hooks/useOptimizedContent.ts";
import { tmdbService } from "/src/services/tmdb.ts";
import { MovieCard } from "/src/components/MovieCard.tsx";
import { LoadingSpinner } from "/src/components/LoadingSpinner.tsx";
import { ErrorMessage } from "/src/components/ErrorMessage.tsx";
export function TVShows() {
  _s();
  const [category, setCategory] = useState("popular");
  const categoryTitles = {
    popular: "Populares",
    top_rated: "Mejor Valoradas",
    airing_today: "Al Aire Hoy",
    on_the_air: "En Emisión"
  };
  const getFetchFunction = (selectedCategory) => {
    switch (selectedCategory) {
      case "top_rated":
        return tmdbService.getTopRatedTVShows.bind(tmdbService);
      case "airing_today":
        return tmdbService.getAiringTodayTVShows.bind(tmdbService);
      case "on_the_air":
        return tmdbService.getOnTheAirTVShows.bind(tmdbService);
      default:
        return tmdbService.getPopularTVShows.bind(tmdbService);
    }
  };
  const { data: tvShows, loading, error, hasMore, loadMore } = useOptimizedContent(
    getFetchFunction(category),
    [category]
  );
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  if (loading && tvShows.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
      fileName: "/home/project/src/pages/TVShows.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/TVShows.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this);
  }
  if (error && tvShows.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(ErrorMessage, { message: error }, void 0, false, {
      fileName: "/home/project/src/pages/TVShows.tsx",
      lineNumber: 74,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/TVShows.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-6", children: [
        /* @__PURE__ */ jsxDEV(Monitor, { className: "mr-3 h-8 w-8 text-purple-600" }, void 0, false, {
          fileName: "/home/project/src/pages/TVShows.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-bold text-gray-900", children: [
          "Series ",
          categoryTitles[category]
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/TVShows.tsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/TVShows.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-3 sm:p-4 shadow-sm w-full", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
          /* @__PURE__ */ jsxDEV(Filter, { className: "h-4 w-4 text-gray-500 mr-2" }, void 0, false, {
            fileName: "/home/project/src/pages/TVShows.tsx",
            lineNumber: 94,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-medium text-gray-700", children: "Categoría:" }, void 0, false, {
            fileName: "/home/project/src/pages/TVShows.tsx",
            lineNumber: 95,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/TVShows.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: Object.entries(categoryTitles).map(
          ([key, title]) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCategoryChange(key),
              className: `px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${category === key ? "bg-purple-600 text-white shadow-md transform scale-105" : "text-gray-600 hover:text-purple-600 hover:bg-purple-50 border border-gray-200"}`,
              children: title
            },
            key,
            false,
            {
              fileName: "/home/project/src/pages/TVShows.tsx",
              lineNumber: 99,
              columnNumber: 15
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/home/project/src/pages/TVShows.tsx",
          lineNumber: 97,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/TVShows.tsx",
        lineNumber: 92,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/TVShows.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8", children: tvShows.map(
      (show) => /* @__PURE__ */ jsxDEV(MovieCard, { item: show, type: "tv" }, `${show.id}-${category}`, false, {
        fileName: "/home/project/src/pages/TVShows.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this)
    ) }, void 0, false, {
      fileName: "/home/project/src/pages/TVShows.tsx",
      lineNumber: 116,
      columnNumber: 9
    }, this),
    hasMore && /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: loadMore,
        disabled: loading,
        className: "bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-colors",
        children: loading ? "Cargando..." : "Cargar más series"
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/pages/TVShows.tsx",
        lineNumber: 125,
        columnNumber: 13
      },
      this
    ) }, void 0, false, {
      fileName: "/home/project/src/pages/TVShows.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/TVShows.tsx",
    lineNumber: 81,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/pages/TVShows.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
}
_s(TVShows, "86ktPe1Vh71temHudEkaU/hVqw8=", false, function() {
  return [useOptimizedContent];
});
_c = TVShows;
var _c;
$RefreshReg$(_c, "TVShows");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/TVShows.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/TVShows.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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MUIsYUFBYTBCLE1BQ1QsMkRBQ0EsK0VBQStFO0FBQUEsY0FHcEZDO0FBQUFBO0FBQUFBLFlBUklEO0FBQUFBLFlBRFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVVBO0FBQUEsUUFDRCxLQWJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFjQTtBQUFBLFdBbkJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFvQkE7QUFBQSxTQTdCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBOEJBO0FBQUEsSUFHQSx1QkFBQyxTQUFJLFdBQVUsMkZBQ1pYLGtCQUFRVTtBQUFBQSxNQUFJLENBQUNHLFNBQ1osdUJBQUMsYUFBeUMsTUFBTUEsTUFBTSxNQUFLLFFBQTNDLEdBQUdBLEtBQUtDLEVBQUUsSUFBSTdCLFFBQVEsSUFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUErRDtBQUFBLElBQ2hFLEtBSEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUlBO0FBQUEsSUFHQ2tCLFdBQ0MsdUJBQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVNDO0FBQUFBLFFBQ1QsVUFBVUg7QUFBQUEsUUFDVixXQUFVO0FBQUEsUUFFVEEsb0JBQVUsZ0JBQWdCO0FBQUE7QUFBQSxNQUw3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNQSxLQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FRQTtBQUFBLE9BbkRKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FxREEsS0F0REY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXVEQTtBQUVKO0FBQUNqQixHQTFHZUQsU0FBTztBQUFBLFVBdUJ3Q0wsbUJBQW1CO0FBQUE7QUFBQXFDLEtBdkJsRWhDO0FBQU8sSUFBQWdDO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIk1vbml0b3IiLCJGaWx0ZXIiLCJ1c2VPcHRpbWl6ZWRDb250ZW50IiwidG1kYlNlcnZpY2UiLCJNb3ZpZUNhcmQiLCJMb2FkaW5nU3Bpbm5lciIsIkVycm9yTWVzc2FnZSIsIlRWU2hvd3MiLCJfcyIsImNhdGVnb3J5Iiwic2V0Q2F0ZWdvcnkiLCJjYXRlZ29yeVRpdGxlcyIsInBvcHVsYXIiLCJ0b3BfcmF0ZWQiLCJhaXJpbmdfdG9kYXkiLCJvbl90aGVfYWlyIiwiZ2V0RmV0Y2hGdW5jdGlvbiIsInNlbGVjdGVkQ2F0ZWdvcnkiLCJnZXRUb3BSYXRlZFRWU2hvd3MiLCJiaW5kIiwiZ2V0QWlyaW5nVG9kYXlUVlNob3dzIiwiZ2V0T25UaGVBaXJUVlNob3dzIiwiZ2V0UG9wdWxhclRWU2hvd3MiLCJkYXRhIiwidHZTaG93cyIsImxvYWRpbmciLCJlcnJvciIsImhhc01vcmUiLCJsb2FkTW9yZSIsImhhbmRsZUNhdGVnb3J5Q2hhbmdlIiwibmV3Q2F0ZWdvcnkiLCJsZW5ndGgiLCJPYmplY3QiLCJlbnRyaWVzIiwibWFwIiwia2V5IiwidGl0bGUiLCJzaG93IiwiaWQiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJUVlNob3dzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1vbml0b3IsIEZpbHRlciB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VPcHRpbWl6ZWRDb250ZW50IH0gZnJvbSAnLi4vaG9va3MvdXNlT3B0aW1pemVkQ29udGVudCc7XG5pbXBvcnQgeyB0bWRiU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RtZGInO1xuaW1wb3J0IHsgTW92aWVDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Nb3ZpZUNhcmQnO1xuaW1wb3J0IHsgTG9hZGluZ1NwaW5uZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL0xvYWRpbmdTcGlubmVyJztcbmltcG9ydCB7IEVycm9yTWVzc2FnZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JNZXNzYWdlJztcbmltcG9ydCB0eXBlIHsgVFZTaG93IH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG50eXBlIFRWQ2F0ZWdvcnkgPSAncG9wdWxhcicgfCAndG9wX3JhdGVkJyB8ICdhaXJpbmdfdG9kYXknIHwgJ29uX3RoZV9haXInO1xuXG5leHBvcnQgZnVuY3Rpb24gVFZTaG93cygpIHtcbiAgY29uc3QgW2NhdGVnb3J5LCBzZXRDYXRlZ29yeV0gPSB1c2VTdGF0ZTxUVkNhdGVnb3J5PigncG9wdWxhcicpO1xuXG4gIGNvbnN0IGNhdGVnb3J5VGl0bGVzID0ge1xuICAgIHBvcHVsYXI6ICdQb3B1bGFyZXMnLFxuICAgIHRvcF9yYXRlZDogJ01lam9yIFZhbG9yYWRhcycsXG4gICAgYWlyaW5nX3RvZGF5OiAnQWwgQWlyZSBIb3knLFxuICAgIG9uX3RoZV9haXI6ICdFbiBFbWlzacOzbidcbiAgfTtcblxuICBjb25zdCBnZXRGZXRjaEZ1bmN0aW9uID0gKHNlbGVjdGVkQ2F0ZWdvcnk6IFRWQ2F0ZWdvcnkpID0+IHtcbiAgICBzd2l0Y2ggKHNlbGVjdGVkQ2F0ZWdvcnkpIHtcbiAgICAgIGNhc2UgJ3RvcF9yYXRlZCc6XG4gICAgICAgIHJldHVybiB0bWRiU2VydmljZS5nZXRUb3BSYXRlZFRWU2hvd3MuYmluZCh0bWRiU2VydmljZSk7XG4gICAgICBjYXNlICdhaXJpbmdfdG9kYXknOlxuICAgICAgICByZXR1cm4gdG1kYlNlcnZpY2UuZ2V0QWlyaW5nVG9kYXlUVlNob3dzLmJpbmQodG1kYlNlcnZpY2UpO1xuICAgICAgY2FzZSAnb25fdGhlX2Fpcic6XG4gICAgICAgIHJldHVybiB0bWRiU2VydmljZS5nZXRPblRoZUFpclRWU2hvd3MuYmluZCh0bWRiU2VydmljZSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdG1kYlNlcnZpY2UuZ2V0UG9wdWxhclRWU2hvd3MuYmluZCh0bWRiU2VydmljZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHsgZGF0YTogdHZTaG93cywgbG9hZGluZywgZXJyb3IsIGhhc01vcmUsIGxvYWRNb3JlIH0gPSB1c2VPcHRpbWl6ZWRDb250ZW50KFxuICAgIGdldEZldGNoRnVuY3Rpb24oY2F0ZWdvcnkpLFxuICAgIFtjYXRlZ29yeV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVDYXRlZ29yeUNoYW5nZSA9IChuZXdDYXRlZ29yeTogVFZDYXRlZ29yeSkgPT4ge1xuICAgIHNldENhdGVnb3J5KG5ld0NhdGVnb3J5KTtcbiAgfTtcblxuICBpZiAobG9hZGluZyAmJiB0dlNob3dzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICAgIDxMb2FkaW5nU3Bpbm5lciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChlcnJvciAmJiB0dlNob3dzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICAgIDxFcnJvck1lc3NhZ2UgbWVzc2FnZT17ZXJyb3J9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHB5LThcIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi02XCI+XG4gICAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJtci0zIGgtOCB3LTggdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPlxuICAgICAgICAgICAgICBTZXJpZXMge2NhdGVnb3J5VGl0bGVzW2NhdGVnb3J5XX1cbiAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2F0ZWdvcnkgRmlsdGVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC1sZyBwLTMgc206cC00IHNoYWRvdy1zbSB3LWZ1bGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItM1wiPlxuICAgICAgICAgICAgICA8RmlsdGVyIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC1ncmF5LTUwMCBtci0yXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwXCI+Q2F0ZWdvcsOtYTo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtMlwiPlxuICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoY2F0ZWdvcnlUaXRsZXMpLm1hcCgoW2tleSwgdGl0bGVdKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDYXRlZ29yeUNoYW5nZShrZXkgYXMgVFZDYXRlZ29yeSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHNtOnB4LTQgcHktMiBzbTpweS0zIHJvdW5kZWQtbGcgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSA9PT0ga2V5XG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCB0cmFuc2Zvcm0gc2NhbGUtMTA1J1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZ3JheS02MDAgaG92ZXI6dGV4dC1wdXJwbGUtNjAwIGhvdmVyOmJnLXB1cnBsZS01MCBib3JkZXIgYm9yZGVyLWdyYXktMjAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3RpdGxlfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVFYgU2hvd3MgR3JpZCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy0zIGxnOmdyaWQtY29scy00IHhsOmdyaWQtY29scy01IGdhcC02IG1iLThcIj5cbiAgICAgICAgICB7dHZTaG93cy5tYXAoKHNob3cpID0+IChcbiAgICAgICAgICAgIDxNb3ZpZUNhcmQga2V5PXtgJHtzaG93LmlkfS0ke2NhdGVnb3J5fWB9IGl0ZW09e3Nob3d9IHR5cGU9XCJ0dlwiIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMb2FkIE1vcmUgQnV0dG9uICovfVxuICAgICAgICB7aGFzTW9yZSAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtsb2FkTW9yZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTcwMCBkaXNhYmxlZDpiZy1wdXJwbGUtNDAwIHRleHQtd2hpdGUgcHgtOCBweS0zIHJvdW5kZWQtbGcgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bG9hZGluZyA/ICdDYXJnYW5kby4uLicgOiAnQ2FyZ2FyIG3DoXMgc2VyaWVzJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9wYWdlcy9UVlNob3dzLnRzeCJ9