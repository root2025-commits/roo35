import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/FloatingNav.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/FloatingNav.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"];
import { Menu, X } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
export function FloatingNav({ sections }) {
  _s();
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110",
        "aria-label": "Toggle navigation menu",
        children: isOpen ? /* @__PURE__ */ jsxDEV(X, { className: "h-6 w-6" }, void 0, false, {
          fileName: "/home/project/src/components/FloatingNav.tsx",
          lineNumber: 57,
          columnNumber: 19
        }, this) : /* @__PURE__ */ jsxDEV(Menu, { className: "h-6 w-6" }, void 0, false, {
          fileName: "/home/project/src/components/FloatingNav.tsx",
          lineNumber: 57,
          columnNumber: 47
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/project/src/components/FloatingNav.tsx",
        lineNumber: 52,
        columnNumber: 7
      },
      this
    ),
    isOpen && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "fixed inset-0 bg-black/50 z-30 backdrop-blur-sm animate-in fade-in duration-200",
          onClick: () => setIsOpen(false)
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/components/FloatingNav.tsx",
          lineNumber: 64,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300 w-64", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-500 to-purple-500 p-4", children: /* @__PURE__ */ jsxDEV("h3", { className: "text-white font-bold text-lg", children: "Navegar a" }, void 0, false, {
          fileName: "/home/project/src/components/FloatingNav.tsx",
          lineNumber: 72,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/FloatingNav.tsx",
          lineNumber: 71,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "max-h-96 overflow-y-auto", children: sections.map(
          (section) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => scrollToSection(section.id),
              className: "w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center border-b border-gray-100 last:border-b-0",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "mr-3 text-blue-500", children: section.icon }, void 0, false, {
                  fileName: "/home/project/src/components/FloatingNav.tsx",
                  lineNumber: 81,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-gray-800 font-medium", children: section.label }, void 0, false, {
                  fileName: "/home/project/src/components/FloatingNav.tsx",
                  lineNumber: 84,
                  columnNumber: 19
                }, this)
              ]
            },
            section.id,
            true,
            {
              fileName: "/home/project/src/components/FloatingNav.tsx",
              lineNumber: 76,
              columnNumber: 13
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/home/project/src/components/FloatingNav.tsx",
          lineNumber: 74,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/FloatingNav.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/FloatingNav.tsx",
      lineNumber: 62,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/FloatingNav.tsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}
_s(FloatingNav, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = FloatingNav;
var _c;
$RefreshReg$(_c, "FloatingNav");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/FloatingNav.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/FloatingNav.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBcUNrQixTQUtWLFVBTFU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBckNsQixTQUFnQkEsZ0JBQWdCO0FBQ2hDLFNBQVNDLE1BQU1DLFNBQXNFO0FBVTlFLGdCQUFTQyxZQUFZLEVBQUVDLFNBQTJCLEdBQUc7QUFBQUMsS0FBQTtBQUMxRCxRQUFNLENBQUNDLFFBQVFDLFNBQVMsSUFBSVAsU0FBUyxLQUFLO0FBRTFDLFFBQU1RLGtCQUFrQkEsQ0FBQ0MsY0FBc0I7QUFDN0MsVUFBTUMsVUFBVUMsU0FBU0MsZUFBZUgsU0FBUztBQUNqRCxRQUFJQyxTQUFTO0FBQ1gsWUFBTUcsU0FBUztBQUNmLFlBQU1DLGtCQUFrQkosUUFBUUssc0JBQXNCLEVBQUVDLE1BQU1DLE9BQU9DO0FBQ3JFLFlBQU1DLGlCQUFpQkwsa0JBQWtCRDtBQUV6Q0ksYUFBT0csU0FBUztBQUFBLFFBQ2RKLEtBQUtHO0FBQUFBLFFBQ0xFLFVBQVU7QUFBQSxNQUNaLENBQUM7QUFDRGQsZ0JBQVUsS0FBSztBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUVBLFNBQ0UsbUNBRUU7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsU0FBUyxNQUFNQSxVQUFVLENBQUNELE1BQU07QUFBQSxRQUNoQyxXQUFVO0FBQUEsUUFDVixjQUFXO0FBQUEsUUFFVkEsbUJBQVMsdUJBQUMsS0FBRSxXQUFVLGFBQWI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFzQixJQUFNLHVCQUFDLFFBQUssV0FBVSxhQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXlCO0FBQUE7QUFBQSxNQUxqRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNQTtBQUFBLElBR0NBLFVBQ0MsbUNBRUU7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1YsU0FBUyxNQUFNQyxVQUFVLEtBQUs7QUFBQTtBQUFBLFFBRmhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUVrQztBQUFBLE1BSWxDLHVCQUFDLFNBQUksV0FBVSxvSUFDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSxvREFDYixpQ0FBQyxRQUFHLFdBQVUsZ0NBQStCLHlCQUE3QztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXNELEtBRHhEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLDRCQUNaSCxtQkFBU2tCO0FBQUFBLFVBQUksQ0FBQ0MsWUFDYjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBRUMsU0FBUyxNQUFNZixnQkFBZ0JlLFFBQVFDLEVBQUU7QUFBQSxjQUN6QyxXQUFVO0FBQUEsY0FFVjtBQUFBLHVDQUFDLFNBQUksV0FBVSxzQkFDWkQsa0JBQVFFLFFBRFg7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBLHVCQUFDLFVBQUssV0FBVSw2QkFBNkJGLGtCQUFRRyxTQUFyRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUEyRDtBQUFBO0FBQUE7QUFBQSxZQVB0REgsUUFBUUM7QUFBQUEsWUFEZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBU0E7QUFBQSxRQUNELEtBWkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWFBO0FBQUEsV0FqQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWtCQTtBQUFBLFNBMUJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0EyQkE7QUFBQSxPQXZDSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBeUNBO0FBRUo7QUFBQ25CLEdBOURlRixhQUFXO0FBQUF3QixLQUFYeEI7QUFBVyxJQUFBd0I7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwiTWVudSIsIlgiLCJGbG9hdGluZ05hdiIsInNlY3Rpb25zIiwiX3MiLCJpc09wZW4iLCJzZXRJc09wZW4iLCJzY3JvbGxUb1NlY3Rpb24iLCJzZWN0aW9uSWQiLCJlbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9mZnNldCIsImVsZW1lbnRQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsIndpbmRvdyIsInBhZ2VZT2Zmc2V0Iiwib2Zmc2V0UG9zaXRpb24iLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwibWFwIiwic2VjdGlvbiIsImlkIiwiaWNvbiIsImxhYmVsIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiRmxvYXRpbmdOYXYudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1lbnUsIFgsIEZsYW1lLCBDbGFwcGVyYm9hcmQsIE1vbml0b3IsIFNwYXJrbGVzLCBSYWRpbywgQ2hlY2tDaXJjbGUyIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIEZsb2F0aW5nTmF2UHJvcHMge1xuICBzZWN0aW9uczogQXJyYXk8e1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBpY29uOiBSZWFjdC5SZWFjdE5vZGU7XG4gIH0+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRmxvYXRpbmdOYXYoeyBzZWN0aW9ucyB9OiBGbG9hdGluZ05hdlByb3BzKSB7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3Qgc2Nyb2xsVG9TZWN0aW9uID0gKHNlY3Rpb25JZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlY3Rpb25JZCk7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IDgwO1xuICAgICAgY29uc3QgZWxlbWVudFBvc2l0aW9uID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICBjb25zdCBvZmZzZXRQb3NpdGlvbiA9IGVsZW1lbnRQb3NpdGlvbiAtIG9mZnNldDtcblxuICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgdG9wOiBvZmZzZXRQb3NpdGlvbixcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KTtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHsvKiBGbG9hdGluZyBCdXR0b24gKi99XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzT3BlbighaXNPcGVuKX1cbiAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTYgcmlnaHQtNiB6LTQwIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTUwMCB0by1wdXJwbGUtNTAwIGhvdmVyOmZyb20tYmx1ZS02MDAgaG92ZXI6dG8tcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHAtNCByb3VuZGVkLWZ1bGwgc2hhZG93LTJ4bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTExMFwiXG4gICAgICAgIGFyaWEtbGFiZWw9XCJUb2dnbGUgbmF2aWdhdGlvbiBtZW51XCJcbiAgICAgID5cbiAgICAgICAge2lzT3BlbiA/IDxYIGNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPiA6IDxNZW51IGNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPn1cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICB7LyogTmF2aWdhdGlvbiBNZW51ICovfVxuICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgey8qIEJhY2tkcm9wICovfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2svNTAgei0zMCBiYWNrZHJvcC1ibHVyLXNtIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0yMDBcIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKGZhbHNlKX1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgey8qIE1lbnUgUGFuZWwgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMjQgcmlnaHQtNiB6LTQwIGJnLXdoaXRlIHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIGFuaW1hdGUtaW4gc2xpZGUtaW4tZnJvbS1ib3R0b20tNSBkdXJhdGlvbi0zMDAgdy02NFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MDAgdG8tcHVycGxlLTUwMCBwLTRcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtbGdcIj5OYXZlZ2FyIGE8L2gzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC1oLTk2IG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgICB7c2VjdGlvbnMubWFwKChzZWN0aW9uKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtzZWN0aW9uLmlkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2Nyb2xsVG9TZWN0aW9uKHNlY3Rpb24uaWQpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTQgcHktMyB0ZXh0LWxlZnQgaG92ZXI6YmctYmx1ZS01MCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBib3JkZXItYiBib3JkZXItZ3JheS0xMDAgbGFzdDpib3JkZXItYi0wXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1yLTMgdGV4dC1ibHVlLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7c2VjdGlvbi5pY29ufVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktODAwIGZvbnQtbWVkaXVtXCI+e3NlY3Rpb24ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59XG4iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL2NvbXBvbmVudHMvRmxvYXRpbmdOYXYudHN4In0=