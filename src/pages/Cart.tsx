import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Cart.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/pages/Cart.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
import { Link } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { ShoppingCart, Trash2, Star, Calendar, ArrowLeft, CreditCard as Edit3, Monitor, DollarSign, CreditCard, Calculator, Sparkles, Zap, Check, Clapperboard, Send, BookOpen } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useCart } from "/src/context/CartContext.tsx";
import { AdminContext } from "/src/context/AdminContext.tsx";
import { CheckoutModal } from "/src/components/CheckoutModal.tsx";
import { NovelasModal } from "/src/components/NovelasModal.tsx";
import { sendOrderToWhatsApp } from "/src/utils/whatsapp.ts";
import { IMAGE_BASE_URL, POSTER_SIZE } from "/src/config/api.ts";
export function Cart() {
  _s();
  const { state, removeItem, clearCart, updatePaymentType, calculateItemPrice, calculateTotalPrice, calculateTotalByPaymentType } = useCart();
  const adminContext = React.useContext(AdminContext);
  const [showCheckoutModal, setShowCheckoutModal] = React.useState(false);
  const [showNovelasModal, setShowNovelasModal] = React.useState(false);
  const handleCheckout = (orderData) => {
    const totalsByPaymentType2 = calculateTotalByPaymentType();
    const subtotal = totalsByPaymentType2.cash + totalsByPaymentType2.transfer;
    const transferFee = 0;
    const total = subtotal + orderData.deliveryCost;
    const completeOrderData = {
      ...orderData,
      items: state.items,
      subtotal,
      transferFee,
      total,
      cashTotal: totalsByPaymentType2.cash,
      transferTotal: totalsByPaymentType2.transfer
    };
    sendOrderToWhatsApp(completeOrderData);
    setShowCheckoutModal(false);
  };
  const handleOpenNovelas = () => {
    setShowNovelasModal(true);
  };
  const getItemUrl = (item) => {
    if (item.type === "novel") return "#";
    return `/${item.type}/${item.id}`;
  };
  const getItemYear = (item) => {
    if (item.type === "novel") return item.year;
    const date = item.release_date || item.first_air_date;
    return date ? new Date(date).getFullYear() : "N/A";
  };
  const getPosterUrl = (posterPath) => {
    return posterPath ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${posterPath}` : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop&crop=center";
  };
  const getNovelImage = (novel) => {
    if (novel.image) {
      return novel.image;
    }
    const genreImages = {
      "Drama": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      "Romance": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=400&fit=crop",
      "Acción": "https://images.unsplash.com/photo-1489599843253-c76cc4bcb8cf?w=300&h=400&fit=crop",
      "Comedia": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop",
      "Familia": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=400&fit=crop"
    };
    return genreImages[novel.genre] || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop";
  };
  const isAnime = (item) => {
    if (item.type === "novel") return false;
    return item.original_language === "ja" || item.genre_ids && item.genre_ids.includes(16) || item.title?.toLowerCase().includes("anime");
  };
  const totalPrice = calculateTotalPrice();
  const totalsByPaymentType = calculateTotalByPaymentType();
  const movieCount = state.items.filter((item) => item.type === "movie").length;
  const seriesCount = state.items.filter((item) => item.type === "tv").length;
  const novelCount = state.items.filter((item) => item.type === "novel").length;
  const animeCount = state.items.filter((item) => isAnime(item)).length;
  if (state.items.length === 0) {
    return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center px-4", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-md w-full", children: [
      /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "h-24 w-24 text-gray-400 mx-auto mb-6" }, void 0, false, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 116,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Tu carrito está vacío" }, void 0, false, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 117,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 mb-8", children: "Explora nuestro catálogo y agrega películas, series o anime a tu carrito." }, void 0, false, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-3", children: [
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/movies",
            className: "w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center",
            children: "Explorar Películas"
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 122,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/tv",
            className: "w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center",
            children: "Ver Series"
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 128,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/anime",
            className: "w-full bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center",
            children: "Descubrir Anime"
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 134,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/admin",
            className: "w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center flex items-center justify-center",
            children: [
              /* @__PURE__ */ jsxDEV("span", { className: "mr-2", children: "⚙️" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 144,
                columnNumber: 15
              }, this),
              "Panel de Control"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 140,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 121,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Cart.tsx",
      lineNumber: 115,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/pages/Cart.tsx",
      lineNumber: 114,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center sm:justify-start", children: [
        /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8 text-blue-600" }, void 0, false, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 159,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: "Mi Carrito" }, void 0, false, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 160,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        Link,
        {
          to: "/",
          className: "text-blue-600 hover:text-blue-800 flex items-center justify-center sm:justify-start font-medium text-sm sm:text-base",
          children: [
            /* @__PURE__ */ jsxDEV(ArrowLeft, { className: "mr-1 h-4 w-4" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 166,
              columnNumber: 13
            }, this),
            "Seguir explorando"
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 162,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Cart.tsx",
      lineNumber: 157,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg shadow-sm overflow-hidden mb-4 sm:mb-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left", children: [
          "Elementos (",
          state.total,
          ")"
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 175,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: clearCart,
            className: "text-red-600 hover:text-red-800 text-sm font-medium transition-colors text-center",
            children: "Vaciar carrito"
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 178,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleOpenNovelas,
            className: "w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center",
            children: "Ver Novelas"
          },
          void 0,
          false,
          {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 184,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 174,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 173,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "divide-y divide-gray-200", children: state.items.map(
        (item) => /* @__PURE__ */ jsxDEV("div", { className: `p-6 hover:bg-gradient-to-r transition-all duration-300 border-l-4 border-transparent ${item.type === "novel" ? "hover:from-pink-50 hover:to-purple-50 hover:border-pink-400" : "hover:from-blue-50 hover:to-purple-50 hover:border-blue-400"}`, children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4", children: [
          item.type === "novel" ? /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 mx-auto sm:mx-0", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-24 h-36 sm:w-20 sm:h-28 rounded-xl shadow-lg overflow-hidden border-2 border-white", children: [
            /* @__PURE__ */ jsxDEV(
              "img",
              {
                src: getNovelImage(item),
                alt: item.title,
                className: "w-full h-full object-cover",
                onError: (e) => {
                  const target = e.target;
                  target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop";
                }
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 205,
                columnNumber: 25
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 214,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1 left-1 right-1", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-pink-500/80 text-white px-1 py-0.5 rounded-full text-xs font-bold text-center", children: [
              /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-3 w-3 inline mr-1" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 217,
                columnNumber: 29
              }, this),
              "Novela"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 216,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 215,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 204,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 203,
            columnNumber: 17
          }, this) : /* @__PURE__ */ jsxDEV(Link, { to: getItemUrl(item), className: "flex-shrink-0 mx-auto sm:mx-0", children: /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: getPosterUrl(item.poster_path),
              alt: item.title,
              className: "w-24 h-36 sm:w-20 sm:h-28 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white"
            },
            void 0,
            false,
            {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 225,
              columnNumber: 21
            },
            this
          ) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 text-center sm:text-left", children: [
            item.type === "novel" ? /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-bold text-gray-900 break-words hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300", children: item.title }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 237,
              columnNumber: 19
            }, this) : /* @__PURE__ */ jsxDEV(
              Link,
              {
                to: getItemUrl(item),
                className: "block hover:text-blue-600 transition-colors mb-3",
                children: /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-bold text-gray-900 break-words hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300", children: item.title }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 245,
                  columnNumber: 25
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 241,
                columnNumber: 19
              },
              this
            ),
            item.type === "tv" && "selectedSeasons" in item && item.selectedSeasons && item.selectedSeasons.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDEV("span", { className: "inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV(Monitor, { className: "h-4 w-4 inline mr-2" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 254,
                columnNumber: 27
              }, this),
              "Temporadas: ",
              item.selectedSeasons.sort((a, b) => a - b).join(", ")
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 253,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 252,
              columnNumber: 19
            }, this),
            item.type === "novel" && /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: /* @__PURE__ */ jsxDEV("span", { className: "inline-block bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold border border-pink-200 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-4 w-4 inline mr-2" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 263,
                columnNumber: 27
              }, this),
              item.chapters,
              " capítulos • ",
              item.genre,
              item.country && /* @__PURE__ */ jsxDEV("span", { className: "ml-2", children: [
                "• ",
                item.country
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 266,
                columnNumber: 23
              }, this),
              item.status && /* @__PURE__ */ jsxDEV("span", { className: `ml-2 ${item.status === "transmision" ? "text-red-600" : "text-green-600"}`, children: [
                "• ",
                item.status === "transmision" ? "📡 En Transmisión" : "✅ Finalizada"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 269,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 262,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 261,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-sm text-gray-600", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-2 rounded-full text-xs font-semibold border border-blue-200 shadow-sm", children: item.type === "movie" ? "Película" : item.type === "tv" ? "Serie" : "Novela" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 280,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center bg-gray-50 px-3 py-2 rounded-full border border-gray-200", children: [
                /* @__PURE__ */ jsxDEV(Calendar, { className: "h-4 w-4 mr-1" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 284,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: getItemYear(item) }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 285,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 283,
                columnNumber: 23
              }, this),
              item.type !== "novel" && /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center bg-yellow-50 px-3 py-2 rounded-full border border-yellow-200", children: [
                /* @__PURE__ */ jsxDEV(Star, { className: "h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 289,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: item.vote_average ? item.vote_average.toFixed(1) : "N/A" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 290,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 288,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 279,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center sm:justify-start", children: /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-gray-800 mr-3", children: "💳 Método de Pago:" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 299,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 298,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center sm:justify-start space-x-3", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => updatePaymentType(item.id, "cash"),
                    className: `relative px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${item.paymentType === "cash" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105" : "bg-white text-gray-600 hover:bg-green-50 border-2 border-gray-200 hover:border-green-300"}`,
                    children: [
                      item.paymentType === "cash" && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 -right-1 bg-green-400 text-white p-1 rounded-full", children: /* @__PURE__ */ jsxDEV(Check, { className: "h-3 w-3" }, void 0, false, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 312,
                        columnNumber: 33
                      }, this) }, void 0, false, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 311,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-4 w-4 inline mr-2" }, void 0, false, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 315,
                        columnNumber: 29
                      }, this),
                      "Efectivo",
                      item.paymentType === "cash" && /* @__PURE__ */ jsxDEV(Sparkles, { className: "h-3 w-3 inline ml-2 animate-pulse" }, void 0, false, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 318,
                        columnNumber: 27
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/home/project/src/pages/Cart.tsx",
                    lineNumber: 302,
                    columnNumber: 27
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => updatePaymentType(item.id, "transfer"),
                    className: `relative px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${item.paymentType === "transfer" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105" : "bg-white text-gray-600 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300"}`,
                    children: [
                      item.paymentType === "transfer" && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 -right-1 bg-orange-400 text-white p-1 rounded-full", children: /* @__PURE__ */ jsxDEV(Check, { className: "h-3 w-3" }, void 0, false, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 331,
                        columnNumber: 33
                      }, this) }, void 0, false, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 330,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV(CreditCard, { className: "h-4 w-4 inline mr-2" }, void 0, false, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 334,
                        columnNumber: 29
                      }, this),
                      "Transferencia",
                      /* @__PURE__ */ jsxDEV("span", { className: "ml-1 text-xs opacity-90", children: [
                        "(+",
                        adminContext?.state?.prices?.transferFeePercentage || 10,
                        "%)"
                      ] }, void 0, true, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 336,
                        columnNumber: 29
                      }, this),
                      item.paymentType === "transfer" && /* @__PURE__ */ jsxDEV(Zap, { className: "h-3 w-3 inline ml-2 animate-pulse" }, void 0, false, {
                        fileName: "/home/project/src/pages/Cart.tsx",
                        lineNumber: 340,
                        columnNumber: 27
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/home/project/src/pages/Cart.tsx",
                    lineNumber: 321,
                    columnNumber: 27
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 301,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 297,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 296,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 234,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 w-full sm:w-auto sm:ml-4 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200 shadow-lg sm:min-w-[160px] transform hover:scale-105 transition-all duration-300", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-green-700 mb-2 flex items-center justify-center", children: [
                item.paymentType === "cash" ? /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-4 w-4 mr-1" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 354,
                  columnNumber: 25
                }, this) : /* @__PURE__ */ jsxDEV(CreditCard, { className: "h-4 w-4 mr-1" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 356,
                  columnNumber: 25
                }, this),
                item.paymentType === "cash" ? "Efectivo" : "Transferencia"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 352,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-2xl font-black text-green-800 mb-1", children: [
                "$",
                calculateItemPrice(item).toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 360,
                columnNumber: 25
              }, this),
              item.paymentType === "transfer" && /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-orange-600 font-semibold bg-orange-100 px-2 py-1 rounded-full", children: [
                "+",
                adminContext?.state?.prices?.transferFeePercentage || 10,
                "% incluido"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 364,
                columnNumber: 23
              }, this),
              item.type === "tv" && "number_of_episodes" in item && item.number_of_episodes > 50 && /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-2 rounded-full border border-amber-300 shadow-sm", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-amber-600 mr-1 text-xs", children: "📊" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 371,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-amber-700", children: "Serie Extensa" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 372,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 370,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 351,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 350,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center space-x-2", children: [
              item.type === "tv" && "selectedSeasons" in item && /* @__PURE__ */ jsxDEV(
                Link,
                {
                  to: getItemUrl(item),
                  className: "p-3 text-purple-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 bg-purple-50 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg",
                  title: "Editar temporadas",
                  children: /* @__PURE__ */ jsxDEV(Edit3, { className: "h-5 w-5" }, void 0, false, {
                    fileName: "/home/project/src/pages/Cart.tsx",
                    lineNumber: 386,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 381,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => removeItem(item.id),
                  className: "p-3 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 bg-red-50 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg",
                  title: "Eliminar del carrito",
                  children: /* @__PURE__ */ jsxDEV(Trash2, { className: "h-5 w-5" }, void 0, false, {
                    fileName: "/home/project/src/pages/Cart.tsx",
                    lineNumber: 394,
                    columnNumber: 25
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 389,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 379,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 349,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 200,
          columnNumber: 17
        }, this) }, `${item.type}-${item.id}`, false, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 195,
          columnNumber: 13
        }, this)
      ) }, void 0, false, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 193,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Cart.tsx",
      lineNumber: 172,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xl sm:text-2xl font-bold flex items-center justify-center sm:justify-start", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-2 rounded-lg mr-3", children: /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "h-6 w-6" }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 410,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 409,
            columnNumber: 17
          }, this),
          "Resumen del Pedido"
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 408,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-center sm:text-right", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl sm:text-3xl font-bold", children: [
            "$",
            totalPrice.toLocaleString(),
            " CUP"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 415,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm opacity-90", children: [
            state.total,
            " elementos"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 416,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 414,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 407,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 406,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-gray-900 mb-4 flex items-center justify-center sm:justify-start", children: [
            /* @__PURE__ */ jsxDEV(Calculator, { className: "mr-2 h-5 w-5 text-blue-600" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 425,
              columnNumber: 17
            }, this),
            "Desglose por Tipo de Pago"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 424,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-green-50 rounded-lg p-4 border border-green-200", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center mb-2", children: [
                /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-5 w-5 text-green-600 mr-2" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 433,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold text-green-700", children: "Efectivo" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 434,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 432,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-bold text-green-800 mb-2", children: [
                "$",
                totalsByPaymentType.cash.toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 436,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-green-600", children: [
                state.items.filter((item) => item.paymentType === "cash").length,
                " elementos"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 439,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 431,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 430,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-orange-50 rounded-lg p-4 border border-orange-200", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center mb-2", children: [
                /* @__PURE__ */ jsxDEV(CreditCard, { className: "h-5 w-5 text-orange-600 mr-2" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 448,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold text-orange-700", children: "Transferencia" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 449,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 447,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-bold text-orange-800 mb-2", children: [
                "$",
                totalsByPaymentType.transfer.toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 451,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-orange-600", children: [
                state.items.filter((item) => item.paymentType === "transfer").length,
                " elementos (+10%)"
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 454,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 446,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 445,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 429,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-green-100 to-orange-100 rounded-lg p-4 border-2 border-gray-200", children: /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold text-gray-900", children: "Total General:" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 463,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-bold text-blue-600", children: [
              "$",
              totalPrice.toLocaleString(),
              " CUP"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 464,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 462,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 461,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 423,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-gray-900 mb-4 flex items-center justify-center sm:justify-start", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-lg mr-2", children: "💰" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 472,
              columnNumber: 17
            }, this),
            "Detalle de Elementos"
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 471,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 max-h-64 overflow-y-auto", children: state.items.map((item) => {
            const itemPrice = calculateItemPrice(item);
            let basePrice;
            if (item.type === "novel") {
              const novelItem = item;
              basePrice = novelItem.chapters * novelItem.pricePerChapter;
            } else if (item.type === "movie") {
              basePrice = 80;
            } else {
              basePrice = ("selectedSeasons" in item ? item.selectedSeasons?.length || 1 : 1) * 300;
            }
            return /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg p-3 border border-gray-200", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-900 text-sm mb-1 break-words", children: item.title }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 491,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-600", children: [
                  item.type === "movie" ? "Película" : item.type === "tv" ? "Serie" : "Novela",
                  "selectedSeasons" in item && item.selectedSeasons && item.selectedSeasons.length > 0 && ` • Temporadas: ${item.selectedSeasons.sort((a, b) => a - b).join(", ")}`,
                  item.type === "novel" && ` • ${item.chapters} capítulos • ${item.genre}${item.country ? ` • ${item.country}` : ""}${item.status ? ` • ${item.status === "transmision" ? "En Transmisión" : "Finalizada"}` : ""}`,
                  isAnime(item) && " • Anime"
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 492,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: /* @__PURE__ */ jsxDEV("span", { className: `inline-block px-2 py-1 rounded-full text-xs font-medium ${item.paymentType === "cash" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`, children: item.paymentType === "cash" ? "Efectivo" : "Transferencia" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 503,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 502,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 490,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-right ml-4", children: [
                /* @__PURE__ */ jsxDEV("p", { className: `font-bold ${item.paymentType === "cash" ? "text-green-600" : "text-orange-600"}`, children: [
                  "$",
                  itemPrice.toLocaleString(),
                  " CUP"
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 513,
                  columnNumber: 25
                }, this),
                item.paymentType === "transfer" && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500", children: [
                  "Base: $",
                  basePrice.toLocaleString(),
                  " CUP"
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 517,
                  columnNumber: 25
                }, this),
                item.type === "tv" && "selectedSeasons" in item && item.selectedSeasons && item.selectedSeasons.length > 0 && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500", children: [
                  "$",
                  Math.round(itemPrice / item.selectedSeasons.length).toLocaleString(),
                  " CUP/temp."
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 522,
                  columnNumber: 25
                }, this),
                item.type === "novel" && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500", children: [
                  "$",
                  item.pricePerChapter.toLocaleString(),
                  " CUP/cap."
                ] }, void 0, true, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 527,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 512,
                columnNumber: 23
              }, this)
            ] }, `${item.type}-${item.id}`, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 489,
              columnNumber: 21
            }, this);
          }) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 476,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-4 border-t border-gray-200", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold text-gray-900", children: "Total:" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 539,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-bold text-green-600", children: [
              "$",
              totalPrice.toLocaleString(),
              " CUP"
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 540,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 538,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 537,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 470,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-50 rounded-xl p-4 border border-blue-100", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between text-center sm:text-left", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium text-blue-600 mb-1", children: "Películas" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 549,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-blue-800", children: movieCount }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 550,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 548,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-100 p-3 rounded-lg mx-auto sm:mx-0 mt-2 sm:mt-0 w-fit", children: /* @__PURE__ */ jsxDEV(Clapperboard, { className: "h-6 w-6 text-blue-600" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 555,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 554,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 547,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 546,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-50 rounded-xl p-4 border border-purple-100", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between text-center sm:text-left", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium text-purple-600 mb-1", children: "Series/Anime" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 563,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-purple-800", children: seriesCount }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 564,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 562,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-100 p-3 rounded-lg mx-auto sm:mx-0 mt-2 sm:mt-0 w-fit", children: /* @__PURE__ */ jsxDEV(Monitor, { className: "h-6 w-6 text-purple-600" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 569,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 568,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 561,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 560,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-pink-50 rounded-xl p-4 border border-pink-100", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between text-center sm:text-left", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium text-pink-600 mb-1", children: "Novelas" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 577,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-bold text-pink-800", children: novelCount }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 578,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 576,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-pink-100 p-3 rounded-lg mx-auto sm:mx-0 mt-2 sm:mt-0 w-fit", children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-6 w-6 text-pink-600" }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 581,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 580,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 575,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 574,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 545,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 mb-6", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-gray-900 mb-3 text-center sm:text-left", children: "Estadísticas del Pedido" }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 589,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            state.items.filter((item) => item.type !== "novel").length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600", children: "Promedio de calificación (películas/series):" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 593,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxDEV(Star, { className: "h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 595,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: (() => {
                  const ratedItems = state.items.filter((item) => item.type !== "novel" && item.vote_average);
                  return ratedItems.length > 0 ? (ratedItems.reduce((acc, item) => acc + item.vote_average, 0) / ratedItems.length).toFixed(1) : "0.0";
                })() }, void 0, false, {
                  fileName: "/home/project/src/pages/Cart.tsx",
                  lineNumber: 596,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 594,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 592,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-gray-600", children: "Contenido más reciente:" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 608,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: state.items.length > 0 ? Math.max(...state.items.map((item) => {
                if (item.type === "novel") return item.year;
                const date = item.release_date || item.first_air_date;
                return date ? new Date(date).getFullYear() : 0;
              })) : "N/A" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 609,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/pages/Cart.tsx",
              lineNumber: 607,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 590,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 588,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setShowCheckoutModal(true),
            className: "w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 active:from-green-700 active:to-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105 active:scale-95 hover:shadow-lg touch-manipulation",
            children: [
              /* @__PURE__ */ jsxDEV(Send, { className: "mr-3 h-6 w-6" }, void 0, false, {
                fileName: "/home/project/src/pages/Cart.tsx",
                lineNumber: 628,
                columnNumber: 15
              }, this),
              "Finalizar Pedido"
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 624,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-4 bg-green-50 rounded-xl border border-green-100", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-green-700 text-center flex items-center justify-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "mr-2", children: "📱" }, void 0, false, {
            fileName: "/home/project/src/pages/Cart.tsx",
            lineNumber: 634,
            columnNumber: 17
          }, this),
          "Complete sus datos para finalizar el pedido"
        ] }, void 0, true, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 633,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/home/project/src/pages/Cart.tsx",
          lineNumber: 632,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 421,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/pages/Cart.tsx",
      lineNumber: 405,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      CheckoutModal,
      {
        isOpen: showCheckoutModal,
        onClose: () => setShowCheckoutModal(false),
        onCheckout: handleCheckout,
        items: state.items.map((item) => {
          if (item.type === "novel") {
            const novelItem = item;
            return {
              id: item.id,
              title: item.title,
              price: calculateItemPrice(item),
              quantity: 1,
              type: "novel",
              chapters: novelItem.chapters,
              genre: novelItem.genre,
              paymentType: item.paymentType
            };
          }
          return {
            id: item.id,
            title: item.title,
            price: calculateItemPrice(item),
            quantity: 1,
            type: item.type,
            selectedSeasons: "selectedSeasons" in item ? item.selectedSeasons : void 0,
            paymentType: item.paymentType
          };
        }),
        total: totalPrice
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 642,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      NovelasModal,
      {
        isOpen: showNovelasModal,
        onClose: () => setShowNovelasModal(false)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/pages/Cart.tsx",
        lineNumber: 674,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/project/src/pages/Cart.tsx",
    lineNumber: 155,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/pages/Cart.tsx",
    lineNumber: 154,
    columnNumber: 5
  }, this);
}
_s(Cart, "9gxfaBybzPS2QOAaHw3/EDgtlzc=", false, function() {
  return [useCart];
});
_c = Cart;
var _c;
$RefreshReg$(_c, "Cart");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/pages/Cart.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/pages/Cart.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QTVnQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQTZnQkE7QUFFSjtBQUFDZCxHQXpvQmVELE1BQUk7QUFBQSxVQUNnSFAsT0FBTztBQUFBO0FBQUFxRyxLQUQzSDlGO0FBQUksSUFBQThGO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJSZWFjdCIsIkxpbmsiLCJTaG9wcGluZ0NhcnQiLCJUcmFzaDIiLCJTdGFyIiwiQ2FsZW5kYXIiLCJBcnJvd0xlZnQiLCJDcmVkaXRDYXJkIiwiRWRpdDMiLCJNb25pdG9yIiwiRG9sbGFyU2lnbiIsIkNhbGN1bGF0b3IiLCJTcGFya2xlcyIsIlphcCIsIkNoZWNrIiwiQ2xhcHBlcmJvYXJkIiwiU2VuZCIsIkJvb2tPcGVuIiwidXNlQ2FydCIsIkFkbWluQ29udGV4dCIsIkNoZWNrb3V0TW9kYWwiLCJOb3ZlbGFzTW9kYWwiLCJzZW5kT3JkZXJUb1doYXRzQXBwIiwiSU1BR0VfQkFTRV9VUkwiLCJQT1NURVJfU0laRSIsIkNhcnQiLCJfcyIsInN0YXRlIiwicmVtb3ZlSXRlbSIsImNsZWFyQ2FydCIsInVwZGF0ZVBheW1lbnRUeXBlIiwiY2FsY3VsYXRlSXRlbVByaWNlIiwiY2FsY3VsYXRlVG90YWxQcmljZSIsImNhbGN1bGF0ZVRvdGFsQnlQYXltZW50VHlwZSIsImFkbWluQ29udGV4dCIsInVzZUNvbnRleHQiLCJzaG93Q2hlY2tvdXRNb2RhbCIsInNldFNob3dDaGVja291dE1vZGFsIiwidXNlU3RhdGUiLCJzaG93Tm92ZWxhc01vZGFsIiwic2V0U2hvd05vdmVsYXNNb2RhbCIsImhhbmRsZUNoZWNrb3V0Iiwib3JkZXJEYXRhIiwidG90YWxzQnlQYXltZW50VHlwZSIsInN1YnRvdGFsIiwiY2FzaCIsInRyYW5zZmVyIiwidHJhbnNmZXJGZWUiLCJ0b3RhbCIsImRlbGl2ZXJ5Q29zdCIsImNvbXBsZXRlT3JkZXJEYXRhIiwiaXRlbXMiLCJjYXNoVG90YWwiLCJ0cmFuc2ZlclRvdGFsIiwiaGFuZGxlT3Blbk5vdmVsYXMiLCJnZXRJdGVtVXJsIiwiaXRlbSIsInR5cGUiLCJpZCIsImdldEl0ZW1ZZWFyIiwieWVhciIsImRhdGUiLCJyZWxlYXNlX2RhdGUiLCJmaXJzdF9haXJfZGF0ZSIsIkRhdGUiLCJnZXRGdWxsWWVhciIsImdldFBvc3RlclVybCIsInBvc3RlclBhdGgiLCJnZXROb3ZlbEltYWdlIiwibm92ZWwiLCJpbWFnZSIsImdlbnJlSW1hZ2VzIiwiZ2VucmUiLCJpc0FuaW1lIiwib3JpZ2luYWxfbGFuZ3VhZ2UiLCJnZW5yZV9pZHMiLCJpbmNsdWRlcyIsInRpdGxlIiwidG9Mb3dlckNhc2UiLCJ0b3RhbFByaWNlIiwibW92aWVDb3VudCIsImZpbHRlciIsImxlbmd0aCIsInNlcmllc0NvdW50Iiwibm92ZWxDb3VudCIsImFuaW1lQ291bnQiLCJtYXAiLCJlIiwidGFyZ2V0Iiwic3JjIiwicG9zdGVyX3BhdGgiLCJzZWxlY3RlZFNlYXNvbnMiLCJzb3J0IiwiYSIsImIiLCJqb2luIiwiY2hhcHRlcnMiLCJjb3VudHJ5Iiwic3RhdHVzIiwidm90ZV9hdmVyYWdlIiwidG9GaXhlZCIsInBheW1lbnRUeXBlIiwicHJpY2VzIiwidHJhbnNmZXJGZWVQZXJjZW50YWdlIiwidG9Mb2NhbGVTdHJpbmciLCJudW1iZXJfb2ZfZXBpc29kZXMiLCJpdGVtUHJpY2UiLCJiYXNlUHJpY2UiLCJub3ZlbEl0ZW0iLCJwcmljZVBlckNoYXB0ZXIiLCJNYXRoIiwicm91bmQiLCJyYXRlZEl0ZW1zIiwicmVkdWNlIiwiYWNjIiwibWF4IiwicHJpY2UiLCJxdWFudGl0eSIsInVuZGVmaW5lZCIsIl9jIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkNhcnQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBTaG9wcGluZ0NhcnQsIFRyYXNoMiwgU3RhciwgQ2FsZW5kYXIsIE1lc3NhZ2VDaXJjbGUsIEFycm93TGVmdCwgQ3JlZGl0Q2FyZCBhcyBFZGl0MywgTW9uaXRvciwgRG9sbGFyU2lnbiwgQ3JlZGl0Q2FyZCwgQ2FsY3VsYXRvciwgU3BhcmtsZXMsIFphcCwgSGVhcnQsIENoZWNrLCBYLCBDbGFwcGVyYm9hcmQsIFNlbmQsIEJvb2tPcGVuIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHVzZUNhcnQgfSBmcm9tICcuLi9jb250ZXh0L0NhcnRDb250ZXh0JztcbmltcG9ydCB7IEFkbWluQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvQWRtaW5Db250ZXh0JztcbmltcG9ydCB7IFByaWNlQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvUHJpY2VDYXJkJztcbmltcG9ydCB7IENoZWNrb3V0TW9kYWwsIE9yZGVyRGF0YSwgQ3VzdG9tZXJJbmZvIH0gZnJvbSAnLi4vY29tcG9uZW50cy9DaGVja291dE1vZGFsJztcbmltcG9ydCB7IE5vdmVsYXNNb2RhbCB9IGZyb20gJy4uL2NvbXBvbmVudHMvTm92ZWxhc01vZGFsJztcbmltcG9ydCB7IHNlbmRPcmRlclRvV2hhdHNBcHAgfSBmcm9tICcuLi91dGlscy93aGF0c2FwcCc7XG5pbXBvcnQgeyBJTUFHRV9CQVNFX1VSTCwgUE9TVEVSX1NJWkUgfSBmcm9tICcuLi9jb25maWcvYXBpJztcbmltcG9ydCB0eXBlIHsgTm92ZWxDYXJ0SXRlbSB9IGZyb20gJy4uL3R5cGVzL21vdmllJztcblxuZXhwb3J0IGZ1bmN0aW9uIENhcnQoKSB7XG4gIGNvbnN0IHsgc3RhdGUsIHJlbW92ZUl0ZW0sIGNsZWFyQ2FydCwgdXBkYXRlUGF5bWVudFR5cGUsIGNhbGN1bGF0ZUl0ZW1QcmljZSwgY2FsY3VsYXRlVG90YWxQcmljZSwgY2FsY3VsYXRlVG90YWxCeVBheW1lbnRUeXBlIH0gPSB1c2VDYXJ0KCk7XG4gIGNvbnN0IGFkbWluQ29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoQWRtaW5Db250ZXh0KTtcbiAgY29uc3QgW3Nob3dDaGVja291dE1vZGFsLCBzZXRTaG93Q2hlY2tvdXRNb2RhbF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93Tm92ZWxhc01vZGFsLCBzZXRTaG93Tm92ZWxhc01vZGFsXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVDaGVja291dCA9IChvcmRlckRhdGE6IE9yZGVyRGF0YSkgPT4ge1xuICAgIC8vIENhbGN1bGF0ZSB0b3RhbHNcbiAgICBjb25zdCB0b3RhbHNCeVBheW1lbnRUeXBlID0gY2FsY3VsYXRlVG90YWxCeVBheW1lbnRUeXBlKCk7XG4gICAgY29uc3Qgc3VidG90YWwgPSB0b3RhbHNCeVBheW1lbnRUeXBlLmNhc2ggKyB0b3RhbHNCeVBheW1lbnRUeXBlLnRyYW5zZmVyO1xuICAgIGNvbnN0IHRyYW5zZmVyRmVlID0gMDtcbiAgICBjb25zdCB0b3RhbCA9IHN1YnRvdGFsICsgb3JkZXJEYXRhLmRlbGl2ZXJ5Q29zdDtcbiAgICBcbiAgICAvLyBDb21wbGV0ZSB0aGUgb3JkZXIgZGF0YSB3aXRoIGNhcnQgaW5mb3JtYXRpb25cbiAgICBjb25zdCBjb21wbGV0ZU9yZGVyRGF0YTogT3JkZXJEYXRhID0ge1xuICAgICAgLi4ub3JkZXJEYXRhLFxuICAgICAgaXRlbXM6IHN0YXRlLml0ZW1zLFxuICAgICAgc3VidG90YWwsXG4gICAgICB0cmFuc2ZlckZlZSxcbiAgICAgIHRvdGFsLFxuICAgICAgY2FzaFRvdGFsOiB0b3RhbHNCeVBheW1lbnRUeXBlLmNhc2gsXG4gICAgICB0cmFuc2ZlclRvdGFsOiB0b3RhbHNCeVBheW1lbnRUeXBlLnRyYW5zZmVyXG4gICAgfTtcbiAgICBcbiAgICBzZW5kT3JkZXJUb1doYXRzQXBwKGNvbXBsZXRlT3JkZXJEYXRhKTtcbiAgICBzZXRTaG93Q2hlY2tvdXRNb2RhbChmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlT3Blbk5vdmVsYXMgPSAoKSA9PiB7XG4gICAgc2V0U2hvd05vdmVsYXNNb2RhbCh0cnVlKTtcbiAgfTtcblxuICBjb25zdCBnZXRJdGVtVXJsID0gKGl0ZW06IGFueSkgPT4ge1xuICAgIGlmIChpdGVtLnR5cGUgPT09ICdub3ZlbCcpIHJldHVybiAnIyc7XG4gICAgcmV0dXJuIGAvJHtpdGVtLnR5cGV9LyR7aXRlbS5pZH1gO1xuICB9O1xuXG4gIGNvbnN0IGdldEl0ZW1ZZWFyID0gKGl0ZW06IGFueSkgPT4ge1xuICAgIGlmIChpdGVtLnR5cGUgPT09ICdub3ZlbCcpIHJldHVybiBpdGVtLnllYXI7XG4gICAgY29uc3QgZGF0ZSA9IGl0ZW0ucmVsZWFzZV9kYXRlIHx8IGl0ZW0uZmlyc3RfYWlyX2RhdGU7XG4gICAgcmV0dXJuIGRhdGUgPyBuZXcgRGF0ZShkYXRlKS5nZXRGdWxsWWVhcigpIDogJ04vQSc7XG4gIH07XG5cbiAgY29uc3QgZ2V0UG9zdGVyVXJsID0gKHBvc3RlclBhdGg6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICByZXR1cm4gcG9zdGVyUGF0aFxuICAgICAgPyBgJHtJTUFHRV9CQVNFX1VSTH0vJHtQT1NURVJfU0laRX0ke3Bvc3RlclBhdGh9YFxuICAgICAgOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NDA0MDQ2NTMzMjUtYWIxMjdkNDlhYmMxP3c9NTAwJmg9NzUwJmZpdD1jcm9wJmNyb3A9Y2VudGVyJztcbiAgfTtcblxuICBjb25zdCBnZXROb3ZlbEltYWdlID0gKG5vdmVsOiBOb3ZlbENhcnRJdGVtKSA9PiB7XG4gICAgaWYgKG5vdmVsLmltYWdlKSB7XG4gICAgICByZXR1cm4gbm92ZWwuaW1hZ2U7XG4gICAgfVxuICAgIC8vIEltYWdlbiBwb3IgZGVmZWN0byBiYXNhZGEgZW4gZWwgZ8OpbmVyb1xuICAgIGNvbnN0IGdlbnJlSW1hZ2VzID0ge1xuICAgICAgJ0RyYW1hJzogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA3MDAzMjExMTY5LTBhMWRkNzIyOGYyZD93PTMwMCZoPTQwMCZmaXQ9Y3JvcCcsXG4gICAgICAnUm9tYW5jZSc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxODE5OTI2Njc5MS01Mzc1YTgzMTkwYjc/dz0zMDAmaD00MDAmZml0PWNyb3AnLFxuICAgICAgJ0FjY2nDs24nOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODk1OTk4NDMyNTMtYzc2Y2M0YmNiOGNmP3c9MzAwJmg9NDAwJmZpdD1jcm9wJyxcbiAgICAgICdDb21lZGlhJzogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTEzNDc1MzgyNTg1LWQwNmU1OGJjYjBlMD93PTMwMCZoPTQwMCZmaXQ9Y3JvcCcsXG4gICAgICAnRmFtaWxpYSc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxMTg5NTQyNjMyOC1kYzg3MTQxOTEzMDA/dz0zMDAmaD00MDAmZml0PWNyb3AnXG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gZ2VucmVJbWFnZXNbbm92ZWwuZ2VucmUgYXMga2V5b2YgdHlwZW9mIGdlbnJlSW1hZ2VzXSB8fCBcbiAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDgxNjI3ODM0ODc2LWI3ODMzZThmNTU3MD93PTMwMCZoPTQwMCZmaXQ9Y3JvcCc7XG4gIH07XG5cbiAgY29uc3QgaXNBbmltZSA9IChpdGVtOiBhbnkpID0+IHtcbiAgICBpZiAoaXRlbS50eXBlID09PSAnbm92ZWwnKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGl0ZW0ub3JpZ2luYWxfbGFuZ3VhZ2UgPT09ICdqYScgfHwgXG4gICAgICAgICAgIChpdGVtLmdlbnJlX2lkcyAmJiBpdGVtLmdlbnJlX2lkcy5pbmNsdWRlcygxNikpIHx8XG4gICAgICAgICAgIGl0ZW0udGl0bGU/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2FuaW1lJyk7XG4gIH07XG5cbiAgY29uc3QgdG90YWxQcmljZSA9IGNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgY29uc3QgdG90YWxzQnlQYXltZW50VHlwZSA9IGNhbGN1bGF0ZVRvdGFsQnlQYXltZW50VHlwZSgpO1xuICBjb25zdCBtb3ZpZUNvdW50ID0gc3RhdGUuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS50eXBlID09PSAnbW92aWUnKS5sZW5ndGg7XG4gIGNvbnN0IHNlcmllc0NvdW50ID0gc3RhdGUuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS50eXBlID09PSAndHYnKS5sZW5ndGg7XG4gIGNvbnN0IG5vdmVsQ291bnQgPSBzdGF0ZS5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnR5cGUgPT09ICdub3ZlbCcpLmxlbmd0aDtcbiAgY29uc3QgYW5pbWVDb3VudCA9IHN0YXRlLml0ZW1zLmZpbHRlcihpdGVtID0+IGlzQW5pbWUoaXRlbSkpLmxlbmd0aDtcblxuICBpZiAoc3RhdGUuaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1heC13LW1kIHctZnVsbFwiPlxuICAgICAgICAgIDxTaG9wcGluZ0NhcnQgY2xhc3NOYW1lPVwiaC0yNCB3LTI0IHRleHQtZ3JheS00MDAgbXgtYXV0byBtYi02XCIgLz5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbWItNFwiPlR1IGNhcnJpdG8gZXN0w6EgdmFjw61vPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLThcIj5cbiAgICAgICAgICAgIEV4cGxvcmEgbnVlc3RybyBjYXTDoWxvZ28geSBhZ3JlZ2EgcGVsw61jdWxhcywgc2VyaWVzIG8gYW5pbWUgYSB0dSBjYXJyaXRvLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICB0bz1cIi9tb3ZpZXNcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmx1ZS02MDAgaG92ZXI6YmctYmx1ZS03MDAgdGV4dC13aGl0ZSBweC02IHB5LTMgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEV4cGxvcmFyIFBlbMOtY3VsYXNcbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgIHRvPVwiL3R2XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTcwMCB0ZXh0LXdoaXRlIHB4LTYgcHktMyByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzIHRleHQtY2VudGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgVmVyIFNlcmllc1xuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgdG89XCIvYW5pbWVcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctcGluay02MDAgaG92ZXI6YmctcGluay03MDAgdGV4dC13aGl0ZSBweC02IHB5LTMgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIERlc2N1YnJpciBBbmltZVxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgdG89XCIvYWRtaW5cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctZ3JheS02MDAgaG92ZXI6YmctZ3JheS03MDAgdGV4dC13aGl0ZSBweC02IHB5LTMgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LWNlbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1yLTJcIj7impnvuI88L3NwYW4+XG4gICAgICAgICAgICAgIFBhbmVsIGRlIENvbnRyb2xcbiAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTZ4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHB5LTQgc206cHktOFwiPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi02IHNtOm1iLTggc3BhY2UteS00IHNtOnNwYWNlLXktMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc206anVzdGlmeS1zdGFydFwiPlxuICAgICAgICAgICAgPFNob3BwaW5nQ2FydCBjbGFzc05hbWU9XCJtci0yIHNtOm1yLTMgaC02IHctNiBzbTpoLTggc206dy04IHRleHQtYmx1ZS02MDBcIiAvPlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIHNtOnRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+TWkgQ2Fycml0bzwvaDE+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIHRvPVwiL1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNjAwIGhvdmVyOnRleHQtYmx1ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc206anVzdGlmeS1zdGFydCBmb250LW1lZGl1bSB0ZXh0LXNtIHNtOnRleHQtYmFzZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEFycm93TGVmdCBjbGFzc05hbWU9XCJtci0xIGgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgU2VndWlyIGV4cGxvcmFuZG9cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDYXJ0IEl0ZW1zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgc2hhZG93LXNtIG92ZXJmbG93LWhpZGRlbiBtYi00IHNtOm1iLTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiBib3JkZXItYiBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktMiBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgRWxlbWVudG9zICh7c3RhdGUudG90YWx9KVxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xlYXJDYXJ0fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtcmVkLTYwMCBob3Zlcjp0ZXh0LXJlZC04MDAgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBWYWNpYXIgY2Fycml0b1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU9wZW5Ob3ZlbGFzfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1wdXJwbGUtNjAwIGhvdmVyOmJnLXB1cnBsZS03MDAgdGV4dC13aGl0ZSBweC02IHB5LTMgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBWZXIgTm92ZWxhc1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtZ3JheS0yMDBcIj5cbiAgICAgICAgICAgIHtzdGF0ZS5pdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2l0ZW0udHlwZX0tJHtpdGVtLmlkfWB9IGNsYXNzTmFtZT17YHAtNiBob3ZlcjpiZy1ncmFkaWVudC10by1yIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBib3JkZXItbC00IGJvcmRlci10cmFuc3BhcmVudCAke1xuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9PT0gJ25vdmVsJyBcbiAgICAgICAgICAgICAgICAgID8gJ2hvdmVyOmZyb20tcGluay01MCBob3Zlcjp0by1wdXJwbGUtNTAgaG92ZXI6Ym9yZGVyLXBpbmstNDAwJyBcbiAgICAgICAgICAgICAgICAgIDogJ2hvdmVyOmZyb20tYmx1ZS01MCBob3Zlcjp0by1wdXJwbGUtNTAgaG92ZXI6Ym9yZGVyLWJsdWUtNDAwJ1xuICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLXN0YXJ0IHNwYWNlLXktNCBzbTpzcGFjZS15LTAgc206c3BhY2UteC00XCI+XG4gICAgICAgICAgICAgICAgICB7LyogUG9zdGVyICovfVxuICAgICAgICAgICAgICAgICAge2l0ZW0udHlwZSA9PT0gJ25vdmVsJyA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIG14LWF1dG8gc206bXgtMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy0yNCBoLTM2IHNtOnctMjAgc206aC0yOCByb3VuZGVkLXhsIHNoYWRvdy1sZyBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyLTIgYm9yZGVyLXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17Z2V0Tm92ZWxJbWFnZShpdGVtIGFzIE5vdmVsQ2FydEl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcj17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5zcmMgPSAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODE2Mjc4MzQ4NzYtYjc4MzNlOGY1NTcwP3c9MzAwJmg9NDAwJmZpdD1jcm9wJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdCBmcm9tLWJsYWNrLzYwIHZpYS10cmFuc3BhcmVudCB0by10cmFuc3BhcmVudFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0xIGxlZnQtMSByaWdodC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcGluay01MDAvODAgdGV4dC13aGl0ZSBweC0xIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LWJvbGQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm9va09wZW4gY2xhc3NOYW1lPVwiaC0zIHctMyBpbmxpbmUgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTm92ZWxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPExpbmsgdG89e2dldEl0ZW1VcmwoaXRlbSl9IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgbXgtYXV0byBzbTpteC0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9e2dldFBvc3RlclVybChpdGVtLnBvc3Rlcl9wYXRoKX1cbiAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0yNCBoLTM2IHNtOnctMjAgc206aC0yOCBvYmplY3QtY292ZXIgcm91bmRlZC14bCBzaGFkb3ctbGcgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjpzY2FsZS0xMDUgYm9yZGVyLTIgYm9yZGVyLXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgey8qIENvbnRlbnQgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wIHRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiPlxuXG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLnR5cGUgPT09ICdub3ZlbCcgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBicmVhay13b3JkcyBob3Zlcjp0ZXh0LXRyYW5zcGFyZW50IGhvdmVyOmJnLWNsaXAtdGV4dCBob3ZlcjpiZy1ncmFkaWVudC10by1yIGhvdmVyOmZyb20tYmx1ZS02MDAgaG92ZXI6dG8tcHVycGxlLTYwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvPXtnZXRJdGVtVXJsKGl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2sgaG92ZXI6dGV4dC1ibHVlLTYwMCB0cmFuc2l0aW9uLWNvbG9ycyBtYi0zXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBzbTp0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIGJyZWFrLXdvcmRzIGhvdmVyOnRleHQtdHJhbnNwYXJlbnQgaG92ZXI6YmctY2xpcC10ZXh0IGhvdmVyOmJnLWdyYWRpZW50LXRvLXIgaG92ZXI6ZnJvbS1ibHVlLTYwMCBob3Zlcjp0by1wdXJwbGUtNjAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge2l0ZW0udHlwZSA9PT0gJ3R2JyAmJiAnc2VsZWN0ZWRTZWFzb25zJyBpbiBpdGVtICYmIGl0ZW0uc2VsZWN0ZWRTZWFzb25zICYmIGl0ZW0uc2VsZWN0ZWRTZWFzb25zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtMTAwIHRvLXBpbmstMTAwIHRleHQtcHVycGxlLTcwMCBweC00IHB5LTIgcm91bmRlZC1mdWxsIHRleHQtc20gZm9udC1zZW1pYm9sZCBib3JkZXIgYm9yZGVyLXB1cnBsZS0yMDAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxNb25pdG9yIGNsYXNzTmFtZT1cImgtNCB3LTQgaW5saW5lIG1yLTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBUZW1wb3JhZGFzOiB7aXRlbS5zZWxlY3RlZFNlYXNvbnMuc29ydCgoYSwgYikgPT4gYSAtIGIpLmpvaW4oJywgJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7aXRlbS50eXBlID09PSAnbm92ZWwnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1ibG9jayBiZy1ncmFkaWVudC10by1yIGZyb20tcGluay0xMDAgdG8tcHVycGxlLTEwMCB0ZXh0LXBpbmstNzAwIHB4LTQgcHktMiByb3VuZGVkLWZ1bGwgdGV4dC1zbSBmb250LXNlbWlib2xkIGJvcmRlciBib3JkZXItcGluay0yMDAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxCb29rT3BlbiBjbGFzc05hbWU9XCJoLTQgdy00IGlubGluZSBtci0yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpdGVtIGFzIE5vdmVsQ2FydEl0ZW0pLmNoYXB0ZXJzfSBjYXDDrXR1bG9zIOKAoiB7KGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbSkuZ2VucmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsoaXRlbSBhcyBOb3ZlbENhcnRJdGVtKS5jb3VudHJ5ICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtbC0yXCI+4oCiIHsoaXRlbSBhcyBOb3ZlbENhcnRJdGVtKS5jb3VudHJ5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpdGVtIGFzIE5vdmVsQ2FydEl0ZW0pLnN0YXR1cyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgbWwtMiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbSkuc3RhdHVzID09PSAndHJhbnNtaXNpb24nID8gJ3RleHQtcmVkLTYwMCcgOiAndGV4dC1ncmVlbi02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4oCiIHsoaXRlbSBhcyBOb3ZlbENhcnRJdGVtKS5zdGF0dXMgPT09ICd0cmFuc21pc2lvbicgPyAn8J+ToSBFbiBUcmFuc21pc2nDs24nIDogJ+KchSBGaW5hbGl6YWRhJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzbTpqdXN0aWZ5LXN0YXJ0IGdhcC0zIG10LTMgdGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtMTAwIHRvLXB1cnBsZS0xMDAgdGV4dC1ibHVlLTcwMCBweC0zIHB5LTIgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1zZW1pYm9sZCBib3JkZXIgYm9yZGVyLWJsdWUtMjAwIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0udHlwZSA9PT0gJ21vdmllJyA/ICdQZWzDrWN1bGEnIDogaXRlbS50eXBlID09PSAndHYnID8gJ1NlcmllJyA6ICdOb3ZlbGEnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBiZy1ncmF5LTUwIHB4LTMgcHktMiByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENhbGVuZGFyIGNsYXNzTmFtZT1cImgtNCB3LTQgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Z2V0SXRlbVllYXIoaXRlbSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnR5cGUgIT09ICdub3ZlbCcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgYmcteWVsbG93LTUwIHB4LTMgcHktMiByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci15ZWxsb3ctMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFyIGNsYXNzTmFtZT1cImgtNCB3LTQgbXItMSBmaWxsLXllbGxvdy00MDAgdGV4dC15ZWxsb3ctNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0udm90ZV9hdmVyYWdlID8gaXRlbS52b3RlX2F2ZXJhZ2UudG9GaXhlZCgxKSA6ICdOL0EnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBNb2Rlcm4gUGF5bWVudCBUeXBlIFNlbGVjdGlvbiAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHAtNCBiZy1ncmFkaWVudC10by1yIGZyb20tZ3JheS01MCB0by1ibHVlLTUwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc206anVzdGlmeS1zdGFydFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1yLTNcIj7wn5KzIE3DqXRvZG8gZGUgUGFnbzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBzbTpqdXN0aWZ5LXN0YXJ0IHNwYWNlLXgtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlUGF5bWVudFR5cGUoaXRlbS5pZCwgJ2Nhc2gnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSBweC00IHB5LTMgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXltZW50VHlwZSA9PT0gJ2Nhc2gnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdG8tZW1lcmFsZC01MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2NhbGUtMTA1J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZSB0ZXh0LWdyYXktNjAwIGhvdmVyOmJnLWdyZWVuLTUwIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBob3Zlcjpib3JkZXItZ3JlZW4tMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0ucGF5bWVudFR5cGUgPT09ICdjYXNoJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtcmlnaHQtMSBiZy1ncmVlbi00MDAgdGV4dC13aGl0ZSBwLTEgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJoLTMgdy0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvbGxhclNpZ24gY2xhc3NOYW1lPVwiaC00IHctNCBpbmxpbmUgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRWZlY3Rpdm9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5wYXltZW50VHlwZSA9PT0gJ2Nhc2gnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJoLTMgdy0zIGlubGluZSBtbC0yIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlUGF5bWVudFR5cGUoaXRlbS5pZCwgJ3RyYW5zZmVyJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcHgtNCBweS0zIHJvdW5kZWQteGwgdGV4dC1zbSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucGF5bWVudFR5cGUgPT09ICd0cmFuc2ZlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLW9yYW5nZS01MDAgdG8tcmVkLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzY2FsZS0xMDUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlIHRleHQtZ3JheS02MDAgaG92ZXI6Ymctb3JhbmdlLTUwIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMCBob3Zlcjpib3JkZXItb3JhbmdlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xIC1yaWdodC0xIGJnLW9yYW5nZS00MDAgdGV4dC13aGl0ZSBwLTEgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJoLTMgdy0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENyZWRpdENhcmQgY2xhc3NOYW1lPVwiaC00IHctNCBpbmxpbmUgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhbnNmZXJlbmNpYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTEgdGV4dC14cyBvcGFjaXR5LTkwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoK3thZG1pbkNvbnRleHQ/LnN0YXRlPy5wcmljZXM/LnRyYW5zZmVyRmVlUGVyY2VudGFnZSB8fCAxMH0lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5wYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cImgtMyB3LTMgaW5saW5lIG1sLTIgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIHctZnVsbCBzbTp3LWF1dG8gc206bWwtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWdyZWVuLTUwIHRvLWVtZXJhbGQtNTAgcm91bmRlZC0yeGwgcC00IGJvcmRlci0yIGJvcmRlci1ncmVlbi0yMDAgc2hhZG93LWxnIHNtOm1pbi13LVsxNjBweF0gdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZ3JlZW4tNzAwIG1iLTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0ucGF5bWVudFR5cGUgPT09ICdjYXNoJyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9sbGFyU2lnbiBjbGFzc05hbWU9XCJoLTQgdy00IG1yLTFcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDcmVkaXRDYXJkIGNsYXNzTmFtZT1cImgtNCB3LTQgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnBheW1lbnRUeXBlID09PSAnY2FzaCcgPyAnRWZlY3Rpdm8nIDogJ1RyYW5zZmVyZW5jaWEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LWdyZWVuLTgwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICR7Y2FsY3VsYXRlSXRlbVByaWNlKGl0ZW0pLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5wYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LW9yYW5nZS02MDAgZm9udC1zZW1pYm9sZCBiZy1vcmFuZ2UtMTAwIHB4LTIgcHktMSByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAre2FkbWluQ29udGV4dD8uc3RhdGU/LnByaWNlcz8udHJhbnNmZXJGZWVQZXJjZW50YWdlIHx8IDEwfSUgaW5jbHVpZG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIEV4dGVuZGVkIHNlcmllcyBpbmRpY2F0b3IgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50eXBlID09PSAndHYnICYmICdudW1iZXJfb2ZfZXBpc29kZXMnIGluIGl0ZW0gJiYgaXRlbS5udW1iZXJfb2ZfZXBpc29kZXMgPiA1MCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci0xMDAgdG8tb3JhbmdlLTEwMCBweC0zIHB5LTIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItYW1iZXItMzAwIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNjAwIG1yLTEgdGV4dC14c1wiPvCfk4o8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1hbWJlci03MDBcIj5TZXJpZSBFeHRlbnNhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50eXBlID09PSAndHYnICYmICdzZWxlY3RlZFNlYXNvbnMnIGluIGl0ZW0gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdG89e2dldEl0ZW1VcmwoaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMyB0ZXh0LXB1cnBsZS02MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1ncmFkaWVudC10by1yIGhvdmVyOmZyb20tcHVycGxlLTUwMCBob3Zlcjp0by1waW5rLTUwMCBiZy1wdXJwbGUtNTAgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTExMCBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWxnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0YXIgdGVtcG9yYWRhc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxFZGl0MyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJlbW92ZUl0ZW0oaXRlbS5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgdGV4dC1yZWQtNjAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6YmctZ3JhZGllbnQtdG8tciBob3Zlcjpmcm9tLXJlZC01MDAgaG92ZXI6dG8tcGluay01MDAgYmctcmVkLTUwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMTAgc2hhZG93LW1kIGhvdmVyOnNoYWRvdy1sZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkVsaW1pbmFyIGRlbCBjYXJyaXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogT3JkZXIgU3VtbWFyeSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLXdoaXRlIHRvLWdyYXktNTAgcm91bmRlZC0yeGwgc2hhZG93LXhsIGJvcmRlciBib3JkZXItZ3JheS0xMDAgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS02MDAgdG8tcHVycGxlLTYwMCBwLTQgc206cC02IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNCBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNtOmp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzIwIHAtMiByb3VuZGVkLWxnIG1yLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxTaG9wcGluZ0NhcnQgY2xhc3NOYW1lPVwiaC02IHctNlwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgUmVzdW1lbiBkZWwgUGVkaWRvXG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgc206dGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgc206dGV4dC0zeGwgZm9udC1ib2xkXCI+JHt0b3RhbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBvcGFjaXR5LTkwXCI+e3N0YXRlLnRvdGFsfSBlbGVtZW50b3M8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBzbTpwLTZcIj5cbiAgICAgICAgICAgIHsvKiBEZXNnbG9zZSBwb3IgdGlwbyBkZSBwYWdvICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MCB0by1wdXJwbGUtNTAgcm91bmRlZC14bCBwLTQgbWItNiBib3JkZXIgYm9yZGVyLWJsdWUtMTAwXCI+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNtOmp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICAgICAgICA8Q2FsY3VsYXRvciBjbGFzc05hbWU9XCJtci0yIGgtNSB3LTUgdGV4dC1ibHVlLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgRGVzZ2xvc2UgcG9yIFRpcG8gZGUgUGFnb1xuICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC00IG1iLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyZWVuLTUwIHJvdW5kZWQtbGcgcC00IGJvcmRlciBib3JkZXItZ3JlZW4tMjAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxEb2xsYXJTaWduIGNsYXNzTmFtZT1cImgtNSB3LTUgdGV4dC1ncmVlbi02MDAgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1ncmVlbi03MDBcIj5FZmVjdGl2bzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JlZW4tODAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAke3RvdGFsc0J5UGF5bWVudFR5cGUuY2FzaC50b0xvY2FsZVN0cmluZygpfSBDVVBcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyZWVuLTYwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtzdGF0ZS5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnBheW1lbnRUeXBlID09PSAnY2FzaCcpLmxlbmd0aH0gZWxlbWVudG9zXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1vcmFuZ2UtNTAgcm91bmRlZC1sZyBwLTQgYm9yZGVyIGJvcmRlci1vcmFuZ2UtMjAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDcmVkaXRDYXJkIGNsYXNzTmFtZT1cImgtNSB3LTUgdGV4dC1vcmFuZ2UtNjAwIG1yLTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtb3JhbmdlLTcwMFwiPlRyYW5zZmVyZW5jaWE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LW9yYW5nZS04MDAgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICR7dG90YWxzQnlQYXltZW50VHlwZS50cmFuc2Zlci50b0xvY2FsZVN0cmluZygpfSBDVVBcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LW9yYW5nZS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7c3RhdGUuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJykubGVuZ3RofSBlbGVtZW50b3MgKCsxMCUpXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tMTAwIHRvLW9yYW5nZS0xMDAgcm91bmRlZC1sZyBwLTQgYm9yZGVyLTIgYm9yZGVyLWdyYXktMjAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5Ub3RhbCBHZW5lcmFsOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWJsdWUtNjAwXCI+JHt0b3RhbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIERlc2dsb3NlIGRldGFsbGFkbyBkZSBwcmVjaW9zICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MCB0by1wdXJwbGUtNTAgcm91bmRlZC14bCBwLTQgbWItNiBib3JkZXIgYm9yZGVyLWJsdWUtMTAwXCI+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNtOmp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWxnIG1yLTJcIj7wn5KwPC9zcGFuPlxuICAgICAgICAgICAgICAgIERldGFsbGUgZGUgRWxlbWVudG9zXG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBtYXgtaC02NCBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICAgICAgICB7c3RhdGUuaXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtUHJpY2UgPSBjYWxjdWxhdGVJdGVtUHJpY2UoaXRlbSk7XG4gICAgICAgICAgICAgICAgICBsZXQgYmFzZVByaWNlOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnbm92ZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdmVsSXRlbSA9IGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbTtcbiAgICAgICAgICAgICAgICAgICAgYmFzZVByaWNlID0gbm92ZWxJdGVtLmNoYXB0ZXJzICogbm92ZWxJdGVtLnByaWNlUGVyQ2hhcHRlcjtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnbW92aWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2VQcmljZSA9IDgwO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZVByaWNlID0gKCdzZWxlY3RlZFNlYXNvbnMnIGluIGl0ZW0gPyBpdGVtLnNlbGVjdGVkU2Vhc29ucz8ubGVuZ3RoIHx8IDEgOiAxKSAqIDMwMDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtpdGVtLnR5cGV9LSR7aXRlbS5pZH1gfSBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLWxnIHAtMyBib3JkZXIgYm9yZGVyLWdyYXktMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgdGV4dC1zbSBtYi0xIGJyZWFrLXdvcmRzXCI+e2l0ZW0udGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnR5cGUgPT09ICdtb3ZpZScgPyAnUGVsw61jdWxhJyA6IGl0ZW0udHlwZSA9PT0gJ3R2JyA/ICdTZXJpZScgOiAnTm92ZWxhJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgeydzZWxlY3RlZFNlYXNvbnMnIGluIGl0ZW0gJiYgaXRlbS5zZWxlY3RlZFNlYXNvbnMgJiYgaXRlbS5zZWxlY3RlZFNlYXNvbnMubGVuZ3RoID4gMCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgIOKAoiBUZW1wb3JhZGFzOiAke2l0ZW0uc2VsZWN0ZWRTZWFzb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKS5qb2luKCcsICcpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50eXBlID09PSAnbm92ZWwnICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAg4oCiICR7KGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbSkuY2hhcHRlcnN9IGNhcMOtdHVsb3Mg4oCiICR7KGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbSkuZ2VucmV9JHsoaXRlbSBhcyBOb3ZlbENhcnRJdGVtKS5jb3VudHJ5ID8gYCDigKIgJHsoaXRlbSBhcyBOb3ZlbENhcnRJdGVtKS5jb3VudHJ5fWAgOiAnJ30keyhpdGVtIGFzIE5vdmVsQ2FydEl0ZW0pLnN0YXR1cyA/IGAg4oCiICR7KGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbSkuc3RhdHVzID09PSAndHJhbnNtaXNpb24nID8gJ0VuIFRyYW5zbWlzacOzbicgOiAnRmluYWxpemFkYSd9YCA6ICcnfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNBbmltZShpdGVtKSAmJiAnIOKAoiBBbmltZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgaW5saW5lLWJsb2NrIHB4LTIgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LW1lZGl1bSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucGF5bWVudFR5cGUgPT09ICdjYXNoJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTcwMCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1vcmFuZ2UtMTAwIHRleHQtb3JhbmdlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnBheW1lbnRUeXBlID09PSAnY2FzaCcgPyAnRWZlY3Rpdm8nIDogJ1RyYW5zZmVyZW5jaWEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHQgbWwtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgZm9udC1ib2xkICR7aXRlbS5wYXltZW50VHlwZSA9PT0gJ2Nhc2gnID8gJ3RleHQtZ3JlZW4tNjAwJyA6ICd0ZXh0LW9yYW5nZS02MDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAke2l0ZW1QcmljZS50b0xvY2FsZVN0cmluZygpfSBDVVBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQmFzZTogJHtiYXNlUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50eXBlID09PSAndHYnICYmICdzZWxlY3RlZFNlYXNvbnMnIGluIGl0ZW0gJiYgaXRlbS5zZWxlY3RlZFNlYXNvbnMgJiYgaXRlbS5zZWxlY3RlZFNlYXNvbnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7TWF0aC5yb3VuZChpdGVtUHJpY2UgLyBpdGVtLnNlbGVjdGVkU2Vhc29ucy5sZW5ndGgpLnRvTG9jYWxlU3RyaW5nKCl9IENVUC90ZW1wLlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0udHlwZSA9PT0gJ25vdmVsJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7KGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbSkucHJpY2VQZXJDaGFwdGVyLnRvTG9jYWxlU3RyaW5nKCl9IENVUC9jYXAuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtNCBib3JkZXItdCBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBzcGFjZS15LTIgc206c3BhY2UteS0wXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCI+VG90YWw6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JlZW4tNjAwXCI+JHt0b3RhbFByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0zIGdhcC00IG1iLTZcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ibHVlLTUwIHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItYmx1ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LWNlbnRlciBzbTp0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ibHVlLTYwMCBtYi0xXCI+UGVsw61jdWxhczwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtYmx1ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bW92aWVDb3VudH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWJsdWUtMTAwIHAtMyByb3VuZGVkLWxnIG14LWF1dG8gc206bXgtMCBtdC0yIHNtOm10LTAgdy1maXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPENsYXBwZXJib2FyZCBjbGFzc05hbWU9XCJoLTYgdy02IHRleHQtYmx1ZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1wdXJwbGUtNTAgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1wdXJwbGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtcHVycGxlLTYwMCBtYi0xXCI+U2VyaWVzL0FuaW1lPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1wdXJwbGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3Nlcmllc0NvdW50fVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcHVycGxlLTEwMCBwLTMgcm91bmRlZC1sZyBteC1hdXRvIHNtOm14LTAgbXQtMiBzbTptdC0wIHctZml0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxNb25pdG9yIGNsYXNzTmFtZT1cImgtNiB3LTYgdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcGluay01MCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLXBpbmstMTAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtcGluay02MDAgbWItMVwiPk5vdmVsYXM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXBpbmstODAwXCI+e25vdmVsQ291bnR9PC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXBpbmstMTAwIHAtMyByb3VuZGVkLWxnIG14LWF1dG8gc206bXgtMCBtdC0yIHNtOm10LTAgdy1maXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cImgtNiB3LTYgdGV4dC1waW5rLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFN0YXRpc3RpY3MgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTQgbWItNlwiPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTMgdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCI+RXN0YWTDrXN0aWNhcyBkZWwgUGVkaWRvPC9oND5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICB7c3RhdGUuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS50eXBlICE9PSAnbm92ZWwnKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHNwYWNlLXktMSBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPlByb21lZGlvIGRlIGNhbGlmaWNhY2nDs24gKHBlbMOtY3VsYXMvc2VyaWVzKTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8U3RhciBjbGFzc05hbWU9XCJoLTQgdy00IGZpbGwteWVsbG93LTQwMCB0ZXh0LXllbGxvdy00MDAgbXItMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXRlZEl0ZW1zID0gc3RhdGUuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS50eXBlICE9PSAnbm92ZWwnICYmIGl0ZW0udm90ZV9hdmVyYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJhdGVkSXRlbXMubGVuZ3RoID4gMCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChyYXRlZEl0ZW1zLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiBhY2MgKyBpdGVtLnZvdGVfYXZlcmFnZSwgMCkgLyByYXRlZEl0ZW1zLmxlbmd0aCkudG9GaXhlZCgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzAuMCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHNwYWNlLXktMSBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDBcIj5Db250ZW5pZG8gbcOhcyByZWNpZW50ZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICB7c3RhdGUuaXRlbXMubGVuZ3RoID4gMCBcbiAgICAgICAgICAgICAgICAgICAgICA/IE1hdGgubWF4KC4uLnN0YXRlLml0ZW1zLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ25vdmVsJykgcmV0dXJuIChpdGVtIGFzIE5vdmVsQ2FydEl0ZW0pLnllYXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBpdGVtLnJlbGVhc2VfZGF0ZSB8fCBpdGVtLmZpcnN0X2Fpcl9kYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZSA/IG5ldyBEYXRlKGRhdGUpLmdldEZ1bGxZZWFyKCkgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgOiAnTi9BJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBXaGF0c0FwcCBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dDaGVja291dE1vZGFsKHRydWUpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTUwMCB0by1lbWVyYWxkLTUwMCBob3Zlcjpmcm9tLWdyZWVuLTYwMCBob3Zlcjp0by1lbWVyYWxkLTYwMCBhY3RpdmU6ZnJvbS1ncmVlbi03MDAgYWN0aXZlOnRvLWVtZXJhbGQtNzAwIHRleHQtd2hpdGUgcHgtNiBweS00IHJvdW5kZWQteGwgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSBhY3RpdmU6c2NhbGUtOTUgaG92ZXI6c2hhZG93LWxnIHRvdWNoLW1hbmlwdWxhdGlvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTZW5kIGNsYXNzTmFtZT1cIm1yLTMgaC02IHctNlwiIC8+XG4gICAgICAgICAgICAgIEZpbmFsaXphciBQZWRpZG9cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcC00IGJnLWdyZWVuLTUwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1ncmVlbi0xMDBcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyZWVuLTcwMCB0ZXh0LWNlbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1yLTJcIj7wn5OxPC9zcGFuPlxuICAgICAgICAgICAgICAgIENvbXBsZXRlIHN1cyBkYXRvcyBwYXJhIGZpbmFsaXphciBlbCBwZWRpZG9cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgey8qIENoZWNrb3V0IE1vZGFsICovfVxuICAgICAgICA8Q2hlY2tvdXRNb2RhbFxuICAgICAgICAgIGlzT3Blbj17c2hvd0NoZWNrb3V0TW9kYWx9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd0NoZWNrb3V0TW9kYWwoZmFsc2UpfVxuICAgICAgICAgIG9uQ2hlY2tvdXQ9e2hhbmRsZUNoZWNrb3V0fVxuICAgICAgICAgIGl0ZW1zPXtzdGF0ZS5pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnbm92ZWwnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5vdmVsSXRlbSA9IGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICBwcmljZTogY2FsY3VsYXRlSXRlbVByaWNlKGl0ZW0pLFxuICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdub3ZlbCcsXG4gICAgICAgICAgICAgICAgY2hhcHRlcnM6IG5vdmVsSXRlbS5jaGFwdGVycyxcbiAgICAgICAgICAgICAgICBnZW5yZTogbm92ZWxJdGVtLmdlbnJlLFxuICAgICAgICAgICAgICAgIHBheW1lbnRUeXBlOiBpdGVtLnBheW1lbnRUeXBlXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXG4gICAgICAgICAgICAgIHByaWNlOiBjYWxjdWxhdGVJdGVtUHJpY2UoaXRlbSksXG4gICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxuICAgICAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXG4gICAgICAgICAgICAgIHNlbGVjdGVkU2Vhc29uczogJ3NlbGVjdGVkU2Vhc29ucycgaW4gaXRlbSA/IGl0ZW0uc2VsZWN0ZWRTZWFzb25zIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBwYXltZW50VHlwZTogaXRlbS5wYXltZW50VHlwZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgICB0b3RhbD17dG90YWxQcmljZX1cbiAgICAgICAgLz5cbiAgICAgICAgXG4gICAgICAgIHsvKiBNb2RhbCBkZSBOb3ZlbGFzICovfVxuICAgICAgICA8Tm92ZWxhc01vZGFsIFxuICAgICAgICAgIGlzT3Blbj17c2hvd05vdmVsYXNNb2RhbH0gXG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd05vdmVsYXNNb2RhbChmYWxzZSl9IFxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9wYWdlcy9DYXJ0LnRzeCJ9