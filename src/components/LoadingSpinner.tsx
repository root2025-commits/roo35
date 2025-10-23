import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/LoadingSpinner.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/LoadingSpinner.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
export function LoadingSpinner() {
  return /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center items-center py-12", children: /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }, void 0, false, {
      fileName: "/home/project/src/components/LoadingSpinner.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "animate-spin rounded-full h-12 w-12 border-r-2 border-blue-400 absolute top-0 left-0 animation-delay-75" }, void 0, false, {
      fileName: "/home/project/src/components/LoadingSpinner.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/LoadingSpinner.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/components/LoadingSpinner.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
_c = LoadingSpinner;
var _c;
$RefreshReg$(_c, "LoadingSpinner");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/LoadingSpinner.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/LoadingSpinner.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBTVE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFKRCxnQkFBU0EsaUJBQWlCO0FBQy9CLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLDBDQUNiLGlDQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsMkJBQUMsU0FBSSxXQUFVLG9FQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBZ0Y7QUFBQSxJQUNoRix1QkFBQyxTQUFJLFdBQVUsNkdBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUF5SDtBQUFBLE9BRjNIO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FHQSxLQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FLQTtBQUVKO0FBQUNDLEtBVGVEO0FBQWMsSUFBQUM7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbIkxvYWRpbmdTcGlubmVyIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTG9hZGluZ1NwaW5uZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBMb2FkaW5nU3Bpbm5lcigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHB5LTEyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTEyIHctMTIgYm9yZGVyLWItMiBib3JkZXItYmx1ZS02MDBcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtMTIgdy0xMiBib3JkZXItci0yIGJvcmRlci1ibHVlLTQwMCBhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgYW5pbWF0aW9uLWRlbGF5LTc1XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL2NvbXBvbmVudHMvTG9hZGluZ1NwaW5uZXIudHN4In0=