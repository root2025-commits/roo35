import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/App.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
import { BrowserRouter as Router, Routes, Route } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { CartProvider } from "/src/context/CartContext.tsx";
import { AdminProvider } from "/src/context/AdminContext.tsx";
import { Header } from "/src/components/Header.tsx";
import { Home } from "/src/pages/Home.tsx";
import { Movies } from "/src/pages/Movies.tsx";
import { TVShows } from "/src/pages/TVShows.tsx";
import { Anime } from "/src/pages/Anime.tsx";
import { SearchPage } from "/src/pages/Search.tsx";
import { MovieDetail } from "/src/pages/MovieDetail.tsx";
import { TVDetail } from "/src/pages/TVDetail.tsx";
import { NovelDetail } from "/src/pages/NovelDetail.tsx";
import { Cart } from "/src/pages/Cart.tsx";
import { AdminPanel } from "/src/pages/AdminPanel.tsx";
function App() {
  _s();
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("pageRefreshed", "true");
    };
    const handleLoad = () => {
      if (sessionStorage.getItem("pageRefreshed") === "true") {
        sessionStorage.removeItem("pageRefreshed");
        if (window.location.pathname !== "/") {
          window.location.href = "https://tvalacarta.vercel.app/";
          return;
        }
      }
    };
    if (sessionStorage.getItem("pageRefreshed") === "true") {
      sessionStorage.removeItem("pageRefreshed");
      if (window.location.pathname !== "/") {
        window.location.href = "https://tvalacarta.vercel.app/";
        return;
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "0")) {
        e.preventDefault();
        return false;
      }
    };
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return false;
      }
    };
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener("keydown", handleKeyDown, { passive: false });
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
  return /* @__PURE__ */ jsxDEV(AdminProvider, { children: /* @__PURE__ */ jsxDEV(CartProvider, { children: /* @__PURE__ */ jsxDEV(Router, { children: /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxDEV(Routes, { children: [
    /* @__PURE__ */ jsxDEV(Route, { path: "/admin", element: /* @__PURE__ */ jsxDEV(AdminPanel, {}, void 0, false, {
      fileName: "/home/project/src/App.tsx",
      lineNumber: 128,
      columnNumber: 45
    }, this) }, void 0, false, {
      fileName: "/home/project/src/App.tsx",
      lineNumber: 128,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/*", element: /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(Header, {}, void 0, false, {
        fileName: "/home/project/src/App.tsx",
        lineNumber: 131,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV("main", { children: /* @__PURE__ */ jsxDEV(Routes, { children: [
        /* @__PURE__ */ jsxDEV(Route, { path: "/", element: /* @__PURE__ */ jsxDEV(Home, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 134,
          columnNumber: 48
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 134,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/movies", element: /* @__PURE__ */ jsxDEV(Movies, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 135,
          columnNumber: 54
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 135,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/tv", element: /* @__PURE__ */ jsxDEV(TVShows, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 136,
          columnNumber: 50
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 136,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/anime", element: /* @__PURE__ */ jsxDEV(Anime, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 137,
          columnNumber: 53
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 137,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/search", element: /* @__PURE__ */ jsxDEV(SearchPage, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 138,
          columnNumber: 54
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 138,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/movie/:id", element: /* @__PURE__ */ jsxDEV(MovieDetail, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 139,
          columnNumber: 57
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 139,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/tv/:id", element: /* @__PURE__ */ jsxDEV(TVDetail, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 140,
          columnNumber: 54
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 140,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/novel/:id", element: /* @__PURE__ */ jsxDEV(NovelDetail, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 141,
          columnNumber: 57
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 141,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ jsxDEV(Route, { path: "/cart", element: /* @__PURE__ */ jsxDEV(Cart, {}, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 142,
          columnNumber: 52
        }, this) }, void 0, false, {
          fileName: "/home/project/src/App.tsx",
          lineNumber: 142,
          columnNumber: 23
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/App.tsx",
        lineNumber: 133,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "/home/project/src/App.tsx",
        lineNumber: 132,
        columnNumber: 19
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/App.tsx",
      lineNumber: 130,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "/home/project/src/App.tsx",
      lineNumber: 129,
      columnNumber: 15
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/App.tsx",
    lineNumber: 127,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "/home/project/src/App.tsx",
    lineNumber: 126,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "/home/project/src/App.tsx",
    lineNumber: 125,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/home/project/src/App.tsx",
    lineNumber: 124,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/App.tsx",
    lineNumber: 123,
    columnNumber: 5
  }, this);
}
_s(App, "3ubReDTFssvu4DHeldAg55cW/CI=");
_c = App;
export default App;
var _c;
$RefreshReg$(_c, "App");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/App.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/App.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFBQSxRQUM5Qyx1QkFBQyxTQUFNLE1BQUssY0FBYSxTQUFTLHVCQUFDLGlCQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBWSxLQUE5QztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWtEO0FBQUEsUUFDbEQsdUJBQUMsU0FBTSxNQUFLLFdBQVUsU0FBUyx1QkFBQyxjQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBUyxLQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTRDO0FBQUEsUUFDNUMsdUJBQUMsU0FBTSxNQUFLLGNBQWEsU0FBUyx1QkFBQyxpQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQVksS0FBOUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFrRDtBQUFBLFFBQ2xELHVCQUFDLFNBQU0sTUFBSyxTQUFRLFNBQVMsdUJBQUMsVUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQUssS0FBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFzQztBQUFBLFdBVHhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFVQSxLQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFZQTtBQUFBLFNBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWVBLEtBaEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FpQkM7QUFBQSxPQW5CSDtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBb0JBLEtBckJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FzQkEsS0F2QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXdCQSxLQXpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMEJBLEtBM0JGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0E0QkE7QUFFSjtBQUFDckIsR0FySFFELEtBQUc7QUFBQTRCLEtBQUg1QjtBQXVIVCxlQUFlQTtBQUFJLElBQUE0QjtBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJCcm93c2VyUm91dGVyIiwiUm91dGVyIiwiUm91dGVzIiwiUm91dGUiLCJDYXJ0UHJvdmlkZXIiLCJBZG1pblByb3ZpZGVyIiwiSGVhZGVyIiwiSG9tZSIsIk1vdmllcyIsIlRWU2hvd3MiLCJBbmltZSIsIlNlYXJjaFBhZ2UiLCJNb3ZpZURldGFpbCIsIlRWRGV0YWlsIiwiTm92ZWxEZXRhaWwiLCJDYXJ0IiwiQWRtaW5QYW5lbCIsIkFwcCIsIl9zIiwidXNlRWZmZWN0IiwiaGFuZGxlQmVmb3JlVW5sb2FkIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiaGFuZGxlTG9hZCIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImhyZWYiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZUtleURvd24iLCJlIiwiY3RybEtleSIsIm1ldGFLZXkiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsImhhbmRsZVdoZWVsIiwiaGFuZGxlVG91Y2hTdGFydCIsInRvdWNoZXMiLCJsZW5ndGgiLCJoYW5kbGVUb3VjaE1vdmUiLCJkb2N1bWVudCIsInBhc3NpdmUiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJBcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciwgUm91dGVzLCBSb3V0ZSwgTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IENhcnRQcm92aWRlciB9IGZyb20gJy4vY29udGV4dC9DYXJ0Q29udGV4dCc7XG5pbXBvcnQgeyBBZG1pblByb3ZpZGVyIH0gZnJvbSAnLi9jb250ZXh0L0FkbWluQ29udGV4dCc7XG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvSGVhZGVyJztcbmltcG9ydCB7IEhvbWUgfSBmcm9tICcuL3BhZ2VzL0hvbWUnO1xuaW1wb3J0IHsgTW92aWVzIH0gZnJvbSAnLi9wYWdlcy9Nb3ZpZXMnO1xuaW1wb3J0IHsgVFZTaG93cyB9IGZyb20gJy4vcGFnZXMvVFZTaG93cyc7XG5pbXBvcnQgeyBBbmltZSB9IGZyb20gJy4vcGFnZXMvQW5pbWUnO1xuaW1wb3J0IHsgU2VhcmNoUGFnZSB9IGZyb20gJy4vcGFnZXMvU2VhcmNoJztcbmltcG9ydCB7IE1vdmllRGV0YWlsIH0gZnJvbSAnLi9wYWdlcy9Nb3ZpZURldGFpbCc7XG5pbXBvcnQgeyBUVkRldGFpbCB9IGZyb20gJy4vcGFnZXMvVFZEZXRhaWwnO1xuaW1wb3J0IHsgTm92ZWxEZXRhaWwgfSBmcm9tICcuL3BhZ2VzL05vdmVsRGV0YWlsJztcbmltcG9ydCB7IENhcnQgfSBmcm9tICcuL3BhZ2VzL0NhcnQnO1xuaW1wb3J0IHsgQWRtaW5QYW5lbCB9IGZyb20gJy4vcGFnZXMvQWRtaW5QYW5lbCc7XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgLy8gRGV0ZWN0YXIgcmVmcmVzaCB5IHJlZGlyaWdpciBhIGxhIHDDoWdpbmEgcHJpbmNpcGFsXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQmVmb3JlVW5sb2FkID0gKCkgPT4ge1xuICAgICAgLy8gTWFyY2FyIHF1ZSBsYSBww6FnaW5hIHNlIGVzdMOhIHJlY2FyZ2FuZG9cbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3BhZ2VSZWZyZXNoZWQnLCAndHJ1ZScpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVMb2FkID0gKCkgPT4ge1xuICAgICAgLy8gU2kgc2UgZGV0ZWN0YSBxdWUgbGEgcMOhZ2luYSBmdWUgcmVjYXJnYWRhLCByZWRpcmlnaXIgYSBsYSBww6FnaW5hIHByaW5jaXBhbFxuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKTtcbiAgICAgICAgLy8gU29sbyByZWRpcmlnaXIgc2kgbm8gZXN0YW1vcyB5YSBlbiBsYSBww6FnaW5hIHByaW5jaXBhbFxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICE9PSAnLycpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL3R2YWxhY2FydGEudmVyY2VsLmFwcC8nO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBWZXJpZmljYXIgYWwgbW9udGFyIGVsIGNvbXBvbmVudGUgc2kgZnVlIHVuIHJlZnJlc2hcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncGFnZVJlZnJlc2hlZCcpID09PSAndHJ1ZScpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKTtcbiAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT09ICcvJykge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL3R2YWxhY2FydGEudmVyY2VsLmFwcC8nO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGhhbmRsZUJlZm9yZVVubG9hZCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBoYW5kbGVMb2FkKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgaGFuZGxlQmVmb3JlVW5sb2FkKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgaGFuZGxlTG9hZCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIC8vIERlc2hhYmlsaXRhciB6b29tIGNvbiB0ZWNsYWRvIHkgZ2VzdG9zXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAvLyBEZXNoYWJpbGl0YXIgQ3RybC9DbWQgKyBQbHVzL01pbnVzLzAgcGFyYSB6b29tXG4gICAgICBpZiAoKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpICYmIChlLmtleSA9PT0gJysnIHx8IGUua2V5ID09PSAnLScgfHwgZS5rZXkgPT09ICcwJykpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVdoZWVsID0gKGU6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgIC8vIERlc2hhYmlsaXRhciBDdHJsL0NtZCArIHNjcm9sbCBwYXJhIHpvb21cbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0ID0gKGU6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIC8vIERlc2hhYmlsaXRhciBwaW5jaC10by16b29tIGVuIGRpc3Bvc2l0aXZvcyB0w6FjdGlsZXNcbiAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlID0gKGU6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIC8vIERlc2hhYmlsaXRhciBwaW5jaC10by16b29tIGVuIGRpc3Bvc2l0aXZvcyB0w6FjdGlsZXNcbiAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhciBldmVudCBsaXN0ZW5lcnNcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93biwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIGhhbmRsZVdoZWVsLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoYW5kbGVUb3VjaFN0YXJ0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGhhbmRsZVRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGhhbmRsZVdoZWVsKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGhhbmRsZVRvdWNoTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPEFkbWluUHJvdmlkZXI+XG4gICAgICA8Q2FydFByb3ZpZGVyPlxuICAgICAgICA8Um91dGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTBcIj5cbiAgICAgICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkbWluXCIgZWxlbWVudD17PEFkbWluUGFuZWwgLz59IC8+XG4gICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiLypcIiBlbGVtZW50PXtcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPEhlYWRlciAvPlxuICAgICAgICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PEhvbWUgLz59IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvbW92aWVzXCIgZWxlbWVudD17PE1vdmllcyAvPn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi90dlwiIGVsZW1lbnQ9ezxUVlNob3dzIC8+fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FuaW1lXCIgZWxlbWVudD17PEFuaW1lIC8+fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3NlYXJjaFwiIGVsZW1lbnQ9ezxTZWFyY2hQYWdlIC8+fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL21vdmllLzppZFwiIGVsZW1lbnQ9ezxNb3ZpZURldGFpbCAvPn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi90di86aWRcIiBlbGVtZW50PXs8VFZEZXRhaWwgLz59IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvbm92ZWwvOmlkXCIgZWxlbWVudD17PE5vdmVsRGV0YWlsIC8+fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2NhcnRcIiBlbGVtZW50PXs8Q2FydCAvPn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9Sb3V0ZXM+XG4gICAgICAgICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgIH0gLz5cbiAgICAgICAgICAgIDwvUm91dGVzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1JvdXRlcj5cbiAgICAgIDwvQ2FydFByb3ZpZGVyPlxuICAgIDwvQWRtaW5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwOyJdLCJmaWxlIjoiL2hvbWUvcHJvamVjdC9zcmMvQXBwLnRzeCJ9