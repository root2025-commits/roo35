import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/TVDetail.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/TVDetail.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { useParams, Link } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { ArrowLeft, Star, Calendar, Monitor, Plus, X, Play, ChevronDown, Rocket, Clapperboard, Clock2, Globe, Users, Building, MapPin, Sparkles, Heart, Zap, CheckCircle } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { tmdbService } from "/src/services/tmdb.ts";
import { VideoPlayer } from "/src/components/VideoPlayer.tsx";
import { PriceCard } from "/src/components/PriceCard.tsx";
import { CastSection } from "/src/components/CastSection.tsx";
import { LoadingSpinner } from "/src/components/LoadingSpinner.tsx";
import { ErrorMessage } from "/src/components/ErrorMessage.tsx";
import { useCart } from "/src/context/CartContext.tsx";
import { AdminContext } from "/src/context/AdminContext.tsx";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "/src/config/api.ts";
export function TVDetail() {
  _s();
  const { id } = useParams();
  const adminContext = React.useContext(AdminContext);
  const [tvShow, setTVShow] = useState(null);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [showSeasonSelector, setShowSeasonSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const { addItem, removeItem, updateSeasons, isInCart, getItemSeasons } = useCart();
  const seriesPrice = adminContext?.state?.prices?.seriesPrice || 300;
  const tvId = parseInt(id || "0");
  const inCart = isInCart(tvId);
  const isAnime = tvShow?.original_language === "ja" || tvShow?.genres && tvShow.genres.some((g) => g.name.toLowerCase().includes("animat")) || tvShow?.name?.toLowerCase().includes("anime");
  useEffect(() => {
    if (inCart) {
      const savedSeasons = getItemSeasons(tvId);
      setSelectedSeasons(savedSeasons);
    }
  }, [inCart, tvId, getItemSeasons]);
  useEffect(() => {
    const fetchTVData = async () => {
      try {
        setLoading(true);
        const [tvData, creditsData] = await Promise.all(
          [
            tmdbService.getTVShowDetails(tvId),
            tmdbService.getTVShowCredits(tvId)
          ]
        );
        setTVShow(tvData);
        setCast(creditsData.cast || []);
        try {
          const videoData = await tmdbService.getTVShowVideos(tvId);
          const trailers = videoData.results.filter(
            (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
          );
          setVideos(trailers);
          if (trailers.length > 0) {
            setSelectedVideo(trailers[0]);
          }
        } catch (videoError) {
          console.warn(`No videos available for TV show ${tvId}`);
          setVideos([]);
        }
      } catch (err) {
        setError("Error al cargar los detalles de la serie.");
        console.error("Error fetching TV show details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (tvId) {
      fetchTVData();
    }
  }, [tvId]);
  const handleSeasonToggle = (seasonNumber) => {
    setSelectedSeasons((prev) => {
      if (prev.includes(seasonNumber)) {
        return prev.filter((s) => s !== seasonNumber);
      } else {
        return [...prev, seasonNumber];
      }
    });
  };
  const selectAllSeasons = () => {
    if (!tvShow) return;
    const allSeasonNumbers = tvShow.seasons.filter((season) => season.season_number > 0).map((season) => season.season_number);
    setSelectedSeasons(allSeasonNumbers);
  };
  const clearAllSeasons = () => {
    setSelectedSeasons([]);
  };
  const isAddToCartEnabled = () => {
    if (!tvShow) return false;
    const validSeasons2 = tvShow.seasons.filter((season) => season.season_number > 0);
    return validSeasons2.length > 0;
  };
  const handleCartAction = () => {
    if (!tvShow) return;
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 2e3);
    const validSeasons2 = tvShow.seasons.filter((season) => season.season_number > 0);
    let seasonsToAdd = selectedSeasons;
    if (selectedSeasons.length === 0 && validSeasons2.length > 0) {
      seasonsToAdd = [1];
      setSelectedSeasons([1]);
    }
    const cartItem = {
      id: tvShow.id,
      title: tvShow.name,
      poster_path: tvShow.poster_path,
      type: "tv",
      first_air_date: tvShow.first_air_date,
      vote_average: tvShow.vote_average,
      selectedSeasons: seasonsToAdd,
      original_language: tvShow.original_language,
      genre_ids: tvShow.genres.map((g) => g.id)
    };
    if (inCart) {
      removeItem(tvShow.id);
    } else {
      addItem(cartItem);
    }
  };
  const handleSeasonsUpdate = () => {
    if (inCart && tvShow) {
      updateSeasons(tvShow.id, selectedSeasons);
    }
  };
  useEffect(() => {
    if (inCart) {
      handleSeasonsUpdate();
    }
  }, [selectedSeasons, inCart]);
  useEffect(() => {
    if (tvShow && !inCart && selectedSeasons.length === 0) {
      const validSeasons2 = tvShow.seasons.filter((season) => season.season_number > 0);
      if (validSeasons2.length >= 1) {
        setSelectedSeasons([1]);
      }
    }
  }, [tvShow, inCart]);
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
      fileName: "/home/project/src/pages/TVDetail.tsx",
      lineNumber: 204,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/TVDetail.tsx",
      lineNumber: 203,
      columnNumber: 7
    }, this);
  }
  if (error || !tvShow) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(ErrorMessage, { message: error || "Serie no encontrada" }, void 0, false, {
      fileName: "/home/project/src/pages/TVDetail.tsx",
      lineNumber: 212,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/TVDetail.tsx",
      lineNumber: 211,
      columnNumber: 7
    }, this);
  }
  const backdropUrl = tvShow.backdrop_path ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${tvShow.backdrop_path}` : "https://images.unsplash.com/photo-1489599843253-c76cc4bcb8cf?w=1280&h=720&fit=crop&crop=center";
  const validSeasons = tvShow.seasons.filter((season) => season.season_number > 0);
  const hasMultipleSeasons = validSeasons.length > 1;
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
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 228,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" }, void 0, false, {
        fileName: "/home/project/src/pages/TVDetail.tsx",
        lineNumber: 232,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative h-full flex items-end", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full", children: [
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/tv",
            className: "inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors",
            children: [
              /* @__PURE__ */ jsxDEV(ArrowLeft, { className: "mr-2 h-4 w-4" }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 240,
                columnNumber: 15
              }, this),
              "Volver a series"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 236,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-4", children: tvShow.name }, void 0, false, {
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 244,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-4 text-white/90 mb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Star, { className: "h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 250,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: tvShow.vote_average.toFixed(1) }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 251,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 249,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Calendar, { className: "h-5 w-5 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 254,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: new Date(tvShow.first_air_date).getFullYear() }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 255,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 253,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Monitor, { className: "h-5 w-5 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 258,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              tvShow.number_of_seasons,
              " temporadas"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 259,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 257,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 248,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2 mb-6", children: tvShow.genres.map(
          (genre) => /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: "px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white",
              children: genre.name
            },
            genre.id,
            false,
            {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 265,
              columnNumber: 15
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 263,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/TVDetail.tsx",
        lineNumber: 235,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/TVDetail.tsx",
        lineNumber: 234,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/TVDetail.tsx",
      lineNumber: 227,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-4 shadow-lg", children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl", children: "📚" }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 285,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 284,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent", children: "Sinopsis" }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 287,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 283,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 leading-relaxed text-lg mb-4", children: tvShow.overview || "Sin descripción disponible." }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 291,
            columnNumber: 15
          }, this),
          tvShow.tagline && /* @__PURE__ */ jsxDEV("div", { className: "mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-gradient-to-b from-purple-400 to-pink-400", children: /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 italic text-lg font-medium", children: [
            '"',
            tvShow.tagline,
            '"'
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 296,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 295,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 282,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(CastSection, { cast, title: "Reparto Principal" }, void 0, false, {
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 302,
          columnNumber: 13
        }, this),
        videos.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg shadow-sm p-6 mb-6", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Tráilers y Videos" }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 307,
            columnNumber: 17
          }, this),
          showVideo && selectedVideo ? /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV(VideoPlayer, { videoKey: selectedVideo.key, title: selectedVideo.name }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 311,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 310,
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
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 319,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 327,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-red-600 hover:bg-red-700 rounded-full p-4 transition-colors group-hover:scale-110", children: /* @__PURE__ */ jsxDEV(Play, { className: "h-8 w-8 text-white ml-1" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 330,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 329,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 328,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-4 left-4 text-white", children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "font-medium", children: "Reproducir Tráiler" }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 334,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm opacity-75", children: selectedVideo?.name }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 335,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 333,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 315,
              columnNumber: 21
            },
            this
          ) }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 314,
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
                className: `p-3 rounded-lg border-2 text-left transition-colors ${selectedVideo?.id === video.id ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-900", children: video.name }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 356,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-600", children: video.type }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 357,
                    columnNumber: 25
                  }, this)
                ]
              },
              video.id,
              true,
              {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 344,
                columnNumber: 17
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 342,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 306,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/TVDetail.tsx",
        lineNumber: 280,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold flex items-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-2 rounded-lg mr-3", children: /* @__PURE__ */ jsxDEV("span", { className: "text-lg", children: "📺" }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 372,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 371,
              columnNumber: 19
            }, this),
            "Detalles de la Serie"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 370,
            columnNumber: 17
          }, this),
          tvShow.number_of_episodes > 50 && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-5 bg-gradient-to-r from-amber-50/90 to-orange-50/90 backdrop-blur-md rounded-2xl border-2 border-amber-300/50 shadow-lg", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl mr-4 shadow-lg", children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl", children: "📊" }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 382,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 381,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h4", { className: "text-lg font-bold text-amber-900", children: "Información de Precios" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 385,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-amber-700 font-medium", children: "Serie con episodios extendidos" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 386,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 384,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 380,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-lg mr-2", children: "📺" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 393,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-blue-800", children: "Total de Episodios" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 394,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 392,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-black text-blue-900", children: tvShow.number_of_episodes }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 396,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 391,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-lg mr-2", children: "💰" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 400,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-green-800", children: "Precio por Temporada" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 401,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 399,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-black text-green-900", children: [
                    "$",
                    seriesPrice.toLocaleString(),
                    " CUP"
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 403,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 398,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 390,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 border-2 border-amber-300 shadow-md", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-amber-500 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV("span", { className: "text-white text-sm font-bold", children: "ℹ️" }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 410,
                    columnNumber: 29
                  }, this) }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 409,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("h5", { className: "text-base font-bold text-amber-900", children: "Política de Precios para Series Extensas" }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 412,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 408,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-sm text-amber-800 leading-relaxed", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-start", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-green-600 mr-2 mt-0.5", children: "✅" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 416,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { children: [
                      /* @__PURE__ */ jsxDEV("strong", { children: "Hasta 50 episodios:" }, void 0, false, {
                        fileName: "/home/project/src/pages/TVDetail.tsx",
                        lineNumber: 417,
                        columnNumber: 32
                      }, this),
                      " Se considera como 1 temporada completa"
                    ] }, void 0, true, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 417,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 415,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-start", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-blue-600 mr-2 mt-0.5", children: "📋" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 420,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { children: [
                      /* @__PURE__ */ jsxDEV("strong", { children: "Más de 50 episodios:" }, void 0, false, {
                        fileName: "/home/project/src/pages/TVDetail.tsx",
                        lineNumber: 421,
                        columnNumber: 32
                      }, this),
                      " Cada temporada mantiene el precio estándar de ",
                      /* @__PURE__ */ jsxDEV("strong", { children: [
                        "$",
                        seriesPrice.toLocaleString(),
                        " CUP"
                      ] }, void 0, true, {
                        fileName: "/home/project/src/pages/TVDetail.tsx",
                        lineNumber: 421,
                        columnNumber: 116
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 421,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 419,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-start", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-purple-600 mr-2 mt-0.5", children: "🎯" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 424,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { children: [
                      /* @__PURE__ */ jsxDEV("strong", { children: "Precio justo:" }, void 0, false, {
                        fileName: "/home/project/src/pages/TVDetail.tsx",
                        lineNumber: 425,
                        columnNumber: 32
                      }, this),
                      " Pagas solo por las temporadas que selecciones, sin costos adicionales"
                    ] }, void 0, true, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 425,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 423,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 414,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 407,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 border-2 border-green-300", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold text-green-800 mb-2", children: "💡 Ejemplo de Cálculo para esta Serie:" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 432,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-2 border border-green-200", children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-green-700", children: "1 Temporada" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 435,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-green-900", children: [
                      "$",
                      seriesPrice.toLocaleString(),
                      " CUP"
                    ] }, void 0, true, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 436,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 434,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-2 border border-blue-200", children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-blue-700", children: "2 Temporadas" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 439,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-blue-900", children: [
                      "$",
                      (seriesPrice * 2).toLocaleString(),
                      " CUP"
                    ] }, void 0, true, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 440,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 438,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-2 border border-purple-200", children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-purple-700", children: [
                      "Todas (",
                      tvShow.number_of_seasons,
                      ")"
                    ] }, void 0, true, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 443,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-purple-900", children: [
                      "$",
                      (seriesPrice * tvShow.number_of_seasons).toLocaleString(),
                      " CUP"
                    ] }, void 0, true, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 444,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 442,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 433,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 431,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 430,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 389,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 379,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 369,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
          hasMultipleSeasons && /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 mb-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-100 p-2 rounded-lg mr-3", children: /* @__PURE__ */ jsxDEV("span", { className: "text-sm", children: "📝" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 461,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 460,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-purple-900", children: "Seleccionar Temporadas" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 463,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 459,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-purple-700 ml-11", children: "Elige las temporadas que deseas agregar a tu pedido" }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 465,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 458,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setShowSeasonSelector(!showSeasonSelector),
                className: "w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 border border-purple-200 hover:border-purple-300",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-purple-900", children: selectedSeasons.length > 0 && /* @__PURE__ */ jsxDEV("span", { className: "bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium", children: [
                    selectedSeasons.length,
                    " seleccionadas"
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 476,
                    columnNumber: 23
                  }, this) }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 474,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV(ChevronDown, { className: `h-5 w-5 text-purple-600 transition-transform duration-300 ${showSeasonSelector ? "rotate-180" : ""}` }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 481,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 470,
                columnNumber: 19
              },
              this
            ),
            showSeasonSelector && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 space-y-3 max-h-64 overflow-y-auto bg-white rounded-xl border border-gray-200 p-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 mb-4", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: selectAllSeasons,
                    className: "text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg font-medium transition-colors",
                    children: "Todas"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 489,
                    columnNumber: 25
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: clearAllSeasons,
                    className: "text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors",
                    children: "Ninguna"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 495,
                    columnNumber: 25
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 488,
                columnNumber: 23
              }, this),
              validSeasons.map(
                (season) => /* @__PURE__ */ jsxDEV(
                  "label",
                  {
                    className: "flex items-center p-3 hover:bg-purple-50 rounded-xl cursor-pointer transition-colors border border-gray-100 hover:border-purple-200",
                    children: [
                      /* @__PURE__ */ jsxDEV(
                        "input",
                        {
                          type: "checkbox",
                          checked: selectedSeasons.includes(season.season_number),
                          onChange: () => handleSeasonToggle(season.season_number),
                          className: "mr-4 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/home/project/src/pages/TVDetail.tsx",
                          lineNumber: 508,
                          columnNumber: 29
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-gray-900", children: season.name }, void 0, false, {
                          fileName: "/home/project/src/pages/TVDetail.tsx",
                          lineNumber: 515,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-600 mt-1", children: [
                          season.episode_count,
                          " episodios",
                          season.air_date && ` • ${new Date(season.air_date).getFullYear()}`
                        ] }, void 0, true, {
                          fileName: "/home/project/src/pages/TVDetail.tsx",
                          lineNumber: 518,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/home/project/src/pages/TVDetail.tsx",
                        lineNumber: 514,
                        columnNumber: 29
                      }, this)
                    ]
                  },
                  season.id,
                  true,
                  {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 504,
                    columnNumber: 21
                  },
                  this
                )
              )
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 487,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 457,
            columnNumber: 17
          }, this),
          !hasMultipleSeasons && validSeasons.length === 1 && /* @__PURE__ */ jsxDEV("div", { className: "mb-6", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-green-100 p-2 rounded-lg mr-3", children: /* @__PURE__ */ jsxDEV("span", { className: "text-sm", children: "✅" }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 536,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 535,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-green-900", children: "Temporada Única" }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 538,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 534,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-green-700 ml-11 mb-3", children: "Esta serie tiene una sola temporada que se incluirá automáticamente" }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 540,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "ml-11 bg-white rounded-lg p-3 border border-green-200", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-900", children: validSeasons[0].name }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 544,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-600", children: [
                validSeasons[0].episode_count,
                " episodios",
                validSeasons[0].air_date && ` • ${new Date(validSeasons[0].air_date).getFullYear()}`
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 545,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 543,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 533,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 532,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleCartAction,
                onMouseEnter: () => setIsCartHovered(true),
                onMouseLeave: () => setIsCartHovered(false),
                disabled: !isAddToCartEnabled(),
                className: `w-full mb-6 px-6 py-5 rounded-2xl font-bold transition-all duration-500 flex items-center justify-center transform relative overflow-hidden ${!isAddToCartEnabled() ? "bg-gray-300 text-gray-500 cursor-not-allowed" : inCart ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white shadow-2xl scale-105" : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-xl"} ${isCartHovered ? "scale-110 shadow-2xl" : ""} ${showCartAnimation ? "animate-pulse" : ""}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 ${isCartHovered ? "animate-pulse" : ""}` }, void 0, false, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 569,
                    columnNumber: 17
                  }, this),
                  isCartHovered && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "absolute top-2 left-4 h-4 w-4 text-yellow-300 animate-bounce" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 576,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Heart, { className: "absolute top-2 right-4 h-4 w-4 text-pink-300 animate-pulse" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 577,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Zap, { className: "absolute bottom-2 left-6 h-4 w-4 text-blue-300 animate-bounce delay-100" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 578,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Star, { className: "absolute bottom-2 right-6 h-4 w-4 text-yellow-300 animate-pulse delay-200" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 579,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 575,
                    columnNumber: 21
                  }, this),
                  inCart ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(X, { className: `mr-3 h-6 w-6 transition-transform duration-300 relative z-10 ${isCartHovered ? "rotate-90 scale-125" : ""}` }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 585,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "relative z-10 text-lg", children: "Retirar del Carrito" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 588,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 584,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Plus, { className: `mr-3 h-6 w-6 transition-transform duration-300 relative z-10 ${isCartHovered ? "rotate-180 scale-125" : ""}` }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 592,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "relative z-10 text-lg", children: "Agregar al Carrito" }, void 0, false, {
                      fileName: "/home/project/src/pages/TVDetail.tsx",
                      lineNumber: 595,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/TVDetail.tsx",
                    lineNumber: 591,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 555,
                columnNumber: 17
              },
              this
            ),
            inCart && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white p-2 rounded-full shadow-lg", children: /* @__PURE__ */ jsxDEV(CheckCircle, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 603,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 602,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 554,
            columnNumber: 15
          }, this),
          hasMultipleSeasons && selectedSeasons.length === 0 && !inCart && /* @__PURE__ */ jsxDEV("div", { className: "mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-blue-700 text-center", children: "ℹ️ Se agregará la primera temporada por defecto. Puedes seleccionar más temporadas arriba." }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 611,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 610,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mb-6", children: /* @__PURE__ */ jsxDEV(
            PriceCard,
            {
              type: "tv",
              selectedSeasons,
              isAnime
            },
            void 0,
            false,
            {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 619,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 618,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-purple-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Monitor, { className: "h-4 w-4 text-purple-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 629,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 628,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Estado" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 631,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 627,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: tvShow.status }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 633,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 626,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Rocket, { className: "h-4 w-4 text-blue-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 639,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 638,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Primera Emisión" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 641,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 637,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: new Date(tvShow.first_air_date).toLocaleDateString("es-ES") }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 643,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 636,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-green-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-green-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Clapperboard, { className: "h-4 w-4 text-green-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 651,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 650,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Temporadas" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 653,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 649,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: tvShow.number_of_seasons }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 655,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 648,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-yellow-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-yellow-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Monitor, { className: "h-4 w-4 text-yellow-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 661,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 660,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Episodios" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 663,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 659,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "ml-11", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium", children: tvShow.number_of_episodes }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 666,
                  columnNumber: 21
                }, this),
                tvShow.number_of_episodes > 50 && /* @__PURE__ */ jsxDEV("div", { className: "mt-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200", children: /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-yellow-700 font-medium", children: "⚠️ Más de 50 episodios: Consultar condiciones especiales" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 669,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 668,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 665,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 658,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-indigo-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-indigo-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Clock2, { className: "h-4 w-4 text-indigo-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 680,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 679,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Duración" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 682,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 678,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: tvShow.episode_run_time.length > 0 ? `${tvShow.episode_run_time[0]} min` : "Variable" }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 684,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 677,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-pink-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-pink-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Globe, { className: "h-4 w-4 text-pink-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 695,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 694,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Idioma Original" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 697,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 693,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: tvShow.original_language.toUpperCase() }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 699,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 692,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-red-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-red-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Users, { className: "h-4 w-4 text-red-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 705,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 704,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Votos" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 707,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 703,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: [
                tvShow.vote_count.toLocaleString(),
                " votos"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 709,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 702,
              columnNumber: 17
            }, this),
            tvShow.production_companies.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-orange-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-orange-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Building, { className: "h-4 w-4 text-orange-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 718,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 717,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Productoras" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 720,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 716,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 ml-11", children: tvShow.production_companies.slice(0, 3).map(
                (company) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-2 border border-gray-200", children: /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 text-sm font-medium", children: company.name }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 725,
                  columnNumber: 27
                }, this) }, company.id, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 724,
                  columnNumber: 23
                }, this)
              ) }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 722,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 715,
              columnNumber: 19
            }, this),
            tvShow.production_countries.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-teal-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-teal-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(MapPin, { className: "h-4 w-4 text-teal-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 738,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 737,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Países" }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 740,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 736,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 ml-11", children: tvShow.production_countries.map(
                (country) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-2 border border-gray-200", children: /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 text-sm font-medium", children: country.name }, void 0, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 745,
                  columnNumber: 27
                }, this) }, country.iso_3166_1, false, {
                  fileName: "/home/project/src/pages/TVDetail.tsx",
                  lineNumber: 744,
                  columnNumber: 23
                }, this)
              ) }, void 0, false, {
                fileName: "/home/project/src/pages/TVDetail.tsx",
                lineNumber: 742,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/TVDetail.tsx",
              lineNumber: 735,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/TVDetail.tsx",
            lineNumber: 625,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/TVDetail.tsx",
          lineNumber: 454,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/TVDetail.tsx",
        lineNumber: 368,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/TVDetail.tsx",
        lineNumber: 367,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/TVDetail.tsx",
      lineNumber: 278,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/TVDetail.tsx",
      lineNumber: 277,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/TVDetail.tsx",
    lineNumber: 225,
    columnNumber: 5
  }, this);
}
_s(TVDetail, "aWswgxF/QiLXN7Ai4QWSIWlcqf0=", false, function() {
  return [useParams, useCart];
});
_c = TVDetail;
var _c;
$RefreshReg$(_c, "TVDetail");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/TVDetail.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/TVDetail.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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RXJIO0FBQVEsSUFBQXFIO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUGFyYW1zIiwiTGluayIsIkFycm93TGVmdCIsIlN0YXIiLCJDYWxlbmRhciIsIk1vbml0b3IiLCJQbHVzIiwiWCIsIlBsYXkiLCJDaGV2cm9uRG93biIsIlJvY2tldCIsIkNsYXBwZXJib2FyZCIsIkNsb2NrMiIsIkdsb2JlIiwiVXNlcnMiLCJCdWlsZGluZyIsIk1hcFBpbiIsIlNwYXJrbGVzIiwiSGVhcnQiLCJaYXAiLCJDaGVja0NpcmNsZSIsInRtZGJTZXJ2aWNlIiwiVmlkZW9QbGF5ZXIiLCJQcmljZUNhcmQiLCJDYXN0U2VjdGlvbiIsIkxvYWRpbmdTcGlubmVyIiwiRXJyb3JNZXNzYWdlIiwidXNlQ2FydCIsIkFkbWluQ29udGV4dCIsIklNQUdFX0JBU0VfVVJMIiwiQkFDS0RST1BfU0laRSIsIlRWRGV0YWlsIiwiX3MiLCJpZCIsImFkbWluQ29udGV4dCIsInVzZUNvbnRleHQiLCJ0dlNob3ciLCJzZXRUVlNob3ciLCJ2aWRlb3MiLCJzZXRWaWRlb3MiLCJjYXN0Iiwic2V0Q2FzdCIsInNlbGVjdGVkVmlkZW8iLCJzZXRTZWxlY3RlZFZpZGVvIiwic2hvd1ZpZGVvIiwic2V0U2hvd1ZpZGVvIiwic2VsZWN0ZWRTZWFzb25zIiwic2V0U2VsZWN0ZWRTZWFzb25zIiwic2hvd1NlYXNvblNlbGVjdG9yIiwic2V0U2hvd1NlYXNvblNlbGVjdG9yIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwiaXNDYXJ0SG92ZXJlZCIsInNldElzQ2FydEhvdmVyZWQiLCJzaG93Q2FydEFuaW1hdGlvbiIsInNldFNob3dDYXJ0QW5pbWF0aW9uIiwiYWRkSXRlbSIsInJlbW92ZUl0ZW0iLCJ1cGRhdGVTZWFzb25zIiwiaXNJbkNhcnQiLCJnZXRJdGVtU2Vhc29ucyIsInNlcmllc1ByaWNlIiwic3RhdGUiLCJwcmljZXMiLCJ0dklkIiwicGFyc2VJbnQiLCJpbkNhcnQiLCJpc0FuaW1lIiwib3JpZ2luYWxfbGFuZ3VhZ2UiLCJnZW5yZXMiLCJzb21lIiwiZyIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwic2F2ZWRTZWFzb25zIiwiZmV0Y2hUVkRhdGEiLCJ0dkRhdGEiLCJjcmVkaXRzRGF0YSIsIlByb21pc2UiLCJhbGwiLCJnZXRUVlNob3dEZXRhaWxzIiwiZ2V0VFZTaG93Q3JlZGl0cyIsInZpZGVvRGF0YSIsImdldFRWU2hvd1ZpZGVvcyIsInRyYWlsZXJzIiwicmVzdWx0cyIsImZpbHRlciIsInZpZGVvIiwic2l0ZSIsInR5cGUiLCJsZW5ndGgiLCJ2aWRlb0Vycm9yIiwiY29uc29sZSIsIndhcm4iLCJlcnIiLCJoYW5kbGVTZWFzb25Ub2dnbGUiLCJzZWFzb25OdW1iZXIiLCJwcmV2IiwicyIsInNlbGVjdEFsbFNlYXNvbnMiLCJhbGxTZWFzb25OdW1iZXJzIiwic2Vhc29ucyIsInNlYXNvbiIsInNlYXNvbl9udW1iZXIiLCJtYXAiLCJjbGVhckFsbFNlYXNvbnMiLCJpc0FkZFRvQ2FydEVuYWJsZWQiLCJ2YWxpZFNlYXNvbnMiLCJoYW5kbGVDYXJ0QWN0aW9uIiwic2V0VGltZW91dCIsInNlYXNvbnNUb0FkZCIsImNhcnRJdGVtIiwidGl0bGUiLCJwb3N0ZXJfcGF0aCIsImZpcnN0X2Fpcl9kYXRlIiwidm90ZV9hdmVyYWdlIiwiZ2VucmVfaWRzIiwiaGFuZGxlU2Vhc29uc1VwZGF0ZSIsImJhY2tkcm9wVXJsIiwiYmFja2Ryb3BfcGF0aCIsImhhc011bHRpcGxlU2Vhc29ucyIsImJhY2tncm91bmRJbWFnZSIsInRvRml4ZWQiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJudW1iZXJfb2Zfc2Vhc29ucyIsImdlbnJlIiwib3ZlcnZpZXciLCJ0YWdsaW5lIiwia2V5IiwibnVtYmVyX29mX2VwaXNvZGVzIiwidG9Mb2NhbGVTdHJpbmciLCJlcGlzb2RlX2NvdW50IiwiYWlyX2RhdGUiLCJzdGF0dXMiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJlcGlzb2RlX3J1bl90aW1lIiwidG9VcHBlckNhc2UiLCJ2b3RlX2NvdW50IiwicHJvZHVjdGlvbl9jb21wYW5pZXMiLCJzbGljZSIsImNvbXBhbnkiLCJwcm9kdWN0aW9uX2NvdW50cmllcyIsImNvdW50cnkiLCJpc29fMzE2Nl8xIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiVFZEZXRhaWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUGFyYW1zLCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBBcnJvd0xlZnQsIFN0YXIsIENhbGVuZGFyLCBNb25pdG9yLCBQbHVzLCBYLCBQbGF5LCBDaGV2cm9uRG93biwgUm9ja2V0LCBDbGFwcGVyYm9hcmQsIENsb2NrMiwgR2xvYmUsIFVzZXJzLCBCdWlsZGluZywgTWFwUGluLCBTcGFya2xlcywgSGVhcnQsIFphcCwgQ2hlY2ssIENoZWNrQ2lyY2xlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHRtZGJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdG1kYic7XG5pbXBvcnQgeyBWaWRlb1BsYXllciB9IGZyb20gJy4uL2NvbXBvbmVudHMvVmlkZW9QbGF5ZXInO1xuaW1wb3J0IHsgUHJpY2VDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9QcmljZUNhcmQnO1xuaW1wb3J0IHsgQ2FzdFNlY3Rpb24gfSBmcm9tICcuLi9jb21wb25lbnRzL0Nhc3RTZWN0aW9uJztcbmltcG9ydCB7IExvYWRpbmdTcGlubmVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Mb2FkaW5nU3Bpbm5lcic7XG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21wb25lbnRzL0Vycm9yTWVzc2FnZSc7XG5pbXBvcnQgeyB1c2VDYXJ0IH0gZnJvbSAnLi4vY29udGV4dC9DYXJ0Q29udGV4dCc7XG5pbXBvcnQgeyBBZG1pbkNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L0FkbWluQ29udGV4dCc7XG5pbXBvcnQgeyBJTUFHRV9CQVNFX1VSTCwgQkFDS0RST1BfU0laRSB9IGZyb20gJy4uL2NvbmZpZy9hcGknO1xuaW1wb3J0IHR5cGUgeyBUVlNob3dEZXRhaWxzLCBWaWRlbywgQ2FydEl0ZW0sIFNlYXNvbiwgQ2FzdE1lbWJlciB9IGZyb20gJy4uL3R5cGVzL21vdmllJztcblxuZXhwb3J0IGZ1bmN0aW9uIFRWRGV0YWlsKCkge1xuICBjb25zdCB7IGlkIH0gPSB1c2VQYXJhbXM8eyBpZDogc3RyaW5nIH0+KCk7XG4gIGNvbnN0IGFkbWluQ29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoQWRtaW5Db250ZXh0KTtcbiAgY29uc3QgW3R2U2hvdywgc2V0VFZTaG93XSA9IHVzZVN0YXRlPFRWU2hvd0RldGFpbHMgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3ZpZGVvcywgc2V0VmlkZW9zXSA9IHVzZVN0YXRlPFZpZGVvW10+KFtdKTtcbiAgY29uc3QgW2Nhc3QsIHNldENhc3RdID0gdXNlU3RhdGU8Q2FzdE1lbWJlcltdPihbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZFZpZGVvLCBzZXRTZWxlY3RlZFZpZGVvXSA9IHVzZVN0YXRlPFZpZGVvIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93VmlkZW8sIHNldFNob3dWaWRlb10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWxlY3RlZFNlYXNvbnMsIHNldFNlbGVjdGVkU2Vhc29uc10gPSB1c2VTdGF0ZTxudW1iZXJbXT4oW10pO1xuICBjb25zdCBbc2hvd1NlYXNvblNlbGVjdG9yLCBzZXRTaG93U2Vhc29uU2VsZWN0b3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzQ2FydEhvdmVyZWQsIHNldElzQ2FydEhvdmVyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0NhcnRBbmltYXRpb24sIHNldFNob3dDYXJ0QW5pbWF0aW9uXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgeyBhZGRJdGVtLCByZW1vdmVJdGVtLCB1cGRhdGVTZWFzb25zLCBpc0luQ2FydCwgZ2V0SXRlbVNlYXNvbnMgfSA9IHVzZUNhcnQoKTtcblxuICAvLyBHZXQgY3VycmVudCBwcmljZXMgd2l0aCByZWFsLXRpbWUgdXBkYXRlc1xuICBjb25zdCBzZXJpZXNQcmljZSA9IGFkbWluQ29udGV4dD8uc3RhdGU/LnByaWNlcz8uc2VyaWVzUHJpY2UgfHwgMzAwO1xuXG4gIGNvbnN0IHR2SWQgPSBwYXJzZUludChpZCB8fCAnMCcpO1xuICBjb25zdCBpbkNhcnQgPSBpc0luQ2FydCh0dklkKTtcblxuICAvLyBEZXRlY3RhciBzaSBlcyBhbmltZVxuICBjb25zdCBpc0FuaW1lID0gdHZTaG93Py5vcmlnaW5hbF9sYW5ndWFnZSA9PT0gJ2phJyB8fCBcbiAgICAgICAgICAgICAgICAgKHR2U2hvdz8uZ2VucmVzICYmIHR2U2hvdy5nZW5yZXMuc29tZShnID0+IGcubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdhbmltYXQnKSkpIHx8XG4gICAgICAgICAgICAgICAgIHR2U2hvdz8ubmFtZT8udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYW5pbWUnKTtcblxuICAvLyBDYXJnYXIgdGVtcG9yYWRhcyBzZWxlY2Npb25hZGFzIHNpIHlhIGVzdMOhIGVuIGVsIGNhcnJpdG9cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaW5DYXJ0KSB7XG4gICAgICBjb25zdCBzYXZlZFNlYXNvbnMgPSBnZXRJdGVtU2Vhc29ucyh0dklkKTtcbiAgICAgIHNldFNlbGVjdGVkU2Vhc29ucyhzYXZlZFNlYXNvbnMpO1xuICAgIH1cbiAgfSwgW2luQ2FydCwgdHZJZCwgZ2V0SXRlbVNlYXNvbnNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoVFZEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZldGNoIFRWIGRldGFpbHMgYW5kIGNyZWRpdHMgZmlyc3RcbiAgICAgICAgY29uc3QgW3R2RGF0YSwgY3JlZGl0c0RhdGFdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgIHRtZGJTZXJ2aWNlLmdldFRWU2hvd0RldGFpbHModHZJZCksXG4gICAgICAgICAgdG1kYlNlcnZpY2UuZ2V0VFZTaG93Q3JlZGl0cyh0dklkKVxuICAgICAgICBdKTtcblxuICAgICAgICBzZXRUVlNob3codHZEYXRhKTtcbiAgICAgICAgc2V0Q2FzdChjcmVkaXRzRGF0YS5jYXN0IHx8IFtdKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZldGNoIHZpZGVvcyBzZXBhcmF0ZWx5IHdpdGggZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB2aWRlb0RhdGEgPSBhd2FpdCB0bWRiU2VydmljZS5nZXRUVlNob3dWaWRlb3ModHZJZCk7XG4gICAgICAgICAgY29uc3QgdHJhaWxlcnMgPSB2aWRlb0RhdGEucmVzdWx0cy5maWx0ZXIoXG4gICAgICAgICAgICB2aWRlbyA9PiB2aWRlby5zaXRlID09PSAnWW91VHViZScgJiYgKHZpZGVvLnR5cGUgPT09ICdUcmFpbGVyJyB8fCB2aWRlby50eXBlID09PSAnVGVhc2VyJylcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldFZpZGVvcyh0cmFpbGVycyk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHRyYWlsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNldFNlbGVjdGVkVmlkZW8odHJhaWxlcnNbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAodmlkZW9FcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gdmlkZW9zIGF2YWlsYWJsZSBmb3IgVFYgc2hvdyAke3R2SWR9YCk7XG4gICAgICAgICAgc2V0VmlkZW9zKFtdKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNldEVycm9yKCdFcnJvciBhbCBjYXJnYXIgbG9zIGRldGFsbGVzIGRlIGxhIHNlcmllLicpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBUViBzaG93IGRldGFpbHM6JywgZXJyKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodHZJZCkge1xuICAgICAgZmV0Y2hUVkRhdGEoKTtcbiAgICB9XG4gIH0sIFt0dklkXSk7XG5cbiAgY29uc3QgaGFuZGxlU2Vhc29uVG9nZ2xlID0gKHNlYXNvbk51bWJlcjogbnVtYmVyKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRTZWFzb25zKHByZXYgPT4ge1xuICAgICAgaWYgKHByZXYuaW5jbHVkZXMoc2Vhc29uTnVtYmVyKSkge1xuICAgICAgICByZXR1cm4gcHJldi5maWx0ZXIocyA9PiBzICE9PSBzZWFzb25OdW1iZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsuLi5wcmV2LCBzZWFzb25OdW1iZXJdO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdEFsbFNlYXNvbnMgPSAoKSA9PiB7XG4gICAgaWYgKCF0dlNob3cpIHJldHVybjtcbiAgICBjb25zdCBhbGxTZWFzb25OdW1iZXJzID0gdHZTaG93LnNlYXNvbnNcbiAgICAgIC5maWx0ZXIoc2Vhc29uID0+IHNlYXNvbi5zZWFzb25fbnVtYmVyID4gMClcbiAgICAgIC5tYXAoc2Vhc29uID0+IHNlYXNvbi5zZWFzb25fbnVtYmVyKTtcbiAgICBzZXRTZWxlY3RlZFNlYXNvbnMoYWxsU2Vhc29uTnVtYmVycyk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJBbGxTZWFzb25zID0gKCkgPT4ge1xuICAgIHNldFNlbGVjdGVkU2Vhc29ucyhbXSk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5hciBzaSBlbCBib3TDs24gZGViZSBlc3RhciBoYWJpbGl0YWRvXG4gIGNvbnN0IGlzQWRkVG9DYXJ0RW5hYmxlZCA9ICgpID0+IHtcbiAgICBpZiAoIXR2U2hvdykgcmV0dXJuIGZhbHNlO1xuICAgIFxuICAgIGNvbnN0IHZhbGlkU2Vhc29ucyA9IHR2U2hvdy5zZWFzb25zLmZpbHRlcihzZWFzb24gPT4gc2Vhc29uLnNlYXNvbl9udW1iZXIgPiAwKTtcbiAgICBcbiAgICAvLyBTaWVtcHJlIGhhYmlsaXRhciBlbCBib3TDs24gLSBzaSBubyBoYXkgdGVtcG9yYWRhcyBzZWxlY2Npb25hZGFzLCBzZSBzZWxlY2Npb25hcsOhIGxhIHByaW1lcmEgYXV0b23DoXRpY2FtZW50ZVxuICAgIHJldHVybiB2YWxpZFNlYXNvbnMubGVuZ3RoID4gMDtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDYXJ0QWN0aW9uID0gKCkgPT4ge1xuICAgIGlmICghdHZTaG93KSByZXR1cm47XG5cbiAgICBzZXRTaG93Q2FydEFuaW1hdGlvbih0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldFNob3dDYXJ0QW5pbWF0aW9uKGZhbHNlKSwgMjAwMCk7XG5cbiAgICBjb25zdCB2YWxpZFNlYXNvbnMgPSB0dlNob3cuc2Vhc29ucy5maWx0ZXIoc2Vhc29uID0+IHNlYXNvbi5zZWFzb25fbnVtYmVyID4gMCk7XG4gICAgXG4gICAgLy8gU2kgbm8gaGF5IHRlbXBvcmFkYXMgc2VsZWNjaW9uYWRhcywgc2VsZWNjaW9uYXIgbGEgcHJpbWVyYSBwb3IgZGVmZWN0b1xuICAgIGxldCBzZWFzb25zVG9BZGQgPSBzZWxlY3RlZFNlYXNvbnM7XG4gICAgaWYgKHNlbGVjdGVkU2Vhc29ucy5sZW5ndGggPT09IDAgJiYgdmFsaWRTZWFzb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlYXNvbnNUb0FkZCA9IFsxXTtcbiAgICAgIHNldFNlbGVjdGVkU2Vhc29ucyhbMV0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNhcnRJdGVtOiBDYXJ0SXRlbSAmIHsgc2VsZWN0ZWRTZWFzb25zPzogbnVtYmVyW10gfSA9IHtcbiAgICAgIGlkOiB0dlNob3cuaWQsXG4gICAgICB0aXRsZTogdHZTaG93Lm5hbWUsXG4gICAgICBwb3N0ZXJfcGF0aDogdHZTaG93LnBvc3Rlcl9wYXRoLFxuICAgICAgdHlwZTogJ3R2JyxcbiAgICAgIGZpcnN0X2Fpcl9kYXRlOiB0dlNob3cuZmlyc3RfYWlyX2RhdGUsXG4gICAgICB2b3RlX2F2ZXJhZ2U6IHR2U2hvdy52b3RlX2F2ZXJhZ2UsXG4gICAgICBzZWxlY3RlZFNlYXNvbnM6IHNlYXNvbnNUb0FkZCxcbiAgICAgIG9yaWdpbmFsX2xhbmd1YWdlOiB0dlNob3cub3JpZ2luYWxfbGFuZ3VhZ2UsXG4gICAgICBnZW5yZV9pZHM6IHR2U2hvdy5nZW5yZXMubWFwKGcgPT4gZy5pZCksXG4gICAgfTtcblxuICAgIGlmIChpbkNhcnQpIHtcbiAgICAgIHJlbW92ZUl0ZW0odHZTaG93LmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkSXRlbShjYXJ0SXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlYXNvbnNVcGRhdGUgPSAoKSA9PiB7XG4gICAgaWYgKGluQ2FydCAmJiB0dlNob3cpIHtcbiAgICAgIHVwZGF0ZVNlYXNvbnModHZTaG93LmlkLCBzZWxlY3RlZFNlYXNvbnMpO1xuICAgIH1cbiAgfTtcblxuICAvLyBBY3R1YWxpemFyIHRlbXBvcmFkYXMgY3VhbmRvIGNhbWJpZSBsYSBzZWxlY2Npw7NuIHkgZXN0w6kgZW4gZWwgY2Fycml0b1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpbkNhcnQpIHtcbiAgICAgIGhhbmRsZVNlYXNvbnNVcGRhdGUoKTtcbiAgICB9XG4gIH0sIFtzZWxlY3RlZFNlYXNvbnMsIGluQ2FydF0pO1xuXG4gIC8vIEF1dG8tc2VsZWNjaW9uYXIgbGEgw7puaWNhIHRlbXBvcmFkYSBzaSBzb2xvIGhheSB1bmFcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHZTaG93ICYmICFpbkNhcnQgJiYgc2VsZWN0ZWRTZWFzb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgdmFsaWRTZWFzb25zID0gdHZTaG93LnNlYXNvbnMuZmlsdGVyKHNlYXNvbiA9PiBzZWFzb24uc2Vhc29uX251bWJlciA+IDApO1xuICAgICAgaWYgKHZhbGlkU2Vhc29ucy5sZW5ndGggPj0gMSkge1xuICAgICAgICAvLyBTaWVtcHJlIHNlbGVjY2lvbmFyIGxhIHByaW1lcmEgdGVtcG9yYWRhIHBvciBkZWZlY3RvXG4gICAgICAgIHNldFNlbGVjdGVkU2Vhc29ucyhbMV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW3R2U2hvdywgaW5DYXJ0XSk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS01MFwiPlxuICAgICAgICA8TG9hZGluZ1NwaW5uZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoZXJyb3IgfHwgIXR2U2hvdykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICAgIDxFcnJvck1lc3NhZ2UgbWVzc2FnZT17ZXJyb3IgfHwgJ1NlcmllIG5vIGVuY29udHJhZGEnfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGJhY2tkcm9wVXJsID0gdHZTaG93LmJhY2tkcm9wX3BhdGhcbiAgICA/IGAke0lNQUdFX0JBU0VfVVJMfS8ke0JBQ0tEUk9QX1NJWkV9JHt0dlNob3cuYmFja2Ryb3BfcGF0aH1gXG4gICAgOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODk1OTk4NDMyNTMtYzc2Y2M0YmNiOGNmP3c9MTI4MCZoPTcyMCZmaXQ9Y3JvcCZjcm9wPWNlbnRlcic7XG5cbiAgY29uc3QgdmFsaWRTZWFzb25zID0gdHZTaG93LnNlYXNvbnMuZmlsdGVyKHNlYXNvbiA9PiBzZWFzb24uc2Vhc29uX251bWJlciA+IDApO1xuICBjb25zdCBoYXNNdWx0aXBsZVNlYXNvbnMgPSB2YWxpZFNlYXNvbnMubGVuZ3RoID4gMTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTBcIj5cbiAgICAgIHsvKiBIZXJvIFNlY3Rpb24gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtOTYgbWQ6aC1bNTAwcHhdIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1jb3ZlciBiZy1jZW50ZXJcIlxuICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2JhY2tkcm9wVXJsfSlgIH19XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tYmxhY2svODAgdmlhLWJsYWNrLzQwIHRvLWJsYWNrLzIwXCIgLz5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgaC1mdWxsIGZsZXggaXRlbXMtZW5kXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBwYi04IHctZnVsbFwiPlxuICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgdG89XCIvdHZcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgdGV4dC13aGl0ZS84MCBob3Zlcjp0ZXh0LXdoaXRlIG1iLTQgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8QXJyb3dMZWZ0IGNsYXNzTmFtZT1cIm1yLTIgaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgIFZvbHZlciBhIHNlcmllc1xuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC00eGwgbWQ6dGV4dC02eGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItNFwiPlxuICAgICAgICAgICAgICB7dHZTaG93Lm5hbWV9XG4gICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtNCB0ZXh0LXdoaXRlLzkwIG1iLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxTdGFyIGNsYXNzTmFtZT1cImgtNSB3LTUgZmlsbC15ZWxsb3ctNDAwIHRleHQteWVsbG93LTQwMCBtci0xXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPnt0dlNob3cudm90ZV9hdmVyYWdlLnRvRml4ZWQoMSl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxDYWxlbmRhciBjbGFzc05hbWU9XCJoLTUgdy01IG1yLTFcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntuZXcgRGF0ZSh0dlNob3cuZmlyc3RfYWlyX2RhdGUpLmdldEZ1bGxZZWFyKCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxNb25pdG9yIGNsYXNzTmFtZT1cImgtNSB3LTUgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3R2U2hvdy5udW1iZXJfb2Zfc2Vhc29uc30gdGVtcG9yYWRhczwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMiBtYi02XCI+XG4gICAgICAgICAgICAgIHt0dlNob3cuZ2VucmVzLm1hcCgoZ2VucmUpID0+IChcbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAga2V5PXtnZW5yZS5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy13aGl0ZS8yMCBiYWNrZHJvcC1ibHVyLXNtIHJvdW5kZWQtZnVsbCB0ZXh0LXNtIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtnZW5yZS5uYW1lfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBweS04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMyBnYXAtOFwiPlxuICAgICAgICAgIHsvKiBNYWluIENvbnRlbnQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICB7LyogT3ZlcnZpZXcgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20td2hpdGUgdG8tZ3JheS01MCByb3VuZGVkLTJ4bCBzaGFkb3cteGwgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBwLTggbWItOCB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtWzEuMDJdIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTZcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNTAwIHRvLXBpbmstNTAwIHAtMyByb3VuZGVkLXhsIG1yLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCfk5o8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTYwMCB0by1waW5rLTYwMCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICAgICAgU2lub3BzaXNcbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCBsZWFkaW5nLXJlbGF4ZWQgdGV4dC1sZyBtYi00XCI+XG4gICAgICAgICAgICAgICAge3R2U2hvdy5vdmVydmlldyB8fCAnU2luIGRlc2NyaXBjacOzbiBkaXNwb25pYmxlLid9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAge3R2U2hvdy50YWdsaW5lICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTYgcC00IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNTAgdG8tcGluay01MCByb3VuZGVkLXhsIGJvcmRlci1sLTQgYm9yZGVyLWdyYWRpZW50LXRvLWIgZnJvbS1wdXJwbGUtNDAwIHRvLXBpbmstNDAwXCI+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIGl0YWxpYyB0ZXh0LWxnIGZvbnQtbWVkaXVtXCI+XCJ7dHZTaG93LnRhZ2xpbmV9XCI8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIENhc3QgU2VjdGlvbiAqL31cbiAgICAgICAgICAgIDxDYXN0U2VjdGlvbiBjYXN0PXtjYXN0fSB0aXRsZT1cIlJlcGFydG8gUHJpbmNpcGFsXCIgLz5cblxuICAgICAgICAgICAgey8qIFZpZGVvcyAqL31cbiAgICAgICAgICAgIHt2aWRlb3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC1sZyBzaGFkb3ctc20gcC02IG1iLTZcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNFwiPlRyw6FpbGVycyB5IFZpZGVvczwvaDI+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAge3Nob3dWaWRlbyAmJiBzZWxlY3RlZFZpZGVvID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxWaWRlb1BsYXllciB2aWRlb0tleT17c2VsZWN0ZWRWaWRlby5rZXl9IHRpdGxlPXtzZWxlY3RlZFZpZGVvLm5hbWV9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93VmlkZW8odHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGFzcGVjdC12aWRlbyBiZy1ncmF5LTkwMCByb3VuZGVkLWxnIG92ZXJmbG93LWhpZGRlbiBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWNvdmVyIGJnLWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBzZWxlY3RlZFZpZGVvIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYHVybChodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke3NlbGVjdGVkVmlkZW8ua2V5fS9tYXhyZXNkZWZhdWx0LmpwZylgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYHVybCgke2JhY2tkcm9wVXJsfSlgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ibGFjay81MCBncm91cC1ob3ZlcjpiZy1ibGFjay80MCB0cmFuc2l0aW9uLWNvbG9yc1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXJlZC02MDAgaG92ZXI6YmctcmVkLTcwMCByb3VuZGVkLWZ1bGwgcC00IHRyYW5zaXRpb24tY29sb3JzIGdyb3VwLWhvdmVyOnNjYWxlLTExMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8UGxheSBjbGFzc05hbWU9XCJoLTggdy04IHRleHQtd2hpdGUgbWwtMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS00IGxlZnQtNCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPlJlcHJvZHVjaXIgVHLDoWlsZXI8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIG9wYWNpdHktNzVcIj57c2VsZWN0ZWRWaWRlbz8ubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHt2aWRlb3MubGVuZ3RoID4gMSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgICAge3ZpZGVvcy5tYXAoKHZpZGVvKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt2aWRlby5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRWaWRlbyh2aWRlbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dWaWRlbyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC1sZyBib3JkZXItMiB0ZXh0LWxlZnQgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWaWRlbz8uaWQgPT09IHZpZGVvLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLXB1cnBsZS01MDAgYmctcHVycGxlLTUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1ncmF5LTIwMCBob3Zlcjpib3JkZXItcHVycGxlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDBcIj57dmlkZW8ubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj57dmlkZW8udHlwZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNpZGViYXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0xXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20td2hpdGUgdG8tZ3JheS01MCByb3VuZGVkLTJ4bCBzaGFkb3cteGwgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBvdmVyZmxvdy1oaWRkZW4gc3RpY2t5IHRvcC04XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS02MDAgdG8tcGluay02MDAgcC02IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUvMjAgcC0yIHJvdW5kZWQtbGcgbXItM1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWxnXCI+8J+Tujwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgRGV0YWxsZXMgZGUgbGEgU2VyaWVcbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHsvKiBFcGlzb2RlIGNvdW50IHdhcm5pbmcgZm9yIHNlcmllcyB3aXRoIDUwKyBlcGlzb2RlcyAqL31cbiAgICAgICAgICAgICAgICB7dHZTaG93Lm51bWJlcl9vZl9lcGlzb2RlcyA+IDUwICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBwLTUgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTUwLzkwIHRvLW9yYW5nZS01MC85MCBiYWNrZHJvcC1ibHVyLW1kIHJvdW5kZWQtMnhsIGJvcmRlci0yIGJvcmRlci1hbWJlci0zMDAvNTAgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTUwMCB0by1vcmFuZ2UtNTAwIHAtMyByb3VuZGVkLXhsIG1yLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCfk4o8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTkwMFwiPkluZm9ybWFjacOzbiBkZSBQcmVjaW9zPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1hbWJlci03MDAgZm9udC1tZWRpdW1cIj5TZXJpZSBjb24gZXBpc29kaW9zIGV4dGVuZGlkb3M8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzgwIGJhY2tkcm9wLWJsdXItc20gcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC00IG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAgdG8taW5kaWdvLTUwIHJvdW5kZWQtbGcgcC0zIGJvcmRlciBib3JkZXItYmx1ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1sZyBtci0yXCI+8J+Tujwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWJsdWUtODAwXCI+VG90YWwgZGUgRXBpc29kaW9zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LWJsdWUtOTAwXCI+e3R2U2hvdy5udW1iZXJfb2ZfZXBpc29kZXN9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MCB0by1lbWVyYWxkLTUwIHJvdW5kZWQtbGcgcC0zIGJvcmRlciBib3JkZXItZ3JlZW4tMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgbXItMlwiPvCfkrA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1ncmVlbi04MDBcIj5QcmVjaW8gcG9yIFRlbXBvcmFkYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC1ncmVlbi05MDBcIj4ke3Nlcmllc1ByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTEwMCB0by1vcmFuZ2UtMTAwIHJvdW5kZWQteGwgcC00IGJvcmRlci0yIGJvcmRlci1hbWJlci0zMDAgc2hhZG93LW1kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1hbWJlci01MDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIHRleHQtc20gZm9udC1ib2xkXCI+4oS577iPPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1hbWJlci05MDBcIj5Qb2zDrXRpY2EgZGUgUHJlY2lvcyBwYXJhIFNlcmllcyBFeHRlbnNhczwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHRleHQtc20gdGV4dC1hbWJlci04MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNjAwIG1yLTIgbXQtMC41XCI+4pyFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+SGFzdGEgNTAgZXBpc29kaW9zOjwvc3Ryb25nPiBTZSBjb25zaWRlcmEgY29tbyAxIHRlbXBvcmFkYSBjb21wbGV0YTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS02MDAgbXItMiBtdC0wLjVcIj7wn5OLPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+TcOhcyBkZSA1MCBlcGlzb2Rpb3M6PC9zdHJvbmc+IENhZGEgdGVtcG9yYWRhIG1hbnRpZW5lIGVsIHByZWNpbyBlc3TDoW5kYXIgZGUgPHN0cm9uZz4ke3Nlcmllc1ByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUDwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTYwMCBtci0yIG10LTAuNVwiPvCfjq88L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5QcmVjaW8ganVzdG86PC9zdHJvbmc+IFBhZ2FzIHNvbG8gcG9yIGxhcyB0ZW1wb3JhZGFzIHF1ZSBzZWxlY2Npb25lcywgc2luIGNvc3RvcyBhZGljaW9uYWxlczwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTEwMCB0by1ibHVlLTEwMCByb3VuZGVkLXhsIHAtNCBib3JkZXItMiBib3JkZXItZ3JlZW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZ3JlZW4tODAwIG1iLTJcIj7wn5KhIEVqZW1wbG8gZGUgQ8OhbGN1bG8gcGFyYSBlc3RhIFNlcmllOjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0zIGdhcC0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgcC0yIGJvcmRlciBib3JkZXItZ3JlZW4tMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmVlbi03MDBcIj4xIFRlbXBvcmFkYTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tOTAwXCI+JHtzZXJpZXNQcmljZS50b0xvY2FsZVN0cmluZygpfSBDVVA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLWxnIHAtMiBib3JkZXIgYm9yZGVyLWJsdWUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ibHVlLTcwMFwiPjIgVGVtcG9yYWRhczwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtYmx1ZS05MDBcIj4keyhzZXJpZXNQcmljZSAqIDIpLnRvTG9jYWxlU3RyaW5nKCl9IENVUDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgcC0yIGJvcmRlciBib3JkZXItcHVycGxlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtcHVycGxlLTcwMFwiPlRvZGFzICh7dHZTaG93Lm51bWJlcl9vZl9zZWFzb25zfSk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS05MDBcIj4keyhzZXJpZXNQcmljZSAqIHR2U2hvdy5udW1iZXJfb2Zfc2Vhc29ucykudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTZcIj5cbiAgICAgICAgICAgICAgey8qIFNlYXNvbiBTZWxlY3Rpb24gKi99XG4gICAgICAgICAgICAgIHtoYXNNdWx0aXBsZVNlYXNvbnMgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItOFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTUwIHRvLXBpbmstNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1wdXJwbGUtMTAwIG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1wdXJwbGUtMTAwIHAtMiByb3VuZGVkLWxnIG1yLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc21cIj7wn5OdPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtcHVycGxlLTkwMFwiPlNlbGVjY2lvbmFyIFRlbXBvcmFkYXM8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXB1cnBsZS03MDAgbWwtMTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICBFbGlnZSBsYXMgdGVtcG9yYWRhcyBxdWUgZGVzZWFzIGFncmVnYXIgYSB0dSBwZWRpZG9cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1NlYXNvblNlbGVjdG9yKCFzaG93U2Vhc29uU2VsZWN0b3IpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtNCBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTUwIHRvLXBpbmstNTAgaG92ZXI6ZnJvbS1wdXJwbGUtMTAwIGhvdmVyOnRvLXBpbmstMTAwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTIwMCBob3Zlcjpib3JkZXItcHVycGxlLTMwMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1wdXJwbGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkU2Vhc29ucy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLXB1cnBsZS0yMDAgdGV4dC1wdXJwbGUtODAwIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC1zbSBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRTZWFzb25zLmxlbmd0aH0gc2VsZWNjaW9uYWRhc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duIGNsYXNzTmFtZT17YGgtNSB3LTUgdGV4dC1wdXJwbGUtNjAwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgICAgICAgIHNob3dTZWFzb25TZWxlY3RvciA/ICdyb3RhdGUtMTgwJyA6ICcnXG4gICAgICAgICAgICAgICAgICAgIH1gfSAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHtzaG93U2Vhc29uU2VsZWN0b3IgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgc3BhY2UteS0zIG1heC1oLTY0IG92ZXJmbG93LXktYXV0byBiZy13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZ3JheS0yMDAgcC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17c2VsZWN0QWxsU2Vhc29uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyBiZy1wdXJwbGUtMTAwIGhvdmVyOmJnLXB1cnBsZS0yMDAgdGV4dC1wdXJwbGUtNzAwIHB4LTMgcHktMiByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgVG9kYXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhckFsbFNlYXNvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgYmctZ3JheS0xMDAgaG92ZXI6YmctZ3JheS0yMDAgdGV4dC1ncmF5LTcwMCBweC0zIHB5LTIgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE5pbmd1bmFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHt2YWxpZFNlYXNvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKHNlYXNvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3NlYXNvbi5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTMgaG92ZXI6YmctcHVycGxlLTUwIHJvdW5kZWQteGwgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnMgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItcHVycGxlLTIwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtzZWxlY3RlZFNlYXNvbnMuaW5jbHVkZXMoc2Vhc29uLnNlYXNvbl9udW1iZXIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IGhhbmRsZVNlYXNvblRvZ2dsZShzZWFzb24uc2Vhc29uX251bWJlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtci00IGgtNSB3LTUgdGV4dC1wdXJwbGUtNjAwIGZvY3VzOnJpbmctcHVycGxlLTUwMCBib3JkZXItZ3JheS0zMDAgcm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWFzb24ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWFzb24uZXBpc29kZV9jb3VudH0gZXBpc29kaW9zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWFzb24uYWlyX2RhdGUgJiYgYCDigKIgJHtuZXcgRGF0ZShzZWFzb24uYWlyX2RhdGUpLmdldEZ1bGxZZWFyKCl9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgey8qIE1vc3RyYXIgaW5mb3JtYWNpw7NuIGRlIHRlbXBvcmFkYSDDum5pY2EgKi99XG4gICAgICAgICAgICAgIHshaGFzTXVsdGlwbGVTZWFzb25zICYmIHZhbGlkU2Vhc29ucy5sZW5ndGggPT09IDEgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNTAgdG8tYmx1ZS01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLWdyZWVuLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyZWVuLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtXCI+4pyFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JlZW4tOTAwXCI+VGVtcG9yYWRhIMOabmljYTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JlZW4tNzAwIG1sLTExIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICBFc3RhIHNlcmllIHRpZW5lIHVuYSBzb2xhIHRlbXBvcmFkYSBxdWUgc2UgaW5jbHVpcsOhIGF1dG9tw6F0aWNhbWVudGVcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLTExIGJnLXdoaXRlIHJvdW5kZWQtbGcgcC0zIGJvcmRlciBib3JkZXItZ3JlZW4tMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMFwiPnt2YWxpZFNlYXNvbnNbMF0ubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dmFsaWRTZWFzb25zWzBdLmVwaXNvZGVfY291bnR9IGVwaXNvZGlvc1xuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbGlkU2Vhc29uc1swXS5haXJfZGF0ZSAmJiBgIOKAoiAke25ldyBEYXRlKHZhbGlkU2Vhc29uc1swXS5haXJfZGF0ZSkuZ2V0RnVsbFllYXIoKX1gfVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNhcnRBY3Rpb259XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRJc0NhcnRIb3ZlcmVkKHRydWUpfVxuICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SXNDYXJ0SG92ZXJlZChmYWxzZSl9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0FkZFRvQ2FydEVuYWJsZWQoKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgbWItNiBweC02IHB5LTUgcm91bmRlZC0yeGwgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2Zvcm0gcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuICR7XG4gICAgICAgICAgICAgICAgICAhaXNBZGRUb0NhcnRFbmFibGVkKClcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JheS0zMDAgdGV4dC1ncmF5LTUwMCBjdXJzb3Itbm90LWFsbG93ZWQnXG4gICAgICAgICAgICAgICAgICAgIDogaW5DYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTUwMCB2aWEtZW1lcmFsZC01MDAgdG8tdGVhbC01MDAgaG92ZXI6ZnJvbS1ncmVlbi02MDAgaG92ZXI6dmlhLWVtZXJhbGQtNjAwIGhvdmVyOnRvLXRlYWwtNjAwIHRleHQtd2hpdGUgc2hhZG93LTJ4bCBzY2FsZS0xMDUnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS01MDAgdmlhLXBpbmstNTAwIHRvLXJlZC01MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNjAwIGhvdmVyOnZpYS1waW5rLTYwMCBob3Zlcjp0by1yZWQtNjAwIHRleHQtd2hpdGUgc2hhZG93LXhsJ1xuICAgICAgICAgICAgICAgIH0gJHtpc0NhcnRIb3ZlcmVkID8gJ3NjYWxlLTExMCBzaGFkb3ctMnhsJyA6ICcnfSAke3Nob3dDYXJ0QW5pbWF0aW9uID8gJ2FuaW1hdGUtcHVsc2UnIDogJyd9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgey8qIEFuaW1hdGVkIGJhY2tncm91bmQgZWZmZWN0ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1yIGZyb20td2hpdGUvMjAgdG8tdHJhbnNwYXJlbnQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwICR7XG4gICAgICAgICAgICAgICAgICBpc0NhcnRIb3ZlcmVkID8gJ2FuaW1hdGUtcHVsc2UnIDogJydcbiAgICAgICAgICAgICAgICB9YH0gLz5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogRmxvYXRpbmcgaWNvbnMgKi99XG4gICAgICAgICAgICAgICAge2lzQ2FydEhvdmVyZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIGxlZnQtNCBoLTQgdy00IHRleHQteWVsbG93LTMwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxIZWFydCBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiByaWdodC00IGgtNCB3LTQgdGV4dC1waW5rLTMwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMiBsZWZ0LTYgaC00IHctNCB0ZXh0LWJsdWUtMzAwIGFuaW1hdGUtYm91bmNlIGRlbGF5LTEwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFyIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIHJpZ2h0LTYgaC00IHctNCB0ZXh0LXllbGxvdy0zMDAgYW5pbWF0ZS1wdWxzZSBkZWxheS0yMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7aW5DYXJ0ID8gKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPXtgbXItMyBoLTYgdy02IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCByZWxhdGl2ZSB6LTEwICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNDYXJ0SG92ZXJlZCA/ICdyb3RhdGUtOTAgc2NhbGUtMTI1JyA6ICcnXG4gICAgICAgICAgICAgICAgICAgIH1gfSAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIHRleHQtbGdcIj5SZXRpcmFyIGRlbCBDYXJyaXRvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT17YG1yLTMgaC02IHctNiB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDAgcmVsYXRpdmUgei0xMCAke1xuICAgICAgICAgICAgICAgICAgICAgIGlzQ2FydEhvdmVyZWQgPyAncm90YXRlLTE4MCBzY2FsZS0xMjUnIDogJydcbiAgICAgICAgICAgICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgdGV4dC1sZ1wiPkFncmVnYXIgYWwgQ2Fycml0bzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgey8qIFN1Y2Nlc3MgaW5kaWNhdG9yICovfVxuICAgICAgICAgICAgICAgIHtpbkNhcnQgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTIgLXJpZ2h0LTIgYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTQwMCB0by1lbWVyYWxkLTQwMCB0ZXh0LXdoaXRlIHAtMiByb3VuZGVkLWZ1bGwgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZSBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBNZW5zYWplIGluZm9ybWF0aXZvIHNvYnJlIHNlbGVjY2nDs24gYXV0b23DoXRpY2EgKi99XG4gICAgICAgICAgICAgIHtoYXNNdWx0aXBsZVNlYXNvbnMgJiYgc2VsZWN0ZWRTZWFzb25zLmxlbmd0aCA9PT0gMCAmJiAhaW5DYXJ0ICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTYgcC0zIGJnLWJsdWUtNTAgYm9yZGVyIGJvcmRlci1ibHVlLTIwMCByb3VuZGVkLWxnXCI+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtYmx1ZS03MDAgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAg4oS577iPIFNlIGFncmVnYXLDoSBsYSBwcmltZXJhIHRlbXBvcmFkYSBwb3IgZGVmZWN0by4gUHVlZGVzIHNlbGVjY2lvbmFyIG3DoXMgdGVtcG9yYWRhcyBhcnJpYmEuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgey8qIFByaWNlIENhcmQgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNlwiPlxuICAgICAgICAgICAgICAgIDxQcmljZUNhcmQgXG4gICAgICAgICAgICAgICAgICB0eXBlPVwidHZcIiBcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2Vhc29ucz17c2VsZWN0ZWRTZWFzb25zfVxuICAgICAgICAgICAgICAgICAgaXNBbmltZT17aXNBbmltZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItcHVycGxlLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcHVycGxlLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxNb25pdG9yIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5Fc3RhZG88L2gzPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGZvbnQtbWVkaXVtIG1sLTExXCI+e3R2U2hvdy5zdGF0dXN9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1ibHVlLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYmx1ZS0xMDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8Um9ja2V0IGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC1ibHVlLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwXCI+UHJpbWVyYSBFbWlzacOzbjwvaDM+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW0gbWwtMTFcIj5cbiAgICAgICAgICAgICAgICAgICAge25ldyBEYXRlKHR2U2hvdy5maXJzdF9haXJfZGF0ZSkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlcy1FUycpfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1ncmVlbi0yMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyZWVuLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDbGFwcGVyYm9hcmQgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LWdyZWVuLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwXCI+VGVtcG9yYWRhczwvaDM+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW0gbWwtMTFcIj57dHZTaG93Lm51bWJlcl9vZl9zZWFzb25zfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXIteWVsbG93LTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmcteWVsbG93LTEwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxNb25pdG9yIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC15ZWxsb3ctNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5FcGlzb2Rpb3M8L2gzPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1sLTExXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW1cIj57dHZTaG93Lm51bWJlcl9vZl9lcGlzb2Rlc308L3A+XG4gICAgICAgICAgICAgICAgICAgIHt0dlNob3cubnVtYmVyX29mX2VwaXNvZGVzID4gNTAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiBwLTIgYmcteWVsbG93LTUwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci15ZWxsb3ctMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQteWVsbG93LTcwMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICDimqDvuI8gTcOhcyBkZSA1MCBlcGlzb2Rpb3M6IENvbnN1bHRhciBjb25kaWNpb25lcyBlc3BlY2lhbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItaW5kaWdvLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctaW5kaWdvLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDbG9jazIgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LWluZGlnby02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPkR1cmFjacOzbjwvaDM+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW0gbWwtMTFcIj5cbiAgICAgICAgICAgICAgICAgICAge3R2U2hvdy5lcGlzb2RlX3J1bl90aW1lLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IGAke3R2U2hvdy5lcGlzb2RlX3J1bl90aW1lWzBdfSBtaW5gXG4gICAgICAgICAgICAgICAgICAgICAgOiAnVmFyaWFibGUnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1waW5rLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcGluay0xMDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LXBpbmstNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5JZGlvbWEgT3JpZ2luYWw8L2gzPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGZvbnQtbWVkaXVtIG1sLTExXCI+e3R2U2hvdy5vcmlnaW5hbF9sYW5ndWFnZS50b1VwcGVyQ2FzZSgpfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1yZWQtMjAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1yZWQtMTAwIHAtMiByb3VuZGVkLWxnIG1yLTMgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFVzZXJzIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC1yZWQtNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5Wb3RvczwvaDM+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW0gbWwtMTFcIj5cbiAgICAgICAgICAgICAgICAgICAge3R2U2hvdy52b3RlX2NvdW50LnRvTG9jYWxlU3RyaW5nKCl9IHZvdG9zXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7dHZTaG93LnByb2R1Y3Rpb25fY29tcGFuaWVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLW9yYW5nZS0yMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1vcmFuZ2UtMTAwIHAtMiByb3VuZGVkLWxnIG1yLTMgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnVpbGRpbmcgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LW9yYW5nZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5Qcm9kdWN0b3JhczwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBtbC0xMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt0dlNob3cucHJvZHVjdGlvbl9jb21wYW5pZXMuc2xpY2UoMCwgMykubWFwKChjb21wYW55KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17Y29tcGFueS5pZH0gY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC1sZyBwLTIgYm9yZGVyIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIHRleHQtc20gZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbXBhbnkubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHt0dlNob3cucHJvZHVjdGlvbl9jb3VudHJpZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItdGVhbC0yMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy10ZWFsLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1hcFBpbiBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtdGVhbC02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5QYcOtc2VzPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG1sLTExXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3R2U2hvdy5wcm9kdWN0aW9uX2NvdW50cmllcy5tYXAoKGNvdW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtjb3VudHJ5Lmlzb18zMTY2XzF9IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgcC0yIGJvcmRlciBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCB0ZXh0LXNtIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvdW50cnkubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9wYWdlcy9UVkRldGFpbC50c3gifQ==