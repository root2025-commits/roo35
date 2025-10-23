import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Anime.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/Anime.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"];
import { Filter, Sparkles } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useOptimizedContent } from "/src/hooks/useOptimizedContent.ts";
import { tmdbService } from "/src/services/tmdb.ts";
import { MovieCard } from "/src/components/MovieCard.tsx";
import { LoadingSpinner } from "/src/components/LoadingSpinner.tsx";
import { ErrorMessage } from "/src/components/ErrorMessage.tsx";
export function Anime() {
  _s();
  const [category, setCategory] = useState("popular");
  const categoryTitles = {
    popular: "Populares",
    top_rated: "Mejor Valorados"
  };
  const getFetchFunction = (selectedCategory) => {
    switch (selectedCategory) {
      case "top_rated":
        return tmdbService.getTopRatedAnime.bind(tmdbService);
      default:
        return tmdbService.getAnimeFromMultipleSources.bind(tmdbService);
    }
  };
  const { data: animeList, loading, error, hasMore, loadMore } = useOptimizedContent(
    getFetchFunction(category),
    [category]
  );
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  if (loading && animeList.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
      fileName: "/home/project/src/pages/Anime.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Anime.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this);
  }
  if (error && animeList.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(ErrorMessage, { message: error }, void 0, false, {
      fileName: "/home/project/src/pages/Anime.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Anime.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-6", children: [
        /* @__PURE__ */ jsxDEV(Sparkles, { className: "mr-3 h-8 w-8 text-pink-600" }, void 0, false, {
          fileName: "/home/project/src/pages/Anime.tsx",
          lineNumber: 79,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-bold text-gray-900", children: [
          "Anime ",
          categoryTitles[category]
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Anime.tsx",
          lineNumber: 80,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Anime.tsx",
        lineNumber: 78,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 mb-6", children: "Descubre los mejores animes japoneses más populares y mejor valorados." }, void 0, false, {
        fileName: "/home/project/src/pages/Anime.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-3 sm:p-4 shadow-sm w-full", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
          /* @__PURE__ */ jsxDEV(Filter, { className: "h-4 w-4 text-gray-500 mr-2" }, void 0, false, {
            fileName: "/home/project/src/pages/Anime.tsx",
            lineNumber: 91,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-medium text-gray-700", children: "Categoría:" }, void 0, false, {
            fileName: "/home/project/src/pages/Anime.tsx",
            lineNumber: 92,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Anime.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: Object.entries(categoryTitles).map(
          ([key, title]) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCategoryChange(key),
              className: `px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${category === key ? "bg-pink-600 text-white shadow-md transform scale-105" : "text-gray-600 hover:text-pink-600 hover:bg-pink-50 border border-gray-200"}`,
              children: title
            },
            key,
            false,
            {
              fileName: "/home/project/src/pages/Anime.tsx",
              lineNumber: 96,
              columnNumber: 15
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/home/project/src/pages/Anime.tsx",
          lineNumber: 94,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Anime.tsx",
        lineNumber: 89,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Anime.tsx",
      lineNumber: 77,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8", children: animeList.map(
      (anime) => /* @__PURE__ */ jsxDEV(MovieCard, { item: anime, type: "tv" }, `${anime.id}-${category}`, false, {
        fileName: "/home/project/src/pages/Anime.tsx",
        lineNumber: 115,
        columnNumber: 11
      }, this)
    ) }, void 0, false, {
      fileName: "/home/project/src/pages/Anime.tsx",
      lineNumber: 113,
      columnNumber: 9
    }, this),
    hasMore && /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: loadMore,
        disabled: loading,
        className: "bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white px-8 py-3 rounded-lg font-medium transition-colors",
        children: loading ? "Cargando..." : "Cargar más anime"
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/pages/Anime.tsx",
        lineNumber: 122,
        columnNumber: 13
      },
      this
    ) }, void 0, false, {
      fileName: "/home/project/src/pages/Anime.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/Anime.tsx",
    lineNumber: 75,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/pages/Anime.tsx",
    lineNumber: 74,
    columnNumber: 5
  }, this);
}
_s(Anime, "5aQs6z1qQ4WTKAf9sTHOJBHL0As=", false, function() {
  return [useOptimizedContent];
});
_c = Anime;
var _c;
$RefreshReg$(_c, "Anime");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/Anime.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/Anime.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBd0NROzs7Ozs7Ozs7Ozs7Ozs7OztBQXhDUixTQUFnQkEsZ0JBQTJCO0FBQzNDLFNBQVNDLFFBQVFDLGdCQUFnQjtBQUNqQyxTQUFTQywyQkFBMkI7QUFDcEMsU0FBU0MsbUJBQW1CO0FBQzVCLFNBQVNDLGlCQUFpQjtBQUMxQixTQUFTQyxzQkFBc0I7QUFDL0IsU0FBU0Msb0JBQW9CO0FBS3RCLGdCQUFTQyxRQUFRO0FBQUFDLEtBQUE7QUFDdEIsUUFBTSxDQUFDQyxVQUFVQyxXQUFXLElBQUlYLFNBQXdCLFNBQVM7QUFFakUsUUFBTVksaUJBQWlCO0FBQUEsSUFDckJDLFNBQVM7QUFBQSxJQUNUQyxXQUFXO0FBQUEsRUFDYjtBQUVBLFFBQU1DLG1CQUFtQkEsQ0FBQ0MscUJBQW9DO0FBQzVELFlBQVFBLGtCQUFnQjtBQUFBLE1BQ3RCLEtBQUs7QUFDSCxlQUFPWixZQUFZYSxpQkFBaUJDLEtBQUtkLFdBQVc7QUFBQSxNQUN0RDtBQUNFLGVBQU9BLFlBQVllLDRCQUE0QkQsS0FBS2QsV0FBVztBQUFBLElBQ25FO0FBQUEsRUFDRjtBQUVBLFFBQU0sRUFBRWdCLE1BQU1DLFdBQVdDLFNBQVNDLE9BQU9DLFNBQVNDLFNBQVMsSUFBSXRCO0FBQUFBLElBQzdEWSxpQkFBaUJMLFFBQVE7QUFBQSxJQUN6QixDQUFDQSxRQUFRO0FBQUEsRUFDWDtBQUVBLFFBQU1nQix1QkFBdUJBLENBQUNDLGdCQUErQjtBQUMzRGhCLGdCQUFZZ0IsV0FBVztBQUFBLEVBQ3pCO0FBRUEsTUFBSUwsV0FBV0QsVUFBVU8sV0FBVyxHQUFHO0FBQ3JDLFdBQ0UsdUJBQUMsU0FBSSxXQUFVLDJCQUNiLGlDQUFDLG9CQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBZSxLQURqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRUE7QUFBQSxFQUVKO0FBRUEsTUFBSUwsU0FBU0YsVUFBVU8sV0FBVyxHQUFHO0FBQ25DLFdBQ0UsdUJBQUMsU0FBSSxXQUFVLDJCQUNiLGlDQUFDLGdCQUFhLFNBQVNMLFNBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBNkIsS0FEL0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUVBO0FBQUEsRUFFSjtBQUVBLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLDJCQUNiLGlDQUFDLFNBQUksV0FBVSwrQ0FFYjtBQUFBLDJCQUFDLFNBQUksV0FBVSxRQUNiO0FBQUEsNkJBQUMsU0FBSSxXQUFVLDBCQUNiO0FBQUEsK0JBQUMsWUFBUyxXQUFVLGdDQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWdEO0FBQUEsUUFDaEQsdUJBQUMsUUFBRyxXQUFVLG9DQUFrQztBQUFBO0FBQUEsVUFDdkNYLGVBQWVGLFFBQVE7QUFBQSxhQURoQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFLQTtBQUFBLE1BQ0EsdUJBQUMsT0FBRSxXQUFVLHNCQUFvQixzRkFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFHQSx1QkFBQyxTQUFJLFdBQVUsbURBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQSxpQ0FBQyxVQUFPLFdBQVUsZ0NBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQThDO0FBQUEsVUFDOUMsdUJBQUMsVUFBSyxXQUFVLHFDQUFvQywwQkFBcEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBOEQ7QUFBQSxhQUZoRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBR0E7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSwwQkFDWm1CLGlCQUFPQyxRQUFRbEIsY0FBYyxFQUFFbUI7QUFBQUEsVUFBSSxDQUFDLENBQUNDLEtBQUtDLEtBQUssTUFDOUM7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUVDLFNBQVMsTUFBTVAscUJBQXFCTSxHQUFvQjtBQUFBLGNBQ3hELFdBQVcsbUdBQ1R0QixhQUFhc0IsTUFDVCx5REFDQSwyRUFBMkU7QUFBQSxjQUdoRkM7QUFBQUE7QUFBQUEsWUFSSUQ7QUFBQUEsWUFEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBVUE7QUFBQSxRQUNELEtBYkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWNBO0FBQUEsV0FuQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQW9CQTtBQUFBLFNBaENGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FpQ0E7QUFBQSxJQUdBLHVCQUFDLFNBQUksV0FBVSwyRkFDWlgsb0JBQVVVO0FBQUFBLE1BQUksQ0FBQ0csVUFDZCx1QkFBQyxhQUEwQyxNQUFNQSxPQUFPLE1BQUssUUFBN0MsR0FBR0EsTUFBTUMsRUFBRSxJQUFJekIsUUFBUSxJQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWlFO0FBQUEsSUFDbEUsS0FISDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBSUE7QUFBQSxJQUdDYyxXQUNDLHVCQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxTQUFTQztBQUFBQSxRQUNULFVBQVVIO0FBQUFBLFFBQ1YsV0FBVTtBQUFBLFFBRVRBLG9CQUFVLGdCQUFnQjtBQUFBO0FBQUEsTUFMN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUEsS0FQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBUUE7QUFBQSxPQXRESjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBd0RBLEtBekRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0EwREE7QUFFSjtBQUFDYixHQXZHZUQsT0FBSztBQUFBLFVBaUI0Q0wsbUJBQW1CO0FBQUE7QUFBQWlDLEtBakJwRTVCO0FBQUssSUFBQTRCO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkZpbHRlciIsIlNwYXJrbGVzIiwidXNlT3B0aW1pemVkQ29udGVudCIsInRtZGJTZXJ2aWNlIiwiTW92aWVDYXJkIiwiTG9hZGluZ1NwaW5uZXIiLCJFcnJvck1lc3NhZ2UiLCJBbmltZSIsIl9zIiwiY2F0ZWdvcnkiLCJzZXRDYXRlZ29yeSIsImNhdGVnb3J5VGl0bGVzIiwicG9wdWxhciIsInRvcF9yYXRlZCIsImdldEZldGNoRnVuY3Rpb24iLCJzZWxlY3RlZENhdGVnb3J5IiwiZ2V0VG9wUmF0ZWRBbmltZSIsImJpbmQiLCJnZXRBbmltZUZyb21NdWx0aXBsZVNvdXJjZXMiLCJkYXRhIiwiYW5pbWVMaXN0IiwibG9hZGluZyIsImVycm9yIiwiaGFzTW9yZSIsImxvYWRNb3JlIiwiaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UiLCJuZXdDYXRlZ29yeSIsImxlbmd0aCIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJrZXkiLCJ0aXRsZSIsImFuaW1lIiwiaWQiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJBbmltZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBGaWx0ZXIsIFNwYXJrbGVzIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHVzZU9wdGltaXplZENvbnRlbnQgfSBmcm9tICcuLi9ob29rcy91c2VPcHRpbWl6ZWRDb250ZW50JztcbmltcG9ydCB7IHRtZGJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdG1kYic7XG5pbXBvcnQgeyBNb3ZpZUNhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL01vdmllQ2FyZCc7XG5pbXBvcnQgeyBMb2FkaW5nU3Bpbm5lciB9IGZyb20gJy4uL2NvbXBvbmVudHMvTG9hZGluZ1NwaW5uZXInO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9FcnJvck1lc3NhZ2UnO1xuaW1wb3J0IHR5cGUgeyBUVlNob3cgfSBmcm9tICcuLi90eXBlcy9tb3ZpZSc7XG5cbnR5cGUgQW5pbWVDYXRlZ29yeSA9ICdwb3B1bGFyJyB8ICd0b3BfcmF0ZWQnO1xuXG5leHBvcnQgZnVuY3Rpb24gQW5pbWUoKSB7XG4gIGNvbnN0IFtjYXRlZ29yeSwgc2V0Q2F0ZWdvcnldID0gdXNlU3RhdGU8QW5pbWVDYXRlZ29yeT4oJ3BvcHVsYXInKTtcblxuICBjb25zdCBjYXRlZ29yeVRpdGxlcyA9IHtcbiAgICBwb3B1bGFyOiAnUG9wdWxhcmVzJyxcbiAgICB0b3BfcmF0ZWQ6ICdNZWpvciBWYWxvcmFkb3MnXG4gIH07XG5cbiAgY29uc3QgZ2V0RmV0Y2hGdW5jdGlvbiA9IChzZWxlY3RlZENhdGVnb3J5OiBBbmltZUNhdGVnb3J5KSA9PiB7XG4gICAgc3dpdGNoIChzZWxlY3RlZENhdGVnb3J5KSB7XG4gICAgICBjYXNlICd0b3BfcmF0ZWQnOlxuICAgICAgICByZXR1cm4gdG1kYlNlcnZpY2UuZ2V0VG9wUmF0ZWRBbmltZS5iaW5kKHRtZGJTZXJ2aWNlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0bWRiU2VydmljZS5nZXRBbmltZUZyb21NdWx0aXBsZVNvdXJjZXMuYmluZCh0bWRiU2VydmljZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHsgZGF0YTogYW5pbWVMaXN0LCBsb2FkaW5nLCBlcnJvciwgaGFzTW9yZSwgbG9hZE1vcmUgfSA9IHVzZU9wdGltaXplZENvbnRlbnQoXG4gICAgZ2V0RmV0Y2hGdW5jdGlvbihjYXRlZ29yeSksXG4gICAgW2NhdGVnb3J5XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNhdGVnb3J5Q2hhbmdlID0gKG5ld0NhdGVnb3J5OiBBbmltZUNhdGVnb3J5KSA9PiB7XG4gICAgc2V0Q2F0ZWdvcnkobmV3Q2F0ZWdvcnkpO1xuICB9O1xuXG4gIGlmIChsb2FkaW5nICYmIGFuaW1lTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS01MFwiPlxuICAgICAgICA8TG9hZGluZ1NwaW5uZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoZXJyb3IgJiYgYW5pbWVMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICAgIDxFcnJvck1lc3NhZ2UgbWVzc2FnZT17ZXJyb3J9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHB5LThcIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi02XCI+XG4gICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwibXItMyBoLTggdy04IHRleHQtcGluay02MDBcIiAvPlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+XG4gICAgICAgICAgICAgIEFuaW1lIHtjYXRlZ29yeVRpdGxlc1tjYXRlZ29yeV19XG4gICAgICAgICAgICA8L2gxPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgbWItNlwiPlxuICAgICAgICAgICAgRGVzY3VicmUgbG9zIG1lam9yZXMgYW5pbWVzIGphcG9uZXNlcyBtw6FzIHBvcHVsYXJlcyB5IG1lam9yIHZhbG9yYWRvcy5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICB7LyogQ2F0ZWdvcnkgRmlsdGVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC1sZyBwLTMgc206cC00IHNoYWRvdy1zbSB3LWZ1bGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItM1wiPlxuICAgICAgICAgICAgICA8RmlsdGVyIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC1ncmF5LTUwMCBtci0yXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwXCI+Q2F0ZWdvcsOtYTo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoY2F0ZWdvcnlUaXRsZXMpLm1hcCgoW2tleSwgdGl0bGVdKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDYXRlZ29yeUNoYW5nZShrZXkgYXMgQW5pbWVDYXRlZ29yeSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHNtOnB4LTQgcHktMiBzbTpweS0zIHJvdW5kZWQtbGcgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSA9PT0ga2V5XG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcGluay02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgdHJhbnNmb3JtIHNjYWxlLTEwNSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtcGluay02MDAgaG92ZXI6YmctcGluay01MCBib3JkZXIgYm9yZGVyLWdyYXktMjAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3RpdGxlfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQW5pbWUgR3JpZCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy0zIGxnOmdyaWQtY29scy00IHhsOmdyaWQtY29scy01IGdhcC02IG1iLThcIj5cbiAgICAgICAgICB7YW5pbWVMaXN0Lm1hcCgoYW5pbWUpID0+IChcbiAgICAgICAgICAgIDxNb3ZpZUNhcmQga2V5PXtgJHthbmltZS5pZH0tJHtjYXRlZ29yeX1gfSBpdGVtPXthbmltZX0gdHlwZT1cInR2XCIgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExvYWQgTW9yZSBCdXR0b24gKi99XG4gICAgICAgIHtoYXNNb3JlICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2xvYWRNb3JlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctcGluay02MDAgaG92ZXI6YmctcGluay03MDAgZGlzYWJsZWQ6YmctcGluay00MDAgdGV4dC13aGl0ZSBweC04IHB5LTMgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsb2FkaW5nID8gJ0NhcmdhbmRvLi4uJyA6ICdDYXJnYXIgbcOhcyBhbmltZSd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJmaWxlIjoiL2hvbWUvcHJvamVjdC9zcmMvcGFnZXMvQW5pbWUudHN4In0=