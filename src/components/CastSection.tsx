import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/CastSection.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/CastSection.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { Users, Star } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { IMAGE_BASE_URL } from "/src/config/api.ts";
export function CastSection({ cast, title = "Reparto Principal" }) {
  if (!cast || cast.length === 0) {
    return null;
  }
  const mainCast = cast.slice(0, 12);
  const getProfileUrl = (profilePath) => {
    return profilePath ? `${IMAGE_BASE_URL}/w185${profilePath}` : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=185&h=278&fit=crop&crop=face";
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl mr-4 shadow-lg", children: /* @__PURE__ */ jsxDEV(Users, { className: "h-6 w-6 text-white" }, void 0, false, {
        fileName: "/home/project/src/components/CastSection.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/project/src/components/CastSection.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: title }, void 0, false, {
        fileName: "/home/project/src/components/CastSection.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/CastSection.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6", children: mainCast.map(
      (actor) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:scale-105",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "relative overflow-hidden", children: [
              /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: getProfileUrl(actor.profile_path),
                  alt: actor.name,
                  className: "w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                },
                void 0,
                false,
                {
                  fileName: "/home/project/src/components/CastSection.tsx",
                  lineNumber: 62,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }, void 0, false, {
                fileName: "/home/project/src/components/CastSection.tsx",
                lineNumber: 67,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CastSection.tsx",
              lineNumber: 61,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 sm:p-4", children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors", children: actor.name }, void 0, false, {
                fileName: "/home/project/src/components/CastSection.tsx",
                lineNumber: 71,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-gray-600 text-xs sm:text-sm line-clamp-2", children: actor.character }, void 0, false, {
                fileName: "/home/project/src/components/CastSection.tsx",
                lineNumber: 74,
                columnNumber: 15
              }, this),
              actor.known_for_department && /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: /* @__PURE__ */ jsxDEV("span", { className: "inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium", children: actor.known_for_department }, void 0, false, {
                fileName: "/home/project/src/components/CastSection.tsx",
                lineNumber: 79,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/home/project/src/components/CastSection.tsx",
                lineNumber: 78,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CastSection.tsx",
              lineNumber: 70,
              columnNumber: 13
            }, this)
          ]
        },
        actor.id,
        true,
        {
          fileName: "/home/project/src/components/CastSection.tsx",
          lineNumber: 57,
          columnNumber: 9
        },
        this
      )
    ) }, void 0, false, {
      fileName: "/home/project/src/components/CastSection.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    cast.length > 12 && /* @__PURE__ */ jsxDEV("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full border border-indigo-200", children: [
      /* @__PURE__ */ jsxDEV(Star, { className: "h-4 w-4 text-indigo-600 mr-2" }, void 0, false, {
        fileName: "/home/project/src/components/CastSection.tsx",
        lineNumber: 92,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-medium text-indigo-700", children: [
        "+",
        cast.length - 12,
        " actores más en el reparto completo"
      ] }, void 0, true, {
        fileName: "/home/project/src/components/CastSection.tsx",
        lineNumber: 93,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/CastSection.tsx",
      lineNumber: 91,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/CastSection.tsx",
      lineNumber: 90,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/CastSection.tsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
}
_c = CastSection;
var _c;
$RefreshReg$(_c, "CastSection");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/CastSection.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/CastSection.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBNEJVOzs7Ozs7Ozs7Ozs7Ozs7O0FBM0JWLFNBQVNBLE9BQU9DLFlBQVk7QUFDNUIsU0FBU0Msc0JBQXNCO0FBUXhCLGdCQUFTQyxZQUFZLEVBQUVDLE1BQU1DLFFBQVEsb0JBQXNDLEdBQUc7QUFDbkYsTUFBSSxDQUFDRCxRQUFRQSxLQUFLRSxXQUFXLEdBQUc7QUFDOUIsV0FBTztBQUFBLEVBQ1Q7QUFHQSxRQUFNQyxXQUFXSCxLQUFLSSxNQUFNLEdBQUcsRUFBRTtBQUVqQyxRQUFNQyxnQkFBZ0JBLENBQUNDLGdCQUErQjtBQUNwRCxXQUFPQSxjQUNILEdBQUdSLGNBQWMsUUFBUVEsV0FBVyxLQUNwQztBQUFBLEVBQ047QUFFQSxTQUNFLHVCQUFDLFNBQUksV0FBVSxpS0FDYjtBQUFBLDJCQUFDLFNBQUksV0FBVSwwQkFDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSxnRkFDYixpQ0FBQyxTQUFNLFdBQVUsd0JBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBcUMsS0FEdkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFDQSx1QkFBQyxRQUFHLFdBQVUsK0dBQ1hMLG1CQURIO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLFNBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQU9BO0FBQUEsSUFFQSx1QkFBQyxTQUFJLFdBQVUsZ0ZBQ1pFLG1CQUFTSTtBQUFBQSxNQUFJLENBQUNDLFVBQ2I7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUVDLFdBQVU7QUFBQSxVQUVWO0FBQUEsbUNBQUMsU0FBSSxXQUFVLDRCQUNiO0FBQUE7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsS0FBS0gsY0FBY0csTUFBTUMsWUFBWTtBQUFBLGtCQUNyQyxLQUFLRCxNQUFNRTtBQUFBQSxrQkFDWCxXQUFVO0FBQUE7QUFBQSxnQkFIWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FHc0c7QUFBQSxjQUV0Ryx1QkFBQyxTQUFJLFdBQVUsc0pBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBaUs7QUFBQSxpQkFObks7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFPQTtBQUFBLFlBRUEsdUJBQUMsU0FBSSxXQUFVLGNBQ2I7QUFBQSxxQ0FBQyxRQUFHLFdBQVUsb0hBQ1hGLGdCQUFNRSxRQURUO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQSxjQUNBLHVCQUFDLE9BQUUsV0FBVSxpREFDVkYsZ0JBQU1HLGFBRFQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQTtBQUFBLGNBQ0NILE1BQU1JLHdCQUNMLHVCQUFDLFNBQUksV0FBVSxRQUNiLGlDQUFDLFVBQUssV0FBVSx5RkFDYkosZ0JBQU1JLHdCQURUO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUEsS0FIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUlBO0FBQUEsaUJBWko7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFjQTtBQUFBO0FBQUE7QUFBQSxRQTFCS0osTUFBTUs7QUFBQUEsUUFEYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BNEJBO0FBQUEsSUFDRCxLQS9CSDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBZ0NBO0FBQUEsSUFFQ2IsS0FBS0UsU0FBUyxNQUNiLHVCQUFDLFNBQUksV0FBVSxvQkFDYixpQ0FBQyxTQUFJLFdBQVUseUhBQ2I7QUFBQSw2QkFBQyxRQUFLLFdBQVUsa0NBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBOEM7QUFBQSxNQUM5Qyx1QkFBQyxVQUFLLFdBQVUsdUNBQXFDO0FBQUE7QUFBQSxRQUNqREYsS0FBS0UsU0FBUztBQUFBLFFBQUc7QUFBQSxXQURyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxTQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FLQSxLQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FPQTtBQUFBLE9BcERKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FzREE7QUFFSjtBQUFDWSxLQXZFZWY7QUFBVyxJQUFBZTtBQUFBQyxhQUFBRCxJQUFBIiwibmFtZXMiOlsiVXNlcnMiLCJTdGFyIiwiSU1BR0VfQkFTRV9VUkwiLCJDYXN0U2VjdGlvbiIsImNhc3QiLCJ0aXRsZSIsImxlbmd0aCIsIm1haW5DYXN0Iiwic2xpY2UiLCJnZXRQcm9maWxlVXJsIiwicHJvZmlsZVBhdGgiLCJtYXAiLCJhY3RvciIsInByb2ZpbGVfcGF0aCIsIm5hbWUiLCJjaGFyYWN0ZXIiLCJrbm93bl9mb3JfZGVwYXJ0bWVudCIsImlkIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQ2FzdFNlY3Rpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBVc2VycywgU3RhciB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBJTUFHRV9CQVNFX1VSTCB9IGZyb20gJy4uL2NvbmZpZy9hcGknO1xuaW1wb3J0IHR5cGUgeyBDYXN0TWVtYmVyIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG5pbnRlcmZhY2UgQ2FzdFNlY3Rpb25Qcm9wcyB7XG4gIGNhc3Q6IENhc3RNZW1iZXJbXTtcbiAgdGl0bGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXN0U2VjdGlvbih7IGNhc3QsIHRpdGxlID0gXCJSZXBhcnRvIFByaW5jaXBhbFwiIH06IENhc3RTZWN0aW9uUHJvcHMpIHtcbiAgaWYgKCFjYXN0IHx8IGNhc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTaG93IG9ubHkgbWFpbiBjYXN0IChmaXJzdCAxMiBtZW1iZXJzKVxuICBjb25zdCBtYWluQ2FzdCA9IGNhc3Quc2xpY2UoMCwgMTIpO1xuXG4gIGNvbnN0IGdldFByb2ZpbGVVcmwgPSAocHJvZmlsZVBhdGg6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICByZXR1cm4gcHJvZmlsZVBhdGhcbiAgICAgID8gYCR7SU1BR0VfQkFTRV9VUkx9L3cxODUke3Byb2ZpbGVQYXRofWBcbiAgICAgIDogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTExMzY3NDYxOTg5LWY4NWEyMWZkYTE2Nz93PTE4NSZoPTI3OCZmaXQ9Y3JvcCZjcm9wPWZhY2UnO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLXdoaXRlIHRvLWdyYXktNTAgcm91bmRlZC0yeGwgc2hhZG93LXhsIGJvcmRlciBib3JkZXItZ3JheS0xMDAgcC02IHNtOnAtOCBtYi04IHRyYW5zZm9ybSBob3ZlcjpzY2FsZS1bMS4wMl0gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTZcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20taW5kaWdvLTUwMCB0by1wdXJwbGUtNTAwIHAtMyByb3VuZGVkLXhsIG1yLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgPFVzZXJzIGNsYXNzTmFtZT1cImgtNiB3LTYgdGV4dC13aGl0ZVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgc206dGV4dC0zeGwgZm9udC1ib2xkIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHRvLXB1cnBsZS02MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICB7dGl0bGV9XG4gICAgICAgIDwvaDI+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy0zIG1kOmdyaWQtY29scy00IGxnOmdyaWQtY29scy02IGdhcC00IHNtOmdhcC02XCI+XG4gICAgICAgIHttYWluQ2FzdC5tYXAoKGFjdG9yKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXthY3Rvci5pZH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImdyb3VwIGJnLXdoaXRlIHJvdW5kZWQteGwgc2hhZG93LXNtIGhvdmVyOnNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItZ3JheS0xMDAgaG92ZXI6Ym9yZGVyLWluZGlnby0yMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHNyYz17Z2V0UHJvZmlsZVVybChhY3Rvci5wcm9maWxlX3BhdGgpfVxuICAgICAgICAgICAgICAgIGFsdD17YWN0b3IubmFtZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0zMiBzbTpoLTQwIG9iamVjdC1jb3ZlciBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1ibGFjay82MCB2aWEtdHJhbnNwYXJlbnQgdG8tdHJhbnNwYXJlbnQgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0zMDBcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHNtOnAtNFwiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIHRleHQtc20gc206dGV4dC1iYXNlIG1iLTEgbGluZS1jbGFtcC0yIGdyb3VwLWhvdmVyOnRleHQtaW5kaWdvLTYwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgIHthY3Rvci5uYW1lfVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIHRleHQteHMgc206dGV4dC1zbSBsaW5lLWNsYW1wLTJcIj5cbiAgICAgICAgICAgICAgICB7YWN0b3IuY2hhcmFjdGVyfVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIHthY3Rvci5rbm93bl9mb3JfZGVwYXJ0bWVudCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2sgYmctaW5kaWdvLTEwMCB0ZXh0LWluZGlnby03MDAgcHgtMiBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgIHthY3Rvci5rbm93bl9mb3JfZGVwYXJ0bWVudH1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Y2FzdC5sZW5ndGggPiAxMiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNTAgdG8tcHVycGxlLTUwIHB4LTQgcHktMiByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1pbmRpZ28tMjAwXCI+XG4gICAgICAgICAgICA8U3RhciBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtaW5kaWdvLTYwMCBtci0yXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1pbmRpZ28tNzAwXCI+XG4gICAgICAgICAgICAgICt7Y2FzdC5sZW5ndGggLSAxMn0gYWN0b3JlcyBtw6FzIGVuIGVsIHJlcGFydG8gY29tcGxldG9cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufSJdLCJmaWxlIjoiL2hvbWUvcHJvamVjdC9zcmMvY29tcG9uZW50cy9DYXN0U2VjdGlvbi50c3gifQ==