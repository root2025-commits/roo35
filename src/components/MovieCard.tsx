import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/MovieCard.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/MovieCard.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
import { Link } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { Star, Calendar, Plus, Check, Eye, CheckCircle } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { OptimizedImage } from "/src/components/OptimizedImage.tsx";
import { useCart } from "/src/context/CartContext.tsx";
import { Toast } from "/src/components/Toast.tsx";
import { IMAGE_BASE_URL, POSTER_SIZE } from "/src/config/api.ts";
export function MovieCard({ item, type }) {
  _s();
  const { addItem, removeItem, isInCart } = useCart();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const title = "title" in item ? item.title : item.name;
  const releaseDate = "release_date" in item ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const posterUrl = item.poster_path ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${item.poster_path}` : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop&crop=center";
  const inCart = isInCart(item.id);
  const handleCartAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 1e3);
    const cartItem = {
      id: item.id,
      title,
      poster_path: item.poster_path,
      type,
      release_date: "release_date" in item ? item.release_date : void 0,
      first_air_date: "first_air_date" in item ? item.first_air_date : void 0,
      vote_average: item.vote_average,
      selectedSeasons: type === "tv" ? [1] : void 0,
      original_language: item.original_language,
      genre_ids: item.genre_ids
    };
    if (inCart) {
      removeItem(item.id);
      setToastMessage(`"${title}" retirado del carrito`);
    } else {
      addItem(cartItem);
      setToastMessage(`"${title}" agregado al carrito`);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3e3);
  };
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: `group relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 transform ${isHovered ? "shadow-md scale-[1.01] -translate-y-0.5" : "hover:shadow-md"}`,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 rounded-xl border-2 transition-all duration-200 ${isHovered ? "border-blue-200" : "border-transparent"}` }, void 0, false, {
            fileName: "/home/project/src/components/MovieCard.tsx",
            lineNumber: 94,
            columnNumber: 9
          }, this),
          item.vote_average >= 8 && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center z-20 shadow-sm", children: [
            /* @__PURE__ */ jsxDEV(Star, { className: "h-3 w-3 mr-1 fill-white" }, void 0, false, {
              fileName: "/home/project/src/components/MovieCard.tsx",
              lineNumber: 101,
              columnNumber: 13
            }, this),
            "TOP"
          ] }, void 0, true, {
            fileName: "/home/project/src/components/MovieCard.tsx",
            lineNumber: 100,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative overflow-hidden", children: [
            /* @__PURE__ */ jsxDEV(
              OptimizedImage,
              {
                src: posterUrl,
                alt: title,
                className: `w-full h-80 transition-all duration-200 ${isHovered ? "scale-102" : ""}`,
                lazy: true
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 107,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 transition-all duration-200 ${isHovered ? "bg-gradient-to-t from-black/10 via-transparent to-transparent" : "bg-black/0"}` }, void 0, false, {
              fileName: "/home/project/src/components/MovieCard.tsx",
              lineNumber: 117,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm flex items-center space-x-1 transition-all duration-200 ${isHovered ? "bg-black/70" : ""}`, children: [
              /* @__PURE__ */ jsxDEV(Star, { className: "h-3 w-3 fill-yellow-400 text-yellow-400" }, void 0, false, {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 126,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: item.vote_average ? item.vote_average.toFixed(1) : "N/A" }, void 0, false, {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 127,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/MovieCard.tsx",
              lineNumber: 123,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/MovieCard.tsx",
            lineNumber: 106,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 relative", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: `font-semibold text-gray-900 mb-2 line-clamp-2 transition-all duration-200 ${isHovered ? "text-blue-700" : "text-gray-900"}`, children: title }, void 0, false, {
              fileName: "/home/project/src/components/MovieCard.tsx",
              lineNumber: 133,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `flex items-center text-gray-500 text-sm mb-3 transition-all duration-200 ${isHovered ? "text-blue-500" : "text-gray-500"}`, children: [
              /* @__PURE__ */ jsxDEV(Calendar, { className: "h-4 w-4 mr-2" }, void 0, false, {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 144,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: year }, void 0, false, {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 145,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/MovieCard.tsx",
              lineNumber: 141,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 text-sm line-clamp-2 mb-4", children: item.overview || "Sin descripción disponible" }, void 0, false, {
              fileName: "/home/project/src/components/MovieCard.tsx",
              lineNumber: 148,
              columnNumber: 11
            }, this),
            type === "tv" && "number_of_episodes" in item && item.number_of_episodes > 50 && /* @__PURE__ */ jsxDEV("div", { className: "mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-amber-500 p-1.5 rounded-lg mr-2 shadow-sm", children: /* @__PURE__ */ jsxDEV("span", { className: "text-white text-xs font-bold", children: "📊" }, void 0, false, {
                  fileName: "/home/project/src/components/MovieCard.tsx",
                  lineNumber: 157,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/components/MovieCard.tsx",
                  lineNumber: 156,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-amber-800", children: "Serie Extensa" }, void 0, false, {
                  fileName: "/home/project/src/components/MovieCard.tsx",
                  lineNumber: 159,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 155,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-xs text-amber-700", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-blue-600 mr-1", children: "📺" }, void 0, false, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 163,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("strong", { children: [
                    item.number_of_episodes,
                    " episodios"
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 164,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/components/MovieCard.tsx",
                  lineNumber: 162,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-green-600 mr-1", children: "💰" }, void 0, false, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 167,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("strong", { children: "$300 CUP por temporada" }, void 0, false, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 168,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/components/MovieCard.tsx",
                  lineNumber: 166,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 161,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/MovieCard.tsx",
              lineNumber: 154,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-gray-200 rounded-full h-1 mb-4 overflow-hidden", children: /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `h-full rounded-full transition-all duration-300 ${isHovered ? "bg-gradient-to-r from-blue-400 to-blue-500" : "bg-gray-400"}`,
                style: { width: `${item.vote_average / 10 * 100}%` }
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 176,
                columnNumber: 13
              },
              this
            ) }, void 0, false, {
              fileName: "/home/project/src/components/MovieCard.tsx",
              lineNumber: 175,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleCartAction,
                disabled: isAddingToCart,
                className: `w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 transform relative overflow-hidden ${inCart ? "bg-green-500 hover:bg-green-600 text-white shadow-sm" : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md"} ${isAddingToCart ? "scale-95" : "hover:scale-[1.01]"}`,
                children: [
                  isAddingToCart && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-white/20 animate-pulse" }, void 0, false, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 198,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center", children: inCart ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Check, { className: "mr-2 h-4 w-4" }, void 0, false, {
                      fileName: "/home/project/src/components/MovieCard.tsx",
                      lineNumber: 204,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "En el Carrito" }, void 0, false, {
                      fileName: "/home/project/src/components/MovieCard.tsx",
                      lineNumber: 205,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV(CheckCircle, { className: "ml-2 h-4 w-4 text-green-300" }, void 0, false, {
                      fileName: "/home/project/src/components/MovieCard.tsx",
                      lineNumber: 206,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 203,
                    columnNumber: 15
                  }, this) : isAddingToCart ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }, void 0, false, {
                      fileName: "/home/project/src/components/MovieCard.tsx",
                      lineNumber: 210,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Agregando..." }, void 0, false, {
                      fileName: "/home/project/src/components/MovieCard.tsx",
                      lineNumber: 211,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 209,
                    columnNumber: 15
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Plus, { className: "mr-2 h-4 w-4" }, void 0, false, {
                      fileName: "/home/project/src/components/MovieCard.tsx",
                      lineNumber: 215,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Agregar al Carrito" }, void 0, false, {
                      fileName: "/home/project/src/components/MovieCard.tsx",
                      lineNumber: 216,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 214,
                    columnNumber: 15
                  }, this) }, void 0, false, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 201,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 187,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              Link,
              {
                to: `/${type}/${item.id}`,
                className: "w-full mt-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-300 text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center",
                children: [
                  /* @__PURE__ */ jsxDEV(Eye, { className: "mr-2 h-4 w-4" }, void 0, false, {
                    fileName: "/home/project/src/components/MovieCard.tsx",
                    lineNumber: 227,
                    columnNumber: 13
                  }, this),
                  "Ver Detalles"
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/MovieCard.tsx",
                lineNumber: 223,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/components/MovieCard.tsx",
            lineNumber: 131,
            columnNumber: 9
          }, this),
          inCart && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg", children: /* @__PURE__ */ jsxDEV(CheckCircle, { className: "h-4 w-4" }, void 0, false, {
            fileName: "/home/project/src/components/MovieCard.tsx",
            lineNumber: 235,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/home/project/src/components/MovieCard.tsx",
            lineNumber: 234,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/project/src/components/MovieCard.tsx",
        lineNumber: 84,
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
        fileName: "/home/project/src/components/MovieCard.tsx",
        lineNumber: 240,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/project/src/components/MovieCard.tsx",
    lineNumber: 83,
    columnNumber: 5
  }, this);
}
_s(MovieCard, "I7hTois4l8xJOIZ4EOlyykT6Gpw=", false, function() {
  return [useCart];
});
_c = MovieCard;
var _c;
$RefreshReg$(_c, "MovieCard");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/MovieCard.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/MovieCard.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBMEVRLFNBNkdRLFVBN0dSOzs7Ozs7Ozs7Ozs7Ozs7OztBQTFFUixPQUFPQSxXQUFXO0FBQ2xCLFNBQVNDLFlBQVk7QUFDckIsU0FBU0MsTUFBTUMsVUFBVUMsTUFBTUMsT0FBT0MsS0FBK0JDLG1CQUFtQjtBQUN4RixTQUFTQyxzQkFBc0I7QUFDL0IsU0FBU0MsZUFBZTtBQUN4QixTQUFTQyxhQUFhO0FBQ3RCLFNBQVNDLGdCQUFnQkMsbUJBQW1CO0FBUXJDLGdCQUFTQyxVQUFVLEVBQUVDLE1BQU1DLEtBQXFCLEdBQUc7QUFBQUMsS0FBQTtBQUN4RCxRQUFNLEVBQUVDLFNBQVNDLFlBQVlDLFNBQVMsSUFBSVYsUUFBUTtBQUNsRCxRQUFNLENBQUNXLFdBQVdDLFlBQVksSUFBSXJCLE1BQU1zQixTQUFTLEtBQUs7QUFDdEQsUUFBTSxDQUFDQyxjQUFjQyxlQUFlLElBQUl4QixNQUFNc0IsU0FBUyxFQUFFO0FBQ3pELFFBQU0sQ0FBQ0csV0FBV0MsWUFBWSxJQUFJMUIsTUFBTXNCLFNBQVMsS0FBSztBQUN0RCxRQUFNLENBQUNLLGdCQUFnQkMsaUJBQWlCLElBQUk1QixNQUFNc0IsU0FBUyxLQUFLO0FBRWhFLFFBQU1PLFFBQVEsV0FBV2YsT0FBT0EsS0FBS2UsUUFBUWYsS0FBS2dCO0FBQ2xELFFBQU1DLGNBQWMsa0JBQWtCakIsT0FBT0EsS0FBS2tCLGVBQWVsQixLQUFLbUI7QUFDdEUsUUFBTUMsT0FBT0gsY0FBYyxJQUFJSSxLQUFLSixXQUFXLEVBQUVLLFlBQVksSUFBSTtBQUNqRSxRQUFNQyxZQUFZdkIsS0FBS3dCLGNBQ25CLEdBQUczQixjQUFjLElBQUlDLFdBQVcsR0FBR0UsS0FBS3dCLFdBQVcsS0FDbkQ7QUFFSixRQUFNQyxTQUFTcEIsU0FBU0wsS0FBSzBCLEVBQUU7QUFFL0IsUUFBTUMsbUJBQW1CQSxDQUFDQyxNQUF3QjtBQUNoREEsTUFBRUMsZUFBZTtBQUNqQkQsTUFBRUUsZ0JBQWdCO0FBRWxCaEIsc0JBQWtCLElBQUk7QUFDdEJpQixlQUFXLE1BQU1qQixrQkFBa0IsS0FBSyxHQUFHLEdBQUk7QUFFL0MsVUFBTWtCLFdBQXFCO0FBQUEsTUFDekJOLElBQUkxQixLQUFLMEI7QUFBQUEsTUFDVFg7QUFBQUEsTUFDQVMsYUFBYXhCLEtBQUt3QjtBQUFBQSxNQUNsQnZCO0FBQUFBLE1BQ0FpQixjQUFjLGtCQUFrQmxCLE9BQU9BLEtBQUtrQixlQUFlZTtBQUFBQSxNQUMzRGQsZ0JBQWdCLG9CQUFvQm5CLE9BQU9BLEtBQUttQixpQkFBaUJjO0FBQUFBLE1BQ2pFQyxjQUFjbEMsS0FBS2tDO0FBQUFBLE1BQ25CQyxpQkFBaUJsQyxTQUFTLE9BQU8sQ0FBQyxDQUFDLElBQUlnQztBQUFBQSxNQUN2Q0csbUJBQW1CcEMsS0FBS29DO0FBQUFBLE1BQ3hCQyxXQUFXckMsS0FBS3FDO0FBQUFBLElBQ2xCO0FBRUEsUUFBSVosUUFBUTtBQUNWckIsaUJBQVdKLEtBQUswQixFQUFFO0FBQ2xCaEIsc0JBQWdCLElBQUlLLEtBQUssd0JBQXdCO0FBQUEsSUFDbkQsT0FBTztBQUNMWixjQUFRNkIsUUFBUTtBQUNoQnRCLHNCQUFnQixJQUFJSyxLQUFLLHVCQUF1QjtBQUFBLElBQ2xEO0FBRUFSLGlCQUFhLElBQUk7QUFDakJ3QixlQUFXLE1BQU14QixhQUFhLEtBQUssR0FBRyxHQUFJO0FBQUEsRUFDNUM7QUFFQSxTQUNFLG1DQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsc0dBQ1RJLFlBQ0ksNENBQ0EsaUJBQWlCO0FBQUEsUUFFdkIsY0FBYyxNQUFNQyxhQUFhLElBQUk7QUFBQSxRQUNyQyxjQUFjLE1BQU1BLGFBQWEsS0FBSztBQUFBLFFBR3RDO0FBQUEsaUNBQUMsU0FBSSxXQUFXLG9FQUNkRCxZQUFZLG9CQUFvQixvQkFBb0IsTUFEdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFRztBQUFBLFVBR0ZYLEtBQUtrQyxnQkFBZ0IsS0FDcEIsdUJBQUMsU0FBSSxXQUFVLDhKQUNiO0FBQUEsbUNBQUMsUUFBSyxXQUFVLDZCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF5QztBQUFBO0FBQUEsZUFEM0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBR0YsdUJBQUMsU0FBSSxXQUFVLDRCQUNiO0FBQUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxLQUFLWDtBQUFBQSxnQkFDTCxLQUFLUjtBQUFBQSxnQkFDTCxXQUFXLDJDQUNUSixZQUFZLGNBQWMsRUFBRTtBQUFBLGdCQUU5QixNQUFNO0FBQUE7QUFBQSxjQU5SO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU1hO0FBQUEsWUFJYix1QkFBQyxTQUFJLFdBQVcsZ0RBQ2RBLFlBQ0ksa0VBQ0EsWUFBWSxNQUhsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUlHO0FBQUEsWUFFSCx1QkFBQyxTQUFJLFdBQVcsdUpBQ2RBLFlBQVksZ0JBQWdCLEVBQUUsSUFFOUI7QUFBQSxxQ0FBQyxRQUFLLFdBQVUsNkNBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXlEO0FBQUEsY0FDekQsdUJBQUMsVUFBSyxXQUFVLGVBQWVYLGVBQUtrQyxlQUFlbEMsS0FBS2tDLGFBQWFJLFFBQVEsQ0FBQyxJQUFJLFNBQWxGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXdGO0FBQUEsaUJBSjFGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBS0E7QUFBQSxlQXRCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXVCQTtBQUFBLFVBRUEsdUJBQUMsU0FBSSxXQUFVLGdCQUViO0FBQUEsbUNBQUMsUUFBRyxXQUFXLDZFQUNiM0IsWUFDSSxrQkFDQSxlQUFlLElBRWxCSSxtQkFMSDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU1BO0FBQUEsWUFFQSx1QkFBQyxTQUFJLFdBQVcsNEVBQ2RKLFlBQVksa0JBQWtCLGVBQWUsSUFFN0M7QUFBQSxxQ0FBQyxZQUFTLFdBQVUsa0JBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWtDO0FBQUEsY0FDbEMsdUJBQUMsVUFBTVMsa0JBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBWTtBQUFBLGlCQUpkO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBS0E7QUFBQSxZQUVBLHVCQUFDLE9BQUUsV0FBVSwyQ0FDVnBCLGVBQUt1QyxZQUFZLGdDQURwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFHQ3RDLFNBQVMsUUFBUSx3QkFBd0JELFFBQVFBLEtBQUt3QyxxQkFBcUIsTUFDMUUsdUJBQUMsU0FBSSxXQUFVLHVHQUNiO0FBQUEscUNBQUMsU0FBSSxXQUFVLDBCQUNiO0FBQUEsdUNBQUMsU0FBSSxXQUFVLGdEQUNiLGlDQUFDLFVBQUssV0FBVSxnQ0FBK0Isa0JBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWlELEtBRG5EO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxnQkFDQSx1QkFBQyxVQUFLLFdBQVUsb0NBQW1DLDZCQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFnRTtBQUFBLG1CQUpsRTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUtBO0FBQUEsY0FDQSx1QkFBQyxTQUFJLFdBQVUsb0NBQ2I7QUFBQSx1Q0FBQyxPQUFFLFdBQVUscUJBQ1g7QUFBQSx5Q0FBQyxVQUFLLFdBQVUsc0JBQXFCLGtCQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUF1QztBQUFBLGtCQUN2Qyx1QkFBQyxZQUFReEM7QUFBQUEseUJBQUt3QztBQUFBQSxvQkFBbUI7QUFBQSx1QkFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBMkM7QUFBQSxxQkFGN0M7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFHQTtBQUFBLGdCQUNBLHVCQUFDLE9BQUUsV0FBVSxxQkFDWDtBQUFBLHlDQUFDLFVBQUssV0FBVSx1QkFBc0Isa0JBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQXdDO0FBQUEsa0JBQ3hDLHVCQUFDLFlBQU8sc0NBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBOEI7QUFBQSxxQkFGaEM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFHQTtBQUFBLG1CQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBU0E7QUFBQSxpQkFoQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFpQkE7QUFBQSxZQUlGLHVCQUFDLFNBQUksV0FBVSw0REFDYjtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFdBQVcsbURBQ1Q3QixZQUNJLCtDQUNBLGFBQWE7QUFBQSxnQkFFbkIsT0FBTyxFQUFFOEIsT0FBTyxHQUFJekMsS0FBS2tDLGVBQWUsS0FBTSxHQUFHLElBQUk7QUFBQTtBQUFBLGNBTnZEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU15RCxLQVAzRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVNBO0FBQUEsWUFHQTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFNBQVNQO0FBQUFBLGdCQUNULFVBQVVkO0FBQUFBLGdCQUNWLFdBQVcsMEdBQ1RZLFNBQ0kseURBQ0EsMERBQTBELElBQzVEWixpQkFBaUIsYUFBYSxvQkFBb0I7QUFBQSxnQkFHckRBO0FBQUFBLG9DQUNDLHVCQUFDLFNBQUksV0FBVSxnREFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUEyRDtBQUFBLGtCQUc3RCx1QkFBQyxTQUFJLFdBQVUsb0NBQ1pZLG1CQUNDLG1DQUNFO0FBQUEsMkNBQUMsU0FBTSxXQUFVLGtCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUErQjtBQUFBLG9CQUMvQix1QkFBQyxVQUFLLDZCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQW1CO0FBQUEsb0JBQ25CLHVCQUFDLGVBQVksV0FBVSxpQ0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFBb0Q7QUFBQSx1QkFIdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFJQSxJQUNFWixpQkFDRixtQ0FDRTtBQUFBLDJDQUFDLFNBQUksV0FBVSxvRUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUFnRjtBQUFBLG9CQUNoRix1QkFBQyxVQUFLLDRCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQWtCO0FBQUEsdUJBRnBCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBR0EsSUFFQSxtQ0FDRTtBQUFBLDJDQUFDLFFBQUssV0FBVSxrQkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFBOEI7QUFBQSxvQkFDOUIsdUJBQUMsVUFBSyxrQ0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUF3QjtBQUFBLHVCQUYxQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUdBLEtBaEJKO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBa0JBO0FBQUE7QUFBQTtBQUFBLGNBaENGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQWlDQTtBQUFBLFlBR0E7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxJQUFJLElBQUlaLElBQUksSUFBSUQsS0FBSzBCLEVBQUU7QUFBQSxnQkFDdkIsV0FBVTtBQUFBLGdCQUVWO0FBQUEseUNBQUMsT0FBSSxXQUFVLGtCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQTZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FKL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTUE7QUFBQSxlQWxHRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQW1HQTtBQUFBLFVBR0NELFVBQ0MsdUJBQUMsU0FBSSxXQUFVLDZFQUNiLGlDQUFDLGVBQVksV0FBVSxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFnQyxLQURsQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUE7QUFBQTtBQUFBLE1BeEpKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQTBKQTtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVNoQjtBQUFBQSxRQUNULE1BQU1nQixTQUFTLFlBQVk7QUFBQSxRQUMzQixXQUFXbkI7QUFBQUEsUUFDWCxTQUFTLE1BQU1DLGFBQWEsS0FBSztBQUFBO0FBQUEsTUFKbkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBSXFDO0FBQUEsT0FqS3ZDO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FtS0E7QUFFSjtBQUFDTCxHQXROZUgsV0FBUztBQUFBLFVBQ21CSixPQUFPO0FBQUE7QUFBQStDLEtBRG5DM0M7QUFBUyxJQUFBMkM7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwiTGluayIsIlN0YXIiLCJDYWxlbmRhciIsIlBsdXMiLCJDaGVjayIsIkV5ZSIsIkNoZWNrQ2lyY2xlIiwiT3B0aW1pemVkSW1hZ2UiLCJ1c2VDYXJ0IiwiVG9hc3QiLCJJTUFHRV9CQVNFX1VSTCIsIlBPU1RFUl9TSVpFIiwiTW92aWVDYXJkIiwiaXRlbSIsInR5cGUiLCJfcyIsImFkZEl0ZW0iLCJyZW1vdmVJdGVtIiwiaXNJbkNhcnQiLCJzaG93VG9hc3QiLCJzZXRTaG93VG9hc3QiLCJ1c2VTdGF0ZSIsInRvYXN0TWVzc2FnZSIsInNldFRvYXN0TWVzc2FnZSIsImlzSG92ZXJlZCIsInNldElzSG92ZXJlZCIsImlzQWRkaW5nVG9DYXJ0Iiwic2V0SXNBZGRpbmdUb0NhcnQiLCJ0aXRsZSIsIm5hbWUiLCJyZWxlYXNlRGF0ZSIsInJlbGVhc2VfZGF0ZSIsImZpcnN0X2Fpcl9kYXRlIiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInBvc3RlclVybCIsInBvc3Rlcl9wYXRoIiwiaW5DYXJ0IiwiaWQiLCJoYW5kbGVDYXJ0QWN0aW9uIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwic2V0VGltZW91dCIsImNhcnRJdGVtIiwidW5kZWZpbmVkIiwidm90ZV9hdmVyYWdlIiwic2VsZWN0ZWRTZWFzb25zIiwib3JpZ2luYWxfbGFuZ3VhZ2UiLCJnZW5yZV9pZHMiLCJ0b0ZpeGVkIiwib3ZlcnZpZXciLCJudW1iZXJfb2ZfZXBpc29kZXMiLCJ3aWR0aCIsIl9jIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIk1vdmllQ2FyZC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IFN0YXIsIENhbGVuZGFyLCBQbHVzLCBDaGVjaywgRXllLCBTaG9wcGluZ0NhcnQsIFBsYXksIEluZm8sIENoZWNrQ2lyY2xlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IE9wdGltaXplZEltYWdlIH0gZnJvbSAnLi9PcHRpbWl6ZWRJbWFnZSc7XG5pbXBvcnQgeyB1c2VDYXJ0IH0gZnJvbSAnLi4vY29udGV4dC9DYXJ0Q29udGV4dCc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vVG9hc3QnO1xuaW1wb3J0IHsgSU1BR0VfQkFTRV9VUkwsIFBPU1RFUl9TSVpFIH0gZnJvbSAnLi4vY29uZmlnL2FwaSc7XG5pbXBvcnQgdHlwZSB7IE1vdmllLCBUVlNob3csIENhcnRJdGVtIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG5pbnRlcmZhY2UgTW92aWVDYXJkUHJvcHMge1xuICBpdGVtOiBNb3ZpZSB8IFRWU2hvdztcbiAgdHlwZTogJ21vdmllJyB8ICd0dic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNb3ZpZUNhcmQoeyBpdGVtLCB0eXBlIH06IE1vdmllQ2FyZFByb3BzKSB7XG4gIGNvbnN0IHsgYWRkSXRlbSwgcmVtb3ZlSXRlbSwgaXNJbkNhcnQgfSA9IHVzZUNhcnQoKTtcbiAgY29uc3QgW3Nob3dUb2FzdCwgc2V0U2hvd1RvYXN0XSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3RvYXN0TWVzc2FnZSwgc2V0VG9hc3RNZXNzYWdlXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2lzSG92ZXJlZCwgc2V0SXNIb3ZlcmVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzQWRkaW5nVG9DYXJ0LCBzZXRJc0FkZGluZ1RvQ2FydF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIFxuICBjb25zdCB0aXRsZSA9ICd0aXRsZScgaW4gaXRlbSA/IGl0ZW0udGl0bGUgOiBpdGVtLm5hbWU7XG4gIGNvbnN0IHJlbGVhc2VEYXRlID0gJ3JlbGVhc2VfZGF0ZScgaW4gaXRlbSA/IGl0ZW0ucmVsZWFzZV9kYXRlIDogaXRlbS5maXJzdF9haXJfZGF0ZTtcbiAgY29uc3QgeWVhciA9IHJlbGVhc2VEYXRlID8gbmV3IERhdGUocmVsZWFzZURhdGUpLmdldEZ1bGxZZWFyKCkgOiAnTi9BJztcbiAgY29uc3QgcG9zdGVyVXJsID0gaXRlbS5wb3N0ZXJfcGF0aCBcbiAgICA/IGAke0lNQUdFX0JBU0VfVVJMfS8ke1BPU1RFUl9TSVpFfSR7aXRlbS5wb3N0ZXJfcGF0aH1gXG4gICAgOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0NDA0MDQ2NTMzMjUtYWIxMjdkNDlhYmMxP3c9NTAwJmg9NzUwJmZpdD1jcm9wJmNyb3A9Y2VudGVyJztcblxuICBjb25zdCBpbkNhcnQgPSBpc0luQ2FydChpdGVtLmlkKTtcblxuICBjb25zdCBoYW5kbGVDYXJ0QWN0aW9uID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBcbiAgICBzZXRJc0FkZGluZ1RvQ2FydCh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldElzQWRkaW5nVG9DYXJ0KGZhbHNlKSwgMTAwMCk7XG5cbiAgICBjb25zdCBjYXJ0SXRlbTogQ2FydEl0ZW0gPSB7XG4gICAgICBpZDogaXRlbS5pZCxcbiAgICAgIHRpdGxlLFxuICAgICAgcG9zdGVyX3BhdGg6IGl0ZW0ucG9zdGVyX3BhdGgsXG4gICAgICB0eXBlLFxuICAgICAgcmVsZWFzZV9kYXRlOiAncmVsZWFzZV9kYXRlJyBpbiBpdGVtID8gaXRlbS5yZWxlYXNlX2RhdGUgOiB1bmRlZmluZWQsXG4gICAgICBmaXJzdF9haXJfZGF0ZTogJ2ZpcnN0X2Fpcl9kYXRlJyBpbiBpdGVtID8gaXRlbS5maXJzdF9haXJfZGF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIHZvdGVfYXZlcmFnZTogaXRlbS52b3RlX2F2ZXJhZ2UsXG4gICAgICBzZWxlY3RlZFNlYXNvbnM6IHR5cGUgPT09ICd0dicgPyBbMV0gOiB1bmRlZmluZWQsXG4gICAgICBvcmlnaW5hbF9sYW5ndWFnZTogaXRlbS5vcmlnaW5hbF9sYW5ndWFnZSxcbiAgICAgIGdlbnJlX2lkczogaXRlbS5nZW5yZV9pZHMsXG4gICAgfTtcblxuICAgIGlmIChpbkNhcnQpIHtcbiAgICAgIHJlbW92ZUl0ZW0oaXRlbS5pZCk7XG4gICAgICBzZXRUb2FzdE1lc3NhZ2UoYFwiJHt0aXRsZX1cIiByZXRpcmFkbyBkZWwgY2Fycml0b2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRJdGVtKGNhcnRJdGVtKTtcbiAgICAgIHNldFRvYXN0TWVzc2FnZShgXCIke3RpdGxlfVwiIGFncmVnYWRvIGFsIGNhcnJpdG9gKTtcbiAgICB9XG4gICAgXG4gICAgc2V0U2hvd1RvYXN0KHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2hvd1RvYXN0KGZhbHNlKSwgMzAwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBcbiAgICAgICAgY2xhc3NOYW1lPXtgZ3JvdXAgcmVsYXRpdmUgYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gb3ZlcmZsb3ctaGlkZGVuIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCB0cmFuc2Zvcm0gJHtcbiAgICAgICAgICBpc0hvdmVyZWQgXG4gICAgICAgICAgICA/ICdzaGFkb3ctbWQgc2NhbGUtWzEuMDFdIC10cmFuc2xhdGUteS0wLjUnIFxuICAgICAgICAgICAgOiAnaG92ZXI6c2hhZG93LW1kJ1xuICAgICAgICB9YH1cbiAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRJc0hvdmVyZWQodHJ1ZSl9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SXNIb3ZlcmVkKGZhbHNlKX1cbiAgICAgID5cbiAgICAgICAgey8qIFN1YnRsZSBib3JkZXIgZWZmZWN0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgcm91bmRlZC14bCBib3JkZXItMiB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgJHtcbiAgICAgICAgICBpc0hvdmVyZWQgPyAnYm9yZGVyLWJsdWUtMjAwJyA6ICdib3JkZXItdHJhbnNwYXJlbnQnXG4gICAgICAgIH1gfSAvPlxuICAgICAgICBcbiAgICAgICAgey8qIFByZW1pdW0gYmFkZ2UgZm9yIGhpZ2gtcmF0ZWQgY29udGVudCAqL31cbiAgICAgICAge2l0ZW0udm90ZV9hdmVyYWdlID49IDguMCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyBsZWZ0LTMgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTQwMCB0by1vcmFuZ2UtNTAwIHRleHQtd2hpdGUgcHgtMiBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIHotMjAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICA8U3RhciBjbGFzc05hbWU9XCJoLTMgdy0zIG1yLTEgZmlsbC13aGl0ZVwiIC8+XG4gICAgICAgICAgICBUT1BcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIDxPcHRpbWl6ZWRJbWFnZVxuICAgICAgICAgICAgc3JjPXtwb3N0ZXJVcmx9XG4gICAgICAgICAgICBhbHQ9e3RpdGxlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGgtODAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7XG4gICAgICAgICAgICAgIGlzSG92ZXJlZCA/ICdzY2FsZS0xMDInIDogJydcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgbGF6eT17dHJ1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBWZXJ5IHN1YnRsZSBvdmVybGF5IG9uIGhvdmVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgJHtcbiAgICAgICAgICAgIGlzSG92ZXJlZCBcbiAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tdCBmcm9tLWJsYWNrLzEwIHZpYS10cmFuc3BhcmVudCB0by10cmFuc3BhcmVudCcgXG4gICAgICAgICAgICAgIDogJ2JnLWJsYWNrLzAnXG4gICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMyByaWdodC0zIGJnLWJsYWNrLzYwIGJhY2tkcm9wLWJsdXItc20gdGV4dC13aGl0ZSBweC0yIHB5LTEgcm91bmRlZC1sZyB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgJHtcbiAgICAgICAgICAgIGlzSG92ZXJlZCA/ICdiZy1ibGFjay83MCcgOiAnJ1xuICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgIDxTdGFyIGNsYXNzTmFtZT1cImgtMyB3LTMgZmlsbC15ZWxsb3ctNDAwIHRleHQteWVsbG93LTQwMFwiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPntpdGVtLnZvdGVfYXZlcmFnZSA/IGl0ZW0udm90ZV9hdmVyYWdlLnRvRml4ZWQoMSkgOiAnTi9BJ308L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcmVsYXRpdmVcIj5cbiAgICAgICAgICB7LyogU21vb3RoIHRpdGxlIHdpdGggdmVyeSBzdWJ0bGUgZWZmZWN0ICovfVxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2Bmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgbWItMiBsaW5lLWNsYW1wLTIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7XG4gICAgICAgICAgICBpc0hvdmVyZWQgXG4gICAgICAgICAgICAgID8gJ3RleHQtYmx1ZS03MDAnIFxuICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktOTAwJ1xuICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1ncmF5LTUwMCB0ZXh0LXNtIG1iLTMgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7XG4gICAgICAgICAgICBpc0hvdmVyZWQgPyAndGV4dC1ibHVlLTUwMCcgOiAndGV4dC1ncmF5LTUwMCdcbiAgICAgICAgICB9YH0+XG4gICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiaC00IHctNCBtci0yXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPnt5ZWFyfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQtc20gbGluZS1jbGFtcC0yIG1iLTRcIj5cbiAgICAgICAgICAgIHtpdGVtLm92ZXJ2aWV3IHx8ICdTaW4gZGVzY3JpcGNpw7NuIGRpc3BvbmlibGUnfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogRXBpc29kZSBjb3VudCBpbmZvcm1hdGlvbiBmb3IgVFYgc2hvd3Mgd2l0aCA1MCsgZXBpc29kZXMgKi99XG4gICAgICAgICAge3R5cGUgPT09ICd0dicgJiYgJ251bWJlcl9vZl9lcGlzb2RlcycgaW4gaXRlbSAmJiBpdGVtLm51bWJlcl9vZl9lcGlzb2RlcyA+IDUwICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNCBwLTMgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTUwIHRvLW9yYW5nZS01MCByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1hbWJlci0yMDAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYW1iZXItNTAwIHAtMS41IHJvdW5kZWQtbGcgbXItMiBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC14cyBmb250LWJvbGRcIj7wn5OKPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtYW1iZXItODAwXCI+U2VyaWUgRXh0ZW5zYTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQteHMgdGV4dC1hbWJlci03MDBcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibHVlLTYwMCBtci0xXCI+8J+Tujwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzdHJvbmc+e2l0ZW0ubnVtYmVyX29mX2VwaXNvZGVzfSBlcGlzb2Rpb3M8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNjAwIG1yLTFcIj7wn5KwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz4kMzAwIENVUCBwb3IgdGVtcG9yYWRhPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFZlcnkgc3VidGxlIHByb2dyZXNzIGJhciBmb3IgcmF0aW5nICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWdyYXktMjAwIHJvdW5kZWQtZnVsbCBoLTEgbWItNCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtZnVsbCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgICAgICAgaXNIb3ZlcmVkIFxuICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNDAwIHRvLWJsdWUtNTAwJyBcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYXktNDAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAkeyhpdGVtLnZvdGVfYXZlcmFnZSAvIDEwKSAqIDEwMH0lYCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBQcmltYXJ5IEFkZCB0byBDYXJ0IEJ1dHRvbiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDYXJ0QWN0aW9ufVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQWRkaW5nVG9DYXJ0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB4LTQgcHktMyByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCB0cmFuc2Zvcm0gcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuICR7XG4gICAgICAgICAgICAgIGluQ2FydFxuICAgICAgICAgICAgICAgID8gJ2JnLWdyZWVuLTUwMCBob3ZlcjpiZy1ncmVlbi02MDAgdGV4dC13aGl0ZSBzaGFkb3ctc20nXG4gICAgICAgICAgICAgICAgOiAnYmctYmx1ZS01MDAgaG92ZXI6YmctYmx1ZS02MDAgdGV4dC13aGl0ZSBob3ZlcjpzaGFkb3ctbWQnXG4gICAgICAgICAgICB9ICR7aXNBZGRpbmdUb0NhcnQgPyAnc2NhbGUtOTUnIDogJ2hvdmVyOnNjYWxlLVsxLjAxXSd9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7LyogU3VidGxlIGxvYWRpbmcgZWZmZWN0ICovfVxuICAgICAgICAgICAge2lzQWRkaW5nVG9DYXJ0ICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLXdoaXRlLzIwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICB7aW5DYXJ0ID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwibXItMiBoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkVuIGVsIENhcnJpdG88L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUgY2xhc3NOYW1lPVwibWwtMiBoLTQgdy00IHRleHQtZ3JlZW4tMzAwXCIgLz5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKSA6IGlzQWRkaW5nVG9DYXJ0ID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuaW1hdGUtc3BpbiByb3VuZGVkLWZ1bGwgaC00IHctNCBib3JkZXItYi0yIGJvcmRlci13aGl0ZSBtci0yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5BZ3JlZ2FuZG8uLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cIm1yLTIgaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5BZ3JlZ2FyIGFsIENhcnJpdG88L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBWaWV3IERldGFpbHMgTGluayAqL31cbiAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgdG89e2AvJHt0eXBlfS8ke2l0ZW0uaWR9YH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtdC0yIHB4LTQgcHktMiByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS02MDAgaG92ZXI6Ym9yZGVyLWJsdWUtMzAwIGhvdmVyOmJnLWJsdWUtNTAgaG92ZXI6dGV4dC1ibHVlLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJtci0yIGgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgVmVyIERldGFsbGVzXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBWZXJ5IHN1YnRsZSBzZWxlY3Rpb24gaW5kaWNhdG9yICovfVxuICAgICAgICB7aW5DYXJ0ICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTIgYmctZ3JlZW4tNTAwIHRleHQtd2hpdGUgcC0xIHJvdW5kZWQtZnVsbCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgIDxDaGVja0NpcmNsZSBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8VG9hc3RcbiAgICAgICAgbWVzc2FnZT17dG9hc3RNZXNzYWdlfVxuICAgICAgICB0eXBlPXtpbkNhcnQgPyBcInN1Y2Nlc3NcIiA6IFwic3VjY2Vzc1wifVxuICAgICAgICBpc1Zpc2libGU9e3Nob3dUb2FzdH1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2hvd1RvYXN0KGZhbHNlKX1cbiAgICAgIC8+XG4gICAgPC8+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9jb21wb25lbnRzL01vdmllQ2FyZC50c3gifQ==