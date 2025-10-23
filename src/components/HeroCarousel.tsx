import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/HeroCarousel.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/HeroCarousel.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import { Link } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { ChevronLeft, ChevronRight, Star, Calendar, Play, Pause, Sparkles, Zap, Heart } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { tmdbService } from "/src/services/tmdb.ts";
import { contentSyncService } from "/src/services/contentSync.ts";
import { performanceOptimizer } from "/src/utils/performance.ts";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "/src/config/api.ts";
export function HeroCarousel({ items }) {
  _s();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [itemVideos, setItemVideos] = useState({});
  const [preloadedImages, setPreloadedImages] = useState(/* @__PURE__ */ new Set());
  const [isButtonHovered, setIsButtonHovered] = useState(null);
  const AUTOPLAY_INTERVAL = 6e3;
  useEffect(() => {
    const preloadNextImages = () => {
      const nextIndex = (currentIndex + 1) % items.length;
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      [nextIndex, prevIndex].forEach((index) => {
        const item = items[index];
        if (item?.backdrop_path) {
          const imageUrl = `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${item.backdrop_path}`;
          if (!preloadedImages.has(imageUrl)) {
            performanceOptimizer.preloadResource(imageUrl, "image");
            setPreloadedImages((prev) => /* @__PURE__ */ new Set([...prev, imageUrl]));
          }
        }
      });
    };
    preloadNextImages();
  }, [currentIndex, items, preloadedImages]);
  useEffect(() => {
    const loadVideos = async () => {
      const videoPromises = items.map(async (item) => {
        try {
          const isMovie = "title" in item;
          const cachedVideoData = contentSyncService?.getCachedVideos?.(item.id, isMovie ? "movie" : "tv");
          if (cachedVideoData && cachedVideoData.length > 0) {
            return { id: item.id, videos: cachedVideoData };
          }
          try {
            const videoData = isMovie ? await tmdbService.getMovieVideos(item.id) : await tmdbService.getTVShowVideos(item.id);
            const trailers = videoData.results.filter(
              (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
            );
            return { id: item.id, videos: trailers };
          } catch (videoError) {
            console.warn(`No videos available for ${isMovie ? "movie" : "tv"} ${item.id}`);
            return { id: item.id, videos: [] };
          }
        } catch (error) {
          console.warn(`Error loading videos for item ${item.id}:`, error);
          return { id: item.id, videos: [] };
        }
      });
      const results = await Promise.allSettled(videoPromises);
      const videosMap = results.reduce((acc, result) => {
        if (result.status === "fulfilled") {
          const { id, videos } = result.value;
          acc[id] = videos;
        }
        return acc;
      }, {});
      setItemVideos(videosMap);
    };
    if (items.length > 0) {
      loadVideos();
    }
  }, [items]);
  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
    setProgress(0);
  }, [items.length, isTransitioning]);
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setProgress(0);
  }, [items.length, isTransitioning]);
  const goToSlide = useCallback(performanceOptimizer.throttle((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setProgress(0);
  }, 100), [currentIndex, isTransitioning]);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === " ") {
        event.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPrevious, goToNext]);
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;
    const interval = setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length, goToNext]);
  useEffect(() => {
    if (!isAutoPlaying || items.length <= 1) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / AUTOPLAY_INTERVAL * 100, 100);
      setProgress(newProgress);
      if (newProgress < 100) {
        requestAnimationFrame(animate);
      }
    };
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [currentIndex, isAutoPlaying, items.length]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  useEffect(() => {
    const refreshCarousel = async () => {
      try {
        const freshContent = await tmdbService.getHeroContent();
      } catch (error) {
        console.error("Error refreshing carousel content:", error);
      }
    };
    const dailyRefresh = setInterval(refreshCarousel, 24 * 60 * 60 * 1e3);
    return () => clearInterval(dailyRefresh);
  }, []);
  if (items.length === 0) return null;
  const currentItem = items[currentIndex];
  const title = "title" in currentItem ? currentItem.title : currentItem.name;
  const releaseDate = "release_date" in currentItem ? currentItem.release_date : currentItem.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const itemType = "title" in currentItem ? "movie" : "tv";
  const currentVideos = itemVideos[currentItem.id] || [];
  const hasTrailer = currentVideos.length > 0;
  const handleWatchNow = () => {
    if (hasTrailer) {
      const trailer = currentVideos[0];
      const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      window.open(youtubeUrl, "_blank", "noopener,noreferrer");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "relative h-96 md:h-[600px] overflow-hidden group", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0", children: items.map((item, index) => {
      const itemBackdrop = item.backdrop_path ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${item.backdrop_path}` : "https://images.unsplash.com/photo-1489599843253-c76cc4bcb8cf?w=1280&h=720&fit=crop&crop=center";
      const isActive = index === currentIndex;
      const isPrev = index === (currentIndex - 1 + items.length) % items.length;
      const isNext = index === (currentIndex + 1) % items.length;
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${isActive ? "opacity-100 scale-100" : isPrev ? "opacity-0 scale-105 -translate-x-full" : isNext ? "opacity-0 scale-105 translate-x-full" : "opacity-0 scale-110"}`,
          style: { backgroundImage: `url(${itemBackdrop})` }
        },
        item.id,
        false,
        {
          fileName: "/home/project/src/components/HeroCarousel.tsx",
          lineNumber: 243,
          columnNumber: 13
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 232,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" }, void 0, false, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 261,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" }, void 0, false, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 262,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: goToPrevious,
        disabled: isTransitioning,
        className: "absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 disabled:opacity-50 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 opacity-0 group-hover:opacity-100",
        children: /* @__PURE__ */ jsxDEV(ChevronLeft, { className: "h-6 w-6" }, void 0, false, {
          fileName: "/home/project/src/components/HeroCarousel.tsx",
          lineNumber: 270,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/HeroCarousel.tsx",
        lineNumber: 265,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: goToNext,
        disabled: isTransitioning,
        className: "absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 disabled:opacity-50 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20 opacity-0 group-hover:opacity-100",
        children: /* @__PURE__ */ jsxDEV(ChevronRight, { className: "h-6 w-6" }, void 0, false, {
          fileName: "/home/project/src/components/HeroCarousel.tsx",
          lineNumber: 278,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/HeroCarousel.tsx",
        lineNumber: 273,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setIsAutoPlaying(!isAutoPlaying),
        className: "absolute top-6 right-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 opacity-0 group-hover:opacity-100",
        children: isAutoPlaying ? /* @__PURE__ */ jsxDEV(Pause, { className: "h-5 w-5" }, void 0, false, {
          fileName: "/home/project/src/components/HeroCarousel.tsx",
          lineNumber: 286,
          columnNumber: 26
        }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "h-5 w-5" }, void 0, false, {
          fileName: "/home/project/src/components/HeroCarousel.tsx",
          lineNumber: 286,
          columnNumber: 58
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/HeroCarousel.tsx",
        lineNumber: 282,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "relative h-full flex items-end z-10", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 w-full", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-3xl", children: /* @__PURE__ */ jsxDEV("div", { className: `transform transition-all duration-700 ${isTransitioning ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"}`, children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-5xl md:text-7xl font-bold text-white mb-6 leading-tight", children: title }, void 0, false, {
        fileName: "/home/project/src/components/HeroCarousel.tsx",
        lineNumber: 296,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-6 text-white/90 mb-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full", children: [
          /* @__PURE__ */ jsxDEV(Star, { className: "h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" }, void 0, false, {
            fileName: "/home/project/src/components/HeroCarousel.tsx",
            lineNumber: 302,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-lg", children: currentItem.vote_average?.toFixed(1) || "N/A" }, void 0, false, {
            fileName: "/home/project/src/components/HeroCarousel.tsx",
            lineNumber: 303,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/HeroCarousel.tsx",
          lineNumber: 301,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full", children: [
          /* @__PURE__ */ jsxDEV(Calendar, { className: "h-5 w-5 mr-2" }, void 0, false, {
            fileName: "/home/project/src/components/HeroCarousel.tsx",
            lineNumber: 306,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: year }, void 0, false, {
            fileName: "/home/project/src/components/HeroCarousel.tsx",
            lineNumber: 307,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/HeroCarousel.tsx",
          lineNumber: 305,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/HeroCarousel.tsx",
        lineNumber: 300,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-white/85 text-xl leading-relaxed mb-8 line-clamp-3 max-w-2xl", children: currentItem.overview && currentItem.overview.trim() !== "" ? currentItem.overview : "Una emocionante historia que cautivará tu atención. Descubre más detalles en la información completa." }, void 0, false, {
        fileName: "/home/project/src/components/HeroCarousel.tsx",
        lineNumber: 311,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-4", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleWatchNow,
            onMouseEnter: () => setIsButtonHovered("watch"),
            onMouseLeave: () => setIsButtonHovered(null),
            disabled: !hasTrailer,
            className: `px-8 py-4 rounded-full font-bold transition-all duration-500 flex items-center relative overflow-hidden ${hasTrailer ? "bg-white text-black hover:bg-white/90 shadow-2xl transform hover:scale-110" : "bg-gray-400 text-gray-600 cursor-not-allowed"} ${isButtonHovered === "watch" ? "scale-110 shadow-2xl" : ""}`,
            children: [
              hasTrailer && isButtonHovered === "watch" && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse" }, void 0, false, {
                fileName: "/home/project/src/components/HeroCarousel.tsx",
                lineNumber: 331,
                columnNumber: 19
              }, this),
              hasTrailer && isButtonHovered === "watch" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Sparkles, { className: "absolute top-1 left-2 h-3 w-3 text-red-500 animate-bounce" }, void 0, false, {
                  fileName: "/home/project/src/components/HeroCarousel.tsx",
                  lineNumber: 337,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(Zap, { className: "absolute top-1 right-2 h-3 w-3 text-yellow-500 animate-pulse" }, void 0, false, {
                  fileName: "/home/project/src/components/HeroCarousel.tsx",
                  lineNumber: 338,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/components/HeroCarousel.tsx",
                lineNumber: 336,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(Play, { className: `h-5 w-5 mr-2 relative z-10 transition-transform duration-300 ${isButtonHovered === "watch" ? "scale-125 text-red-600" : ""}` }, void 0, false, {
                fileName: "/home/project/src/components/HeroCarousel.tsx",
                lineNumber: 342,
                columnNumber: 19
              }, this),
              hasTrailer ? "Ver Tráiler" : "Sin Tráiler"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/components/HeroCarousel.tsx",
            lineNumber: 318,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: `/${itemType}/${currentItem.id}`,
            onMouseEnter: () => setIsButtonHovered("info"),
            onMouseLeave: () => setIsButtonHovered(null),
            className: `bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold transition-all duration-500 flex items-center relative overflow-hidden shadow-xl ${isButtonHovered === "info" ? "bg-white/40 scale-110 shadow-2xl" : "hover:bg-white/30 hover:scale-105"}`,
            children: [
              isButtonHovered === "info" && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse" }, void 0, false, {
                fileName: "/home/project/src/components/HeroCarousel.tsx",
                lineNumber: 358,
                columnNumber: 19
              }, this),
              isButtonHovered === "info" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Heart, { className: "absolute top-1 left-2 h-3 w-3 text-pink-300 animate-pulse" }, void 0, false, {
                  fileName: "/home/project/src/components/HeroCarousel.tsx",
                  lineNumber: 364,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(Star, { className: "absolute top-1 right-2 h-3 w-3 text-yellow-300 animate-bounce" }, void 0, false, {
                  fileName: "/home/project/src/components/HeroCarousel.tsx",
                  lineNumber: 365,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/components/HeroCarousel.tsx",
                lineNumber: 363,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "relative z-10", children: "Más Info" }, void 0, false, {
                fileName: "/home/project/src/components/HeroCarousel.tsx",
                lineNumber: 369,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/components/HeroCarousel.tsx",
            lineNumber: 348,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/components/HeroCarousel.tsx",
        lineNumber: 317,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 293,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 292,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 291,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 290,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20", children: items.map(
      (_, index) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => goToSlide(index),
          className: `relative transition-all duration-300 ${index === currentIndex ? "w-12 h-3" : "w-3 h-3 hover:w-6"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"}` }, void 0, false, {
              fileName: "/home/project/src/components/HeroCarousel.tsx",
              lineNumber: 391,
              columnNumber: 13
            }, this),
            index === currentIndex && isAutoPlaying && /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300",
                style: { width: `${progress}%` }
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/HeroCarousel.tsx",
                lineNumber: 397,
                columnNumber: 11
              },
              this
            )
          ]
        },
        index,
        true,
        {
          fileName: "/home/project/src/components/HeroCarousel.tsx",
          lineNumber: 382,
          columnNumber: 9
        },
        this
      )
    ) }, void 0, false, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 380,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-8 right-8 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium z-20", children: [
      currentIndex + 1,
      " / ",
      items.length
    ] }, void 0, true, {
      fileName: "/home/project/src/components/HeroCarousel.tsx",
      lineNumber: 407,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/HeroCarousel.tsx",
    lineNumber: 230,
    columnNumber: 5
  }, this);
}
_s(HeroCarousel, "6jzpy3w7GytfjnShYykalRkN6i0=");
_c = HeroCarousel;
var _c;
$RefreshReg$(_c, "HeroCarousel");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/HeroCarousel.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/HeroCarousel.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFlO0FBQUEsTUFBRTtBQUFBLE1BQUlGLE1BQU1vQjtBQUFBQSxTQUQ5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRUE7QUFBQSxPQW5MRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBb0xBO0FBRUo7QUFBQ25CLEdBMVhlRixjQUFZO0FBQUFzSCxLQUFadEg7QUFBWSxJQUFBc0g7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlQ2FsbGJhY2siLCJMaW5rIiwiQ2hldnJvbkxlZnQiLCJDaGV2cm9uUmlnaHQiLCJTdGFyIiwiQ2FsZW5kYXIiLCJQbGF5IiwiUGF1c2UiLCJTcGFya2xlcyIsIlphcCIsIkhlYXJ0IiwidG1kYlNlcnZpY2UiLCJjb250ZW50U3luY1NlcnZpY2UiLCJwZXJmb3JtYW5jZU9wdGltaXplciIsIklNQUdFX0JBU0VfVVJMIiwiQkFDS0RST1BfU0laRSIsIkhlcm9DYXJvdXNlbCIsIml0ZW1zIiwiX3MiLCJjdXJyZW50SW5kZXgiLCJzZXRDdXJyZW50SW5kZXgiLCJpc0F1dG9QbGF5aW5nIiwic2V0SXNBdXRvUGxheWluZyIsImlzVHJhbnNpdGlvbmluZyIsInNldElzVHJhbnNpdGlvbmluZyIsInByb2dyZXNzIiwic2V0UHJvZ3Jlc3MiLCJpdGVtVmlkZW9zIiwic2V0SXRlbVZpZGVvcyIsInByZWxvYWRlZEltYWdlcyIsInNldFByZWxvYWRlZEltYWdlcyIsIlNldCIsImlzQnV0dG9uSG92ZXJlZCIsInNldElzQnV0dG9uSG92ZXJlZCIsIkFVVE9QTEFZX0lOVEVSVkFMIiwicHJlbG9hZE5leHRJbWFnZXMiLCJuZXh0SW5kZXgiLCJsZW5ndGgiLCJwcmV2SW5kZXgiLCJmb3JFYWNoIiwiaW5kZXgiLCJpdGVtIiwiYmFja2Ryb3BfcGF0aCIsImltYWdlVXJsIiwiaGFzIiwicHJlbG9hZFJlc291cmNlIiwicHJldiIsImxvYWRWaWRlb3MiLCJ2aWRlb1Byb21pc2VzIiwibWFwIiwiaXNNb3ZpZSIsImNhY2hlZFZpZGVvRGF0YSIsImdldENhY2hlZFZpZGVvcyIsImlkIiwidmlkZW9zIiwidmlkZW9EYXRhIiwiZ2V0TW92aWVWaWRlb3MiLCJnZXRUVlNob3dWaWRlb3MiLCJ0cmFpbGVycyIsInJlc3VsdHMiLCJmaWx0ZXIiLCJ2aWRlbyIsInNpdGUiLCJ0eXBlIiwidmlkZW9FcnJvciIsImNvbnNvbGUiLCJ3YXJuIiwiZXJyb3IiLCJQcm9taXNlIiwiYWxsU2V0dGxlZCIsInZpZGVvc01hcCIsInJlZHVjZSIsImFjYyIsInJlc3VsdCIsInN0YXR1cyIsInZhbHVlIiwiZ29Ub1ByZXZpb3VzIiwiZ29Ub05leHQiLCJnb1RvU2xpZGUiLCJ0aHJvdHRsZSIsImhhbmRsZUtleVByZXNzIiwiZXZlbnQiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzdGFydFRpbWUiLCJEYXRlIiwibm93IiwiYW5pbWF0ZSIsImVsYXBzZWQiLCJuZXdQcm9ncmVzcyIsIk1hdGgiLCJtaW4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicmVmcmVzaENhcm91c2VsIiwiZnJlc2hDb250ZW50IiwiZ2V0SGVyb0NvbnRlbnQiLCJkYWlseVJlZnJlc2giLCJjdXJyZW50SXRlbSIsInRpdGxlIiwibmFtZSIsInJlbGVhc2VEYXRlIiwicmVsZWFzZV9kYXRlIiwiZmlyc3RfYWlyX2RhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJpdGVtVHlwZSIsImN1cnJlbnRWaWRlb3MiLCJoYXNUcmFpbGVyIiwiaGFuZGxlV2F0Y2hOb3ciLCJ0cmFpbGVyIiwieW91dHViZVVybCIsIm9wZW4iLCJpdGVtQmFja2Ryb3AiLCJpc0FjdGl2ZSIsImlzUHJldiIsImlzTmV4dCIsImJhY2tncm91bmRJbWFnZSIsInZvdGVfYXZlcmFnZSIsInRvRml4ZWQiLCJvdmVydmlldyIsInRyaW0iLCJfIiwid2lkdGgiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJIZXJvQ2Fyb3VzZWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IENoZXZyb25MZWZ0LCBDaGV2cm9uUmlnaHQsIFN0YXIsIENhbGVuZGFyLCBQbGF5LCBQYXVzZSwgU3BhcmtsZXMsIFphcCwgSGVhcnQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgT3B0aW1pemVkSW1hZ2UgfSBmcm9tICcuL09wdGltaXplZEltYWdlJztcbmltcG9ydCB7IHRtZGJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdG1kYic7XG5pbXBvcnQgeyBjb250ZW50U3luY1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb250ZW50U3luYyc7XG5pbXBvcnQgeyBwZXJmb3JtYW5jZU9wdGltaXplciB9IGZyb20gJy4uL3V0aWxzL3BlcmZvcm1hbmNlJztcbmltcG9ydCB7IElNQUdFX0JBU0VfVVJMLCBCQUNLRFJPUF9TSVpFIH0gZnJvbSAnLi4vY29uZmlnL2FwaSc7XG5pbXBvcnQgdHlwZSB7IE1vdmllLCBUVlNob3csIFZpZGVvIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG5pbnRlcmZhY2UgSGVyb0Nhcm91c2VsUHJvcHMge1xuICBpdGVtczogKE1vdmllIHwgVFZTaG93KVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSGVyb0Nhcm91c2VsKHsgaXRlbXMgfTogSGVyb0Nhcm91c2VsUHJvcHMpIHtcbiAgY29uc3QgW2N1cnJlbnRJbmRleCwgc2V0Q3VycmVudEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbaXNBdXRvUGxheWluZywgc2V0SXNBdXRvUGxheWluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2lzVHJhbnNpdGlvbmluZywgc2V0SXNUcmFuc2l0aW9uaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Byb2dyZXNzLCBzZXRQcm9ncmVzc10gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2l0ZW1WaWRlb3MsIHNldEl0ZW1WaWRlb3NdID0gdXNlU3RhdGU8eyBba2V5OiBudW1iZXJdOiBWaWRlb1tdIH0+KHt9KTtcbiAgY29uc3QgW3ByZWxvYWRlZEltYWdlcywgc2V0UHJlbG9hZGVkSW1hZ2VzXSA9IHVzZVN0YXRlPFNldDxzdHJpbmc+PihuZXcgU2V0KCkpO1xuICBjb25zdCBbaXNCdXR0b25Ib3ZlcmVkLCBzZXRJc0J1dHRvbkhvdmVyZWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgQVVUT1BMQVlfSU5URVJWQUwgPSA2MDAwOyAvLyA2IHNlY29uZHNcblxuICAvLyBQcmVsb2FkIG5leHQgaW1hZ2VzIGZvciBzbW9vdGggdHJhbnNpdGlvbnNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBwcmVsb2FkTmV4dEltYWdlcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG5leHRJbmRleCA9IChjdXJyZW50SW5kZXggKyAxKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgIGNvbnN0IHByZXZJbmRleCA9IChjdXJyZW50SW5kZXggLSAxICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgIFxuICAgICAgW25leHRJbmRleCwgcHJldkluZGV4XS5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgaWYgKGl0ZW0/LmJhY2tkcm9wX3BhdGgpIHtcbiAgICAgICAgICBjb25zdCBpbWFnZVVybCA9IGAke0lNQUdFX0JBU0VfVVJMfS8ke0JBQ0tEUk9QX1NJWkV9JHtpdGVtLmJhY2tkcm9wX3BhdGh9YDtcbiAgICAgICAgICBpZiAoIXByZWxvYWRlZEltYWdlcy5oYXMoaW1hZ2VVcmwpKSB7XG4gICAgICAgICAgICBwZXJmb3JtYW5jZU9wdGltaXplci5wcmVsb2FkUmVzb3VyY2UoaW1hZ2VVcmwsICdpbWFnZScpO1xuICAgICAgICAgICAgc2V0UHJlbG9hZGVkSW1hZ2VzKHByZXYgPT4gbmV3IFNldChbLi4ucHJldiwgaW1hZ2VVcmxdKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcHJlbG9hZE5leHRJbWFnZXMoKTtcbiAgfSwgW2N1cnJlbnRJbmRleCwgaXRlbXMsIHByZWxvYWRlZEltYWdlc10pO1xuXG4gIC8vIENhcmdhciB2aWRlb3MgcGFyYSBjYWRhIGl0ZW1cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBsb2FkVmlkZW9zID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmlkZW9Qcm9taXNlcyA9IGl0ZW1zLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIENoZWNrIGNhY2hlIGZpcnN0XG4gICAgICAgICAgY29uc3QgaXNNb3ZpZSA9ICd0aXRsZScgaW4gaXRlbTtcbiAgICAgICAgICBjb25zdCBjYWNoZWRWaWRlb0RhdGEgPSBjb250ZW50U3luY1NlcnZpY2U/LmdldENhY2hlZFZpZGVvcz8uKGl0ZW0uaWQsIGlzTW92aWUgPyAnbW92aWUnIDogJ3R2Jyk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhY2hlZFZpZGVvRGF0YSAmJiBjYWNoZWRWaWRlb0RhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGl0ZW0uaWQsIHZpZGVvczogY2FjaGVkVmlkZW9EYXRhIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIEFQSSBjYWxsIHdpdGggZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdmlkZW9EYXRhID0gaXNNb3ZpZSBcbiAgICAgICAgICAgICAgPyBhd2FpdCB0bWRiU2VydmljZS5nZXRNb3ZpZVZpZGVvcyhpdGVtLmlkKVxuICAgICAgICAgICAgICA6IGF3YWl0IHRtZGJTZXJ2aWNlLmdldFRWU2hvd1ZpZGVvcyhpdGVtLmlkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdHJhaWxlcnMgPSB2aWRlb0RhdGEucmVzdWx0cy5maWx0ZXIoXG4gICAgICAgICAgICAgIHZpZGVvID0+IHZpZGVvLnNpdGUgPT09ICdZb3VUdWJlJyAmJiAodmlkZW8udHlwZSA9PT0gJ1RyYWlsZXInIHx8IHZpZGVvLnR5cGUgPT09ICdUZWFzZXInKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGl0ZW0uaWQsIHZpZGVvczogdHJhaWxlcnMgfTtcbiAgICAgICAgICB9IGNhdGNoICh2aWRlb0Vycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIHZpZGVvcyBhdmFpbGFibGUgZm9yICR7aXNNb3ZpZSA/ICdtb3ZpZScgOiAndHYnfSAke2l0ZW0uaWR9YCk7XG4gICAgICAgICAgICByZXR1cm4geyBpZDogaXRlbS5pZCwgdmlkZW9zOiBbXSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm9yIGxvYWRpbmcgdmlkZW9zIGZvciBpdGVtICR7aXRlbS5pZH06YCwgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiB7IGlkOiBpdGVtLmlkLCB2aWRlb3M6IFtdIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKHZpZGVvUHJvbWlzZXMpO1xuICAgICAgY29uc3QgdmlkZW9zTWFwID0gcmVzdWx0cy5yZWR1Y2UoKGFjYywgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnZnVsZmlsbGVkJykge1xuICAgICAgICAgIGNvbnN0IHsgaWQsIHZpZGVvcyB9ID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICAgIGFjY1tpZF0gPSB2aWRlb3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9IGFzIHsgW2tleTogbnVtYmVyXTogVmlkZW9bXSB9KTtcbiAgICAgIFxuICAgICAgc2V0SXRlbVZpZGVvcyh2aWRlb3NNYXApO1xuICAgIH07XG5cbiAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgbG9hZFZpZGVvcygpO1xuICAgIH1cbiAgfSwgW2l0ZW1zXSk7XG5cbiAgY29uc3QgZ29Ub1ByZXZpb3VzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc1RyYW5zaXRpb25pbmcpIHJldHVybjtcbiAgICBzZXRJc1RyYW5zaXRpb25pbmcodHJ1ZSk7XG4gICAgc2V0Q3VycmVudEluZGV4KChwcmV2SW5kZXgpID0+IFxuICAgICAgcHJldkluZGV4ID09PSAwID8gaXRlbXMubGVuZ3RoIC0gMSA6IHByZXZJbmRleCAtIDFcbiAgICApO1xuICAgIHNldFByb2dyZXNzKDApO1xuICB9LCBbaXRlbXMubGVuZ3RoLCBpc1RyYW5zaXRpb25pbmddKTtcblxuICBjb25zdCBnb1RvTmV4dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNUcmFuc2l0aW9uaW5nKSByZXR1cm47XG4gICAgc2V0SXNUcmFuc2l0aW9uaW5nKHRydWUpO1xuICAgIHNldEN1cnJlbnRJbmRleCgocHJldkluZGV4KSA9PiAocHJldkluZGV4ICsgMSkgJSBpdGVtcy5sZW5ndGgpO1xuICAgIHNldFByb2dyZXNzKDApO1xuICB9LCBbaXRlbXMubGVuZ3RoLCBpc1RyYW5zaXRpb25pbmddKTtcblxuICBjb25zdCBnb1RvU2xpZGUgPSB1c2VDYWxsYmFjayhwZXJmb3JtYW5jZU9wdGltaXplci50aHJvdHRsZSgoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGlmIChpc1RyYW5zaXRpb25pbmcgfHwgaW5kZXggPT09IGN1cnJlbnRJbmRleCkgcmV0dXJuO1xuICAgIHNldElzVHJhbnNpdGlvbmluZyh0cnVlKTtcbiAgICBzZXRDdXJyZW50SW5kZXgoaW5kZXgpO1xuICAgIHNldFByb2dyZXNzKDApO1xuICB9LCAxMDApLCBbY3VycmVudEluZGV4LCBpc1RyYW5zaXRpb25pbmddKTtcblxuICAvLyBIYW5kbGUga2V5Ym9hcmQgbmF2aWdhdGlvblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUtleVByZXNzID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICBnb1RvUHJldmlvdXMoKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgZ29Ub05leHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2V0SXNBdXRvUGxheWluZyhwcmV2ID0+ICFwcmV2KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlQcmVzcyk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5UHJlc3MpO1xuICB9LCBbZ29Ub1ByZXZpb3VzLCBnb1RvTmV4dF0pO1xuXG4gIC8vIEF1dG8tcGxheSBmdW5jdGlvbmFsaXR5XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0F1dG9QbGF5aW5nIHx8IGl0ZW1zLmxlbmd0aCA8PSAxKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGdvVG9OZXh0KCk7XG4gICAgfSwgQVVUT1BMQVlfSU5URVJWQUwpO1xuXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9LCBbaXNBdXRvUGxheWluZywgaXRlbXMubGVuZ3RoLCBnb1RvTmV4dF0pO1xuXG4gIC8vIFByb2dyZXNzIGJhciBhbmltYXRpb25cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzQXV0b1BsYXlpbmcgfHwgaXRlbXMubGVuZ3RoIDw9IDEpIHJldHVybjtcblxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgICAgY29uc3QgbmV3UHJvZ3Jlc3MgPSBNYXRoLm1pbigoZWxhcHNlZCAvIEFVVE9QTEFZX0lOVEVSVkFMKSAqIDEwMCwgMTAwKTtcbiAgICAgIHNldFByb2dyZXNzKG5ld1Byb2dyZXNzKTtcblxuICAgICAgaWYgKG5ld1Byb2dyZXNzIDwgMTAwKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgcmV0dXJuICgpID0+IGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lKTtcbiAgfSwgW2N1cnJlbnRJbmRleCwgaXNBdXRvUGxheWluZywgaXRlbXMubGVuZ3RoXSk7XG5cbiAgLy8gUmVzZXQgdHJhbnNpdGlvbiBzdGF0ZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRJc1RyYW5zaXRpb25pbmcoZmFsc2UpO1xuICAgIH0sIDUwMCk7XG4gICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcik7XG4gIH0sIFtjdXJyZW50SW5kZXhdKTtcblxuICAvLyBBdXRvLXJlZnJlc2ggY2Fyb3VzZWwgY29udGVudCBkYWlseVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJlZnJlc2hDYXJvdXNlbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZyZXNoQ29udGVudCA9IGF3YWl0IHRtZGJTZXJ2aWNlLmdldEhlcm9Db250ZW50KCk7XG4gICAgICAgIC8vIFRoaXMgd291bGQgbmVlZCB0byBiZSBwYXNzZWQgYmFjayB0byBwYXJlbnQgY29tcG9uZW50XG4gICAgICAgIC8vIEZvciBub3csIHdlJ2xsIHJlbHkgb24gdGhlIHBhcmVudCdzIHJlZnJlc2ggbWVjaGFuaXNtXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZWZyZXNoaW5nIGNhcm91c2VsIGNvbnRlbnQ6JywgZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBkYWlseVJlZnJlc2ggPSBzZXRJbnRlcnZhbChyZWZyZXNoQ2Fyb3VzZWwsIDI0ICogNjAgKiA2MCAqIDEwMDApOyAvLyAyNCBob3Vyc1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGRhaWx5UmVmcmVzaCk7XG4gIH0sIFtdKTtcblxuICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBjdXJyZW50SXRlbSA9IGl0ZW1zW2N1cnJlbnRJbmRleF07XG4gIGNvbnN0IHRpdGxlID0gJ3RpdGxlJyBpbiBjdXJyZW50SXRlbSA/IGN1cnJlbnRJdGVtLnRpdGxlIDogY3VycmVudEl0ZW0ubmFtZTtcbiAgY29uc3QgcmVsZWFzZURhdGUgPSAncmVsZWFzZV9kYXRlJyBpbiBjdXJyZW50SXRlbSA/IGN1cnJlbnRJdGVtLnJlbGVhc2VfZGF0ZSA6IGN1cnJlbnRJdGVtLmZpcnN0X2Fpcl9kYXRlO1xuICBjb25zdCB5ZWFyID0gcmVsZWFzZURhdGUgPyBuZXcgRGF0ZShyZWxlYXNlRGF0ZSkuZ2V0RnVsbFllYXIoKSA6ICdOL0EnO1xuICBjb25zdCBpdGVtVHlwZSA9ICd0aXRsZScgaW4gY3VycmVudEl0ZW0gPyAnbW92aWUnIDogJ3R2JztcbiAgY29uc3QgY3VycmVudFZpZGVvcyA9IGl0ZW1WaWRlb3NbY3VycmVudEl0ZW0uaWRdIHx8IFtdO1xuICBjb25zdCBoYXNUcmFpbGVyID0gY3VycmVudFZpZGVvcy5sZW5ndGggPiAwO1xuXG4gIGNvbnN0IGhhbmRsZVdhdGNoTm93ID0gKCkgPT4ge1xuICAgIGlmIChoYXNUcmFpbGVyKSB7XG4gICAgICBjb25zdCB0cmFpbGVyID0gY3VycmVudFZpZGVvc1swXTtcbiAgICAgIGNvbnN0IHlvdXR1YmVVcmwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0ke3RyYWlsZXIua2V5fWA7XG4gICAgICB3aW5kb3cub3Blbih5b3V0dWJlVXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtOTYgbWQ6aC1bNjAwcHhdIG92ZXJmbG93LWhpZGRlbiBncm91cFwiPlxuICAgICAgey8qIEJhY2tncm91bmQgSW1hZ2VzIHdpdGggUGFyYWxsYXggRWZmZWN0ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wXCI+XG4gICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgaXRlbUJhY2tkcm9wID0gaXRlbS5iYWNrZHJvcF9wYXRoXG4gICAgICAgICAgICA/IGAke0lNQUdFX0JBU0VfVVJMfS8ke0JBQ0tEUk9QX1NJWkV9JHtpdGVtLmJhY2tkcm9wX3BhdGh9YFxuICAgICAgICAgICAgOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODk1OTk4NDMyNTMtYzc2Y2M0YmNiOGNmP3c9MTI4MCZoPTcyMCZmaXQ9Y3JvcCZjcm9wPWNlbnRlcic7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpbmRleCA9PT0gY3VycmVudEluZGV4O1xuICAgICAgICAgIGNvbnN0IGlzUHJldiA9IGluZGV4ID09PSAoY3VycmVudEluZGV4IC0gMSArIGl0ZW1zLmxlbmd0aCkgJSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgY29uc3QgaXNOZXh0ID0gaW5kZXggPT09IChjdXJyZW50SW5kZXggKyAxKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgYmctY292ZXIgYmctY2VudGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTEwMDAgZWFzZS1pbi1vdXQgdHJhbnNmb3JtICR7XG4gICAgICAgICAgICAgICAgaXNBY3RpdmUgXG4gICAgICAgICAgICAgICAgICA/ICdvcGFjaXR5LTEwMCBzY2FsZS0xMDAnIFxuICAgICAgICAgICAgICAgICAgOiBpc1ByZXYgXG4gICAgICAgICAgICAgICAgICAgID8gJ29wYWNpdHktMCBzY2FsZS0xMDUgLXRyYW5zbGF0ZS14LWZ1bGwnIFxuICAgICAgICAgICAgICAgICAgICA6IGlzTmV4dCBcbiAgICAgICAgICAgICAgICAgICAgICA/ICdvcGFjaXR5LTAgc2NhbGUtMTA1IHRyYW5zbGF0ZS14LWZ1bGwnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnb3BhY2l0eS0wIHNjYWxlLTExMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYHVybCgke2l0ZW1CYWNrZHJvcH0pYCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQW5pbWF0ZWQgR3JhZGllbnQgT3ZlcmxheSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tYmxhY2svOTAgdmlhLWJsYWNrLzUwIHRvLXRyYW5zcGFyZW50XCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1yIGZyb20tYmxhY2svNjAgdmlhLXRyYW5zcGFyZW50IHRvLWJsYWNrLzMwXCIgLz5cblxuICAgICAgey8qIE5hdmlnYXRpb24gQXJyb3dzICovfVxuICAgICAgPGJ1dHRvblxuICAgICAgICBvbkNsaWNrPXtnb1RvUHJldmlvdXN9XG4gICAgICAgIGRpc2FibGVkPXtpc1RyYW5zaXRpb25pbmd9XG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtNiB0b3AtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXktMS8yIGJnLXdoaXRlLzEwIGJhY2tkcm9wLWJsdXItbWQgaG92ZXI6Ymctd2hpdGUvMjAgZGlzYWJsZWQ6b3BhY2l0eS01MCB0ZXh0LXdoaXRlIHAtNCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGhvdmVyOnNjYWxlLTExMCB6LTIwIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMFwiXG4gICAgICA+XG4gICAgICAgIDxDaGV2cm9uTGVmdCBjbGFzc05hbWU9XCJoLTYgdy02XCIgLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgXG4gICAgICA8YnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9e2dvVG9OZXh0fVxuICAgICAgICBkaXNhYmxlZD17aXNUcmFuc2l0aW9uaW5nfVxuICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC02IHRvcC0xLzIgdHJhbnNmb3JtIC10cmFuc2xhdGUteS0xLzIgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ci1tZCBob3ZlcjpiZy13aGl0ZS8yMCBkaXNhYmxlZDpvcGFjaXR5LTUwIHRleHQtd2hpdGUgcC00IHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6c2NhbGUtMTEwIHotMjAgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwXCJcbiAgICAgID5cbiAgICAgICAgPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJoLTYgdy02XCIgLz5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICB7LyogQXV0by1wbGF5IENvbnRyb2wgKi99XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQXV0b1BsYXlpbmcoIWlzQXV0b1BsYXlpbmcpfVxuICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNiByaWdodC02IGJnLXdoaXRlLzEwIGJhY2tkcm9wLWJsdXItbWQgaG92ZXI6Ymctd2hpdGUvMjAgdGV4dC13aGl0ZSBwLTMgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjpzY2FsZS0xMTAgei0yMCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDBcIlxuICAgICAgPlxuICAgICAgICB7aXNBdXRvUGxheWluZyA/IDxQYXVzZSBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8UGxheSBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgey8qIENvbnRlbnQgd2l0aCBTbGlkZSBBbmltYXRpb24gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtZnVsbCBmbGV4IGl0ZW1zLWVuZCB6LTEwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNiBzbTpweC04IGxnOnB4LTEyIHBiLTEyIHctZnVsbFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHRyYW5zZm9ybSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDAgJHtcbiAgICAgICAgICAgICAgaXNUcmFuc2l0aW9uaW5nID8gJ3RyYW5zbGF0ZS15LTggb3BhY2l0eS0wJyA6ICd0cmFuc2xhdGUteS0wIG9wYWNpdHktMTAwJ1xuICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC01eGwgbWQ6dGV4dC03eGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItNiBsZWFkaW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAge3RpdGxlfVxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTYgdGV4dC13aGl0ZS85MCBtYi02XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy13aGl0ZS8xMCBiYWNrZHJvcC1ibHVyLXNtIHB4LTQgcHktMiByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgIDxTdGFyIGNsYXNzTmFtZT1cImgtNSB3LTUgZmlsbC15ZWxsb3ctNDAwIHRleHQteWVsbG93LTQwMCBtci0yXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1sZ1wiPntjdXJyZW50SXRlbS52b3RlX2F2ZXJhZ2U/LnRvRml4ZWQoMSkgfHwgJ04vQSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ci1zbSBweC00IHB5LTIgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiaC01IHctNSBtci0yXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+e3llYXJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtd2hpdGUvODUgdGV4dC14bCBsZWFkaW5nLXJlbGF4ZWQgbWItOCBsaW5lLWNsYW1wLTMgbWF4LXctMnhsXCI+XG4gICAgICAgICAgICAgICAge2N1cnJlbnRJdGVtLm92ZXJ2aWV3ICYmIGN1cnJlbnRJdGVtLm92ZXJ2aWV3LnRyaW0oKSAhPT0gJydcbiAgICAgICAgICAgICAgICAgID8gY3VycmVudEl0ZW0ub3ZlcnZpZXdcbiAgICAgICAgICAgICAgICAgIDogJ1VuYSBlbW9jaW9uYW50ZSBoaXN0b3JpYSBxdWUgY2F1dGl2YXLDoSB0dSBhdGVuY2nDs24uIERlc2N1YnJlIG3DoXMgZGV0YWxsZXMgZW4gbGEgaW5mb3JtYWNpw7NuIGNvbXBsZXRhLid9XG4gICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggc3BhY2UteC00XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlV2F0Y2hOb3d9XG4gICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldElzQnV0dG9uSG92ZXJlZCgnd2F0Y2gnKX1cbiAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SXNCdXR0b25Ib3ZlcmVkKG51bGwpfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFoYXNUcmFpbGVyfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtOCBweS00IHJvdW5kZWQtZnVsbCBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwIGZsZXggaXRlbXMtY2VudGVyIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiAke1xuICAgICAgICAgICAgICAgICAgICBoYXNUcmFpbGVyIFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlIHRleHQtYmxhY2sgaG92ZXI6Ymctd2hpdGUvOTAgc2hhZG93LTJ4bCB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtMTEwJyBcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmF5LTQwMCB0ZXh0LWdyYXktNjAwIGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgICAgICAgIH0gJHtpc0J1dHRvbkhvdmVyZWQgPT09ICd3YXRjaCcgPyAnc2NhbGUtMTEwIHNoYWRvdy0yeGwnIDogJyd9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7LyogQW5pbWF0ZWQgYmFja2dyb3VuZCAqL31cbiAgICAgICAgICAgICAgICAgIHtoYXNUcmFpbGVyICYmIGlzQnV0dG9uSG92ZXJlZCA9PT0gJ3dhdGNoJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTUwMC8yMCB0by1waW5rLTUwMC8yMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHsvKiBGbG9hdGluZyBpY29ucyAqL31cbiAgICAgICAgICAgICAgICAgIHtoYXNUcmFpbGVyICYmIGlzQnV0dG9uSG92ZXJlZCA9PT0gJ3dhdGNoJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xIGxlZnQtMiBoLTMgdy0zIHRleHQtcmVkLTUwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMSByaWdodC0yIGgtMyB3LTMgdGV4dC15ZWxsb3ctNTAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT17YGgtNSB3LTUgbXItMiByZWxhdGl2ZSB6LTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgICAgICBpc0J1dHRvbkhvdmVyZWQgPT09ICd3YXRjaCcgPyAnc2NhbGUtMTI1IHRleHQtcmVkLTYwMCcgOiAnJ1xuICAgICAgICAgICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgICAgICAgICB7aGFzVHJhaWxlciA/ICdWZXIgVHLDoWlsZXInIDogJ1NpbiBUcsOhaWxlcid9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICAgIHRvPXtgLyR7aXRlbVR5cGV9LyR7Y3VycmVudEl0ZW0uaWR9YH1cbiAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0SXNCdXR0b25Ib3ZlcmVkKCdpbmZvJyl9XG4gICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldElzQnV0dG9uSG92ZXJlZChudWxsKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJnLXdoaXRlLzIwIGJhY2tkcm9wLWJsdXItc20gdGV4dC13aGl0ZSBweC04IHB5LTQgcm91bmRlZC1mdWxsIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgZmxleCBpdGVtcy1jZW50ZXIgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy14bCAke1xuICAgICAgICAgICAgICAgICAgICBpc0J1dHRvbkhvdmVyZWQgPT09ICdpbmZvJyA/ICdiZy13aGl0ZS80MCBzY2FsZS0xMTAgc2hhZG93LTJ4bCcgOiAnaG92ZXI6Ymctd2hpdGUvMzAgaG92ZXI6c2NhbGUtMTA1J1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgey8qIEFuaW1hdGVkIGJhY2tncm91bmQgKi99XG4gICAgICAgICAgICAgICAgICB7aXNCdXR0b25Ib3ZlcmVkID09PSAnaW5mbycgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAwLzMwIHRvLXB1cnBsZS01MDAvMzAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB7LyogRmxvYXRpbmcgaWNvbnMgKi99XG4gICAgICAgICAgICAgICAgICB7aXNCdXR0b25Ib3ZlcmVkID09PSAnaW5mbycgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxIZWFydCBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMSBsZWZ0LTIgaC0zIHctMyB0ZXh0LXBpbmstMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxTdGFyIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xIHJpZ2h0LTIgaC0zIHctMyB0ZXh0LXllbGxvdy0zMDAgYW5pbWF0ZS1ib3VuY2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgICAgIE3DoXMgSW5mb1xuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1vZGVybiBEb3RzIEluZGljYXRvciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTggbGVmdC0xLzIgdHJhbnNmb3JtIC10cmFuc2xhdGUteC0xLzIgZmxleCBzcGFjZS14LTMgei0yMFwiPlxuICAgICAgICB7aXRlbXMubWFwKChfLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBnb1RvU2xpZGUoaW5kZXgpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgICAgIGluZGV4ID09PSBjdXJyZW50SW5kZXhcbiAgICAgICAgICAgICAgICA/ICd3LTEyIGgtMydcbiAgICAgICAgICAgICAgICA6ICd3LTMgaC0zIGhvdmVyOnctNidcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgICAgIGluZGV4ID09PSBjdXJyZW50SW5kZXhcbiAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZSdcbiAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZS80MCBob3ZlcjpiZy13aGl0ZS82MCdcbiAgICAgICAgICAgIH1gfSAvPlxuICAgICAgICAgICAge2luZGV4ID09PSBjdXJyZW50SW5kZXggJiYgaXNBdXRvUGxheWluZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS00MDAgdG8tcHVycGxlLTQwMCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYCR7cHJvZ3Jlc3N9JWAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBTbGlkZSBDb3VudGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tOCByaWdodC04IGJnLWJsYWNrLzMwIGJhY2tkcm9wLWJsdXItc20gdGV4dC13aGl0ZSBweC00IHB5LTIgcm91bmRlZC1mdWxsIHRleHQtc20gZm9udC1tZWRpdW0gei0yMFwiPlxuICAgICAgICB7Y3VycmVudEluZGV4ICsgMX0gLyB7aXRlbXMubGVuZ3RofVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9jb21wb25lbnRzL0hlcm9DYXJvdXNlbC50c3gifQ==