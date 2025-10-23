import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/CheckoutModal.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/CheckoutModal.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { X, MapPin, User, Home, CreditCard, DollarSign, Send, Calculator, Truck, ExternalLink } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useCart } from "/src/context/CartContext.tsx";
const validateCubanPhone = (phone) => {
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  const patterns = [
    /^(\+53|53)?[5-9]\d{7}$/,
    // Móviles: 5xxxxxxx, 6xxxxxxx, 7xxxxxxx, 8xxxxxxx, 9xxxxxxx
    /^(\+53|53)?[2-4]\d{6,7}$/,
    // Fijos: 2xxxxxxx, 3xxxxxxx, 4xxxxxxx (7-8 dígitos)
    /^(\+53|53)?7[0-9]\d{6}$/
    // Números especiales que empiezan con 7
  ];
  return patterns.some((pattern) => pattern.test(cleanPhone));
};
export function CheckoutModal({ isOpen, onClose, onCheckout, items, total }) {
  _s();
  const { getCurrentPrices } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    address: ""
  });
  const [selectedZone, setSelectedZone] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [pickupLocation, setPickupLocation] = useState(false);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [errors, setErrors] = useState({});
  const [deliveryZones, setDeliveryZones] = useState([]);
  useEffect(() => {
    const loadDeliveryZones = () => {
      try {
        const adminConfig = localStorage.getItem("system_config");
        if (adminConfig) {
          const config = JSON.parse(adminConfig);
          if (config.deliveryZones) {
            setDeliveryZones(config.deliveryZones);
          }
        }
      } catch (error) {
        console.error("Error loading delivery zones:", error);
      }
    };
    loadDeliveryZones();
    const handleAdminStateChange = (event) => {
      if (event.detail.type === "delivery_zone_add" || event.detail.type === "delivery_zone_update" || event.detail.type === "delivery_zone_delete") {
        loadDeliveryZones();
      }
    };
    const handleAdminFullSync = (event) => {
      if (event.detail.config?.deliveryZones) {
        setDeliveryZones(event.detail.config.deliveryZones);
      }
    };
    window.addEventListener("admin_state_change", handleAdminStateChange);
    window.addEventListener("admin_full_sync", handleAdminFullSync);
    return () => {
      window.removeEventListener("admin_state_change", handleAdminStateChange);
      window.removeEventListener("admin_full_sync", handleAdminFullSync);
    };
  }, []);
  const pickupOption = {
    id: "pickup",
    name: "Recogida en TV a la Carta",
    cost: 0
  };
  const allDeliveryOptions = [pickupOption, ...deliveryZones];
  useEffect(() => {
    if (selectedZone === "pickup") {
      setDeliveryCost(0);
      setPickupLocation(true);
    } else if (selectedZone) {
      const zone = deliveryZones.find((z) => z.name === selectedZone);
      setDeliveryCost(zone ? zone.cost : 0);
      setPickupLocation(false);
    }
  }, [selectedZone, deliveryZones]);
  const validateForm = () => {
    const newErrors = {};
    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "El nombre completo es requerido";
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!validateCubanPhone(customerInfo.phone)) {
      newErrors.phone = "Número de teléfono cubano inválido (ej: +53 5469 0878, 54690878, 22345678)";
    }
    if (!pickupLocation && !customerInfo.address.trim()) {
      newErrors.address = "La dirección es requerida para entrega a domicilio";
    }
    if (!selectedZone) {
      newErrors.zone = "Debe seleccionar una opción de entrega";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const orderId = `TV-${Date.now()}`;
    const orderData = {
      orderId,
      customerInfo,
      deliveryZone: selectedZone,
      deliveryCost,
      items,
      subtotal: total,
      transferFee: 0,
      total: total + deliveryCost,
      pickupLocation,
      showLocationMap
    };
    onCheckout(orderData);
  };
  const handleInputChange = (field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: void 0 }));
    }
  };
  const handleZoneChange = (value) => {
    setSelectedZone(value);
    if (errors.zone) {
      setErrors((prev) => ({ ...prev, zone: void 0 }));
    }
  };
  const openLocationMap = () => {
    const mapUrl = "https://www.google.com/maps/place/20%C2%B002'22.5%22N+75%C2%B050'58.8%22W/@20.0394604,-75.8495414,180m/data=!3m1!1e3!4m4!3m3!8m2!3d20.039585!4d-75.849663?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D";
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl my-4 sm:my-6 lg:my-8 max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 lg:p-8 text-white", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-2 sm:p-3 rounded-xl mr-2 sm:mr-4", children: /* @__PURE__ */ jsxDEV(Send, { className: "h-5 w-5 sm:h-6 sm:w-6" }, void 0, false, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 227,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 226,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-lg sm:text-2xl lg:text-3xl font-bold", children: "Finalizar Pedido" }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 230,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm lg:text-base text-blue-100", children: "Completa tus datos para proceder" }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 231,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 229,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/CheckoutModal.tsx",
        lineNumber: 225,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation",
          children: /* @__PURE__ */ jsxDEV(X, { className: "h-5 w-5 sm:h-6 sm:w-6" }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 238,
            columnNumber: 15
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 234,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/project/src/components/CheckoutModal.tsx",
      lineNumber: 224,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/CheckoutModal.tsx",
      lineNumber: 223,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-120px)]", children: /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6 flex items-center", children: [
          /* @__PURE__ */ jsxDEV(User, { className: "h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 text-blue-600" }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 248,
            columnNumber: 17
          }, this),
          "Información Personal"
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 247,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 lg:space-y-5", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm lg:text-base font-medium text-gray-700 mb-2", children: "Nombre Completo *" }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 254,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: customerInfo.fullName,
                onChange: (e) => handleInputChange("fullName", e.target.value),
                className: `w-full px-4 py-3 lg:py-4 text-base lg:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? "border-red-500" : "border-gray-300"}`,
                placeholder: "Ingresa tu nombre completo"
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 257,
                columnNumber: 19
              },
              this
            ),
            errors.fullName && /* @__PURE__ */ jsxDEV("p", { className: "text-red-500 text-sm lg:text-base mt-1", children: errors.fullName }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 267,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 253,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm lg:text-base font-medium text-gray-700 mb-2", children: "Teléfono *" }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 272,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "tel",
                value: customerInfo.phone,
                onChange: (e) => handleInputChange("phone", e.target.value),
                className: `w-full px-4 py-3 lg:py-4 text-base lg:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`,
                placeholder: "+53 5469 0878 o 54690878"
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 275,
                columnNumber: 19
              },
              this
            ),
            errors.phone && /* @__PURE__ */ jsxDEV("p", { className: "text-red-500 text-sm lg:text-base mt-1", children: errors.phone }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 285,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 text-xs lg:text-sm mt-1", children: "Formatos válidos: +53 5469 0878, 54690878, 22345678" }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 287,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 271,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-sm lg:text-base font-medium text-gray-700 mb-2", children: [
              "Dirección Completa ",
              !pickupLocation && "*"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 293,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "textarea",
              {
                value: customerInfo.address,
                onChange: (e) => handleInputChange("address", e.target.value),
                rows: 3,
                className: `w-full px-4 py-3 lg:py-4 text-base lg:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.address ? "border-red-500" : "border-gray-300"}`,
                placeholder: pickupLocation ? "Dirección opcional para contacto" : "Calle, número, entre calles, referencias...",
                disabled: pickupLocation
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 296,
                columnNumber: 19
              },
              this
            ),
            errors.address && /* @__PURE__ */ jsxDEV("p", { className: "text-red-500 text-sm lg:text-base mt-1", children: errors.address }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 307,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 292,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 252,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/CheckoutModal.tsx",
        lineNumber: 246,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6 flex items-center", children: [
          /* @__PURE__ */ jsxDEV(MapPin, { className: "h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 text-green-600" }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 316,
            columnNumber: 17
          }, this),
          "Opciones de Entrega *"
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 315,
          columnNumber: 15
        }, this),
        errors.zone && /* @__PURE__ */ jsxDEV("p", { className: "text-red-500 text-sm mb-4", children: errors.zone }, void 0, false, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 321,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 sm:space-y-4", children: [
          /* @__PURE__ */ jsxDEV(
            "label",
            {
              className: `group flex flex-col p-4 sm:p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] space-y-3 ${selectedZone === "pickup" ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg scale-[1.02]" : "border-gray-300 hover:border-green-400 hover:bg-green-50/50 hover:shadow-md"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center w-full", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: `mr-4 p-3 rounded-full transition-all duration-300 ${selectedZone === "pickup" ? "bg-green-500 text-white shadow-lg" : "bg-gray-200 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600"}`, children: /* @__PURE__ */ jsxDEV(Home, { className: "h-5 w-5" }, void 0, false, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 339,
                    columnNumber: 23
                  }, this) }, void 0, false, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 334,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "radio",
                      name: "deliveryOption",
                      value: "pickup",
                      checked: selectedZone === "pickup",
                      onChange: (e) => handleZoneChange(e.target.value),
                      className: "mr-3 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 text-green-600 focus:ring-green-500 focus:ring-2"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/project/src/components/CheckoutModal.tsx",
                      lineNumber: 341,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxDEV("p", { className: `font-bold text-lg transition-colors ${selectedZone === "pickup" ? "text-green-800" : "text-gray-900 group-hover:text-green-700"}`, children: "🏪 Recogida en TV a la Carta" }, void 0, false, {
                      fileName: "/home/project/src/components/CheckoutModal.tsx",
                      lineNumber: 350,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: `text-sm transition-colors ${selectedZone === "pickup" ? "text-green-700" : "text-gray-600 group-hover:text-green-600"}`, children: "📍 Reparto Nuevo Vista Alegre, Santiago de Cuba" }, void 0, false, {
                      fileName: "/home/project/src/components/CheckoutModal.tsx",
                      lineNumber: 355,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: `text-xs mt-1 transition-colors ${selectedZone === "pickup" ? "text-green-600" : "text-gray-500 group-hover:text-green-500"}`, children: "⏰ Disponible de 9:00 AM a 8:00 PM" }, void 0, false, {
                      fileName: "/home/project/src/components/CheckoutModal.tsx",
                      lineNumber: 360,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 349,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 333,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-center flex flex-col items-center w-full", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: `px-4 py-2 rounded-full font-bold text-lg transition-all duration-300 ${selectedZone === "pickup" ? "bg-green-500 text-white shadow-lg" : "bg-green-100 text-green-700 group-hover:bg-green-200"}`, children: "✨ GRATIS" }, void 0, false, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 368,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 mt-1", children: "Sin costo adicional" }, void 0, false, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 375,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 367,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 326,
              columnNumber: 17
            },
            this
          ),
          deliveryZones.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "border-2 border-gray-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 border-b border-gray-300", children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-blue-900 flex items-center text-base sm:text-lg", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-500 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(Truck, { className: "h-4 w-4 sm:h-5 sm:w-5 text-white" }, void 0, false, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 385,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 384,
                  columnNumber: 25
                }, this),
                "Entrega a Domicilio"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 383,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-blue-700 ml-10 sm:ml-12 mt-1", children: "Selecciona tu zona de entrega" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 389,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 382,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "max-h-64 sm:max-h-80 overflow-y-auto bg-white", children: deliveryZones.map(
              (zone) => /* @__PURE__ */ jsxDEV(
                "label",
                {
                  className: `group flex flex-col p-3 sm:p-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 space-y-3 ${selectedZone === zone.name ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-inner" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center w-full", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: `mr-4 p-2 rounded-full transition-all duration-300 ${selectedZone === zone.name ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"}`, children: /* @__PURE__ */ jsxDEV(MapPin, { className: "h-3 w-3 sm:h-4 sm:w-4" }, void 0, false, {
                        fileName: "/home/project/src/components/CheckoutModal.tsx",
                        lineNumber: 407,
                        columnNumber: 31
                      }, this) }, void 0, false, {
                        fileName: "/home/project/src/components/CheckoutModal.tsx",
                        lineNumber: 402,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "input",
                        {
                          type: "radio",
                          name: "deliveryOption",
                          value: zone.name,
                          checked: selectedZone === zone.name,
                          onChange: (e) => handleZoneChange(e.target.value),
                          className: "mr-3 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/home/project/src/components/CheckoutModal.tsx",
                          lineNumber: 409,
                          columnNumber: 29
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxDEV("p", { className: `font-bold text-base transition-colors ${selectedZone === zone.name ? "text-blue-800" : "text-gray-900 group-hover:text-blue-700"}`, children: [
                          "🚚 ",
                          zone.name
                        ] }, void 0, true, {
                          fileName: "/home/project/src/components/CheckoutModal.tsx",
                          lineNumber: 418,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: `text-sm mt-1 transition-colors ${selectedZone === zone.name ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"}`, children: "⏰ Entrega en 24-48 horas" }, void 0, false, {
                          fileName: "/home/project/src/components/CheckoutModal.tsx",
                          lineNumber: 423,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/home/project/src/components/CheckoutModal.tsx",
                        lineNumber: 417,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/home/project/src/components/CheckoutModal.tsx",
                      lineNumber: 401,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-center flex flex-col items-center w-full", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: `px-4 py-2 rounded-full font-bold text-base transition-all duration-300 ${selectedZone === zone.name ? "bg-blue-500 text-white shadow-lg" : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"}`, children: [
                        "$",
                        zone.cost.toLocaleString(),
                        " CUP"
                      ] }, void 0, true, {
                        fileName: "/home/project/src/components/CheckoutModal.tsx",
                        lineNumber: 431,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 mt-1", children: "Costo de entrega" }, void 0, false, {
                        fileName: "/home/project/src/components/CheckoutModal.tsx",
                        lineNumber: 438,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/home/project/src/components/CheckoutModal.tsx",
                      lineNumber: 430,
                      columnNumber: 27
                    }, this)
                  ]
                },
                zone.id,
                true,
                {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 393,
                  columnNumber: 21
                },
                this
              )
            ) }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 391,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 381,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 324,
          columnNumber: 15
        }, this),
        pickupLocation && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-blue-900 text-base flex items-center justify-center sm:justify-start", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-blue-500 p-2 rounded-lg mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(MapPin, { className: "h-4 w-4 text-white" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 454,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 453,
                columnNumber: 25
              }, this),
              "📍 Ubicación del Local"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 452,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-blue-700 text-center sm:text-left sm:ml-11 mt-2", children: "Ver ubicación exacta en Google Maps (opcional)" }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 458,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 451,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col space-y-3", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-center w-full", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: showLocationMap,
                  onChange: (e) => setShowLocationMap(e.target.checked),
                  className: "mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                },
                void 0,
                false,
                {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 462,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-medium text-blue-700", children: "📍 Incluir ubicación en el pedido" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 468,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 461,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: openLocationMap,
                className: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center w-full",
                children: [
                  /* @__PURE__ */ jsxDEV(ExternalLink, { className: "h-4 w-4 mr-2" }, void 0, false, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 475,
                    columnNumber: 25
                  }, this),
                  "🗺️ Ver Mapa"
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 470,
                columnNumber: 23
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 460,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 450,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 449,
          columnNumber: 15
        }, this),
        deliveryZones.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "text-center py-6 sm:py-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-yellow-100 p-4 rounded-full w-fit mx-auto mb-6", children: /* @__PURE__ */ jsxDEV(Truck, { className: "h-8 w-8 sm:h-12 sm:w-12 text-yellow-600" }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 486,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 485,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-bold text-yellow-800 mb-3", children: "Solo disponible recogida en el local" }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 488,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base text-yellow-700 max-w-md mx-auto px-4", children: "Contacta con el administrador para configurar zonas de entrega adicionales." }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 491,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 484,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/CheckoutModal.tsx",
        lineNumber: 314,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-blue-200 shadow-xl", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6 flex items-center", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-blue-500 to-purple-500 p-2 sm:p-3 rounded-xl mr-2 sm:mr-3 shadow-lg", children: /* @__PURE__ */ jsxDEV(Calculator, { className: "h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 502,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 501,
            columnNumber: 17
          }, this),
          "Resumen del Pedido"
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 500,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl p-3 sm:p-4 lg:p-6 mb-4 lg:mb-6 border border-gray-200 shadow-sm", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-gray-900 mb-3 lg:mb-4 flex items-center text-sm sm:text-base lg:text-lg", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg lg:text-xl mr-2", children: "📦" }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 510,
              columnNumber: 19
            }, this),
            "Elementos del Pedido (",
            items.length,
            ")"
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 509,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 lg:space-y-4 max-h-40 sm:max-h-48 md:max-h-56 lg:max-h-80 overflow-y-auto", children: items.map(
            (item, index) => /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col py-2 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-900 text-sm sm:text-base line-clamp-2 mb-2", children: item.title }, void 0, false, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 517,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2 text-xs text-gray-600 mb-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-1 rounded-full ${item.type === "movie" ? "bg-blue-100 text-blue-700" : item.type === "tv" ? "bg-purple-100 text-purple-700" : "bg-pink-100 text-pink-700"}`, children: item.type === "movie" ? "🎬 Película" : item.type === "tv" ? "📺 Serie" : "📚 Novela" }, void 0, false, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 519,
                    columnNumber: 27
                  }, this),
                  item.selectedSeasons && item.selectedSeasons.length > 0 && /* @__PURE__ */ jsxDEV("span", { className: "bg-gray-200 text-gray-700 px-2 py-1 rounded-full", children: [
                    item.selectedSeasons.length,
                    " temp."
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 529,
                    columnNumber: 25
                  }, this),
                  item.chapters && /* @__PURE__ */ jsxDEV("span", { className: "bg-gray-200 text-gray-700 px-2 py-1 rounded-full", children: [
                    item.chapters,
                    " cap."
                  ] }, void 0, true, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 534,
                    columnNumber: 25
                  }, this),
                  item.type === "tv" && item.episodeCount && item.episodeCount > 50 && /* @__PURE__ */ jsxDEV("span", { className: "bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 px-2 py-1 rounded-full text-xs font-bold", children: "📊 Serie Extensa" }, void 0, false, {
                    fileName: "/home/project/src/components/CheckoutModal.tsx",
                    lineNumber: 539,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 518,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-1 rounded-full font-medium text-xs ${item.paymentType === "cash" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`, children: item.paymentType === "cash" ? "💵 Efectivo" : "💳 Transferencia" }, void 0, false, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 545,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 544,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 516,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-center w-full border-t border-gray-200 pt-2 sm:pt-3", children: /* @__PURE__ */ jsxDEV("p", { className: `font-bold text-base sm:text-lg ${item.paymentType === "cash" ? "text-green-600" : "text-orange-600"}`, children: [
                "$",
                item.price.toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 555,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 554,
                columnNumber: 23
              }, this)
            ] }, index, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 515,
              columnNumber: 19
            }, this)
          ) }, void 0, false, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 513,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 508,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 sm:space-y-4 mb-4 sm:mb-6", children: [
          items.filter((item) => item.paymentType === "cash").length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 border-2 border-green-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-green-500 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(DollarSign, { className: "h-3 w-3 sm:h-4 sm:w-4 text-white" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 573,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 572,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("h5", { className: "font-bold text-green-800 text-sm sm:text-base", children: "Pago en Efectivo" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 575,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 571,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-green-700 mb-1", children: [
                items.filter((item) => item.paymentType === "cash").length,
                " elementos"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 578,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-lg sm:text-xl font-bold text-green-800", children: [
                "$",
                items.filter((item) => item.paymentType === "cash").reduce((sum, item) => sum + item.price, 0).toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 581,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 577,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 570,
            columnNumber: 17
          }, this),
          items.filter((item) => item.paymentType === "transfer").length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 sm:p-4 border-2 border-orange-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-orange-500 p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3 shadow-sm", children: /* @__PURE__ */ jsxDEV(CreditCard, { className: "h-3 w-3 sm:h-4 sm:w-4 text-white" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 594,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 593,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("h5", { className: "font-bold text-orange-800 text-sm sm:text-base", children: "Transferencia Bancaria" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 596,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 592,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-orange-700 mb-1", children: [
                items.filter((item) => item.paymentType === "transfer").length,
                " elementos (+10%)"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 599,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-lg sm:text-xl font-bold text-orange-800", children: [
                "$",
                items.filter((item) => item.paymentType === "transfer").reduce((sum, item) => sum + item.price, 0).toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 602,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 598,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 591,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 567,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 sm:space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-between items-center py-3 sm:py-4 px-3 sm:px-4 bg-white rounded-lg border border-gray-200 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-700 font-medium flex items-center text-center text-sm sm:text-base", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "mr-2", children: "🛒" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 615,
                columnNumber: 21
              }, this),
              "Subtotal (",
              items.length,
              " elementos)"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 614,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-gray-900 text-lg sm:text-xl", children: [
              "$",
              total.toLocaleString(),
              " CUP"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 618,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 613,
            columnNumber: 17
          }, this),
          selectedZone && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-between items-center py-3 sm:py-4 px-3 sm:px-4 bg-white rounded-lg border border-gray-200 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-700 font-medium flex items-center text-center text-sm sm:text-base", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "mr-2", children: pickupLocation ? "🏪" : "🚚" }, void 0, false, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 624,
                columnNumber: 23
              }, this),
              pickupLocation ? "Recogida en local" : `Entrega a ${selectedZone}`
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 623,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `font-bold text-lg sm:text-xl ${deliveryCost === 0 ? "text-green-600" : "text-blue-600"}`, children: deliveryCost === 0 ? "✨ GRATIS" : `$${deliveryCost.toLocaleString()} CUP` }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 627,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 622,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 sm:p-6 border-2 border-green-300 shadow-lg", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center space-y-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-xl font-bold text-gray-900 flex items-center", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "mr-2", children: "💰" }, void 0, false, {
                  fileName: "/home/project/src/components/CheckoutModal.tsx",
                  lineNumber: 636,
                  columnNumber: 23
                }, this),
                "TOTAL A PAGAR"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 635,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-2xl sm:text-3xl font-bold text-green-600", children: [
                "$",
                (total + deliveryCost).toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/CheckoutModal.tsx",
                lineNumber: 639,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 634,
              columnNumber: 19
            }, this),
            deliveryCost > 0 && /* @__PURE__ */ jsxDEV("div", { className: "mt-3 text-xs sm:text-sm text-gray-600 text-center", children: [
              "Incluye $",
              deliveryCost.toLocaleString(),
              " CUP de entrega"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 644,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/CheckoutModal.tsx",
            lineNumber: 633,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 612,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/CheckoutModal.tsx",
        lineNumber: 499,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          className: "w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 active:from-green-700 active:to-emerald-700 text-white px-6 py-5 lg:py-6 rounded-2xl font-bold text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl flex items-center justify-center touch-manipulation",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-2 lg:p-3 rounded-lg mr-3", children: /* @__PURE__ */ jsxDEV(Send, { className: "h-6 w-6 lg:h-7 lg:w-7" }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 658,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/home/project/src/components/CheckoutModal.tsx",
              lineNumber: 657,
              columnNumber: 15
            }, this),
            "📱 Enviar Pedido por WhatsApp"
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 653,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mt-3 sm:mt-4 p-3 sm:p-4 lg:p-5 bg-green-50 rounded-xl border border-green-200", children: /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm lg:text-base text-green-700 font-medium flex items-center justify-center flex-wrap", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "mr-2", children: "ℹ️" }, void 0, false, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 665,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-center", children: "Al enviar el pedido serás redirigido a WhatsApp para completar la transacción" }, void 0, false, {
          fileName: "/home/project/src/components/CheckoutModal.tsx",
          lineNumber: 666,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/CheckoutModal.tsx",
        lineNumber: 664,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/home/project/src/components/CheckoutModal.tsx",
        lineNumber: 663,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/CheckoutModal.tsx",
      lineNumber: 244,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/CheckoutModal.tsx",
      lineNumber: 243,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/CheckoutModal.tsx",
    lineNumber: 221,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/components/CheckoutModal.tsx",
    lineNumber: 220,
    columnNumber: 5
  }, this);
}
_s(CheckoutModal, "SIPnpsTMJvqfDg/odJMWQK0cg0E=", false, function() {
  return [useCart];
});
_c = CheckoutModal;
var _c;
$RefreshReg$(_c, "CheckoutModal");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/CheckoutModal.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/CheckoutModal.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LFVBQ0MsTUFBSztBQUFBLFVBQ0wsV0FBVTtBQUFBLFVBRVY7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsMENBQ2IsaUNBQUMsUUFBSyxXQUFVLDJCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF1QyxLQUR6QztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFBSztBQUFBO0FBQUE7QUFBQSxRQU5QO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVFBO0FBQUEsTUFFQSx1QkFBQyxTQUFJLFdBQVUsNkZBQ2IsaUNBQUMsT0FBRSxXQUFVLHlHQUNYO0FBQUEsK0JBQUMsVUFBSyxXQUFVLFFBQU8sa0JBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBeUI7QUFBQSxRQUN6Qix1QkFBQyxVQUFLLFdBQVUsZUFBYyw2RkFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUEyRztBQUFBLFdBRjdHO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFHQSxLQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFLQTtBQUFBLFNBeGFGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F5YUEsS0ExYUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQTJhQTtBQUFBLE9BamNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FrY0EsS0FuY0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQW9jQTtBQUVKO0FBQUN0RSxHQXpsQmVOLGVBQWE7QUFBQSxVQUNFVCxPQUFPO0FBQUE7QUFBQWtHLEtBRHRCekY7QUFBYSxJQUFBeUY7QUFBQUMsYUFBQUQsSUFBQSIsIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiWCIsIk1hcFBpbiIsIlVzZXIiLCJIb21lIiwiQ3JlZGl0Q2FyZCIsIkRvbGxhclNpZ24iLCJTZW5kIiwiQ2FsY3VsYXRvciIsIlRydWNrIiwiRXh0ZXJuYWxMaW5rIiwidXNlQ2FydCIsInZhbGlkYXRlQ3ViYW5QaG9uZSIsInBob25lIiwiY2xlYW5QaG9uZSIsInJlcGxhY2UiLCJwYXR0ZXJucyIsInNvbWUiLCJwYXR0ZXJuIiwidGVzdCIsIkNoZWNrb3V0TW9kYWwiLCJpc09wZW4iLCJvbkNsb3NlIiwib25DaGVja291dCIsIml0ZW1zIiwidG90YWwiLCJfcyIsImdldEN1cnJlbnRQcmljZXMiLCJjdXN0b21lckluZm8iLCJzZXRDdXN0b21lckluZm8iLCJmdWxsTmFtZSIsImFkZHJlc3MiLCJzZWxlY3RlZFpvbmUiLCJzZXRTZWxlY3RlZFpvbmUiLCJkZWxpdmVyeUNvc3QiLCJzZXREZWxpdmVyeUNvc3QiLCJwaWNrdXBMb2NhdGlvbiIsInNldFBpY2t1cExvY2F0aW9uIiwic2hvd0xvY2F0aW9uTWFwIiwic2V0U2hvd0xvY2F0aW9uTWFwIiwiZXJyb3JzIiwic2V0RXJyb3JzIiwiZGVsaXZlcnlab25lcyIsInNldERlbGl2ZXJ5Wm9uZXMiLCJsb2FkRGVsaXZlcnlab25lcyIsImFkbWluQ29uZmlnIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwiY29uc29sZSIsImhhbmRsZUFkbWluU3RhdGVDaGFuZ2UiLCJldmVudCIsImRldGFpbCIsInR5cGUiLCJoYW5kbGVBZG1pbkZ1bGxTeW5jIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwaWNrdXBPcHRpb24iLCJpZCIsIm5hbWUiLCJjb3N0IiwiYWxsRGVsaXZlcnlPcHRpb25zIiwiem9uZSIsImZpbmQiLCJ6IiwidmFsaWRhdGVGb3JtIiwibmV3RXJyb3JzIiwidHJpbSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJvcmRlcklkIiwiRGF0ZSIsIm5vdyIsIm9yZGVyRGF0YSIsImRlbGl2ZXJ5Wm9uZSIsInN1YnRvdGFsIiwidHJhbnNmZXJGZWUiLCJoYW5kbGVJbnB1dENoYW5nZSIsImZpZWxkIiwidmFsdWUiLCJwcmV2IiwidW5kZWZpbmVkIiwiaGFuZGxlWm9uZUNoYW5nZSIsIm9wZW5Mb2NhdGlvbk1hcCIsIm1hcFVybCIsIm9wZW4iLCJ0YXJnZXQiLCJtYXAiLCJ0b0xvY2FsZVN0cmluZyIsImNoZWNrZWQiLCJpdGVtIiwiaW5kZXgiLCJ0aXRsZSIsInNlbGVjdGVkU2Vhc29ucyIsImNoYXB0ZXJzIiwiZXBpc29kZUNvdW50IiwicGF5bWVudFR5cGUiLCJwcmljZSIsImZpbHRlciIsInJlZHVjZSIsInN1bSIsIl9jIiwiJFJlZnJlc2hSZWckIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkNoZWNrb3V0TW9kYWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgWCwgTWFwUGluLCBVc2VyLCBQaG9uZSwgSG9tZSwgQ3JlZGl0Q2FyZCwgRG9sbGFyU2lnbiwgU2VuZCwgQ2FsY3VsYXRvciwgVHJ1Y2ssIEV4dGVybmFsTGluayB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VDYXJ0IH0gZnJvbSAnLi4vY29udGV4dC9DYXJ0Q29udGV4dCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tZXJJbmZvIHtcbiAgZnVsbE5hbWU6IHN0cmluZztcbiAgcGhvbmU6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9yZGVyRGF0YSB7XG4gIG9yZGVySWQ6IHN0cmluZztcbiAgY3VzdG9tZXJJbmZvOiBDdXN0b21lckluZm87XG4gIGRlbGl2ZXJ5Wm9uZTogc3RyaW5nO1xuICBkZWxpdmVyeUNvc3Q6IG51bWJlcjtcbiAgaXRlbXM6IGFueVtdO1xuICBzdWJ0b3RhbDogbnVtYmVyO1xuICB0cmFuc2ZlckZlZTogbnVtYmVyO1xuICB0b3RhbDogbnVtYmVyO1xuICBjYXNoVG90YWw/OiBudW1iZXI7XG4gIHRyYW5zZmVyVG90YWw/OiBudW1iZXI7XG4gIHBpY2t1cExvY2F0aW9uPzogYm9vbGVhbjtcbiAgc2hvd0xvY2F0aW9uTWFwPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIENoZWNrb3V0TW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgb25DaGVja291dDogKG9yZGVyRGF0YTogT3JkZXJEYXRhKSA9PiB2b2lkO1xuICBpdGVtczogQXJyYXk8e1xuICAgIGlkOiBudW1iZXI7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBwcmljZTogbnVtYmVyO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gIH0+O1xuICB0b3RhbDogbnVtYmVyO1xufVxuXG4vLyBWYWxpZGFkb3IgZGUgbsO6bWVyb3MgZGUgdGVsw6lmb25vIGN1YmFub3NcbmNvbnN0IHZhbGlkYXRlQ3ViYW5QaG9uZSA9IChwaG9uZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIC8vIFJlbW92ZXIgZXNwYWNpb3MsIGd1aW9uZXMgeSBwYXLDqW50ZXNpc1xuICBjb25zdCBjbGVhblBob25lID0gcGhvbmUucmVwbGFjZSgvW1xcc1xcLSgpXS9nLCAnJyk7XG4gIFxuICAvLyBQYXRyb25lcyB2w6FsaWRvcyBwYXJhIG7Dum1lcm9zIGN1YmFub3NcbiAgY29uc3QgcGF0dGVybnMgPSBbXG4gICAgL14oXFwrNTN8NTMpP1s1LTldXFxkezd9JC8sIC8vIE3Ds3ZpbGVzOiA1eHh4eHh4eCwgNnh4eHh4eHgsIDd4eHh4eHh4LCA4eHh4eHh4eCwgOXh4eHh4eHhcbiAgICAvXihcXCs1M3w1Myk/WzItNF1cXGR7Niw3fSQvLCAvLyBGaWpvczogMnh4eHh4eHgsIDN4eHh4eHh4LCA0eHh4eHh4eCAoNy04IGTDrWdpdG9zKVxuICAgIC9eKFxcKzUzfDUzKT83WzAtOV1cXGR7Nn0kLywgLy8gTsO6bWVyb3MgZXNwZWNpYWxlcyBxdWUgZW1waWV6YW4gY29uIDdcbiAgXTtcbiAgXG4gIHJldHVybiBwYXR0ZXJucy5zb21lKHBhdHRlcm4gPT4gcGF0dGVybi50ZXN0KGNsZWFuUGhvbmUpKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBDaGVja291dE1vZGFsKHsgaXNPcGVuLCBvbkNsb3NlLCBvbkNoZWNrb3V0LCBpdGVtcywgdG90YWwgfTogQ2hlY2tvdXRNb2RhbFByb3BzKSB7XG4gIGNvbnN0IHsgZ2V0Q3VycmVudFByaWNlcyB9ID0gdXNlQ2FydCgpO1xuICBjb25zdCBbY3VzdG9tZXJJbmZvLCBzZXRDdXN0b21lckluZm9dID0gdXNlU3RhdGU8Q3VzdG9tZXJJbmZvPih7XG4gICAgZnVsbE5hbWU6ICcnLFxuICAgIHBob25lOiAnJyxcbiAgICBhZGRyZXNzOiAnJ1xuICB9KTtcbiAgY29uc3QgW3NlbGVjdGVkWm9uZSwgc2V0U2VsZWN0ZWRab25lXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2RlbGl2ZXJ5Q29zdCwgc2V0RGVsaXZlcnlDb3N0XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbcGlja3VwTG9jYXRpb24sIHNldFBpY2t1cExvY2F0aW9uXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dMb2NhdGlvbk1hcCwgc2V0U2hvd0xvY2F0aW9uTWFwXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlPFBhcnRpYWw8Q3VzdG9tZXJJbmZvICYgeyB6b25lOiBzdHJpbmcgfT4+KHt9KTtcbiAgY29uc3QgW2RlbGl2ZXJ5Wm9uZXMsIHNldERlbGl2ZXJ5Wm9uZXNdID0gdXNlU3RhdGU8YW55W10+KFtdKTtcblxuICAvLyBMb2FkIGRlbGl2ZXJ5IHpvbmVzIGZyb20gYWRtaW4gY29uZmlnXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZERlbGl2ZXJ5Wm9uZXMgPSAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBhZG1pbkNvbmZpZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzeXN0ZW1fY29uZmlnJyk7XG4gICAgICAgIGlmIChhZG1pbkNvbmZpZykge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IEpTT04ucGFyc2UoYWRtaW5Db25maWcpO1xuICAgICAgICAgIGlmIChjb25maWcuZGVsaXZlcnlab25lcykge1xuICAgICAgICAgICAgc2V0RGVsaXZlcnlab25lcyhjb25maWcuZGVsaXZlcnlab25lcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGRlbGl2ZXJ5IHpvbmVzOicsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbG9hZERlbGl2ZXJ5Wm9uZXMoKTtcblxuICAgIC8vIExpc3RlbiBmb3IgYWRtaW4gdXBkYXRlc1xuICAgIGNvbnN0IGhhbmRsZUFkbWluU3RhdGVDaGFuZ2UgPSAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQuZGV0YWlsLnR5cGUgPT09ICdkZWxpdmVyeV96b25lX2FkZCcgfHwgXG4gICAgICAgICAgZXZlbnQuZGV0YWlsLnR5cGUgPT09ICdkZWxpdmVyeV96b25lX3VwZGF0ZScgfHwgXG4gICAgICAgICAgZXZlbnQuZGV0YWlsLnR5cGUgPT09ICdkZWxpdmVyeV96b25lX2RlbGV0ZScpIHtcbiAgICAgICAgbG9hZERlbGl2ZXJ5Wm9uZXMoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlQWRtaW5GdWxsU3luYyA9IChldmVudDogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5kZXRhaWwuY29uZmlnPy5kZWxpdmVyeVpvbmVzKSB7XG4gICAgICAgIHNldERlbGl2ZXJ5Wm9uZXMoZXZlbnQuZGV0YWlsLmNvbmZpZy5kZWxpdmVyeVpvbmVzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2FkbWluX3N0YXRlX2NoYW5nZScsIGhhbmRsZUFkbWluU3RhdGVDaGFuZ2UgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2FkbWluX2Z1bGxfc3luYycsIGhhbmRsZUFkbWluRnVsbFN5bmMgYXMgRXZlbnRMaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkbWluX3N0YXRlX2NoYW5nZScsIGhhbmRsZUFkbWluU3RhdGVDaGFuZ2UgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRtaW5fZnVsbF9zeW5jJywgaGFuZGxlQWRtaW5GdWxsU3luYyBhcyBFdmVudExpc3RlbmVyKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgLy8gQWdyZWdhciBvcGNpw7NuIGRlIHJlY29naWRhIGVuIGVsIGxvY2FsXG4gIGNvbnN0IHBpY2t1cE9wdGlvbiA9IHtcbiAgICBpZDogJ3BpY2t1cCcsXG4gICAgbmFtZTogJ1JlY29naWRhIGVuIFRWIGEgbGEgQ2FydGEnLFxuICAgIGNvc3Q6IDBcbiAgfTtcblxuICBjb25zdCBhbGxEZWxpdmVyeU9wdGlvbnMgPSBbcGlja3VwT3B0aW9uLCAuLi5kZWxpdmVyeVpvbmVzXTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZFpvbmUgPT09ICdwaWNrdXAnKSB7XG4gICAgICBzZXREZWxpdmVyeUNvc3QoMCk7XG4gICAgICBzZXRQaWNrdXBMb2NhdGlvbih0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkWm9uZSkge1xuICAgICAgY29uc3Qgem9uZSA9IGRlbGl2ZXJ5Wm9uZXMuZmluZCh6ID0+IHoubmFtZSA9PT0gc2VsZWN0ZWRab25lKTtcbiAgICAgIHNldERlbGl2ZXJ5Q29zdCh6b25lID8gem9uZS5jb3N0IDogMCk7XG4gICAgICBzZXRQaWNrdXBMb2NhdGlvbihmYWxzZSk7XG4gICAgfVxuICB9LCBbc2VsZWN0ZWRab25lLCBkZWxpdmVyeVpvbmVzXSk7XG5cbiAgY29uc3QgdmFsaWRhdGVGb3JtID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IG5ld0Vycm9yczogUGFydGlhbDxDdXN0b21lckluZm8gJiB7IHpvbmU6IHN0cmluZyB9PiA9IHt9O1xuXG4gICAgaWYgKCFjdXN0b21lckluZm8uZnVsbE5hbWUudHJpbSgpKSB7XG4gICAgICBuZXdFcnJvcnMuZnVsbE5hbWUgPSAnRWwgbm9tYnJlIGNvbXBsZXRvIGVzIHJlcXVlcmlkbyc7XG4gICAgfVxuXG4gICAgaWYgKCFjdXN0b21lckluZm8ucGhvbmUudHJpbSgpKSB7XG4gICAgICBuZXdFcnJvcnMucGhvbmUgPSAnRWwgdGVsw6lmb25vIGVzIHJlcXVlcmlkbyc7XG4gICAgfSBlbHNlIGlmICghdmFsaWRhdGVDdWJhblBob25lKGN1c3RvbWVySW5mby5waG9uZSkpIHtcbiAgICAgIG5ld0Vycm9ycy5waG9uZSA9ICdOw7ptZXJvIGRlIHRlbMOpZm9ubyBjdWJhbm8gaW52w6FsaWRvIChlajogKzUzIDU0NjkgMDg3OCwgNTQ2OTA4NzgsIDIyMzQ1Njc4KSc7XG4gICAgfVxuXG4gICAgaWYgKCFwaWNrdXBMb2NhdGlvbiAmJiAhY3VzdG9tZXJJbmZvLmFkZHJlc3MudHJpbSgpKSB7XG4gICAgICBuZXdFcnJvcnMuYWRkcmVzcyA9ICdMYSBkaXJlY2Npw7NuIGVzIHJlcXVlcmlkYSBwYXJhIGVudHJlZ2EgYSBkb21pY2lsaW8nO1xuICAgIH1cblxuICAgIGlmICghc2VsZWN0ZWRab25lKSB7XG4gICAgICBuZXdFcnJvcnMuem9uZSA9ICdEZWJlIHNlbGVjY2lvbmFyIHVuYSBvcGNpw7NuIGRlIGVudHJlZ2EnO1xuICAgIH1cblxuICAgIHNldEVycm9ycyhuZXdFcnJvcnMpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhuZXdFcnJvcnMpLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGlmICghdmFsaWRhdGVGb3JtKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvcmRlcklkID0gYFRWLSR7RGF0ZS5ub3coKX1gO1xuICAgIGNvbnN0IG9yZGVyRGF0YTogT3JkZXJEYXRhID0ge1xuICAgICAgb3JkZXJJZCxcbiAgICAgIGN1c3RvbWVySW5mbyxcbiAgICAgIGRlbGl2ZXJ5Wm9uZTogc2VsZWN0ZWRab25lLFxuICAgICAgZGVsaXZlcnlDb3N0LFxuICAgICAgaXRlbXMsXG4gICAgICBzdWJ0b3RhbDogdG90YWwsXG4gICAgICB0cmFuc2ZlckZlZTogMCxcbiAgICAgIHRvdGFsOiB0b3RhbCArIGRlbGl2ZXJ5Q29zdCxcbiAgICAgIHBpY2t1cExvY2F0aW9uLFxuICAgICAgc2hvd0xvY2F0aW9uTWFwXG4gICAgfTtcblxuICAgIG9uQ2hlY2tvdXQob3JkZXJEYXRhKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChmaWVsZDoga2V5b2YgQ3VzdG9tZXJJbmZvLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q3VzdG9tZXJJbmZvKHByZXYgPT4gKHsgLi4ucHJldiwgW2ZpZWxkXTogdmFsdWUgfSkpO1xuICAgIGlmIChlcnJvcnNbZmllbGRdKSB7XG4gICAgICBzZXRFcnJvcnMocHJldiA9PiAoeyAuLi5wcmV2LCBbZmllbGRdOiB1bmRlZmluZWQgfSkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVab25lQ2hhbmdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTZWxlY3RlZFpvbmUodmFsdWUpO1xuICAgIGlmIChlcnJvcnMuem9uZSkge1xuICAgICAgc2V0RXJyb3JzKHByZXYgPT4gKHsgLi4ucHJldiwgem9uZTogdW5kZWZpbmVkIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgb3BlbkxvY2F0aW9uTWFwID0gKCkgPT4ge1xuICAgIGNvbnN0IG1hcFVybCA9ICdodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvcGxhY2UvMjAlQzIlQjAwMlxcJzIyLjUlMjJOKzc1JUMyJUIwNTBcXCc1OC44JTIyVy9AMjAuMDM5NDYwNCwtNzUuODQ5NTQxNCwxODBtL2RhdGE9ITNtMSExZTMhNG00ITNtMyE4bTIhM2QyMC4wMzk1ODUhNGQtNzUuODQ5NjYzP2VudHJ5PXR0dSZnX2VwPUVnb3lNREkxTURjek1DNHdJS1hNRFNvQVNBRlFBdyUzRCUzRCc7XG4gICAgd2luZG93Lm9wZW4obWFwVXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKTtcbiAgfTtcblxuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2svNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0yIHNtOnAtNCBtZDpwLTYgbGc6cC04IHotNTAgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHctZnVsbCBtYXgtdy0yeGwgbGc6bWF4LXctNHhsIHhsOm1heC13LTV4bCBteS00IHNtOm15LTYgbGc6bXktOCBtYXgtaC1bOTV2aF0gc206bWF4LWgtWzkwdmhdIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctMnhsXCI+XG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNjAwIHRvLXB1cnBsZS02MDAgcC00IHNtOnAtNiBsZzpwLTggdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUvMjAgcC0yIHNtOnAtMyByb3VuZGVkLXhsIG1yLTIgc206bXItNFwiPlxuICAgICAgICAgICAgICAgIDxTZW5kIGNsYXNzTmFtZT1cImgtNSB3LTUgc206aC02IHNtOnctNlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWxnIHNtOnRleHQtMnhsIGxnOnRleHQtM3hsIGZvbnQtYm9sZFwiPkZpbmFsaXphciBQZWRpZG88L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSBsZzp0ZXh0LWJhc2UgdGV4dC1ibHVlLTEwMFwiPkNvbXBsZXRhIHR1cyBkYXRvcyBwYXJhIHByb2NlZGVyPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgaG92ZXI6Ymctd2hpdGUvMjAgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tY29sb3JzIHRvdWNoLW1hbmlwdWxhdGlvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cImgtNSB3LTUgc206aC02IHNtOnctNlwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy15LWF1dG8gbWF4LWgtW2NhbGMoOTV2aC0xMDBweCldIHNtOm1heC1oLVtjYWxjKDkwdmgtMTIwcHgpXVwiPlxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInAtNCBzbTpwLTYgbGc6cC04IHNwYWNlLXktNCBzbTpzcGFjZS15LTZcIj5cbiAgICAgICAgICAgIHsvKiBDdXN0b21lciBJbmZvcm1hdGlvbiAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBzbTpwLTYgbGc6cC04XCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBsZzp0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00IGxnOm1iLTYgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8VXNlciBjbGFzc05hbWU9XCJoLTQgdy00IHNtOmgtNSBzbTp3LTUgbGc6aC02IGxnOnctNiBtci0yIHRleHQtYmx1ZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgIEluZm9ybWFjacOzbiBQZXJzb25hbFxuICAgICAgICAgICAgICA8L2gzPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGxnOnNwYWNlLXktNVwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBsZzp0ZXh0LWJhc2UgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIE5vbWJyZSBDb21wbGV0byAqXG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1c3RvbWVySW5mby5mdWxsTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJbnB1dENoYW5nZSgnZnVsbE5hbWUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweC00IHB5LTMgbGc6cHktNCB0ZXh0LWJhc2UgbGc6dGV4dC1sZyBib3JkZXIgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMuZnVsbE5hbWUgPyAnYm9yZGVyLXJlZC01MDAnIDogJ2JvcmRlci1ncmF5LTMwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSW5ncmVzYSB0dSBub21icmUgY29tcGxldG9cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHtlcnJvcnMuZnVsbE5hbWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDAgdGV4dC1zbSBsZzp0ZXh0LWJhc2UgbXQtMVwiPntlcnJvcnMuZnVsbE5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBsZzp0ZXh0LWJhc2UgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIFRlbMOpZm9ubyAqXG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZWxcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VzdG9tZXJJbmZvLnBob25lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUlucHV0Q2hhbmdlKCdwaG9uZScsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB4LTQgcHktMyBsZzpweS00IHRleHQtYmFzZSBsZzp0ZXh0LWxnIGJvcmRlciByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCAke1xuICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5waG9uZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnYm9yZGVyLWdyYXktMzAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIrNTMgNTQ2OSAwODc4IG8gNTQ2OTA4NzhcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHtlcnJvcnMucGhvbmUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDAgdGV4dC1zbSBsZzp0ZXh0LWJhc2UgbXQtMVwiPntlcnJvcnMucGhvbmV9PC9wPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgdGV4dC14cyBsZzp0ZXh0LXNtIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgRm9ybWF0b3MgdsOhbGlkb3M6ICs1MyA1NDY5IDA4NzgsIDU0NjkwODc4LCAyMjM0NTY3OFxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGxnOnRleHQtYmFzZSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgRGlyZWNjacOzbiBDb21wbGV0YSB7IXBpY2t1cExvY2F0aW9uICYmICcqJ31cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1c3RvbWVySW5mby5hZGRyZXNzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUlucHV0Q2hhbmdlKCdhZGRyZXNzJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcHgtNCBweS0zIGxnOnB5LTQgdGV4dC1iYXNlIGxnOnRleHQtbGcgYm9yZGVyIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIHJlc2l6ZS1ub25lICR7XG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLmFkZHJlc3MgPyAnYm9yZGVyLXJlZC01MDAnIDogJ2JvcmRlci1ncmF5LTMwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwaWNrdXBMb2NhdGlvbiA/IFwiRGlyZWNjacOzbiBvcGNpb25hbCBwYXJhIGNvbnRhY3RvXCIgOiBcIkNhbGxlLCBuw7ptZXJvLCBlbnRyZSBjYWxsZXMsIHJlZmVyZW5jaWFzLi4uXCJ9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwaWNrdXBMb2NhdGlvbn1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB7ZXJyb3JzLmFkZHJlc3MgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDAgdGV4dC1zbSBsZzp0ZXh0LWJhc2UgbXQtMVwiPntlcnJvcnMuYWRkcmVzc308L3A+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogRGVsaXZlcnkgT3B0aW9ucyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JheS01MCByb3VuZGVkLXhsIHAtNCBzbTpwLTYgbGc6cC04XCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBsZzp0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00IGxnOm1iLTYgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8TWFwUGluIGNsYXNzTmFtZT1cImgtNCB3LTQgc206aC01IHNtOnctNSBsZzpoLTYgbGc6dy02IG1yLTIgdGV4dC1ncmVlbi02MDBcIiAvPlxuICAgICAgICAgICAgICAgIE9wY2lvbmVzIGRlIEVudHJlZ2EgKlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAge2Vycm9ycy56b25lICYmIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDAgdGV4dC1zbSBtYi00XCI+e2Vycm9ycy56b25lfTwvcD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHNtOnNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIHsvKiBQaWNrdXAgT3B0aW9uICovfVxuICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZ3JvdXAgZmxleCBmbGV4LWNvbCBwLTQgc206cC02IGJvcmRlci0yIHJvdW5kZWQtMnhsIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtWzEuMDJdIHNwYWNlLXktMyAke1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFpvbmUgPT09ICdwaWNrdXAnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWdyZWVuLTUwMCBiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNTAgdG8tZW1lcmFsZC01MCBzaGFkb3ctbGcgc2NhbGUtWzEuMDJdJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1ncmF5LTMwMCBob3Zlcjpib3JkZXItZ3JlZW4tNDAwIGhvdmVyOmJnLWdyZWVuLTUwLzUwIGhvdmVyOnNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgdy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbXItNCBwLTMgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkWm9uZSA9PT0gJ3BpY2t1cCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyZWVuLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZydcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYXktMjAwIHRleHQtZ3JheS02MDAgZ3JvdXAtaG92ZXI6YmctZ3JlZW4tMTAwIGdyb3VwLWhvdmVyOnRleHQtZ3JlZW4tNjAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgPEhvbWUgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJkZWxpdmVyeU9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJwaWNrdXBcIlxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkWm9uZSA9PT0gJ3BpY2t1cCd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVab25lQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtci0zIHNtOm1yLTQgaC00IHctNCBzbTpoLTUgc206dy01IHRleHQtZ3JlZW4tNjAwIGZvY3VzOnJpbmctZ3JlZW4tNTAwIGZvY3VzOnJpbmctMlwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtgZm9udC1ib2xkIHRleHQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkWm9uZSA9PT0gJ3BpY2t1cCcgPyAndGV4dC1ncmVlbi04MDAnIDogJ3RleHQtZ3JheS05MDAgZ3JvdXAtaG92ZXI6dGV4dC1ncmVlbi03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+PqiBSZWNvZ2lkYSBlbiBUViBhIGxhIENhcnRhXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YHRleHQtc20gdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkWm9uZSA9PT0gJ3BpY2t1cCcgPyAndGV4dC1ncmVlbi03MDAnIDogJ3RleHQtZ3JheS02MDAgZ3JvdXAtaG92ZXI6dGV4dC1ncmVlbi02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAg8J+TjSBSZXBhcnRvIE51ZXZvIFZpc3RhIEFsZWdyZSwgU2FudGlhZ28gZGUgQ3ViYVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2B0ZXh0LXhzIG10LTEgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkWm9uZSA9PT0gJ3BpY2t1cCcgPyAndGV4dC1ncmVlbi02MDAnIDogJ3RleHQtZ3JheS01MDAgZ3JvdXAtaG92ZXI6dGV4dC1ncmVlbi01MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAg4o+wIERpc3BvbmlibGUgZGUgOTowMCBBTSBhIDg6MDAgUE1cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHctZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLWZ1bGwgZm9udC1ib2xkIHRleHQtbGcgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRab25lID09PSAncGlja3VwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JlZW4tNTAwIHRleHQtd2hpdGUgc2hhZG93LWxnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tNzAwIGdyb3VwLWhvdmVyOmJnLWdyZWVuLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgIOKcqCBHUkFUSVNcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMCBtdC0xXCI+U2luIGNvc3RvIGFkaWNpb25hbDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICB7LyogSG9tZSBEZWxpdmVyeSBPcHRpb24gKi99XG4gICAgICAgICAgICAgICAge2RlbGl2ZXJ5Wm9uZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci0yIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LXNtIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MCB0by1pbmRpZ28tNTAgcC0zIHNtOnAtNCBib3JkZXItYiBib3JkZXItZ3JheS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtYmx1ZS05MDAgZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1iYXNlIHNtOnRleHQtbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYmx1ZS01MDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFRydWNrIGNsYXNzTmFtZT1cImgtNCB3LTQgc206aC01IHNtOnctNSB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgRW50cmVnYSBhIERvbWljaWxpb1xuICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWJsdWUtNzAwIG1sLTEwIHNtOm1sLTEyIG10LTFcIj5TZWxlY2Npb25hIHR1IHpvbmEgZGUgZW50cmVnYTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LWgtNjQgc206bWF4LWgtODAgb3ZlcmZsb3cteS1hdXRvIGJnLXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2RlbGl2ZXJ5Wm9uZXMubWFwKCh6b25lKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt6b25lLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bncm91cCBmbGV4IGZsZXgtY29sIHAtMyBzbTpwLTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMTAwIGxhc3Q6Ym9yZGVyLWItMCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6YmctZ3JhZGllbnQtdG8tciBob3Zlcjpmcm9tLWJsdWUtNTAgaG92ZXI6dG8taW5kaWdvLTUwIHNwYWNlLXktMyAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkWm9uZSA9PT0gem9uZS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MCB0by1pbmRpZ28tNTAgYm9yZGVyLWJsdWUtMjAwIHNoYWRvdy1pbm5lcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgdy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Btci00IHAtMiByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFpvbmUgPT09IHpvbmUubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ibHVlLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JheS0yMDAgdGV4dC1ncmF5LTYwMCBncm91cC1ob3ZlcjpiZy1ibHVlLTEwMCBncm91cC1ob3Zlcjp0ZXh0LWJsdWUtNjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNYXBQaW4gY2xhc3NOYW1lPVwiaC0zIHctMyBzbTpoLTQgc206dy00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZGVsaXZlcnlPcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3pvbmUubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkWm9uZSA9PT0gem9uZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVab25lQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1yLTMgaC00IHctNCBzbTpoLTUgc206dy01IHRleHQtYmx1ZS02MDAgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpyaW5nLTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YGZvbnQtYm9sZCB0ZXh0LWJhc2UgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRab25lID09PSB6b25lLm5hbWUgPyAndGV4dC1ibHVlLTgwMCcgOiAndGV4dC1ncmF5LTkwMCBncm91cC1ob3Zlcjp0ZXh0LWJsdWUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5qaIHt6b25lLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2B0ZXh0LXNtIG10LTEgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRab25lID09PSB6b25lLm5hbWUgPyAndGV4dC1ibHVlLTYwMCcgOiAndGV4dC1ncmF5LTUwMCBncm91cC1ob3Zlcjp0ZXh0LWJsdWUtNTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDij7AgRW50cmVnYSBlbiAyNC00OCBob3Jhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciB3LWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLWZ1bGwgZm9udC1ib2xkIHRleHQtYmFzZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkWm9uZSA9PT0gem9uZS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWJsdWUtNTAwIHRleHQtd2hpdGUgc2hhZG93LWxnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ibHVlLTEwMCB0ZXh0LWJsdWUtNzAwIGdyb3VwLWhvdmVyOmJnLWJsdWUtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7em9uZS5jb3N0LnRvTG9jYWxlU3RyaW5nKCl9IENVUFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMCBtdC0xXCI+Q29zdG8gZGUgZW50cmVnYTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBMb2NhdGlvbiBNYXAgT3B0aW9uICovfVxuICAgICAgICAgICAgICB7cGlja3VwTG9jYXRpb24gJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBzbTptdC02IHAtNCBzbTpwLTYgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAgdG8taW5kaWdvLTUwIHJvdW5kZWQtMnhsIGJvcmRlci0yIGJvcmRlci1ibHVlLTIwMCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtYmx1ZS05MDAgdGV4dC1iYXNlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNtOmp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYmx1ZS01MDAgcC0yIHJvdW5kZWQtbGcgbXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPE1hcFBpbiBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5ONIFViaWNhY2nDs24gZGVsIExvY2FsXG4gICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtYmx1ZS03MDAgdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0IHNtOm1sLTExIG10LTJcIj5WZXIgdWJpY2FjacOzbiBleGFjdGEgZW4gR29vZ2xlIE1hcHMgKG9wY2lvbmFsKTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2hvd0xvY2F0aW9uTWFwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNob3dMb2NhdGlvbk1hcChlLnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXItMyBoLTUgdy01IHRleHQtYmx1ZS02MDAgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpyaW5nLTIgZmxleC1zaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWJsdWUtNzAwXCI+8J+TjSBJbmNsdWlyIHViaWNhY2nDs24gZW4gZWwgcGVkaWRvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvcGVuTG9jYXRpb25NYXB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MDAgdG8taW5kaWdvLTUwMCBob3Zlcjpmcm9tLWJsdWUtNjAwIGhvdmVyOnRvLWluZGlnby02MDAgdGV4dC13aGl0ZSBweC00IHB5LTMgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSBzaGFkb3ctbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXh0ZXJuYWxMaW5rIGNsYXNzTmFtZT1cImgtNCB3LTQgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5e677iPIFZlciBNYXBhXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAge2RlbGl2ZXJ5Wm9uZXMubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTYgc206cHktOCBiZy1ncmFkaWVudC10by1iciBmcm9tLXllbGxvdy01MCB0by1vcmFuZ2UtNTAgcm91bmRlZC0yeGwgYm9yZGVyLTIgYm9yZGVyLXllbGxvdy0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmcteWVsbG93LTEwMCBwLTQgcm91bmRlZC1mdWxsIHctZml0IG14LWF1dG8gbWItNlwiPlxuICAgICAgICAgICAgICAgICAgICA8VHJ1Y2sgY2xhc3NOYW1lPVwiaC04IHctOCBzbTpoLTEyIHNtOnctMTIgdGV4dC15ZWxsb3ctNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC14bCBmb250LWJvbGQgdGV4dC15ZWxsb3ctODAwIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgU29sbyBkaXNwb25pYmxlIHJlY29naWRhIGVuIGVsIGxvY2FsXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWJhc2UgdGV4dC15ZWxsb3ctNzAwIG1heC13LW1kIG14LWF1dG8gcHgtNFwiPlxuICAgICAgICAgICAgICAgICAgICBDb250YWN0YSBjb24gZWwgYWRtaW5pc3RyYWRvciBwYXJhIGNvbmZpZ3VyYXIgem9uYXMgZGUgZW50cmVnYSBhZGljaW9uYWxlcy5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogT3JkZXIgU3VtbWFyeSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1ibHVlLTUwIHZpYS1pbmRpZ28tNTAgdG8tcHVycGxlLTUwIHJvdW5kZWQtMnhsIHAtNCBzbTpwLTYgbGc6cC04IGJvcmRlci0yIGJvcmRlci1ibHVlLTIwMCBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGxnOnRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTQgbGc6bWItNiBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAwIHRvLXB1cnBsZS01MDAgcC0yIHNtOnAtMyByb3VuZGVkLXhsIG1yLTIgc206bXItMyBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgICAgICAgIDxDYWxjdWxhdG9yIGNsYXNzTmFtZT1cImgtNCB3LTQgc206aC01IHNtOnctNSBsZzpoLTYgbGc6dy02IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFJlc3VtZW4gZGVsIFBlZGlkb1xuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgey8qIEl0ZW1zIGJyZWFrZG93biAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHAtMyBzbTpwLTQgbGc6cC02IG1iLTQgbGc6bWItNiBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0zIGxnOm1iLTQgZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGc6dGV4dC1sZ1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgbGc6dGV4dC14bCBtci0yXCI+8J+Tpjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIEVsZW1lbnRvcyBkZWwgUGVkaWRvICh7aXRlbXMubGVuZ3RofSlcbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIGxnOnNwYWNlLXktNCBtYXgtaC00MCBzbTptYXgtaC00OCBtZDptYXgtaC01NiBsZzptYXgtaC04MCBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBweS0yIHNtOnB5LTMgcHgtMyBzbTpweC00IGJnLWdyYXktNTAgcm91bmRlZC1sZyBzcGFjZS15LTIgc206c3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGluZS1jbGFtcC0yIG1iLTJcIj57aXRlbS50aXRsZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yIHRleHQteHMgdGV4dC1ncmF5LTYwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMSByb3VuZGVkLWZ1bGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPT09ICdtb3ZpZScgPyAnYmctYmx1ZS0xMDAgdGV4dC1ibHVlLTcwMCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9PT0gJ3R2JyA/ICdiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTcwMCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiZy1waW5rLTEwMCB0ZXh0LXBpbmstNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0udHlwZSA9PT0gJ21vdmllJyA/ICfwn46sIFBlbMOtY3VsYScgOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50eXBlID09PSAndHYnID8gJ/Cfk7ogU2VyaWUnIDogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICfwn5OaIE5vdmVsYSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0uc2VsZWN0ZWRTZWFzb25zICYmIGl0ZW0uc2VsZWN0ZWRTZWFzb25zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLWdyYXktMjAwIHRleHQtZ3JheS03MDAgcHgtMiBweS0xIHJvdW5kZWQtZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0uc2VsZWN0ZWRTZWFzb25zLmxlbmd0aH0gdGVtcC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLmNoYXB0ZXJzICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy1ncmF5LTIwMCB0ZXh0LWdyYXktNzAwIHB4LTIgcHktMSByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLmNoYXB0ZXJzfSBjYXAuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50eXBlID09PSAndHYnICYmIGl0ZW0uZXBpc29kZUNvdW50ICYmIGl0ZW0uZXBpc29kZUNvdW50ID4gNTAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci0yMDAgdG8tb3JhbmdlLTIwMCB0ZXh0LWFtYmVyLTgwMCBweC0yIHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5OKIFNlcmllIEV4dGVuc2FcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTEgcm91bmRlZC1mdWxsIGZvbnQtbWVkaXVtIHRleHQteHMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnBheW1lbnRUeXBlID09PSAnY2FzaCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmVlbi0xMDAgdGV4dC1ncmVlbi03MDAnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctb3JhbmdlLTEwMCB0ZXh0LW9yYW5nZS03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5wYXltZW50VHlwZSA9PT0gJ2Nhc2gnID8gJ/CfkrUgRWZlY3Rpdm8nIDogJ/CfkrMgVHJhbnNmZXJlbmNpYSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdy1mdWxsIGJvcmRlci10IGJvcmRlci1ncmF5LTIwMCBwdC0yIHNtOnB0LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17YGZvbnQtYm9sZCB0ZXh0LWJhc2Ugc206dGV4dC1sZyAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnBheW1lbnRUeXBlID09PSAnY2FzaCcgPyAndGV4dC1ncmVlbi02MDAnIDogJ3RleHQtb3JhbmdlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpdGVtLnByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHsvKiBQYXltZW50IG1ldGhvZCBicmVha2Rvd24gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHNtOnNwYWNlLXktNCBtYi00IHNtOm1iLTZcIj5cbiAgICAgICAgICAgICAgICB7LyogQ2FzaCBwYXltZW50cyAqL31cbiAgICAgICAgICAgICAgICB7aXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wYXltZW50VHlwZSA9PT0gJ2Nhc2gnKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1ncmVlbi01MCB0by1lbWVyYWxkLTUwIHJvdW5kZWQteGwgcC0zIHNtOnAtNCBib3JkZXItMiBib3JkZXItZ3JlZW4tMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tNTAwIHAtMS41IHNtOnAtMiByb3VuZGVkLWxnIG1yLTIgc206bXItMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxEb2xsYXJTaWduIGNsYXNzTmFtZT1cImgtMyB3LTMgc206aC00IHNtOnctNCB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtZ3JlZW4tODAwIHRleHQtc20gc206dGV4dC1iYXNlXCI+UGFnbyBlbiBFZmVjdGl2bzwvaDU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtZ3JlZW4tNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnBheW1lbnRUeXBlID09PSAnY2FzaCcpLmxlbmd0aH0gZWxlbWVudG9zXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmVlbi04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wYXltZW50VHlwZSA9PT0gJ2Nhc2gnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0ucHJpY2UsIDApLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIFRyYW5zZmVyIHBheW1lbnRzICovfVxuICAgICAgICAgICAgICAgIHtpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1vcmFuZ2UtNTAgdG8tcmVkLTUwIHJvdW5kZWQteGwgcC0zIHNtOnAtNCBib3JkZXItMiBib3JkZXItb3JhbmdlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLW9yYW5nZS01MDAgcC0xLjUgc206cC0yIHJvdW5kZWQtbGcgbXItMiBzbTptci0zIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENyZWRpdENhcmQgY2xhc3NOYW1lPVwiaC0zIHctMyBzbTpoLTQgc206dy00IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1vcmFuZ2UtODAwIHRleHQtc20gc206dGV4dC1iYXNlXCI+VHJhbnNmZXJlbmNpYSBCYW5jYXJpYTwvaDU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtb3JhbmdlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJykubGVuZ3RofSBlbGVtZW50b3MgKCsxMCUpXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC14bCBmb250LWJvbGQgdGV4dC1vcmFuZ2UtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAke2l0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0ucGF5bWVudFR5cGUgPT09ICd0cmFuc2ZlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgaXRlbS5wcmljZSwgMCkudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgey8qIFRvdGFscyBicmVha2Rvd24gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHNtOnNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHB5LTMgc206cHktNCBweC0zIHNtOnB4LTQgYmctd2hpdGUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LWNlbnRlciB0ZXh0LXNtIHNtOnRleHQtYmFzZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtci0yXCI+8J+bkjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgU3VidG90YWwgKHtpdGVtcy5sZW5ndGh9IGVsZW1lbnRvcylcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRleHQtbGcgc206dGV4dC14bFwiPiR7dG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge3NlbGVjdGVkWm9uZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBweS0zIHNtOnB5LTQgcHgtMyBzbTpweC00IGJnLXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LWNlbnRlciB0ZXh0LXNtIHNtOnRleHQtYmFzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1yLTJcIj57cGlja3VwTG9jYXRpb24gPyAn8J+PqicgOiAn8J+amid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtwaWNrdXBMb2NhdGlvbiA/ICdSZWNvZ2lkYSBlbiBsb2NhbCcgOiBgRW50cmVnYSBhICR7c2VsZWN0ZWRab25lfWB9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1ib2xkIHRleHQtbGcgc206dGV4dC14bCAke2RlbGl2ZXJ5Q29zdCA9PT0gMCA/ICd0ZXh0LWdyZWVuLTYwMCcgOiAndGV4dC1ibHVlLTYwMCd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge2RlbGl2ZXJ5Q29zdCA9PT0gMCA/ICfinKggR1JBVElTJyA6IGAkJHtkZWxpdmVyeUNvc3QudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQYH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTEwMCB0by1ibHVlLTEwMCByb3VuZGVkLXhsIHAtNCBzbTpwLTYgYm9yZGVyLTIgYm9yZGVyLWdyZWVuLTMwMCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItMlwiPvCfkrA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgVE9UQUwgQSBQQUdBUlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIHNtOnRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyZWVuLTYwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICR7KHRvdGFsICsgZGVsaXZlcnlDb3N0KS50b0xvY2FsZVN0cmluZygpfSBDVVBcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7ZGVsaXZlcnlDb3N0ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyB0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1ncmF5LTYwMCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIEluY2x1eWUgJHtkZWxpdmVyeUNvc3QudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQIGRlIGVudHJlZ2FcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU3VibWl0IEJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNTAwIHRvLWVtZXJhbGQtNTAwIGhvdmVyOmZyb20tZ3JlZW4tNjAwIGhvdmVyOnRvLWVtZXJhbGQtNjAwIGFjdGl2ZTpmcm9tLWdyZWVuLTcwMCBhY3RpdmU6dG8tZW1lcmFsZC03MDAgdGV4dC13aGl0ZSBweC02IHB5LTUgbGc6cHktNiByb3VuZGVkLTJ4bCBmb250LWJvbGQgdGV4dC1sZyBsZzp0ZXh0LXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtMTA1IGFjdGl2ZTpzY2FsZS05NSBzaGFkb3cteGwgaG92ZXI6c2hhZG93LTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0b3VjaC1tYW5pcHVsYXRpb25cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzIwIHAtMiBsZzpwLTMgcm91bmRlZC1sZyBtci0zXCI+XG4gICAgICAgICAgICAgICAgPFNlbmQgY2xhc3NOYW1lPVwiaC02IHctNiBsZzpoLTcgbGc6dy03XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIPCfk7EgRW52aWFyIFBlZGlkbyBwb3IgV2hhdHNBcHBcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG10LTMgc206bXQtNCBwLTMgc206cC00IGxnOnAtNSBiZy1ncmVlbi01MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZ3JlZW4tMjAwXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSBsZzp0ZXh0LWJhc2UgdGV4dC1ncmVlbi03MDAgZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXItMlwiPuKEue+4jzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPkFsIGVudmlhciBlbCBwZWRpZG8gc2Vyw6FzIHJlZGlyaWdpZG8gYSBXaGF0c0FwcCBwYXJhIGNvbXBsZXRhciBsYSB0cmFuc2FjY2nDs248L3NwYW4+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwiZmlsZSI6Ii9ob21lL3Byb2plY3Qvc3JjL2NvbXBvbmVudHMvQ2hlY2tvdXRNb2RhbC50c3gifQ==