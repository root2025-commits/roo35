import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/NovelDetail.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/NovelDetail.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { useParams, Link } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { ArrowLeft, Star, Calendar, BookOpen, Plus, X, Globe, DollarSign, CreditCard, Sparkles, Heart, Zap, Check, CheckCircle, Monitor } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useCart } from "/src/context/CartContext.tsx";
import { useAdmin } from "/src/context/AdminContext.tsx";
import { LoadingSpinner } from "/src/components/LoadingSpinner.tsx";
import { ErrorMessage } from "/src/components/ErrorMessage.tsx";
export function NovelDetail() {
  _s();
  const { id } = useParams();
  const { state: adminState } = useAdmin();
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");
  const { addNovel, removeItem, isInCart, getCurrentPrices } = useCart();
  const novelId = parseInt(id || "0");
  const inCart = isInCart(novelId);
  const currentPrices = getCurrentPrices();
  useEffect(() => {
    const fetchNovelData = async () => {
      try {
        setLoading(true);
        const foundNovel = adminState.novels?.find((n) => n.id === novelId);
        if (foundNovel) {
          setNovel(foundNovel);
        } else {
          setError("Novela no encontrada");
        }
      } catch (err) {
        setError("Error al cargar los detalles de la novela.");
        console.error("Error fetching novel details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (novelId) {
      fetchNovelData();
    }
  }, [novelId, adminState.novels]);
  const handleCartAction = () => {
    if (!novel) return;
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 2e3);
    if (inCart) {
      removeItem(novel.id);
    } else {
      const novelCartItem = {
        id: novel.id,
        title: novel.titulo,
        type: "novel",
        genre: novel.genero,
        chapters: novel.capitulos,
        year: novel.año,
        description: novel.descripcion,
        country: novel.pais,
        status: novel.estado,
        image: novel.imagen,
        paymentType,
        pricePerChapter: currentPrices.novelPricePerChapter,
        totalPrice: paymentType === "transfer" ? Math.round(novel.capitulos * currentPrices.novelPricePerChapter * (1 + currentPrices.transferFeePercentage / 100)) : novel.capitulos * currentPrices.novelPricePerChapter
      };
      addNovel(novelCartItem);
    }
  };
  const getNovelImage = (novel2) => {
    if (novel2.imagen) {
      return novel2.imagen;
    }
    const genreImages = {
      "Drama": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop",
      "Romance": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=1200&fit=crop",
      "Acción": "https://images.unsplash.com/photo-1489599843253-c76cc4bcb8cf?w=800&h=1200&fit=crop",
      "Comedia": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=1200&fit=crop",
      "Familia": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=1200&fit=crop"
    };
    return genreImages[novel2.genero] || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop";
  };
  const getCountryFlag = (country) => {
    const flags = {
      "Turquía": "🇹🇷",
      "Cuba": "🇨🇺",
      "México": "🇲🇽",
      "Brasil": "🇧🇷",
      "Colombia": "🇨🇴",
      "Argentina": "🇦🇷",
      "España": "🇪🇸",
      "Estados Unidos": "🇺🇸",
      "Corea del Sur": "🇰🇷",
      "India": "🇮🇳",
      "Reino Unido": "🇬🇧",
      "Francia": "🇫🇷",
      "Italia": "🇮🇹",
      "Alemania": "🇩🇪",
      "Japón": "🇯🇵",
      "China": "🇨🇳",
      "Rusia": "🇷🇺"
    };
    return flags[country] || "🌍";
  };
  const calculatePrice = (type) => {
    if (!novel) return 0;
    const basePrice = novel.capitulos * currentPrices.novelPricePerChapter;
    return type === "transfer" ? Math.round(basePrice * (1 + currentPrices.transferFeePercentage / 100)) : basePrice;
  };
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
      fileName: "/home/project/src/pages/NovelDetail.tsx",
      lineNumber: 167,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/NovelDetail.tsx",
      lineNumber: 166,
      columnNumber: 7
    }, this);
  }
  if (error || !novel) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(ErrorMessage, { message: error || "Novela no encontrada" }, void 0, false, {
      fileName: "/home/project/src/pages/NovelDetail.tsx",
      lineNumber: 175,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/NovelDetail.tsx",
      lineNumber: 174,
      columnNumber: 7
    }, this);
  }
  const backdropUrl = getNovelImage(novel);
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
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 186,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" }, void 0, false, {
        fileName: "/home/project/src/pages/NovelDetail.tsx",
        lineNumber: 190,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative h-full flex items-end", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full", children: [
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/",
            className: "inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors",
            children: [
              /* @__PURE__ */ jsxDEV(ArrowLeft, { className: "mr-2 h-4 w-4" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 198,
                columnNumber: 15
              }, this),
              "Volver al inicio"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 194,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-4", children: novel.titulo }, void 0, false, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 202,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-4 text-white/90 mb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Calendar, { className: "h-5 w-5 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 208,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: novel.año }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 209,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 207,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-5 w-5 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 212,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              novel.capitulos,
              " capítulos"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 213,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 211,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Globe, { className: "h-5 w-5 mr-1" }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 216,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              getCountryFlag(novel.pais || "No especificado"),
              " ",
              novel.pais || "No especificado"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 217,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 215,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2 mb-6", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white", children: novel.genero }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 222,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `px-3 py-1 backdrop-blur-sm rounded-full text-sm text-white ${novel.estado === "transmision" ? "bg-red-500/80" : "bg-green-500/80"}`, children: novel.estado === "transmision" ? "📡 En Transmisión" : "✅ Finalizada" }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 225,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 221,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/NovelDetail.tsx",
        lineNumber: 193,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/NovelDetail.tsx",
        lineNumber: 192,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/NovelDetail.tsx",
      lineNumber: 185,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl mr-4 shadow-lg", children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl", children: "📚" }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 243,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 242,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent", children: "Sinopsis" }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 245,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 241,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 leading-relaxed text-lg mb-8", children: novel.descripcion || "Sin descripción disponible." }, void 0, false, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 249,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-6 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-3xl blur-3xl opacity-25 animate-pulse" }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 257,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative bg-white rounded-3xl overflow-hidden shadow-2xl", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "h-2 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-pink-500" }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 262,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-gray-50 to-white px-6 py-5 border-b-2 border-gray-100", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-4", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg transform hover:rotate-6 transition-transform duration-300", children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-6 w-6 text-white" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 269,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 268,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1", children: "Imagen Oficial" }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 272,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-gray-900 line-clamp-1", children: novel.titulo }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 273,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 271,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 267,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxDEV("span", { className: `px-4 py-2 rounded-xl text-xs font-bold shadow-md ${novel.estado === "transmision" ? "bg-gradient-to-r from-red-500 to-red-600 text-white" : "bg-gradient-to-r from-green-500 to-green-600 text-white"}`, children: novel.estado === "transmision" ? "📡 EN VIVO" : "✅ COMPLETA" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 277,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 276,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 266,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 265,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 sm:p-8 md:p-10 lg:p-12", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-pink-400 rounded-tl-xl" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 291,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-purple-400 rounded-tr-xl" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 292,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-blue-400 rounded-bl-xl" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 293,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-pink-400 rounded-br-xl" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 294,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "relative mx-auto max-w-4xl", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-gray-200", children: [
                  /* @__PURE__ */ jsxDEV(
                    "img",
                    {
                      src: backdropUrl,
                      alt: novel.titulo,
                      className: "w-full h-auto object-contain bg-white",
                      style: {
                        maxHeight: "700px",
                        minHeight: "400px"
                      },
                      onError: (e) => {
                        const target = e.target;
                        target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop";
                      }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 299,
                      columnNumber: 27
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 313,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 298,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white px-6 py-2 rounded-full shadow-xl", children: /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold whitespace-nowrap", children: "Alta Definición" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 318,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 317,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 297,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 289,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-gray-50 to-white px-6 py-5 border-t-2 border-gray-100", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-center gap-4 sm:gap-6", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200", children: [
                /* @__PURE__ */ jsxDEV(Calendar, { className: "h-5 w-5 text-pink-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 327,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 font-medium", children: "Año" }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 329,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold text-gray-900", children: novel.año }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 330,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 328,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 326,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200", children: [
                /* @__PURE__ */ jsxDEV(Monitor, { className: "h-5 w-5 text-purple-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 335,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 font-medium", children: "Capítulos" }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 337,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold text-gray-900", children: novel.capitulos }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 338,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 336,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 334,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200", children: [
                /* @__PURE__ */ jsxDEV(Globe, { className: "h-5 w-5 text-blue-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 343,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 font-medium", children: "País" }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 345,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold text-gray-900", children: [
                    getCountryFlag(novel.pais || "N/A"),
                    " ",
                    novel.pais || "N/A"
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 346,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 344,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 342,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-5 py-2.5 rounded-xl shadow-sm border border-pink-200", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-600 font-medium mb-0.5", children: "Género" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 351,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent", children: novel.genero }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 352,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 350,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 325,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 324,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 260,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 255,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 254,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-5 w-5 text-pink-600 mr-2" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 364,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-pink-800", children: "Información de la Novela" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 365,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 363,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxDEV("p", { children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "Género:" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 368,
                  columnNumber: 24
                }, this),
                " ",
                novel.genero
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 368,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "Capítulos:" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 369,
                  columnNumber: 24
                }, this),
                " ",
                novel.capitulos
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 369,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "País:" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 370,
                  columnNumber: 24
                }, this),
                " ",
                getCountryFlag(novel.pais || "No especificado"),
                " ",
                novel.pais || "No especificado"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 370,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "Estado:" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 371,
                  columnNumber: 24
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `ml-2 px-2 py-1 rounded-full text-xs font-bold ${novel.estado === "transmision" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`, children: novel.estado === "transmision" ? "📡 En Transmisión" : "✅ Finalizada" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 372,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 371,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 367,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 362,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-5 w-5 text-blue-600 mr-2" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 383,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-blue-800", children: "Información de Precios" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 384,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 382,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxDEV("p", { children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "Precio por capítulo:" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 387,
                  columnNumber: 24
                }, this),
                " $",
                currentPrices.novelPricePerChapter,
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 387,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "Costo total (efectivo):" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 388,
                  columnNumber: 24
                }, this),
                " $",
                (novel.capitulos * currentPrices.novelPricePerChapter).toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 388,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "Costo total (transferencia):" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 389,
                  columnNumber: 24
                }, this),
                " $",
                Math.round(novel.capitulos * currentPrices.novelPricePerChapter * (1 + currentPrices.transferFeePercentage / 100)).toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 389,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-orange-600", children: [
                /* @__PURE__ */ jsxDEV("strong", { children: "Recargo transferencia:" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 390,
                  columnNumber: 52
                }, this),
                " +",
                currentPrices.transferFeePercentage,
                "%"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 390,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 386,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 381,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 361,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/NovelDetail.tsx",
        lineNumber: 240,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/NovelDetail.tsx",
        lineNumber: 238,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-pink-600 to-purple-600 p-6 text-white", children: /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold flex items-center", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-2 rounded-lg mr-3", children: /* @__PURE__ */ jsxDEV("span", { className: "text-lg", children: "📚" }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 403,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 402,
            columnNumber: 19
          }, this),
          "Detalles de la Novela"
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 401,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 400,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-gray-800 mr-3", children: "💳 Método de Pago:" }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 414,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 413,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center space-x-3", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setPaymentType("cash"),
                  className: `relative px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${paymentType === "cash" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105" : "bg-white text-gray-600 hover:bg-green-50 border-2 border-gray-200 hover:border-green-300"}`,
                  children: [
                    paymentType === "cash" && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 -right-1 bg-green-400 text-white p-1 rounded-full", children: /* @__PURE__ */ jsxDEV(Check, { className: "h-3 w-3" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 427,
                      columnNumber: 29
                    }, this) }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 426,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-4 w-4 inline mr-2" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 430,
                      columnNumber: 25
                    }, this),
                    "Efectivo",
                    paymentType === "cash" && /* @__PURE__ */ jsxDEV(Sparkles, { className: "h-3 w-3 inline ml-2 animate-pulse" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 433,
                      columnNumber: 25
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 417,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setPaymentType("transfer"),
                  className: `relative px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${paymentType === "transfer" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105" : "bg-white text-gray-600 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300"}`,
                  children: [
                    paymentType === "transfer" && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 -right-1 bg-orange-400 text-white p-1 rounded-full", children: /* @__PURE__ */ jsxDEV(Check, { className: "h-3 w-3" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 446,
                      columnNumber: 29
                    }, this) }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 445,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV(CreditCard, { className: "h-4 w-4 inline mr-2" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 449,
                      columnNumber: 25
                    }, this),
                    "Transferencia",
                    /* @__PURE__ */ jsxDEV("span", { className: "ml-1 text-xs opacity-90", children: [
                      "(+",
                      currentPrices.transferFeePercentage,
                      "%)"
                    ] }, void 0, true, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 451,
                      columnNumber: 25
                    }, this),
                    paymentType === "transfer" && /* @__PURE__ */ jsxDEV(Zap, { className: "h-3 w-3 inline ml-2 animate-pulse" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 455,
                      columnNumber: 25
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 436,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 416,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 412,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 411,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleCartAction,
                onMouseEnter: () => setIsCartHovered(true),
                onMouseLeave: () => setIsCartHovered(false),
                className: `w-full mb-6 px-6 py-5 rounded-2xl font-bold transition-all duration-500 flex items-center justify-center transform relative overflow-hidden ${inCart ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white shadow-2xl scale-105" : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-xl"} ${isCartHovered ? "scale-110 shadow-2xl" : ""} ${showCartAnimation ? "animate-pulse" : ""}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 ${isCartHovered ? "animate-pulse" : ""}` }, void 0, false, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 474,
                    columnNumber: 21
                  }, this),
                  isCartHovered && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "absolute top-2 left-4 h-4 w-4 text-yellow-300 animate-bounce" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 481,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV(Heart, { className: "absolute top-2 right-4 h-4 w-4 text-pink-300 animate-pulse" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 482,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV(Zap, { className: "absolute bottom-2 left-6 h-4 w-4 text-blue-300 animate-bounce delay-100" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 483,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV(Star, { className: "absolute bottom-2 right-6 h-4 w-4 text-yellow-300 animate-pulse delay-200" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 484,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 480,
                    columnNumber: 21
                  }, this),
                  inCart ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(X, { className: `mr-3 h-6 w-6 transition-transform duration-300 relative z-10 ${isCartHovered ? "rotate-90 scale-125" : ""}` }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 490,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "relative z-10 text-lg", children: "Retirar del Carrito" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 493,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 489,
                    columnNumber: 21
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Plus, { className: `mr-3 h-6 w-6 transition-transform duration-300 relative z-10 ${isCartHovered ? "rotate-180 scale-125" : ""}` }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 497,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "relative z-10 text-lg", children: "Agregar al Carrito" }, void 0, false, {
                      fileName: "/home/project/src/pages/NovelDetail.tsx",
                      lineNumber: 500,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/pages/NovelDetail.tsx",
                    lineNumber: 496,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 463,
                columnNumber: 19
              },
              this
            ),
            inCart && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white p-2 rounded-full shadow-lg", children: /* @__PURE__ */ jsxDEV(CheckCircle, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 508,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 507,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 462,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mb-6", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-lg", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-green-700 mb-2 flex items-center justify-center", children: [
              paymentType === "cash" ? /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-4 w-4 mr-1" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 519,
                columnNumber: 25
              }, this) : /* @__PURE__ */ jsxDEV(CreditCard, { className: "h-4 w-4 mr-1" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 521,
                columnNumber: 25
              }, this),
              paymentType === "cash" ? "Efectivo" : "Transferencia"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 517,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-3xl font-black text-green-800 mb-2", children: [
              "$",
              calculatePrice(paymentType).toLocaleString(),
              " CUP"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 525,
              columnNumber: 23
            }, this),
            paymentType === "transfer" && /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-orange-600 font-semibold bg-orange-100 px-2 py-1 rounded-full", children: [
              "+",
              currentPrices.transferFeePercentage,
              "% incluido"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 529,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-gray-500 mt-2", children: [
              "$",
              currentPrices.novelPricePerChapter,
              " CUP × ",
              novel.capitulos,
              " capítulos"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 533,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 516,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 515,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 514,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-pink-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-pink-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-4 w-4 text-pink-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 544,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 543,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Género" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 546,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 542,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: novel.genero }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 548,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 541,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Monitor, { className: "h-4 w-4 text-blue-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 554,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 553,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Capítulos" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 556,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 552,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: novel.capitulos }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 558,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 551,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-green-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-green-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Calendar, { className: "h-4 w-4 text-green-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 564,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 563,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Año" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 566,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 562,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: novel.año }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 568,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 561,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-purple-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-100 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Globe, { className: "h-4 w-4 text-purple-600" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 574,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 573,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "País de Origen" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 576,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 572,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-700 font-medium ml-11", children: [
                getCountryFlag(novel.pais || "No especificado"),
                " ",
                novel.pais || "No especificado"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 578,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 571,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-indigo-200 transition-colors", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded-lg mr-3 shadow-sm ${novel.estado === "transmision" ? "bg-red-100" : "bg-green-100"}`, children: /* @__PURE__ */ jsxDEV("span", { className: "text-sm", children: novel.estado === "transmision" ? "📡" : "✅" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 588,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 585,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900", children: "Estado" }, void 0, false, {
                  fileName: "/home/project/src/pages/NovelDetail.tsx",
                  lineNumber: 592,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 584,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: `font-medium ml-11 ${novel.estado === "transmision" ? "text-red-600" : "text-green-600"}`, children: novel.estado === "transmision" ? "En Transmisión" : "Finalizada" }, void 0, false, {
                fileName: "/home/project/src/pages/NovelDetail.tsx",
                lineNumber: 594,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/NovelDetail.tsx",
              lineNumber: 583,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/NovelDetail.tsx",
            lineNumber: 540,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/NovelDetail.tsx",
          lineNumber: 409,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/NovelDetail.tsx",
        lineNumber: 399,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/NovelDetail.tsx",
        lineNumber: 398,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/NovelDetail.tsx",
      lineNumber: 236,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/NovelDetail.tsx",
      lineNumber: 235,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/NovelDetail.tsx",
    lineNumber: 183,
    columnNumber: 5
  }, this);
}
_s(NovelDetail, "XFH05JitcZY65gAmk7jFQTan9xk=", false, function() {
  return [useParams, useAdmin, useCart];
});
_c = NovelDetail;
var _c;
$RefreshReg$(_c, "NovelDetail");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/NovelDetail.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/NovelDetail.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LCtCQUE4QixzQkFBNUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBa0Q7QUFBQSxtQkFScEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFTQTtBQUFBLGNBQ0EsdUJBQUMsT0FBRSxXQUFXLHFCQUNaNUMsTUFBTTRDLFdBQVcsZ0JBQWdCLGlCQUFpQixnQkFBZ0IsSUFFakU1QyxnQkFBTTRDLFdBQVcsZ0JBQWdCLG1CQUFtQixnQkFIdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFJQTtBQUFBLGlCQWZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBZ0JBO0FBQUEsZUEzREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkE0REE7QUFBQSxhQS9MRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZ01BO0FBQUEsV0ExTUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTJNQSxLQTVNRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBNk1BO0FBQUEsU0EvV0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWdYQSxLQWpYRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBa1hBO0FBQUEsT0F0YUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXVhQTtBQUVKO0FBQUNoRCxHQXBqQmVELGFBQVc7QUFBQSxVQUNWckIsV0FDZWtCLFVBTytCRCxPQUFPO0FBQUE7QUFBQTRFLEtBVHREeEU7QUFBVyxJQUFBd0U7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUGFyYW1zIiwiTGluayIsIkFycm93TGVmdCIsIlN0YXIiLCJDYWxlbmRhciIsIkJvb2tPcGVuIiwiUGx1cyIsIlgiLCJHbG9iZSIsIkRvbGxhclNpZ24iLCJDcmVkaXRDYXJkIiwiU3BhcmtsZXMiLCJIZWFydCIsIlphcCIsIkNoZWNrIiwiQ2hlY2tDaXJjbGUiLCJNb25pdG9yIiwidXNlQ2FydCIsInVzZUFkbWluIiwiTG9hZGluZ1NwaW5uZXIiLCJFcnJvck1lc3NhZ2UiLCJOb3ZlbERldGFpbCIsIl9zIiwiaWQiLCJzdGF0ZSIsImFkbWluU3RhdGUiLCJub3ZlbCIsInNldE5vdmVsIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwiaXNDYXJ0SG92ZXJlZCIsInNldElzQ2FydEhvdmVyZWQiLCJzaG93Q2FydEFuaW1hdGlvbiIsInNldFNob3dDYXJ0QW5pbWF0aW9uIiwicGF5bWVudFR5cGUiLCJzZXRQYXltZW50VHlwZSIsImFkZE5vdmVsIiwicmVtb3ZlSXRlbSIsImlzSW5DYXJ0IiwiZ2V0Q3VycmVudFByaWNlcyIsIm5vdmVsSWQiLCJwYXJzZUludCIsImluQ2FydCIsImN1cnJlbnRQcmljZXMiLCJmZXRjaE5vdmVsRGF0YSIsImZvdW5kTm92ZWwiLCJub3ZlbHMiLCJmaW5kIiwibiIsImVyciIsImNvbnNvbGUiLCJoYW5kbGVDYXJ0QWN0aW9uIiwic2V0VGltZW91dCIsIm5vdmVsQ2FydEl0ZW0iLCJ0aXRsZSIsInRpdHVsbyIsInR5cGUiLCJnZW5yZSIsImdlbmVybyIsImNoYXB0ZXJzIiwiY2FwaXR1bG9zIiwieWVhciIsImHDsW8iLCJkZXNjcmlwdGlvbiIsImRlc2NyaXBjaW9uIiwiY291bnRyeSIsInBhaXMiLCJzdGF0dXMiLCJlc3RhZG8iLCJpbWFnZSIsImltYWdlbiIsInByaWNlUGVyQ2hhcHRlciIsIm5vdmVsUHJpY2VQZXJDaGFwdGVyIiwidG90YWxQcmljZSIsIk1hdGgiLCJyb3VuZCIsInRyYW5zZmVyRmVlUGVyY2VudGFnZSIsImdldE5vdmVsSW1hZ2UiLCJnZW5yZUltYWdlcyIsImdldENvdW50cnlGbGFnIiwiZmxhZ3MiLCJjYWxjdWxhdGVQcmljZSIsImJhc2VQcmljZSIsImJhY2tkcm9wVXJsIiwiYmFja2dyb3VuZEltYWdlIiwibWF4SGVpZ2h0IiwibWluSGVpZ2h0IiwiZSIsInRhcmdldCIsInNyYyIsInRvTG9jYWxlU3RyaW5nIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTm92ZWxEZXRhaWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUGFyYW1zLCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBBcnJvd0xlZnQsIFN0YXIsIENhbGVuZGFyLCBCb29rT3BlbiwgUGx1cywgWCwgR2xvYmUsIERvbGxhclNpZ24sIENyZWRpdENhcmQsIFVzZXJzLCBNYXBQaW4sIFNwYXJrbGVzLCBIZWFydCwgWmFwLCBDaGVjaywgQ2hlY2tDaXJjbGUsIEluZm8sIFBsYXksIE1vbml0b3IgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgdXNlQ2FydCB9IGZyb20gJy4uL2NvbnRleHQvQ2FydENvbnRleHQnO1xuaW1wb3J0IHsgdXNlQWRtaW4gfSBmcm9tICcuLi9jb250ZXh0L0FkbWluQ29udGV4dCc7XG5pbXBvcnQgeyBQcmljZUNhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL1ByaWNlQ2FyZCc7XG5pbXBvcnQgeyBMb2FkaW5nU3Bpbm5lciB9IGZyb20gJy4uL2NvbXBvbmVudHMvTG9hZGluZ1NwaW5uZXInO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9FcnJvck1lc3NhZ2UnO1xuaW1wb3J0IHR5cGUgeyBOb3ZlbENhcnRJdGVtIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG5pbnRlcmZhY2UgTm92ZWxEZXRhaWxzIHtcbiAgaWQ6IG51bWJlcjtcbiAgdGl0dWxvOiBzdHJpbmc7XG4gIGdlbmVybzogc3RyaW5nO1xuICBjYXBpdHVsb3M6IG51bWJlcjtcbiAgYcOxbzogbnVtYmVyO1xuICBkZXNjcmlwY2lvbj86IHN0cmluZztcbiAgcGFpcz86IHN0cmluZztcbiAgaW1hZ2VuPzogc3RyaW5nO1xuICBlc3RhZG8/OiAndHJhbnNtaXNpb24nIHwgJ2ZpbmFsaXphZGEnO1xuICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgdXBkYXRlZEF0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOb3ZlbERldGFpbCgpIHtcbiAgY29uc3QgeyBpZCB9ID0gdXNlUGFyYW1zPHsgaWQ6IHN0cmluZyB9PigpO1xuICBjb25zdCB7IHN0YXRlOiBhZG1pblN0YXRlIH0gPSB1c2VBZG1pbigpO1xuICBjb25zdCBbbm92ZWwsIHNldE5vdmVsXSA9IHVzZVN0YXRlPE5vdmVsRGV0YWlscyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzQ2FydEhvdmVyZWQsIHNldElzQ2FydEhvdmVyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0NhcnRBbmltYXRpb24sIHNldFNob3dDYXJ0QW5pbWF0aW9uXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BheW1lbnRUeXBlLCBzZXRQYXltZW50VHlwZV0gPSB1c2VTdGF0ZTwnY2FzaCcgfCAndHJhbnNmZXInPignY2FzaCcpO1xuICBjb25zdCB7IGFkZE5vdmVsLCByZW1vdmVJdGVtLCBpc0luQ2FydCwgZ2V0Q3VycmVudFByaWNlcyB9ID0gdXNlQ2FydCgpO1xuXG4gIGNvbnN0IG5vdmVsSWQgPSBwYXJzZUludChpZCB8fCAnMCcpO1xuICBjb25zdCBpbkNhcnQgPSBpc0luQ2FydChub3ZlbElkKTtcbiAgY29uc3QgY3VycmVudFByaWNlcyA9IGdldEN1cnJlbnRQcmljZXMoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoTm92ZWxEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEZpbmQgbm92ZWwgaW4gYWRtaW4gc3RhdGVcbiAgICAgICAgY29uc3QgZm91bmROb3ZlbCA9IGFkbWluU3RhdGUubm92ZWxzPy5maW5kKG4gPT4gbi5pZCA9PT0gbm92ZWxJZCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZm91bmROb3ZlbCkge1xuICAgICAgICAgIHNldE5vdmVsKGZvdW5kTm92ZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldEVycm9yKCdOb3ZlbGEgbm8gZW5jb250cmFkYScpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2V0RXJyb3IoJ0Vycm9yIGFsIGNhcmdhciBsb3MgZGV0YWxsZXMgZGUgbGEgbm92ZWxhLicpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBub3ZlbCBkZXRhaWxzOicsIGVycik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKG5vdmVsSWQpIHtcbiAgICAgIGZldGNoTm92ZWxEYXRhKCk7XG4gICAgfVxuICB9LCBbbm92ZWxJZCwgYWRtaW5TdGF0ZS5ub3ZlbHNdKTtcblxuICBjb25zdCBoYW5kbGVDYXJ0QWN0aW9uID0gKCkgPT4ge1xuICAgIGlmICghbm92ZWwpIHJldHVybjtcblxuICAgIHNldFNob3dDYXJ0QW5pbWF0aW9uKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2hvd0NhcnRBbmltYXRpb24oZmFsc2UpLCAyMDAwKTtcblxuICAgIGlmIChpbkNhcnQpIHtcbiAgICAgIHJlbW92ZUl0ZW0obm92ZWwuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub3ZlbENhcnRJdGVtOiBOb3ZlbENhcnRJdGVtID0ge1xuICAgICAgICBpZDogbm92ZWwuaWQsXG4gICAgICAgIHRpdGxlOiBub3ZlbC50aXR1bG8sXG4gICAgICAgIHR5cGU6ICdub3ZlbCcsXG4gICAgICAgIGdlbnJlOiBub3ZlbC5nZW5lcm8sXG4gICAgICAgIGNoYXB0ZXJzOiBub3ZlbC5jYXBpdHVsb3MsXG4gICAgICAgIHllYXI6IG5vdmVsLmHDsW8sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub3ZlbC5kZXNjcmlwY2lvbixcbiAgICAgICAgY291bnRyeTogbm92ZWwucGFpcyxcbiAgICAgICAgc3RhdHVzOiBub3ZlbC5lc3RhZG8sXG4gICAgICAgIGltYWdlOiBub3ZlbC5pbWFnZW4sXG4gICAgICAgIHBheW1lbnRUeXBlOiBwYXltZW50VHlwZSxcbiAgICAgICAgcHJpY2VQZXJDaGFwdGVyOiBjdXJyZW50UHJpY2VzLm5vdmVsUHJpY2VQZXJDaGFwdGVyLFxuICAgICAgICB0b3RhbFByaWNlOiBwYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJyBcbiAgICAgICAgICA/IE1hdGgucm91bmQoKG5vdmVsLmNhcGl0dWxvcyAqIGN1cnJlbnRQcmljZXMubm92ZWxQcmljZVBlckNoYXB0ZXIpICogKDEgKyBjdXJyZW50UHJpY2VzLnRyYW5zZmVyRmVlUGVyY2VudGFnZSAvIDEwMCkpXG4gICAgICAgICAgOiBub3ZlbC5jYXBpdHVsb3MgKiBjdXJyZW50UHJpY2VzLm5vdmVsUHJpY2VQZXJDaGFwdGVyXG4gICAgICB9O1xuXG4gICAgICBhZGROb3ZlbChub3ZlbENhcnRJdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0Tm92ZWxJbWFnZSA9IChub3ZlbDogTm92ZWxEZXRhaWxzKSA9PiB7XG4gICAgaWYgKG5vdmVsLmltYWdlbikge1xuICAgICAgcmV0dXJuIG5vdmVsLmltYWdlbjtcbiAgICB9XG4gICAgLy8gSW1hZ2VuIHBvciBkZWZlY3RvIGJhc2FkYSBlbiBlbCBnw6luZXJvXG4gICAgY29uc3QgZ2VucmVJbWFnZXMgPSB7XG4gICAgICAnRHJhbWEnOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MDcwMDMyMTExNjktMGExZGQ3MjI4ZjJkP3c9ODAwJmg9MTIwMCZmaXQ9Y3JvcCcsXG4gICAgICAnUm9tYW5jZSc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxODE5OTI2Njc5MS01Mzc1YTgzMTkwYjc/dz04MDAmaD0xMjAwJmZpdD1jcm9wJyxcbiAgICAgICdBY2Npw7NuJzogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDg5NTk5ODQzMjUzLWM3NmNjNGJjYjhjZj93PTgwMCZoPTEyMDAmZml0PWNyb3AnLFxuICAgICAgJ0NvbWVkaWEnOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTM0NzUzODI1ODUtZDA2ZTU4YmNiMGUwP3c9ODAwJmg9MTIwMCZmaXQ9Y3JvcCcsXG4gICAgICAnRmFtaWxpYSc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxMTg5NTQyNjMyOC1kYzg3MTQxOTEzMDA/dz04MDAmaD0xMjAwJmZpdD1jcm9wJ1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIGdlbnJlSW1hZ2VzW25vdmVsLmdlbmVybyBhcyBrZXlvZiB0eXBlb2YgZ2VucmVJbWFnZXNdIHx8IFxuICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODE2Mjc4MzQ4NzYtYjc4MzNlOGY1NTcwP3c9ODAwJmg9MTIwMCZmaXQ9Y3JvcCc7XG4gIH07XG5cbiAgY29uc3QgZ2V0Q291bnRyeUZsYWcgPSAoY291bnRyeTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZmxhZ3M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgICAnVHVycXXDrWEnOiAn8J+HufCfh7cnLFxuICAgICAgJ0N1YmEnOiAn8J+HqPCfh7onLFxuICAgICAgJ03DqXhpY28nOiAn8J+HsvCfh70nLFxuICAgICAgJ0JyYXNpbCc6ICfwn4en8J+HtycsXG4gICAgICAnQ29sb21iaWEnOiAn8J+HqPCfh7QnLFxuICAgICAgJ0FyZ2VudGluYSc6ICfwn4em8J+HtycsXG4gICAgICAnRXNwYcOxYSc6ICfwn4eq8J+HuCcsXG4gICAgICAnRXN0YWRvcyBVbmlkb3MnOiAn8J+HuvCfh7gnLFxuICAgICAgJ0NvcmVhIGRlbCBTdXInOiAn8J+HsPCfh7cnLFxuICAgICAgJ0luZGlhJzogJ/Cfh67wn4ezJyxcbiAgICAgICdSZWlubyBVbmlkbyc6ICfwn4es8J+HpycsXG4gICAgICAnRnJhbmNpYSc6ICfwn4er8J+HtycsXG4gICAgICAnSXRhbGlhJzogJ/Cfh67wn4e5JyxcbiAgICAgICdBbGVtYW5pYSc6ICfwn4ep8J+HqicsXG4gICAgICAnSmFww7NuJzogJ/Cfh6/wn4e1JyxcbiAgICAgICdDaGluYSc6ICfwn4eo8J+HsycsXG4gICAgICAnUnVzaWEnOiAn8J+Ht/Cfh7onXG4gICAgfTtcbiAgICByZXR1cm4gZmxhZ3NbY291bnRyeV0gfHwgJ/CfjI0nO1xuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZVByaWNlID0gKHR5cGU6ICdjYXNoJyB8ICd0cmFuc2ZlcicpID0+IHtcbiAgICBpZiAoIW5vdmVsKSByZXR1cm4gMDtcbiAgICBjb25zdCBiYXNlUHJpY2UgPSBub3ZlbC5jYXBpdHVsb3MgKiBjdXJyZW50UHJpY2VzLm5vdmVsUHJpY2VQZXJDaGFwdGVyO1xuICAgIHJldHVybiB0eXBlID09PSAndHJhbnNmZXInIFxuICAgICAgPyBNYXRoLnJvdW5kKGJhc2VQcmljZSAqICgxICsgY3VycmVudFByaWNlcy50cmFuc2ZlckZlZVBlcmNlbnRhZ2UgLyAxMDApKVxuICAgICAgOiBiYXNlUHJpY2U7XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS01MFwiPlxuICAgICAgICA8TG9hZGluZ1NwaW5uZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoZXJyb3IgfHwgIW5vdmVsKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTBcIj5cbiAgICAgICAgPEVycm9yTWVzc2FnZSBtZXNzYWdlPXtlcnJvciB8fCAnTm92ZWxhIG5vIGVuY29udHJhZGEnfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGJhY2tkcm9wVXJsID0gZ2V0Tm92ZWxJbWFnZShub3ZlbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICB7LyogSGVybyBTZWN0aW9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTk2IG1kOmgtWzUwMHB4XSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctY292ZXIgYmctY2VudGVyXCJcbiAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtiYWNrZHJvcFVybH0pYCB9fVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdCBmcm9tLWJsYWNrLzgwIHZpYS1ibGFjay80MCB0by1ibGFjay8yMFwiIC8+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtZnVsbCBmbGV4IGl0ZW1zLWVuZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcGItOCB3LWZ1bGxcIj5cbiAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgIHRvPVwiL1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LXdoaXRlLzgwIGhvdmVyOnRleHQtd2hpdGUgbWItNCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxBcnJvd0xlZnQgY2xhc3NOYW1lPVwibXItMiBoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgVm9sdmVyIGFsIGluaWNpb1xuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC00eGwgbWQ6dGV4dC02eGwgZm9udC1ib2xkIHRleHQtd2hpdGUgbWItNFwiPlxuICAgICAgICAgICAgICB7bm92ZWwudGl0dWxvfVxuICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTQgdGV4dC13aGl0ZS85MCBtYi00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiaC01IHctNSBtci0xXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bm92ZWwuYcOxb308L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cImgtNSB3LTUgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e25vdmVsLmNhcGl0dWxvc30gY2Fww610dWxvczwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwiaC01IHctNSBtci0xXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57Z2V0Q291bnRyeUZsYWcobm92ZWwucGFpcyB8fCAnTm8gZXNwZWNpZmljYWRvJyl9IHtub3ZlbC5wYWlzIHx8ICdObyBlc3BlY2lmaWNhZG8nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMiBtYi02XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy13aGl0ZS8yMCBiYWNrZHJvcC1ibHVyLXNtIHJvdW5kZWQtZnVsbCB0ZXh0LXNtIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICB7bm92ZWwuZ2VuZXJvfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTMgcHktMSBiYWNrZHJvcC1ibHVyLXNtIHJvdW5kZWQtZnVsbCB0ZXh0LXNtIHRleHQtd2hpdGUgJHtcbiAgICAgICAgICAgICAgICBub3ZlbC5lc3RhZG8gPT09ICd0cmFuc21pc2lvbicgPyAnYmctcmVkLTUwMC84MCcgOiAnYmctZ3JlZW4tNTAwLzgwJ1xuICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAge25vdmVsLmVzdGFkbyA9PT0gJ3RyYW5zbWlzaW9uJyA/ICfwn5OhIEVuIFRyYW5zbWlzacOzbicgOiAn4pyFIEZpbmFsaXphZGEnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBweS04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMyBnYXAtOFwiPlxuICAgICAgICAgIHsvKiBNYWluIENvbnRlbnQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICB7LyogT3ZlcnZpZXcgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20td2hpdGUgdG8tZ3JheS01MCByb3VuZGVkLTJ4bCBzaGFkb3cteGwgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBwLTggbWItOCB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtWzEuMDJdIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTZcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1waW5rLTUwMCB0by1wdXJwbGUtNTAwIHAtMyByb3VuZGVkLXhsIG1yLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCfk5o8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCBiZy1ncmFkaWVudC10by1yIGZyb20tcGluay02MDAgdG8tcHVycGxlLTYwMCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICAgICAgU2lub3BzaXNcbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCBsZWFkaW5nLXJlbGF4ZWQgdGV4dC1sZyBtYi04XCI+XG4gICAgICAgICAgICAgICAge25vdmVsLmRlc2NyaXBjaW9uIHx8ICdTaW4gZGVzY3JpcGNpw7NuIGRpc3BvbmlibGUuJ31cbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIHsvKiBOb3ZlbCBJbWFnZSAtIFZlcnNpb24gNCBVbHRpbWF0ZSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgIHsvKiBBbmltYXRlZCBncmFkaWVudCBiYWNrZ3JvdW5kICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtaW5zZXQtNiBiZy1ncmFkaWVudC10by1yIGZyb20tcGluay00MDAgdmlhLXB1cnBsZS01MDAgdG8tYmx1ZS01MDAgcm91bmRlZC0zeGwgYmx1ci0zeGwgb3BhY2l0eS0yNSBhbmltYXRlLXB1bHNlXCI+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBNYWluIGNhcmQgY29udGFpbmVyICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBiZy13aGl0ZSByb3VuZGVkLTN4bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4bFwiPlxuICAgICAgICAgICAgICAgICAgICB7LyogRGVjb3JhdGl2ZSB0b3AgYm9yZGVyICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMiBiZy1ncmFkaWVudC10by1yIGZyb20tcGluay01MDAgdmlhLXB1cnBsZS01MDAgdmlhLWJsdWUtNTAwIHRvLXBpbmstNTAwXCI+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIEhlYWRlciBzZWN0aW9uICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20tZ3JheS01MCB0by13aGl0ZSBweC02IHB5LTUgYm9yZGVyLWItMiBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIHNtOmp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLXBpbmstNTAwIHRvLXB1cnBsZS02MDAgcC0zIHJvdW5kZWQtMnhsIHNoYWRvdy1sZyB0cmFuc2Zvcm0gaG92ZXI6cm90YXRlLTYgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cImgtNiB3LTYgdGV4dC13aGl0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlIG1iLTFcIj5JbWFnZW4gT2ZpY2lhbDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBsaW5lLWNsYW1wLTFcIj57bm92ZWwudGl0dWxvfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3ctbWQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3ZlbC5lc3RhZG8gPT09ICd0cmFuc21pc2lvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNTAwIHRvLXJlZC02MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdG8tZ3JlZW4tNjAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bm92ZWwuZXN0YWRvID09PSAndHJhbnNtaXNpb24nID8gJ/Cfk6EgRU4gVklWTycgOiAn4pyFIENPTVBMRVRBJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBJbWFnZSBkaXNwbGF5IGFyZWEgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1ncmF5LTEwMCB2aWEtd2hpdGUgdG8tZ3JheS0xMDAgcC02IHNtOnAtOCBtZDpwLTEwIGxnOnAtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogQ29ybmVyIGRlY29yYXRpb25zICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgbGVmdC00IHctOCBoLTggYm9yZGVyLWwtNCBib3JkZXItdC00IGJvcmRlci1waW5rLTQwMCByb3VuZGVkLXRsLXhsXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNCByaWdodC00IHctOCBoLTggYm9yZGVyLXItNCBib3JkZXItdC00IGJvcmRlci1wdXJwbGUtNDAwIHJvdW5kZWQtdHIteGxcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS00IGxlZnQtNCB3LTggaC04IGJvcmRlci1sLTQgYm9yZGVyLWItNCBib3JkZXItYmx1ZS00MDAgcm91bmRlZC1ibC14bFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgcmlnaHQtNCB3LTggaC04IGJvcmRlci1yLTQgYm9yZGVyLWItNCBib3JkZXItcGluay00MDAgcm91bmRlZC1ici14bFwiPjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIEltYWdlIGZyYW1lICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbXgtYXV0byBtYXgtdy00eGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgcm91bmRlZC0yeGwgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy0yeGwgYm9yZGVyLTQgYm9yZGVyLXdoaXRlIHJpbmctMiByaW5nLWdyYXktMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2JhY2tkcm9wVXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17bm92ZWwudGl0dWxvfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWF1dG8gb2JqZWN0LWNvbnRhaW4gYmctd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6ICc3MDBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICc0MDBweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNyYyA9ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ4MTYyNzgzNDg3Ni1iNzgzM2U4ZjU1NzA/dz04MDAmaD0xMjAwJmZpdD1jcm9wJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogSW1hZ2Ugb3ZlcmxheSBlZmZlY3QgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tYmxhY2svNSB2aWEtdHJhbnNwYXJlbnQgdG8tdHJhbnNwYXJlbnQgcG9pbnRlci1ldmVudHMtbm9uZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBJbWFnZSBjYXB0aW9uIGJhZGdlICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtYm90dG9tLTQgbGVmdC0xLzIgdHJhbnNmb3JtIC10cmFuc2xhdGUteC0xLzIgYmctZ3JhZGllbnQtdG8tciBmcm9tLXBpbmstNjAwIHZpYS1wdXJwbGUtNjAwIHRvLWJsdWUtNjAwIHRleHQtd2hpdGUgcHgtNiBweS0yIHJvdW5kZWQtZnVsbCBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgd2hpdGVzcGFjZS1ub3dyYXBcIj5BbHRhIERlZmluaWNpw7NuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBGb290ZXIgaW5mbyBzZWN0aW9uICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20tZ3JheS01MCB0by13aGl0ZSBweC02IHB5LTUgYm9yZGVyLXQtMiBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtNCBzbTpnYXAtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgYmctd2hpdGUgcHgtNCBweS0yLjUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LXBpbmstNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgZm9udC1tZWRpdW1cIj5Bw7FvPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj57bm92ZWwuYcOxb308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIGJnLXdoaXRlIHB4LTQgcHktMi41IHJvdW5kZWQteGwgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPE1vbml0b3IgY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LXB1cnBsZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMCBmb250LW1lZGl1bVwiPkNhcMOtdHVsb3M8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPntub3ZlbC5jYXBpdHVsb3N9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBiZy13aGl0ZSBweC00IHB5LTIuNSByb3VuZGVkLXhsIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLWdyYXktMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxHbG9iZSBjbGFzc05hbWU9XCJoLTUgdy01IHRleHQtYmx1ZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMCBmb250LW1lZGl1bVwiPlBhw61zPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj57Z2V0Q291bnRyeUZsYWcobm92ZWwucGFpcyB8fCAnTi9BJyl9IHtub3ZlbC5wYWlzIHx8ICdOL0EnfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcGluay0xMDAgdmlhLXB1cnBsZS0xMDAgdG8tYmx1ZS0xMDAgcHgtNSBweS0yLjUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1waW5rLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS02MDAgZm9udC1tZWRpdW0gbWItMC41XCI+R8OpbmVybzwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXBpbmstNjAwIHRvLXB1cnBsZS02MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnRcIj57bm92ZWwuZ2VuZXJvfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogTm92ZWwgc3BlY2lmaWMgaW5mb3JtYXRpb24gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNiBncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcGluay01MCB0by1wdXJwbGUtNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1waW5rLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxCb29rT3BlbiBjbGFzc05hbWU9XCJoLTUgdy01IHRleHQtcGluay02MDAgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1waW5rLTgwMFwiPkluZm9ybWFjacOzbiBkZSBsYSBOb3ZlbGE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5Hw6luZXJvOjwvc3Ryb25nPiB7bm92ZWwuZ2VuZXJvfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5DYXDDrXR1bG9zOjwvc3Ryb25nPiB7bm92ZWwuY2FwaXR1bG9zfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5QYcOtczo8L3N0cm9uZz4ge2dldENvdW50cnlGbGFnKG5vdmVsLnBhaXMgfHwgJ05vIGVzcGVjaWZpY2FkbycpfSB7bm92ZWwucGFpcyB8fCAnTm8gZXNwZWNpZmljYWRvJ308L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+RXN0YWRvOjwvc3Ryb25nPiBcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BtbC0yIHB4LTIgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdmVsLmVzdGFkbyA9PT0gJ3RyYW5zbWlzaW9uJyA/ICdiZy1yZWQtMTAwIHRleHQtcmVkLTcwMCcgOiAnYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtub3ZlbC5lc3RhZG8gPT09ICd0cmFuc21pc2lvbicgPyAn8J+ToSBFbiBUcmFuc21pc2nDs24nIDogJ+KchSBGaW5hbGl6YWRhJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAgdG8taW5kaWdvLTUwIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItYmx1ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8RG9sbGFyU2lnbiBjbGFzc05hbWU9XCJoLTUgdy01IHRleHQtYmx1ZS02MDAgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ibHVlLTgwMFwiPkluZm9ybWFjacOzbiBkZSBQcmVjaW9zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+UHJlY2lvIHBvciBjYXDDrXR1bG86PC9zdHJvbmc+ICR7Y3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcn0gQ1VQPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkNvc3RvIHRvdGFsIChlZmVjdGl2byk6PC9zdHJvbmc+ICR7KG5vdmVsLmNhcGl0dWxvcyAqIGN1cnJlbnRQcmljZXMubm92ZWxQcmljZVBlckNoYXB0ZXIpLnRvTG9jYWxlU3RyaW5nKCl9IENVUDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5Db3N0byB0b3RhbCAodHJhbnNmZXJlbmNpYSk6PC9zdHJvbmc+ICR7TWF0aC5yb3VuZCgobm92ZWwuY2FwaXR1bG9zICogY3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcikgKiAoMSArIGN1cnJlbnRQcmljZXMudHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSkudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LW9yYW5nZS02MDBcIj48c3Ryb25nPlJlY2FyZ28gdHJhbnNmZXJlbmNpYTo8L3N0cm9uZz4gK3tjdXJyZW50UHJpY2VzLnRyYW5zZmVyRmVlUGVyY2VudGFnZX0lPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU2lkZWJhciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTFcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tYnIgZnJvbS13aGl0ZSB0by1ncmF5LTUwIHJvdW5kZWQtMnhsIHNoYWRvdy14bCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIG92ZXJmbG93LWhpZGRlbiBzdGlja3kgdG9wLThcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcGluay02MDAgdG8tcHVycGxlLTYwMCBwLTYgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS8yMCBwLTIgcm91bmRlZC1sZyBtci0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGdcIj7wn5OaPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICBEZXRhbGxlcyBkZSBsYSBOb3ZlbGFcbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02XCI+XG4gICAgICAgICAgICAgICAgey8qIFBheW1lbnQgVHlwZSBTZWxlY3Rpb24gKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi02IHAtNCBiZy1ncmFkaWVudC10by1yIGZyb20tZ3JheS01MCB0by1ibHVlLTUwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1ncmF5LTgwMCBtci0zXCI+8J+SsyBNw6l0b2RvIGRlIFBhZ286PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIHNwYWNlLXgtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBheW1lbnRUeXBlKCdjYXNoJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSBweC00IHB5LTMgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXltZW50VHlwZSA9PT0gJ2Nhc2gnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTUwMCB0by1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzY2FsZS0xMDUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctd2hpdGUgdGV4dC1ncmF5LTYwMCBob3ZlcjpiZy1ncmVlbi01MCBib3JkZXItMiBib3JkZXItZ3JheS0yMDAgaG92ZXI6Ym9yZGVyLWdyZWVuLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwYXltZW50VHlwZSA9PT0gJ2Nhc2gnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEgLXJpZ2h0LTEgYmctZ3JlZW4tNDAwIHRleHQtd2hpdGUgcC0xIHJvdW5kZWQtZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJoLTMgdy0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPERvbGxhclNpZ24gY2xhc3NOYW1lPVwiaC00IHctNCBpbmxpbmUgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICBFZmVjdGl2b1xuICAgICAgICAgICAgICAgICAgICAgICAge3BheW1lbnRUeXBlID09PSAnY2FzaCcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwiaC0zIHctMyBpbmxpbmUgbWwtMiBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGF5bWVudFR5cGUoJ3RyYW5zZmVyJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSBweC00IHB5LTMgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1vcmFuZ2UtNTAwIHRvLXJlZC01MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2NhbGUtMTA1J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlIHRleHQtZ3JheS02MDAgaG92ZXI6Ymctb3JhbmdlLTUwIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBob3Zlcjpib3JkZXItb3JhbmdlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xIC1yaWdodC0xIGJnLW9yYW5nZS00MDAgdGV4dC13aGl0ZSBwLTEgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cImgtMyB3LTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q3JlZGl0Q2FyZCBjbGFzc05hbWU9XCJoLTQgdy00IGlubGluZSBtci0yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRyYW5zZmVyZW5jaWFcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTEgdGV4dC14cyBvcGFjaXR5LTkwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICgre2N1cnJlbnRQcmljZXMudHJhbnNmZXJGZWVQZXJjZW50YWdlfSUpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cGF5bWVudFR5cGUgPT09ICd0cmFuc2ZlcicgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cImgtMyB3LTMgaW5saW5lIG1sLTIgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDYXJ0QWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldElzQ2FydEhvdmVyZWQodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SXNDYXJ0SG92ZXJlZChmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBtYi02IHB4LTYgcHktNSByb3VuZGVkLTJ4bCBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zZm9ybSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gJHtcbiAgICAgICAgICAgICAgICAgICAgICBpbkNhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdmlhLWVtZXJhbGQtNTAwIHRvLXRlYWwtNTAwIGhvdmVyOmZyb20tZ3JlZW4tNjAwIGhvdmVyOnZpYS1lbWVyYWxkLTYwMCBob3Zlcjp0by10ZWFsLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy0yeGwgc2NhbGUtMTA1J1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXBpbmstNTAwIHZpYS1wdXJwbGUtNTAwIHRvLWluZGlnby01MDAgaG92ZXI6ZnJvbS1waW5rLTYwMCBob3Zlcjp2aWEtcHVycGxlLTYwMCBob3Zlcjp0by1pbmRpZ28tNjAwIHRleHQtd2hpdGUgc2hhZG93LXhsJ1xuICAgICAgICAgICAgICAgICAgICB9ICR7aXNDYXJ0SG92ZXJlZCA/ICdzY2FsZS0xMTAgc2hhZG93LTJ4bCcgOiAnJ30gJHtzaG93Q2FydEFuaW1hdGlvbiA/ICdhbmltYXRlLXB1bHNlJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBBbmltYXRlZCBiYWNrZ3JvdW5kIGVmZmVjdCAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXIgZnJvbS13aGl0ZS8yMCB0by10cmFuc3BhcmVudCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0NhcnRIb3ZlcmVkID8gJ2FuaW1hdGUtcHVsc2UnIDogJydcbiAgICAgICAgICAgICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7LyogRmxvYXRpbmcgaWNvbnMgKi99XG4gICAgICAgICAgICAgICAgICAgIHtpc0NhcnRIb3ZlcmVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIGxlZnQtNCBoLTQgdy00IHRleHQteWVsbG93LTMwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVhcnQgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgcmlnaHQtNCBoLTQgdy00IHRleHQtcGluay0zMDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIGxlZnQtNiBoLTQgdy00IHRleHQtYmx1ZS0zMDAgYW5pbWF0ZS1ib3VuY2UgZGVsYXktMTAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFyIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIHJpZ2h0LTYgaC00IHctNCB0ZXh0LXllbGxvdy0zMDAgYW5pbWF0ZS1wdWxzZSBkZWxheS0yMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge2luQ2FydCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPXtgbXItMyBoLTYgdy02IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCByZWxhdGl2ZSB6LTEwICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2FydEhvdmVyZWQgPyAncm90YXRlLTkwIHNjYWxlLTEyNScgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIHRleHQtbGdcIj5SZXRpcmFyIGRlbCBDYXJyaXRvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9e2Btci0zIGgtNiB3LTYgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwIHJlbGF0aXZlIHotMTAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDYXJ0SG92ZXJlZCA/ICdyb3RhdGUtMTgwIHNjYWxlLTEyNScgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIHRleHQtbGdcIj5BZ3JlZ2FyIGFsIENhcnJpdG88L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIFN1Y2Nlc3MgaW5kaWNhdG9yICovfVxuICAgICAgICAgICAgICAgICAge2luQ2FydCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0yIC1yaWdodC0yIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi00MDAgdG8tZW1lcmFsZC00MDAgdGV4dC13aGl0ZSBwLTIgcm91bmRlZC1mdWxsIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZSBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFByaWNlIERpc3BsYXkgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi02XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20tZ3JlZW4tNTAgdG8tZW1lcmFsZC01MCByb3VuZGVkLTJ4bCBwLTYgYm9yZGVyLTIgYm9yZGVyLWdyZWVuLTIwMCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1ncmVlbi03MDAgbWItMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3BheW1lbnRUeXBlID09PSAnY2FzaCcgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEb2xsYXJTaWduIGNsYXNzTmFtZT1cImgtNCB3LTQgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q3JlZGl0Q2FyZCBjbGFzc05hbWU9XCJoLTQgdy00IG1yLTFcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwYXltZW50VHlwZSA9PT0gJ2Nhc2gnID8gJ0VmZWN0aXZvJyA6ICdUcmFuc2ZlcmVuY2lhJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYmxhY2sgdGV4dC1ncmVlbi04MDAgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjYWxjdWxhdGVQcmljZShwYXltZW50VHlwZSkudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAge3BheW1lbnRUeXBlID09PSAndHJhbnNmZXInICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW9yYW5nZS02MDAgZm9udC1zZW1pYm9sZCBiZy1vcmFuZ2UtMTAwIHB4LTIgcHktMSByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgK3tjdXJyZW50UHJpY2VzLnRyYW5zZmVyRmVlUGVyY2VudGFnZX0lIGluY2x1aWRvXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwIG10LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7Y3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcn0gQ1VQIMOXIHtub3ZlbC5jYXBpdHVsb3N9IGNhcMOtdHVsb3NcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItcGluay0yMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1waW5rLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC1waW5rLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPkfDqW5lcm88L2gzPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCBmb250LW1lZGl1bSBtbC0xMVwiPntub3ZlbC5nZW5lcm99PC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1ibHVlLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWJsdWUtMTAwIHAtMiByb3VuZGVkLWxnIG1yLTMgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtYmx1ZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIj5DYXDDrXR1bG9zPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgZm9udC1tZWRpdW0gbWwtMTFcIj57bm92ZWwuY2FwaXR1bG9zfTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItZ3JlZW4tMjAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tMTAwIHAtMiByb3VuZGVkLWxnIG1yLTMgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiaC00IHctNCB0ZXh0LWdyZWVuLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPkHDsW88L2gzPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCBmb250LW1lZGl1bSBtbC0xMVwiPntub3ZlbC5hw7FvfTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBob3Zlcjpib3JkZXItcHVycGxlLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXB1cnBsZS0xMDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxHbG9iZSBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtcHVycGxlLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPlBhw61zIGRlIE9yaWdlbjwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNzAwIGZvbnQtbWVkaXVtIG1sLTExXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2dldENvdW50cnlGbGFnKG5vdmVsLnBhaXMgfHwgJ05vIGVzcGVjaWZpY2FkbycpfSB7bm92ZWwucGFpcyB8fCAnTm8gZXNwZWNpZmljYWRvJ31cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGhvdmVyOmJvcmRlci1pbmRpZ28tMjAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc20gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdmVsLmVzdGFkbyA9PT0gJ3RyYW5zbWlzaW9uJyA/ICdiZy1yZWQtMTAwJyA6ICdiZy1ncmVlbi0xMDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bm92ZWwuZXN0YWRvID09PSAndHJhbnNtaXNpb24nID8gJ/Cfk6EnIDogJ+KchSd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMFwiPkVzdGFkbzwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2Bmb250LW1lZGl1bSBtbC0xMSAke1xuICAgICAgICAgICAgICAgICAgICAgIG5vdmVsLmVzdGFkbyA9PT0gJ3RyYW5zbWlzaW9uJyA/ICd0ZXh0LXJlZC02MDAnIDogJ3RleHQtZ3JlZW4tNjAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge25vdmVsLmVzdGFkbyA9PT0gJ3RyYW5zbWlzaW9uJyA/ICdFbiBUcmFuc21pc2nDs24nIDogJ0ZpbmFsaXphZGEnfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL3BhZ2VzL05vdmVsRGV0YWlsLnRzeCJ9