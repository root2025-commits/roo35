import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/Toast.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/Toast.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useEffect = __vite__cjsImport3_react["useEffect"]; const useState = __vite__cjsImport3_react["useState"];
import { CheckCircle, X, Trash2, Plus } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
export function Toast({ message, type, isVisible, onClose }) {
  _s();
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300);
      }, 3e3);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  if (!isVisible && !isAnimating) return null;
  return /* @__PURE__ */ jsxDEV("div", { className: `fixed top-20 right-4 z-50 transform transition-all duration-500 ${isAnimating ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}`, children: /* @__PURE__ */ jsxDEV("div", { className: `flex items-center p-4 rounded-2xl shadow-2xl max-w-sm backdrop-blur-sm border-2 ${type === "success" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300" : "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-300"} animate-bounce`, children: [
    /* @__PURE__ */ jsxDEV("div", { className: `flex-shrink-0 mr-3 p-2 rounded-full ${type === "success" ? "bg-white/20" : "bg-white/20"} animate-pulse`, children: type === "success" ? message.includes("agregado") ? /* @__PURE__ */ jsxDEV(Plus, { className: "h-5 w-5" }, void 0, false, {
      fileName: "/home/project/src/components/Toast.tsx",
      lineNumber: 61,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDEV(CheckCircle, { className: "h-5 w-5" }, void 0, false, {
      fileName: "/home/project/src/components/Toast.tsx",
      lineNumber: 63,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDEV(Trash2, { className: "h-5 w-5" }, void 0, false, {
      fileName: "/home/project/src/components/Toast.tsx",
      lineNumber: 66,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/Toast.tsx",
      lineNumber: 56,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-sm", children: message }, void 0, false, {
      fileName: "/home/project/src/components/Toast.tsx",
      lineNumber: 70,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/Toast.tsx",
      lineNumber: 69,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => {
          setIsAnimating(false);
          setTimeout(onClose, 300);
        },
        className: "flex-shrink-0 ml-3 hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:scale-110",
        children: /* @__PURE__ */ jsxDEV(X, { className: "h-4 w-4" }, void 0, false, {
          fileName: "/home/project/src/components/Toast.tsx",
          lineNumber: 79,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/Toast.tsx",
        lineNumber: 72,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: `absolute bottom-0 left-0 h-1 rounded-b-2xl ${type === "success" ? "bg-white/30" : "bg-white/30"} animate-pulse`, children: /* @__PURE__ */ jsxDEV("div", { className: `h-full rounded-b-2xl ${type === "success" ? "bg-white" : "bg-white"} animate-[shrink_3s_linear_forwards]` }, void 0, false, {
      fileName: "/home/project/src/components/Toast.tsx",
      lineNumber: 86,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/Toast.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/Toast.tsx",
    lineNumber: 51,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/components/Toast.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}
_s(Toast, "U13FD0PO4FR4rREA5Sq0cx8yDCA=");
_c = Toast;
var _c;
$RefreshReg$(_c, "Toast");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/Toast.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/Toast.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBeUNjOzs7Ozs7Ozs7Ozs7Ozs7OztBQXpDZCxTQUFnQkEsV0FBV0MsZ0JBQWdCO0FBQzNDLFNBQVNDLGFBQXNCQyxHQUFpQkMsUUFBUUMsWUFBWTtBQVM3RCxnQkFBU0MsTUFBTSxFQUFFQyxTQUFTQyxNQUFNQyxXQUFXQyxRQUFvQixHQUFHO0FBQUFDLEtBQUE7QUFDdkUsUUFBTSxDQUFDQyxhQUFhQyxjQUFjLElBQUlaLFNBQVMsS0FBSztBQUVwREQsWUFBVSxNQUFNO0FBQ2QsUUFBSVMsV0FBVztBQUNiSSxxQkFBZSxJQUFJO0FBQ25CLFlBQU1DLFFBQVFDLFdBQVcsTUFBTTtBQUM3QkYsdUJBQWUsS0FBSztBQUNwQkUsbUJBQVdMLFNBQVMsR0FBRztBQUFBLE1BQ3pCLEdBQUcsR0FBSTtBQUVQLGFBQU8sTUFBTU0sYUFBYUYsS0FBSztBQUFBLElBQ2pDO0FBQUEsRUFDRixHQUFHLENBQUNMLFdBQVdDLE9BQU8sQ0FBQztBQUV2QixNQUFJLENBQUNELGFBQWEsQ0FBQ0csWUFBYSxRQUFPO0FBRXZDLFNBQ0UsdUJBQUMsU0FBSSxXQUFXLG1FQUNkQSxjQUFjLHdDQUF3QyxxQ0FBcUMsSUFFM0YsaUNBQUMsU0FBSSxXQUFXLG1GQUNkSixTQUFTLFlBQ0wsK0VBQ0EscUVBQXFFLG1CQUV6RTtBQUFBLDJCQUFDLFNBQUksV0FBVyx1Q0FDZEEsU0FBUyxZQUFZLGdCQUFnQixhQUFhLGtCQUVqREEsbUJBQVMsWUFDUkQsUUFBUVUsU0FBUyxVQUFVLElBQ3pCLHVCQUFDLFFBQUssV0FBVSxhQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQXlCLElBRXpCLHVCQUFDLGVBQVksV0FBVSxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQWdDLElBR2xDLHVCQUFDLFVBQU8sV0FBVSxhQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQTJCLEtBVi9CO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FZQTtBQUFBLElBQ0EsdUJBQUMsU0FBSSxXQUFVLFVBQ2IsaUNBQUMsT0FBRSxXQUFVLHlCQUF5QlYscUJBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBOEMsS0FEaEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUVBO0FBQUEsSUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsU0FBUyxNQUFNO0FBQ2JNLHlCQUFlLEtBQUs7QUFDcEJFLHFCQUFXTCxTQUFTLEdBQUc7QUFBQSxRQUN6QjtBQUFBLFFBQ0EsV0FBVTtBQUFBLFFBRVYsaUNBQUMsS0FBRSxXQUFVLGFBQWI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFzQjtBQUFBO0FBQUEsTUFQeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUUE7QUFBQSxJQUdBLHVCQUFDLFNBQUksV0FBVyw4Q0FDZEYsU0FBUyxZQUFZLGdCQUFnQixhQUFhLGtCQUVsRCxpQ0FBQyxTQUFJLFdBQVcsd0JBQ2RBLFNBQVMsWUFBWSxhQUFhLFVBQVUsMENBRDlDO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FFdUMsS0FMekM7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQU1BO0FBQUEsT0F0Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXVDQSxLQTFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMkNBO0FBRUo7QUFBQ0csR0EvRGVMLE9BQUs7QUFBQVksS0FBTFo7QUFBSyxJQUFBWTtBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJDaGVja0NpcmNsZSIsIlgiLCJUcmFzaDIiLCJQbHVzIiwiVG9hc3QiLCJtZXNzYWdlIiwidHlwZSIsImlzVmlzaWJsZSIsIm9uQ2xvc2UiLCJfcyIsImlzQW5pbWF0aW5nIiwic2V0SXNBbmltYXRpbmciLCJ0aW1lciIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJpbmNsdWRlcyIsIl9jIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIlRvYXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENoZWNrQ2lyY2xlLCBYQ2lyY2xlLCBYLCBTaG9wcGluZ0NhcnQsIFRyYXNoMiwgUGx1cyB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBUb2FzdFByb3BzIHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB0eXBlOiAnc3VjY2VzcycgfCAnZXJyb3InO1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2FzdCh7IG1lc3NhZ2UsIHR5cGUsIGlzVmlzaWJsZSwgb25DbG9zZSB9OiBUb2FzdFByb3BzKSB7XG4gIGNvbnN0IFtpc0FuaW1hdGluZywgc2V0SXNBbmltYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgc2V0SXNBbmltYXRpbmcodHJ1ZSk7XG4gICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRJc0FuaW1hdGluZyhmYWxzZSk7XG4gICAgICAgIHNldFRpbWVvdXQob25DbG9zZSwgMzAwKTtcbiAgICAgIH0sIDMwMDApO1xuXG4gICAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gIH0sIFtpc1Zpc2libGUsIG9uQ2xvc2VdKTtcblxuICBpZiAoIWlzVmlzaWJsZSAmJiAhaXNBbmltYXRpbmcpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BmaXhlZCB0b3AtMjAgcmlnaHQtNCB6LTUwIHRyYW5zZm9ybSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgJHtcbiAgICAgIGlzQW5pbWF0aW5nID8gJ3RyYW5zbGF0ZS14LTAgb3BhY2l0eS0xMDAgc2NhbGUtMTAwJyA6ICd0cmFuc2xhdGUteC1mdWxsIG9wYWNpdHktMCBzY2FsZS05NSdcbiAgICB9YH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIHAtNCByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIG1heC13LXNtIGJhY2tkcm9wLWJsdXItc20gYm9yZGVyLTIgJHtcbiAgICAgICAgdHlwZSA9PT0gJ3N1Y2Nlc3MnIFxuICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdG8tZW1lcmFsZC01MDAgdGV4dC13aGl0ZSBib3JkZXItZ3JlZW4tMzAwJyBcbiAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTUwMCB0by1waW5rLTUwMCB0ZXh0LXdoaXRlIGJvcmRlci1yZWQtMzAwJ1xuICAgICAgfSBhbmltYXRlLWJvdW5jZWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXgtc2hyaW5rLTAgbXItMyBwLTIgcm91bmRlZC1mdWxsICR7XG4gICAgICAgICAgdHlwZSA9PT0gJ3N1Y2Nlc3MnID8gJ2JnLXdoaXRlLzIwJyA6ICdiZy13aGl0ZS8yMCdcbiAgICAgICAgfSBhbmltYXRlLXB1bHNlYH0+XG4gICAgICAgICAge3R5cGUgPT09ICdzdWNjZXNzJyA/IChcbiAgICAgICAgICAgIG1lc3NhZ2UuaW5jbHVkZXMoJ2FncmVnYWRvJykgPyAoXG4gICAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPlxuICAgICAgICAgICAgKVxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbVwiPnttZXNzYWdlfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRJc0FuaW1hdGluZyhmYWxzZSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KG9uQ2xvc2UsIDMwMCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LXNocmluay0wIG1sLTMgaG92ZXI6Ymctd2hpdGUvMjAgcm91bmRlZC1mdWxsIHAtMiB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6c2NhbGUtMTEwXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxYIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBBbmltYXRlZCBwcm9ncmVzcyBiYXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIGgtMSByb3VuZGVkLWItMnhsICR7XG4gICAgICAgICAgdHlwZSA9PT0gJ3N1Y2Nlc3MnID8gJ2JnLXdoaXRlLzMwJyA6ICdiZy13aGl0ZS8zMCdcbiAgICAgICAgfSBhbmltYXRlLXB1bHNlYH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BoLWZ1bGwgcm91bmRlZC1iLTJ4bCAke1xuICAgICAgICAgICAgdHlwZSA9PT0gJ3N1Y2Nlc3MnID8gJ2JnLXdoaXRlJyA6ICdiZy13aGl0ZSdcbiAgICAgICAgICB9IGFuaW1hdGUtW3Nocmlua18zc19saW5lYXJfZm9yd2FyZHNdYH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL2NvbXBvbmVudHMvVG9hc3QudHN4In0=