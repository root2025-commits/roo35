import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/VideoPlayer.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/VideoPlayer.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"];
import { Play } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
export function VideoPlayer({ videoKey, title }) {
  _s();
  const [hasError, setHasError] = useState(false);
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg`;
  const openInYouTube = () => {
    window.open(youtubeUrl, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden group", children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: "absolute inset-0 bg-cover bg-center",
        style: { backgroundImage: `url(${thumbnailUrl})` }
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/VideoPlayer.tsx",
        lineNumber: 41,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/60 hover:bg-black/40 transition-colors" }, void 0, false, {
      fileName: "/home/project/src/components/VideoPlayer.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: openInYouTube,
        className: "absolute top-4 right-4 bg-red-600 hover:bg-red-700 rounded-full p-3 transition-all hover:scale-110 shadow-2xl z-10",
        title: "Ver en YouTube",
        children: /* @__PURE__ */ jsxDEV(Play, { className: "h-5 w-5 text-white ml-0.5" }, void 0, false, {
          fileName: "/home/project/src/components/VideoPlayer.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/VideoPlayer.tsx",
        lineNumber: 48,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center text-white p-6", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-semibold mb-2", children: title }, void 0, false, {
        fileName: "/home/project/src/components/VideoPlayer.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm opacity-90 mb-4", children: "Haz clic en el botón de reproducir para ver en YouTube" }, void 0, false, {
        fileName: "/home/project/src/components/VideoPlayer.tsx",
        lineNumber: 59,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/VideoPlayer.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/VideoPlayer.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/VideoPlayer.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}
_s(VideoPlayer, "0lWSx5YqYPOl7PiOJe/TIAtHv6A=");
_c = VideoPlayer;
var _c;
$RefreshReg$(_c, "VideoPlayer");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/VideoPlayer.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/VideoPlayer.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBcUJNOzs7Ozs7Ozs7Ozs7Ozs7OztBQXJCTixTQUFnQkEsZ0JBQWdCO0FBQ2hDLFNBQXVCQyxZQUF5QjtBQU96QyxnQkFBU0MsWUFBWSxFQUFFQyxVQUFVQyxNQUF3QixHQUFHO0FBQUFDLEtBQUE7QUFDakUsUUFBTSxDQUFDQyxVQUFVQyxXQUFXLElBQUlQLFNBQVMsS0FBSztBQUU5QyxRQUFNUSxhQUFhLG1DQUFtQ0wsUUFBUTtBQUM5RCxRQUFNTSxlQUFlLDhCQUE4Qk4sUUFBUTtBQUUzRCxRQUFNTyxnQkFBZ0JBLE1BQU07QUFDMUJDLFdBQU9DLEtBQUtKLFlBQVksVUFBVSxxQkFBcUI7QUFBQSxFQUN6RDtBQUdBLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLDZFQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRUssaUJBQWlCLE9BQU9KLFlBQVksSUFBSTtBQUFBO0FBQUEsTUFGbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBRXFEO0FBQUEsSUFFckQsdUJBQUMsU0FBSSxXQUFVLHNFQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBaUY7QUFBQSxJQUdqRjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsU0FBU0M7QUFBQUEsUUFDVCxXQUFVO0FBQUEsUUFDVixPQUFNO0FBQUEsUUFFTixpQ0FBQyxRQUFLLFdBQVUsK0JBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBMkM7QUFBQTtBQUFBLE1BTDdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1BO0FBQUEsSUFFQSx1QkFBQyxTQUFJLFdBQVUsOERBQ2IsaUNBQUMsU0FBSSxXQUFVLDhCQUNiO0FBQUEsNkJBQUMsUUFBRyxXQUFVLDhCQUE4Qk4sbUJBQTVDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBa0Q7QUFBQSxNQUNsRCx1QkFBQyxPQUFFLFdBQVUsMkJBQXlCLHNFQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxTQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FLQSxLQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FPQTtBQUFBLE9BdkJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F3QkE7QUFFSjtBQUFDQyxHQXRDZUgsYUFBVztBQUFBWSxLQUFYWjtBQUFXLElBQUFZO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIlBsYXkiLCJWaWRlb1BsYXllciIsInZpZGVvS2V5IiwidGl0bGUiLCJfcyIsImhhc0Vycm9yIiwic2V0SGFzRXJyb3IiLCJ5b3V0dWJlVXJsIiwidGh1bWJuYWlsVXJsIiwib3BlbkluWW91VHViZSIsIndpbmRvdyIsIm9wZW4iLCJiYWNrZ3JvdW5kSW1hZ2UiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJWaWRlb1BsYXllci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRXh0ZXJuYWxMaW5rLCBQbGF5LCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBWaWRlb1BsYXllclByb3BzIHtcbiAgdmlkZW9LZXk6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFZpZGVvUGxheWVyKHsgdmlkZW9LZXksIHRpdGxlIH06IFZpZGVvUGxheWVyUHJvcHMpIHtcbiAgY29uc3QgW2hhc0Vycm9yLCBzZXRIYXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgeW91dHViZVVybCA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSR7dmlkZW9LZXl9YDtcbiAgY29uc3QgdGh1bWJuYWlsVXJsID0gYGh0dHBzOi8vaW1nLnlvdXR1YmUuY29tL3ZpLyR7dmlkZW9LZXl9L21heHJlc2RlZmF1bHQuanBnYDtcblxuICBjb25zdCBvcGVuSW5Zb3VUdWJlID0gKCkgPT4ge1xuICAgIHdpbmRvdy5vcGVuKHlvdXR1YmVVcmwsICdfYmxhbmsnLCAnbm9vcGVuZXIsbm9yZWZlcnJlcicpO1xuICB9O1xuXG4gIC8vIFNpZW1wcmUgbW9zdHJhciBsYSBvcGNpw7NuIGRlIGFicmlyIGVuIFlvdVR1YmUgZGViaWRvIGEgbGFzIHJlc3RyaWNjaW9uZXNcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBhc3BlY3QtdmlkZW8gYmctZ3JheS05MDAgcm91bmRlZC1sZyBvdmVyZmxvdy1oaWRkZW4gZ3JvdXBcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1jb3ZlciBiZy1jZW50ZXJcIlxuICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHt0aHVtYm5haWxVcmx9KWAgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctYmxhY2svNjAgaG92ZXI6YmctYmxhY2svNDAgdHJhbnNpdGlvbi1jb2xvcnNcIiAvPlxuICAgICAgXG4gICAgICB7LyogUGxheSBidXR0b24gaW4gdG9wLXJpZ2h0IGNvcm5lciAqL31cbiAgICAgIDxidXR0b25cbiAgICAgICAgb25DbGljaz17b3BlbkluWW91VHViZX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgcmlnaHQtNCBiZy1yZWQtNjAwIGhvdmVyOmJnLXJlZC03MDAgcm91bmRlZC1mdWxsIHAtMyB0cmFuc2l0aW9uLWFsbCBob3ZlcjpzY2FsZS0xMTAgc2hhZG93LTJ4bCB6LTEwXCJcbiAgICAgICAgdGl0bGU9XCJWZXIgZW4gWW91VHViZVwiXG4gICAgICA+XG4gICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cImgtNSB3LTUgdGV4dC13aGl0ZSBtbC0wLjVcIiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtd2hpdGUgcC02XCI+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCBtYi0yXCI+e3RpdGxlfTwvaDM+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBvcGFjaXR5LTkwIG1iLTRcIj5cbiAgICAgICAgICAgIEhheiBjbGljIGVuIGVsIGJvdMOzbiBkZSByZXByb2R1Y2lyIHBhcmEgdmVyIGVuIFlvdVR1YmVcbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9jb21wb25lbnRzL1ZpZGVvUGxheWVyLnRzeCJ9