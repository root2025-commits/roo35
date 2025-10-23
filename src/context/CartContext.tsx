import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/context/CartContext.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/context/CartContext.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const createContext = __vite__cjsImport3_react["createContext"]; const useContext = __vite__cjsImport3_react["useContext"]; const useReducer = __vite__cjsImport3_react["useReducer"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { Toast } from "/src/components/Toast.tsx";
const EMBEDDED_PRICES = {
  "moviePrice": 80,
  "seriesPrice": 300,
  "transferFeePercentage": 10,
  "novelPricePerChapter": 5
};
const CartContext = createContext(void 0);
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.items.some((item) => item.id === action.payload.id && item.type === action.payload.type)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + 1
      };
    case "UPDATE_SEASONS":
      return {
        ...state,
        items: state.items.map(
          (item) => item.id === action.payload.id && item.type !== "novel" ? { ...item, selectedSeasons: action.payload.seasons } : item
        )
      };
    case "UPDATE_PAYMENT_TYPE":
      return {
        ...state,
        items: state.items.map(
          (item) => item.id === action.payload.id ? { ...item, paymentType: action.payload.paymentType } : item
        )
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - 1
      };
    case "CLEAR_CART":
      return {
        items: [],
        total: 0
      };
    case "LOAD_CART":
      return {
        items: action.payload,
        total: action.payload.length
      };
    case "UPDATE_PRICES":
      return state;
    default:
      return state;
  }
}
export function CartProvider({ children }) {
  _s();
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const [currentPrices, setCurrentPrices] = React.useState(EMBEDDED_PRICES);
  const [toast, setToast] = React.useState({ message: "", type: "success", isVisible: false });
  useEffect(() => {
    const handleAdminStateChange = (event) => {
      if (event.detail.type === "prices") {
        setCurrentPrices(event.detail.data);
      }
    };
    const handleAdminFullSync = (event) => {
      if (event.detail.config?.prices) {
        setCurrentPrices(event.detail.config.prices);
      }
    };
    window.addEventListener("admin_state_change", handleAdminStateChange);
    window.addEventListener("admin_full_sync", handleAdminFullSync);
    try {
      const adminConfig = localStorage.getItem("system_config");
      if (adminConfig) {
        const config = JSON.parse(adminConfig);
        if (config.prices) {
          setCurrentPrices(config.prices);
        }
      }
    } catch (error) {
      console.error("Error loading admin prices:", error);
    }
    return () => {
      window.removeEventListener("admin_state_change", handleAdminStateChange);
      window.removeEventListener("admin_full_sync", handleAdminFullSync);
    };
  }, []);
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("pageRefreshed", "true");
    };
    const handleLoad = () => {
      if (sessionStorage.getItem("pageRefreshed") === "true") {
        localStorage.removeItem("movieCart");
        dispatch({ type: "CLEAR_CART" });
        sessionStorage.removeItem("pageRefreshed");
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);
    if (sessionStorage.getItem("pageRefreshed") === "true") {
      localStorage.removeItem("movieCart");
      dispatch({ type: "CLEAR_CART" });
      sessionStorage.removeItem("pageRefreshed");
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("pageRefreshed") !== "true") {
      const savedCart = localStorage.getItem("movieCart");
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart);
          dispatch({ type: "LOAD_CART", payload: items });
        } catch (error) {
          console.error("Error loading cart from localStorage:", error);
        }
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("movieCart", JSON.stringify(state.items));
  }, [state.items]);
  const addItem = (item) => {
    const itemWithDefaults = {
      ...item,
      paymentType: "cash",
      selectedSeasons: item.type === "tv" && "selectedSeasons" in item && !item.selectedSeasons ? [1] : "selectedSeasons" in item ? item.selectedSeasons : void 0
    };
    dispatch({ type: "ADD_ITEM", payload: itemWithDefaults });
    setToast({
      message: `"${item.title}" agregado al carrito`,
      type: "success",
      isVisible: true
    });
  };
  const addNovel = (novel) => {
    dispatch({ type: "ADD_ITEM", payload: novel });
    setToast({
      message: `"${novel.title}" agregada al carrito`,
      type: "success",
      isVisible: true
    });
  };
  const removeItem = (id) => {
    const item = state.items.find((item2) => item2.id === id);
    dispatch({ type: "REMOVE_ITEM", payload: id });
    if (item) {
      setToast({
        message: `"${item.title}" retirado del carrito`,
        type: "error",
        isVisible: true
      });
    }
  };
  const updateSeasons = (id, seasons) => {
    dispatch({ type: "UPDATE_SEASONS", payload: { id, seasons } });
  };
  const updatePaymentType = (id, paymentType) => {
    dispatch({ type: "UPDATE_PAYMENT_TYPE", payload: { id, paymentType } });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const isInCart = (id) => {
    return state.items.some((item) => item.id === id);
  };
  const getItemSeasons = (id) => {
    const item = state.items.find((item2) => item2.id === id);
    return item && "selectedSeasons" in item ? item.selectedSeasons || [] : [];
  };
  const getItemPaymentType = (id) => {
    const item = state.items.find((item2) => item2.id === id);
    return item?.paymentType || "cash";
  };
  const getCurrentPrices = () => {
    return currentPrices;
  };
  const calculateItemPrice = (item) => {
    const moviePrice = currentPrices.moviePrice;
    const seriesPrice = currentPrices.seriesPrice;
    const novelPricePerChapter = currentPrices.novelPricePerChapter;
    const transferFeePercentage = currentPrices.transferFeePercentage;
    if (item.type === "novel") {
      const novelItem = item;
      const basePrice = novelItem.chapters * novelPricePerChapter;
      return item.paymentType === "transfer" ? Math.round(basePrice * (1 + transferFeePercentage / 100)) : basePrice;
    } else if (item.type === "movie") {
      const basePrice = moviePrice;
      return item.paymentType === "transfer" ? Math.round(basePrice * (1 + transferFeePercentage / 100)) : basePrice;
    } else {
      const seriesItem = item;
      const seasons = seriesItem.selectedSeasons?.length || 1;
      const basePrice = seasons * seriesPrice;
      return item.paymentType === "transfer" ? Math.round(basePrice * (1 + transferFeePercentage / 100)) : basePrice;
    }
  };
  const calculateTotalPrice = () => {
    return state.items.reduce((total, item) => {
      return total + calculateItemPrice(item);
    }, 0);
  };
  const calculateTotalByPaymentType = () => {
    const moviePrice = currentPrices.moviePrice;
    const seriesPrice = currentPrices.seriesPrice;
    const novelPricePerChapter = currentPrices.novelPricePerChapter;
    const transferFeePercentage = currentPrices.transferFeePercentage;
    return state.items.reduce((totals, item) => {
      let basePrice;
      if (item.type === "novel") {
        const novelItem = item;
        basePrice = novelItem.chapters * novelPricePerChapter;
      } else if (item.type === "movie") {
        basePrice = moviePrice;
      } else {
        const seriesItem = item;
        basePrice = (seriesItem.selectedSeasons?.length || 1) * seriesPrice;
      }
      if (item.paymentType === "transfer") {
        totals.transfer += Math.round(basePrice * (1 + transferFeePercentage / 100));
      } else {
        totals.cash += basePrice;
      }
      return totals;
    }, { cash: 0, transfer: 0 });
  };
  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };
  return /* @__PURE__ */ jsxDEV(CartContext.Provider, { value: {
    state,
    addItem,
    addNovel,
    removeItem,
    updateSeasons,
    updatePaymentType,
    clearCart,
    isInCart,
    getItemSeasons,
    getItemPaymentType,
    calculateItemPrice,
    calculateTotalPrice,
    calculateTotalByPaymentType,
    getCurrentPrices
  }, children: [
    children,
    /* @__PURE__ */ jsxDEV(
      Toast,
      {
        message: toast.message,
        type: toast.type,
        isVisible: toast.isVisible,
        onClose: closeToast
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/context/CartContext.tsx",
        lineNumber: 358,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/project/src/context/CartContext.tsx",
    lineNumber: 341,
    columnNumber: 5
  }, this);
}
_s(CartProvider, "0+09P6yNIGocUoY+o7wTmfxN74o=");
_c = CartProvider;
export function useCart() {
  _s2();
  const context = useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
_s2(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "CartProvider");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/context/CartContext.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/context/CartContext.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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T0FBTztBQUFBLElBQzNCekI7QUFBQUEsSUFDQWtEO0FBQUFBLElBQ0FHO0FBQUFBLElBQ0FOO0FBQUFBLElBQ0FTO0FBQUFBLElBQ0FDO0FBQUFBLElBQ0FDO0FBQUFBLElBQ0FDO0FBQUFBLElBQ0FDO0FBQUFBLElBQ0FDO0FBQUFBLElBQ0FFO0FBQUFBLElBQ0FXO0FBQUFBLElBQ0FFO0FBQUFBLElBQ0FkO0FBQUFBLEVBQ0YsR0FDRzlDO0FBQUFBO0FBQUFBLElBQ0Q7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVNNLE1BQU1FO0FBQUFBLFFBQ2YsTUFBTUYsTUFBTXBCO0FBQUFBLFFBQ1osV0FBV29CLE1BQU1HO0FBQUFBLFFBQ2pCLFNBQVN1RDtBQUFBQTtBQUFBQSxNQUpYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlzQjtBQUFBLE9BckJ4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBdUJBO0FBRUo7QUFBQy9ELEdBblBlRixjQUFZO0FBQUFtRSxLQUFabkU7QUFxUFQsZ0JBQVNvRSxVQUFVO0FBQUFDLE1BQUE7QUFDeEIsUUFBTUMsVUFBVTdGLFdBQVdLLFdBQVc7QUFDdEMsTUFBSXdGLFlBQVl2RixRQUFXO0FBQ3pCLFVBQU0sSUFBSXdGLE1BQU0sNENBQTRDO0FBQUEsRUFDOUQ7QUFDQSxTQUFPRDtBQUNUO0FBQUNELElBTmVELFNBQU87QUFBQSxJQUFBRDtBQUFBSyxhQUFBTCxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVJlZHVjZXIiLCJ1c2VFZmZlY3QiLCJUb2FzdCIsIkVNQkVEREVEX1BSSUNFUyIsIkNhcnRDb250ZXh0IiwidW5kZWZpbmVkIiwiY2FydFJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJpdGVtcyIsInNvbWUiLCJpdGVtIiwiaWQiLCJwYXlsb2FkIiwidG90YWwiLCJtYXAiLCJzZWxlY3RlZFNlYXNvbnMiLCJzZWFzb25zIiwicGF5bWVudFR5cGUiLCJmaWx0ZXIiLCJsZW5ndGgiLCJDYXJ0UHJvdmlkZXIiLCJjaGlsZHJlbiIsIl9zIiwiZGlzcGF0Y2giLCJjdXJyZW50UHJpY2VzIiwic2V0Q3VycmVudFByaWNlcyIsInVzZVN0YXRlIiwidG9hc3QiLCJzZXRUb2FzdCIsIm1lc3NhZ2UiLCJpc1Zpc2libGUiLCJoYW5kbGVBZG1pblN0YXRlQ2hhbmdlIiwiZXZlbnQiLCJkZXRhaWwiLCJkYXRhIiwiaGFuZGxlQWRtaW5GdWxsU3luYyIsImNvbmZpZyIsInByaWNlcyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZG1pbkNvbmZpZyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImNvbnNvbGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlQmVmb3JlVW5sb2FkIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiaGFuZGxlTG9hZCIsInJlbW92ZUl0ZW0iLCJzYXZlZENhcnQiLCJzdHJpbmdpZnkiLCJhZGRJdGVtIiwiaXRlbVdpdGhEZWZhdWx0cyIsInRpdGxlIiwiYWRkTm92ZWwiLCJub3ZlbCIsImZpbmQiLCJ1cGRhdGVTZWFzb25zIiwidXBkYXRlUGF5bWVudFR5cGUiLCJjbGVhckNhcnQiLCJpc0luQ2FydCIsImdldEl0ZW1TZWFzb25zIiwiZ2V0SXRlbVBheW1lbnRUeXBlIiwiZ2V0Q3VycmVudFByaWNlcyIsImNhbGN1bGF0ZUl0ZW1QcmljZSIsIm1vdmllUHJpY2UiLCJzZXJpZXNQcmljZSIsIm5vdmVsUHJpY2VQZXJDaGFwdGVyIiwidHJhbnNmZXJGZWVQZXJjZW50YWdlIiwibm92ZWxJdGVtIiwiYmFzZVByaWNlIiwiY2hhcHRlcnMiLCJNYXRoIiwicm91bmQiLCJzZXJpZXNJdGVtIiwiY2FsY3VsYXRlVG90YWxQcmljZSIsInJlZHVjZSIsImNhbGN1bGF0ZVRvdGFsQnlQYXltZW50VHlwZSIsInRvdGFscyIsInRyYW5zZmVyIiwiY2FzaCIsImNsb3NlVG9hc3QiLCJwcmV2IiwiX2MiLCJ1c2VDYXJ0IiwiX3MyIiwiY29udGV4dCIsIkVycm9yIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkNhcnRDb250ZXh0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlUmVkdWNlciwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0JztcbmltcG9ydCB0eXBlIHsgQ2FydEl0ZW0sIE5vdmVsQ2FydEl0ZW0sIEFsbENhcnRJdGVtcyB9IGZyb20gJy4uL3R5cGVzL21vdmllJztcblxuLy8gUFJFQ0lPUyBFTUJFQklET1MgLSBHZW5lcmFkb3MgYXV0b23DoXRpY2FtZW50ZVxuY29uc3QgRU1CRURERURfUFJJQ0VTID0ge1xuICBcIm1vdmllUHJpY2VcIjogODAsXG4gIFwic2VyaWVzUHJpY2VcIjogMzAwLFxuICBcInRyYW5zZmVyRmVlUGVyY2VudGFnZVwiOiAxMCxcbiAgXCJub3ZlbFByaWNlUGVyQ2hhcHRlclwiOiA1XG59O1xuXG5pbnRlcmZhY2UgU2VyaWVzQ2FydEl0ZW0gZXh0ZW5kcyBDYXJ0SXRlbSB7XG4gIHNlbGVjdGVkU2Vhc29ucz86IG51bWJlcltdO1xuICBwYXltZW50VHlwZT86ICdjYXNoJyB8ICd0cmFuc2Zlcic7XG59XG5cbmludGVyZmFjZSBDYXJ0U3RhdGUge1xuICBpdGVtczogKFNlcmllc0NhcnRJdGVtIHwgTm92ZWxDYXJ0SXRlbSlbXTtcbiAgdG90YWw6IG51bWJlcjtcbn1cblxudHlwZSBDYXJ0QWN0aW9uID0gXG4gIHwgeyB0eXBlOiAnQUREX0lURU0nOyBwYXlsb2FkOiBTZXJpZXNDYXJ0SXRlbSB8IE5vdmVsQ2FydEl0ZW0gfVxuICB8IHsgdHlwZTogJ1JFTU9WRV9JVEVNJzsgcGF5bG9hZDogbnVtYmVyIH1cbiAgfCB7IHR5cGU6ICdVUERBVEVfU0VBU09OUyc7IHBheWxvYWQ6IHsgaWQ6IG51bWJlcjsgc2Vhc29uczogbnVtYmVyW10gfSB9XG4gIHwgeyB0eXBlOiAnVVBEQVRFX1BBWU1FTlRfVFlQRSc7IHBheWxvYWQ6IHsgaWQ6IG51bWJlcjsgcGF5bWVudFR5cGU6ICdjYXNoJyB8ICd0cmFuc2ZlcicgfSB9XG4gIHwgeyB0eXBlOiAnQ0xFQVJfQ0FSVCcgfVxuICB8IHsgdHlwZTogJ0xPQURfQ0FSVCc7IHBheWxvYWQ6IChTZXJpZXNDYXJ0SXRlbSB8IE5vdmVsQ2FydEl0ZW0pW10gfVxuICB8IHsgdHlwZTogJ1VQREFURV9QUklDRVMnOyBwYXlsb2FkOiBhbnkgfTtcblxuaW50ZXJmYWNlIENhcnRDb250ZXh0VHlwZSB7XG4gIHN0YXRlOiBDYXJ0U3RhdGU7XG4gIGFkZEl0ZW06IChpdGVtOiBTZXJpZXNDYXJ0SXRlbSB8IE5vdmVsQ2FydEl0ZW0pID0+IHZvaWQ7XG4gIGFkZE5vdmVsOiAobm92ZWw6IE5vdmVsQ2FydEl0ZW0pID0+IHZvaWQ7XG4gIHJlbW92ZUl0ZW06IChpZDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVTZWFzb25zOiAoaWQ6IG51bWJlciwgc2Vhc29uczogbnVtYmVyW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVBheW1lbnRUeXBlOiAoaWQ6IG51bWJlciwgcGF5bWVudFR5cGU6ICdjYXNoJyB8ICd0cmFuc2ZlcicpID0+IHZvaWQ7XG4gIGNsZWFyQ2FydDogKCkgPT4gdm9pZDtcbiAgaXNJbkNhcnQ6IChpZDogbnVtYmVyKSA9PiBib29sZWFuO1xuICBnZXRJdGVtU2Vhc29uczogKGlkOiBudW1iZXIpID0+IG51bWJlcltdO1xuICBnZXRJdGVtUGF5bWVudFR5cGU6IChpZDogbnVtYmVyKSA9PiAnY2FzaCcgfCAndHJhbnNmZXInO1xuICBjYWxjdWxhdGVJdGVtUHJpY2U6IChpdGVtOiBTZXJpZXNDYXJ0SXRlbSB8IE5vdmVsQ2FydEl0ZW0pID0+IG51bWJlcjtcbiAgY2FsY3VsYXRlVG90YWxQcmljZTogKCkgPT4gbnVtYmVyO1xuICBjYWxjdWxhdGVUb3RhbEJ5UGF5bWVudFR5cGU6ICgpID0+IHsgY2FzaDogbnVtYmVyOyB0cmFuc2ZlcjogbnVtYmVyIH07XG4gIGdldEN1cnJlbnRQcmljZXM6ICgpID0+IGFueTtcbn1cblxuY29uc3QgQ2FydENvbnRleHQgPSBjcmVhdGVDb250ZXh0PENhcnRDb250ZXh0VHlwZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuZnVuY3Rpb24gY2FydFJlZHVjZXIoc3RhdGU6IENhcnRTdGF0ZSwgYWN0aW9uOiBDYXJ0QWN0aW9uKTogQ2FydFN0YXRlIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ0FERF9JVEVNJzpcbiAgICAgIGlmIChzdGF0ZS5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWQgJiYgaXRlbS50eXBlID09PSBhY3Rpb24ucGF5bG9hZC50eXBlKSkge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXRlbXM6IFsuLi5zdGF0ZS5pdGVtcywgYWN0aW9uLnBheWxvYWRdLFxuICAgICAgICB0b3RhbDogc3RhdGUudG90YWwgKyAxXG4gICAgICB9O1xuICAgIGNhc2UgJ1VQREFURV9TRUFTT05TJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpdGVtczogc3RhdGUuaXRlbXMubWFwKGl0ZW0gPT4gXG4gICAgICAgICAgaXRlbS5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWQgJiYgaXRlbS50eXBlICE9PSAnbm92ZWwnXG4gICAgICAgICAgICA/IHsgLi4uaXRlbSwgc2VsZWN0ZWRTZWFzb25zOiBhY3Rpb24ucGF5bG9hZC5zZWFzb25zIH1cbiAgICAgICAgICAgIDogaXRlbVxuICAgICAgICApXG4gICAgICB9O1xuICAgIGNhc2UgJ1VQREFURV9QQVlNRU5UX1RZUEUnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGl0ZW1zOiBzdGF0ZS5pdGVtcy5tYXAoaXRlbSA9PiBcbiAgICAgICAgICBpdGVtLmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZCBcbiAgICAgICAgICAgID8geyAuLi5pdGVtLCBwYXltZW50VHlwZTogYWN0aW9uLnBheWxvYWQucGF5bWVudFR5cGUgfVxuICAgICAgICAgICAgOiBpdGVtXG4gICAgICAgIClcbiAgICAgIH07XG4gICAgY2FzZSAnUkVNT1ZFX0lURU0nOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGl0ZW1zOiBzdGF0ZS5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBhY3Rpb24ucGF5bG9hZCksXG4gICAgICAgIHRvdGFsOiBzdGF0ZS50b3RhbCAtIDFcbiAgICAgIH07XG4gICAgY2FzZSAnQ0xFQVJfQ0FSVCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIHRvdGFsOiAwXG4gICAgICB9O1xuICAgIGNhc2UgJ0xPQURfQ0FSVCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIHRvdGFsOiBhY3Rpb24ucGF5bG9hZC5sZW5ndGhcbiAgICAgIH07XG4gICAgY2FzZSAnVVBEQVRFX1BSSUNFUyc6XG4gICAgICAvLyBQcmljZXMgYXJlIG5vdyBlbWJlZGRlZCwgbm8gbmVlZCB0byB1cGRhdGUgc3RhdGVcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXJ0UHJvdmlkZXIoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoY2FydFJlZHVjZXIsIHsgaXRlbXM6IFtdLCB0b3RhbDogMCB9KTtcbiAgY29uc3QgW2N1cnJlbnRQcmljZXMsIHNldEN1cnJlbnRQcmljZXNdID0gUmVhY3QudXNlU3RhdGUoRU1CRURERURfUFJJQ0VTKTtcbiAgY29uc3QgW3RvYXN0LCBzZXRUb2FzdF0gPSBSZWFjdC51c2VTdGF0ZTx7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHR5cGU6ICdzdWNjZXNzJyB8ICdlcnJvcic7XG4gICAgaXNWaXNpYmxlOiBib29sZWFuO1xuICB9Pih7IG1lc3NhZ2U6ICcnLCB0eXBlOiAnc3VjY2VzcycsIGlzVmlzaWJsZTogZmFsc2UgfSk7XG5cbiAgLy8gTGlzdGVuIGZvciBhZG1pbiBwcmljZSB1cGRhdGVzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQWRtaW5TdGF0ZUNoYW5nZSA9IChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5kZXRhaWwudHlwZSA9PT0gJ3ByaWNlcycpIHtcbiAgICAgICAgc2V0Q3VycmVudFByaWNlcyhldmVudC5kZXRhaWwuZGF0YSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUFkbWluRnVsbFN5bmMgPSAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQuZGV0YWlsLmNvbmZpZz8ucHJpY2VzKSB7XG4gICAgICAgIHNldEN1cnJlbnRQcmljZXMoZXZlbnQuZGV0YWlsLmNvbmZpZy5wcmljZXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYWRtaW5fc3RhdGVfY2hhbmdlJywgaGFuZGxlQWRtaW5TdGF0ZUNoYW5nZSBhcyBFdmVudExpc3RlbmVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYWRtaW5fZnVsbF9zeW5jJywgaGFuZGxlQWRtaW5GdWxsU3luYyBhcyBFdmVudExpc3RlbmVyKTtcblxuICAgIC8vIENoZWNrIGZvciBzdG9yZWQgYWRtaW4gY29uZmlnXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFkbWluQ29uZmlnID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N5c3RlbV9jb25maWcnKTtcbiAgICAgIGlmIChhZG1pbkNvbmZpZykge1xuICAgICAgICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKGFkbWluQ29uZmlnKTtcbiAgICAgICAgaWYgKGNvbmZpZy5wcmljZXMpIHtcbiAgICAgICAgICBzZXRDdXJyZW50UHJpY2VzKGNvbmZpZy5wcmljZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgYWRtaW4gcHJpY2VzOicsIGVycm9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkbWluX3N0YXRlX2NoYW5nZScsIGhhbmRsZUFkbWluU3RhdGVDaGFuZ2UgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRtaW5fZnVsbF9zeW5jJywgaGFuZGxlQWRtaW5GdWxsU3luYyBhcyBFdmVudExpc3RlbmVyKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgLy8gQ2xlYXIgY2FydCBvbiBwYWdlIHJlZnJlc2hcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVCZWZvcmVVbmxvYWQgPSAoKSA9PiB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwYWdlUmVmcmVzaGVkJywgJ3RydWUnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTG9hZCA9ICgpID0+IHtcbiAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwYWdlUmVmcmVzaGVkJykgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbW92aWVDYXJ0Jyk7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0NMRUFSX0NBUlQnIH0pO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdwYWdlUmVmcmVzaGVkJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBoYW5kbGVCZWZvcmVVbmxvYWQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaGFuZGxlTG9hZCk7XG5cbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncGFnZVJlZnJlc2hlZCcpID09PSAndHJ1ZScpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdtb3ZpZUNhcnQnKTtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0NMRUFSX0NBUlQnIH0pO1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncGFnZVJlZnJlc2hlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgaGFuZGxlQmVmb3JlVW5sb2FkKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgaGFuZGxlTG9hZCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKSAhPT0gJ3RydWUnKSB7XG4gICAgICBjb25zdCBzYXZlZENhcnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbW92aWVDYXJ0Jyk7XG4gICAgICBpZiAoc2F2ZWRDYXJ0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaXRlbXMgPSBKU09OLnBhcnNlKHNhdmVkQ2FydCk7XG4gICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnTE9BRF9DQVJUJywgcGF5bG9hZDogaXRlbXMgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBjYXJ0IGZyb20gbG9jYWxTdG9yYWdlOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21vdmllQ2FydCcsIEpTT04uc3RyaW5naWZ5KHN0YXRlLml0ZW1zKSk7XG4gIH0sIFtzdGF0ZS5pdGVtc10pO1xuXG4gIGNvbnN0IGFkZEl0ZW0gPSAoaXRlbTogU2VyaWVzQ2FydEl0ZW0gfCBOb3ZlbENhcnRJdGVtKSA9PiB7XG4gICAgY29uc3QgaXRlbVdpdGhEZWZhdWx0cyA9IHsgXG4gICAgICAuLi5pdGVtLCBcbiAgICAgIHBheW1lbnRUeXBlOiAnY2FzaCcgYXMgY29uc3QsXG4gICAgICBzZWxlY3RlZFNlYXNvbnM6IGl0ZW0udHlwZSA9PT0gJ3R2JyAmJiAnc2VsZWN0ZWRTZWFzb25zJyBpbiBpdGVtICYmICFpdGVtLnNlbGVjdGVkU2Vhc29ucyA/IFsxXSA6ICdzZWxlY3RlZFNlYXNvbnMnIGluIGl0ZW0gPyBpdGVtLnNlbGVjdGVkU2Vhc29ucyA6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnQUREX0lURU0nLCBwYXlsb2FkOiBpdGVtV2l0aERlZmF1bHRzIH0pO1xuICAgIFxuICAgIHNldFRvYXN0KHtcbiAgICAgIG1lc3NhZ2U6IGBcIiR7aXRlbS50aXRsZX1cIiBhZ3JlZ2FkbyBhbCBjYXJyaXRvYCxcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZE5vdmVsID0gKG5vdmVsOiBOb3ZlbENhcnRJdGVtKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnQUREX0lURU0nLCBwYXlsb2FkOiBub3ZlbCB9KTtcbiAgICBcbiAgICBzZXRUb2FzdCh7XG4gICAgICBtZXNzYWdlOiBgXCIke25vdmVsLnRpdGxlfVwiIGFncmVnYWRhIGFsIGNhcnJpdG9gLFxuICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgaXNWaXNpYmxlOiB0cnVlXG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IHJlbW92ZUl0ZW0gPSAoaWQ6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBzdGF0ZS5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ1JFTU9WRV9JVEVNJywgcGF5bG9hZDogaWQgfSk7XG4gICAgXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHNldFRvYXN0KHtcbiAgICAgICAgbWVzc2FnZTogYFwiJHtpdGVtLnRpdGxlfVwiIHJldGlyYWRvIGRlbCBjYXJyaXRvYCxcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgaXNWaXNpYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlU2Vhc29ucyA9IChpZDogbnVtYmVyLCBzZWFzb25zOiBudW1iZXJbXSkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ1VQREFURV9TRUFTT05TJywgcGF5bG9hZDogeyBpZCwgc2Vhc29ucyB9IH0pO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVBheW1lbnRUeXBlID0gKGlkOiBudW1iZXIsIHBheW1lbnRUeXBlOiAnY2FzaCcgfCAndHJhbnNmZXInKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnVVBEQVRFX1BBWU1FTlRfVFlQRScsIHBheWxvYWQ6IHsgaWQsIHBheW1lbnRUeXBlIH0gfSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJDYXJ0ID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0NMRUFSX0NBUlQnIH0pO1xuICB9O1xuXG4gIGNvbnN0IGlzSW5DYXJ0ID0gKGlkOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gc3RhdGUuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgfTtcblxuICBjb25zdCBnZXRJdGVtU2Vhc29ucyA9IChpZDogbnVtYmVyKTogbnVtYmVyW10gPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBzdGF0ZS5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgIHJldHVybiAoaXRlbSAmJiAnc2VsZWN0ZWRTZWFzb25zJyBpbiBpdGVtKSA/IGl0ZW0uc2VsZWN0ZWRTZWFzb25zIHx8IFtdIDogW107XG4gIH07XG5cbiAgY29uc3QgZ2V0SXRlbVBheW1lbnRUeXBlID0gKGlkOiBudW1iZXIpOiAnY2FzaCcgfCAndHJhbnNmZXInID0+IHtcbiAgICBjb25zdCBpdGVtID0gc3RhdGUuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgICByZXR1cm4gaXRlbT8ucGF5bWVudFR5cGUgfHwgJ2Nhc2gnO1xuICB9O1xuXG4gIGNvbnN0IGdldEN1cnJlbnRQcmljZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGN1cnJlbnRQcmljZXM7XG4gIH07XG5cbiAgY29uc3QgY2FsY3VsYXRlSXRlbVByaWNlID0gKGl0ZW06IFNlcmllc0NhcnRJdGVtIHwgTm92ZWxDYXJ0SXRlbSk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgbW92aWVQcmljZSA9IGN1cnJlbnRQcmljZXMubW92aWVQcmljZTtcbiAgICBjb25zdCBzZXJpZXNQcmljZSA9IGN1cnJlbnRQcmljZXMuc2VyaWVzUHJpY2U7XG4gICAgY29uc3Qgbm92ZWxQcmljZVBlckNoYXB0ZXIgPSBjdXJyZW50UHJpY2VzLm5vdmVsUHJpY2VQZXJDaGFwdGVyO1xuICAgIGNvbnN0IHRyYW5zZmVyRmVlUGVyY2VudGFnZSA9IGN1cnJlbnRQcmljZXMudHJhbnNmZXJGZWVQZXJjZW50YWdlO1xuICAgIFxuICAgIGlmIChpdGVtLnR5cGUgPT09ICdub3ZlbCcpIHtcbiAgICAgIGNvbnN0IG5vdmVsSXRlbSA9IGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbTtcbiAgICAgIGNvbnN0IGJhc2VQcmljZSA9IG5vdmVsSXRlbS5jaGFwdGVycyAqIG5vdmVsUHJpY2VQZXJDaGFwdGVyO1xuICAgICAgcmV0dXJuIGl0ZW0ucGF5bWVudFR5cGUgPT09ICd0cmFuc2ZlcicgPyBNYXRoLnJvdW5kKGJhc2VQcmljZSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSkgOiBiYXNlUHJpY2U7XG4gICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdtb3ZpZScpIHtcbiAgICAgIGNvbnN0IGJhc2VQcmljZSA9IG1vdmllUHJpY2U7XG4gICAgICByZXR1cm4gaXRlbS5wYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJyA/IE1hdGgucm91bmQoYmFzZVByaWNlICogKDEgKyB0cmFuc2ZlckZlZVBlcmNlbnRhZ2UgLyAxMDApKSA6IGJhc2VQcmljZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VyaWVzSXRlbSA9IGl0ZW0gYXMgU2VyaWVzQ2FydEl0ZW07XG4gICAgICBjb25zdCBzZWFzb25zID0gc2VyaWVzSXRlbS5zZWxlY3RlZFNlYXNvbnM/Lmxlbmd0aCB8fCAxO1xuICAgICAgY29uc3QgYmFzZVByaWNlID0gc2Vhc29ucyAqIHNlcmllc1ByaWNlO1xuICAgICAgcmV0dXJuIGl0ZW0ucGF5bWVudFR5cGUgPT09ICd0cmFuc2ZlcicgPyBNYXRoLnJvdW5kKGJhc2VQcmljZSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSkgOiBiYXNlUHJpY2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZVRvdGFsUHJpY2UgPSAoKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gc3RhdGUuaXRlbXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIHRvdGFsICsgY2FsY3VsYXRlSXRlbVByaWNlKGl0ZW0pO1xuICAgIH0sIDApO1xuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZVRvdGFsQnlQYXltZW50VHlwZSA9ICgpOiB7IGNhc2g6IG51bWJlcjsgdHJhbnNmZXI6IG51bWJlciB9ID0+IHtcbiAgICBjb25zdCBtb3ZpZVByaWNlID0gY3VycmVudFByaWNlcy5tb3ZpZVByaWNlO1xuICAgIGNvbnN0IHNlcmllc1ByaWNlID0gY3VycmVudFByaWNlcy5zZXJpZXNQcmljZTtcbiAgICBjb25zdCBub3ZlbFByaWNlUGVyQ2hhcHRlciA9IGN1cnJlbnRQcmljZXMubm92ZWxQcmljZVBlckNoYXB0ZXI7XG4gICAgY29uc3QgdHJhbnNmZXJGZWVQZXJjZW50YWdlID0gY3VycmVudFByaWNlcy50cmFuc2ZlckZlZVBlcmNlbnRhZ2U7XG4gICAgXG4gICAgcmV0dXJuIHN0YXRlLml0ZW1zLnJlZHVjZSgodG90YWxzLCBpdGVtKSA9PiB7XG4gICAgICBsZXQgYmFzZVByaWNlOiBudW1iZXI7XG4gICAgICBpZiAoaXRlbS50eXBlID09PSAnbm92ZWwnKSB7XG4gICAgICAgIGNvbnN0IG5vdmVsSXRlbSA9IGl0ZW0gYXMgTm92ZWxDYXJ0SXRlbTtcbiAgICAgICAgYmFzZVByaWNlID0gbm92ZWxJdGVtLmNoYXB0ZXJzICogbm92ZWxQcmljZVBlckNoYXB0ZXI7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ21vdmllJykge1xuICAgICAgICBiYXNlUHJpY2UgPSBtb3ZpZVByaWNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2VyaWVzSXRlbSA9IGl0ZW0gYXMgU2VyaWVzQ2FydEl0ZW07XG4gICAgICAgIGJhc2VQcmljZSA9IChzZXJpZXNJdGVtLnNlbGVjdGVkU2Vhc29ucz8ubGVuZ3RoIHx8IDEpICogc2VyaWVzUHJpY2U7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChpdGVtLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInKSB7XG4gICAgICAgIHRvdGFscy50cmFuc2ZlciArPSBNYXRoLnJvdW5kKGJhc2VQcmljZSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b3RhbHMuY2FzaCArPSBiYXNlUHJpY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWxzO1xuICAgIH0sIHsgY2FzaDogMCwgdHJhbnNmZXI6IDAgfSk7XG4gIH07XG5cbiAgY29uc3QgY2xvc2VUb2FzdCA9ICgpID0+IHtcbiAgICBzZXRUb2FzdChwcmV2ID0+ICh7IC4uLnByZXYsIGlzVmlzaWJsZTogZmFsc2UgfSkpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPENhcnRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IFxuICAgICAgc3RhdGUsIFxuICAgICAgYWRkSXRlbSwgXG4gICAgICBhZGROb3ZlbCxcbiAgICAgIHJlbW92ZUl0ZW0sIFxuICAgICAgdXBkYXRlU2Vhc29ucywgXG4gICAgICB1cGRhdGVQYXltZW50VHlwZSxcbiAgICAgIGNsZWFyQ2FydCwgXG4gICAgICBpc0luQ2FydCwgXG4gICAgICBnZXRJdGVtU2Vhc29ucyxcbiAgICAgIGdldEl0ZW1QYXltZW50VHlwZSxcbiAgICAgIGNhbGN1bGF0ZUl0ZW1QcmljZSxcbiAgICAgIGNhbGN1bGF0ZVRvdGFsUHJpY2UsXG4gICAgICBjYWxjdWxhdGVUb3RhbEJ5UGF5bWVudFR5cGUsXG4gICAgICBnZXRDdXJyZW50UHJpY2VzXG4gICAgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgICA8VG9hc3RcbiAgICAgICAgbWVzc2FnZT17dG9hc3QubWVzc2FnZX1cbiAgICAgICAgdHlwZT17dG9hc3QudHlwZX1cbiAgICAgICAgaXNWaXNpYmxlPXt0b2FzdC5pc1Zpc2libGV9XG4gICAgICAgIG9uQ2xvc2U9e2Nsb3NlVG9hc3R9XG4gICAgICAvPlxuICAgIDwvQ2FydENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYXJ0KCkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChDYXJ0Q29udGV4dCk7XG4gIGlmIChjb250ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUNhcnQgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIENhcnRQcm92aWRlcicpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufSJdLCJmaWxlIjoiL2hvbWUvcHJvamVjdC9zcmMvY29udGV4dC9DYXJ0Q29udGV4dC50c3gifQ==