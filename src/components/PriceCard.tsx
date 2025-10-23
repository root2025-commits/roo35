import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/PriceCard.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/PriceCard.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import { DollarSign, CreditCard } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useCart } from "/src/context/CartContext.tsx";
export function PriceCard({ type, selectedSeasons = [], episodeCount = 0, isAnime = false }) {
  _s();
  const { getCurrentPrices } = useCart();
  const currentPrices = getCurrentPrices();
  const moviePrice = currentPrices.moviePrice;
  const seriesPrice = currentPrices.seriesPrice;
  const transferFeePercentage = currentPrices.transferFeePercentage;
  const isExtendedSeries = type === "tv" && episodeCount > 50;
  const calculatePrice = () => {
    if (type === "movie") {
      return moviePrice;
    } else {
      return selectedSeasons.length * seriesPrice;
    }
  };
  const price = calculatePrice();
  const transferPrice = Math.round(price * (1 + transferFeePercentage / 100));
  const getIcon = () => {
    if (type === "movie") {
      return isAnime ? "🎌" : "🎬";
    }
    return isAnime ? "🎌" : "📺";
  };
  const getTypeLabel = () => {
    if (type === "movie") {
      return isAnime ? "Película Animada" : "Película";
    }
    return isAnime ? "Anime" : "Serie";
  };
  return /* @__PURE__ */ jsxDEV("div", { className: `rounded-2xl p-6 border-2 shadow-xl transform hover:scale-105 transition-all duration-300 ${isExtendedSeries ? "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-300" : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-300"}`, children: [
    isExtendedSeries && /* @__PURE__ */ jsxDEV("div", { className: "mb-4 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border-2 border-amber-300 shadow-lg", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV("span", { className: "text-white text-sm font-bold", children: "📊" }, void 0, false, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 79,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-amber-900", children: "Serie con Episodios Extendidos" }, void 0, false, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 82,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-amber-700", children: [
            episodeCount,
            " episodios totales"
          ] }, void 0, true, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 83,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 81,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 77,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-white/80 rounded-lg p-3 border border-amber-200", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-amber-800", children: "Política de Precios" }, void 0, false, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 89,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-amber-700", children: "$300 CUP por temporada" }, void 0, false, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 90,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 88,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-green-800", children: "Sin Recargos" }, void 0, false, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 93,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-green-700", children: "Precio fijo garantizado" }, void 0, false, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 94,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 92,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 87,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 86,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/PriceCard.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-xl mr-4 shadow-lg ${isExtendedSeries ? "bg-gradient-to-r from-amber-400 to-orange-400" : "bg-gradient-to-r from-green-400 to-emerald-400"}`, children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl", children: getIcon() }, void 0, false, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 108,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 103,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: `font-black text-lg ${isExtendedSeries ? "text-amber-800" : "text-green-800"}`, children: getTypeLabel() }, void 0, false, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: `text-sm font-semibold ${isExtendedSeries ? "text-amber-600" : "text-green-600"}`, children: type === "tv" && selectedSeasons.length > 0 ? `${selectedSeasons.length} temporada${selectedSeasons.length > 1 ? "s" : ""}` : "Contenido completo" }, void 0, false, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 114,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 110,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 102,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `text-white p-3 rounded-full shadow-lg animate-pulse ${isExtendedSeries ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-green-500 to-emerald-500"}`, children: /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-4 w-4" }, void 0, false, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 129,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/PriceCard.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `rounded-xl p-4 border-2 shadow-md hover:shadow-lg transition-all duration-300 ${isExtendedSeries ? "bg-gradient-to-r from-white to-amber-50 border-amber-200" : "bg-gradient-to-r from-white to-green-50 border-green-200"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: `text-sm font-bold flex items-center ${isExtendedSeries ? "text-amber-700" : "text-green-700"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: `p-1 rounded-lg mr-2 ${isExtendedSeries ? "bg-amber-100" : "bg-green-100"}`, children: /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/home/project/src/components/PriceCard.tsx",
              lineNumber: 147,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/home/project/src/components/PriceCard.tsx",
              lineNumber: 144,
              columnNumber: 15
            }, this),
            "Efectivo"
          ] }, void 0, true, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 141,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `text-xl font-black ${isExtendedSeries ? "text-amber-700" : "text-green-700"}`, children: [
            "$",
            price.toLocaleString(),
            " CUP"
          ] }, void 0, true, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 140,
          columnNumber: 11
        }, this),
        isExtendedSeries && /* @__PURE__ */ jsxDEV("div", { className: "mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-center font-medium", children: "Serie extensa: Precio estándar aplicado" }, void 0, false, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 158,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `rounded-xl p-4 border-2 shadow-md hover:shadow-lg transition-all duration-300 ${isExtendedSeries ? "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200" : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-orange-700 flex items-center", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-orange-100 p-1 rounded-lg mr-2", children: /* @__PURE__ */ jsxDEV(CreditCard, { className: "h-4 w-4" }, void 0, false, {
              fileName: "/home/project/src/components/PriceCard.tsx",
              lineNumber: 173,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/home/project/src/components/PriceCard.tsx",
              lineNumber: 172,
              columnNumber: 15
            }, this),
            "Transferencia"
          ] }, void 0, true, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 171,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black text-orange-700", children: [
            "$",
            transferPrice.toLocaleString(),
            " CUP"
          ] }, void 0, true, {
            fileName: "/home/project/src/components/PriceCard.tsx",
            lineNumber: 177,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 170,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-orange-600 font-semibold bg-orange-100 px-2 py-1 rounded-full text-center", children: [
          "+",
          transferFeePercentage,
          "% recargo bancario"
        ] }, void 0, true, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 181,
          columnNumber: 11
        }, this),
        isExtendedSeries && /* @__PURE__ */ jsxDEV("div", { className: "mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full text-center font-medium", children: "Recargo estándar: Sin costos adicionales por episodios" }, void 0, false, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 185,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 165,
        columnNumber: 9
      }, this),
      type === "tv" && selectedSeasons.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: `text-sm font-bold text-center rounded-xl p-3 border ${isExtendedSeries ? "text-amber-600 bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200" : "text-green-600 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200"}`, children: [
        "$",
        (price / selectedSeasons.length).toLocaleString(),
        " CUP por temporada (efectivo)",
        isExtendedSeries && /* @__PURE__ */ jsxDEV("div", { className: "mt-1 text-xs text-amber-500", children: "⭐ Precio especial para series extensas" }, void 0, false, {
          fileName: "/home/project/src/components/PriceCard.tsx",
          lineNumber: 199,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/PriceCard.tsx",
        lineNumber: 192,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/PriceCard.tsx",
      lineNumber: 133,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/PriceCard.tsx",
    lineNumber: 69,
    columnNumber: 5
  }, this);
}
_s(PriceCard, "GNRnSkU9M9GLgj6jNysA8ewhGcU=", false, function() {
  return [useCart];
});
_c = PriceCard;
var _c;
$RefreshReg$(_c, "PriceCard");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/PriceCard.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/PriceCard.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBMkRjOzs7Ozs7Ozs7Ozs7Ozs7OztBQTFEZCxTQUFTQSxZQUE0QkMsa0JBQWtCO0FBQ3ZELFNBQVNDLGVBQWU7QUFTakIsZ0JBQVNDLFVBQVUsRUFBRUMsTUFBTUMsa0JBQWtCLElBQUlDLGVBQWUsR0FBR0MsVUFBVSxNQUFzQixHQUFHO0FBQUFDLEtBQUE7QUFDM0csUUFBTSxFQUFFQyxpQkFBaUIsSUFBSVAsUUFBUTtBQUNyQyxRQUFNUSxnQkFBZ0JELGlCQUFpQjtBQUV2QyxRQUFNRSxhQUFhRCxjQUFjQztBQUNqQyxRQUFNQyxjQUFjRixjQUFjRTtBQUNsQyxRQUFNQyx3QkFBd0JILGNBQWNHO0FBRzVDLFFBQU1DLG1CQUFtQlYsU0FBUyxRQUFRRSxlQUFlO0FBRXpELFFBQU1TLGlCQUFpQkEsTUFBTTtBQUMzQixRQUFJWCxTQUFTLFNBQVM7QUFDcEIsYUFBT087QUFBQUEsSUFDVCxPQUFPO0FBRUwsYUFBT04sZ0JBQWdCVyxTQUFTSjtBQUFBQSxJQUNsQztBQUFBLEVBQ0Y7QUFFQSxRQUFNSyxRQUFRRixlQUFlO0FBQzdCLFFBQU1HLGdCQUFnQkMsS0FBS0MsTUFBTUgsU0FBUyxJQUFJSix3QkFBd0IsSUFBSTtBQUUxRSxRQUFNUSxVQUFVQSxNQUFNO0FBQ3BCLFFBQUlqQixTQUFTLFNBQVM7QUFDcEIsYUFBT0csVUFBVSxPQUFPO0FBQUEsSUFDMUI7QUFDQSxXQUFPQSxVQUFVLE9BQU87QUFBQSxFQUMxQjtBQUVBLFFBQU1lLGVBQWVBLE1BQU07QUFDekIsUUFBSWxCLFNBQVMsU0FBUztBQUNwQixhQUFPRyxVQUFVLHFCQUFxQjtBQUFBLElBQ3hDO0FBQ0EsV0FBT0EsVUFBVSxVQUFVO0FBQUEsRUFDN0I7QUFFQSxTQUNFLHVCQUFDLFNBQUksV0FBVyw0RkFDZE8sbUJBQ0ksZ0ZBQ0EsNEVBQTRFLElBRy9FQTtBQUFBQSx3QkFDQyx1QkFBQyxTQUFJLFdBQVUseUdBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsK0VBQ2IsaUNBQUMsVUFBSyxXQUFVLGdDQUErQixrQkFBL0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFpRCxLQURuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLFNBQ0M7QUFBQSxpQ0FBQyxRQUFHLFdBQVUsb0NBQW1DLDhDQUFqRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUErRTtBQUFBLFVBQy9FLHVCQUFDLE9BQUUsV0FBVSwwQkFBMEJSO0FBQUFBO0FBQUFBLFlBQWE7QUFBQSxlQUFwRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFzRTtBQUFBLGFBRnhFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQTtBQUFBLFdBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVFBO0FBQUEsTUFDQSx1QkFBQyxTQUFJLFdBQVUsc0RBQ2IsaUNBQUMsU0FBSSxXQUFVLGtDQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQSxpQ0FBQyxPQUFFLFdBQVUsNEJBQTJCLG1DQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEyRDtBQUFBLFVBQzNELHVCQUFDLE9BQUUsV0FBVSxrQkFBaUIsc0NBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQW9EO0FBQUEsYUFGdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUsZUFDYjtBQUFBLGlDQUFDLE9BQUUsV0FBVSw0QkFBMkIsNEJBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQW9EO0FBQUEsVUFDcEQsdUJBQUMsT0FBRSxXQUFVLGtCQUFpQix1Q0FBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBcUQ7QUFBQSxhQUZ2RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBR0E7QUFBQSxXQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFTQSxLQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFXQTtBQUFBLFNBckJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FzQkE7QUFBQSxJQUdGLHVCQUFDLFNBQUksV0FBVSwwQ0FDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSxxQkFDYjtBQUFBLCtCQUFDLFNBQUksV0FBVyxpQ0FDZFEsbUJBQ0ksa0RBQ0EsZ0RBQWdELElBRXBELGlDQUFDLFVBQUssV0FBVSxZQUFZTyxrQkFBUSxLQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXNDLEtBTHhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFNQTtBQUFBLFFBQ0EsdUJBQUMsU0FDQztBQUFBLGlDQUFDLFFBQUcsV0FBVyxzQkFDYlAsbUJBQW1CLG1CQUFtQixnQkFBZ0IsSUFDbkRRLHVCQUFhLEtBRmxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRW9CO0FBQUEsVUFDcEIsdUJBQUMsT0FBRSxXQUFXLHlCQUNaUixtQkFBbUIsbUJBQW1CLGdCQUFnQixJQUVyRFYsbUJBQVMsUUFBUUMsZ0JBQWdCVyxTQUFTLElBQ3ZDLEdBQUdYLGdCQUFnQlcsTUFBTSxhQUFhWCxnQkFBZ0JXLFNBQVMsSUFBSSxNQUFNLEVBQUUsS0FDM0Usd0JBTE47QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFPQTtBQUFBLGFBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVlBO0FBQUEsV0FwQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXFCQTtBQUFBLE1BQ0EsdUJBQUMsU0FBSSxXQUFXLHVEQUNkRixtQkFDSSxrREFDQSxnREFBZ0QsSUFFcEQsaUNBQUMsY0FBVyxXQUFVLGFBQXRCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBK0IsS0FMakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQU1BO0FBQUEsU0E3QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQThCQTtBQUFBLElBRUEsdUJBQUMsU0FBSSxXQUFVLGFBRWI7QUFBQSw2QkFBQyxTQUFJLFdBQVcsaUZBQ2RBLG1CQUNJLDZEQUNBLDBEQUEwRCxJQUU5RDtBQUFBLCtCQUFDLFNBQUksV0FBVSwwQ0FDYjtBQUFBLGlDQUFDLFVBQUssV0FBVyx1Q0FDZkEsbUJBQW1CLG1CQUFtQixnQkFBZ0IsSUFFdEQ7QUFBQSxtQ0FBQyxTQUFJLFdBQVcsdUJBQ2RBLG1CQUFtQixpQkFBaUIsY0FBYyxJQUVsRCxpQ0FBQyxjQUFXLFdBQVUsYUFBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBK0IsS0FIakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFJQTtBQUFBLFlBQUs7QUFBQSxlQVBQO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBU0E7QUFBQSxVQUNBLHVCQUFDLFVBQUssV0FBVyxzQkFDZkEsbUJBQW1CLG1CQUFtQixnQkFBZ0IsSUFDckQ7QUFBQTtBQUFBLFlBQ0NHLE1BQU1NLGVBQWU7QUFBQSxZQUFFO0FBQUEsZUFIM0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFJQTtBQUFBLGFBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWdCQTtBQUFBLFFBQ0NULG9CQUNDLHVCQUFDLFNBQUksV0FBVSwwRkFBd0YsdURBQXZHO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFdBekJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUEyQkE7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVyxpRkFDZEEsbUJBQ0ksZ0VBQ0EsNkRBQTZELElBRWpFO0FBQUEsK0JBQUMsU0FBSSxXQUFVLDBDQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLHVEQUNkO0FBQUEsbUNBQUMsU0FBSSxXQUFVLHFDQUNiLGlDQUFDLGNBQVcsV0FBVSxhQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUErQixLQURqQztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFBSztBQUFBLGVBSFA7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFLQTtBQUFBLFVBQ0EsdUJBQUMsVUFBSyxXQUFVLHNDQUFvQztBQUFBO0FBQUEsWUFDaERJLGNBQWNLLGVBQWU7QUFBQSxZQUFFO0FBQUEsZUFEbkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVVBO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUsMEZBQXdGO0FBQUE7QUFBQSxVQUNuR1Y7QUFBQUEsVUFBc0I7QUFBQSxhQUQxQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNDQyxvQkFDQyx1QkFBQyxTQUFJLFdBQVUsNEZBQTBGLHNFQUF6RztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQXRCSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBd0JBO0FBQUEsTUFFQ1YsU0FBUyxRQUFRQyxnQkFBZ0JXLFNBQVMsS0FDekMsdUJBQUMsU0FBSSxXQUFXLHVEQUNkRixtQkFDSSxrRkFDQSxnRkFBZ0YsSUFDbkY7QUFBQTtBQUFBLFNBQ0VHLFFBQVFaLGdCQUFnQlcsUUFBUU8sZUFBZTtBQUFBLFFBQUU7QUFBQSxRQUNuRFQsb0JBQ0MsdUJBQUMsU0FBSSxXQUFVLCtCQUE2QixzREFBNUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsV0FUSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBV0E7QUFBQSxTQXRFSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBd0VBO0FBQUEsT0F4SUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXlJQTtBQUVKO0FBQUNOLEdBakxlTCxXQUFTO0FBQUEsVUFDTUQsT0FBTztBQUFBO0FBQUFzQixLQUR0QnJCO0FBQVMsSUFBQXFCO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJEb2xsYXJTaWduIiwiQ3JlZGl0Q2FyZCIsInVzZUNhcnQiLCJQcmljZUNhcmQiLCJ0eXBlIiwic2VsZWN0ZWRTZWFzb25zIiwiZXBpc29kZUNvdW50IiwiaXNBbmltZSIsIl9zIiwiZ2V0Q3VycmVudFByaWNlcyIsImN1cnJlbnRQcmljZXMiLCJtb3ZpZVByaWNlIiwic2VyaWVzUHJpY2UiLCJ0cmFuc2ZlckZlZVBlcmNlbnRhZ2UiLCJpc0V4dGVuZGVkU2VyaWVzIiwiY2FsY3VsYXRlUHJpY2UiLCJsZW5ndGgiLCJwcmljZSIsInRyYW5zZmVyUHJpY2UiLCJNYXRoIiwicm91bmQiLCJnZXRJY29uIiwiZ2V0VHlwZUxhYmVsIiwidG9Mb2NhbGVTdHJpbmciLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJQcmljZUNhcmQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBEb2xsYXJTaWduLCBUdiwgRmlsbSwgU3RhciwgQ3JlZGl0Q2FyZCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VDYXJ0IH0gZnJvbSAnLi4vY29udGV4dC9DYXJ0Q29udGV4dCc7XG5cbmludGVyZmFjZSBQcmljZUNhcmRQcm9wcyB7XG4gIHR5cGU6ICdtb3ZpZScgfCAndHYnO1xuICBzZWxlY3RlZFNlYXNvbnM/OiBudW1iZXJbXTtcbiAgZXBpc29kZUNvdW50PzogbnVtYmVyO1xuICBpc0FuaW1lPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByaWNlQ2FyZCh7IHR5cGUsIHNlbGVjdGVkU2Vhc29ucyA9IFtdLCBlcGlzb2RlQ291bnQgPSAwLCBpc0FuaW1lID0gZmFsc2UgfTogUHJpY2VDYXJkUHJvcHMpIHtcbiAgY29uc3QgeyBnZXRDdXJyZW50UHJpY2VzIH0gPSB1c2VDYXJ0KCk7XG4gIGNvbnN0IGN1cnJlbnRQcmljZXMgPSBnZXRDdXJyZW50UHJpY2VzKCk7XG4gIFxuICBjb25zdCBtb3ZpZVByaWNlID0gY3VycmVudFByaWNlcy5tb3ZpZVByaWNlO1xuICBjb25zdCBzZXJpZXNQcmljZSA9IGN1cnJlbnRQcmljZXMuc2VyaWVzUHJpY2U7XG4gIGNvbnN0IHRyYW5zZmVyRmVlUGVyY2VudGFnZSA9IGN1cnJlbnRQcmljZXMudHJhbnNmZXJGZWVQZXJjZW50YWdlO1xuICBcbiAgLy8gQ2hlY2sgaWYgdGhpcyBpcyBhIHNlcmllcyB3aXRoIDUwKyBlcGlzb2Rlc1xuICBjb25zdCBpc0V4dGVuZGVkU2VyaWVzID0gdHlwZSA9PT0gJ3R2JyAmJiBlcGlzb2RlQ291bnQgPiA1MDtcbiAgXG4gIGNvbnN0IGNhbGN1bGF0ZVByaWNlID0gKCkgPT4ge1xuICAgIGlmICh0eXBlID09PSAnbW92aWUnKSB7XG4gICAgICByZXR1cm4gbW92aWVQcmljZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2VyaWVzOiBkeW5hbWljIHByaWNlIHBlciBzZWFzb25cbiAgICAgIHJldHVybiBzZWxlY3RlZFNlYXNvbnMubGVuZ3RoICogc2VyaWVzUHJpY2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHByaWNlID0gY2FsY3VsYXRlUHJpY2UoKTtcbiAgY29uc3QgdHJhbnNmZXJQcmljZSA9IE1hdGgucm91bmQocHJpY2UgKiAoMSArIHRyYW5zZmVyRmVlUGVyY2VudGFnZSAvIDEwMCkpO1xuICBcbiAgY29uc3QgZ2V0SWNvbiA9ICgpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gJ21vdmllJykge1xuICAgICAgcmV0dXJuIGlzQW5pbWUgPyAn8J+OjCcgOiAn8J+OrCc7XG4gICAgfVxuICAgIHJldHVybiBpc0FuaW1lID8gJ/CfjownIDogJ/Cfk7onO1xuICB9O1xuXG4gIGNvbnN0IGdldFR5cGVMYWJlbCA9ICgpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gJ21vdmllJykge1xuICAgICAgcmV0dXJuIGlzQW5pbWUgPyAnUGVsw61jdWxhIEFuaW1hZGEnIDogJ1BlbMOtY3VsYSc7XG4gICAgfVxuICAgIHJldHVybiBpc0FuaW1lID8gJ0FuaW1lJyA6ICdTZXJpZSc7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YHJvdW5kZWQtMnhsIHAtNiBib3JkZXItMiBzaGFkb3cteGwgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgIGlzRXh0ZW5kZWRTZXJpZXMgXG4gICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLWJyIGZyb20tYW1iZXItNTAgdmlhLW9yYW5nZS01MCB0by15ZWxsb3ctNTAgYm9yZGVyLWFtYmVyLTMwMCcgXG4gICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLWJyIGZyb20tZ3JlZW4tNTAgdmlhLWVtZXJhbGQtNTAgdG8tdGVhbC01MCBib3JkZXItZ3JlZW4tMzAwJ1xuICAgIH1gfT5cbiAgICAgIHsvKiBFeHRlbmRlZCBzZXJpZXMgaW5mb3JtYXRpb24gYmFubmVyICovfVxuICAgICAge2lzRXh0ZW5kZWRTZXJpZXMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTQgcC00IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci0xMDAgdG8tb3JhbmdlLTEwMCByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1hbWJlci0zMDAgc2hhZG93LWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAgdG8tb3JhbmdlLTUwMCBwLTIgcm91bmRlZC1sZyBtci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIHRleHQtc20gZm9udC1ib2xkXCI+8J+Tijwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtYW1iZXItOTAwXCI+U2VyaWUgY29uIEVwaXNvZGlvcyBFeHRlbmRpZG9zPC9oND5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWFtYmVyLTcwMFwiPntlcGlzb2RlQ291bnR9IGVwaXNvZGlvcyB0b3RhbGVzPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS84MCByb3VuZGVkLWxnIHAtMyBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWFtYmVyLTgwMFwiPlBvbMOtdGljYSBkZSBQcmVjaW9zPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNzAwXCI+JDMwMCBDVVAgcG9yIHRlbXBvcmFkYTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmVlbi04MDBcIj5TaW4gUmVjYXJnb3M8L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi03MDBcIj5QcmVjaW8gZmlqbyBnYXJhbnRpemFkbzwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLXhsIG1yLTQgc2hhZG93LWxnICR7XG4gICAgICAgICAgICBpc0V4dGVuZGVkU2VyaWVzIFxuICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItNDAwIHRvLW9yYW5nZS00MDAnIFxuICAgICAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNDAwIHRvLWVtZXJhbGQtNDAwJ1xuICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsXCI+e2dldEljb24oKX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9e2Bmb250LWJsYWNrIHRleHQtbGcgJHtcbiAgICAgICAgICAgICAgaXNFeHRlbmRlZFNlcmllcyA/ICd0ZXh0LWFtYmVyLTgwMCcgOiAndGV4dC1ncmVlbi04MDAnXG4gICAgICAgICAgICB9YH0+e2dldFR5cGVMYWJlbCgpfTwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e2B0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgJHtcbiAgICAgICAgICAgICAgaXNFeHRlbmRlZFNlcmllcyA/ICd0ZXh0LWFtYmVyLTYwMCcgOiAndGV4dC1ncmVlbi02MDAnXG4gICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgIHt0eXBlID09PSAndHYnICYmIHNlbGVjdGVkU2Vhc29ucy5sZW5ndGggPiAwIFxuICAgICAgICAgICAgICAgID8gYCR7c2VsZWN0ZWRTZWFzb25zLmxlbmd0aH0gdGVtcG9yYWRhJHtzZWxlY3RlZFNlYXNvbnMubGVuZ3RoID4gMSA/ICdzJyA6ICcnfWBcbiAgICAgICAgICAgICAgICA6ICdDb250ZW5pZG8gY29tcGxldG8nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC13aGl0ZSBwLTMgcm91bmRlZC1mdWxsIHNoYWRvdy1sZyBhbmltYXRlLXB1bHNlICR7XG4gICAgICAgICAgaXNFeHRlbmRlZFNlcmllcyBcbiAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAgdG8tb3JhbmdlLTUwMCcgXG4gICAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNTAwIHRvLWVtZXJhbGQtNTAwJ1xuICAgICAgICB9YH0+XG4gICAgICAgICAgPERvbGxhclNpZ24gY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgIHsvKiBDYXNoIFByaWNlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHJvdW5kZWQteGwgcC00IGJvcmRlci0yIHNoYWRvdy1tZCBob3ZlcjpzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgaXNFeHRlbmRlZFNlcmllcyBcbiAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS13aGl0ZSB0by1hbWJlci01MCBib3JkZXItYW1iZXItMjAwJyBcbiAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS13aGl0ZSB0by1ncmVlbi01MCBib3JkZXItZ3JlZW4tMjAwJ1xuICAgICAgICB9YH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1zbSBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgJHtcbiAgICAgICAgICAgICAgaXNFeHRlbmRlZFNlcmllcyA/ICd0ZXh0LWFtYmVyLTcwMCcgOiAndGV4dC1ncmVlbi03MDAnXG4gICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0xIHJvdW5kZWQtbGcgbXItMiAke1xuICAgICAgICAgICAgICAgIGlzRXh0ZW5kZWRTZXJpZXMgPyAnYmctYW1iZXItMTAwJyA6ICdiZy1ncmVlbi0xMDAnXG4gICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICA8RG9sbGFyU2lnbiBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIEVmZWN0aXZvXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LXhsIGZvbnQtYmxhY2sgJHtcbiAgICAgICAgICAgICAgaXNFeHRlbmRlZFNlcmllcyA/ICd0ZXh0LWFtYmVyLTcwMCcgOiAndGV4dC1ncmVlbi03MDAnXG4gICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICR7cHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2lzRXh0ZW5kZWRTZXJpZXMgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHRleHQteHMgdGV4dC1hbWJlci02MDAgYmctYW1iZXItNTAgcHgtMiBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LWNlbnRlciBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICBTZXJpZSBleHRlbnNhOiBQcmVjaW8gZXN0w6FuZGFyIGFwbGljYWRvXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBUcmFuc2ZlciBQcmljZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Byb3VuZGVkLXhsIHAtNCBib3JkZXItMiBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgIGlzRXh0ZW5kZWRTZXJpZXMgXG4gICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tb3JhbmdlLTUwIHRvLXJlZC01MCBib3JkZXItb3JhbmdlLTIwMCcgXG4gICAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tb3JhbmdlLTUwIHRvLXJlZC01MCBib3JkZXItb3JhbmdlLTIwMCdcbiAgICAgICAgfWB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtb3JhbmdlLTcwMCBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLW9yYW5nZS0xMDAgcC0xIHJvdW5kZWQtbGcgbXItMlwiPlxuICAgICAgICAgICAgICAgIDxDcmVkaXRDYXJkIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgVHJhbnNmZXJlbmNpYVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIHRleHQtb3JhbmdlLTcwMFwiPlxuICAgICAgICAgICAgICAke3RyYW5zZmVyUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtb3JhbmdlLTYwMCBmb250LXNlbWlib2xkIGJnLW9yYW5nZS0xMDAgcHgtMiBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgK3t0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSByZWNhcmdvIGJhbmNhcmlvXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2lzRXh0ZW5kZWRTZXJpZXMgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHRleHQteHMgdGV4dC1vcmFuZ2UtNjAwIGJnLW9yYW5nZS01MCBweC0yIHB5LTEgcm91bmRlZC1mdWxsIHRleHQtY2VudGVyIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgIFJlY2FyZ28gZXN0w6FuZGFyOiBTaW4gY29zdG9zIGFkaWNpb25hbGVzIHBvciBlcGlzb2Rpb3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAge3R5cGUgPT09ICd0dicgJiYgc2VsZWN0ZWRTZWFzb25zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC1zbSBmb250LWJvbGQgdGV4dC1jZW50ZXIgcm91bmRlZC14bCBwLTMgYm9yZGVyICR7XG4gICAgICAgICAgICBpc0V4dGVuZGVkU2VyaWVzIFxuICAgICAgICAgICAgICA/ICd0ZXh0LWFtYmVyLTYwMCBiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItMTAwIHRvLW9yYW5nZS0xMDAgYm9yZGVyLWFtYmVyLTIwMCcgXG4gICAgICAgICAgICAgIDogJ3RleHQtZ3JlZW4tNjAwIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi0xMDAgdG8tZW1lcmFsZC0xMDAgYm9yZGVyLWdyZWVuLTIwMCdcbiAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAkeyhwcmljZSAvIHNlbGVjdGVkU2Vhc29ucy5sZW5ndGgpLnRvTG9jYWxlU3RyaW5nKCl9IENVUCBwb3IgdGVtcG9yYWRhIChlZmVjdGl2bylcbiAgICAgICAgICAgIHtpc0V4dGVuZGVkU2VyaWVzICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIHRleHQteHMgdGV4dC1hbWJlci01MDBcIj5cbiAgICAgICAgICAgICAgICDirZAgUHJlY2lvIGVzcGVjaWFsIHBhcmEgc2VyaWVzIGV4dGVuc2FzXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJmaWxlIjoiL2hvbWUvcHJvamVjdC9zcmMvY29tcG9uZW50cy9QcmljZUNhcmQudHN4In0=