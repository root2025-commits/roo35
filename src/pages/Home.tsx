import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Home.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/Home.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { Link } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { ChevronRight, Monitor, Filter, Calendar, Clock, Flame, Library, Clapperboard, Sparkles, Radio, CheckCircle2 } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { tmdbService } from "/src/services/tmdb.ts";
import { useCart } from "/src/context/CartContext.tsx";
import { useAdmin } from "/src/context/AdminContext.tsx";
import { MovieCard } from "/src/components/MovieCard.tsx";
import { HeroCarousel } from "/src/components/HeroCarousel.tsx";
import { LoadingSpinner } from "/src/components/LoadingSpinner.tsx";
import { ErrorMessage } from "/src/components/ErrorMessage.tsx";
import { NovelasModal } from "/src/components/NovelasModal.tsx";
import { NetflixSection } from "/src/components/NetflixSection.tsx";
import { NetflixNovelSection } from "/src/components/NetflixNovelSection.tsx";
import { FloatingNav } from "/src/components/FloatingNav.tsx";
export function Home() {
  _s();
  const { state: adminState, addNotification } = useAdmin();
  const { getCurrentPrices } = useCart();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [novelTrendingContent, setNovelTrendingContent] = useState([]);
  const [heroItems, setHeroItems] = useState([]);
  const [trendingTimeWindow, setTrendingTimeWindow] = useState("day");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(/* @__PURE__ */ new Date());
  const [showNovelasModal, setShowNovelasModal] = useState(false);
  const currentPrices = getCurrentPrices();
  const timeWindowLabels = {
    day: "Hoy + Novelas en Transmisión",
    week: "Esta Semana + Novelas Finalizadas"
  };
  const fetchTrendingContent = async (timeWindow) => {
    try {
      const response = await tmdbService.getTrendingAll(timeWindow, 1);
      const uniqueContent = tmdbService.removeDuplicates(response.results);
      setTrendingContent(uniqueContent.slice(0, 12));
      const novelTrending = getNovelTrendingContent(timeWindow);
      setNovelTrendingContent(novelTrending);
      setLastUpdate(/* @__PURE__ */ new Date());
    } catch (err) {
      console.error("Error fetching trending content:", err);
    }
  };
  const getNovelTrendingContent = (timeWindow) => {
    const novels = adminState.novels || [];
    if (timeWindow === "day") {
      return novels.filter((novel) => novel.estado === "transmision").slice(0, 12);
    } else {
      return novels.filter((novel) => novel.estado === "finalizada").slice(0, 10);
    }
  };
  const fetchAllContent = async () => {
    try {
      setLoading(true);
      const heroKeys = Object.keys(localStorage).filter(
        (key) => key.includes("trending") || key.includes("fresh_")
      );
      heroKeys.forEach((key) => localStorage.removeItem(key));
      const heroContent = await tmdbService.getHeroContent();
      setHeroItems(heroContent);
      const trendingResponse = await tmdbService.getTrendingAll(trendingTimeWindow, 1);
      const uniqueTrending = tmdbService.removeDuplicates(trendingResponse.results);
      setTrendingContent(uniqueTrending.slice(0, 12));
      const usedIds = /* @__PURE__ */ new Set(
        [
          ...heroContent.map((item) => item.id),
          ...uniqueTrending.slice(0, 12).map((item) => item.id)
        ]
      );
      const [moviesRes, tvRes, animeRes, nowPlayingRes, airingTodayRes] = await Promise.all(
        [
          tmdbService.getPopularMovies(1),
          tmdbService.getPopularTVShows(1),
          tmdbService.getAnimeFromMultipleSources(1),
          tmdbService.getNowPlayingMovies(1),
          tmdbService.getAiringTodayTVShows(1)
        ]
      );
      const allMovies = [
        ...nowPlayingRes.results,
        ...moviesRes.results.filter((movie) => !nowPlayingRes.results.some((np) => np.id === movie.id))
      ];
      const allTVShows = [
        ...airingTodayRes.results,
        ...tvRes.results.filter((show) => !airingTodayRes.results.some((at) => at.id === show.id))
      ];
      const filteredMovies = allMovies.filter((movie) => !usedIds.has(movie.id)).slice(0, 8);
      const filteredTVShows = allTVShows.filter((show) => !usedIds.has(show.id)).slice(0, 8);
      const filteredAnime = animeRes.results.filter((anime) => !usedIds.has(anime.id)).slice(0, 8);
      setPopularMovies(filteredMovies);
      setPopularTVShows(filteredTVShows);
      setPopularAnime(filteredAnime);
      setLastUpdate(/* @__PURE__ */ new Date());
    } catch (err) {
      setError("Error al cargar el contenido. Por favor, intenta de nuevo.");
      console.error("Error fetching home data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllContent();
  }, []);
  useEffect(() => {
    fetchTrendingContent(trendingTimeWindow);
  }, [trendingTimeWindow]);
  useEffect(() => {
    const now = /* @__PURE__ */ new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    const midnightTimeout = setTimeout(() => {
      fetchAllContent();
      const dailyInterval = setInterval(() => {
        fetchAllContent();
      }, 24 * 60 * 60 * 1e3);
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);
    const weeklyInterval = setInterval(() => {
      const currentDay = (/* @__PURE__ */ new Date()).getDay();
      if (currentDay === 0) {
        fetchAllContent();
      }
    }, 24 * 60 * 60 * 1e3);
    return () => {
      clearTimeout(midnightTimeout);
      clearInterval(weeklyInterval);
    };
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
      fileName: "/home/project/src/pages/Home.tsx",
      lineNumber: 191,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Home.tsx",
      lineNumber: 190,
      columnNumber: 7
    }, this);
  }
  if (error) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(ErrorMessage, { message: error }, void 0, false, {
      fileName: "/home/project/src/pages/Home.tsx",
      lineNumber: 199,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Home.tsx",
      lineNumber: 198,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxDEV(HeroCarousel, { items: heroItems }, void 0, false, {
      fileName: "/home/project/src/pages/Home.tsx",
      lineNumber: 207,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "bg-gradient-to-r from-blue-900 via-purple-900 to-pink-800 text-white py-16", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl md:text-5xl font-bold mb-6", children: [
        "Descubre el Mundo del",
        /* @__PURE__ */ jsxDEV("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400", children: [
          " ",
          "Entretenimiento"
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 214,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 212,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90", children: "Explora miles de películas, animes, series ilimitadas y mucho más. Encuentra tus favoritos y agrégalos a tu carrito." }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 218,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/movies",
            className: "bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center",
            children: [
              /* @__PURE__ */ jsxDEV(Clapperboard, { className: "mr-2 h-5 w-5" }, void 0, false, {
                fileName: "/home/project/src/pages/Home.tsx",
                lineNumber: 226,
                columnNumber: 15
              }, this),
              "Explorar Películas"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 222,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/tv",
            className: "bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center",
            children: [
              /* @__PURE__ */ jsxDEV(Monitor, { className: "mr-2 h-5 w-5" }, void 0, false, {
                fileName: "/home/project/src/pages/Home.tsx",
                lineNumber: 233,
                columnNumber: 15
              }, this),
              "Ver Series"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 229,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setShowNovelasModal(true),
            className: "bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center",
            children: [
              /* @__PURE__ */ jsxDEV(Library, { className: "mr-2 h-5 w-5" }, void 0, false, {
                fileName: "/home/project/src/pages/Home.tsx",
                lineNumber: 240,
                columnNumber: 15
              }, this),
              "Catálogo de Novelas"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 236,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 221,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Home.tsx",
      lineNumber: 211,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Home.tsx",
      lineNumber: 210,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
      /* @__PURE__ */ jsxDEV("section", { id: "section-trending", className: "mb-12", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-gray-900 flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Flame, { className: "mr-2 h-6 w-6 text-red-500" }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 252,
              columnNumber: 15
            }, this),
            "En Tendencia"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 251,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200", children: [
            /* @__PURE__ */ jsxDEV(Filter, { className: "h-4 w-4 text-gray-500 ml-2" }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 258,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-medium text-gray-700 px-2", children: "Período:" }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 259,
              columnNumber: 15
            }, this),
            Object.entries(timeWindowLabels).map(
              ([key, label]) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setTrendingTimeWindow(key),
                  className: `px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center ${trendingTimeWindow === key ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md transform scale-105" : "text-gray-600 hover:text-red-600 hover:bg-red-50"}`,
                  children: [
                    key === "day" ? /* @__PURE__ */ jsxDEV(Calendar, { className: "h-3 w-3 mr-1" }, void 0, false, {
                      fileName: "/home/project/src/pages/Home.tsx",
                      lineNumber: 270,
                      columnNumber: 36
                    }, this) : /* @__PURE__ */ jsxDEV(Clock, { className: "h-3 w-3 mr-1" }, void 0, false, {
                      fileName: "/home/project/src/pages/Home.tsx",
                      lineNumber: 270,
                      columnNumber: 76
                    }, this),
                    label
                  ]
                },
                key,
                true,
                {
                  fileName: "/home/project/src/pages/Home.tsx",
                  lineNumber: 261,
                  columnNumber: 15
                },
                this
              )
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 257,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 250,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          NetflixSection,
          {
            title: "",
            showViewAll: false,
            children: trendingContent.map((item) => {
              const itemType = "title" in item ? "movie" : "tv";
              return /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 w-64", children: /* @__PURE__ */ jsxDEV(MovieCard, { item, type: itemType }, void 0, false, {
                fileName: "/home/project/src/pages/Home.tsx",
                lineNumber: 286,
                columnNumber: 19
              }, this) }, `trending-${itemType}-${item.id}`, false, {
                fileName: "/home/project/src/pages/Home.tsx",
                lineNumber: 285,
                columnNumber: 17
              }, this);
            })
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 278,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 249,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { id: "section-novelas-transmision", className: "mb-12", children: adminState.novels && adminState.novels.length > 0 ? /* @__PURE__ */ jsxDEV(Fragment, { children: adminState.novels.filter((novel) => novel.estado === "transmision").length > 0 ? /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-gray-900 flex items-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-xl shadow-lg mr-3", children: /* @__PURE__ */ jsxDEV(Radio, { className: "h-5 w-5 text-white" }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 304,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 303,
              columnNumber: 23
            }, this),
            "Novelas en Transmisión"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 302,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setShowNovelasModal(true),
              className: "text-red-600 hover:text-red-700 font-medium flex items-center transition-colors",
              children: [
                "Ver todas",
                /* @__PURE__ */ jsxDEV(ChevronRight, { className: "h-5 w-5 ml-1" }, void 0, false, {
                  fileName: "/home/project/src/pages/Home.tsx",
                  lineNumber: 313,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 308,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 301,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(
          NetflixNovelSection,
          {
            novels: adminState.novels.filter((novel) => novel.estado === "transmision").sort((a, b) => {
              const dateA = new Date(a.createdAt || 0).getTime();
              const dateB = new Date(b.createdAt || 0).getTime();
              return dateB - dateA;
            })
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 316,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 300,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "bg-red-50 border border-red-200 rounded-xl p-8 text-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-red-100 p-4 rounded-full w-fit mx-auto mb-4", children: /* @__PURE__ */ jsxDEV(Radio, { className: "h-8 w-8 text-red-500" }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 329,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 328,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-red-800 mb-2", children: "No hay novelas en transmisión" }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 331,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-red-600 mb-4", children: "Actualmente no hay novelas siendo transmitidas." }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 334,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setShowNovelasModal(true),
            className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors",
            children: "Ver catálogo completo"
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 337,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 327,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 298,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 border border-gray-200 rounded-xl p-8 text-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-100 p-4 rounded-full w-fit mx-auto mb-4", children: /* @__PURE__ */ jsxDEV(Library, { className: "h-8 w-8 text-gray-400" }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 349,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 348,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-gray-800 mb-2", children: "Catálogo de novelas no disponible" }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 351,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600", children: "No se pudo cargar el catálogo de novelas." }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 354,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 347,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 295,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { id: "section-novelas-finalizadas", className: "mb-12", children: adminState.novels && adminState.novels.length > 0 ? /* @__PURE__ */ jsxDEV(Fragment, { children: adminState.novels.filter((novel) => novel.estado === "finalizada").length > 0 ? /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-gray-900 flex items-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl shadow-lg mr-3", children: /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "h-5 w-5 text-white" }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 371,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 370,
              columnNumber: 23
            }, this),
            "Novelas Finalizadas"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 369,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setShowNovelasModal(true),
              className: "text-green-600 hover:text-green-700 font-medium flex items-center transition-colors",
              children: [
                "Ver todas",
                /* @__PURE__ */ jsxDEV(ChevronRight, { className: "h-5 w-5 ml-1" }, void 0, false, {
                  fileName: "/home/project/src/pages/Home.tsx",
                  lineNumber: 380,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 375,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 368,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(
          NetflixNovelSection,
          {
            novels: adminState.novels.filter((novel) => novel.estado === "finalizada").sort((a, b) => {
              const dateA = new Date(a.createdAt || 0).getTime();
              const dateB = new Date(b.createdAt || 0).getTime();
              return dateB - dateA;
            })
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 383,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 367,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "bg-green-50 border border-green-200 rounded-xl p-8 text-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-green-100 p-4 rounded-full w-fit mx-auto mb-4", children: /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "h-8 w-8 text-green-500" }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 396,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 395,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-green-800 mb-2", children: "No hay novelas finalizadas" }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 398,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-green-600 mb-4", children: "Actualmente no hay novelas finalizadas en el catálogo." }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 401,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setShowNovelasModal(true),
            className: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors",
            children: "Ver catálogo completo"
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 404,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 394,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 365,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 border border-gray-200 rounded-xl p-8 text-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-100 p-4 rounded-full w-fit mx-auto mb-4", children: /* @__PURE__ */ jsxDEV(Library, { className: "h-8 w-8 text-gray-400" }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 416,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 415,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-gray-800 mb-2", children: "Catálogo de novelas no disponible" }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 418,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600", children: "No se pudo cargar el catálogo de novelas." }, void 0, false, {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 421,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 414,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 362,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { id: "section-peliculas", className: "mb-12", children: /* @__PURE__ */ jsxDEV(
        NetflixSection,
        {
          title: "Películas Destacadas",
          icon: /* @__PURE__ */ jsxDEV(Clapperboard, { className: "h-6 w-6 text-blue-500" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 432,
            columnNumber: 19
          }, this),
          showViewAll: true,
          onViewAllClick: () => window.location.href = "/movies",
          children: popularMovies.map(
            (movie) => /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 w-64", children: /* @__PURE__ */ jsxDEV(MovieCard, { item: movie, type: "movie" }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 438,
              columnNumber: 17
            }, this) }, movie.id, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 437,
              columnNumber: 13
            }, this)
          )
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 430,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 429,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { id: "section-series", className: "mb-12", children: /* @__PURE__ */ jsxDEV(
        NetflixSection,
        {
          title: "Series Destacadas",
          icon: /* @__PURE__ */ jsxDEV(Monitor, { className: "h-6 w-6 text-purple-500" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 448,
            columnNumber: 19
          }, this),
          showViewAll: true,
          onViewAllClick: () => window.location.href = "/tv",
          children: popularTVShows.map(
            (show) => /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 w-64", children: /* @__PURE__ */ jsxDEV(MovieCard, { item: show, type: "tv" }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 454,
              columnNumber: 17
            }, this) }, show.id, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 453,
              columnNumber: 13
            }, this)
          )
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 446,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 445,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { id: "section-anime", className: "mb-12", children: /* @__PURE__ */ jsxDEV(
        NetflixSection,
        {
          title: "Anime Destacado",
          icon: /* @__PURE__ */ jsxDEV(Sparkles, { className: "h-6 w-6 text-pink-500" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 464,
            columnNumber: 19
          }, this),
          showViewAll: true,
          onViewAllClick: () => window.location.href = "/anime",
          children: popularAnime.map(
            (anime) => /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 w-64", children: /* @__PURE__ */ jsxDEV(MovieCard, { item: anime, type: "tv" }, void 0, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 470,
              columnNumber: 17
            }, this) }, anime.id, false, {
              fileName: "/home/project/src/pages/Home.tsx",
              lineNumber: 469,
              columnNumber: 13
            }, this)
          )
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/pages/Home.tsx",
          lineNumber: 462,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 461,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "hidden", children: /* @__PURE__ */ jsxDEV("p", { children: [
        "Última actualización: ",
        lastUpdate.toLocaleString()
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 478,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 477,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Home.tsx",
      lineNumber: 247,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      NovelasModal,
      {
        isOpen: showNovelasModal,
        onClose: () => setShowNovelasModal(false)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 483,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      FloatingNav,
      {
        sections: [
          { id: "section-trending", label: "En Tendencia", icon: /* @__PURE__ */ jsxDEV(Flame, { className: "h-5 w-5" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 491,
            columnNumber: 64
          }, this) },
          { id: "section-novelas-transmision", label: "Novelas en Transmisión", icon: /* @__PURE__ */ jsxDEV(Radio, { className: "h-5 w-5" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 492,
            columnNumber: 85
          }, this) },
          { id: "section-novelas-finalizadas", label: "Novelas Finalizadas", icon: /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "h-5 w-5" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 493,
            columnNumber: 82
          }, this) },
          { id: "section-peliculas", label: "Películas Destacadas", icon: /* @__PURE__ */ jsxDEV(Clapperboard, { className: "h-5 w-5" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 494,
            columnNumber: 73
          }, this) },
          { id: "section-series", label: "Series Destacadas", icon: /* @__PURE__ */ jsxDEV(Monitor, { className: "h-5 w-5" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 495,
            columnNumber: 67
          }, this) },
          { id: "section-anime", label: "Anime Destacado", icon: /* @__PURE__ */ jsxDEV(Sparkles, { className: "h-5 w-5" }, void 0, false, {
            fileName: "/home/project/src/pages/Home.tsx",
            lineNumber: 496,
            columnNumber: 64
          }, this) }
        ]
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/pages/Home.tsx",
        lineNumber: 489,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/Home.tsx",
    lineNumber: 205,
    columnNumber: 5
  }, this);
}
_s(Home, "AsRJJBoZ6FJaG9iPbIIz4we6OCo=", false, function() {
  return [useAdmin, useCart];
});
_c = Home;
var _c;
$RefreshReg$(_c, "Home");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/Home.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/Home.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LHFCQUFxQjBDLE9BQU8sd0JBQXdCYSxNQUFNLHVCQUFDLGdCQUFhLFdBQVUsYUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUMsRUFBSTtBQUFBLFVBQ3JHLEVBQUV2RCxJQUFJLGtCQUFrQjBDLE9BQU8scUJBQXFCYSxNQUFNLHVCQUFDLFdBQVEsV0FBVSxhQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE0QixFQUFJO0FBQUEsVUFDMUYsRUFBRXZELElBQUksaUJBQWlCMEMsT0FBTyxtQkFBbUJhLE1BQU0sdUJBQUMsWUFBUyxXQUFVLGFBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQTZCLEVBQUk7QUFBQSxRQUFDO0FBQUE7QUFBQSxNQVA3RjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRSTtBQUFBLE9BcFNOO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FzU0E7QUFFSjtBQUFDeEgsR0EvY2VELE1BQUk7QUFBQSxVQUM2QlQsVUFDbEJELE9BQU87QUFBQTtBQUFBb0ksS0FGdEIxSDtBQUFJLElBQUEwSDtBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJMaW5rIiwiQ2hldnJvblJpZ2h0IiwiTW9uaXRvciIsIkZpbHRlciIsIkNhbGVuZGFyIiwiQ2xvY2siLCJGbGFtZSIsIkxpYnJhcnkiLCJDbGFwcGVyYm9hcmQiLCJTcGFya2xlcyIsIlJhZGlvIiwiQ2hlY2tDaXJjbGUyIiwidG1kYlNlcnZpY2UiLCJ1c2VDYXJ0IiwidXNlQWRtaW4iLCJNb3ZpZUNhcmQiLCJIZXJvQ2Fyb3VzZWwiLCJMb2FkaW5nU3Bpbm5lciIsIkVycm9yTWVzc2FnZSIsIk5vdmVsYXNNb2RhbCIsIk5ldGZsaXhTZWN0aW9uIiwiTmV0ZmxpeE5vdmVsU2VjdGlvbiIsIkZsb2F0aW5nTmF2IiwiSG9tZSIsIl9zIiwic3RhdGUiLCJhZG1pblN0YXRlIiwiYWRkTm90aWZpY2F0aW9uIiwiZ2V0Q3VycmVudFByaWNlcyIsInBvcHVsYXJNb3ZpZXMiLCJzZXRQb3B1bGFyTW92aWVzIiwicG9wdWxhclRWU2hvd3MiLCJzZXRQb3B1bGFyVFZTaG93cyIsInBvcHVsYXJBbmltZSIsInNldFBvcHVsYXJBbmltZSIsInRyZW5kaW5nQ29udGVudCIsInNldFRyZW5kaW5nQ29udGVudCIsIm5vdmVsVHJlbmRpbmdDb250ZW50Iiwic2V0Tm92ZWxUcmVuZGluZ0NvbnRlbnQiLCJoZXJvSXRlbXMiLCJzZXRIZXJvSXRlbXMiLCJ0cmVuZGluZ1RpbWVXaW5kb3ciLCJzZXRUcmVuZGluZ1RpbWVXaW5kb3ciLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJsYXN0VXBkYXRlIiwic2V0TGFzdFVwZGF0ZSIsIkRhdGUiLCJzaG93Tm92ZWxhc01vZGFsIiwic2V0U2hvd05vdmVsYXNNb2RhbCIsImN1cnJlbnRQcmljZXMiLCJ0aW1lV2luZG93TGFiZWxzIiwiZGF5Iiwid2VlayIsImZldGNoVHJlbmRpbmdDb250ZW50IiwidGltZVdpbmRvdyIsInJlc3BvbnNlIiwiZ2V0VHJlbmRpbmdBbGwiLCJ1bmlxdWVDb250ZW50IiwicmVtb3ZlRHVwbGljYXRlcyIsInJlc3VsdHMiLCJzbGljZSIsIm5vdmVsVHJlbmRpbmciLCJnZXROb3ZlbFRyZW5kaW5nQ29udGVudCIsImVyciIsImNvbnNvbGUiLCJub3ZlbHMiLCJmaWx0ZXIiLCJub3ZlbCIsImVzdGFkbyIsImZldGNoQWxsQ29udGVudCIsImhlcm9LZXlzIiwiT2JqZWN0Iiwia2V5cyIsImxvY2FsU3RvcmFnZSIsImtleSIsImluY2x1ZGVzIiwiZm9yRWFjaCIsInJlbW92ZUl0ZW0iLCJoZXJvQ29udGVudCIsImdldEhlcm9Db250ZW50IiwidHJlbmRpbmdSZXNwb25zZSIsInVuaXF1ZVRyZW5kaW5nIiwidXNlZElkcyIsIlNldCIsIm1hcCIsIml0ZW0iLCJpZCIsIm1vdmllc1JlcyIsInR2UmVzIiwiYW5pbWVSZXMiLCJub3dQbGF5aW5nUmVzIiwiYWlyaW5nVG9kYXlSZXMiLCJQcm9taXNlIiwiYWxsIiwiZ2V0UG9wdWxhck1vdmllcyIsImdldFBvcHVsYXJUVlNob3dzIiwiZ2V0QW5pbWVGcm9tTXVsdGlwbGVTb3VyY2VzIiwiZ2V0Tm93UGxheWluZ01vdmllcyIsImdldEFpcmluZ1RvZGF5VFZTaG93cyIsImFsbE1vdmllcyIsIm1vdmllIiwic29tZSIsIm5wIiwiYWxsVFZTaG93cyIsInNob3ciLCJhdCIsImZpbHRlcmVkTW92aWVzIiwiaGFzIiwiZmlsdGVyZWRUVlNob3dzIiwiZmlsdGVyZWRBbmltZSIsImFuaW1lIiwibm93IiwidG9tb3Jyb3ciLCJzZXREYXRlIiwiZ2V0RGF0ZSIsInNldEhvdXJzIiwidGltZVVudGlsTWlkbmlnaHQiLCJnZXRUaW1lIiwibWlkbmlnaHRUaW1lb3V0Iiwic2V0VGltZW91dCIsImRhaWx5SW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ3ZWVrbHlJbnRlcnZhbCIsImN1cnJlbnREYXkiLCJnZXREYXkiLCJjbGVhclRpbWVvdXQiLCJlbnRyaWVzIiwibGFiZWwiLCJpdGVtVHlwZSIsImxlbmd0aCIsInNvcnQiLCJhIiwiYiIsImRhdGVBIiwiY3JlYXRlZEF0IiwiZGF0ZUIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ0b0xvY2FsZVN0cmluZyIsImljb24iLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJIb21lLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IENoZXZyb25SaWdodCwgVHJlbmRpbmdVcCwgU3RhciwgTW9uaXRvciwgRmlsdGVyLCBDYWxlbmRhciwgQ2xvY2ssIEZsYW1lLCBMaWJyYXJ5LCBQbGF5LCBDbGFwcGVyYm9hcmQsIFNwYXJrbGVzLCBSYWRpbywgQ2hlY2tDaXJjbGUyIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHRtZGJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdG1kYic7XG5pbXBvcnQgeyB1c2VDYXJ0IH0gZnJvbSAnLi4vY29udGV4dC9DYXJ0Q29udGV4dCc7XG5pbXBvcnQgeyB1c2VBZG1pbiB9IGZyb20gJy4uL2NvbnRleHQvQWRtaW5Db250ZXh0JztcbmltcG9ydCB7IE1vdmllQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvTW92aWVDYXJkJztcbmltcG9ydCB7IEhlcm9DYXJvdXNlbCB9IGZyb20gJy4uL2NvbXBvbmVudHMvSGVyb0Nhcm91c2VsJztcbmltcG9ydCB7IExvYWRpbmdTcGlubmVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Mb2FkaW5nU3Bpbm5lcic7XG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21wb25lbnRzL0Vycm9yTWVzc2FnZSc7XG5pbXBvcnQgeyBOb3ZlbGFzTW9kYWwgfSBmcm9tICcuLi9jb21wb25lbnRzL05vdmVsYXNNb2RhbCc7XG5pbXBvcnQgeyBOZXRmbGl4U2VjdGlvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvTmV0ZmxpeFNlY3Rpb24nO1xuaW1wb3J0IHsgTmV0ZmxpeE5vdmVsU2VjdGlvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvTmV0ZmxpeE5vdmVsU2VjdGlvbic7XG5pbXBvcnQgeyBGbG9hdGluZ05hdiB9IGZyb20gJy4uL2NvbXBvbmVudHMvRmxvYXRpbmdOYXYnO1xuaW1wb3J0IHR5cGUgeyBNb3ZpZSwgVFZTaG93IH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG50eXBlIFRyZW5kaW5nVGltZVdpbmRvdyA9ICdkYXknIHwgJ3dlZWsnO1xuXG5leHBvcnQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgeyBzdGF0ZTogYWRtaW5TdGF0ZSwgYWRkTm90aWZpY2F0aW9uIH0gPSB1c2VBZG1pbigpO1xuICBjb25zdCB7IGdldEN1cnJlbnRQcmljZXMgfSA9IHVzZUNhcnQoKTtcbiAgY29uc3QgW3BvcHVsYXJNb3ZpZXMsIHNldFBvcHVsYXJNb3ZpZXNdID0gdXNlU3RhdGU8TW92aWVbXT4oW10pO1xuICBjb25zdCBbcG9wdWxhclRWU2hvd3MsIHNldFBvcHVsYXJUVlNob3dzXSA9IHVzZVN0YXRlPFRWU2hvd1tdPihbXSk7XG4gIGNvbnN0IFtwb3B1bGFyQW5pbWUsIHNldFBvcHVsYXJBbmltZV0gPSB1c2VTdGF0ZTxUVlNob3dbXT4oW10pO1xuICBjb25zdCBbdHJlbmRpbmdDb250ZW50LCBzZXRUcmVuZGluZ0NvbnRlbnRdID0gdXNlU3RhdGU8KE1vdmllIHwgVFZTaG93KVtdPihbXSk7XG4gIGNvbnN0IFtub3ZlbFRyZW5kaW5nQ29udGVudCwgc2V0Tm92ZWxUcmVuZGluZ0NvbnRlbnRdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcbiAgY29uc3QgW2hlcm9JdGVtcywgc2V0SGVyb0l0ZW1zXSA9IHVzZVN0YXRlPChNb3ZpZSB8IFRWU2hvdylbXT4oW10pO1xuICBjb25zdCBbdHJlbmRpbmdUaW1lV2luZG93LCBzZXRUcmVuZGluZ1RpbWVXaW5kb3ddID0gdXNlU3RhdGU8VHJlbmRpbmdUaW1lV2luZG93PignZGF5Jyk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGFzdFVwZGF0ZSwgc2V0TGFzdFVwZGF0ZV0gPSB1c2VTdGF0ZTxEYXRlPihuZXcgRGF0ZSgpKTtcbiAgY29uc3QgW3Nob3dOb3ZlbGFzTW9kYWwsIHNldFNob3dOb3ZlbGFzTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGN1cnJlbnRQcmljZXMgPSBnZXRDdXJyZW50UHJpY2VzKCk7XG4gIGNvbnN0IHRpbWVXaW5kb3dMYWJlbHMgPSB7XG4gICAgZGF5OiAnSG95ICsgTm92ZWxhcyBlbiBUcmFuc21pc2nDs24nLFxuICAgIHdlZWs6ICdFc3RhIFNlbWFuYSArIE5vdmVsYXMgRmluYWxpemFkYXMnXG4gIH07XG5cbiAgY29uc3QgZmV0Y2hUcmVuZGluZ0NvbnRlbnQgPSBhc3luYyAodGltZVdpbmRvdzogVHJlbmRpbmdUaW1lV2luZG93KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdG1kYlNlcnZpY2UuZ2V0VHJlbmRpbmdBbGwodGltZVdpbmRvdywgMSk7XG4gICAgICBjb25zdCB1bmlxdWVDb250ZW50ID0gdG1kYlNlcnZpY2UucmVtb3ZlRHVwbGljYXRlcyhyZXNwb25zZS5yZXN1bHRzKTtcbiAgICAgIHNldFRyZW5kaW5nQ29udGVudCh1bmlxdWVDb250ZW50LnNsaWNlKDAsIDEyKSk7XG4gICAgICBcbiAgICAgIC8vIEFkZCBub3ZlbHMgdG8gdHJlbmRpbmcgYmFzZWQgb24gdGltZSB3aW5kb3dcbiAgICAgIGNvbnN0IG5vdmVsVHJlbmRpbmcgPSBnZXROb3ZlbFRyZW5kaW5nQ29udGVudCh0aW1lV2luZG93KTtcbiAgICAgIHNldE5vdmVsVHJlbmRpbmdDb250ZW50KG5vdmVsVHJlbmRpbmcpO1xuICAgICAgXG4gICAgICBzZXRMYXN0VXBkYXRlKG5ldyBEYXRlKCkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdHJlbmRpbmcgY29udGVudDonLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGNvbnN0IGdldE5vdmVsVHJlbmRpbmdDb250ZW50ID0gKHRpbWVXaW5kb3c6IFRyZW5kaW5nVGltZVdpbmRvdyk6IGFueVtdID0+IHtcbiAgICBjb25zdCBub3ZlbHMgPSBhZG1pblN0YXRlLm5vdmVscyB8fCBbXTtcblxuICAgIGlmICh0aW1lV2luZG93ID09PSAnZGF5Jykge1xuICAgICAgcmV0dXJuIG5vdmVscy5maWx0ZXIobm92ZWwgPT4gbm92ZWwuZXN0YWRvID09PSAndHJhbnNtaXNpb24nKS5zbGljZSgwLCAxMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub3ZlbHMuZmlsdGVyKG5vdmVsID0+IG5vdmVsLmVzdGFkbyA9PT0gJ2ZpbmFsaXphZGEnKS5zbGljZSgwLCAxMCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZldGNoQWxsQ29udGVudCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgICAgLy8gQ2xlYXIgaGVybyBjb250ZW50IGNhY2hlIHRvIGVuc3VyZSBmcmVzaCBTcGFuaXNoIGNvbnRlbnRcbiAgICAgIGNvbnN0IGhlcm9LZXlzID0gT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKS5maWx0ZXIoa2V5ID0+XG4gICAgICAgIGtleS5pbmNsdWRlcygndHJlbmRpbmcnKSB8fCBrZXkuaW5jbHVkZXMoJ2ZyZXNoXycpXG4gICAgICApO1xuICAgICAgaGVyb0tleXMuZm9yRWFjaChrZXkgPT4gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KSk7XG5cbiAgICAgIC8vIEdldCBoZXJvIGNvbnRlbnQgZmlyc3QgKG5vIGR1cGxpY2F0ZXMpXG4gICAgICBjb25zdCBoZXJvQ29udGVudCA9IGF3YWl0IHRtZGJTZXJ2aWNlLmdldEhlcm9Db250ZW50KCk7XG4gICAgICBzZXRIZXJvSXRlbXMoaGVyb0NvbnRlbnQpO1xuICAgICAgXG4gICAgICAvLyBHZXQgdHJlbmRpbmcgY29udGVudFxuICAgICAgY29uc3QgdHJlbmRpbmdSZXNwb25zZSA9IGF3YWl0IHRtZGJTZXJ2aWNlLmdldFRyZW5kaW5nQWxsKHRyZW5kaW5nVGltZVdpbmRvdywgMSk7XG4gICAgICBjb25zdCB1bmlxdWVUcmVuZGluZyA9IHRtZGJTZXJ2aWNlLnJlbW92ZUR1cGxpY2F0ZXModHJlbmRpbmdSZXNwb25zZS5yZXN1bHRzKTtcbiAgICAgIHNldFRyZW5kaW5nQ29udGVudCh1bmlxdWVUcmVuZGluZy5zbGljZSgwLCAxMikpO1xuICAgICAgXG4gICAgICAvLyBHZXQgb3RoZXIgY29udGVudCwgZXhjbHVkaW5nIGl0ZW1zIGFscmVhZHkgaW4gaGVybyBhbmQgdHJlbmRpbmdcbiAgICAgIGNvbnN0IHVzZWRJZHMgPSBuZXcgU2V0KFtcbiAgICAgICAgLi4uaGVyb0NvbnRlbnQubWFwKGl0ZW0gPT4gaXRlbS5pZCksXG4gICAgICAgIC4uLnVuaXF1ZVRyZW5kaW5nLnNsaWNlKDAsIDEyKS5tYXAoaXRlbSA9PiBpdGVtLmlkKVxuICAgICAgXSk7XG4gICAgICBcbiAgICAgIC8vIEdldCBjb21wcmVoZW5zaXZlIGNvbnRlbnQgaW5jbHVkaW5nIGN1cnJlbnQgcmVsZWFzZXNcbiAgICAgIGNvbnN0IFttb3ZpZXNSZXMsIHR2UmVzLCBhbmltZVJlcywgbm93UGxheWluZ1JlcywgYWlyaW5nVG9kYXlSZXNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICB0bWRiU2VydmljZS5nZXRQb3B1bGFyTW92aWVzKDEpLFxuICAgICAgICB0bWRiU2VydmljZS5nZXRQb3B1bGFyVFZTaG93cygxKSxcbiAgICAgICAgdG1kYlNlcnZpY2UuZ2V0QW5pbWVGcm9tTXVsdGlwbGVTb3VyY2VzKDEpLFxuICAgICAgICB0bWRiU2VydmljZS5nZXROb3dQbGF5aW5nTW92aWVzKDEpLFxuICAgICAgICB0bWRiU2VydmljZS5nZXRBaXJpbmdUb2RheVRWU2hvd3MoMSlcbiAgICAgIF0pO1xuXG4gICAgICAvLyBDb21iaW5lIGFuZCBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXMsIHByaW9yaXRpemluZyBjdXJyZW50IGNvbnRlbnRcbiAgICAgIGNvbnN0IGFsbE1vdmllcyA9IFtcbiAgICAgICAgLi4ubm93UGxheWluZ1Jlcy5yZXN1bHRzLFxuICAgICAgICAuLi5tb3ZpZXNSZXMucmVzdWx0cy5maWx0ZXIobW92aWUgPT4gIW5vd1BsYXlpbmdSZXMucmVzdWx0cy5zb21lKG5wID0+IG5wLmlkID09PSBtb3ZpZS5pZCkpXG4gICAgICBdO1xuICAgICAgY29uc3QgYWxsVFZTaG93cyA9IFtcbiAgICAgICAgLi4uYWlyaW5nVG9kYXlSZXMucmVzdWx0cyxcbiAgICAgICAgLi4udHZSZXMucmVzdWx0cy5maWx0ZXIoc2hvdyA9PiAhYWlyaW5nVG9kYXlSZXMucmVzdWx0cy5zb21lKGF0ID0+IGF0LmlkID09PSBzaG93LmlkKSlcbiAgICAgIF07XG4gICAgICBcbiAgICAgIGNvbnN0IGZpbHRlcmVkTW92aWVzID0gYWxsTW92aWVzLmZpbHRlcihtb3ZpZSA9PiAhdXNlZElkcy5oYXMobW92aWUuaWQpKS5zbGljZSgwLCA4KTtcbiAgICAgIGNvbnN0IGZpbHRlcmVkVFZTaG93cyA9IGFsbFRWU2hvd3MuZmlsdGVyKHNob3cgPT4gIXVzZWRJZHMuaGFzKHNob3cuaWQpKS5zbGljZSgwLCA4KTtcbiAgICAgIGNvbnN0IGZpbHRlcmVkQW5pbWUgPSBhbmltZVJlcy5yZXN1bHRzLmZpbHRlcihhbmltZSA9PiAhdXNlZElkcy5oYXMoYW5pbWUuaWQpKS5zbGljZSgwLCA4KTtcblxuICAgICAgc2V0UG9wdWxhck1vdmllcyhmaWx0ZXJlZE1vdmllcyk7XG4gICAgICBzZXRQb3B1bGFyVFZTaG93cyhmaWx0ZXJlZFRWU2hvd3MpO1xuICAgICAgc2V0UG9wdWxhckFuaW1lKGZpbHRlcmVkQW5pbWUpO1xuICAgICAgc2V0TGFzdFVwZGF0ZShuZXcgRGF0ZSgpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKCdFcnJvciBhbCBjYXJnYXIgZWwgY29udGVuaWRvLiBQb3IgZmF2b3IsIGludGVudGEgZGUgbnVldm8uJyk7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBob21lIGRhdGE6JywgZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hBbGxDb250ZW50KCk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoVHJlbmRpbmdDb250ZW50KHRyZW5kaW5nVGltZVdpbmRvdyk7XG4gIH0sIFt0cmVuZGluZ1RpbWVXaW5kb3ddKTtcblxuICAvLyBBdXRvLXJlZnJlc2ggY29udGVudCBkYWlseSBhbmQgd2Vla2x5XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKG5vdyk7XG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICB0b21vcnJvdy5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBcbiAgICBjb25zdCB0aW1lVW50aWxNaWRuaWdodCA9IHRvbW9ycm93LmdldFRpbWUoKSAtIG5vdy5nZXRUaW1lKCk7XG4gICAgXG4gICAgLy8gU2V0IGluaXRpYWwgdGltZW91dCBmb3IgbWlkbmlnaHRcbiAgICBjb25zdCBtaWRuaWdodFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZldGNoQWxsQ29udGVudCgpO1xuICAgICAgXG4gICAgICAvLyBUaGVuIHNldCBkYWlseSBpbnRlcnZhbFxuICAgICAgY29uc3QgZGFpbHlJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgZmV0Y2hBbGxDb250ZW50KCk7XG4gICAgICB9LCAyNCAqIDYwICogNjAgKiAxMDAwKTsgLy8gMjQgaG91cnNcbiAgICAgIFxuICAgICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoZGFpbHlJbnRlcnZhbCk7XG4gICAgfSwgdGltZVVudGlsTWlkbmlnaHQpO1xuXG4gICAgLy8gV2Vla2x5IHJlZnJlc2ggb24gU3VuZGF5c1xuICAgIGNvbnN0IHdlZWtseUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudERheSA9IG5ldyBEYXRlKCkuZ2V0RGF5KCk7XG4gICAgICBpZiAoY3VycmVudERheSA9PT0gMCkgeyAvLyBTdW5kYXlcbiAgICAgICAgZmV0Y2hBbGxDb250ZW50KCk7XG4gICAgICB9XG4gICAgfSwgMjQgKiA2MCAqIDYwICogMTAwMCk7IC8vIENoZWNrIGRhaWx5IGZvciBTdW5kYXlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQobWlkbmlnaHRUaW1lb3V0KTtcbiAgICAgIGNsZWFySW50ZXJ2YWwod2Vla2x5SW50ZXJ2YWwpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICAgIDxMb2FkaW5nU3Bpbm5lciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChlcnJvcikge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICAgIDxFcnJvck1lc3NhZ2UgbWVzc2FnZT17ZXJyb3J9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICB7LyogSGVybyBDYXJvdXNlbCAqL31cbiAgICAgIDxIZXJvQ2Fyb3VzZWwgaXRlbXM9e2hlcm9JdGVtc30gLz5cbiAgICAgIFxuICAgICAgey8qIENhbGwgdG8gQWN0aW9uIFNlY3Rpb24gKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS05MDAgdmlhLXB1cnBsZS05MDAgdG8tcGluay04MDAgdGV4dC13aGl0ZSBweS0xNlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIG1kOnRleHQtNXhsIGZvbnQtYm9sZCBtYi02XCI+XG4gICAgICAgICAgICBEZXNjdWJyZSBlbCBNdW5kbyBkZWxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtdHJhbnNwYXJlbnQgYmctY2xpcC10ZXh0IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTQwMCB0by1waW5rLTQwMFwiPlxuICAgICAgICAgICAgICB7JyAnfUVudHJldGVuaW1pZW50b1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZyBtZDp0ZXh0LXhsIG1iLTggbWF4LXctM3hsIG14LWF1dG8gb3BhY2l0eS05MFwiPlxuICAgICAgICAgICAgRXhwbG9yYSBtaWxlcyBkZSBwZWzDrWN1bGFzLCBhbmltZXMsIHNlcmllcyBpbGltaXRhZGFzIHkgbXVjaG8gbcOhcy4gRW5jdWVudHJhIHR1cyBmYXZvcml0b3MgeSBhZ3LDqWdhbG9zIGEgdHUgY2Fycml0by5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGdhcC00IGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICB0bz1cIi9tb3ZpZXNcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ibHVlLTYwMCBob3ZlcjpiZy1ibHVlLTcwMCBweC04IHB5LTMgcm91bmRlZC1mdWxsIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGhvdmVyOnNjYWxlLTEwNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxDbGFwcGVyYm9hcmQgY2xhc3NOYW1lPVwibXItMiBoLTUgdy01XCIgLz5cbiAgICAgICAgICAgICAgRXhwbG9yYXIgUGVsw61jdWxhc1xuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgdG89XCIvdHZcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1wdXJwbGUtNjAwIGhvdmVyOmJnLXB1cnBsZS03MDAgcHgtOCBweS0zIHJvdW5kZWQtZnVsbCBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjpzY2FsZS0xMDUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJtci0yIGgtNSB3LTVcIiAvPlxuICAgICAgICAgICAgICBWZXIgU2VyaWVzXG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dOb3ZlbGFzTW9kYWwodHJ1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXBpbmstNjAwIGhvdmVyOmJnLXBpbmstNzAwIHB4LTggcHktMyByb3VuZGVkLWZ1bGwgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6c2NhbGUtMTA1IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPExpYnJhcnkgY2xhc3NOYW1lPVwibXItMiBoLTUgdy01XCIgLz5cbiAgICAgICAgICAgICAgQ2F0w6Fsb2dvIGRlIE5vdmVsYXNcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBweS0xMlwiPlxuICAgICAgICB7LyogVHJlbmRpbmcgQ29udGVudCAqL31cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJzZWN0aW9uLXRyZW5kaW5nXCIgY2xhc3NOYW1lPVwibWItMTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi02IHNwYWNlLXktNCBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwibXItMiBoLTYgdy02IHRleHQtcmVkLTUwMFwiIC8+XG4gICAgICAgICAgICAgIEVuIFRlbmRlbmNpYVxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIFRyZW5kaW5nIEZpbHRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xIGJnLXdoaXRlIHJvdW5kZWQtbGcgcC0xIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLWdyYXktMjAwXCI+XG4gICAgICAgICAgICAgIDxGaWx0ZXIgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LWdyYXktNTAwIG1sLTJcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgcHgtMlwiPlBlcsOtb2RvOjwvc3Bhbj5cbiAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKHRpbWVXaW5kb3dMYWJlbHMpLm1hcCgoW2tleSwgbGFiZWxdKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUcmVuZGluZ1RpbWVXaW5kb3coa2V5IGFzIFRyZW5kaW5nVGltZVdpbmRvdyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC1tZCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciAke1xuICAgICAgICAgICAgICAgICAgICB0cmVuZGluZ1RpbWVXaW5kb3cgPT09IGtleVxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNTAwIHRvLXBpbmstNTAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHRyYW5zZm9ybSBzY2FsZS0xMDUnXG4gICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTYwMCBob3Zlcjp0ZXh0LXJlZC02MDAgaG92ZXI6YmctcmVkLTUwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2tleSA9PT0gJ2RheScgPyA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiaC0zIHctMyBtci0xXCIgLz4gOiA8Q2xvY2sgY2xhc3NOYW1lPVwiaC0zIHctMyBtci0xXCIgLz59XG4gICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIE1vdmllcyBhbmQgVFYgU2hvd3Mgd2l0aCBOZXRmbGl4LXN0eWxlIGNhcm91c2VsICovfVxuICAgICAgICAgIDxOZXRmbGl4U2VjdGlvblxuICAgICAgICAgICAgdGl0bGU9XCJcIlxuICAgICAgICAgICAgc2hvd1ZpZXdBbGw9e2ZhbHNlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0cmVuZGluZ0NvbnRlbnQubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW1UeXBlID0gJ3RpdGxlJyBpbiBpdGVtID8gJ21vdmllJyA6ICd0dic7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2B0cmVuZGluZy0ke2l0ZW1UeXBlfS0ke2l0ZW0uaWR9YH0gY2xhc3NOYW1lPVwiZmxleC1zaHJpbmstMCB3LTY0XCI+XG4gICAgICAgICAgICAgICAgICA8TW92aWVDYXJkIGl0ZW09e2l0ZW19IHR5cGU9e2l0ZW1UeXBlfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9OZXRmbGl4U2VjdGlvbj5cbiAgICAgICAgICBcbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIHsvKiBTZWNjacOzbiBEZWRpY2FkYTogTm92ZWxhcyBlbiBUcmFuc21pc2nDs24gLSBFc3RpbG8gTmV0ZmxpeCAqL31cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJzZWN0aW9uLW5vdmVsYXMtdHJhbnNtaXNpb25cIiBjbGFzc05hbWU9XCJtYi0xMlwiPlxuXG4gICAgICAgICAge2FkbWluU3RhdGUubm92ZWxzICYmIGFkbWluU3RhdGUubm92ZWxzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICB7YWRtaW5TdGF0ZS5ub3ZlbHMuZmlsdGVyKG5vdmVsID0+IG5vdmVsLmVzdGFkbyA9PT0gJ3RyYW5zbWlzaW9uJykubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNlwiPlxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNTAwIHRvLXBpbmstNTAwIHAtMiByb3VuZGVkLXhsIHNoYWRvdy1sZyBtci0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICBOb3ZlbGFzIGVuIFRyYW5zbWlzacOzblxuICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd05vdmVsYXNNb2RhbCh0cnVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXJlZC02MDAgaG92ZXI6dGV4dC1yZWQtNzAwIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFZlciB0b2Rhc1xuICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwiaC01IHctNSBtbC0xXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxOZXRmbGl4Tm92ZWxTZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIG5vdmVscz17YWRtaW5TdGF0ZS5ub3ZlbHNcbiAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKG5vdmVsID0+IG5vdmVsLmVzdGFkbyA9PT0gJ3RyYW5zbWlzaW9uJylcbiAgICAgICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZUEgPSBuZXcgRGF0ZShhLmNyZWF0ZWRBdCB8fCAwKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIuY3JlYXRlZEF0IHx8IDApLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlQiAtIGRhdGVBO1xuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXJlZC01MCBib3JkZXIgYm9yZGVyLXJlZC0yMDAgcm91bmRlZC14bCBwLTggdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcmVkLTEwMCBwLTQgcm91bmRlZC1mdWxsIHctZml0IG14LWF1dG8gbWItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwiaC04IHctOCB0ZXh0LXJlZC01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtcmVkLTgwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIE5vIGhheSBub3ZlbGFzIGVuIHRyYW5zbWlzacOzblxuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtcmVkLTYwMCBtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgIEFjdHVhbG1lbnRlIG5vIGhheSBub3ZlbGFzIHNpZW5kbyB0cmFuc21pdGlkYXMuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dOb3ZlbGFzTW9kYWwodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXJlZC01MDAgaG92ZXI6YmctcmVkLTYwMCB0ZXh0LXdoaXRlIHB4LTQgcHktMiByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgVmVyIGNhdMOhbG9nbyBjb21wbGV0b1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIGJvcmRlciBib3JkZXItZ3JheS0yMDAgcm91bmRlZC14bCBwLTggdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTEwMCBwLTQgcm91bmRlZC1mdWxsIHctZml0IG14LWF1dG8gbWItNFwiPlxuICAgICAgICAgICAgICAgIDxMaWJyYXJ5IGNsYXNzTmFtZT1cImgtOCB3LTggdGV4dC1ncmF5LTQwMFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtZ3JheS04MDAgbWItMlwiPlxuICAgICAgICAgICAgICAgIENhdMOhbG9nbyBkZSBub3ZlbGFzIG5vIGRpc3BvbmlibGVcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgICAgICAgIE5vIHNlIHB1ZG8gY2FyZ2FyIGVsIGNhdMOhbG9nbyBkZSBub3ZlbGFzLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgey8qIFNlY2Npw7NuIERlZGljYWRhOiBOb3ZlbGFzIEZpbmFsaXphZGFzIC0gRXN0aWxvIE5ldGZsaXggKi99XG4gICAgICAgIDxzZWN0aW9uIGlkPVwic2VjdGlvbi1ub3ZlbGFzLWZpbmFsaXphZGFzXCIgY2xhc3NOYW1lPVwibWItMTJcIj5cblxuICAgICAgICAgIHthZG1pblN0YXRlLm5vdmVscyAmJiBhZG1pblN0YXRlLm5vdmVscy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAge2FkbWluU3RhdGUubm92ZWxzLmZpbHRlcihub3ZlbCA9PiBub3ZlbC5lc3RhZG8gPT09ICdmaW5hbGl6YWRhJykubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNlwiPlxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdG8tZW1lcmFsZC01MDAgcC0yIHJvdW5kZWQteGwgc2hhZG93LWxnIG1yLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICBOb3ZlbGFzIEZpbmFsaXphZGFzXG4gICAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Tm92ZWxhc01vZGFsKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNjAwIGhvdmVyOnRleHQtZ3JlZW4tNzAwIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFZlciB0b2Rhc1xuICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwiaC01IHctNSBtbC0xXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxOZXRmbGl4Tm92ZWxTZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIG5vdmVscz17YWRtaW5TdGF0ZS5ub3ZlbHNcbiAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKG5vdmVsID0+IG5vdmVsLmVzdGFkbyA9PT0gJ2ZpbmFsaXphZGEnKVxuICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEuY3JlYXRlZEF0IHx8IDApLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoYi5jcmVhdGVkQXQgfHwgMCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVCIC0gZGF0ZUE7XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tNTAgYm9yZGVyIGJvcmRlci1ncmVlbi0yMDAgcm91bmRlZC14bCBwLTggdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tMTAwIHAtNCByb3VuZGVkLWZ1bGwgdy1maXQgbXgtYXV0byBtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwiaC04IHctOCB0ZXh0LWdyZWVuLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmVlbi04MDAgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICBObyBoYXkgbm92ZWxhcyBmaW5hbGl6YWRhc1xuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNjAwIG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgQWN0dWFsbWVudGUgbm8gaGF5IG5vdmVsYXMgZmluYWxpemFkYXMgZW4gZWwgY2F0w6Fsb2dvLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Tm92ZWxhc01vZGFsKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmVlbi01MDAgaG92ZXI6YmctZ3JlZW4tNjAwIHRleHQtd2hpdGUgcHgtNCBweS0yIHJvdW5kZWQtbGcgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBWZXIgY2F0w6Fsb2dvIGNvbXBsZXRvXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCByb3VuZGVkLXhsIHAtOCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktMTAwIHAtNCByb3VuZGVkLWZ1bGwgdy1maXQgbXgtYXV0byBtYi00XCI+XG4gICAgICAgICAgICAgICAgPExpYnJhcnkgY2xhc3NOYW1lPVwiaC04IHctOCB0ZXh0LWdyYXktNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTgwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgQ2F0w6Fsb2dvIGRlIG5vdmVsYXMgbm8gZGlzcG9uaWJsZVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCI+XG4gICAgICAgICAgICAgICAgTm8gc2UgcHVkbyBjYXJnYXIgZWwgY2F0w6Fsb2dvIGRlIG5vdmVsYXMuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICB7LyogUG9wdWxhciBNb3ZpZXMgKi99XG4gICAgICAgIDxzZWN0aW9uIGlkPVwic2VjdGlvbi1wZWxpY3VsYXNcIiBjbGFzc05hbWU9XCJtYi0xMlwiPlxuICAgICAgICAgIDxOZXRmbGl4U2VjdGlvblxuICAgICAgICAgICAgdGl0bGU9XCJQZWzDrWN1bGFzIERlc3RhY2FkYXNcIlxuICAgICAgICAgICAgaWNvbj17PENsYXBwZXJib2FyZCBjbGFzc05hbWU9XCJoLTYgdy02IHRleHQtYmx1ZS01MDBcIiAvPn1cbiAgICAgICAgICAgIHNob3dWaWV3QWxsPXt0cnVlfVxuICAgICAgICAgICAgb25WaWV3QWxsQ2xpY2s9eygpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9tb3ZpZXMnfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3B1bGFyTW92aWVzLm1hcCgobW92aWUpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e21vdmllLmlkfSBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctNjRcIj5cbiAgICAgICAgICAgICAgICA8TW92aWVDYXJkIGl0ZW09e21vdmllfSB0eXBlPVwibW92aWVcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvTmV0ZmxpeFNlY3Rpb24+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICB7LyogUG9wdWxhciBUViBTaG93cyAqL31cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJzZWN0aW9uLXNlcmllc1wiIGNsYXNzTmFtZT1cIm1iLTEyXCI+XG4gICAgICAgICAgPE5ldGZsaXhTZWN0aW9uXG4gICAgICAgICAgICB0aXRsZT1cIlNlcmllcyBEZXN0YWNhZGFzXCJcbiAgICAgICAgICAgIGljb249ezxNb25pdG9yIGNsYXNzTmFtZT1cImgtNiB3LTYgdGV4dC1wdXJwbGUtNTAwXCIgLz59XG4gICAgICAgICAgICBzaG93Vmlld0FsbD17dHJ1ZX1cbiAgICAgICAgICAgIG9uVmlld0FsbENsaWNrPXsoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvdHYnfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3B1bGFyVFZTaG93cy5tYXAoKHNob3cpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e3Nob3cuaWR9IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgdy02NFwiPlxuICAgICAgICAgICAgICAgIDxNb3ZpZUNhcmQgaXRlbT17c2hvd30gdHlwZT1cInR2XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L05ldGZsaXhTZWN0aW9uPlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgey8qIFBvcHVsYXIgQW5pbWUgKi99XG4gICAgICAgIDxzZWN0aW9uIGlkPVwic2VjdGlvbi1hbmltZVwiIGNsYXNzTmFtZT1cIm1iLTEyXCI+XG4gICAgICAgICAgPE5ldGZsaXhTZWN0aW9uXG4gICAgICAgICAgICB0aXRsZT1cIkFuaW1lIERlc3RhY2Fkb1wiXG4gICAgICAgICAgICBpY29uPXs8U3BhcmtsZXMgY2xhc3NOYW1lPVwiaC02IHctNiB0ZXh0LXBpbmstNTAwXCIgLz59XG4gICAgICAgICAgICBzaG93Vmlld0FsbD17dHJ1ZX1cbiAgICAgICAgICAgIG9uVmlld0FsbENsaWNrPXsoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYW5pbWUnfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwb3B1bGFyQW5pbWUubWFwKChhbmltZSkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YW5pbWUuaWR9IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgdy02NFwiPlxuICAgICAgICAgICAgICAgIDxNb3ZpZUNhcmQgaXRlbT17YW5pbWV9IHR5cGU9XCJ0dlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9OZXRmbGl4U2VjdGlvbj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIHsvKiBMYXN0IFVwZGF0ZSBJbmZvIChIaWRkZW4gZnJvbSB1c2VycykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuXCI+XG4gICAgICAgICAgPHA+w5psdGltYSBhY3R1YWxpemFjacOzbjoge2xhc3RVcGRhdGUudG9Mb2NhbGVTdHJpbmcoKX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIHsvKiBNb2RhbCBkZSBOb3ZlbGFzICovfVxuICAgICAgPE5vdmVsYXNNb2RhbFxuICAgICAgICBpc09wZW49e3Nob3dOb3ZlbGFzTW9kYWx9XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dOb3ZlbGFzTW9kYWwoZmFsc2UpfVxuICAgICAgLz5cblxuICAgICAgey8qIEZsb2F0aW5nIE5hdmlnYXRpb24gKi99XG4gICAgICA8RmxvYXRpbmdOYXZcbiAgICAgICAgc2VjdGlvbnM9e1tcbiAgICAgICAgICB7IGlkOiAnc2VjdGlvbi10cmVuZGluZycsIGxhYmVsOiAnRW4gVGVuZGVuY2lhJywgaWNvbjogPEZsYW1lIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiB9LFxuICAgICAgICAgIHsgaWQ6ICdzZWN0aW9uLW5vdmVsYXMtdHJhbnNtaXNpb24nLCBsYWJlbDogJ05vdmVsYXMgZW4gVHJhbnNtaXNpw7NuJywgaWNvbjogPFJhZGlvIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiB9LFxuICAgICAgICAgIHsgaWQ6ICdzZWN0aW9uLW5vdmVsYXMtZmluYWxpemFkYXMnLCBsYWJlbDogJ05vdmVsYXMgRmluYWxpemFkYXMnLCBpY29uOiA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiB9LFxuICAgICAgICAgIHsgaWQ6ICdzZWN0aW9uLXBlbGljdWxhcycsIGxhYmVsOiAnUGVsw61jdWxhcyBEZXN0YWNhZGFzJywgaWNvbjogPENsYXBwZXJib2FyZCBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gfSxcbiAgICAgICAgICB7IGlkOiAnc2VjdGlvbi1zZXJpZXMnLCBsYWJlbDogJ1NlcmllcyBEZXN0YWNhZGFzJywgaWNvbjogPE1vbml0b3IgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IH0sXG4gICAgICAgICAgeyBpZDogJ3NlY3Rpb24tYW5pbWUnLCBsYWJlbDogJ0FuaW1lIERlc3RhY2FkbycsIGljb246IDxTcGFya2xlcyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gfSxcbiAgICAgICAgXX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9wYWdlcy9Ib21lLnRzeCJ9