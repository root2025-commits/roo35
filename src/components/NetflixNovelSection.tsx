import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/NetflixNovelSection.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/NetflixNovelSection.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useRef = __vite__cjsImport3_react["useRef"]; const useState = __vite__cjsImport3_react["useState"];
import { ChevronLeft, ChevronRight } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { NovelCard } from "/src/components/NovelCard.tsx";
export function NetflixNovelSection({ novels }) {
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
  }, [novels]);
  if (novels.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "relative group", children: [
    canScrollLeft && /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => scroll("left"),
        className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg",
        "aria-label": "Scroll left",
        children: /* @__PURE__ */ jsxDEV(ChevronLeft, { className: "h-5 w-5 sm:h-6 sm:w-6" }, void 0, false, {
          fileName: "/home/project/src/components/NetflixNovelSection.tsx",
          lineNumber: 120,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/NetflixNovelSection.tsx",
        lineNumber: 115,
        columnNumber: 7
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
          fileName: "/home/project/src/components/NetflixNovelSection.tsx",
          lineNumber: 130,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/NetflixNovelSection.tsx",
        lineNumber: 125,
        columnNumber: 7
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
        className: "overflow-x-auto scrollbar-hide",
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        children: /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4 pb-4", style: { minWidth: "min-content" }, children: novels.map(
          (novel) => /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 w-64", children: /* @__PURE__ */ jsxDEV(NovelCard, { novel }, void 0, false, {
            fileName: "/home/project/src/components/NetflixNovelSection.tsx",
            lineNumber: 146,
            columnNumber: 15
          }, this) }, novel.id, false, {
            fileName: "/home/project/src/components/NetflixNovelSection.tsx",
            lineNumber: 145,
            columnNumber: 11
          }, this)
        ) }, void 0, false, {
          fileName: "/home/project/src/components/NetflixNovelSection.tsx",
          lineNumber: 143,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/NetflixNovelSection.tsx",
        lineNumber: 134,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/project/src/components/NetflixNovelSection.tsx",
    lineNumber: 113,
    columnNumber: 5
  }, this);
}
_s(NetflixNovelSection, "FINg/nMxO9Vj0aYdHQSZc029zig=");
_c = NetflixNovelSection;
var _c;
$RefreshReg$(_c, "NetflixNovelSection");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/NetflixNovelSection.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/NetflixNovelSection.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBb0dVOzs7Ozs7Ozs7Ozs7Ozs7OztBQXBHVixPQUFPQSxTQUFTQyxRQUFRQyxnQkFBZ0I7QUFDeEMsU0FBU0MsYUFBYUMsb0JBQW9CO0FBQzFDLFNBQVNDLGlCQUFpQjtBQW1CbkIsZ0JBQVNDLG9CQUFvQixFQUFFQyxPQUFpQyxHQUFHO0FBQUFDLEtBQUE7QUFDeEUsUUFBTUMsWUFBWVIsT0FBdUIsSUFBSTtBQUM3QyxRQUFNLENBQUNTLGVBQWVDLGdCQUFnQixJQUFJVCxTQUFTLEtBQUs7QUFDeEQsUUFBTSxDQUFDVSxnQkFBZ0JDLGlCQUFpQixJQUFJWCxTQUFTLElBQUk7QUFDekQsUUFBTSxDQUFDWSxhQUFhQyxjQUFjLElBQUliLFNBQVMsQ0FBQztBQUNoRCxRQUFNLENBQUNjLFdBQVdDLFlBQVksSUFBSWYsU0FBUyxDQUFDO0FBQzVDLFFBQU0sQ0FBQ2dCLFlBQVlDLGFBQWEsSUFBSWpCLFNBQVMsS0FBSztBQUVsRCxRQUFNa0IsY0FBY0EsTUFBTTtBQUN4QixRQUFJWCxVQUFVWSxTQUFTO0FBQ3JCLFlBQU0sRUFBRUMsWUFBWUMsYUFBYUMsWUFBWSxJQUFJZixVQUFVWTtBQUMzRFYsdUJBQWlCVyxhQUFhLENBQUM7QUFDL0JULHdCQUFrQlMsYUFBYUMsY0FBY0MsY0FBYyxFQUFFO0FBQUEsSUFDL0Q7QUFBQSxFQUNGO0FBRUEsUUFBTUMsU0FBU0EsQ0FBQ0MsY0FBZ0M7QUFDOUMsUUFBSWpCLFVBQVVZLFNBQVM7QUFDckIsWUFBTU0sZUFBZWxCLFVBQVVZLFFBQVFHLGNBQWM7QUFDckQsWUFBTUksZUFBZUYsY0FBYyxTQUMvQmpCLFVBQVVZLFFBQVFDLGFBQWFLLGVBQy9CbEIsVUFBVVksUUFBUUMsYUFBYUs7QUFFbkNsQixnQkFBVVksUUFBUVEsU0FBUztBQUFBLFFBQ3pCQyxNQUFNRjtBQUFBQSxRQUNORyxVQUFVO0FBQUEsTUFDWixDQUFDO0FBRURDLGlCQUFXWixhQUFhLEdBQUc7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFFQSxRQUFNYSxtQkFBbUJBLENBQUNDLE1BQXdCO0FBQ2hEbkIsbUJBQWVtQixFQUFFQyxRQUFRLENBQUMsRUFBRUMsT0FBTztBQUNuQ2pCLGtCQUFjLElBQUk7QUFBQSxFQUNwQjtBQUVBLFFBQU1rQixrQkFBa0JBLENBQUNILE1BQXdCO0FBQy9DLFFBQUksQ0FBQ2hCLFdBQVk7QUFDakJELGlCQUFhaUIsRUFBRUMsUUFBUSxDQUFDLEVBQUVDLE9BQU87QUFBQSxFQUNuQztBQUVBLFFBQU1FLGlCQUFpQkEsTUFBTTtBQUMzQixRQUFJLENBQUNwQixXQUFZO0FBQ2pCQyxrQkFBYyxLQUFLO0FBRW5CLFVBQU1vQixpQkFBaUI7QUFDdkIsVUFBTUMsZ0JBQWdCMUIsY0FBY0U7QUFFcEMsUUFBSXlCLEtBQUtDLElBQUlGLGFBQWEsSUFBSUQsZ0JBQWdCO0FBQzVDLFVBQUlDLGdCQUFnQixHQUFHO0FBQ3JCZixlQUFPLE9BQU87QUFBQSxNQUNoQixPQUFPO0FBQ0xBLGVBQU8sTUFBTTtBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBRUFWLG1CQUFlLENBQUM7QUFDaEJFLGlCQUFhLENBQUM7QUFBQSxFQUNoQjtBQUVBakIsUUFBTTJDLFVBQVUsTUFBTTtBQUNwQnZCLGdCQUFZO0FBQ1p3QixXQUFPQyxpQkFBaUIsVUFBVXpCLFdBQVc7QUFDN0MsV0FBTyxNQUFNd0IsT0FBT0Usb0JBQW9CLFVBQVUxQixXQUFXO0FBQUEsRUFDL0QsR0FBRyxDQUFDYixNQUFNLENBQUM7QUFFWCxNQUFJQSxPQUFPd0MsV0FBVyxHQUFHO0FBQ3ZCLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSx1QkFBQyxTQUFJLFdBQVUsa0JBQ1pyQztBQUFBQSxxQkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsU0FBUyxNQUFNZSxPQUFPLE1BQU07QUFBQSxRQUM1QixXQUFVO0FBQUEsUUFDVixjQUFXO0FBQUEsUUFFWCxpQ0FBQyxlQUFZLFdBQVUsMkJBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBOEM7QUFBQTtBQUFBLE1BTGhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BO0FBQUEsSUFHRGIsa0JBQ0M7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVMsTUFBTWEsT0FBTyxPQUFPO0FBQUEsUUFDN0IsV0FBVTtBQUFBLFFBQ1YsY0FBVztBQUFBLFFBRVgsaUNBQUMsZ0JBQWEsV0FBVSwyQkFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUErQztBQUFBO0FBQUEsTUFMakQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUE7QUFBQSxJQUdGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxLQUFLaEI7QUFBQUEsUUFDTCxVQUFVVztBQUFBQSxRQUNWLGNBQWNhO0FBQUFBLFFBQ2QsYUFBYUk7QUFBQUEsUUFDYixZQUFZQztBQUFBQSxRQUNaLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRVUsZ0JBQWdCLFFBQVFDLGlCQUFpQixPQUFPO0FBQUEsUUFFekQsaUNBQUMsU0FBSSxXQUFVLG1CQUFrQixPQUFPLEVBQUVDLFVBQVUsY0FBYyxHQUMvRDNDLGlCQUFPNEM7QUFBQUEsVUFBSSxDQUFDQyxVQUNYLHVCQUFDLFNBQW1CLFdBQVUsc0JBQzVCLGlDQUFDLGFBQVUsU0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3QixLQURoQkEsTUFBTUMsSUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFFBQ0QsS0FMSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTUE7QUFBQTtBQUFBLE1BZkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBZ0JBO0FBQUEsT0FyQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXNDQTtBQUVKO0FBQUM3QyxHQWhIZUYscUJBQW1CO0FBQUFnRCxLQUFuQmhEO0FBQW1CLElBQUFnRDtBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsIkNoZXZyb25MZWZ0IiwiQ2hldnJvblJpZ2h0IiwiTm92ZWxDYXJkIiwiTmV0ZmxpeE5vdmVsU2VjdGlvbiIsIm5vdmVscyIsIl9zIiwic2Nyb2xsUmVmIiwiY2FuU2Nyb2xsTGVmdCIsInNldENhblNjcm9sbExlZnQiLCJjYW5TY3JvbGxSaWdodCIsInNldENhblNjcm9sbFJpZ2h0IiwidG91Y2hTdGFydFgiLCJzZXRUb3VjaFN0YXJ0WCIsInRvdWNoRW5kWCIsInNldFRvdWNoRW5kWCIsImlzRHJhZ2dpbmciLCJzZXRJc0RyYWdnaW5nIiwiY2hlY2tTY3JvbGwiLCJjdXJyZW50Iiwic2Nyb2xsTGVmdCIsInNjcm9sbFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzY3JvbGwiLCJkaXJlY3Rpb24iLCJzY3JvbGxBbW91bnQiLCJ0YXJnZXRTY3JvbGwiLCJzY3JvbGxUbyIsImxlZnQiLCJiZWhhdmlvciIsInNldFRpbWVvdXQiLCJoYW5kbGVUb3VjaFN0YXJ0IiwiZSIsInRvdWNoZXMiLCJjbGllbnRYIiwiaGFuZGxlVG91Y2hNb3ZlIiwiaGFuZGxlVG91Y2hFbmQiLCJzd2lwZVRocmVzaG9sZCIsInN3aXBlRGlzdGFuY2UiLCJNYXRoIiwiYWJzIiwidXNlRWZmZWN0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJsZW5ndGgiLCJzY3JvbGxiYXJXaWR0aCIsIm1zT3ZlcmZsb3dTdHlsZSIsIm1pbldpZHRoIiwibWFwIiwibm92ZWwiLCJpZCIsIl9jIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIk5ldGZsaXhOb3ZlbFNlY3Rpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2hldnJvbkxlZnQsIENoZXZyb25SaWdodCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBOb3ZlbENhcmQgfSBmcm9tICcuL05vdmVsQ2FyZCc7XG5cbmludGVyZmFjZSBOb3ZlbCB7XG4gIGlkOiBudW1iZXI7XG4gIHRpdHVsbzogc3RyaW5nO1xuICBnZW5lcm86IHN0cmluZztcbiAgY2FwaXR1bG9zOiBudW1iZXI7XG4gIGHDsW86IG51bWJlcjtcbiAgZGVzY3JpcGNpb24/OiBzdHJpbmc7XG4gIHBheW1lbnRUeXBlPzogJ2Nhc2gnIHwgJ3RyYW5zZmVyJztcbiAgcGFpcz86IHN0cmluZztcbiAgaW1hZ2VuPzogc3RyaW5nO1xuICBlc3RhZG8/OiAndHJhbnNtaXNpb24nIHwgJ2ZpbmFsaXphZGEnO1xufVxuXG5pbnRlcmZhY2UgTmV0ZmxpeE5vdmVsU2VjdGlvblByb3BzIHtcbiAgbm92ZWxzOiBOb3ZlbFtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTmV0ZmxpeE5vdmVsU2VjdGlvbih7IG5vdmVscyB9OiBOZXRmbGl4Tm92ZWxTZWN0aW9uUHJvcHMpIHtcbiAgY29uc3Qgc2Nyb2xsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgW2NhblNjcm9sbExlZnQsIHNldENhblNjcm9sbExlZnRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY2FuU2Nyb2xsUmlnaHQsIHNldENhblNjcm9sbFJpZ2h0XSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbdG91Y2hTdGFydFgsIHNldFRvdWNoU3RhcnRYXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbdG91Y2hFbmRYLCBzZXRUb3VjaEVuZFhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtpc0RyYWdnaW5nLCBzZXRJc0RyYWdnaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBjaGVja1Njcm9sbCA9ICgpID0+IHtcbiAgICBpZiAoc2Nyb2xsUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsV2lkdGgsIGNsaWVudFdpZHRoIH0gPSBzY3JvbGxSZWYuY3VycmVudDtcbiAgICAgIHNldENhblNjcm9sbExlZnQoc2Nyb2xsTGVmdCA+IDApO1xuICAgICAgc2V0Q2FuU2Nyb2xsUmlnaHQoc2Nyb2xsTGVmdCA8IHNjcm9sbFdpZHRoIC0gY2xpZW50V2lkdGggLSAxMCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNjcm9sbCA9IChkaXJlY3Rpb246ICdsZWZ0JyB8ICdyaWdodCcpID0+IHtcbiAgICBpZiAoc2Nyb2xsUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IHNjcm9sbEFtb3VudCA9IHNjcm9sbFJlZi5jdXJyZW50LmNsaWVudFdpZHRoICogMC44O1xuICAgICAgY29uc3QgdGFyZ2V0U2Nyb2xsID0gZGlyZWN0aW9uID09PSAnbGVmdCdcbiAgICAgICAgPyBzY3JvbGxSZWYuY3VycmVudC5zY3JvbGxMZWZ0IC0gc2Nyb2xsQW1vdW50XG4gICAgICAgIDogc2Nyb2xsUmVmLmN1cnJlbnQuc2Nyb2xsTGVmdCArIHNjcm9sbEFtb3VudDtcblxuICAgICAgc2Nyb2xsUmVmLmN1cnJlbnQuc2Nyb2xsVG8oe1xuICAgICAgICBsZWZ0OiB0YXJnZXRTY3JvbGwsXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSk7XG5cbiAgICAgIHNldFRpbWVvdXQoY2hlY2tTY3JvbGwsIDMwMCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRvdWNoU3RhcnQgPSAoZTogUmVhY3QuVG91Y2hFdmVudCkgPT4ge1xuICAgIHNldFRvdWNoU3RhcnRYKGUudG91Y2hlc1swXS5jbGllbnRYKTtcbiAgICBzZXRJc0RyYWdnaW5nKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRvdWNoTW92ZSA9IChlOiBSZWFjdC5Ub3VjaEV2ZW50KSA9PiB7XG4gICAgaWYgKCFpc0RyYWdnaW5nKSByZXR1cm47XG4gICAgc2V0VG91Y2hFbmRYKGUudG91Y2hlc1swXS5jbGllbnRYKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVUb3VjaEVuZCA9ICgpID0+IHtcbiAgICBpZiAoIWlzRHJhZ2dpbmcpIHJldHVybjtcbiAgICBzZXRJc0RyYWdnaW5nKGZhbHNlKTtcblxuICAgIGNvbnN0IHN3aXBlVGhyZXNob2xkID0gNTA7XG4gICAgY29uc3Qgc3dpcGVEaXN0YW5jZSA9IHRvdWNoU3RhcnRYIC0gdG91Y2hFbmRYO1xuXG4gICAgaWYgKE1hdGguYWJzKHN3aXBlRGlzdGFuY2UpID4gc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgIGlmIChzd2lwZURpc3RhbmNlID4gMCkge1xuICAgICAgICBzY3JvbGwoJ3JpZ2h0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGwoJ2xlZnQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRUb3VjaFN0YXJ0WCgwKTtcbiAgICBzZXRUb3VjaEVuZFgoMCk7XG4gIH07XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjaGVja1Njcm9sbCgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGVja1Njcm9sbCk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGVja1Njcm9sbCk7XG4gIH0sIFtub3ZlbHNdKTtcblxuICBpZiAobm92ZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGdyb3VwXCI+XG4gICAgICB7Y2FuU2Nyb2xsTGVmdCAmJiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzY3JvbGwoJ2xlZnQnKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTAgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHotMTAgYmctYmxhY2svNzAgaG92ZXI6YmctYmxhY2svOTAgdGV4dC13aGl0ZSBwLTIgc206cC0zIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHNoYWRvdy1sZ1wiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIlNjcm9sbCBsZWZ0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxDaGV2cm9uTGVmdCBjbGFzc05hbWU9XCJoLTUgdy01IHNtOmgtNiBzbTp3LTZcIiAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICl9XG5cbiAgICAgIHtjYW5TY3JvbGxSaWdodCAmJiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzY3JvbGwoJ3JpZ2h0Jyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMCB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgei0xMCBiZy1ibGFjay83MCBob3ZlcjpiZy1ibGFjay85MCB0ZXh0LXdoaXRlIHAtMiBzbTpwLTMgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgc2hhZG93LWxnXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPVwiU2Nyb2xsIHJpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwiaC01IHctNSBzbTpoLTYgc206dy02XCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApfVxuXG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17c2Nyb2xsUmVmfVxuICAgICAgICBvblNjcm9sbD17Y2hlY2tTY3JvbGx9XG4gICAgICAgIG9uVG91Y2hTdGFydD17aGFuZGxlVG91Y2hTdGFydH1cbiAgICAgICAgb25Ub3VjaE1vdmU9e2hhbmRsZVRvdWNoTW92ZX1cbiAgICAgICAgb25Ub3VjaEVuZD17aGFuZGxlVG91Y2hFbmR9XG4gICAgICAgIGNsYXNzTmFtZT1cIm92ZXJmbG93LXgtYXV0byBzY3JvbGxiYXItaGlkZVwiXG4gICAgICAgIHN0eWxlPXt7IHNjcm9sbGJhcldpZHRoOiAnbm9uZScsIG1zT3ZlcmZsb3dTdHlsZTogJ25vbmUnIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNCBwYi00XCIgc3R5bGU9e3sgbWluV2lkdGg6ICdtaW4tY29udGVudCcgfX0+XG4gICAgICAgICAge25vdmVscy5tYXAoKG5vdmVsKSA9PiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17bm92ZWwuaWR9IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgdy02NFwiPlxuICAgICAgICAgICAgICA8Tm92ZWxDYXJkIG5vdmVsPXtub3ZlbH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9jb21wb25lbnRzL05ldGZsaXhOb3ZlbFNlY3Rpb24udHN4In0=