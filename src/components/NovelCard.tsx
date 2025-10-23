import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/NovelCard.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/NovelCard.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
import { Link } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { Calendar, Plus, Check, Eye, CheckCircle } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useCart } from "/src/context/CartContext.tsx";
import { Toast } from "/src/components/Toast.tsx";
export function NovelCard({ novel }) {
  _s();
  const { addNovel, removeItem, isInCart, getCurrentPrices } = useCart();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const currentPrices = getCurrentPrices();
  const inCart = isInCart(novel.id);
  const getNovelImage = (novel2) => {
    if (novel2.imagen) {
      return novel2.imagen;
    }
    const genreImages = {
      "Drama": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      "Romance": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=400&fit=crop",
      "Acción": "https://images.unsplash.com/photo-1489599843253-c76cc4bcb8cf?w=300&h=400&fit=crop",
      "Comedia": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop",
      "Familia": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=400&fit=crop"
    };
    return genreImages[novel2.genero] || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop";
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
  const handleCartAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 1e3);
    if (inCart) {
      removeItem(novel.id);
      setToastMessage(`"${novel.titulo}" retirada del carrito`);
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
        paymentType: "cash",
        pricePerChapter: currentPrices.novelPricePerChapter,
        totalPrice: novel.capitulos * currentPrices.novelPricePerChapter
      };
      addNovel(novelCartItem);
      setToastMessage(`"${novel.titulo}" agregada al carrito`);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3e3);
  };
  const basePrice = novel.capitulos * currentPrices.novelPricePerChapter;
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: `group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 transform ${isHovered ? "shadow-md scale-[1.01] -translate-y-0.5" : "hover:shadow-md"}`,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 rounded-xl border-2 transition-all duration-200 ${isHovered ? "border-pink-200" : "border-transparent"}` }, void 0, false, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 140,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 z-20", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg ${novel.estado === "transmision" ? "bg-red-500" : "bg-green-500"}`, children: novel.estado === "transmision" ? "📡 LIVE" : "✅ COMPLETA" }, void 0, false, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 146,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 145,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 right-3 z-20", children: /* @__PURE__ */ jsxDEV("span", { className: "bg-black/60 text-white px-2 py-1 rounded-lg text-xs font-medium", children: getCountryFlag(novel.pais || "No especificado") }, void 0, false, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 155,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 154,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative overflow-hidden", children: [
            /* @__PURE__ */ jsxDEV(
              "img",
              {
                src: getNovelImage(novel),
                alt: novel.titulo,
                className: `w-full h-80 object-cover transition-all duration-200 ${isHovered ? "scale-102" : ""}`,
                onError: (e) => {
                  const target = e.target;
                  target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop";
                }
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 161,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 transition-all duration-200 ${isHovered ? "bg-gradient-to-t from-black/20 via-transparent to-transparent" : "bg-black/0"}` }, void 0, false, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 174,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3", children: /* @__PURE__ */ jsxDEV("div", { className: "text-white text-xs", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "bg-white/20 px-2 py-1 rounded-full text-xs font-medium", children: novel.año }, void 0, false, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 184,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "bg-purple-500/80 px-2 py-1 rounded-full text-xs font-bold", children: [
                novel.capitulos,
                " cap."
              ] }, void 0, true, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 187,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 183,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 182,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 181,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 160,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 relative", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: `font-semibold text-gray-900 mb-2 line-clamp-2 transition-all duration-200 ${isHovered ? "text-pink-700" : "text-gray-900"}`, children: novel.titulo }, void 0, false, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 196,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `flex items-center text-gray-500 text-sm mb-3 transition-all duration-200 ${isHovered ? "text-pink-500" : "text-gray-500"}`, children: [
              /* @__PURE__ */ jsxDEV(Calendar, { className: "h-4 w-4 mr-2" }, void 0, false, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 207,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: novel.año }, void 0, false, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 208,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 204,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2 text-xs text-gray-600 mb-4", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium", children: novel.genero }, void 0, false, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 212,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium", children: [
                getCountryFlag(novel.pais || "No especificado"),
                " ",
                novel.pais || "No especificado"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 215,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 211,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 text-sm line-clamp-2 mb-4", children: novel.descripcion || "Sin descripción disponible" }, void 0, false, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 220,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4 border border-purple-200", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-bold text-purple-600 mb-1", children: "Precio" }, void 0, false, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 227,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-lg font-bold text-purple-800", children: [
                "$",
                basePrice.toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 228,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-gray-500", children: [
                "$",
                currentPrices.novelPricePerChapter,
                " CUP × ",
                novel.capitulos,
                " cap."
              ] }, void 0, true, {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 231,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 226,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/home/project/src/components/NovelCard.tsx",
              lineNumber: 225,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleCartAction,
                disabled: isAddingToCart,
                className: `w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 transform relative overflow-hidden ${inCart ? "bg-green-500 hover:bg-green-600 text-white shadow-sm" : "bg-pink-500 hover:bg-pink-600 text-white hover:shadow-md"} ${isAddingToCart ? "scale-95" : "hover:scale-[1.01]"}`,
                children: [
                  isAddingToCart && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-white/20 animate-pulse" }, void 0, false, {
                    fileName: "/home/project/src/components/NovelCard.tsx",
                    lineNumber: 248,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center", children: inCart ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Check, { className: "mr-2 h-4 w-4" }, void 0, false, {
                      fileName: "/home/project/src/components/NovelCard.tsx",
                      lineNumber: 254,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "En el Carrito" }, void 0, false, {
                      fileName: "/home/project/src/components/NovelCard.tsx",
                      lineNumber: 255,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV(CheckCircle, { className: "ml-2 h-4 w-4 text-green-300" }, void 0, false, {
                      fileName: "/home/project/src/components/NovelCard.tsx",
                      lineNumber: 256,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/NovelCard.tsx",
                    lineNumber: 253,
                    columnNumber: 15
                  }, this) : isAddingToCart ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }, void 0, false, {
                      fileName: "/home/project/src/components/NovelCard.tsx",
                      lineNumber: 260,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Agregando..." }, void 0, false, {
                      fileName: "/home/project/src/components/NovelCard.tsx",
                      lineNumber: 261,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/NovelCard.tsx",
                    lineNumber: 259,
                    columnNumber: 15
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Plus, { className: "mr-2 h-4 w-4" }, void 0, false, {
                      fileName: "/home/project/src/components/NovelCard.tsx",
                      lineNumber: 265,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Agregar al Carrito" }, void 0, false, {
                      fileName: "/home/project/src/components/NovelCard.tsx",
                      lineNumber: 266,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/NovelCard.tsx",
                    lineNumber: 264,
                    columnNumber: 15
                  }, this) }, void 0, false, {
                    fileName: "/home/project/src/components/NovelCard.tsx",
                    lineNumber: 251,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 238,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Link,
              {
                to: `/novel/${novel.id}`,
                className: "w-full mt-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-300 text-gray-600 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 flex items-center justify-center",
                children: [
                  /* @__PURE__ */ jsxDEV(Eye, { className: "mr-2 h-4 w-4" }, void 0, false, {
                    fileName: "/home/project/src/components/NovelCard.tsx",
                    lineNumber: 277,
                    columnNumber: 13
                  }, this),
                  "Ver Detalles"
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/NovelCard.tsx",
                lineNumber: 273,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 195,
            columnNumber: 9
          }, this),
          inCart && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg z-30", children: /* @__PURE__ */ jsxDEV(CheckCircle, { className: "h-4 w-4" }, void 0, false, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 285,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/home/project/src/components/NovelCard.tsx",
            lineNumber: 284,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/project/src/components/NovelCard.tsx",
        lineNumber: 130,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      Toast,
      {
        message: toastMessage,
        type: inCart ? "success" : "success",
        isVisible: showToast,
        onClose: () => setShowToast(false)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/NovelCard.tsx",
        lineNumber: 290,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/project/src/components/NovelCard.tsx",
    lineNumber: 129,
    columnNumber: 5
  }, this);
}
_s(NovelCard, "6D76GViVkpszJdCS03zNUPVamt8=", false, function() {
  return [useCart];
});
_c = NovelCard;
var _c;
$RefreshReg$(_c, "NovelCard");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/NovelCard.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/NovelCard.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LGNBSi9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU1BO0FBQUEsZUFwRkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFxRkE7QUFBQSxVQUdDRCxVQUNDLHVCQUFDLFNBQUksV0FBVSxrRkFDYixpQ0FBQyxlQUFZLFdBQVUsYUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBZ0MsS0FEbEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBO0FBQUE7QUFBQSxNQTVKSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUE4SkE7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxTQUFTUDtBQUFBQSxRQUNULE1BQU1PLFNBQVMsWUFBWTtBQUFBLFFBQzNCLFdBQVdWO0FBQUFBLFFBQ1gsU0FBUyxNQUFNQyxhQUFhLEtBQUs7QUFBQTtBQUFBLE1BSm5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlxQztBQUFBLE9Bckt2QztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBdUtBO0FBRUo7QUFBQ04sR0FqUWVGLFdBQVM7QUFBQSxVQUNzQ0YsT0FBTztBQUFBO0FBQUF3RCxLQUR0RHREO0FBQVMsSUFBQXNEO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJSZWFjdCIsIkxpbmsiLCJDYWxlbmRhciIsIlBsdXMiLCJDaGVjayIsIkV5ZSIsIkNoZWNrQ2lyY2xlIiwidXNlQ2FydCIsIlRvYXN0IiwiTm92ZWxDYXJkIiwibm92ZWwiLCJfcyIsImFkZE5vdmVsIiwicmVtb3ZlSXRlbSIsImlzSW5DYXJ0IiwiZ2V0Q3VycmVudFByaWNlcyIsInNob3dUb2FzdCIsInNldFNob3dUb2FzdCIsInVzZVN0YXRlIiwidG9hc3RNZXNzYWdlIiwic2V0VG9hc3RNZXNzYWdlIiwiaXNIb3ZlcmVkIiwic2V0SXNIb3ZlcmVkIiwiaXNBZGRpbmdUb0NhcnQiLCJzZXRJc0FkZGluZ1RvQ2FydCIsImN1cnJlbnRQcmljZXMiLCJpbkNhcnQiLCJpZCIsImdldE5vdmVsSW1hZ2UiLCJpbWFnZW4iLCJnZW5yZUltYWdlcyIsImdlbmVybyIsImdldENvdW50cnlGbGFnIiwiY291bnRyeSIsImZsYWdzIiwiaGFuZGxlQ2FydEFjdGlvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInNldFRpbWVvdXQiLCJ0aXR1bG8iLCJub3ZlbENhcnRJdGVtIiwidGl0bGUiLCJ0eXBlIiwiZ2VucmUiLCJjaGFwdGVycyIsImNhcGl0dWxvcyIsInllYXIiLCJhw7FvIiwiZGVzY3JpcHRpb24iLCJkZXNjcmlwY2lvbiIsInBhaXMiLCJzdGF0dXMiLCJlc3RhZG8iLCJpbWFnZSIsInBheW1lbnRUeXBlIiwicHJpY2VQZXJDaGFwdGVyIiwibm92ZWxQcmljZVBlckNoYXB0ZXIiLCJ0b3RhbFByaWNlIiwiYmFzZVByaWNlIiwidGFyZ2V0Iiwic3JjIiwidG9Mb2NhbGVTdHJpbmciLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJOb3ZlbENhcmQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBTdGFyLCBDYWxlbmRhciwgUGx1cywgQ2hlY2ssIEV5ZSwgQm9va09wZW4sIEdsb2JlLCBNb25pdG9yLCBDaGVja0NpcmNsZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VDYXJ0IH0gZnJvbSAnLi4vY29udGV4dC9DYXJ0Q29udGV4dCc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vVG9hc3QnO1xuaW1wb3J0IHR5cGUgeyBOb3ZlbENhcnRJdGVtIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG5pbnRlcmZhY2UgTm92ZWxDYXJkUHJvcHMge1xuICBub3ZlbDoge1xuICAgIGlkOiBudW1iZXI7XG4gICAgdGl0dWxvOiBzdHJpbmc7XG4gICAgZ2VuZXJvOiBzdHJpbmc7XG4gICAgY2FwaXR1bG9zOiBudW1iZXI7XG4gICAgYcOxbzogbnVtYmVyO1xuICAgIGRlc2NyaXBjaW9uPzogc3RyaW5nO1xuICAgIHBhaXM/OiBzdHJpbmc7XG4gICAgaW1hZ2VuPzogc3RyaW5nO1xuICAgIGVzdGFkbz86ICd0cmFuc21pc2lvbicgfCAnZmluYWxpemFkYSc7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOb3ZlbENhcmQoeyBub3ZlbCB9OiBOb3ZlbENhcmRQcm9wcykge1xuICBjb25zdCB7IGFkZE5vdmVsLCByZW1vdmVJdGVtLCBpc0luQ2FydCwgZ2V0Q3VycmVudFByaWNlcyB9ID0gdXNlQ2FydCgpO1xuICBjb25zdCBbc2hvd1RvYXN0LCBzZXRTaG93VG9hc3RdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdG9hc3RNZXNzYWdlLCBzZXRUb2FzdE1lc3NhZ2VdID0gUmVhY3QudXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXNIb3ZlcmVkLCBzZXRJc0hvdmVyZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNBZGRpbmdUb0NhcnQsIHNldElzQWRkaW5nVG9DYXJ0XSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgXG4gIGNvbnN0IGN1cnJlbnRQcmljZXMgPSBnZXRDdXJyZW50UHJpY2VzKCk7XG4gIGNvbnN0IGluQ2FydCA9IGlzSW5DYXJ0KG5vdmVsLmlkKTtcblxuICBjb25zdCBnZXROb3ZlbEltYWdlID0gKG5vdmVsOiBhbnkpID0+IHtcbiAgICBpZiAobm92ZWwuaW1hZ2VuKSB7XG4gICAgICByZXR1cm4gbm92ZWwuaW1hZ2VuO1xuICAgIH1cbiAgICAvLyBJbWFnZW4gcG9yIGRlZmVjdG8gYmFzYWRhIGVuIGVsIGfDqW5lcm9cbiAgICBjb25zdCBnZW5yZUltYWdlcyA9IHtcbiAgICAgICdEcmFtYSc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUwNzAwMzIxMTE2OS0wYTFkZDcyMjhmMmQ/dz0zMDAmaD00MDAmZml0PWNyb3AnLFxuICAgICAgJ1JvbWFuY2UnOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTgxOTkyNjY3OTEtNTM3NWE4MzE5MGI3P3c9MzAwJmg9NDAwJmZpdD1jcm9wJyxcbiAgICAgICdBY2Npw7NuJzogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDg5NTk5ODQzMjUzLWM3NmNjNGJjYjhjZj93PTMwMCZoPTQwMCZmaXQ9Y3JvcCcsXG4gICAgICAnQ29tZWRpYSc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxMzQ3NTM4MjU4NS1kMDZlNThiY2IwZTA/dz0zMDAmaD00MDAmZml0PWNyb3AnLFxuICAgICAgJ0ZhbWlsaWEnOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTE4OTU0MjYzMjgtZGM4NzE0MTkxMzAwP3c9MzAwJmg9NDAwJmZpdD1jcm9wJ1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIGdlbnJlSW1hZ2VzW25vdmVsLmdlbmVybyBhcyBrZXlvZiB0eXBlb2YgZ2VucmVJbWFnZXNdIHx8IFxuICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODE2Mjc4MzQ4NzYtYjc4MzNlOGY1NTcwP3c9MzAwJmg9NDAwJmZpdD1jcm9wJztcbiAgfTtcblxuICBjb25zdCBnZXRDb3VudHJ5RmxhZyA9IChjb3VudHJ5OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBmbGFnczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICAgICdUdXJxdcOtYSc6ICfwn4e58J+HtycsXG4gICAgICAnQ3ViYSc6ICfwn4eo8J+HuicsXG4gICAgICAnTcOpeGljbyc6ICfwn4ey8J+HvScsXG4gICAgICAnQnJhc2lsJzogJ/Cfh6fwn4e3JyxcbiAgICAgICdDb2xvbWJpYSc6ICfwn4eo8J+HtCcsXG4gICAgICAnQXJnZW50aW5hJzogJ/Cfh6bwn4e3JyxcbiAgICAgICdFc3Bhw7FhJzogJ/Cfh6rwn4e4JyxcbiAgICAgICdFc3RhZG9zIFVuaWRvcyc6ICfwn4e68J+HuCcsXG4gICAgICAnQ29yZWEgZGVsIFN1cic6ICfwn4ew8J+HtycsXG4gICAgICAnSW5kaWEnOiAn8J+HrvCfh7MnLFxuICAgICAgJ1JlaW5vIFVuaWRvJzogJ/Cfh6zwn4enJyxcbiAgICAgICdGcmFuY2lhJzogJ/Cfh6vwn4e3JyxcbiAgICAgICdJdGFsaWEnOiAn8J+HrvCfh7knLFxuICAgICAgJ0FsZW1hbmlhJzogJ/Cfh6nwn4eqJyxcbiAgICAgICdKYXDDs24nOiAn8J+Hr/Cfh7UnLFxuICAgICAgJ0NoaW5hJzogJ/Cfh6jwn4ezJyxcbiAgICAgICdSdXNpYSc6ICfwn4e38J+HuidcbiAgICB9O1xuICAgIHJldHVybiBmbGFnc1tjb3VudHJ5XSB8fCAn8J+MjSc7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2FydEFjdGlvbiA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgXG4gICAgc2V0SXNBZGRpbmdUb0NhcnQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRJc0FkZGluZ1RvQ2FydChmYWxzZSksIDEwMDApO1xuXG4gICAgaWYgKGluQ2FydCkge1xuICAgICAgcmVtb3ZlSXRlbShub3ZlbC5pZCk7XG4gICAgICBzZXRUb2FzdE1lc3NhZ2UoYFwiJHtub3ZlbC50aXR1bG99XCIgcmV0aXJhZGEgZGVsIGNhcnJpdG9gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm92ZWxDYXJ0SXRlbTogTm92ZWxDYXJ0SXRlbSA9IHtcbiAgICAgICAgaWQ6IG5vdmVsLmlkLFxuICAgICAgICB0aXRsZTogbm92ZWwudGl0dWxvLFxuICAgICAgICB0eXBlOiAnbm92ZWwnLFxuICAgICAgICBnZW5yZTogbm92ZWwuZ2VuZXJvLFxuICAgICAgICBjaGFwdGVyczogbm92ZWwuY2FwaXR1bG9zLFxuICAgICAgICB5ZWFyOiBub3ZlbC5hw7FvLFxuICAgICAgICBkZXNjcmlwdGlvbjogbm92ZWwuZGVzY3JpcGNpb24sXG4gICAgICAgIGNvdW50cnk6IG5vdmVsLnBhaXMsXG4gICAgICAgIHN0YXR1czogbm92ZWwuZXN0YWRvLFxuICAgICAgICBpbWFnZTogbm92ZWwuaW1hZ2VuLFxuICAgICAgICBwYXltZW50VHlwZTogJ2Nhc2gnLFxuICAgICAgICBwcmljZVBlckNoYXB0ZXI6IGN1cnJlbnRQcmljZXMubm92ZWxQcmljZVBlckNoYXB0ZXIsXG4gICAgICAgIHRvdGFsUHJpY2U6IG5vdmVsLmNhcGl0dWxvcyAqIGN1cnJlbnRQcmljZXMubm92ZWxQcmljZVBlckNoYXB0ZXJcbiAgICAgIH07XG5cbiAgICAgIGFkZE5vdmVsKG5vdmVsQ2FydEl0ZW0pO1xuICAgICAgc2V0VG9hc3RNZXNzYWdlKGBcIiR7bm92ZWwudGl0dWxvfVwiIGFncmVnYWRhIGFsIGNhcnJpdG9gKTtcbiAgICB9XG4gICAgXG4gICAgc2V0U2hvd1RvYXN0KHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2hvd1RvYXN0KGZhbHNlKSwgMzAwMCk7XG4gIH07XG5cbiAgY29uc3QgYmFzZVByaWNlID0gbm92ZWwuY2FwaXR1bG9zICogY3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcjtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IFxuICAgICAgICBjbGFzc05hbWU9e2Bncm91cCByZWxhdGl2ZSBiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy1zbSBvdmVyZmxvdy1oaWRkZW4gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIHRyYW5zZm9ybSAke1xuICAgICAgICAgIGlzSG92ZXJlZCBcbiAgICAgICAgICAgID8gJ3NoYWRvdy1tZCBzY2FsZS1bMS4wMV0gLXRyYW5zbGF0ZS15LTAuNScgXG4gICAgICAgICAgICA6ICdob3ZlcjpzaGFkb3ctbWQnXG4gICAgICAgIH1gfVxuICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldElzSG92ZXJlZCh0cnVlKX1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRJc0hvdmVyZWQoZmFsc2UpfVxuICAgICAgPlxuICAgICAgICB7LyogQm9yZGVyIGVmZmVjdCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSBpbnNldC0wIHJvdW5kZWQteGwgYm9yZGVyLTIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7XG4gICAgICAgICAgaXNIb3ZlcmVkID8gJ2JvcmRlci1waW5rLTIwMCcgOiAnYm9yZGVyLXRyYW5zcGFyZW50J1xuICAgICAgICB9YH0gLz5cbiAgICAgICAgXG4gICAgICAgIHsvKiBTdGF0dXMgYmFkZ2UgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTMgbGVmdC0zIHotMjBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1ib2xkIHRleHQtd2hpdGUgc2hhZG93LWxnICR7XG4gICAgICAgICAgICBub3ZlbC5lc3RhZG8gPT09ICd0cmFuc21pc2lvbicgPyAnYmctcmVkLTUwMCcgOiAnYmctZ3JlZW4tNTAwJ1xuICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgIHtub3ZlbC5lc3RhZG8gPT09ICd0cmFuc21pc2lvbicgPyAn8J+ToSBMSVZFJyA6ICfinIUgQ09NUExFVEEnfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvdW50cnkgZmxhZyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyByaWdodC0zIHotMjBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy1ibGFjay82MCB0ZXh0LXdoaXRlIHB4LTIgcHktMSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgIHtnZXRDb3VudHJ5RmxhZyhub3ZlbC5wYWlzIHx8ICdObyBlc3BlY2lmaWNhZG8nKX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPXtnZXROb3ZlbEltYWdlKG5vdmVsKX1cbiAgICAgICAgICAgIGFsdD17bm92ZWwudGl0dWxvfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGgtODAgb2JqZWN0LWNvdmVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCAke1xuICAgICAgICAgICAgICBpc0hvdmVyZWQgPyAnc2NhbGUtMTAyJyA6ICcnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgICAgICAgIHRhcmdldC5zcmMgPSAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0ODE2Mjc4MzQ4NzYtYjc4MzNlOGY1NTcwP3c9MzAwJmg9NDAwJmZpdD1jcm9wJztcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogT3ZlcmxheSBvbiBob3ZlciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7XG4gICAgICAgICAgICBpc0hvdmVyZWQgXG4gICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXQgZnJvbS1ibGFjay8yMCB2aWEtdHJhbnNwYXJlbnQgdG8tdHJhbnNwYXJlbnQnIFxuICAgICAgICAgICAgICA6ICdiZy1ibGFjay8wJ1xuICAgICAgICAgIH1gfSAvPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBCb3R0b20gaW5mbyBvdmVybGF5ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIHJpZ2h0LTAgYmctZ3JhZGllbnQtdG8tdCBmcm9tLWJsYWNrLzgwIHRvLXRyYW5zcGFyZW50IHAtM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy13aGl0ZS8yMCBweC0yIHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgIHtub3ZlbC5hw7FvfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy1wdXJwbGUtNTAwLzgwIHB4LTIgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIHtub3ZlbC5jYXBpdHVsb3N9IGNhcC5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcmVsYXRpdmVcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPXtgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTIgbGluZS1jbGFtcC0yIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCAke1xuICAgICAgICAgICAgaXNIb3ZlcmVkIFxuICAgICAgICAgICAgICA/ICd0ZXh0LXBpbmstNzAwJyBcbiAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTkwMCdcbiAgICAgICAgICB9YH0+XG4gICAgICAgICAgICB7bm92ZWwudGl0dWxvfVxuICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LWdyYXktNTAwIHRleHQtc20gbWItMyB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgJHtcbiAgICAgICAgICAgIGlzSG92ZXJlZCA/ICd0ZXh0LXBpbmstNTAwJyA6ICd0ZXh0LWdyYXktNTAwJ1xuICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgIDxDYWxlbmRhciBjbGFzc05hbWU9XCJoLTQgdy00IG1yLTJcIiAvPlxuICAgICAgICAgICAgPHNwYW4+e25vdmVsLmHDsW99PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTIgdGV4dC14cyB0ZXh0LWdyYXktNjAwIG1iLTRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtNzAwIHB4LTIgcHktMSByb3VuZGVkLWZ1bGwgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAge25vdmVsLmdlbmVyb31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLWJsdWUtMTAwIHRleHQtYmx1ZS03MDAgcHgtMiBweS0xIHJvdW5kZWQtZnVsbCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICB7Z2V0Q291bnRyeUZsYWcobm92ZWwucGFpcyB8fCAnTm8gZXNwZWNpZmljYWRvJyl9IHtub3ZlbC5wYWlzIHx8ICdObyBlc3BlY2lmaWNhZG8nfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgdGV4dC1zbSBsaW5lLWNsYW1wLTIgbWItNFwiPlxuICAgICAgICAgICAge25vdmVsLmRlc2NyaXBjaW9uIHx8ICdTaW4gZGVzY3JpcGNpw7NuIGRpc3BvbmlibGUnfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogUHJpY2UgZGlzcGxheSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNTAgdG8tcGluay01MCByb3VuZGVkLWxnIHAtMyBtYi00IGJvcmRlciBib3JkZXItcHVycGxlLTIwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtcHVycGxlLTYwMCBtYi0xXCI+UHJlY2lvPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1wdXJwbGUtODAwXCI+XG4gICAgICAgICAgICAgICAgJHtiYXNlUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgICR7Y3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcn0gQ1VQIMOXIHtub3ZlbC5jYXBpdHVsb3N9IGNhcC5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBBZGQgdG8gQ2FydCBCdXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2FydEFjdGlvbn1cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0FkZGluZ1RvQ2FydH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweC00IHB5LTMgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgdHJhbnNmb3JtIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiAke1xuICAgICAgICAgICAgICBpbkNhcnRcbiAgICAgICAgICAgICAgICA/ICdiZy1ncmVlbi01MDAgaG92ZXI6YmctZ3JlZW4tNjAwIHRleHQtd2hpdGUgc2hhZG93LXNtJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXBpbmstNTAwIGhvdmVyOmJnLXBpbmstNjAwIHRleHQtd2hpdGUgaG92ZXI6c2hhZG93LW1kJ1xuICAgICAgICAgICAgfSAke2lzQWRkaW5nVG9DYXJ0ID8gJ3NjYWxlLTk1JyA6ICdob3ZlcjpzY2FsZS1bMS4wMV0nfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzQWRkaW5nVG9DYXJ0ICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLXdoaXRlLzIwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICB7aW5DYXJ0ID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwibXItMiBoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkVuIGVsIENhcnJpdG88L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUgY2xhc3NOYW1lPVwibWwtMiBoLTQgdy00IHRleHQtZ3JlZW4tMzAwXCIgLz5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKSA6IGlzQWRkaW5nVG9DYXJ0ID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuaW1hdGUtc3BpbiByb3VuZGVkLWZ1bGwgaC00IHctNCBib3JkZXItYi0yIGJvcmRlci13aGl0ZSBtci0yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5BZ3JlZ2FuZG8uLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cIm1yLTIgaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5BZ3JlZ2FyIGFsIENhcnJpdG88L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBWaWV3IERldGFpbHMgTGluayAqL31cbiAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgdG89e2Avbm92ZWwvJHtub3ZlbC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG10LTIgcHgtNCBweS0yIHJvdW5kZWQtbGcgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIGJvcmRlciBib3JkZXItZ3JheS0zMDAgdGV4dC1ncmF5LTYwMCBob3Zlcjpib3JkZXItcGluay0zMDAgaG92ZXI6YmctcGluay01MCBob3Zlcjp0ZXh0LXBpbmstNjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cIm1yLTIgaC00IHctNFwiIC8+XG4gICAgICAgICAgICBWZXIgRGV0YWxsZXNcbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgey8qIFNlbGVjdGlvbiBpbmRpY2F0b3IgKi99XG4gICAgICAgIHtpbkNhcnQgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgcmlnaHQtMiBiZy1ncmVlbi01MDAgdGV4dC13aGl0ZSBwLTEgcm91bmRlZC1mdWxsIHNoYWRvdy1sZyB6LTMwXCI+XG4gICAgICAgICAgICA8Q2hlY2tDaXJjbGUgY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPFRvYXN0XG4gICAgICAgIG1lc3NhZ2U9e3RvYXN0TWVzc2FnZX1cbiAgICAgICAgdHlwZT17aW5DYXJ0ID8gXCJzdWNjZXNzXCIgOiBcInN1Y2Nlc3NcIn1cbiAgICAgICAgaXNWaXNpYmxlPXtzaG93VG9hc3R9XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFNob3dUb2FzdChmYWxzZSl9XG4gICAgICAvPlxuICAgIDwvPlxuICApO1xufSJdLCJmaWxlIjoiL2hvbWUvcHJvamVjdC9zcmMvY29tcG9uZW50cy9Ob3ZlbENhcmQudHN4In0=