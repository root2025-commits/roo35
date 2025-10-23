import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/MovieDetail.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/MovieDetail.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { useParams, Link } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { ArrowLeft, Star, Calendar, Clock, Plus, X, Play, Clapperboard, Globe, DollarSign, TrendingUp, Users, Building, Sparkles, Heart, Zap, CheckCircle } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { tmdbService } from "/src/services/tmdb.ts";
import { VideoPlayer } from "/src/components/VideoPlayer.tsx";
import { PriceCard } from "/src/components/PriceCard.tsx";
import { CastSection } from "/src/components/CastSection.tsx";
import { LoadingSpinner } from "/src/components/LoadingSpinner.tsx";
import { ErrorMessage } from "/src/components/ErrorMessage.tsx";
import { useCart } from "/src/context/CartContext.tsx";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "/src/config/api.ts";
export function MovieDetail() {
  _s();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const { addItem, removeItem, isInCart } = useCart();
  const movieId = parseInt(id || "0");
  const inCart = isInCart(movieId);
  const isAnime = movie?.original_language === "ja" || movie?.genres && movie.genres.some((g) => g.name.toLowerCase().includes("animat"));
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [movieData, creditsData] = await Promise.all(
          [
            tmdbService.getMovieDetails(movieId),
            tmdbService.getMovieCredits(movieId)
          ]
        );
        setMovie(movieData);
        setCast(creditsData.cast || []);
        try {
          const videoData = await tmdbService.getMovieVideos(movieId);
          const trailers = videoData.results.filter(
            (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
          );
          setVideos(trailers);
          if (trailers.length > 0) {
            setSelectedVideo(trailers[0]);
          }
        } catch (videoError) {
          console.warn(`No videos available for movie ${movieId}`);
          setVideos([]);
        }
      } catch (err) {
        setError("Error al cargar los detalles de la película.");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);
  const handleCartAction = () => {
    if (!movie) return;
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 2e3);
    const cartItem = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      type: "movie",
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      original_language: movie.original_language,
      genre_ids: movie.genres.map((g) => g.id)
    };
    if (inCart) {
      removeItem(movie.id);
    } else {
      addItem(cartItem);
    }
  };
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
      fileName: "/home/project/src/pages/MovieDetail.tsx",
      lineNumber: 128,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/MovieDetail.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this);
  }
  if (error || !movie) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(ErrorMessage, { message: error || "Película no encontrada" }, void 0, false, {
      fileName: "/home/project/src/pages/MovieDetail.tsx",
      lineNumber: 136,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/MovieDetail.tsx",
      lineNumber: 135,
      columnNumber: 7
    }, this);
  }
  const backdropUrl = movie.backdrop_path ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path}` : "https://images.unsplash.com/photo-1489599843253-c76cc4bcb8cf?w=1280&h=720&fit=crop&crop=center";
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "relative h-96 md:h-[500px] overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center",
          style: { backgroundImage: `url(${backdropUrl})` }
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 149,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" }, void 0, false, {
        fileName: "/home/project/src/pages/MovieDetail.tsx",
        lineNumber: 153,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative h-full flex items-end", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full", children: [
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/movies",
            className: "inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors",
            children: [
              /* @__PURE__ */ jsxDEV(ArrowLeft, { className: "mr-2 h-4 w-4" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 161,
                columnNumber: 15
              }, this),
              "Volver a películas"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 157,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-4", children: movie.title }, void 0, false, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 165,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-4 text-white/90 mb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Star, { className: "h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 171,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: movie.vote_average.toFixed(1) }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 172,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 170,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Calendar, { className: "h-5 w-5 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 175,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: new Date(movie.release_date).getFullYear() }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 176,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 174,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Clock, { className: "h-5 w-5 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 179,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: formatRuntime(movie.runtime) }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 180,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 178,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 169,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2 mb-6", children: movie.genres.map(
          (genre) => /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: "px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white",
              children: genre.name
            },
            genre.id,
            false,
            {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 186,
              columnNumber: 15
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 184,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/MovieDetail.tsx",
        lineNumber: 156,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/MovieDetail.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/MovieDetail.tsx",
      lineNumber: 148,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl mr-4 shadow-lg", children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl", children: "📚" }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 206,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 205,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent", children: "Sinopsis" }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 208,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 204,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 leading-relaxed text-lg mb-4", children: movie.overview || "Sin descripción disponible." }, void 0, false, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 212,
            columnNumber: 15
          }, this),
          movie.tagline && /* @__PURE__ */ jsxDEV("div", { className: "mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-l-4 border-gradient-to-b from-blue-400 to-purple-400", children: /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 italic text-lg font-medium", children: [
            '"',
            movie.tagline,
            '"'
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 217,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 216,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 203,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(CastSection, { cast, title: "Reparto Principal" }, void 0, false, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 223,
          columnNumber: 13
        }, this),
        videos.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg shadow-sm p-6 mb-6", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Tráilers y Videos" }, void 0, false, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 228,
            columnNumber: 17
          }, this),
          showVideo && selectedVideo ? /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV(VideoPlayer, { videoKey: selectedVideo.key, title: selectedVideo.name }, void 0, false, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 232,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 231,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setShowVideo(true),
              className: "relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden group",
              children: [
                /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: "absolute inset-0 bg-cover bg-center",
                    style: {
                      backgroundImage: selectedVideo ? `url(https://img.youtube.com/vi/${selectedVideo.key}/maxresdefault.jpg)` : `url(${backdropUrl})`
                    }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 240,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" }, void 0, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 248,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-red-600 hover:bg-red-700 rounded-full p-4 transition-colors group-hover:scale-110", children: /* @__PURE__ */ jsxDEV(Play, { className: "h-8 w-8 text-white ml-1" }, void 0, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 251,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 250,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 249,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-4 left-4 text-white", children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "font-medium", children: "Reproducir Tráiler" }, void 0, false, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 255,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm opacity-75", children: selectedVideo?.name }, void 0, false, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 256,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 254,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 236,
              columnNumber: 21
            },
            this
          ) }, void 0, false, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 235,
            columnNumber: 15
          }, this),
          videos.length > 1 && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: videos.map(
            (video) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  setSelectedVideo(video);
                  setShowVideo(true);
                },
                className: `p-3 rounded-lg border-2 text-left transition-colors ${selectedVideo?.id === video.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-900", children: video.name }, void 0, false, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 277,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-600", children: video.type }, void 0, false, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 278,
                    columnNumber: 25
                  }, this)
                ]
              },
              video.id,
              true,
              {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 265,
                columnNumber: 17
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 263,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 227,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/MovieDetail.tsx",
        lineNumber: 201,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white", children: /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold flex items-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-2 rounded-lg mr-3", children: /* @__PURE__ */ jsxDEV("span", { className: "text-lg", children: "🎬" }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 293,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 292,
              columnNumber: 19
            }, this),
            "Detalles de la Película"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 291,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 290,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleCartAction,
                onMouseEnter: () => setIsCartHovered(true),
                onMouseLeave: () => setIsCartHovered(false),
                className: `w-full mb-6 px-6 py-5 rounded-2xl font-bold transition-all duration-500 flex items-center justify-center transform relative overflow-hidden ${inCart ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white shadow-2xl scale-105" : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl"} ${isCartHovered ? "scale-110 shadow-2xl" : ""} ${showCartAnimation ? "animate-pulse" : ""}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 ${isCartHovered ? "animate-pulse" : ""}` }, void 0, false, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 311,
                    columnNumber: 17
                  }, this),
                  isCartHovered && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "absolute top-2 left-4 h-4 w-4 text-yellow-300 animate-bounce" }, void 0, false, {
                      fileName: "/home/project/src/pages/MovieDetail.tsx",
                      lineNumber: 318,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Heart, { className: "absolute top-2 right-4 h-4 w-4 text-pink-300 animate-pulse" }, void 0, false, {
                      fileName: "/home/project/src/pages/MovieDetail.tsx",
                      lineNumber: 319,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Zap, { className: "absolute bottom-2 left-6 h-4 w-4 text-blue-300 animate-bounce delay-100" }, void 0, false, {
                      fileName: "/home/project/src/pages/MovieDetail.tsx",
                      lineNumber: 320,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Star, { className: "absolute bottom-2 right-6 h-4 w-4 text-yellow-300 animate-pulse delay-200" }, void 0, false, {
                      fileName: "/home/project/src/pages/MovieDetail.tsx",
                      lineNumber: 321,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 317,
                    columnNumber: 19
                  }, this),
                  inCart ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(X, { className: `mr-3 h-6 w-6 transition-transform duration-300 relative z-10 ${isCartHovered ? "rotate-90 scale-125" : ""}` }, void 0, false, {
                      fileName: "/home/project/src/pages/MovieDetail.tsx",
                      lineNumber: 327,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "relative z-10 text-lg", children: "Retirar del Carrito" }, void 0, false, {
                      fileName: "/home/project/src/pages/MovieDetail.tsx",
                      lineNumber: 330,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 326,
                    columnNumber: 19
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Plus, { className: `mr-3 h-6 w-6 transition-transform duration-300 relative z-10 ${isCartHovered ? "rotate-180 scale-125" : ""}` }, void 0, false, {
                      fileName: "/home/project/src/pages/MovieDetail.tsx",
                      lineNumber: 334,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "relative z-10 text-lg", children: "Agregar al Carrito" }, void 0, false, {
                      fileName: "/home/project/src/pages/MovieDetail.tsx",
                      lineNumber: 337,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 333,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 300,
                columnNumber: 17
              },
              this
            ),
            inCart && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white p-2 rounded-full shadow-lg", children: /* @__PURE__ */ jsxDEV(CheckCircle, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 345,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 344,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 299,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 289,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mb-6", children: /* @__PURE__ */ jsxDEV(
          PriceCard,
          {
            type: "movie",
            isAnime
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 356,
            columnNumber: 17
          },
          this
        ) }, void 0, false, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 355,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Clapperboard, { className: "h-4 w-4 text-blue-600" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 366,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 365,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Estado" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 368,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 364,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: movie.status }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 370,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 363,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-purple-200 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Globe, { className: "h-4 w-4 text-purple-600" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 376,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 375,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Idioma Original" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 378,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 374,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: movie.original_language.toUpperCase() }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 380,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 373,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-green-200 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-green-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-4 w-4 text-green-600" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 386,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 385,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Presupuesto" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 388,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 384,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "No disponible" }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 390,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 383,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-yellow-200 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-yellow-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(TrendingUp, { className: "h-4 w-4 text-yellow-600" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 401,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 400,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Recaudación" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 403,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 399,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: [
              movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "No disponible",
              /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-pink-200 transition-colors", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-pink-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Users, { className: "h-4 w-4 text-pink-600" }, void 0, false, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 413,
                    columnNumber: 23
                  }, this) }, void 0, false, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 412,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Votos" }, void 0, false, {
                    fileName: "/home/project/src/pages/MovieDetail.tsx",
                    lineNumber: 415,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 411,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: [
                  movie.vote_count.toLocaleString(),
                  " votos"
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 417,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 410,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 405,
              columnNumber: 19
            }, this),
            movie.production_companies.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-indigo-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-indigo-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Building, { className: "h-4 w-4 text-indigo-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 426,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 425,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Productoras" }, void 0, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 428,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 424,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 ml-11", children: movie.production_companies.slice(0, 3).map(
                (company) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-2 border border-gray-200", children: /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 text-sm font-medium", children: company.name }, void 0, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 433,
                  columnNumber: 27
                }, this) }, company.id, false, {
                  fileName: "/home/project/src/pages/MovieDetail.tsx",
                  lineNumber: 432,
                  columnNumber: 21
                }, this)
              ) }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 430,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 423,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 398,
            columnNumber: 17
          }, this),
          movie.production_countries.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-orange-200 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-orange-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Globe, { className: "h-4 w-4 text-orange-600" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 446,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 445,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Países" }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 448,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 444,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 ml-11", children: movie.production_countries.map(
              (country) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-2 border border-gray-200", children: /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 text-sm font-medium", children: country.name }, void 0, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 453,
                columnNumber: 27
              }, this) }, country.iso_3166_1, false, {
                fileName: "/home/project/src/pages/MovieDetail.tsx",
                lineNumber: 452,
                columnNumber: 19
              }, this)
            ) }, void 0, false, {
              fileName: "/home/project/src/pages/MovieDetail.tsx",
              lineNumber: 450,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/MovieDetail.tsx",
            lineNumber: 443,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/MovieDetail.tsx",
          lineNumber: 362,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/MovieDetail.tsx",
        lineNumber: 288,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/MovieDetail.tsx",
      lineNumber: 199,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/MovieDetail.tsx",
      lineNumber: 198,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/MovieDetail.tsx",
    lineNumber: 146,
    columnNumber: 5
  }, this);
}
_s(MovieDetail, "Z9MENGVEm4HuOst+KE4YnS+zsdU=", false, function() {
  return [useParams, useCart];
});
_c = MovieDetail;
var _c;
$RefreshReg$(_c, "MovieDetail");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/MovieDetail.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/MovieDetail.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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VSxtQkFDWi9DLGdCQUFNdUYscUJBQXFCM0I7QUFBQUEsY0FBSSxDQUFDNEIsWUFDL0IsdUJBQUMsU0FBNkIsV0FBVSxrREFDdEMsaUNBQUMsT0FBRSxXQUFVLHFDQUNWQSxrQkFBUTNELFFBRFg7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQSxLQUhRMkQsUUFBUUMsWUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFJQTtBQUFBLFlBQ0QsS0FQSDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVFBO0FBQUEsZUFmRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQWdCQTtBQUFBLGFBakdKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFtR0E7QUFBQSxXQTdLSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBOEtFO0FBQUEsU0F2UUo7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQXdRRSxLQXpRSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBMFFFO0FBQUEsT0E5VEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQStURTtBQUVOO0FBQUMzRixHQWxiZUQsYUFBVztBQUFBLFVBQ1Y1QixXQVUyQnlCLE9BQU87QUFBQTtBQUFBZ0csS0FYbkM3RjtBQUFXLElBQUE2RjtBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VQYXJhbXMiLCJMaW5rIiwiQXJyb3dMZWZ0IiwiU3RhciIsIkNhbGVuZGFyIiwiQ2xvY2siLCJQbHVzIiwiWCIsIlBsYXkiLCJDbGFwcGVyYm9hcmQiLCJHbG9iZSIsIkRvbGxhclNpZ24iLCJUcmVuZGluZ1VwIiwiVXNlcnMiLCJCdWlsZGluZyIsIlNwYXJrbGVzIiwiSGVhcnQiLCJaYXAiLCJDaGVja0NpcmNsZSIsInRtZGJTZXJ2aWNlIiwiVmlkZW9QbGF5ZXIiLCJQcmljZUNhcmQiLCJDYXN0U2VjdGlvbiIsIkxvYWRpbmdTcGlubmVyIiwiRXJyb3JNZXNzYWdlIiwidXNlQ2FydCIsIklNQUdFX0JBU0VfVVJMIiwiQkFDS0RST1BfU0laRSIsIk1vdmllRGV0YWlsIiwiX3MiLCJpZCIsIm1vdmllIiwic2V0TW92aWUiLCJ2aWRlb3MiLCJzZXRWaWRlb3MiLCJjYXN0Iiwic2V0Q2FzdCIsInNlbGVjdGVkVmlkZW8iLCJzZXRTZWxlY3RlZFZpZGVvIiwic2hvd1ZpZGVvIiwic2V0U2hvd1ZpZGVvIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwiaXNDYXJ0SG92ZXJlZCIsInNldElzQ2FydEhvdmVyZWQiLCJzaG93Q2FydEFuaW1hdGlvbiIsInNldFNob3dDYXJ0QW5pbWF0aW9uIiwiYWRkSXRlbSIsInJlbW92ZUl0ZW0iLCJpc0luQ2FydCIsIm1vdmllSWQiLCJwYXJzZUludCIsImluQ2FydCIsImlzQW5pbWUiLCJvcmlnaW5hbF9sYW5ndWFnZSIsImdlbnJlcyIsInNvbWUiLCJnIiwibmFtZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJmZXRjaE1vdmllRGF0YSIsIm1vdmllRGF0YSIsImNyZWRpdHNEYXRhIiwiUHJvbWlzZSIsImFsbCIsImdldE1vdmllRGV0YWlscyIsImdldE1vdmllQ3JlZGl0cyIsInZpZGVvRGF0YSIsImdldE1vdmllVmlkZW9zIiwidHJhaWxlcnMiLCJyZXN1bHRzIiwiZmlsdGVyIiwidmlkZW8iLCJzaXRlIiwidHlwZSIsImxlbmd0aCIsInZpZGVvRXJyb3IiLCJjb25zb2xlIiwid2FybiIsImVyciIsImhhbmRsZUNhcnRBY3Rpb24iLCJzZXRUaW1lb3V0IiwiY2FydEl0ZW0iLCJ0aXRsZSIsInBvc3Rlcl9wYXRoIiwicmVsZWFzZV9kYXRlIiwidm90ZV9hdmVyYWdlIiwiZ2VucmVfaWRzIiwibWFwIiwiZm9ybWF0UnVudGltZSIsIm1pbnV0ZXMiLCJob3VycyIsIk1hdGgiLCJmbG9vciIsIm1pbnMiLCJiYWNrZHJvcFVybCIsImJhY2tkcm9wX3BhdGgiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0b0ZpeGVkIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwicnVudGltZSIsImdlbnJlIiwib3ZlcnZpZXciLCJ0YWdsaW5lIiwia2V5Iiwic3RhdHVzIiwidG9VcHBlckNhc2UiLCJidWRnZXQiLCJ0b0xvY2FsZVN0cmluZyIsInJldmVudWUiLCJ2b3RlX2NvdW50IiwicHJvZHVjdGlvbl9jb21wYW5pZXMiLCJzbGljZSIsImNvbXBhbnkiLCJwcm9kdWN0aW9uX2NvdW50cmllcyIsImNvdW50cnkiLCJpc29fMzE2Nl8xIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTW92aWVEZXRhaWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUGFyYW1zLCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBBcnJvd0xlZnQsIFN0YXIsIENhbGVuZGFyLCBDbG9jaywgUGx1cywgWCwgUGxheSwgQ2xhcHBlcmJvYXJkLCBHbG9iZSwgRG9sbGFyU2lnbiwgVHJlbmRpbmdVcCwgVXNlcnMsIEJ1aWxkaW5nLCBTcGFya2xlcywgSGVhcnQsIFphcCwgQ2hlY2tDaXJjbGUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgdG1kYlNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy90bWRiJztcbmltcG9ydCB7IFZpZGVvUGxheWVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9WaWRlb1BsYXllcic7XG5pbXBvcnQgeyBQcmljZUNhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL1ByaWNlQ2FyZCc7XG5pbXBvcnQgeyBDYXN0U2VjdGlvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvQ2FzdFNlY3Rpb24nO1xuaW1wb3J0IHsgTG9hZGluZ1NwaW5uZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL0xvYWRpbmdTcGlubmVyJztcbmltcG9ydCB7IEVycm9yTWVzc2FnZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JNZXNzYWdlJztcbmltcG9ydCB7IHVzZUNhcnQgfSBmcm9tICcuLi9jb250ZXh0L0NhcnRDb250ZXh0JztcbmltcG9ydCB7IElNQUdFX0JBU0VfVVJMLCBCQUNLRFJPUF9TSVpFIH0gZnJvbSAnLi4vY29uZmlnL2FwaSc7XG5pbXBvcnQgdHlwZSB7IE1vdmllRGV0YWlscywgVmlkZW8sIENhcnRJdGVtLCBDYXN0TWVtYmVyIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gTW92aWVEZXRhaWwoKSB7XG4gIGNvbnN0IHsgaWQgfSA9IHVzZVBhcmFtczx7IGlkOiBzdHJpbmcgfT4oKTtcbiAgY29uc3QgW21vdmllLCBzZXRNb3ZpZV0gPSB1c2VTdGF0ZTxNb3ZpZURldGFpbHMgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3ZpZGVvcywgc2V0VmlkZW9zXSA9IHVzZVN0YXRlPFZpZGVvW10+KFtdKTtcbiAgY29uc3QgW2Nhc3QsIHNldENhc3RdID0gdXNlU3RhdGU8Q2FzdE1lbWJlcltdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZFZpZGVvLCBzZXRTZWxlY3RlZFZpZGVvXSA9IHVzZVN0YXRlPFZpZGVvIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93VmlkZW8sIHNldFNob3dWaWRlb10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNDYXJ0SG92ZXJlZCwgc2V0SXNDYXJ0SG92ZXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93Q2FydEFuaW1hdGlvbiwgc2V0U2hvd0NhcnRBbmltYXRpb25dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCB7IGFkZEl0ZW0sIHJlbW92ZUl0ZW0sIGlzSW5DYXJ0IH0gPSB1c2VDYXJ0KCk7XG5cbiAgY29uc3QgbW92aWVJZCA9IHBhcnNlSW50KGlkIHx8ICcwJyk7XG4gIGNvbnN0IGluQ2FydCA9IGlzSW5DYXJ0KG1vdmllSWQpO1xuXG4gIC8vIERldGVjdGFyIHNpIGVzIGFuaW1lXG4gIGNvbnN0IGlzQW5pbWUgPSBtb3ZpZT8ub3JpZ2luYWxfbGFuZ3VhZ2UgPT09ICdqYScgfHwgXG4gICAgICAgICAgICAgICAgIChtb3ZpZT8uZ2VucmVzICYmIG1vdmllLmdlbnJlcy5zb21lKGcgPT4gZy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FuaW1hdCcpKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaE1vdmllRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgIFxuICAgICAgICAvLyBGZXRjaCBtb3ZpZSBkZXRhaWxzIGFuZCBjcmVkaXRzIGZpcnN0XG4gICAgICAgIGNvbnN0IFttb3ZpZURhdGEsIGNyZWRpdHNEYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICB0bWRiU2VydmljZS5nZXRNb3ZpZURldGFpbHMobW92aWVJZCksXG4gICAgICAgICAgdG1kYlNlcnZpY2UuZ2V0TW92aWVDcmVkaXRzKG1vdmllSWQpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHNldE1vdmllKG1vdmllRGF0YSk7XG4gICAgICAgIHNldENhc3QoY3JlZGl0c0RhdGEuY2FzdCB8fCBbXSk7XG4gICAgICAgIFxuICAgICAgICAvLyBGZXRjaCB2aWRlb3Mgc2VwYXJhdGVseSB3aXRoIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgdmlkZW9EYXRhID0gYXdhaXQgdG1kYlNlcnZpY2UuZ2V0TW92aWVWaWRlb3MobW92aWVJZCk7XG4gICAgICAgICAgY29uc3QgdHJhaWxlcnMgPSB2aWRlb0RhdGEucmVzdWx0cy5maWx0ZXIoXG4gICAgICAgICAgICB2aWRlbyA9PiB2aWRlby5zaXRlID09PSAnWW91VHViZScgJiYgKHZpZGVvLnR5cGUgPT09ICdUcmFpbGVyJyB8fCB2aWRlby50eXBlID09PSAnVGVhc2VyJylcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldFZpZGVvcyh0cmFpbGVycyk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHRyYWlsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldFNlbGVjdGVkVmlkZW8odHJhaWxlcnNbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAodmlkZW9FcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gdmlkZW9zIGF2YWlsYWJsZSBmb3IgbW92aWUgJHttb3ZpZUlkfWApO1xuICAgICAgICAgIHNldFZpZGVvcyhbXSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzZXRFcnJvcignRXJyb3IgYWwgY2FyZ2FyIGxvcyBkZXRhbGxlcyBkZSBsYSBwZWzDrWN1bGEuJyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIG1vdmllIGRldGFpbHM6JywgZXJyKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAobW92aWVJZCkge1xuICAgICAgZmV0Y2hNb3ZpZURhdGEoKTtcbiAgICB9XG4gIH0sIFttb3ZpZUlkXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FydEFjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoIW1vdmllKSByZXR1cm47XG5cbiAgICBzZXRTaG93Q2FydEFuaW1hdGlvbih0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldFNob3dDYXJ0QW5pbWF0aW9uKGZhbHNlKSwgMjAwMCk7XG5cbiAgICBjb25zdCBjYXJ0SXRlbTogQ2FydEl0ZW0gPSB7XG4gICAgICBpZDogbW92aWUuaWQsXG4gICAgICB0aXRsZTogbW92aWUudGl0bGUsXG4gICAgICBwb3N0ZXJfcGF0aDogbW92aWUucG9zdGVyX3BhdGgsXG4gICAgICB0eXBlOiAnbW92aWUnLFxuICAgICAgcmVsZWFzZV9kYXRlOiBtb3ZpZS5yZWxlYXNlX2RhdGUsXG4gICAgICB2b3RlX2F2ZXJhZ2U6IG1vdmllLnZvdGVfYXZlcmFnZSxcbiAgICAgIG9yaWdpbmFsX2xhbmd1YWdlOiBtb3ZpZS5vcmlnaW5hbF9sYW5ndWFnZSxcbiAgICAgIGdlbnJlX2lkczogbW92aWUuZ2VucmVzLm1hcChnID0+IGcuaWQpLFxuICAgIH07XG5cbiAgICBpZiAoaW5DYXJ0KSB7XG4gICAgICByZW1vdmVJdGVtKG1vdmllLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkSXRlbShjYXJ0SXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZvcm1hdFJ1bnRpbWUgPSAobWludXRlczogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBjb25zdCBtaW5zID0gbWludXRlcyAlIDYwO1xuICAgIHJldHVybiBgJHtob3Vyc31oICR7bWluc31tYDtcbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICAgIDxMb2FkaW5nU3Bpbm5lciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChlcnJvciB8fCAhbW92aWUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS01MFwiPlxuICAgICAgICA8RXJyb3JNZXNzYWdlIG1lc3NhZ2U9e2Vycm9yIHx8ICdQZWzDrWN1bGEgbm8gZW5jb250cmFkYSd9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgYmFja2Ryb3BVcmwgPSBtb3ZpZS5iYWNrZHJvcF9wYXRoXG4gICAgPyBgJHtJTUFHRV9CQVNFX1VSTH0vJHtCQUNLRFJPUF9TSVpFfSR7bW92aWUuYmFja2Ryb3BfcGF0aH1gXG4gICAgOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODk1OTk4NDMyNTMtYzc2Y2M0YmNiOGNmP3c9MTI4MCZoPTcyMCZmaXQ9Y3JvcCZjcm9wPWNlbnRlcic7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICB7LyogSGVybyBTZWN0aW9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTk2IG1kOmgtWzUwMHB4XSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctY292ZXIgYmctY2VudGVyXCJcbiAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtiYWNrZHJvcFVybH0pYCB9fVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdCBmcm9tLWJsYWNrLzgwIHZpYS1ibGFjay80MCB0by1ibGFjay8yMFwiIC8+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtZnVsbCBmbGV4IGl0ZW1zLWVuZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcGItOCB3LWZ1bGxcIj5cbiAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgIHRvPVwiL21vdmllc1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LXdoaXRlLzgwIGhvdmVyOnRleHQtd2hpdGUgbWItNCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxBcnJvd0xlZnQgY2xhc3NOYW1lPVwibXItMiBoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgVm9sdmVyIGEgcGVsw61jdWxhc1xuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC00eGwgbWQ6dGV4dC02eGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItNFwiPlxuICAgICAgICAgICAgICB7bW92aWUudGl0bGV9XG4gICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtNCB0ZXh0LXdoaXRlLzkwIG1iLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxTdGFyIGNsYXNzTmFtZT1cImgtNSB3LTUgZmlsbC15ZWxsb3ctNDAwIHRleHQteWVsbG93LTQwMCBtci0xXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPnttb3ZpZS52b3RlX2F2ZXJhZ2UudG9GaXhlZCgxKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPENhbGVuZGFyIGNsYXNzTmFtZT1cImgtNSB3LTUgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e25ldyBEYXRlKG1vdmllLnJlbGVhc2VfZGF0ZSkuZ2V0RnVsbFllYXIoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPENsb2NrIGNsYXNzTmFtZT1cImgtNSB3LTUgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2Zvcm1hdFJ1bnRpbWUobW92aWUucnVudGltZSl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yIG1iLTZcIj5cbiAgICAgICAgICAgICAge21vdmllLmdlbnJlcy5tYXAoKGdlbnJlKSA9PiAoXG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGtleT17Z2VucmUuaWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEgYmctd2hpdGUvMjAgYmFja2Ryb3AtYmx1ci1zbSByb3VuZGVkLWZ1bGwgdGV4dC1zbSB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Z2VucmUubmFtZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktOFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTMgZ2FwLThcIj5cbiAgICAgICAgICB7LyogTWFpbiBDb250ZW50ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMlwiPlxuICAgICAgICAgICAgey8qIE92ZXJ2aWV3ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLXdoaXRlIHRvLWdyYXktNTAgcm91bmRlZC0yeGwgc2hhZG93LXhsIGJvcmRlciBib3JkZXItZ3JheS0xMDAgcC04IG1iLTggdHJhbnNmb3JtIGhvdmVyOnNjYWxlLVsxLjAyXSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi02XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MDAgdG8tcHVycGxlLTUwMCBwLTMgcm91bmRlZC14bCBtci00IHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0yeGxcIj7wn5OaPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNjAwIHRvLXB1cnBsZS02MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAgICAgIFNpbm9wc2lzXG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgbGVhZGluZy1yZWxheGVkIHRleHQtbGcgbWItNFwiPlxuICAgICAgICAgICAgICAgIHttb3ZpZS5vdmVydmlldyB8fCAnU2luIGRlc2NyaXBjacOzbiBkaXNwb25pYmxlLid9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAge21vdmllLnRhZ2xpbmUgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNiBwLTQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAgdG8tcHVycGxlLTUwIHJvdW5kZWQteGwgYm9yZGVyLWwtNCBib3JkZXItZ3JhZGllbnQtdG8tYiBmcm9tLWJsdWUtNDAwIHRvLXB1cnBsZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgaXRhbGljIHRleHQtbGcgZm9udC1tZWRpdW1cIj5cInttb3ZpZS50YWdsaW5lfVwiPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBDYXN0IFNlY3Rpb24gKi99XG4gICAgICAgICAgICA8Q2FzdFNlY3Rpb24gY2FzdD17Y2FzdH0gdGl0bGU9XCJSZXBhcnRvIFByaW5jaXBhbFwiIC8+XG5cbiAgICAgICAgICAgIHsvKiBWaWRlb3MgKi99XG4gICAgICAgICAgICB7dmlkZW9zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgc2hhZG93LXNtIHAtNiBtYi02XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTRcIj5UcsOhaWxlcnMgeSBWaWRlb3M8L2gyPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHtzaG93VmlkZW8gJiYgc2VsZWN0ZWRWaWRlbyA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8VmlkZW9QbGF5ZXIgdmlkZW9LZXk9e3NlbGVjdGVkVmlkZW8ua2V5fSB0aXRsZT17c2VsZWN0ZWRWaWRlby5uYW1lfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1ZpZGVvKHRydWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBhc3BlY3QtdmlkZW8gYmctZ3JheS05MDAgcm91bmRlZC1sZyBvdmVyZmxvdy1oaWRkZW4gZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1jb3ZlciBiZy1jZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogc2VsZWN0ZWRWaWRlbyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGB1cmwoaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJHtzZWxlY3RlZFZpZGVvLmtleX0vbWF4cmVzZGVmYXVsdC5qcGcpYCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGB1cmwoJHtiYWNrZHJvcFVybH0pYCBcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctYmxhY2svNTAgZ3JvdXAtaG92ZXI6YmctYmxhY2svNDAgdHJhbnNpdGlvbi1jb2xvcnNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1yZWQtNjAwIGhvdmVyOmJnLXJlZC03MDAgcm91bmRlZC1mdWxsIHAtNCB0cmFuc2l0aW9uLWNvbG9ycyBncm91cC1ob3ZlcjpzY2FsZS0xMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFBsYXkgY2xhc3NOYW1lPVwiaC04IHctOCB0ZXh0LXdoaXRlIG1sLTFcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tNCBsZWZ0LTQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj5SZXByb2R1Y2lyIFRyw6FpbGVyPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBvcGFjaXR5LTc1XCI+e3NlbGVjdGVkVmlkZW8/Lm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7dmlkZW9zLmxlbmd0aCA+IDEgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgICAgIHt2aWRlb3MubWFwKCh2aWRlbykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dmlkZW8uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkVmlkZW8odmlkZW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93VmlkZW8odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQtbGcgYm9yZGVyLTIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmlkZW8/LmlkID09PSB2aWRlby5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1ibHVlLTUwMCBiZy1ibHVlLTUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1ncmF5LTIwMCBob3Zlcjpib3JkZXItYmx1ZS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwXCI+e3ZpZGVvLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+e3ZpZGVvLnR5cGV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTaWRlYmFyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLXdoaXRlIHRvLWdyYXktNTAgcm91bmRlZC0yeGwgc2hhZG93LXhsIGJvcmRlciBib3JkZXItZ3JheS0xMDAgb3ZlcmZsb3ctaGlkZGVuIHN0aWNreSB0b3AtOFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTYwMCB0by1wdXJwbGUtNjAwIHAtNiB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzIwIHAtMiByb3VuZGVkLWxnIG1yLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1sZ1wiPvCfjqw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIERldGFsbGVzIGRlIGxhIFBlbMOtY3VsYVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTZcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDYXJ0QWN0aW9ufVxuICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRJc0NhcnRIb3ZlcmVkKHRydWUpfVxuICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRJc0NhcnRIb3ZlcmVkKGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBtYi02IHB4LTYgcHktNSByb3VuZGVkLTJ4bCBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zZm9ybSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gJHtcbiAgICAgICAgICAgICAgICAgIGluQ2FydFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNTAwIHZpYS1lbWVyYWxkLTUwMCB0by10ZWFsLTUwMCBob3Zlcjpmcm9tLWdyZWVuLTYwMCBob3Zlcjp2aWEtZW1lcmFsZC02MDAgaG92ZXI6dG8tdGVhbC02MDAgdGV4dC13aGl0ZSBzaGFkb3ctMnhsIHNjYWxlLTEwNSdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAwIHZpYS1wdXJwbGUtNTAwIHRvLXBpbmstNTAwIGhvdmVyOmZyb20tYmx1ZS02MDAgaG92ZXI6dmlhLXB1cnBsZS02MDAgaG92ZXI6dG8tcGluay02MDAgdGV4dC13aGl0ZSBzaGFkb3cteGwnXG4gICAgICAgICAgICAgICAgfSAke2lzQ2FydEhvdmVyZWQgPyAnc2NhbGUtMTEwIHNoYWRvdy0yeGwnIDogJyd9ICR7c2hvd0NhcnRBbmltYXRpb24gPyAnYW5pbWF0ZS1wdWxzZScgOiAnJ31gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7LyogQW5pbWF0ZWQgYmFja2dyb3VuZCBlZmZlY3QgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXIgZnJvbS13aGl0ZS8yMCB0by10cmFuc3BhcmVudCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgJHtcbiAgICAgICAgICAgICAgICAgIGlzQ2FydEhvdmVyZWQgPyAnYW5pbWF0ZS1wdWxzZScgOiAnJ1xuICAgICAgICAgICAgICAgIH1gfSAvPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHsvKiBGbG9hdGluZyBpY29ucyAqL31cbiAgICAgICAgICAgICAgICB7aXNDYXJ0SG92ZXJlZCAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgbGVmdC00IGgtNCB3LTQgdGV4dC15ZWxsb3ctMzAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPEhlYXJ0IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTQgaC00IHctNCB0ZXh0LXBpbmstMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIGxlZnQtNiBoLTQgdy00IHRleHQtYmx1ZS0zMDAgYW5pbWF0ZS1ib3VuY2UgZGVsYXktMTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPFN0YXIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTIgcmlnaHQtNiBoLTQgdy00IHRleHQteWVsbG93LTMwMCBhbmltYXRlLXB1bHNlIGRlbGF5LTIwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHtpbkNhcnQgPyAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9e2Btci0zIGgtNiB3LTYgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwIHJlbGF0aXZlIHotMTAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0NhcnRIb3ZlcmVkID8gJ3JvdGF0ZS05MCBzY2FsZS0xMjUnIDogJydcbiAgICAgICAgICAgICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgdGV4dC1sZ1wiPlJldGlyYXIgZGVsIENhcnJpdG88L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPXtgbXItMyBoLTYgdy02IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCByZWxhdGl2ZSB6LTEwICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNDYXJ0SG92ZXJlZCA/ICdyb3RhdGUtMTgwIHNjYWxlLTEyNScgOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCB0ZXh0LWxnXCI+QWdyZWdhciBhbCBDYXJyaXRvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogU3VjY2VzcyBpbmRpY2F0b3IgKi99XG4gICAgICAgICAgICAgICAge2luQ2FydCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMiAtcmlnaHQtMiBiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNDAwIHRvLWVtZXJhbGQtNDAwIHRleHQtd2hpdGUgcC0yIHJvdW5kZWQtZnVsbCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cblxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBQcmljZSBDYXJkICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTZcIj5cbiAgICAgICAgICAgICAgICA8UHJpY2VDYXJkIFxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm1vdmllXCIgXG4gICAgICAgICAgICAgICAgICBpc0FuaW1lPXtpc0FuaW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLWJsdWUtMjAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ibHVlLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDbGFwcGVyYm9hcmQgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LWJsdWUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5Fc3RhZG88L2gzPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGZvbnQtbWVkaXVtIG1sLTExXCI+e21vdmllLnN0YXR1c308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLXB1cnBsZS0yMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXB1cnBsZS0xMDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LXB1cnBsZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPklkaW9tYSBPcmlnaW5hbDwvaDM+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW0gbWwtMTFcIj57bW92aWUub3JpZ2luYWxfbGFuZ3VhZ2UudG9VcHBlckNhc2UoKX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLWdyZWVuLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tMTAwIHAtMiByb3VuZGVkLWxnIG1yLTMgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPERvbGxhclNpZ24gY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LWdyZWVuLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwXCI+UHJlc3VwdWVzdG88L2gzPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGZvbnQtbWVkaXVtIG1sLTExXCI+XG4gICAgICAgICAgICAgICAgICAgIHttb3ZpZS5idWRnZXQgPiAwXG4gICAgICAgICAgICAgICAgICAgICAgPyBgJCR7bW92aWUuYnVkZ2V0LnRvTG9jYWxlU3RyaW5nKCl9YFxuICAgICAgICAgICAgICAgICAgICAgIDogJ05vIGRpc3BvbmlibGUnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXIteWVsbG93LTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmcteWVsbG93LTEwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxUcmVuZGluZ1VwIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC15ZWxsb3ctNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5SZWNhdWRhY2nDs248L2gzPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGZvbnQtbWVkaXVtIG1sLTExXCI+XG4gICAgICAgICAgICAgICAgICAgIHttb3ZpZS5yZXZlbnVlID4gMFxuICAgICAgICAgICAgICAgICAgICAgID8gYCQke21vdmllLnJldmVudWUudG9Mb2NhbGVTdHJpbmcoKX1gXG4gICAgICAgICAgICAgICAgICAgICAgOiAnTm8gZGlzcG9uaWJsZSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1waW5rLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcGluay0xMDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8VXNlcnMgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LXBpbmstNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5Wb3RvczwvaDM+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW0gbWwtMTFcIj5cbiAgICAgICAgICAgICAgICAgICAge21vdmllLnZvdGVfY291bnQudG9Mb2NhbGVTdHJpbmcoKX0gdm90b3NcbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICB7bW92aWUucHJvZHVjdGlvbl9jb21wYW5pZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItaW5kaWdvLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWluZGlnby0xMDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdWlsZGluZyBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtaW5kaWdvLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPlByb2R1Y3RvcmFzPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG1sLTExXCI+XG4gICAgICAgICAgICAgICAgICAgICAge21vdmllLnByb2R1Y3Rpb25fY29tcGFuaWVzLnNsaWNlKDAsIDMpLm1hcCgoY29tcGFueSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2NvbXBhbnkuaWR9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgcC0yIGJvcmRlciBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjb21wYW55Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge21vdmllLnByb2R1Y3Rpb25fY291bnRyaWVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLW9yYW5nZS0yMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1vcmFuZ2UtMTAwIHAtMiByb3VuZGVkLWxnIG1yLTMgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LW9yYW5nZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5QYcOtc2VzPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG1sLTExXCI+XG4gICAgICAgICAgICAgICAgICAgICAge21vdmllLnByb2R1Y3Rpb25fY291bnRyaWVzLm1hcCgoY291bnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2NvdW50cnkuaXNvXzMxNjZfMX0gY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC1sZyBwLTIgYm9yZGVyIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIHRleHQtc20gZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y291bnRyeS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICApO1xufSJdLCJmaWxlIjoiL2hvbWUvcHJvamVjdC9zcmMvcGFnZXMvTW92aWVEZXRhaWwudHN4In0=