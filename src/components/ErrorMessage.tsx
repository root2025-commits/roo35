import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/ErrorMessage.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/ErrorMessage.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { AlertCircle } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
export function ErrorMessage({ message }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center py-12 px-4", children: [
    /* @__PURE__ */ jsxDEV(AlertCircle, { className: "h-16 w-16 text-red-500 mb-4" }, void 0, false, {
      fileName: "/home/project/src/components/ErrorMessage.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "¡Oops! Algo salió mal" }, void 0, false, {
      fileName: "/home/project/src/components/ErrorMessage.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 text-center max-w-md", children: message }, void 0, false, {
      fileName: "/home/project/src/components/ErrorMessage.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/ErrorMessage.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, this);
}
_c = ErrorMessage;
var _c;
$RefreshReg$(_c, "ErrorMessage");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/ErrorMessage.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/ErrorMessage.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBVU07Ozs7Ozs7Ozs7Ozs7Ozs7QUFUTixTQUFTQSxtQkFBbUI7QUFNckIsZ0JBQVNDLGFBQWEsRUFBRUMsUUFBMkIsR0FBRztBQUMzRCxTQUNFLHVCQUFDLFNBQUksV0FBVSx3REFDYjtBQUFBLDJCQUFDLGVBQVksV0FBVSxpQ0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFvRDtBQUFBLElBQ3BELHVCQUFDLFFBQUcsV0FBVSw0Q0FBMkMscUNBQXpEO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBOEU7QUFBQSxJQUM5RSx1QkFBQyxPQUFFLFdBQVUsc0NBQXNDQSxxQkFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUEyRDtBQUFBLE9BSDdEO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FJQTtBQUVKO0FBQUNDLEtBUmVGO0FBQVksSUFBQUU7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbIkFsZXJ0Q2lyY2xlIiwiRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsIl9jIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkVycm9yTWVzc2FnZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFsZXJ0Q2lyY2xlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIEVycm9yTWVzc2FnZVByb3BzIHtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRXJyb3JNZXNzYWdlKHsgbWVzc2FnZSB9OiBFcnJvck1lc3NhZ2VQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHktMTIgcHgtNFwiPlxuICAgICAgPEFsZXJ0Q2lyY2xlIGNsYXNzTmFtZT1cImgtMTYgdy0xNiB0ZXh0LXJlZC01MDAgbWItNFwiIC8+XG4gICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgbWItMlwiPsKhT29wcyEgQWxnbyBzYWxpw7MgbWFsPC9oMz5cbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDAgdGV4dC1jZW50ZXIgbWF4LXctbWRcIj57bWVzc2FnZX08L3A+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9jb21wb25lbnRzL0Vycm9yTWVzc2FnZS50c3gifQ==