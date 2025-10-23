import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Search.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/Search.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { useSearchParams } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { Search, Filter } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { tmdbService } from "/src/services/tmdb.ts";
import { useAdmin } from "/src/context/AdminContext.tsx";
import { performanceOptimizer } from "/src/utils/performance.ts";
import { MovieCard } from "/src/components/MovieCard.tsx";
import { NovelCard } from "/src/components/NovelCard.tsx";
import { LoadingSpinner } from "/src/components/LoadingSpinner.tsx";
import { ErrorMessage } from "/src/components/ErrorMessage.tsx";
export function SearchPage() {
  _s();
  const [searchParams] = useSearchParams();
  const { state: adminState } = useAdmin();
  const [results, setResults] = useState([]);
  const [novelResults, setNovelResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const query = searchParams.get("q") || "";
  const searchTypeLabels = {
    all: "Todo",
    movie: "Películas",
    tv: "Series"
  };
  const performSearch = async (searchQuery, type, pageNum, append = false) => {
    if (!searchQuery.trim()) return;
    try {
      if (!append) setLoading(true);
      const novelMatches = adminState.novels?.filter(
        (novel) => novel.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || novel.genero.toLowerCase().includes(searchQuery.toLowerCase()) || novel.pais && novel.pais.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      setNovelResults(novelMatches);
      let response;
      switch (type) {
        case "movie":
          response = await tmdbService.searchMovies(searchQuery, pageNum);
          break;
        case "tv":
          const [tvResponse, animeResponse] = await Promise.all(
            [
              tmdbService.searchTVShows(searchQuery, pageNum),
              tmdbService.searchAnime(searchQuery, pageNum)
            ]
          );
          const combinedResults = [...tvResponse.results, ...animeResponse.results];
          const uniqueResults = combinedResults.filter(
            (item, index, self2) => index === self2.findIndex((t) => t.id === item.id)
          );
          response = {
            ...tvResponse,
            results: uniqueResults,
            total_results: tvResponse.total_results + animeResponse.total_results
          };
          break;
        default:
          const [multiResponse, animeMultiResponse] = await Promise.all(
            [
              tmdbService.searchMulti(searchQuery, pageNum),
              tmdbService.searchAnime(searchQuery, pageNum)
            ]
          );
          const allResults = [...multiResponse.results, ...animeMultiResponse.results];
          const uniqueAllResults = tmdbService.removeDuplicates(allResults);
          response = {
            ...multiResponse,
            results: uniqueAllResults,
            total_results: multiResponse.total_results + animeMultiResponse.total_results
          };
      }
      const finalResults = tmdbService.removeDuplicates(response.results);
      if (append) {
        setResults((prev) => tmdbService.removeDuplicates([...prev, ...finalResults]));
      } else {
        setResults(finalResults);
        setTotalResults(response.total_results);
      }
      setHasMore(pageNum < response.total_pages);
      setError(null);
    } catch (err) {
      setError("Error en la búsqueda. Por favor, intenta de nuevo.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };
  const debouncedSearch = React.useMemo(
    () => performanceOptimizer.debounce(performSearch, 300),
    [performSearch]
  );
  useEffect(() => {
    if (query) {
      debouncedSearch(query, searchType, 1, false);
    }
  }, [query, searchType, debouncedSearch]);
  const handleTypeChange = (newType) => {
    setSearchType(newType);
  };
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(query, searchType, nextPage, true);
  };
  const getItemType = (item) => {
    return "title" in item ? "movie" : "tv";
  };
  if (!query) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxDEV(Search, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 160,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-semibold text-gray-900 mb-2", children: "Buscar contenido" }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600", children: "Usa la barra de búsqueda para encontrar películas, series y anime." }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 162,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Search.tsx",
      lineNumber: 159,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Search.tsx",
      lineNumber: 158,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-4", children: [
        /* @__PURE__ */ jsxDEV(Search, { className: "mr-3 h-8 w-8 text-blue-600" }, void 0, false, {
          fileName: "/home/project/src/pages/Search.tsx",
          lineNumber: 174,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-bold text-gray-900", children: [
          'Resultados para "',
          query,
          '"'
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Search.tsx",
          lineNumber: 175,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 173,
        columnNumber: 11
      }, this),
      !loading && totalResults > 0 && /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 mb-6", children: [
        "Se encontraron ",
        totalResults,
        " resultados"
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 181,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1 bg-white rounded-lg p-1 shadow-sm w-fit", children: [
        /* @__PURE__ */ jsxDEV(Filter, { className: "h-4 w-4 text-gray-500 ml-2" }, void 0, false, {
          fileName: "/home/project/src/pages/Search.tsx",
          lineNumber: 188,
          columnNumber: 13
        }, this),
        Object.entries(searchTypeLabels).map(
          ([key, label]) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleTypeChange(key),
              className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${searchType === key ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"}`,
              children: label
            },
            key,
            false,
            {
              fileName: "/home/project/src/pages/Search.tsx",
              lineNumber: 190,
              columnNumber: 13
            },
            this
          )
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 187,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Search.tsx",
      lineNumber: 172,
      columnNumber: 9
    }, this),
    loading && results.length === 0 && /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
      fileName: "/home/project/src/pages/Search.tsx",
      lineNumber: 206,
      columnNumber: 45
    }, this),
    error && results.length === 0 && /* @__PURE__ */ jsxDEV(ErrorMessage, { message: error }, void 0, false, {
      fileName: "/home/project/src/pages/Search.tsx",
      lineNumber: 209,
      columnNumber: 43
    }, this),
    !loading && !error && results.length === 0 && novelResults.length === 0 && query && /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxDEV(Search, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 214,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No se encontraron resultados" }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 215,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600", children: "Intenta con otros términos de búsqueda o explora nuestro catálogo de películas, series y novelas." }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 218,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Search.tsx",
      lineNumber: 213,
      columnNumber: 9
    }, this),
    (results.length > 0 || novelResults.length > 0) && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      novelResults.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-gray-900 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "mr-2", children: "📚" }, void 0, false, {
            fileName: "/home/project/src/pages/Search.tsx",
            lineNumber: 231,
            columnNumber: 19
          }, this),
          "Novelas (",
          novelResults.length,
          ")"
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Search.tsx",
          lineNumber: 230,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6", children: novelResults.map(
          (novel) => /* @__PURE__ */ jsxDEV(NovelCard, { novel }, `novel-${novel.id}`, false, {
            fileName: "/home/project/src/pages/Search.tsx",
            lineNumber: 236,
            columnNumber: 15
          }, this)
        ) }, void 0, false, {
          fileName: "/home/project/src/pages/Search.tsx",
          lineNumber: 234,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 229,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-gray-900 mb-4 flex items-center", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "mr-2", children: "🎬" }, void 0, false, {
          fileName: "/home/project/src/pages/Search.tsx",
          lineNumber: 245,
          columnNumber: 17
        }, this),
        "Películas y Series (",
        results.length,
        ")"
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 244,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 243,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8", children: results.map(
        (item) => /* @__PURE__ */ jsxDEV(
          MovieCard,
          {
            item,
            type: getItemType(item)
          },
          `${getItemType(item)}-${item.id}`,
          false,
          {
            fileName: "/home/project/src/pages/Search.tsx",
            lineNumber: 251,
            columnNumber: 13
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 249,
        columnNumber: 13
      }, this),
      hasMore && /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: loadMore,
          disabled: loading,
          className: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors",
          children: loading ? "Cargando..." : "Cargar más resultados"
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/pages/Search.tsx",
          lineNumber: 262,
          columnNumber: 17
        },
        this
      ) }, void 0, false, {
        fileName: "/home/project/src/pages/Search.tsx",
        lineNumber: 261,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Search.tsx",
      lineNumber: 226,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/Search.tsx",
    lineNumber: 170,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/pages/Search.tsx",
    lineNumber: 169,
    columnNumber: 5
  }, this);
}
_s(SearchPage, "zq5yLa3Psd6n3mQy/9o67sSoVoM=", false, function() {
  return [useSearchParams, useAdmin];
});
_c = SearchPage;
var _c;
$RefreshReg$(_c, "SearchPage");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/Search.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/Search.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFBQTtBQUFBLGFBS0E7QUFBQSxNQUNBLHVCQUFDLFNBQUksV0FBVSwyRkFDWjdFLGtCQUFRMEU7QUFBQUEsUUFBSSxDQUFDNUIsU0FDWjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBRUM7QUFBQSxZQUNBLE1BQU15QixZQUFZekIsSUFBSTtBQUFBO0FBQUEsVUFGakIsR0FBR3lCLFlBQVl6QixJQUFJLENBQUMsSUFBSUEsS0FBS0ssRUFBRTtBQUFBLFVBRHRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFHMEI7QUFBQSxNQUUzQixLQVBIO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFRQTtBQUFBLE1BR0N2QyxXQUNDLHVCQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxTQUFTeUQ7QUFBQUEsVUFDVCxVQUFVakU7QUFBQUEsVUFDVixXQUFVO0FBQUEsVUFFVEEsb0JBQVUsZ0JBQWdCO0FBQUE7QUFBQSxRQUw3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNQSxLQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFRQTtBQUFBLFNBM0NKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0E2Q0E7QUFBQSxPQXJHSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBdUdBLEtBeEdGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F5R0E7QUFFSjtBQUFDUixHQWxQZUQsWUFBVTtBQUFBLFVBQ0RWLGlCQUNPSSxRQUFRO0FBQUE7QUFBQXlGLEtBRnhCbkY7QUFBVSxJQUFBbUY7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VTZWFyY2hQYXJhbXMiLCJTZWFyY2giLCJGaWx0ZXIiLCJ0bWRiU2VydmljZSIsInVzZUFkbWluIiwicGVyZm9ybWFuY2VPcHRpbWl6ZXIiLCJNb3ZpZUNhcmQiLCJOb3ZlbENhcmQiLCJMb2FkaW5nU3Bpbm5lciIsIkVycm9yTWVzc2FnZSIsIlNlYXJjaFBhZ2UiLCJfcyIsInNlYXJjaFBhcmFtcyIsInN0YXRlIiwiYWRtaW5TdGF0ZSIsInJlc3VsdHMiLCJzZXRSZXN1bHRzIiwibm92ZWxSZXN1bHRzIiwic2V0Tm92ZWxSZXN1bHRzIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwic2VhcmNoVHlwZSIsInNldFNlYXJjaFR5cGUiLCJwYWdlIiwic2V0UGFnZSIsImhhc01vcmUiLCJzZXRIYXNNb3JlIiwidG90YWxSZXN1bHRzIiwic2V0VG90YWxSZXN1bHRzIiwicXVlcnkiLCJnZXQiLCJzZWFyY2hUeXBlTGFiZWxzIiwiYWxsIiwibW92aWUiLCJ0diIsInBlcmZvcm1TZWFyY2giLCJzZWFyY2hRdWVyeSIsInR5cGUiLCJwYWdlTnVtIiwiYXBwZW5kIiwidHJpbSIsIm5vdmVsTWF0Y2hlcyIsIm5vdmVscyIsImZpbHRlciIsIm5vdmVsIiwidGl0dWxvIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsImdlbmVybyIsInBhaXMiLCJyZXNwb25zZSIsInNlYXJjaE1vdmllcyIsInR2UmVzcG9uc2UiLCJhbmltZVJlc3BvbnNlIiwiUHJvbWlzZSIsInNlYXJjaFRWU2hvd3MiLCJzZWFyY2hBbmltZSIsImNvbWJpbmVkUmVzdWx0cyIsInVuaXF1ZVJlc3VsdHMiLCJpdGVtIiwiaW5kZXgiLCJzZWxmIiwiZmluZEluZGV4IiwidCIsImlkIiwidG90YWxfcmVzdWx0cyIsIm11bHRpUmVzcG9uc2UiLCJhbmltZU11bHRpUmVzcG9uc2UiLCJzZWFyY2hNdWx0aSIsImFsbFJlc3VsdHMiLCJ1bmlxdWVBbGxSZXN1bHRzIiwicmVtb3ZlRHVwbGljYXRlcyIsImZpbmFsUmVzdWx0cyIsInByZXYiLCJ0b3RhbF9wYWdlcyIsImVyciIsImNvbnNvbGUiLCJkZWJvdW5jZWRTZWFyY2giLCJ1c2VNZW1vIiwiZGVib3VuY2UiLCJoYW5kbGVUeXBlQ2hhbmdlIiwibmV3VHlwZSIsImxvYWRNb3JlIiwibmV4dFBhZ2UiLCJnZXRJdGVtVHlwZSIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJrZXkiLCJsYWJlbCIsImxlbmd0aCIsIl9jIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlNlYXJjaC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IFNlYXJjaCwgRmlsdGVyIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHRtZGJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdG1kYic7XG5pbXBvcnQgeyB1c2VBZG1pbiB9IGZyb20gJy4uL2NvbnRleHQvQWRtaW5Db250ZXh0JztcbmltcG9ydCB7IHBlcmZvcm1hbmNlT3B0aW1pemVyIH0gZnJvbSAnLi4vdXRpbHMvcGVyZm9ybWFuY2UnO1xuaW1wb3J0IHsgTW92aWVDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Nb3ZpZUNhcmQnO1xuaW1wb3J0IHsgTm92ZWxDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ob3ZlbENhcmQnO1xuaW1wb3J0IHsgTG9hZGluZ1NwaW5uZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL0xvYWRpbmdTcGlubmVyJztcbmltcG9ydCB7IEVycm9yTWVzc2FnZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JNZXNzYWdlJztcbmltcG9ydCB0eXBlIHsgTW92aWUsIFRWU2hvdyB9IGZyb20gJy4uL3R5cGVzL21vdmllJztcblxudHlwZSBTZWFyY2hUeXBlID0gJ2FsbCcgfCAnbW92aWUnIHwgJ3R2JztcblxuZXhwb3J0IGZ1bmN0aW9uIFNlYXJjaFBhZ2UoKSB7XG4gIGNvbnN0IFtzZWFyY2hQYXJhbXNdID0gdXNlU2VhcmNoUGFyYW1zKCk7XG4gIGNvbnN0IHsgc3RhdGU6IGFkbWluU3RhdGUgfSA9IHVzZUFkbWluKCk7XG4gIGNvbnN0IFtyZXN1bHRzLCBzZXRSZXN1bHRzXSA9IHVzZVN0YXRlPChNb3ZpZSB8IFRWU2hvdylbXT4oW10pO1xuICBjb25zdCBbbm92ZWxSZXN1bHRzLCBzZXROb3ZlbFJlc3VsdHNdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VhcmNoVHlwZSwgc2V0U2VhcmNoVHlwZV0gPSB1c2VTdGF0ZTxTZWFyY2hUeXBlPignYWxsJyk7XG4gIGNvbnN0IFtwYWdlLCBzZXRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3RvdGFsUmVzdWx0cywgc2V0VG90YWxSZXN1bHRzXSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IHF1ZXJ5ID0gc2VhcmNoUGFyYW1zLmdldCgncScpIHx8ICcnO1xuXG4gIGNvbnN0IHNlYXJjaFR5cGVMYWJlbHMgPSB7XG4gICAgYWxsOiAnVG9kbycsXG4gICAgbW92aWU6ICdQZWzDrWN1bGFzJyxcbiAgICB0djogJ1NlcmllcydcbiAgfTtcblxuICBjb25zdCBwZXJmb3JtU2VhcmNoID0gYXN5bmMgKHNlYXJjaFF1ZXJ5OiBzdHJpbmcsIHR5cGU6IFNlYXJjaFR5cGUsIHBhZ2VOdW06IG51bWJlciwgYXBwZW5kOiBib29sZWFuID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIXNlYXJjaFF1ZXJ5LnRyaW0oKSkgcmV0dXJuO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmICghYXBwZW5kKSBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgXG4gICAgICAvLyBTZWFyY2ggbm92ZWxzIGZpcnN0XG4gICAgICBjb25zdCBub3ZlbE1hdGNoZXMgPSBhZG1pblN0YXRlLm5vdmVscz8uZmlsdGVyKG5vdmVsID0+XG4gICAgICAgIG5vdmVsLnRpdHVsby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgIG5vdmVsLmdlbmVyby50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgIChub3ZlbC5wYWlzICYmIG5vdmVsLnBhaXMudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICkgfHwgW107XG4gICAgICBcbiAgICAgIHNldE5vdmVsUmVzdWx0cyhub3ZlbE1hdGNoZXMpO1xuICAgICAgXG4gICAgICBsZXQgcmVzcG9uc2U7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnbW92aWUnOlxuICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdG1kYlNlcnZpY2Uuc2VhcmNoTW92aWVzKHNlYXJjaFF1ZXJ5LCBwYWdlTnVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndHYnOlxuICAgICAgICAgIC8vIEJ1c2NhciB0YW50byBzZXJpZXMgbm9ybWFsZXMgY29tbyBhbmltZVxuICAgICAgICAgIGNvbnN0IFt0dlJlc3BvbnNlLCBhbmltZVJlc3BvbnNlXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRtZGJTZXJ2aWNlLnNlYXJjaFRWU2hvd3Moc2VhcmNoUXVlcnksIHBhZ2VOdW0pLFxuICAgICAgICAgICAgdG1kYlNlcnZpY2Uuc2VhcmNoQW5pbWUoc2VhcmNoUXVlcnksIHBhZ2VOdW0pXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gQ29tYmluYXIgcmVzdWx0YWRvcyB5IGVsaW1pbmFyIGR1cGxpY2Fkb3NcbiAgICAgICAgICBjb25zdCBjb21iaW5lZFJlc3VsdHMgPSBbLi4udHZSZXNwb25zZS5yZXN1bHRzLCAuLi5hbmltZVJlc3BvbnNlLnJlc3VsdHNdO1xuICAgICAgICAgIGNvbnN0IHVuaXF1ZVJlc3VsdHMgPSBjb21iaW5lZFJlc3VsdHMuZmlsdGVyKChpdGVtLCBpbmRleCwgc2VsZikgPT4gXG4gICAgICAgICAgICBpbmRleCA9PT0gc2VsZi5maW5kSW5kZXgodCA9PiB0LmlkID09PSBpdGVtLmlkKVxuICAgICAgICAgICk7XG4gICAgICAgICAgXG4gICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAuLi50dlJlc3BvbnNlLFxuICAgICAgICAgICAgcmVzdWx0czogdW5pcXVlUmVzdWx0cyxcbiAgICAgICAgICAgIHRvdGFsX3Jlc3VsdHM6IHR2UmVzcG9uc2UudG90YWxfcmVzdWx0cyArIGFuaW1lUmVzcG9uc2UudG90YWxfcmVzdWx0c1xuICAgICAgICAgIH07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gUGFyYSBiw7pzcXVlZGEgZ2VuZXJhbCwgaW5jbHVpciBhbmltZSB0YW1iacOpblxuICAgICAgICAgIGNvbnN0IFttdWx0aVJlc3BvbnNlLCBhbmltZU11bHRpUmVzcG9uc2VdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdG1kYlNlcnZpY2Uuc2VhcmNoTXVsdGkoc2VhcmNoUXVlcnksIHBhZ2VOdW0pLFxuICAgICAgICAgICAgdG1kYlNlcnZpY2Uuc2VhcmNoQW5pbWUoc2VhcmNoUXVlcnksIHBhZ2VOdW0pXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgYWxsUmVzdWx0cyA9IFsuLi5tdWx0aVJlc3BvbnNlLnJlc3VsdHMsIC4uLmFuaW1lTXVsdGlSZXNwb25zZS5yZXN1bHRzXTtcbiAgICAgICAgICBjb25zdCB1bmlxdWVBbGxSZXN1bHRzID0gdG1kYlNlcnZpY2UucmVtb3ZlRHVwbGljYXRlcyhhbGxSZXN1bHRzKTtcbiAgICAgICAgICBcbiAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgIC4uLm11bHRpUmVzcG9uc2UsXG4gICAgICAgICAgICByZXN1bHRzOiB1bmlxdWVBbGxSZXN1bHRzLFxuICAgICAgICAgICAgdG90YWxfcmVzdWx0czogbXVsdGlSZXNwb25zZS50b3RhbF9yZXN1bHRzICsgYW5pbWVNdWx0aVJlc3BvbnNlLnRvdGFsX3Jlc3VsdHNcbiAgICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBFbnN1cmUgbm8gZHVwbGljYXRlcyBpbiBmaW5hbCByZXN1bHRzXG4gICAgICBjb25zdCBmaW5hbFJlc3VsdHMgPSB0bWRiU2VydmljZS5yZW1vdmVEdXBsaWNhdGVzKHJlc3BvbnNlLnJlc3VsdHMpO1xuXG4gICAgICBpZiAoYXBwZW5kKSB7XG4gICAgICAgIHNldFJlc3VsdHMocHJldiA9PiB0bWRiU2VydmljZS5yZW1vdmVEdXBsaWNhdGVzKFsuLi5wcmV2LCAuLi5maW5hbFJlc3VsdHNdKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRSZXN1bHRzKGZpbmFsUmVzdWx0cyk7XG4gICAgICAgIHNldFRvdGFsUmVzdWx0cyhyZXNwb25zZS50b3RhbF9yZXN1bHRzKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgc2V0SGFzTW9yZShwYWdlTnVtIDwgcmVzcG9uc2UudG90YWxfcGFnZXMpO1xuICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcignRXJyb3IgZW4gbGEgYsO6c3F1ZWRhLiBQb3IgZmF2b3IsIGludGVudGEgZGUgbnVldm8uJyk7XG4gICAgICBjb25zb2xlLmVycm9yKCdTZWFyY2ggZXJyb3I6JywgZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIERlYm91bmNlZCBzZWFyY2ggZnVuY3Rpb25cbiAgY29uc3QgZGVib3VuY2VkU2VhcmNoID0gUmVhY3QudXNlTWVtbyhcbiAgICAoKSA9PiBwZXJmb3JtYW5jZU9wdGltaXplci5kZWJvdW5jZShwZXJmb3JtU2VhcmNoLCAzMDApLFxuICAgIFtwZXJmb3JtU2VhcmNoXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHF1ZXJ5KSB7XG4gICAgICBkZWJvdW5jZWRTZWFyY2gocXVlcnksIHNlYXJjaFR5cGUsIDEsIGZhbHNlKTtcbiAgICB9XG4gIH0sIFtxdWVyeSwgc2VhcmNoVHlwZSwgZGVib3VuY2VkU2VhcmNoXSk7XG5cbiAgY29uc3QgaGFuZGxlVHlwZUNoYW5nZSA9IChuZXdUeXBlOiBTZWFyY2hUeXBlKSA9PiB7XG4gICAgc2V0U2VhcmNoVHlwZShuZXdUeXBlKTtcbiAgfTtcblxuICBjb25zdCBsb2FkTW9yZSA9ICgpID0+IHtcbiAgICBjb25zdCBuZXh0UGFnZSA9IHBhZ2UgKyAxO1xuICAgIHNldFBhZ2UobmV4dFBhZ2UpO1xuICAgIHBlcmZvcm1TZWFyY2gocXVlcnksIHNlYXJjaFR5cGUsIG5leHRQYWdlLCB0cnVlKTtcbiAgfTtcblxuICBjb25zdCBnZXRJdGVtVHlwZSA9IChpdGVtOiBNb3ZpZSB8IFRWU2hvdyk6ICdtb3ZpZScgfCAndHYnID0+IHtcbiAgICByZXR1cm4gJ3RpdGxlJyBpbiBpdGVtID8gJ21vdmllJyA6ICd0dic7XG4gIH07XG5cbiAgaWYgKCFxdWVyeSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cImgtMTYgdy0xNiB0ZXh0LWdyYXktNDAwIG14LWF1dG8gbWItNFwiIC8+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCI+QnVzY2FyIGNvbnRlbmlkbzwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPlVzYSBsYSBiYXJyYSBkZSBiw7pzcXVlZGEgcGFyYSBlbmNvbnRyYXIgcGVsw61jdWxhcywgc2VyaWVzIHkgYW5pbWUuPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktOFwiPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLThcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTRcIj5cbiAgICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwibXItMyBoLTggdy04IHRleHQtYmx1ZS02MDBcIiAvPlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+XG4gICAgICAgICAgICAgIFJlc3VsdGFkb3MgcGFyYSBcIntxdWVyeX1cIlxuICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICB7IWxvYWRpbmcgJiYgdG90YWxSZXN1bHRzID4gMCAmJiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLTZcIj5cbiAgICAgICAgICAgICAgU2UgZW5jb250cmFyb24ge3RvdGFsUmVzdWx0c30gcmVzdWx0YWRvc1xuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogU2VhcmNoIFR5cGUgRmlsdGVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xIGJnLXdoaXRlIHJvdW5kZWQtbGcgcC0xIHNoYWRvdy1zbSB3LWZpdFwiPlxuICAgICAgICAgICAgPEZpbHRlciBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtZ3JheS01MDAgbWwtMlwiIC8+XG4gICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoc2VhcmNoVHlwZUxhYmVscykubWFwKChba2V5LCBsYWJlbF0pID0+IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVR5cGVDaGFuZ2Uoa2V5IGFzIFNlYXJjaFR5cGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLW1kIHRleHQtc20gZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgIHNlYXJjaFR5cGUgPT09IGtleVxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtYmx1ZS02MDAgaG92ZXI6YmctYmx1ZS01MCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExvYWRpbmcgU3RhdGUgKi99XG4gICAgICAgIHtsb2FkaW5nICYmIHJlc3VsdHMubGVuZ3RoID09PSAwICYmIDxMb2FkaW5nU3Bpbm5lciAvPn1cblxuICAgICAgICB7LyogRXJyb3IgU3RhdGUgKi99XG4gICAgICAgIHtlcnJvciAmJiByZXN1bHRzLmxlbmd0aCA9PT0gMCAmJiA8RXJyb3JNZXNzYWdlIG1lc3NhZ2U9e2Vycm9yfSAvPn1cblxuICAgICAgICB7LyogTm8gUmVzdWx0cyAqL31cbiAgICAgICAgeyFsb2FkaW5nICYmICFlcnJvciAmJiByZXN1bHRzLmxlbmd0aCA9PT0gMCAmJiBub3ZlbFJlc3VsdHMubGVuZ3RoID09PSAwICYmIHF1ZXJ5ICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTEyXCI+XG4gICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cImgtMTYgdy0xNiB0ZXh0LWdyYXktNDAwIG14LWF1dG8gbWItNFwiIC8+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgbWItMlwiPlxuICAgICAgICAgICAgICBObyBzZSBlbmNvbnRyYXJvbiByZXN1bHRhZG9zXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgICAgICBJbnRlbnRhIGNvbiBvdHJvcyB0w6lybWlub3MgZGUgYsO6c3F1ZWRhIG8gZXhwbG9yYSBudWVzdHJvIGNhdMOhbG9nbyBkZSBwZWzDrWN1bGFzLCBzZXJpZXMgeSBub3ZlbGFzLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBSZXN1bHRzIEdyaWQgKi99XG4gICAgICAgIHsocmVzdWx0cy5sZW5ndGggPiAwIHx8IG5vdmVsUmVzdWx0cy5sZW5ndGggPiAwKSAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIHsvKiBOb3ZlbCBSZXN1bHRzICovfVxuICAgICAgICAgICAge25vdmVsUmVzdWx0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNCBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItMlwiPvCfk5o8L3NwYW4+XG4gICAgICAgICAgICAgICAgICBOb3ZlbGFzICh7bm92ZWxSZXN1bHRzLmxlbmd0aH0pXG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbWQ6Z3JpZC1jb2xzLTMgbGc6Z3JpZC1jb2xzLTQgeGw6Z3JpZC1jb2xzLTUgZ2FwLTYgbWItNlwiPlxuICAgICAgICAgICAgICAgICAge25vdmVsUmVzdWx0cy5tYXAoKG5vdmVsKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxOb3ZlbENhcmQga2V5PXtgbm92ZWwtJHtub3ZlbC5pZH1gfSBub3ZlbD17bm92ZWx9IC8+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogTW92aWVzIGFuZCBUViBTaG93cyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00IGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItMlwiPvCfjqw8L3NwYW4+XG4gICAgICAgICAgICAgICAgUGVsw61jdWxhcyB5IFNlcmllcyAoe3Jlc3VsdHMubGVuZ3RofSlcbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy0zIGxnOmdyaWQtY29scy00IHhsOmdyaWQtY29scy01IGdhcC02IG1iLThcIj5cbiAgICAgICAgICAgICAge3Jlc3VsdHMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPE1vdmllQ2FyZFxuICAgICAgICAgICAgICAgICAga2V5PXtgJHtnZXRJdGVtVHlwZShpdGVtKX0tJHtpdGVtLmlkfWB9XG4gICAgICAgICAgICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICAgICAgICAgICAgdHlwZT17Z2V0SXRlbVR5cGUoaXRlbSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIExvYWQgTW9yZSBCdXR0b24gKi99XG4gICAgICAgICAgICB7aGFzTW9yZSAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtsb2FkTW9yZX1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctYmx1ZS02MDAgaG92ZXI6YmctYmx1ZS03MDAgZGlzYWJsZWQ6YmctYmx1ZS00MDAgdGV4dC13aGl0ZSBweC04IHB5LTMgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2xvYWRpbmcgPyAnQ2FyZ2FuZG8uLi4nIDogJ0NhcmdhciBtw6FzIHJlc3VsdGFkb3MnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL3BhZ2VzL1NlYXJjaC50c3gifQ==