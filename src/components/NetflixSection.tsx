import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/NetflixSection.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/NetflixSection.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useRef = __vite__cjsImport3_react["useRef"]; const useState = __vite__cjsImport3_react["useState"];
import { ChevronLeft, ChevronRight } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
export function NetflixSection({
  title,
  icon,
  children,
  showViewAll = false,
  onViewAllClick
}) {
  _s();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      const targetScroll = direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
      setTimeout(checkScroll, 300);
    }
  };
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setTouchEndX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        scroll("right");
      } else {
        scroll("left");
      }
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };
  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [children]);
  return /* @__PURE__ */ jsxDEV("section", { className: "mb-12", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-bold text-gray-900 flex items-center", children: [
        icon && /* @__PURE__ */ jsxDEV("div", { className: "mr-3", children: icon }, void 0, false, {
          fileName: "/home/project/src/components/NetflixSection.tsx",
          lineNumber: 108,
          columnNumber: 20
        }, this),
        title
      ] }, void 0, true, {
        fileName: "/home/project/src/components/NetflixSection.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this),
      showViewAll && onViewAllClick && /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onViewAllClick,
          className: "text-blue-600 hover:text-blue-800 flex items-center font-medium text-sm sm:text-base transition-colors",
          children: [
            "Ver todas",
            /* @__PURE__ */ jsxDEV(ChevronRight, { className: "ml-1 h-4 w-4" }, void 0, false, {
              fileName: "/home/project/src/components/NetflixSection.tsx",
              lineNumber: 117,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/project/src/components/NetflixSection.tsx",
          lineNumber: 112,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/project/src/components/NetflixSection.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative group", children: [
      canScrollLeft && /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => scroll("left"),
          className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg",
          "aria-label": "Scroll left",
          children: /* @__PURE__ */ jsxDEV(ChevronLeft, { className: "h-5 w-5 sm:h-6 sm:w-6" }, void 0, false, {
            fileName: "/home/project/src/components/NetflixSection.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/components/NetflixSection.tsx",
          lineNumber: 125,
          columnNumber: 9
        },
        this
      ),
      canScrollRight && /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => scroll("right"),
          className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg",
          "aria-label": "Scroll right",
          children: /* @__PURE__ */ jsxDEV(ChevronRight, { className: "h-5 w-5 sm:h-6 sm:w-6" }, void 0, false, {
            fileName: "/home/project/src/components/NetflixSection.tsx",
            lineNumber: 141,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/components/NetflixSection.tsx",
          lineNumber: 136,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          ref: scrollRef,
          onScroll: checkScroll,
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          className: "overflow-x-auto scrollbar-hide -mx-4 sm:mx-0",
          style: { scrollbarWidth: "none", msOverflowStyle: "none" },
          children: /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3 sm:gap-4 px-4 sm:px-0 pb-4", style: { minWidth: "min-content" }, children }, void 0, false, {
            fileName: "/home/project/src/components/NetflixSection.tsx",
            lineNumber: 155,
            columnNumber: 11
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/components/NetflixSection.tsx",
          lineNumber: 146,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/project/src/components/NetflixSection.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/NetflixSection.tsx",
    lineNumber: 105,
    columnNumber: 5
  }, this);
}
_s(NetflixSection, "FINg/nMxO9Vj0aYdHQSZc029zig=");
_c = NetflixSection;
var _c;
$RefreshReg$(_c, "NetflixSection");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/NetflixSection.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/NetflixSection.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LEVBQUVDLFVBQVUsY0FBYyxHQUNyRjVDLFlBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBO0FBQUEsUUFYRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFZQTtBQUFBLFNBcENGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FxQ0E7QUFBQSxPQXRERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBdURBO0FBRUo7QUFBQ0csR0FuSWVOLGdCQUFjO0FBQUFnRCxLQUFkaEQ7QUFBYyxJQUFBZ0Q7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJDaGV2cm9uTGVmdCIsIkNoZXZyb25SaWdodCIsIk5ldGZsaXhTZWN0aW9uIiwidGl0bGUiLCJpY29uIiwiY2hpbGRyZW4iLCJzaG93Vmlld0FsbCIsIm9uVmlld0FsbENsaWNrIiwiX3MiLCJzY3JvbGxSZWYiLCJjYW5TY3JvbGxMZWZ0Iiwic2V0Q2FuU2Nyb2xsTGVmdCIsImNhblNjcm9sbFJpZ2h0Iiwic2V0Q2FuU2Nyb2xsUmlnaHQiLCJ0b3VjaFN0YXJ0WCIsInNldFRvdWNoU3RhcnRYIiwidG91Y2hFbmRYIiwic2V0VG91Y2hFbmRYIiwiaXNEcmFnZ2luZyIsInNldElzRHJhZ2dpbmciLCJjaGVja1Njcm9sbCIsImN1cnJlbnQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNjcm9sbCIsImRpcmVjdGlvbiIsInNjcm9sbEFtb3VudCIsInRhcmdldFNjcm9sbCIsInNjcm9sbFRvIiwibGVmdCIsImJlaGF2aW9yIiwic2V0VGltZW91dCIsImhhbmRsZVRvdWNoU3RhcnQiLCJlIiwidG91Y2hlcyIsImNsaWVudFgiLCJoYW5kbGVUb3VjaE1vdmUiLCJoYW5kbGVUb3VjaEVuZCIsInN3aXBlVGhyZXNob2xkIiwic3dpcGVEaXN0YW5jZSIsIk1hdGgiLCJhYnMiLCJ1c2VFZmZlY3QiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNjcm9sbGJhcldpZHRoIiwibXNPdmVyZmxvd1N0eWxlIiwibWluV2lkdGgiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJOZXRmbGl4U2VjdGlvbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDaGV2cm9uTGVmdCwgQ2hldnJvblJpZ2h0IH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIE5ldGZsaXhTZWN0aW9uUHJvcHMge1xuICB0aXRsZTogc3RyaW5nO1xuICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBzaG93Vmlld0FsbD86IGJvb2xlYW47XG4gIG9uVmlld0FsbENsaWNrPzogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5ldGZsaXhTZWN0aW9uKHtcbiAgdGl0bGUsXG4gIGljb24sXG4gIGNoaWxkcmVuLFxuICBzaG93Vmlld0FsbCA9IGZhbHNlLFxuICBvblZpZXdBbGxDbGlja1xufTogTmV0ZmxpeFNlY3Rpb25Qcm9wcykge1xuICBjb25zdCBzY3JvbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBbY2FuU2Nyb2xsTGVmdCwgc2V0Q2FuU2Nyb2xsTGVmdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjYW5TY3JvbGxSaWdodCwgc2V0Q2FuU2Nyb2xsUmlnaHRdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFt0b3VjaFN0YXJ0WCwgc2V0VG91Y2hTdGFydFhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFt0b3VjaEVuZFgsIHNldFRvdWNoRW5kWF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2lzRHJhZ2dpbmcsIHNldElzRHJhZ2dpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGNoZWNrU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmIChzY3JvbGxSZWYuY3VycmVudCkge1xuICAgICAgY29uc3QgeyBzY3JvbGxMZWZ0LCBzY3JvbGxXaWR0aCwgY2xpZW50V2lkdGggfSA9IHNjcm9sbFJlZi5jdXJyZW50O1xuICAgICAgc2V0Q2FuU2Nyb2xsTGVmdChzY3JvbGxMZWZ0ID4gMCk7XG4gICAgICBzZXRDYW5TY3JvbGxSaWdodChzY3JvbGxMZWZ0IDwgc2Nyb2xsV2lkdGggLSBjbGllbnRXaWR0aCAtIDEwKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2Nyb2xsID0gKGRpcmVjdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JykgPT4ge1xuICAgIGlmIChzY3JvbGxSZWYuY3VycmVudCkge1xuICAgICAgY29uc3Qgc2Nyb2xsQW1vdW50ID0gc2Nyb2xsUmVmLmN1cnJlbnQuY2xpZW50V2lkdGggKiAwLjg7XG4gICAgICBjb25zdCB0YXJnZXRTY3JvbGwgPSBkaXJlY3Rpb24gPT09ICdsZWZ0J1xuICAgICAgICA/IHNjcm9sbFJlZi5jdXJyZW50LnNjcm9sbExlZnQgLSBzY3JvbGxBbW91bnRcbiAgICAgICAgOiBzY3JvbGxSZWYuY3VycmVudC5zY3JvbGxMZWZ0ICsgc2Nyb2xsQW1vdW50O1xuXG4gICAgICBzY3JvbGxSZWYuY3VycmVudC5zY3JvbGxUbyh7XG4gICAgICAgIGxlZnQ6IHRhcmdldFNjcm9sbCxcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KTtcblxuICAgICAgc2V0VGltZW91dChjaGVja1Njcm9sbCwgMzAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG91Y2hTdGFydCA9IChlOiBSZWFjdC5Ub3VjaEV2ZW50KSA9PiB7XG4gICAgc2V0VG91Y2hTdGFydFgoZS50b3VjaGVzWzBdLmNsaWVudFgpO1xuICAgIHNldElzRHJhZ2dpbmcodHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlID0gKGU6IFJlYWN0LlRvdWNoRXZlbnQpID0+IHtcbiAgICBpZiAoIWlzRHJhZ2dpbmcpIHJldHVybjtcbiAgICBzZXRUb3VjaEVuZFgoZS50b3VjaGVzWzBdLmNsaWVudFgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRvdWNoRW5kID0gKCkgPT4ge1xuICAgIGlmICghaXNEcmFnZ2luZykgcmV0dXJuO1xuICAgIHNldElzRHJhZ2dpbmcoZmFsc2UpO1xuXG4gICAgY29uc3Qgc3dpcGVUaHJlc2hvbGQgPSA1MDtcbiAgICBjb25zdCBzd2lwZURpc3RhbmNlID0gdG91Y2hTdGFydFggLSB0b3VjaEVuZFg7XG5cbiAgICBpZiAoTWF0aC5hYnMoc3dpcGVEaXN0YW5jZSkgPiBzd2lwZVRocmVzaG9sZCkge1xuICAgICAgaWYgKHN3aXBlRGlzdGFuY2UgPiAwKSB7XG4gICAgICAgIHNjcm9sbCgncmlnaHQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbCgnbGVmdCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldFRvdWNoU3RhcnRYKDApO1xuICAgIHNldFRvdWNoRW5kWCgwKTtcbiAgfTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNoZWNrU2Nyb2xsKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrU2Nyb2xsKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrU2Nyb2xsKTtcbiAgfSwgW2NoaWxkcmVuXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJtYi0xMlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNFwiPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIHtpY29uICYmIDxkaXYgY2xhc3NOYW1lPVwibXItM1wiPntpY29ufTwvZGl2Pn1cbiAgICAgICAgICB7dGl0bGV9XG4gICAgICAgIDwvaDI+XG4gICAgICAgIHtzaG93Vmlld0FsbCAmJiBvblZpZXdBbGxDbGljayAmJiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25WaWV3QWxsQ2xpY2t9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNjAwIGhvdmVyOnRleHQtYmx1ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIgZm9udC1tZWRpdW0gdGV4dC1zbSBzbTp0ZXh0LWJhc2UgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFZlciB0b2Rhc1xuICAgICAgICAgICAgPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJtbC0xIGgtNCB3LTRcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZ3JvdXBcIj5cbiAgICAgICAgey8qIFNjcm9sbCBMZWZ0IEJ1dHRvbiAqL31cbiAgICAgICAge2NhblNjcm9sbExlZnQgJiYgKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNjcm9sbCgnbGVmdCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0wIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB6LTEwIGJnLWJsYWNrLzcwIGhvdmVyOmJnLWJsYWNrLzkwIHRleHQtd2hpdGUgcC0yIHNtOnAtMyByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCBzaGFkb3ctbGdcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNjcm9sbCBsZWZ0XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q2hldnJvbkxlZnQgY2xhc3NOYW1lPVwiaC01IHctNSBzbTpoLTYgc206dy02XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogU2Nyb2xsIFJpZ2h0IEJ1dHRvbiAqL31cbiAgICAgICAge2NhblNjcm9sbFJpZ2h0ICYmIChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzY3JvbGwoJ3JpZ2h0Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0wIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB6LTEwIGJnLWJsYWNrLzcwIGhvdmVyOmJnLWJsYWNrLzkwIHRleHQtd2hpdGUgcC0yIHNtOnAtMyByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCBzaGFkb3ctbGdcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNjcm9sbCByaWdodFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJoLTUgdy01IHNtOmgtNiBzbTp3LTZcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBTY3JvbGxhYmxlIENvbnRlbnQgKi99XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3Njcm9sbFJlZn1cbiAgICAgICAgICBvblNjcm9sbD17Y2hlY2tTY3JvbGx9XG4gICAgICAgICAgb25Ub3VjaFN0YXJ0PXtoYW5kbGVUb3VjaFN0YXJ0fVxuICAgICAgICAgIG9uVG91Y2hNb3ZlPXtoYW5kbGVUb3VjaE1vdmV9XG4gICAgICAgICAgb25Ub3VjaEVuZD17aGFuZGxlVG91Y2hFbmR9XG4gICAgICAgICAgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvIHNjcm9sbGJhci1oaWRlIC1teC00IHNtOm14LTBcIlxuICAgICAgICAgIHN0eWxlPXt7IHNjcm9sbGJhcldpZHRoOiAnbm9uZScsIG1zT3ZlcmZsb3dTdHlsZTogJ25vbmUnIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTMgc206Z2FwLTQgcHgtNCBzbTpweC0wIHBiLTRcIiBzdHlsZT17eyBtaW5XaWR0aDogJ21pbi1jb250ZW50JyB9fT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG4iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL2NvbXBvbmVudHMvTmV0ZmxpeFNlY3Rpb24udHN4In0=