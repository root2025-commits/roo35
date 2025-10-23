import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/Header.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/Header.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react; const useState = __vite__cjsImport3_react["useState"];
import { Link, useNavigate, useLocation } from "/node_modules/.vite/deps/react-router-dom.js?v=ea81ebed";
import { Search, ShoppingCart } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { performanceOptimizer } from "/src/utils/performance.ts";
import { useCart } from "/src/context/CartContext.tsx";
export function Header() {
  _s();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCart();
  const debouncedNavigate = React.useMemo(
    () => performanceOptimizer.debounce((query) => {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }, 500),
    [navigate]
  );
  React.useEffect(() => {
    if (searchQuery.trim() && searchQuery.length > 2) {
      debouncedNavigate(searchQuery.trim());
    }
  }, [searchQuery, debouncedNavigate]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  React.useEffect(() => {
    if (!location.pathname.includes("/search")) {
      setSearchQuery("");
    }
  }, [location.pathname]);
  return /* @__PURE__ */ jsxDEV("header", { className: "bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-8", children: [
        /* @__PURE__ */ jsxDEV(Link, { to: "/", className: "flex items-center space-x-2 hover:text-blue-200 transition-colors", children: [
          /* @__PURE__ */ jsxDEV("img", { src: "/unnamed.png", alt: "TV a la Carta", className: "h-8 w-8" }, void 0, false, {
            fileName: "/home/project/src/components/Header.tsx",
            lineNumber: 66,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xl hidden sm:block", children: "TV a la Carta" }, void 0, false, {
            fileName: "/home/project/src/components/Header.tsx",
            lineNumber: 67,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/Header.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("nav", { className: "hidden md:flex space-x-6", children: [
          /* @__PURE__ */ jsxDEV(Link, { to: "/movies", className: "hover:text-blue-200 transition-colors", children: "Películas" }, void 0, false, {
            fileName: "/home/project/src/components/Header.tsx",
            lineNumber: 71,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(Link, { to: "/tv", className: "hover:text-blue-200 transition-colors", children: "Series" }, void 0, false, {
            fileName: "/home/project/src/components/Header.tsx",
            lineNumber: 74,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(Link, { to: "/anime", className: "hover:text-blue-200 transition-colors", children: "Anime" }, void 0, false, {
            fileName: "/home/project/src/components/Header.tsx",
            lineNumber: 77,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/Header.tsx",
          lineNumber: 70,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/Header.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSearch, className: "relative hidden sm:block", children: /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }, void 0, false, {
            fileName: "/home/project/src/components/Header.tsx",
            lineNumber: 86,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "Buscar películas, series, novelas...",
              className: "pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-64"
            },
            void 0,
            false,
            {
              fileName: "/home/project/src/components/Header.tsx",
              lineNumber: 87,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/project/src/components/Header.tsx",
          lineNumber: 85,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/Header.tsx",
          lineNumber: 84,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/cart",
            className: "relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110",
            children: [
              /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "h-6 w-6 transition-transform duration-300" }, void 0, false, {
                fileName: "/home/project/src/components/Header.tsx",
                lineNumber: 101,
                columnNumber: 15
              }, this),
              state.total > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse", children: state.total }, void 0, false, {
                fileName: "/home/project/src/components/Header.tsx",
                lineNumber: 103,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/project/src/components/Header.tsx",
            lineNumber: 97,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/project/src/components/Header.tsx",
        lineNumber: 83,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/Header.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "pb-3 sm:hidden", children: /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSearch, children: /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
      /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }, void 0, false, {
        fileName: "/home/project/src/components/Header.tsx",
        lineNumber: 115,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: "Buscar películas, series, novelas...",
          className: "pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-full"
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/components/Header.tsx",
          lineNumber: 116,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/project/src/components/Header.tsx",
      lineNumber: 114,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/Header.tsx",
      lineNumber: 113,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/Header.tsx",
      lineNumber: 112,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/Header.tsx",
    lineNumber: 62,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/components/Header.tsx",
    lineNumber: 61,
    columnNumber: 5
  }, this);
}
_s(Header, "Oz1PI3P0KKjlKpPJPmMBcrTm/t0=", false, function() {
  return [useNavigate, useLocation, useCart];
});
_c = Header;
var _c;
$RefreshReg$(_c, "Header");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/Header.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/Header.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QUFBQSxXQVNBLEtBVkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQVdBLEtBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWFBO0FBQUEsT0EvREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWdFQSxLQWpFRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBa0VBO0FBRUo7QUFBQ3BCLEdBdkdlRCxRQUFNO0FBQUEsVUFFSE4sYUFDQUMsYUFDQ0ksT0FBTztBQUFBO0FBQUF3QixLQUpYdkI7QUFBTSxJQUFBdUI7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJMaW5rIiwidXNlTmF2aWdhdGUiLCJ1c2VMb2NhdGlvbiIsIlNlYXJjaCIsIlNob3BwaW5nQ2FydCIsInBlcmZvcm1hbmNlT3B0aW1pemVyIiwidXNlQ2FydCIsIkhlYWRlciIsIl9zIiwic2VhcmNoUXVlcnkiLCJzZXRTZWFyY2hRdWVyeSIsIm5hdmlnYXRlIiwibG9jYXRpb24iLCJzdGF0ZSIsImRlYm91bmNlZE5hdmlnYXRlIiwidXNlTWVtbyIsImRlYm91bmNlIiwicXVlcnkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ0cmltIiwidXNlRWZmZWN0IiwibGVuZ3RoIiwiaGFuZGxlU2VhcmNoIiwiZSIsInByZXZlbnREZWZhdWx0IiwicGF0aG5hbWUiLCJpbmNsdWRlcyIsInRhcmdldCIsInZhbHVlIiwidG90YWwiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJIZWFkZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmssIHVzZU5hdmlnYXRlLCB1c2VMb2NhdGlvbiB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgU2VhcmNoLCBTaG9wcGluZ0NhcnQsIENsYXBwZXJib2FyZCwgTW9uaXRvciwgU3BhcmtsZXMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgcGVyZm9ybWFuY2VPcHRpbWl6ZXIgfSBmcm9tICcuLi91dGlscy9wZXJmb3JtYW5jZSc7XG5pbXBvcnQgeyB1c2VDYXJ0IH0gZnJvbSAnLi4vY29udGV4dC9DYXJ0Q29udGV4dCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXIoKSB7XG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgY29uc3QgeyBzdGF0ZSB9ID0gdXNlQ2FydCgpO1xuXG4gIC8vIFJlYWwtdGltZSBzZWFyY2ggZWZmZWN0XG4gIGNvbnN0IGRlYm91bmNlZE5hdmlnYXRlID0gUmVhY3QudXNlTWVtbyhcbiAgICAoKSA9PiBwZXJmb3JtYW5jZU9wdGltaXplci5kZWJvdW5jZSgocXVlcnk6IHN0cmluZykgPT4ge1xuICAgICAgbmF2aWdhdGUoYC9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeS50cmltKCkpfWApO1xuICAgIH0sIDUwMCksXG4gICAgW25hdmlnYXRlXVxuICApO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNlYXJjaFF1ZXJ5LnRyaW0oKSAmJiBzZWFyY2hRdWVyeS5sZW5ndGggPiAyKSB7XG4gICAgICBkZWJvdW5jZWROYXZpZ2F0ZShzZWFyY2hRdWVyeS50cmltKCkpO1xuICAgIH1cbiAgfSwgW3NlYXJjaFF1ZXJ5LCBkZWJvdW5jZWROYXZpZ2F0ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVNlYXJjaCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHNlYXJjaFF1ZXJ5LnRyaW0oKSkge1xuICAgICAgbmF2aWdhdGUoYC9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChzZWFyY2hRdWVyeS50cmltKCkpfWApO1xuICAgIH1cbiAgfTtcblxuICAvLyBDbGVhciBzZWFyY2ggd2hlbiBuYXZpZ2F0aW5nIGF3YXkgZnJvbSBzZWFyY2ggcGFnZVxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJy9zZWFyY2gnKSkge1xuICAgICAgc2V0U2VhcmNoUXVlcnkoJycpO1xuICAgIH1cbiAgfSwgW2xvY2F0aW9uLnBhdGhuYW1lXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTkwMCB0by1ibHVlLTgwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzdGlja3kgdG9wLTAgei01MFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBoLTE2XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LThcIj5cbiAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBob3Zlcjp0ZXh0LWJsdWUtMjAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3VubmFtZWQucG5nXCIgYWx0PVwiVFYgYSBsYSBDYXJ0YVwiIGNsYXNzTmFtZT1cImgtOCB3LThcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC14bCBoaWRkZW4gc206YmxvY2tcIj5UViBhIGxhIENhcnRhPC9zcGFuPlxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cImhpZGRlbiBtZDpmbGV4IHNwYWNlLXgtNlwiPlxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9tb3ZpZXNcIiBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWJsdWUtMjAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgUGVsw61jdWxhc1xuICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgIDxMaW5rIHRvPVwiL3R2XCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1ibHVlLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgIFNlcmllc1xuICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2FuaW1lXCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1ibHVlLTIwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgIEFuaW1lXG4gICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTRcIj5cbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTZWFyY2h9IGNsYXNzTmFtZT1cInJlbGF0aXZlIGhpZGRlbiBzbTpibG9ja1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiB0cmFuc2Zvcm0gLXRyYW5zbGF0ZS15LTEvMiBoLTQgdy00IHRleHQtZ3JheS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkJ1c2NhciBwZWzDrWN1bGFzLCBzZXJpZXMsIG5vdmVsYXMuLi5cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicGwtMTAgcHItNCBweS0yIGJnLXdoaXRlLzEwIGJhY2tkcm9wLWJsdXItc20gYm9yZGVyIGJvcmRlci13aGl0ZS8yMCByb3VuZGVkLWZ1bGwgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci1ncmF5LTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS0zMDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50IHctNjRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICB0bz1cIi9jYXJ0XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgcC0yIGhvdmVyOmJnLXdoaXRlLzEwIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6c2NhbGUtMTEwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNob3BwaW5nQ2FydCBjbGFzc05hbWU9XCJoLTYgdy02IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMFwiIC8+XG4gICAgICAgICAgICAgIHtzdGF0ZS50b3RhbCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtcmlnaHQtMSBiZy1yZWQtNTAwIHRleHQtd2hpdGUgdGV4dC14cyByb3VuZGVkLWZ1bGwgaC01IHctNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICAgICAgICB7c3RhdGUudG90YWx9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTW9iaWxlIHNlYXJjaCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi0zIHNtOmhpZGRlblwiPlxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTZWFyY2h9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyB0b3AtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXktMS8yIGgtNCB3LTQgdGV4dC1ncmF5LTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoUXVlcnl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJCdXNjYXIgcGVsw61jdWxhcywgc2VyaWVzLCBub3ZlbGFzLi4uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwbC0xMCBwci00IHB5LTIgYmctd2hpdGUvMTAgYmFja2Ryb3AtYmx1ci1zbSBib3JkZXIgYm9yZGVyLXdoaXRlLzIwIHJvdW5kZWQtZnVsbCB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyLWdyYXktMzAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTMwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnQgdy1mdWxsXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2hlYWRlcj5cbiAgKTtcbn0iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCJ9