import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/OptimizedImage.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/OptimizedImage.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"]; const useRef = __vite__cjsImport3_react["useRef"]; const useEffect = __vite__cjsImport3_react["useEffect"];
export function OptimizedImage({
  src,
  alt,
  className = "",
  fallbackSrc = "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop&crop=center",
  lazy = true,
  onLoad,
  onError
}) {
  _s();
  const [imageSrc, setImageSrc] = useState(lazy ? "" : src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (!lazy) {
      setImageSrc(src);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, [src, lazy]);
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setImageSrc(fallbackSrc);
    onError?.();
  };
  return /* @__PURE__ */ jsxDEV("div", { className: `relative overflow-hidden ${className}`, children: [
    isLoading && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" }, void 0, false, {
      fileName: "/home/project/src/components/OptimizedImage.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/OptimizedImage.tsx",
      lineNumber: 87,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "img",
      {
        ref: imgRef,
        src: imageSrc,
        alt,
        className: `w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`,
        onLoad: handleLoad,
        onError: handleError,
        loading: lazy ? "lazy" : "eager"
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/OptimizedImage.tsx",
        lineNumber: 92,
        columnNumber: 7
      },
      this
    ),
    hasError && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gray-100 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("span", { className: "text-gray-400 text-sm", children: "Error al cargar imagen" }, void 0, false, {
      fileName: "/home/project/src/components/OptimizedImage.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/OptimizedImage.tsx",
      lineNumber: 105,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/OptimizedImage.tsx",
    lineNumber: 85,
    columnNumber: 5
  }, this);
}
_s(OptimizedImage, "5eOrpWaFrYr0b0sTo3uQo6E4DY4=");
_c = OptimizedImage;
var _c;
$RefreshReg$(_c, "OptimizedImage");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/OptimizedImage.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/OptimizedImage.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBb0VVOzs7Ozs7Ozs7Ozs7Ozs7OztBQXBFVixTQUFnQkEsVUFBVUMsUUFBUUMsaUJBQWlCO0FBWTVDLGdCQUFTQyxlQUFlO0FBQUEsRUFDN0JDO0FBQUFBLEVBQ0FDO0FBQUFBLEVBQ0FDLFlBQVk7QUFBQSxFQUNaQyxjQUFjO0FBQUEsRUFDZEMsT0FBTztBQUFBLEVBQ1BDO0FBQUFBLEVBQ0FDO0FBQ21CLEdBQUc7QUFBQUMsS0FBQTtBQUN0QixRQUFNLENBQUNDLFVBQVVDLFdBQVcsSUFBSWIsU0FBU1EsT0FBTyxLQUFLSixHQUFHO0FBQ3hELFFBQU0sQ0FBQ1UsV0FBV0MsWUFBWSxJQUFJZixTQUFTLElBQUk7QUFDL0MsUUFBTSxDQUFDZ0IsVUFBVUMsV0FBVyxJQUFJakIsU0FBUyxLQUFLO0FBQzlDLFFBQU1rQixTQUFTakIsT0FBeUIsSUFBSTtBQUU1Q0MsWUFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDTSxNQUFNO0FBQ1RLLGtCQUFZVCxHQUFHO0FBQ2Y7QUFBQSxJQUNGO0FBRUEsVUFBTWUsV0FBVyxJQUFJQztBQUFBQSxNQUNuQixDQUFDQyxZQUFZO0FBQ1hBLGdCQUFRQyxRQUFRLENBQUFDLFVBQVM7QUFDdkIsY0FBSUEsTUFBTUMsZ0JBQWdCO0FBQ3hCWCx3QkFBWVQsR0FBRztBQUNmZSxxQkFBU00sVUFBVUYsTUFBTUcsTUFBTTtBQUFBLFVBQ2pDO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0EsRUFBRUMsV0FBVyxJQUFJO0FBQUEsSUFDbkI7QUFFQSxRQUFJVCxPQUFPVSxTQUFTO0FBQ2xCVCxlQUFTVSxRQUFRWCxPQUFPVSxPQUFPO0FBQUEsSUFDakM7QUFFQSxXQUFPLE1BQU1ULFNBQVNXLFdBQVc7QUFBQSxFQUNuQyxHQUFHLENBQUMxQixLQUFLSSxJQUFJLENBQUM7QUFFZCxRQUFNdUIsYUFBYUEsTUFBTTtBQUN2QmhCLGlCQUFhLEtBQUs7QUFDbEJFLGdCQUFZLEtBQUs7QUFDakJSLGFBQVM7QUFBQSxFQUNYO0FBRUEsUUFBTXVCLGNBQWNBLE1BQU07QUFDeEJqQixpQkFBYSxLQUFLO0FBQ2xCRSxnQkFBWSxJQUFJO0FBQ2hCSixnQkFBWU4sV0FBVztBQUN2QkcsY0FBVTtBQUFBLEVBQ1o7QUFFQSxTQUNFLHVCQUFDLFNBQUksV0FBVyw0QkFBNEJKLFNBQVMsSUFDbERRO0FBQUFBLGlCQUNDLHVCQUFDLFNBQUksV0FBVSwrRUFDYixpQ0FBQyxTQUFJLFdBQVUsa0ZBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUE4RixLQURoRztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRUE7QUFBQSxJQUdGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxLQUFLSTtBQUFBQSxRQUNMLEtBQUtOO0FBQUFBLFFBQ0w7QUFBQSxRQUNBLFdBQVcsOERBQ1RFLFlBQVksY0FBYyxhQUFhLElBQ3JDUixTQUFTO0FBQUEsUUFDYixRQUFReUI7QUFBQUEsUUFDUixTQUFTQztBQUFBQSxRQUNULFNBQVN4QixPQUFPLFNBQVM7QUFBQTtBQUFBLE1BVDNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVNtQztBQUFBLElBR2xDUSxZQUNDLHVCQUFDLFNBQUksV0FBVSxpRUFDYixpQ0FBQyxVQUFLLFdBQVUseUJBQXdCLHNDQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQThELEtBRGhFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FFQTtBQUFBLE9BdEJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F3QkE7QUFFSjtBQUFDTCxHQS9FZVIsZ0JBQWM7QUFBQThCLEtBQWQ5QjtBQUFjLElBQUE4QjtBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJPcHRpbWl6ZWRJbWFnZSIsInNyYyIsImFsdCIsImNsYXNzTmFtZSIsImZhbGxiYWNrU3JjIiwibGF6eSIsIm9uTG9hZCIsIm9uRXJyb3IiLCJfcyIsImltYWdlU3JjIiwic2V0SW1hZ2VTcmMiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJoYXNFcnJvciIsInNldEhhc0Vycm9yIiwiaW1nUmVmIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJmb3JFYWNoIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsInVub2JzZXJ2ZSIsInRhcmdldCIsInRocmVzaG9sZCIsImN1cnJlbnQiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsImhhbmRsZUxvYWQiLCJoYW5kbGVFcnJvciIsIl9jIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIk9wdGltaXplZEltYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgT3B0aW1pemVkSW1hZ2VQcm9wcyB7XG4gIHNyYzogc3RyaW5nO1xuICBhbHQ6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBmYWxsYmFja1NyYz86IHN0cmluZztcbiAgbGF6eT86IGJvb2xlYW47XG4gIG9uTG9hZD86ICgpID0+IHZvaWQ7XG4gIG9uRXJyb3I/OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gT3B0aW1pemVkSW1hZ2Uoe1xuICBzcmMsXG4gIGFsdCxcbiAgY2xhc3NOYW1lID0gJycsXG4gIGZhbGxiYWNrU3JjID0gJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDQwNDA0NjUzMzI1LWFiMTI3ZDQ5YWJjMT93PTUwMCZoPTc1MCZmaXQ9Y3JvcCZjcm9wPWNlbnRlcicsXG4gIGxhenkgPSB0cnVlLFxuICBvbkxvYWQsXG4gIG9uRXJyb3Jcbn06IE9wdGltaXplZEltYWdlUHJvcHMpIHtcbiAgY29uc3QgW2ltYWdlU3JjLCBzZXRJbWFnZVNyY10gPSB1c2VTdGF0ZShsYXp5ID8gJycgOiBzcmMpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtoYXNFcnJvciwgc2V0SGFzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBpbWdSZWYgPSB1c2VSZWY8SFRNTEltYWdlRWxlbWVudD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWxhenkpIHtcbiAgICAgIHNldEltYWdlU3JjKHNyYyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgc2V0SW1hZ2VTcmMoc3JjKTtcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgeyB0aHJlc2hvbGQ6IDAuMSB9XG4gICAgKTtcblxuICAgIGlmIChpbWdSZWYuY3VycmVudCkge1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpbWdSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfSwgW3NyYywgbGF6eV0pO1xuXG4gIGNvbnN0IGhhbmRsZUxvYWQgPSAoKSA9PiB7XG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICBzZXRIYXNFcnJvcihmYWxzZSk7XG4gICAgb25Mb2FkPy4oKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVFcnJvciA9ICgpID0+IHtcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIHNldEhhc0Vycm9yKHRydWUpO1xuICAgIHNldEltYWdlU3JjKGZhbGxiYWNrU3JjKTtcbiAgICBvbkVycm9yPy4oKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuICR7Y2xhc3NOYW1lfWB9PlxuICAgICAge2lzTG9hZGluZyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmF5LTIwMCBhbmltYXRlLXB1bHNlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IGJvcmRlci0yIGJvcmRlci1ncmF5LTMwMCBib3JkZXItdC1ibHVlLTUwMCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIFxuICAgICAgPGltZ1xuICAgICAgICByZWY9e2ltZ1JlZn1cbiAgICAgICAgc3JjPXtpbWFnZVNyY31cbiAgICAgICAgYWx0PXthbHR9XG4gICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICBpc0xvYWRpbmcgPyAnb3BhY2l0eS0wJyA6ICdvcGFjaXR5LTEwMCdcbiAgICAgICAgfSAke2NsYXNzTmFtZX1gfVxuICAgICAgICBvbkxvYWQ9e2hhbmRsZUxvYWR9XG4gICAgICAgIG9uRXJyb3I9e2hhbmRsZUVycm9yfVxuICAgICAgICBsb2FkaW5nPXtsYXp5ID8gJ2xhenknIDogJ2VhZ2VyJ31cbiAgICAgIC8+XG4gICAgICBcbiAgICAgIHtoYXNFcnJvciAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmF5LTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1zbVwiPkVycm9yIGFsIGNhcmdhciBpbWFnZW48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL2NvbXBvbmVudHMvT3B0aW1pemVkSW1hZ2UudHN4In0=