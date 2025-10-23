import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/NovelasModal.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=e1a317db"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/home/project/src/components/NovelasModal.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=e1a317db"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import { X, BookOpen, Calculator, Search, Filter, FileText, ShoppingCart } from "/node_modules/lucide-react/dist/esm/lucide-react.js?v=f79b2ed5";
import { useCart } from "/src/context/CartContext.tsx";
import { NetflixNovelSection } from "/src/components/NetflixNovelSection.tsx";
export function NovelasModal({ isOpen, onClose, onFinalizePedido }) {
  _s();
  const { getCurrentPrices, addNovel } = useCart();
  const [selectedNovelas, setSelectedNovelas] = useState([]);
  const [novelasWithPayment, setNovelasWithPayment] = useState([]);
  const [showNovelList, setShowNovelList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("titulo");
  const [sortOrder, setSortOrder] = useState("asc");
  const [adminNovels, setAdminNovels] = useState([]);
  const currentPrices = getCurrentPrices();
  const novelPricePerChapter = currentPrices.novelPricePerChapter;
  const transferFeePercentage = currentPrices.transferFeePercentage;
  const phoneNumber = "+5354690878";
  useEffect(() => {
    const loadNovels = () => {
      try {
        const adminConfig = localStorage.getItem("system_config");
        if (adminConfig) {
          const config = JSON.parse(adminConfig);
          if (config.novels) {
            setAdminNovels(config.novels);
          }
        }
      } catch (error) {
        console.error("Error loading novels:", error);
      }
    };
    loadNovels();
    const handleAdminStateChange = (event) => {
      if (event.detail.type === "novel_add" || event.detail.type === "novel_update" || event.detail.type === "novel_delete") {
        loadNovels();
      }
    };
    const handleAdminFullSync = (event) => {
      if (event.detail.config?.novels) {
        setAdminNovels(event.detail.config.novels);
      }
    };
    window.addEventListener("admin_state_change", handleAdminStateChange);
    window.addEventListener("admin_full_sync", handleAdminFullSync);
    return () => {
      window.removeEventListener("admin_state_change", handleAdminStateChange);
      window.removeEventListener("admin_full_sync", handleAdminFullSync);
    };
  }, []);
  const defaultNovelas = [];
  const allNovelas = [...defaultNovelas, ...adminNovels.map((novel) => ({
    id: novel.id,
    titulo: novel.titulo,
    genero: novel.genero,
    capitulos: novel.capitulos,
    año: novel.año,
    descripcion: novel.descripcion,
    pais: novel.pais || "No especificado",
    imagen: novel.imagen,
    estado: novel.estado || "finalizada"
  }))];
  const uniqueGenres = [...new Set(allNovelas.map((novela) => novela.genero))].sort();
  const uniqueYears = [...new Set(allNovelas.map((novela) => novela.año))].sort((a, b) => b - a);
  const uniqueCountries = [...new Set(allNovelas.map((novela) => novela.pais))].sort();
  const statusOptions = [
    { value: "transmision", label: "En Transmisión" },
    { value: "finalizada", label: "Finalizada" }
  ];
  useEffect(() => {
    const novelasWithDefaultPayment = allNovelas.map((novela) => ({
      ...novela,
      paymentType: "cash"
    }));
    setNovelasWithPayment(novelasWithDefaultPayment);
    const cartItems = JSON.parse(localStorage.getItem("movieCart") || "[]");
    const novelasEnCarrito = cartItems.filter((item) => item.type === "novel").map((item) => item.id);
    if (novelasEnCarrito.length > 0) {
      setSelectedNovelas(novelasEnCarrito);
    }
  }, [adminNovels]);
  const getFilteredNovelas = () => {
    let filtered = novelasWithPayment.filter((novela) => {
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
      const tituloLower = novela.titulo.toLowerCase();
      const matchesSearch = searchTerm === "" || searchWords.every((word) => tituloLower.includes(word));
      const matchesGenre = selectedGenre === "" || novela.genero === selectedGenre;
      const matchesYear = selectedYear === "" || novela.año.toString() === selectedYear;
      const matchesCountry = selectedCountry === "" || novela.pais === selectedCountry;
      const matchesStatus = selectedStatus === "" || novela.estado === selectedStatus;
      return matchesSearch && matchesGenre && matchesYear && matchesCountry && matchesStatus;
    });
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "titulo":
          comparison = a.titulo.localeCompare(b.titulo);
          break;
        case "año":
          comparison = a.año - b.año;
          break;
        case "capitulos":
          comparison = a.capitulos - b.capitulos;
          break;
        case "pais":
          comparison = a.pais.localeCompare(b.pais);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
    return filtered;
  };
  const filteredNovelas = getFilteredNovelas();
  const handleNovelClick = (novelaId) => {
    window.location.href = `/novel/${novelaId}`;
  };
  const handleNovelToggle = (novelaId) => {
    setSelectedNovelas((prev) => {
      if (prev.includes(novelaId)) {
        return prev.filter((id) => id !== novelaId);
      } else {
        return [...prev, novelaId];
      }
    });
  };
  const handlePaymentTypeChange = (novelaId, paymentType) => {
    setNovelasWithPayment(
      (prev) => prev.map(
        (novela) => novela.id === novelaId ? { ...novela, paymentType } : novela
      )
    );
  };
  const selectAllNovelas = () => {
    setSelectedNovelas(filteredNovelas.map((n) => n.id));
  };
  const clearAllNovelas = () => {
    setSelectedNovelas([]);
  };
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedCountry("");
    setSelectedStatus("");
    setSortBy("titulo");
    setSortOrder("asc");
  };
  const calculateTotals = () => {
    const selectedNovelasData = novelasWithPayment.filter((n) => selectedNovelas.includes(n.id));
    const cashNovelas = selectedNovelasData.filter((n) => n.paymentType === "cash");
    const transferNovelas = selectedNovelasData.filter((n) => n.paymentType === "transfer");
    const cashTotal = cashNovelas.reduce((sum, n) => sum + n.capitulos * novelPricePerChapter, 0);
    const transferBaseTotal = transferNovelas.reduce((sum, n) => sum + n.capitulos * novelPricePerChapter, 0);
    const transferFee = Math.round(transferBaseTotal * (transferFeePercentage / 100));
    const transferTotal = transferBaseTotal + transferFee;
    const grandTotal = cashTotal + transferTotal;
    return {
      cashNovelas,
      transferNovelas,
      cashTotal,
      transferBaseTotal,
      transferFee,
      transferTotal,
      grandTotal,
      totalCapitulos: selectedNovelasData.reduce((sum, n) => sum + n.capitulos, 0)
    };
  };
  const totals = calculateTotals();
  const generateNovelListText = () => {
    let listText = "📚 CATÁLOGO DE NOVELAS DISPONIBLES\n";
    listText += "TV a la Carta - Novelas Completas\n\n";
    listText += `💰 Precio: $${novelPricePerChapter} CUP por capítulo
`;
    listText += `💳 Recargo transferencia: ${transferFeePercentage}%
`;
    listText += "📱 Contacto: +5354690878\n\n";
    listText += "═══════════════════════════════════\n\n";
    if (allNovelas.length === 0) {
      listText += "📋 No hay novelas disponibles en este momento.\n";
      listText += "Contacta con el administrador para más información.\n\n";
    } else {
      listText += "💵 PRECIOS EN EFECTIVO:\n";
      listText += "═══════════════════════════════════\n\n";
      allNovelas.forEach((novela, index) => {
        const baseCost = novela.capitulos * novelPricePerChapter;
        listText += `${index + 1}. ${novela.titulo}
`;
        listText += `   📺 Género: ${novela.genero}
`;
        listText += `   🌍 País: ${novela.pais}
`;
        listText += `   📊 Capítulos: ${novela.capitulos}
`;
        listText += `   📅 Año: ${novela.año}
`;
        listText += `   📡 Estado: ${novela.estado === "transmision" ? "En Transmisión" : "Finalizada"}
`;
        listText += `   💰 Costo en efectivo: $${baseCost.toLocaleString()} CUP

`;
      });
      listText += `
🏦 PRECIOS CON TRANSFERENCIA BANCARIA (+${transferFeePercentage}%):
`;
      listText += "═══════════════════════════════════\n\n";
      allNovelas.forEach((novela, index) => {
        const baseCost = novela.capitulos * novelPricePerChapter;
        const transferCost = Math.round(baseCost * (1 + transferFeePercentage / 100));
        const recargo = transferCost - baseCost;
        listText += `${index + 1}. ${novela.titulo}
`;
        listText += `   📺 Género: ${novela.genero}
`;
        listText += `   🌍 País: ${novela.pais}
`;
        listText += `   📊 Capítulos: ${novela.capitulos}
`;
        listText += `   📅 Año: ${novela.año}
`;
        listText += `   📡 Estado: ${novela.estado === "transmision" ? "En Transmisión" : "Finalizada"}
`;
        listText += `   💰 Costo base: $${baseCost.toLocaleString()} CUP
`;
        listText += `   💳 Recargo (${transferFeePercentage}%): +$${recargo.toLocaleString()} CUP
`;
        listText += `   💰 Costo con transferencia: $${transferCost.toLocaleString()} CUP

`;
      });
    }
    listText += `
📅 Generado el: ${(/* @__PURE__ */ new Date()).toLocaleString("es-ES")}`;
    return listText;
  };
  const downloadNovelList = () => {
    const listText = generateNovelListText();
    const blob = new Blob([listText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Catalogo_Novelas_TV_a_la_Carta.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const handleFinalizePedido = () => {
    if (selectedNovelas.length === 0) {
      alert("Por favor selecciona al menos una novela");
      return;
    }
    const selectedNovelItems = novelasWithPayment.filter((novela) => selectedNovelas.includes(novela.id)).map((novela) => ({
      id: novela.id,
      title: novela.titulo,
      type: "novel",
      genre: novela.genero,
      chapters: novela.capitulos,
      year: novela.año,
      description: novela.descripcion,
      country: novela.pais,
      status: novela.estado,
      image: novela.imagen,
      paymentType: novela.paymentType || "cash",
      pricePerChapter: novelPricePerChapter,
      totalPrice: novela.paymentType === "transfer" ? Math.round(novela.capitulos * novelPricePerChapter * (1 + transferFeePercentage / 100)) : novela.capitulos * novelPricePerChapter
    }));
    selectedNovelItems.forEach((novel) => {
      addNovel(novel);
    });
    onClose();
    if (onFinalizePedido) {
      onFinalizePedido(selectedNovelItems);
    }
  };
  const handleCall = () => {
    window.open(`tel:${phoneNumber}`, "_self");
  };
  const handleWhatsApp = () => {
    const message = "📚 *Solicitar novelas*\n\n¿Hay novelas que me gustaría ver en [TV a la Carta] a continuación te comento:";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5354690878?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };
  const getNovelImage = (novela) => {
    if (novela.imagen) {
      return novela.imagen;
    }
    const genreImages = {
      "Drama": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      "Romance": "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=400&fit=crop",
      "Acción": "https://images.unsplash.com/photo-1489599843253-c76cc4bcb8cf?w=300&h=400&fit=crop",
      "Comedia": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop",
      "Familia": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=400&fit=crop"
    };
    return genreImages[novela.genero] || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop";
  };
  const getCountryFlag = (country) => {
    const flags = {
      "Turquía": "🇹🇷",
      "Cuba": "🇨🇺",
      "México": "🇲🇽",
      "Brasil": "🇧🇷",
      "Colombia": "🇨🇴",
      "Argentina": "🇦🇷",
      "España": "🇪🇸",
      "Estados Unidos": "🇺🇸",
      "Corea del Sur": "🇰🇷",
      "India": "🇮🇳",
      "Reino Unido": "🇬🇧",
      "Francia": "🇫🇷",
      "Italia": "🇮🇹",
      "Alemania": "🇩🇪",
      "Japón": "🇯🇵",
      "China": "🇨🇳",
      "Rusia": "🇷🇺",
      "No especificado": "🌍"
    };
    return flags[country] || "🌍";
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl animate-in fade-in duration-300", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-pink-600 to-purple-600 p-4 sm:p-6 text-white", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-3 rounded-xl mr-4 shadow-lg", children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-6 w-6 sm:h-8 sm:w-8" }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 429,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 428,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold", children: "Catálogo de Novelas" }, void 0, false, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 432,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base opacity-90", children: "Novelas completas disponibles" }, void 0, false, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 433,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 431,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/NovelasModal.tsx",
        lineNumber: 427,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-white/20 rounded-full transition-colors",
          children: /* @__PURE__ */ jsxDEV(X, { className: "h-6 w-6" }, void 0, false, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 440,
            columnNumber: 15
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 436,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/project/src/components/NovelasModal.tsx",
      lineNumber: 426,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/NovelasModal.tsx",
      lineNumber: 425,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "overflow-y-auto max-h-[calc(95vh-120px)]", children: /* @__PURE__ */ jsxDEV("div", { className: "p-3 sm:p-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "mb-6", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: downloadNovelList,
          className: "w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 sm:p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white/20 p-3 rounded-full", children: /* @__PURE__ */ jsxDEV(FileText, { className: "h-5 w-5 sm:h-6 sm:w-6" }, void 0, false, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 455,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 454,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-center sm:text-left", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-sm sm:text-lg font-bold", children: "Descargar Catálogo" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 458,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs sm:text-sm opacity-90", children: "Lista completa de novelas" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 459,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 457,
              columnNumber: 17
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 450,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/home/project/src/components/NovelasModal.tsx",
        lineNumber: 449,
        columnNumber: 13
      }, this),
      allNovelas.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center", children: [
        /* @__PURE__ */ jsxDEV(BookOpen, { className: "h-12 w-12 text-yellow-600 mx-auto mb-4" }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 467,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-yellow-800 mb-2", children: "No hay novelas disponibles" }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 468,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-yellow-700", children: "El catálogo de novelas está vacío. Contacta con el administrador para agregar novelas al sistema." }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 471,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/NovelasModal.tsx",
        lineNumber: 466,
        columnNumber: 13
      }, this),
      showNovelList && allNovelas.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-2xl border-2 border-gray-200 overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-6 border-b border-gray-200", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-4 sm:mb-6", children: [
            /* @__PURE__ */ jsxDEV(Filter, { className: "h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-3" }, void 0, false, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 483,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("h4", { className: "text-base sm:text-xl font-bold text-purple-900", children: "Filtros de Búsqueda Avanzados" }, void 0, false, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 484,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 482,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
              /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 489,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  placeholder: "Buscar por título...",
                  value: searchTerm,
                  onChange: (e) => setSearchTerm(e.target.value),
                  className: "w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
                },
                void 0,
                false,
                {
                  fileName: "/home/project/src/components/NovelasModal.tsx",
                  lineNumber: 490,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 488,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: selectedGenre,
                onChange: (e) => setSelectedGenre(e.target.value),
                className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Todos los géneros" }, void 0, false, {
                    fileName: "/home/project/src/components/NovelasModal.tsx",
                    lineNumber: 504,
                    columnNumber: 23
                  }, this),
                  uniqueGenres.map(
                    (genre) => /* @__PURE__ */ jsxDEV("option", { value: genre, children: genre }, genre, false, {
                      fileName: "/home/project/src/components/NovelasModal.tsx",
                      lineNumber: 506,
                      columnNumber: 21
                    }, this)
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 499,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: selectedCountry,
                onChange: (e) => setSelectedCountry(e.target.value),
                className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Todos los países" }, void 0, false, {
                    fileName: "/home/project/src/components/NovelasModal.tsx",
                    lineNumber: 515,
                    columnNumber: 23
                  }, this),
                  uniqueCountries.map(
                    (country) => /* @__PURE__ */ jsxDEV("option", { value: country, children: [
                      getCountryFlag(country),
                      " ",
                      country
                    ] }, country, true, {
                      fileName: "/home/project/src/components/NovelasModal.tsx",
                      lineNumber: 517,
                      columnNumber: 21
                    }, this)
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 510,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: selectedStatus,
                onChange: (e) => setSelectedStatus(e.target.value),
                className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Todos los estados" }, void 0, false, {
                    fileName: "/home/project/src/components/NovelasModal.tsx",
                    lineNumber: 528,
                    columnNumber: 23
                  }, this),
                  statusOptions.map(
                    (status) => /* @__PURE__ */ jsxDEV("option", { value: status.value, children: status.label }, status.value, false, {
                      fileName: "/home/project/src/components/NovelasModal.tsx",
                      lineNumber: 530,
                      columnNumber: 21
                    }, this)
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 523,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: selectedYear,
                onChange: (e) => setSelectedYear(e.target.value),
                className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "", children: "Todos los años" }, void 0, false, {
                    fileName: "/home/project/src/components/NovelasModal.tsx",
                    lineNumber: 539,
                    columnNumber: 23
                  }, this),
                  uniqueYears.map(
                    (year) => /* @__PURE__ */ jsxDEV("option", { value: year, children: year }, year, false, {
                      fileName: "/home/project/src/components/NovelasModal.tsx",
                      lineNumber: 541,
                      columnNumber: 21
                    }, this)
                  )
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 534,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 487,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-purple-700 bg-white/60 px-4 py-2 rounded-xl text-center sm:text-left", children: [
              /* @__PURE__ */ jsxDEV("strong", { children: [
                "Mostrando ",
                filteredNovelas.length,
                " de ",
                allNovelas.length,
                " novelas"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 548,
                columnNumber: 23
              }, this),
              (searchTerm || selectedGenre || selectedYear || selectedCountry || selectedStatus) && /* @__PURE__ */ jsxDEV("span", { className: "block sm:inline sm:ml-2 text-purple-600", children: "• Filtros activos" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 550,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 547,
              columnNumber: 21
            }, this),
            (searchTerm || selectedGenre || selectedYear || selectedCountry || selectedStatus || sortBy !== "titulo" || sortOrder !== "asc") && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: clearFilters,
                className: "text-xs sm:text-sm bg-purple-200 hover:bg-purple-300 text-purple-800 px-3 sm:px-4 py-2 rounded-xl transition-colors font-medium w-full sm:w-auto text-center",
                children: "Limpiar filtros"
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 555,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 546,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 481,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-100 to-pink-100 p-3 sm:p-6 border-b border-gray-200", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-base sm:text-xl font-bold text-gray-900 text-center sm:text-left", children: [
            "Seleccionar Novelas (",
            selectedNovelas.length,
            " seleccionadas)"
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 567,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-2 sm:space-x-3 justify-center sm:justify-end", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: selectAllNovelas,
                className: "bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm flex-1 sm:flex-none",
                children: "Seleccionar Todas"
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 571,
                columnNumber: 23
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: clearAllNovelas,
                className: "bg-gray-500 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm flex-1 sm:flex-none",
                children: "Deseleccionar Todas"
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 577,
                columnNumber: 23
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 570,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 566,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 565,
          columnNumber: 17
        }, this),
        selectedNovelas.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 p-3 sm:p-6 border-b border-gray-200", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center mb-4", children: [
            /* @__PURE__ */ jsxDEV(Calculator, { className: "h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-3" }, void 0, false, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 591,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("h5", { className: "text-sm sm:text-lg font-bold text-gray-900", children: "Resumen de Selección" }, void 0, false, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 592,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 590,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl p-3 sm:p-4 border border-gray-200 text-center shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-3xl font-bold text-purple-600", children: selectedNovelas.length }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 597,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs sm:text-sm text-gray-600 font-medium", children: "Novelas" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 598,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 596,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl p-3 sm:p-4 border border-gray-200 text-center shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-3xl font-bold text-blue-600", children: totals.totalCapitulos }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 601,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs sm:text-sm text-gray-600 font-medium", children: "Capítulos" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 602,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 600,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl p-3 sm:p-4 border border-gray-200 text-center shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-3xl font-bold text-green-600", children: [
                "$",
                totals.cashTotal.toLocaleString()
              ] }, void 0, true, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 605,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs sm:text-sm text-gray-600 font-medium", children: "Efectivo" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 606,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 604,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-xl p-3 sm:p-4 border border-gray-200 text-center shadow-sm", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xl sm:text-3xl font-bold text-orange-600", children: [
                "$",
                totals.transferTotal.toLocaleString()
              ] }, void 0, true, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 609,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs sm:text-sm text-gray-600 font-medium", children: "Transferencia" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 610,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 608,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 595,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-3 sm:p-6 border-2 border-green-300 shadow-lg", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-xl font-bold text-gray-900", children: "TOTAL A PAGAR:" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 616,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xl sm:text-3xl font-bold text-green-600", children: [
                "$",
                totals.grandTotal.toLocaleString(),
                " CUP"
              ] }, void 0, true, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 617,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 615,
              columnNumber: 23
            }, this),
            totals.transferFee > 0 && /* @__PURE__ */ jsxDEV("div", { className: "text-xs sm:text-sm text-orange-600 mt-2 font-medium text-center sm:text-left", children: [
              "Incluye $",
              totals.transferFee.toLocaleString(),
              " CUP de recargo por transferencia (",
              transferFeePercentage,
              "%)"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 620,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 614,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 589,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 sm:p-6", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-8", children: filteredNovelas.length > 0 ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
          filteredNovelas.filter((n) => n.estado === "transmision").length > 0 && /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-bold text-red-600 mb-4 flex items-center", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "bg-red-100 p-2 rounded-lg mr-3", children: "📡" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 637,
                columnNumber: 31
              }, this),
              "Novelas en Transmisión"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 636,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ jsxDEV(
              NetflixNovelSection,
              {
                novels: filteredNovelas.filter((n) => n.estado === "transmision").sort((a, b) => {
                  const dateA = new Date(a.createdAt || 0).getTime();
                  const dateB = new Date(b.createdAt || 0).getTime();
                  return dateB - dateA;
                })
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 642,
                columnNumber: 29
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 635,
            columnNumber: 21
          }, this),
          filteredNovelas.filter((n) => n.estado === "finalizada").length > 0 && /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-bold text-green-600 mb-4 flex items-center", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "bg-green-100 p-2 rounded-lg mr-3", children: "✅" }, void 0, false, {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 659,
                columnNumber: 31
              }, this),
              "Novelas Finalizadas"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 658,
              columnNumber: 29
            }, this),
            /* @__PURE__ */ jsxDEV(
              NetflixNovelSection,
              {
                novels: filteredNovelas.filter((n) => n.estado === "finalizada").sort((a, b) => {
                  const dateA = new Date(a.createdAt || 0).getTime();
                  const dateB = new Date(b.createdAt || 0).getTime();
                  return dateB - dateA;
                })
              },
              void 0,
              false,
              {
                fileName: "/home/project/src/components/NovelasModal.tsx",
                lineNumber: 664,
                columnNumber: 29
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 657,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 632,
          columnNumber: 19
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-semibold text-gray-900 mb-3", children: "No se encontraron novelas" }, void 0, false, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 679,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base text-gray-600 mb-4 sm:mb-6", children: "No hay novelas que coincidan con los filtros seleccionados." }, void 0, false, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 682,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: clearFilters,
              className: "bg-purple-500 hover:bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-colors shadow-sm",
              children: "Limpiar filtros"
            },
            void 0,
            false,
            {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 685,
              columnNumber: 25
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 678,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 630,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 629,
          columnNumber: 17
        }, this),
        selectedNovelas.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-6 border-t border-gray-200", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-center sm:text-left", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-lg font-bold text-gray-900", children: [
              selectedNovelas.length,
              " novelas seleccionadas"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 700,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-gray-600", children: [
              "Total: $",
              totals.grandTotal.toLocaleString(),
              " CUP"
            ] }, void 0, true, {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 703,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "/home/project/src/components/NovelasModal.tsx",
            lineNumber: 699,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleFinalizePedido,
              disabled: selectedNovelas.length === 0,
              className: `w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg ${selectedNovelas.length > 0 ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`,
              children: [
                /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3" }, void 0, false, {
                  fileName: "/home/project/src/components/NovelasModal.tsx",
                  lineNumber: 716,
                  columnNumber: 25
                }, this),
                "Finalizar Pedido"
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/project/src/components/NovelasModal.tsx",
              lineNumber: 707,
              columnNumber: 23
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 698,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "/home/project/src/components/NovelasModal.tsx",
          lineNumber: 697,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/project/src/components/NovelasModal.tsx",
        lineNumber: 479,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/home/project/src/components/NovelasModal.tsx",
      lineNumber: 446,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/project/src/components/NovelasModal.tsx",
      lineNumber: 445,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/project/src/components/NovelasModal.tsx",
    lineNumber: 423,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/project/src/components/NovelasModal.tsx",
    lineNumber: 422,
    columnNumber: 5
  }, this);
}
_s(NovelasModal, "JePFrd+RpQemS5Y+POBI7k+ow+s=", false, function() {
  return [useCart];
});
_c = NovelasModal;
var _c;
$RefreshReg$(_c, "NovelasModal");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/project/src/components/NovelasModal.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/project/src/components/NovelasModal.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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QkFBQyxPQUFFLFdBQVUsb0NBQWtDO0FBQUE7QUFBQSxjQUNwQzZDLE9BQU9GLFdBQVdRLGVBQWU7QUFBQSxjQUFFO0FBQUEsaUJBRDlDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxlQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBT0E7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTbUI7QUFBQUEsY0FDVCxVQUFVaEosZ0JBQWdCMEUsV0FBVztBQUFBLGNBQ3JDLFdBQVcsa01BQ1QxRSxnQkFBZ0IwRSxTQUFTLElBQ3JCLG9HQUNBLDhDQUE4QztBQUFBLGNBR3BEO0FBQUEsdUNBQUMsZ0JBQWEsV0FBVSxzREFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBMEU7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVQ1RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFXQTtBQUFBLGFBcEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFxQkEsS0F0QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXVCQTtBQUFBLFdBalBKO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFtUEE7QUFBQSxTQXBSSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBc1JBLEtBdlJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F3UkE7QUFBQSxPQTlTRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBK1NBLEtBaFRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FpVEE7QUFFSjtBQUFDN0UsR0E1cUJlSixjQUFZO0FBQUEsVUFDYUYsT0FBTztBQUFBO0FBQUF1TCxLQURoQ3JMO0FBQVksSUFBQXFMO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIlgiLCJCb29rT3BlbiIsIkNhbGN1bGF0b3IiLCJTZWFyY2giLCJGaWx0ZXIiLCJGaWxlVGV4dCIsIlNob3BwaW5nQ2FydCIsInVzZUNhcnQiLCJOZXRmbGl4Tm92ZWxTZWN0aW9uIiwiTm92ZWxhc01vZGFsIiwiaXNPcGVuIiwib25DbG9zZSIsIm9uRmluYWxpemVQZWRpZG8iLCJfcyIsImdldEN1cnJlbnRQcmljZXMiLCJhZGROb3ZlbCIsInNlbGVjdGVkTm92ZWxhcyIsInNldFNlbGVjdGVkTm92ZWxhcyIsIm5vdmVsYXNXaXRoUGF5bWVudCIsInNldE5vdmVsYXNXaXRoUGF5bWVudCIsInNob3dOb3ZlbExpc3QiLCJzZXRTaG93Tm92ZWxMaXN0Iiwic2VhcmNoVGVybSIsInNldFNlYXJjaFRlcm0iLCJzZWxlY3RlZEdlbnJlIiwic2V0U2VsZWN0ZWRHZW5yZSIsInNlbGVjdGVkWWVhciIsInNldFNlbGVjdGVkWWVhciIsInNlbGVjdGVkQ291bnRyeSIsInNldFNlbGVjdGVkQ291bnRyeSIsInNlbGVjdGVkU3RhdHVzIiwic2V0U2VsZWN0ZWRTdGF0dXMiLCJzb3J0QnkiLCJzZXRTb3J0QnkiLCJzb3J0T3JkZXIiLCJzZXRTb3J0T3JkZXIiLCJhZG1pbk5vdmVscyIsInNldEFkbWluTm92ZWxzIiwiY3VycmVudFByaWNlcyIsIm5vdmVsUHJpY2VQZXJDaGFwdGVyIiwidHJhbnNmZXJGZWVQZXJjZW50YWdlIiwicGhvbmVOdW1iZXIiLCJsb2FkTm92ZWxzIiwiYWRtaW5Db25maWciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uZmlnIiwiSlNPTiIsInBhcnNlIiwibm92ZWxzIiwiZXJyb3IiLCJjb25zb2xlIiwiaGFuZGxlQWRtaW5TdGF0ZUNoYW5nZSIsImV2ZW50IiwiZGV0YWlsIiwidHlwZSIsImhhbmRsZUFkbWluRnVsbFN5bmMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlZmF1bHROb3ZlbGFzIiwiYWxsTm92ZWxhcyIsIm1hcCIsIm5vdmVsIiwiaWQiLCJ0aXR1bG8iLCJnZW5lcm8iLCJjYXBpdHVsb3MiLCJhw7FvIiwiZGVzY3JpcGNpb24iLCJwYWlzIiwiaW1hZ2VuIiwiZXN0YWRvIiwidW5pcXVlR2VucmVzIiwiU2V0Iiwibm92ZWxhIiwic29ydCIsInVuaXF1ZVllYXJzIiwiYSIsImIiLCJ1bmlxdWVDb3VudHJpZXMiLCJzdGF0dXNPcHRpb25zIiwidmFsdWUiLCJsYWJlbCIsIm5vdmVsYXNXaXRoRGVmYXVsdFBheW1lbnQiLCJwYXltZW50VHlwZSIsImNhcnRJdGVtcyIsIm5vdmVsYXNFbkNhcnJpdG8iLCJmaWx0ZXIiLCJpdGVtIiwibGVuZ3RoIiwiZ2V0RmlsdGVyZWROb3ZlbGFzIiwiZmlsdGVyZWQiLCJzZWFyY2hXb3JkcyIsInRvTG93ZXJDYXNlIiwidHJpbSIsInNwbGl0IiwidGl0dWxvTG93ZXIiLCJtYXRjaGVzU2VhcmNoIiwiZXZlcnkiLCJ3b3JkIiwiaW5jbHVkZXMiLCJtYXRjaGVzR2VucmUiLCJtYXRjaGVzWWVhciIsInRvU3RyaW5nIiwibWF0Y2hlc0NvdW50cnkiLCJtYXRjaGVzU3RhdHVzIiwiY29tcGFyaXNvbiIsImxvY2FsZUNvbXBhcmUiLCJmaWx0ZXJlZE5vdmVsYXMiLCJoYW5kbGVOb3ZlbENsaWNrIiwibm92ZWxhSWQiLCJsb2NhdGlvbiIsImhyZWYiLCJoYW5kbGVOb3ZlbFRvZ2dsZSIsInByZXYiLCJoYW5kbGVQYXltZW50VHlwZUNoYW5nZSIsInNlbGVjdEFsbE5vdmVsYXMiLCJuIiwiY2xlYXJBbGxOb3ZlbGFzIiwiY2xlYXJGaWx0ZXJzIiwiY2FsY3VsYXRlVG90YWxzIiwic2VsZWN0ZWROb3ZlbGFzRGF0YSIsImNhc2hOb3ZlbGFzIiwidHJhbnNmZXJOb3ZlbGFzIiwiY2FzaFRvdGFsIiwicmVkdWNlIiwic3VtIiwidHJhbnNmZXJCYXNlVG90YWwiLCJ0cmFuc2ZlckZlZSIsIk1hdGgiLCJyb3VuZCIsInRyYW5zZmVyVG90YWwiLCJncmFuZFRvdGFsIiwidG90YWxDYXBpdHVsb3MiLCJ0b3RhbHMiLCJnZW5lcmF0ZU5vdmVsTGlzdFRleHQiLCJsaXN0VGV4dCIsImZvckVhY2giLCJpbmRleCIsImJhc2VDb3N0IiwidG9Mb2NhbGVTdHJpbmciLCJ0cmFuc2ZlckNvc3QiLCJyZWNhcmdvIiwiRGF0ZSIsImRvd25sb2FkTm92ZWxMaXN0IiwiYmxvYiIsIkJsb2IiLCJ1cmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJsaW5rIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZG93bmxvYWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjbGljayIsInJlbW92ZUNoaWxkIiwicmV2b2tlT2JqZWN0VVJMIiwiaGFuZGxlRmluYWxpemVQZWRpZG8iLCJhbGVydCIsInNlbGVjdGVkTm92ZWxJdGVtcyIsInRpdGxlIiwiZ2VucmUiLCJjaGFwdGVycyIsInllYXIiLCJkZXNjcmlwdGlvbiIsImNvdW50cnkiLCJzdGF0dXMiLCJpbWFnZSIsInByaWNlUGVyQ2hhcHRlciIsInRvdGFsUHJpY2UiLCJoYW5kbGVDYWxsIiwib3BlbiIsImhhbmRsZVdoYXRzQXBwIiwibWVzc2FnZSIsImVuY29kZWRNZXNzYWdlIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwid2hhdHNhcHBVcmwiLCJnZXROb3ZlbEltYWdlIiwiZ2VucmVJbWFnZXMiLCJnZXRDb3VudHJ5RmxhZyIsImZsYWdzIiwiZSIsInRhcmdldCIsImRhdGVBIiwiY3JlYXRlZEF0IiwiZ2V0VGltZSIsImRhdGVCIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiTm92ZWxhc01vZGFsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFgsIERvd25sb2FkLCBNZXNzYWdlQ2lyY2xlLCBQaG9uZSwgQm9va09wZW4sIEluZm8sIENoZWNrLCBEb2xsYXJTaWduLCBDcmVkaXRDYXJkLCBDYWxjdWxhdG9yLCBTZWFyY2gsIEZpbHRlciwgSW1wb3J0IGFzIFNvcnRBc2MsIERlc3NlcnQgYXMgU29ydERlc2MsIFNtYXJ0cGhvbmUsIEZpbGVUZXh0LCBTZW5kLCBTaG9wcGluZ0NhcnQsIFVwbG9hZCwgSW1hZ2UsIFRyYXNoMiwgQ3JlZGl0Q2FyZCBhcyBFZGl0LCBTYXZlLCBDYW1lcmEsIEdsb2JlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHVzZUNhcnQgfSBmcm9tICcuLi9jb250ZXh0L0NhcnRDb250ZXh0JztcbmltcG9ydCB7IE5ldGZsaXhOb3ZlbFNlY3Rpb24gfSBmcm9tICcuL05ldGZsaXhOb3ZlbFNlY3Rpb24nO1xuaW1wb3J0IHR5cGUgeyBOb3ZlbENhcnRJdGVtIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG5pbnRlcmZhY2UgTm92ZWxhIHtcbiAgaWQ6IG51bWJlcjtcbiAgdGl0dWxvOiBzdHJpbmc7XG4gIGdlbmVybzogc3RyaW5nO1xuICBjYXBpdHVsb3M6IG51bWJlcjtcbiAgYcOxbzogbnVtYmVyO1xuICBkZXNjcmlwY2lvbj86IHN0cmluZztcbiAgcGF5bWVudFR5cGU/OiAnY2FzaCcgfCAndHJhbnNmZXInO1xuICBwYWlzPzogc3RyaW5nO1xuICBpbWFnZW4/OiBzdHJpbmc7XG4gIGVzdGFkbz86ICd0cmFuc21pc2lvbicgfCAnZmluYWxpemFkYSc7XG59XG5cbmludGVyZmFjZSBOb3ZlbGFzTW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgb25GaW5hbGl6ZVBlZGlkbz86IChzZWxlY3RlZE5vdmVsczogTm92ZWxDYXJ0SXRlbVtdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTm92ZWxhc01vZGFsKHsgaXNPcGVuLCBvbkNsb3NlLCBvbkZpbmFsaXplUGVkaWRvIH06IE5vdmVsYXNNb2RhbFByb3BzKSB7XG4gIGNvbnN0IHsgZ2V0Q3VycmVudFByaWNlcywgYWRkTm92ZWwgfSA9IHVzZUNhcnQoKTtcbiAgY29uc3QgW3NlbGVjdGVkTm92ZWxhcywgc2V0U2VsZWN0ZWROb3ZlbGFzXSA9IHVzZVN0YXRlPG51bWJlcltdPihbXSk7XG4gIGNvbnN0IFtub3ZlbGFzV2l0aFBheW1lbnQsIHNldE5vdmVsYXNXaXRoUGF5bWVudF0gPSB1c2VTdGF0ZTxOb3ZlbGFbXT4oW10pO1xuICBjb25zdCBbc2hvd05vdmVsTGlzdCwgc2V0U2hvd05vdmVsTGlzdF0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3NlYXJjaFRlcm0sIHNldFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc2VsZWN0ZWRHZW5yZSwgc2V0U2VsZWN0ZWRHZW5yZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzZWxlY3RlZFllYXIsIHNldFNlbGVjdGVkWWVhcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzZWxlY3RlZENvdW50cnksIHNldFNlbGVjdGVkQ291bnRyeV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzZWxlY3RlZFN0YXR1cywgc2V0U2VsZWN0ZWRTdGF0dXNdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc29ydEJ5LCBzZXRTb3J0QnldID0gdXNlU3RhdGU8J3RpdHVsbycgfCAnYcOxbycgfCAnY2FwaXR1bG9zJyB8ICdwYWlzJz4oJ3RpdHVsbycpO1xuICBjb25zdCBbc29ydE9yZGVyLCBzZXRTb3J0T3JkZXJdID0gdXNlU3RhdGU8J2FzYycgfCAnZGVzYyc+KCdhc2MnKTtcbiAgY29uc3QgW2FkbWluTm92ZWxzLCBzZXRBZG1pbk5vdmVsc10gPSB1c2VTdGF0ZTxhbnlbXT4oW10pO1xuXG4gIGNvbnN0IGN1cnJlbnRQcmljZXMgPSBnZXRDdXJyZW50UHJpY2VzKCk7XG4gIGNvbnN0IG5vdmVsUHJpY2VQZXJDaGFwdGVyID0gY3VycmVudFByaWNlcy5ub3ZlbFByaWNlUGVyQ2hhcHRlcjtcbiAgY29uc3QgdHJhbnNmZXJGZWVQZXJjZW50YWdlID0gY3VycmVudFByaWNlcy50cmFuc2ZlckZlZVBlcmNlbnRhZ2U7XG4gIFxuICBjb25zdCBwaG9uZU51bWJlciA9ICcrNTM1NDY5MDg3OCc7XG5cbiAgLy8gTG9hZCBub3ZlbHMgZnJvbSBhZG1pbiBjb25maWdcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBsb2FkTm92ZWxzID0gKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYWRtaW5Db25maWcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3lzdGVtX2NvbmZpZycpO1xuICAgICAgICBpZiAoYWRtaW5Db25maWcpIHtcbiAgICAgICAgICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKGFkbWluQ29uZmlnKTtcbiAgICAgICAgICBpZiAoY29uZmlnLm5vdmVscykge1xuICAgICAgICAgICAgc2V0QWRtaW5Ob3ZlbHMoY29uZmlnLm5vdmVscyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIG5vdmVsczonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxvYWROb3ZlbHMoKTtcblxuICAgIC8vIExpc3RlbiBmb3IgYWRtaW4gdXBkYXRlc1xuICAgIGNvbnN0IGhhbmRsZUFkbWluU3RhdGVDaGFuZ2UgPSAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQuZGV0YWlsLnR5cGUgPT09ICdub3ZlbF9hZGQnIHx8IFxuICAgICAgICAgIGV2ZW50LmRldGFpbC50eXBlID09PSAnbm92ZWxfdXBkYXRlJyB8fCBcbiAgICAgICAgICBldmVudC5kZXRhaWwudHlwZSA9PT0gJ25vdmVsX2RlbGV0ZScpIHtcbiAgICAgICAgbG9hZE5vdmVscygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVBZG1pbkZ1bGxTeW5jID0gKGV2ZW50OiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmRldGFpbC5jb25maWc/Lm5vdmVscykge1xuICAgICAgICBzZXRBZG1pbk5vdmVscyhldmVudC5kZXRhaWwuY29uZmlnLm5vdmVscyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdhZG1pbl9zdGF0ZV9jaGFuZ2UnLCBoYW5kbGVBZG1pblN0YXRlQ2hhbmdlIGFzIEV2ZW50TGlzdGVuZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdhZG1pbl9mdWxsX3N5bmMnLCBoYW5kbGVBZG1pbkZ1bGxTeW5jIGFzIEV2ZW50TGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdhZG1pbl9zdGF0ZV9jaGFuZ2UnLCBoYW5kbGVBZG1pblN0YXRlQ2hhbmdlIGFzIEV2ZW50TGlzdGVuZXIpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkbWluX2Z1bGxfc3luYycsIGhhbmRsZUFkbWluRnVsbFN5bmMgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIC8vIEJhc2Ugbm92ZWxzIGxpc3QgKGNhbiBiZSBlbXB0eSBpZiBvbmx5IHVzaW5nIGFkbWluIG5vdmVscylcbiAgY29uc3QgZGVmYXVsdE5vdmVsYXM6IE5vdmVsYVtdID0gW107XG5cbiAgLy8gQ29tYmluZSBhZG1pbiBub3ZlbHMgd2l0aCBkZWZhdWx0IG5vdmVsc1xuICBjb25zdCBhbGxOb3ZlbGFzID0gWy4uLmRlZmF1bHROb3ZlbGFzLCAuLi5hZG1pbk5vdmVscy5tYXAobm92ZWwgPT4gKHtcbiAgICBpZDogbm92ZWwuaWQsXG4gICAgdGl0dWxvOiBub3ZlbC50aXR1bG8sXG4gICAgZ2VuZXJvOiBub3ZlbC5nZW5lcm8sXG4gICAgY2FwaXR1bG9zOiBub3ZlbC5jYXBpdHVsb3MsXG4gICAgYcOxbzogbm92ZWwuYcOxbyxcbiAgICBkZXNjcmlwY2lvbjogbm92ZWwuZGVzY3JpcGNpb24sXG4gICAgcGFpczogbm92ZWwucGFpcyB8fCAnTm8gZXNwZWNpZmljYWRvJyxcbiAgICBpbWFnZW46IG5vdmVsLmltYWdlbixcbiAgICBlc3RhZG86IG5vdmVsLmVzdGFkbyB8fCAnZmluYWxpemFkYSdcbiAgfSkpXTtcblxuICAvLyBHZXQgdW5pcXVlIHZhbHVlcyBmb3IgZmlsdGVyc1xuICBjb25zdCB1bmlxdWVHZW5yZXMgPSBbLi4ubmV3IFNldChhbGxOb3ZlbGFzLm1hcChub3ZlbGEgPT4gbm92ZWxhLmdlbmVybykpXS5zb3J0KCk7XG4gIGNvbnN0IHVuaXF1ZVllYXJzID0gWy4uLm5ldyBTZXQoYWxsTm92ZWxhcy5tYXAobm92ZWxhID0+IG5vdmVsYS5hw7FvKSldLnNvcnQoKGEsIGIpID0+IGIgLSBhKTtcbiAgY29uc3QgdW5pcXVlQ291bnRyaWVzID0gWy4uLm5ldyBTZXQoYWxsTm92ZWxhcy5tYXAobm92ZWxhID0+IG5vdmVsYS5wYWlzKSldLnNvcnQoKTtcbiAgY29uc3Qgc3RhdHVzT3B0aW9ucyA9IFtcbiAgICB7IHZhbHVlOiAndHJhbnNtaXNpb24nLCBsYWJlbDogJ0VuIFRyYW5zbWlzacOzbicgfSxcbiAgICB7IHZhbHVlOiAnZmluYWxpemFkYScsIGxhYmVsOiAnRmluYWxpemFkYScgfVxuICBdO1xuXG4gIC8vIEluaXRpYWxpemUgbm92ZWxzIHdpdGggZGVmYXVsdCBwYXltZW50IHR5cGVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub3ZlbGFzV2l0aERlZmF1bHRQYXltZW50ID0gYWxsTm92ZWxhcy5tYXAobm92ZWxhID0+ICh7XG4gICAgICAuLi5ub3ZlbGEsXG4gICAgICBwYXltZW50VHlwZTogJ2Nhc2gnIGFzIGNvbnN0XG4gICAgfSkpO1xuICAgIHNldE5vdmVsYXNXaXRoUGF5bWVudChub3ZlbGFzV2l0aERlZmF1bHRQYXltZW50KTtcbiAgICBcbiAgICAvLyBDYXJnYXIgbm92ZWxhcyBwcmV2aWFtZW50ZSBzZWxlY2Npb25hZGFzIGRlbCBjYXJyaXRvXG4gICAgY29uc3QgY2FydEl0ZW1zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbW92aWVDYXJ0JykgfHwgJ1tdJyk7XG4gICAgY29uc3Qgbm92ZWxhc0VuQ2Fycml0byA9IGNhcnRJdGVtc1xuICAgICAgLmZpbHRlcigoaXRlbTogYW55KSA9PiBpdGVtLnR5cGUgPT09ICdub3ZlbCcpXG4gICAgICAubWFwKChpdGVtOiBhbnkpID0+IGl0ZW0uaWQpO1xuICAgIFxuICAgIGlmIChub3ZlbGFzRW5DYXJyaXRvLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFNlbGVjdGVkTm92ZWxhcyhub3ZlbGFzRW5DYXJyaXRvKTtcbiAgICB9XG4gIH0sIFthZG1pbk5vdmVsc10pO1xuXG4gIC8vIEZpbHRlciBub3ZlbHMgZnVuY3Rpb25cbiAgY29uc3QgZ2V0RmlsdGVyZWROb3ZlbGFzID0gKCkgPT4ge1xuICAgIGxldCBmaWx0ZXJlZCA9IG5vdmVsYXNXaXRoUGF5bWVudC5maWx0ZXIobm92ZWxhID0+IHtcbiAgICAgIC8vIE1lam9yYXIgYsO6c3F1ZWRhIHBhcmEgcGVybWl0aXIgZXNwYWNpb3MgeSBzZXIgbcOhcyBwcmVjaXNvXG4gICAgICBjb25zdCBzZWFyY2hXb3JkcyA9IHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKS50cmltKCkuc3BsaXQoL1xccysvKTtcbiAgICAgIGNvbnN0IHRpdHVsb0xvd2VyID0gbm92ZWxhLnRpdHVsby50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgbWF0Y2hlc1NlYXJjaCA9IHNlYXJjaFRlcm0gPT09ICcnIHx8IHNlYXJjaFdvcmRzLmV2ZXJ5KHdvcmQgPT4gdGl0dWxvTG93ZXIuaW5jbHVkZXMod29yZCkpO1xuICAgICAgY29uc3QgbWF0Y2hlc0dlbnJlID0gc2VsZWN0ZWRHZW5yZSA9PT0gJycgfHwgbm92ZWxhLmdlbmVybyA9PT0gc2VsZWN0ZWRHZW5yZTtcbiAgICAgIGNvbnN0IG1hdGNoZXNZZWFyID0gc2VsZWN0ZWRZZWFyID09PSAnJyB8fCBub3ZlbGEuYcOxby50b1N0cmluZygpID09PSBzZWxlY3RlZFllYXI7XG4gICAgICBjb25zdCBtYXRjaGVzQ291bnRyeSA9IHNlbGVjdGVkQ291bnRyeSA9PT0gJycgfHwgbm92ZWxhLnBhaXMgPT09IHNlbGVjdGVkQ291bnRyeTtcbiAgICAgIGNvbnN0IG1hdGNoZXNTdGF0dXMgPSBzZWxlY3RlZFN0YXR1cyA9PT0gJycgfHwgbm92ZWxhLmVzdGFkbyA9PT0gc2VsZWN0ZWRTdGF0dXM7XG4gICAgICBcbiAgICAgIHJldHVybiBtYXRjaGVzU2VhcmNoICYmIG1hdGNoZXNHZW5yZSAmJiBtYXRjaGVzWWVhciAmJiBtYXRjaGVzQ291bnRyeSAmJiBtYXRjaGVzU3RhdHVzO1xuICAgIH0pO1xuXG4gICAgZmlsdGVyZWQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgbGV0IGNvbXBhcmlzb24gPSAwO1xuICAgICAgXG4gICAgICBzd2l0Y2ggKHNvcnRCeSkge1xuICAgICAgICBjYXNlICd0aXR1bG8nOlxuICAgICAgICAgIGNvbXBhcmlzb24gPSBhLnRpdHVsby5sb2NhbGVDb21wYXJlKGIudGl0dWxvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYcOxbyc6XG4gICAgICAgICAgY29tcGFyaXNvbiA9IGEuYcOxbyAtIGIuYcOxbztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2FwaXR1bG9zJzpcbiAgICAgICAgICBjb21wYXJpc29uID0gYS5jYXBpdHVsb3MgLSBiLmNhcGl0dWxvcztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFpcyc6XG4gICAgICAgICAgY29tcGFyaXNvbiA9IGEucGFpcy5sb2NhbGVDb21wYXJlKGIucGFpcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiBzb3J0T3JkZXIgPT09ICdhc2MnID8gY29tcGFyaXNvbiA6IC1jb21wYXJpc29uO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbHRlcmVkO1xuICB9O1xuXG4gIGNvbnN0IGZpbHRlcmVkTm92ZWxhcyA9IGdldEZpbHRlcmVkTm92ZWxhcygpO1xuXG4gIGNvbnN0IGhhbmRsZU5vdmVsQ2xpY2sgPSAobm92ZWxhSWQ6IG51bWJlcikgPT4ge1xuICAgIC8vIE5hdmlnYXRlIHRvIG5vdmVsIGRldGFpbCBwYWdlXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL25vdmVsLyR7bm92ZWxhSWR9YDtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVOb3ZlbFRvZ2dsZSA9IChub3ZlbGFJZDogbnVtYmVyKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWROb3ZlbGFzKHByZXYgPT4ge1xuICAgICAgaWYgKHByZXYuaW5jbHVkZXMobm92ZWxhSWQpKSB7XG4gICAgICAgIHJldHVybiBwcmV2LmZpbHRlcihpZCA9PiBpZCAhPT0gbm92ZWxhSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsuLi5wcmV2LCBub3ZlbGFJZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUGF5bWVudFR5cGVDaGFuZ2UgPSAobm92ZWxhSWQ6IG51bWJlciwgcGF5bWVudFR5cGU6ICdjYXNoJyB8ICd0cmFuc2ZlcicpID0+IHtcbiAgICBzZXROb3ZlbGFzV2l0aFBheW1lbnQocHJldiA9PiBcbiAgICAgIHByZXYubWFwKG5vdmVsYSA9PiBcbiAgICAgICAgbm92ZWxhLmlkID09PSBub3ZlbGFJZCBcbiAgICAgICAgICA/IHsgLi4ubm92ZWxhLCBwYXltZW50VHlwZSB9XG4gICAgICAgICAgOiBub3ZlbGFcbiAgICAgIClcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdEFsbE5vdmVsYXMgPSAoKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWROb3ZlbGFzKGZpbHRlcmVkTm92ZWxhcy5tYXAobiA9PiBuLmlkKSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJBbGxOb3ZlbGFzID0gKCkgPT4ge1xuICAgIHNldFNlbGVjdGVkTm92ZWxhcyhbXSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJGaWx0ZXJzID0gKCkgPT4ge1xuICAgIHNldFNlYXJjaFRlcm0oJycpO1xuICAgIHNldFNlbGVjdGVkR2VucmUoJycpO1xuICAgIHNldFNlbGVjdGVkWWVhcignJyk7XG4gICAgc2V0U2VsZWN0ZWRDb3VudHJ5KCcnKTtcbiAgICBzZXRTZWxlY3RlZFN0YXR1cygnJyk7XG4gICAgc2V0U29ydEJ5KCd0aXR1bG8nKTtcbiAgICBzZXRTb3J0T3JkZXIoJ2FzYycpO1xuICB9O1xuXG4gIC8vIENhbGN1bGF0ZSB0b3RhbHMgYnkgcGF5bWVudCB0eXBlIHdpdGggY3VycmVudCBwcmljaW5nXG4gIGNvbnN0IGNhbGN1bGF0ZVRvdGFscyA9ICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZE5vdmVsYXNEYXRhID0gbm92ZWxhc1dpdGhQYXltZW50LmZpbHRlcihuID0+IHNlbGVjdGVkTm92ZWxhcy5pbmNsdWRlcyhuLmlkKSk7XG4gICAgXG4gICAgY29uc3QgY2FzaE5vdmVsYXMgPSBzZWxlY3RlZE5vdmVsYXNEYXRhLmZpbHRlcihuID0+IG4ucGF5bWVudFR5cGUgPT09ICdjYXNoJyk7XG4gICAgY29uc3QgdHJhbnNmZXJOb3ZlbGFzID0gc2VsZWN0ZWROb3ZlbGFzRGF0YS5maWx0ZXIobiA9PiBuLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInKTtcbiAgICBcbiAgICBjb25zdCBjYXNoVG90YWwgPSBjYXNoTm92ZWxhcy5yZWR1Y2UoKHN1bSwgbikgPT4gc3VtICsgKG4uY2FwaXR1bG9zICogbm92ZWxQcmljZVBlckNoYXB0ZXIpLCAwKTtcbiAgICBjb25zdCB0cmFuc2ZlckJhc2VUb3RhbCA9IHRyYW5zZmVyTm92ZWxhcy5yZWR1Y2UoKHN1bSwgbikgPT4gc3VtICsgKG4uY2FwaXR1bG9zICogbm92ZWxQcmljZVBlckNoYXB0ZXIpLCAwKTtcbiAgICBjb25zdCB0cmFuc2ZlckZlZSA9IE1hdGgucm91bmQodHJhbnNmZXJCYXNlVG90YWwgKiAodHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSk7XG4gICAgY29uc3QgdHJhbnNmZXJUb3RhbCA9IHRyYW5zZmVyQmFzZVRvdGFsICsgdHJhbnNmZXJGZWU7XG4gICAgXG4gICAgY29uc3QgZ3JhbmRUb3RhbCA9IGNhc2hUb3RhbCArIHRyYW5zZmVyVG90YWw7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGNhc2hOb3ZlbGFzLFxuICAgICAgdHJhbnNmZXJOb3ZlbGFzLFxuICAgICAgY2FzaFRvdGFsLFxuICAgICAgdHJhbnNmZXJCYXNlVG90YWwsXG4gICAgICB0cmFuc2ZlckZlZSxcbiAgICAgIHRyYW5zZmVyVG90YWwsXG4gICAgICBncmFuZFRvdGFsLFxuICAgICAgdG90YWxDYXBpdHVsb3M6IHNlbGVjdGVkTm92ZWxhc0RhdGEucmVkdWNlKChzdW0sIG4pID0+IHN1bSArIG4uY2FwaXR1bG9zLCAwKVxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgdG90YWxzID0gY2FsY3VsYXRlVG90YWxzKCk7XG5cbiAgY29uc3QgZ2VuZXJhdGVOb3ZlbExpc3RUZXh0ID0gKCkgPT4ge1xuICAgIGxldCBsaXN0VGV4dCA9IFwi8J+TmiBDQVTDgUxPR08gREUgTk9WRUxBUyBESVNQT05JQkxFU1xcblwiO1xuICAgIGxpc3RUZXh0ICs9IFwiVFYgYSBsYSBDYXJ0YSAtIE5vdmVsYXMgQ29tcGxldGFzXFxuXFxuXCI7XG4gICAgbGlzdFRleHQgKz0gYPCfkrAgUHJlY2lvOiAkJHtub3ZlbFByaWNlUGVyQ2hhcHRlcn0gQ1VQIHBvciBjYXDDrXR1bG9cXG5gO1xuICAgIGxpc3RUZXh0ICs9IGDwn5KzIFJlY2FyZ28gdHJhbnNmZXJlbmNpYTogJHt0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JVxcbmA7XG4gICAgbGlzdFRleHQgKz0gXCLwn5OxIENvbnRhY3RvOiArNTM1NDY5MDg3OFxcblxcblwiO1xuICAgIGxpc3RUZXh0ICs9IFwi4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXFxuXFxuXCI7XG4gICAgXG4gICAgaWYgKGFsbE5vdmVsYXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBsaXN0VGV4dCArPSBcIvCfk4sgTm8gaGF5IG5vdmVsYXMgZGlzcG9uaWJsZXMgZW4gZXN0ZSBtb21lbnRvLlxcblwiO1xuICAgICAgbGlzdFRleHQgKz0gXCJDb250YWN0YSBjb24gZWwgYWRtaW5pc3RyYWRvciBwYXJhIG3DoXMgaW5mb3JtYWNpw7NuLlxcblxcblwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0VGV4dCArPSBcIvCfkrUgUFJFQ0lPUyBFTiBFRkVDVElWTzpcXG5cIjtcbiAgICAgIGxpc3RUZXh0ICs9IFwi4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXFxuXFxuXCI7XG4gICAgICBcbiAgICAgIGFsbE5vdmVsYXMuZm9yRWFjaCgobm92ZWxhLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBiYXNlQ29zdCA9IG5vdmVsYS5jYXBpdHVsb3MgKiBub3ZlbFByaWNlUGVyQ2hhcHRlcjtcbiAgICAgICAgbGlzdFRleHQgKz0gYCR7aW5kZXggKyAxfS4gJHtub3ZlbGEudGl0dWxvfVxcbmA7XG4gICAgICAgIGxpc3RUZXh0ICs9IGAgICDwn5O6IEfDqW5lcm86ICR7bm92ZWxhLmdlbmVyb31cXG5gO1xuICAgICAgICBsaXN0VGV4dCArPSBgICAg8J+MjSBQYcOtczogJHtub3ZlbGEucGFpc31cXG5gO1xuICAgICAgICBsaXN0VGV4dCArPSBgICAg8J+TiiBDYXDDrXR1bG9zOiAke25vdmVsYS5jYXBpdHVsb3N9XFxuYDtcbiAgICAgICAgbGlzdFRleHQgKz0gYCAgIPCfk4UgQcOxbzogJHtub3ZlbGEuYcOxb31cXG5gO1xuICAgICAgICBsaXN0VGV4dCArPSBgICAg8J+ToSBFc3RhZG86ICR7bm92ZWxhLmVzdGFkbyA9PT0gJ3RyYW5zbWlzaW9uJyA/ICdFbiBUcmFuc21pc2nDs24nIDogJ0ZpbmFsaXphZGEnfVxcbmA7XG4gICAgICAgIGxpc3RUZXh0ICs9IGAgICDwn5KwIENvc3RvIGVuIGVmZWN0aXZvOiAkJHtiYXNlQ29zdC50b0xvY2FsZVN0cmluZygpfSBDVVBcXG5cXG5gO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGxpc3RUZXh0ICs9IGBcXG7wn4+mIFBSRUNJT1MgQ09OIFRSQU5TRkVSRU5DSUEgQkFOQ0FSSUEgKCske3RyYW5zZmVyRmVlUGVyY2VudGFnZX0lKTpcXG5gO1xuICAgICAgbGlzdFRleHQgKz0gXCLilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcXG5cXG5cIjtcbiAgICAgIFxuICAgICAgYWxsTm92ZWxhcy5mb3JFYWNoKChub3ZlbGEsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2VDb3N0ID0gbm92ZWxhLmNhcGl0dWxvcyAqIG5vdmVsUHJpY2VQZXJDaGFwdGVyO1xuICAgICAgICBjb25zdCB0cmFuc2ZlckNvc3QgPSBNYXRoLnJvdW5kKGJhc2VDb3N0ICogKDEgKyB0cmFuc2ZlckZlZVBlcmNlbnRhZ2UgLyAxMDApKTtcbiAgICAgICAgY29uc3QgcmVjYXJnbyA9IHRyYW5zZmVyQ29zdCAtIGJhc2VDb3N0O1xuICAgICAgICBsaXN0VGV4dCArPSBgJHtpbmRleCArIDF9LiAke25vdmVsYS50aXR1bG99XFxuYDtcbiAgICAgICAgbGlzdFRleHQgKz0gYCAgIPCfk7ogR8OpbmVybzogJHtub3ZlbGEuZ2VuZXJvfVxcbmA7XG4gICAgICAgIGxpc3RUZXh0ICs9IGAgICDwn4yNIFBhw61zOiAke25vdmVsYS5wYWlzfVxcbmA7XG4gICAgICAgIGxpc3RUZXh0ICs9IGAgICDwn5OKIENhcMOtdHVsb3M6ICR7bm92ZWxhLmNhcGl0dWxvc31cXG5gO1xuICAgICAgICBsaXN0VGV4dCArPSBgICAg8J+ThSBBw7FvOiAke25vdmVsYS5hw7FvfVxcbmA7XG4gICAgICAgIGxpc3RUZXh0ICs9IGAgICDwn5OhIEVzdGFkbzogJHtub3ZlbGEuZXN0YWRvID09PSAndHJhbnNtaXNpb24nID8gJ0VuIFRyYW5zbWlzacOzbicgOiAnRmluYWxpemFkYSd9XFxuYDtcbiAgICAgICAgbGlzdFRleHQgKz0gYCAgIPCfkrAgQ29zdG8gYmFzZTogJCR7YmFzZUNvc3QudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxuYDtcbiAgICAgICAgbGlzdFRleHQgKz0gYCAgIPCfkrMgUmVjYXJnbyAoJHt0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSk6ICskJHtyZWNhcmdvLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcbmA7XG4gICAgICAgIGxpc3RUZXh0ICs9IGAgICDwn5KwIENvc3RvIGNvbiB0cmFuc2ZlcmVuY2lhOiAkJHt0cmFuc2ZlckNvc3QudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxuXFxuYDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBsaXN0VGV4dCArPSBgXFxu8J+ThSBHZW5lcmFkbyBlbDogJHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCdlcy1FUycpfWA7XG4gICAgXG4gICAgcmV0dXJuIGxpc3RUZXh0O1xuICB9O1xuXG4gIGNvbnN0IGRvd25sb2FkTm92ZWxMaXN0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RUZXh0ID0gZ2VuZXJhdGVOb3ZlbExpc3RUZXh0KCk7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtsaXN0VGV4dF0sIHsgdHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICBsaW5rLmRvd25sb2FkID0gJ0NhdGFsb2dvX05vdmVsYXNfVFZfYV9sYV9DYXJ0YS50eHQnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZpbmFsaXplUGVkaWRvID0gKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZE5vdmVsYXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBhbGVydCgnUG9yIGZhdm9yIHNlbGVjY2lvbmEgYWwgbWVub3MgdW5hIG5vdmVsYScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnRpciBub3ZlbGFzIHNlbGVjY2lvbmFkYXMgYSBOb3ZlbENhcnRJdGVtXG4gICAgY29uc3Qgc2VsZWN0ZWROb3ZlbEl0ZW1zOiBOb3ZlbENhcnRJdGVtW10gPSBub3ZlbGFzV2l0aFBheW1lbnRcbiAgICAgIC5maWx0ZXIobm92ZWxhID0+IHNlbGVjdGVkTm92ZWxhcy5pbmNsdWRlcyhub3ZlbGEuaWQpKVxuICAgICAgLm1hcChub3ZlbGEgPT4gKHtcbiAgICAgICAgaWQ6IG5vdmVsYS5pZCxcbiAgICAgICAgdGl0bGU6IG5vdmVsYS50aXR1bG8sXG4gICAgICAgIHR5cGU6ICdub3ZlbCcgYXMgY29uc3QsXG4gICAgICAgIGdlbnJlOiBub3ZlbGEuZ2VuZXJvLFxuICAgICAgICBjaGFwdGVyczogbm92ZWxhLmNhcGl0dWxvcyxcbiAgICAgICAgeWVhcjogbm92ZWxhLmHDsW8sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBub3ZlbGEuZGVzY3JpcGNpb24sXG4gICAgICAgIGNvdW50cnk6IG5vdmVsYS5wYWlzLFxuICAgICAgICBzdGF0dXM6IG5vdmVsYS5lc3RhZG8sXG4gICAgICAgIGltYWdlOiBub3ZlbGEuaW1hZ2VuLFxuICAgICAgICBwYXltZW50VHlwZTogbm92ZWxhLnBheW1lbnRUeXBlIHx8ICdjYXNoJyxcbiAgICAgICAgcHJpY2VQZXJDaGFwdGVyOiBub3ZlbFByaWNlUGVyQ2hhcHRlcixcbiAgICAgICAgdG90YWxQcmljZTogbm92ZWxhLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInIFxuICAgICAgICAgID8gTWF0aC5yb3VuZCgobm92ZWxhLmNhcGl0dWxvcyAqIG5vdmVsUHJpY2VQZXJDaGFwdGVyKSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSlcbiAgICAgICAgICA6IG5vdmVsYS5jYXBpdHVsb3MgKiBub3ZlbFByaWNlUGVyQ2hhcHRlclxuICAgICAgfSkpO1xuXG4gICAgLy8gQWdyZWdhciBub3ZlbGFzIGFsIGNhcnJpdG9cbiAgICBzZWxlY3RlZE5vdmVsSXRlbXMuZm9yRWFjaChub3ZlbCA9PiB7XG4gICAgICBhZGROb3ZlbChub3ZlbCk7XG4gICAgfSk7XG5cbiAgICAvLyBDZXJyYXIgbW9kYWxcbiAgICBvbkNsb3NlKCk7XG4gICAgXG4gICAgLy8gT3BjaW9uYWw6IGNhbGxiYWNrIHBhcmEgaXIgZGlyZWN0YW1lbnRlIGFsIGNoZWNrb3V0XG4gICAgaWYgKG9uRmluYWxpemVQZWRpZG8pIHtcbiAgICAgIG9uRmluYWxpemVQZWRpZG8oc2VsZWN0ZWROb3ZlbEl0ZW1zKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2FsbCA9ICgpID0+IHtcbiAgICB3aW5kb3cub3BlbihgdGVsOiR7cGhvbmVOdW1iZXJ9YCwgJ19zZWxmJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlV2hhdHNBcHAgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IFwi8J+TmiAqU29saWNpdGFyIG5vdmVsYXMqXFxuXFxuwr9IYXkgbm92ZWxhcyBxdWUgbWUgZ3VzdGFyw61hIHZlciBlbiBbVFYgYSBsYSBDYXJ0YV0gYSBjb250aW51YWNpw7NuIHRlIGNvbWVudG86XCI7XG4gICAgY29uc3QgZW5jb2RlZE1lc3NhZ2UgPSBlbmNvZGVVUklDb21wb25lbnQobWVzc2FnZSk7XG4gICAgY29uc3Qgd2hhdHNhcHBVcmwgPSBgaHR0cHM6Ly93YS5tZS81MzU0NjkwODc4P3RleHQ9JHtlbmNvZGVkTWVzc2FnZX1gO1xuICAgIHdpbmRvdy5vcGVuKHdoYXRzYXBwVXJsLCAnX2JsYW5rJywgJ25vb3BlbmVyLG5vcmVmZXJyZXInKTtcbiAgfTtcblxuICBjb25zdCBnZXROb3ZlbEltYWdlID0gKG5vdmVsYTogTm92ZWxhKSA9PiB7XG4gICAgaWYgKG5vdmVsYS5pbWFnZW4pIHtcbiAgICAgIHJldHVybiBub3ZlbGEuaW1hZ2VuO1xuICAgIH1cbiAgICAvLyBJbWFnZW4gcG9yIGRlZmVjdG8gYmFzYWRhIGVuIGVsIGfDqW5lcm9cbiAgICBjb25zdCBnZW5yZUltYWdlcyA9IHtcbiAgICAgICdEcmFtYSc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUwNzAwMzIxMTE2OS0wYTFkZDcyMjhmMmQ/dz0zMDAmaD00MDAmZml0PWNyb3AnLFxuICAgICAgJ1JvbWFuY2UnOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTgxOTkyNjY3OTEtNTM3NWE4MzE5MGI3P3c9MzAwJmg9NDAwJmZpdD1jcm9wJyxcbiAgICAgICdBY2Npw7NuJzogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDg5NTk5ODQzMjUzLWM3NmNjNGJjYjhjZj93PTMwMCZoPTQwMCZmaXQ9Y3JvcCcsXG4gICAgICAnQ29tZWRpYSc6ICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxMzQ3NTM4MjU4NS1kMDZlNThiY2IwZTA/dz0zMDAmaD00MDAmZml0PWNyb3AnLFxuICAgICAgJ0ZhbWlsaWEnOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTE4OTU0MjYzMjgtZGM4NzE0MTkxMzAwP3c9MzAwJmg9NDAwJmZpdD1jcm9wJ1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIGdlbnJlSW1hZ2VzW25vdmVsYS5nZW5lcm8gYXMga2V5b2YgdHlwZW9mIGdlbnJlSW1hZ2VzXSB8fCBcbiAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDgxNjI3ODM0ODc2LWI3ODMzZThmNTU3MD93PTMwMCZoPTQwMCZmaXQ9Y3JvcCc7XG4gIH07XG5cbiAgY29uc3QgZ2V0Q291bnRyeUZsYWcgPSAoY291bnRyeTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZmxhZ3M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgICAnVHVycXXDrWEnOiAn8J+HufCfh7cnLFxuICAgICAgJ0N1YmEnOiAn8J+HqPCfh7onLFxuICAgICAgJ03DqXhpY28nOiAn8J+HsvCfh70nLFxuICAgICAgJ0JyYXNpbCc6ICfwn4en8J+HtycsXG4gICAgICAnQ29sb21iaWEnOiAn8J+HqPCfh7QnLFxuICAgICAgJ0FyZ2VudGluYSc6ICfwn4em8J+HtycsXG4gICAgICAnRXNwYcOxYSc6ICfwn4eq8J+HuCcsXG4gICAgICAnRXN0YWRvcyBVbmlkb3MnOiAn8J+HuvCfh7gnLFxuICAgICAgJ0NvcmVhIGRlbCBTdXInOiAn8J+HsPCfh7cnLFxuICAgICAgJ0luZGlhJzogJ/Cfh67wn4ezJyxcbiAgICAgICdSZWlubyBVbmlkbyc6ICfwn4es8J+HpycsXG4gICAgICAnRnJhbmNpYSc6ICfwn4er8J+HtycsXG4gICAgICAnSXRhbGlhJzogJ/Cfh67wn4e5JyxcbiAgICAgICdBbGVtYW5pYSc6ICfwn4ep8J+HqicsXG4gICAgICAnSmFww7NuJzogJ/Cfh6/wn4e1JyxcbiAgICAgICdDaGluYSc6ICfwn4eo8J+HsycsXG4gICAgICAnUnVzaWEnOiAn8J+Ht/Cfh7onLFxuICAgICAgJ05vIGVzcGVjaWZpY2Fkbyc6ICfwn4yNJ1xuICAgIH07XG4gICAgcmV0dXJuIGZsYWdzW2NvdW50cnldIHx8ICfwn4yNJztcbiAgfTtcblxuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctYmxhY2svNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0yIHNtOnAtNCB6LTUwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHctZnVsbCBtYXgtdy03eGwgbWF4LWgtWzk1dmhdIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctMnhsIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0zMDBcIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcGluay02MDAgdG8tcHVycGxlLTYwMCBwLTQgc206cC02IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzIwIHAtMyByb3VuZGVkLXhsIG1yLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cImgtNiB3LTYgc206aC04IHNtOnctOFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIG1kOnRleHQtM3hsIGZvbnQtYm9sZFwiPkNhdMOhbG9nbyBkZSBOb3ZlbGFzPC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSBvcGFjaXR5LTkwXCI+Tm92ZWxhcyBjb21wbGV0YXMgZGlzcG9uaWJsZXM8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiBob3ZlcjpiZy13aGl0ZS8yMCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJoLTYgdy02XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LXktYXV0byBtYXgtaC1bY2FsYyg5NXZoLTEyMHB4KV1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBzbTpwLTZcIj5cblxuICAgICAgICAgICAgey8qIENhdGFsb2cgb3B0aW9ucyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17ZG93bmxvYWROb3ZlbExpc3R9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTUwMCB0by1ibHVlLTYwMCBob3Zlcjpmcm9tLWJsdWUtNjAwIGhvdmVyOnRvLWJsdWUtNzAwIHRleHQtd2hpdGUgcC00IHNtOnAtNiByb3VuZGVkLXhsIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgaG92ZXI6c2hhZG93LWxnIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNwYWNlLXktMiBzbTpzcGFjZS15LTAgc206c3BhY2UteC0zXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUvMjAgcC0zIHJvdW5kZWQtZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cImgtNSB3LTUgc206aC02IHNtOnctNlwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBzbTp0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWxnIGZvbnQtYm9sZFwiPkRlc2NhcmdhciBDYXTDoWxvZ288L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIG9wYWNpdHktOTBcIj5MaXN0YSBjb21wbGV0YSBkZSBub3ZlbGFzPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTaG93IG1lc3NhZ2Ugd2hlbiBubyBub3ZlbHMgYXZhaWxhYmxlICovfVxuICAgICAgICAgICAge2FsbE5vdmVsYXMubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy15ZWxsb3ctNTAgYm9yZGVyIGJvcmRlci15ZWxsb3ctMjAwIHJvdW5kZWQteGwgcC02IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cImgtMTIgdy0xMiB0ZXh0LXllbGxvdy02MDAgbXgtYXV0byBtYi00XCIgLz5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQteWVsbG93LTgwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICBObyBoYXkgbm92ZWxhcyBkaXNwb25pYmxlc1xuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctNzAwXCI+XG4gICAgICAgICAgICAgICAgICBFbCBjYXTDoWxvZ28gZGUgbm92ZWxhcyBlc3TDoSB2YWPDrW8uIENvbnRhY3RhIGNvbiBlbCBhZG1pbmlzdHJhZG9yIHBhcmEgYWdyZWdhciBub3ZlbGFzIGFsIHNpc3RlbWEuXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHsvKiBOb3ZlbHMgbGlzdCAqL31cbiAgICAgICAgICAgIHtzaG93Tm92ZWxMaXN0ICYmIGFsbE5vdmVsYXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC0yeGwgYm9yZGVyLTIgYm9yZGVyLWdyYXktMjAwIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgIHsvKiBFbmhhbmNlZCBGaWx0ZXJzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS01MCB0by1waW5rLTUwIHAtMyBzbTpwLTYgYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTQgc206bWItNlwiPlxuICAgICAgICAgICAgICAgICAgICA8RmlsdGVyIGNsYXNzTmFtZT1cImgtNSB3LTUgc206aC02IHNtOnctNiB0ZXh0LXB1cnBsZS02MDAgbXItM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC14bCBmb250LWJvbGQgdGV4dC1wdXJwbGUtOTAwXCI+RmlsdHJvcyBkZSBCw7pzcXVlZGEgQXZhbnphZG9zPC9oND5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgeGw6Z3JpZC1jb2xzLTUgZ2FwLTMgc206Z2FwLTQgbWItNCBzbTptYi02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyB0b3AtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXktMS8yIGgtNCB3LTQgc206aC01IHNtOnctNSB0ZXh0LWdyYXktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQnVzY2FyIHBvciB0w610dWxvLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hUZXJtfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC0xMCBzbTpwbC0xMiBwci0zIHNtOnByLTQgcHktMiBzbTpweS0zIHRleHQtc20gc206dGV4dC1iYXNlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC14bCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHVycGxlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnQgYmctd2hpdGUgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRHZW5yZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkR2VucmUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHNtOnB4LTQgcHktMiBzbTpweS0zIHRleHQtc20gc206dGV4dC1iYXNlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC14bCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHVycGxlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnQgYmctd2hpdGUgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5Ub2RvcyBsb3MgZ8OpbmVyb3M8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7dW5pcXVlR2VucmVzLm1hcChnZW5yZSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17Z2VucmV9IHZhbHVlPXtnZW5yZX0+e2dlbnJlfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb3VudHJ5fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRDb3VudHJ5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBzbTpweC00IHB5LTIgc206cHktMyB0ZXh0LXNtIHNtOnRleHQtYmFzZSBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQteGwgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXB1cnBsZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50IGJnLXdoaXRlIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+VG9kb3MgbG9zIHBhw61zZXM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7dW5pcXVlQ291bnRyaWVzLm1hcChjb3VudHJ5ID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtjb3VudHJ5fSB2YWx1ZT17Y291bnRyeX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRDb3VudHJ5RmxhZyhjb3VudHJ5KX0ge2NvdW50cnl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkU3RhdHVzfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRTdGF0dXMoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHNtOnB4LTQgcHktMiBzbTpweS0zIHRleHQtc20gc206dGV4dC1iYXNlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC14bCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHVycGxlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnQgYmctd2hpdGUgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5Ub2RvcyBsb3MgZXN0YWRvczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIHtzdGF0dXNPcHRpb25zLm1hcChzdGF0dXMgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3N0YXR1cy52YWx1ZX0gdmFsdWU9e3N0YXR1cy52YWx1ZX0+e3N0YXR1cy5sYWJlbH08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkWWVhcn1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkWWVhcihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgc206cHgtNCBweS0yIHNtOnB5LTMgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLXhsIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wdXJwbGUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudCBiZy13aGl0ZSBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlRvZG9zIGxvcyBhw7Fvczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIHt1bmlxdWVZZWFycy5tYXAoeWVhciA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17eWVhcn0gdmFsdWU9e3llYXJ9Pnt5ZWFyfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTMgc206c3BhY2UteS0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXB1cnBsZS03MDAgYmctd2hpdGUvNjAgcHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5Nb3N0cmFuZG8ge2ZpbHRlcmVkTm92ZWxhcy5sZW5ndGh9IGRlIHthbGxOb3ZlbGFzLmxlbmd0aH0gbm92ZWxhczwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgIHsoc2VhcmNoVGVybSB8fCBzZWxlY3RlZEdlbnJlIHx8IHNlbGVjdGVkWWVhciB8fCBzZWxlY3RlZENvdW50cnkgfHwgc2VsZWN0ZWRTdGF0dXMpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHNtOmlubGluZSBzbTptbC0yIHRleHQtcHVycGxlLTYwMFwiPuKAoiBGaWx0cm9zIGFjdGl2b3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7KHNlYXJjaFRlcm0gfHwgc2VsZWN0ZWRHZW5yZSB8fCBzZWxlY3RlZFllYXIgfHwgc2VsZWN0ZWRDb3VudHJ5IHx8IHNlbGVjdGVkU3RhdHVzIHx8IHNvcnRCeSAhPT0gJ3RpdHVsbycgfHwgc29ydE9yZGVyICE9PSAnYXNjJykgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyRmlsdGVyc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSBiZy1wdXJwbGUtMjAwIGhvdmVyOmJnLXB1cnBsZS0zMDAgdGV4dC1wdXJwbGUtODAwIHB4LTMgc206cHgtNCBweS0yIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1jb2xvcnMgZm9udC1tZWRpdW0gdy1mdWxsIHNtOnctYXV0byB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTGltcGlhciBmaWx0cm9zXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS0xMDAgdG8tcGluay0xMDAgcC0zIHNtOnAtNiBib3JkZXItYiBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNCBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFNlbGVjY2lvbmFyIE5vdmVsYXMgKHtzZWxlY3RlZE5vdmVsYXMubGVuZ3RofSBzZWxlY2Npb25hZGFzKVxuICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggc3BhY2UteC0yIHNtOnNwYWNlLXgtMyBqdXN0aWZ5LWNlbnRlciBzbTpqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3NlbGVjdEFsbE5vdmVsYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1wdXJwbGUtNTAwIGhvdmVyOmJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBweC0zIHNtOnB4LTQgcHktMiByb3VuZGVkLXhsIHRleHQteHMgc206dGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyBzaGFkb3ctc20gZmxleC0xIHNtOmZsZXgtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWNjaW9uYXIgVG9kYXNcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhckFsbE5vdmVsYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmF5LTUwMCBob3ZlcjpiZy1ncmF5LTYwMCB0ZXh0LXdoaXRlIHB4LTMgc206cHgtNCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzIHNoYWRvdy1zbSBmbGV4LTEgc206ZmxleC1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBEZXNlbGVjY2lvbmFyIFRvZGFzXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogVG90YWxzIHN1bW1hcnkgKi99XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkTm92ZWxhcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTUwIHRvLWJsdWUtNTAgcC0zIHNtOnAtNiBib3JkZXItYiBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENhbGN1bGF0b3IgY2xhc3NOYW1lPVwiaC01IHctNSBzbTpoLTYgc206dy02IHRleHQtZ3JlZW4tNjAwIG1yLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtbGcgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5SZXN1bWVuIGRlIFNlbGVjY2nDs248L2g1PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtMyBzbTpnYXAtNCBtYi00IHNtOm1iLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgcC0zIHNtOnAtNCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHRleHQtY2VudGVyIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LXB1cnBsZS02MDBcIj57c2VsZWN0ZWROb3ZlbGFzLmxlbmd0aH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtZ3JheS02MDAgZm9udC1tZWRpdW1cIj5Ob3ZlbGFzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLXhsIHAtMyBzbTpwLTQgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCB0ZXh0LWNlbnRlciBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ibHVlLTYwMFwiPnt0b3RhbHMudG90YWxDYXBpdHVsb3N9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LWdyYXktNjAwIGZvbnQtbWVkaXVtXCI+Q2Fww610dWxvczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC14bCBwLTMgc206cC00IGJvcmRlciBib3JkZXItZ3JheS0yMDAgdGV4dC1jZW50ZXIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0zeGwgZm9udC1ib2xkIHRleHQtZ3JlZW4tNjAwXCI+JHt0b3RhbHMuY2FzaFRvdGFsLnRvTG9jYWxlU3RyaW5nKCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LWdyYXktNjAwIGZvbnQtbWVkaXVtXCI+RWZlY3Rpdm88L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQteGwgcC0zIHNtOnAtNCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHRleHQtY2VudGVyIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LW9yYW5nZS02MDBcIj4ke3RvdGFscy50cmFuc2ZlclRvdGFsLnRvTG9jYWxlU3RyaW5nKCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LWdyYXktNjAwIGZvbnQtbWVkaXVtXCI+VHJhbnNmZXJlbmNpYTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTEwMCB0by1ibHVlLTEwMCByb3VuZGVkLXhsIHAtMyBzbTpwLTYgYm9yZGVyLTIgYm9yZGVyLWdyZWVuLTMwMCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBzcGFjZS15LTIgc206c3BhY2UteS0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPlRPVEFMIEEgUEFHQVI6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ncmVlbi02MDBcIj4ke3RvdGFscy5ncmFuZFRvdGFsLnRvTG9jYWxlU3RyaW5nKCl9IENVUDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICB7dG90YWxzLnRyYW5zZmVyRmVlID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LW9yYW5nZS02MDAgbXQtMiBmb250LW1lZGl1bSB0ZXh0LWNlbnRlciBzbTp0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgSW5jbHV5ZSAke3RvdGFscy50cmFuc2ZlckZlZS50b0xvY2FsZVN0cmluZygpfSBDVVAgZGUgcmVjYXJnbyBwb3IgdHJhbnNmZXJlbmNpYSAoe3RyYW5zZmVyRmVlUGVyY2VudGFnZX0lKVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIE5ldGZsaXgtc3R5bGUgQ2F0YWxvZyBWaWV3ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHNtOnAtNlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LThcIj5cbiAgICAgICAgICAgICAgICAgICAge2ZpbHRlcmVkTm92ZWxhcy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogTm92ZWxhcyBlbiBUcmFuc21pc2nDs24gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyZWROb3ZlbGFzLmZpbHRlcihuID0+IG4uZXN0YWRvID09PSAndHJhbnNtaXNpb24nKS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBzbTp0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXJlZC02MDAgbWItNCBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmctcmVkLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfk6FcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5vdmVsYXMgZW4gVHJhbnNtaXNpw7NuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmV0ZmxpeE5vdmVsU2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm92ZWxzPXtmaWx0ZXJlZE5vdmVsYXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihuID0+IG4uZXN0YWRvID09PSAndHJhbnNtaXNpb24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoKGEgYXMgYW55KS5jcmVhdGVkQXQgfHwgMCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoKGIgYXMgYW55KS5jcmVhdGVkQXQgfHwgMCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlQiAtIGRhdGVBO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIE5vdmVsYXMgRmluYWxpemFkYXMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyZWROb3ZlbGFzLmZpbHRlcihuID0+IG4uZXN0YWRvID09PSAnZmluYWxpemFkYScpLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIHNtOnRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JlZW4tNjAwIG1iLTQgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLWdyZWVuLTEwMCBwLTIgcm91bmRlZC1sZyBtci0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKchVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm92ZWxhcyBGaW5hbGl6YWRhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5ldGZsaXhOb3ZlbFNlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdmVscz17ZmlsdGVyZWROb3ZlbGFzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIobiA9PiBuLmVzdGFkbyA9PT0gJ2ZpbmFsaXphZGEnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVBID0gbmV3IERhdGUoKGEgYXMgYW55KS5jcmVhdGVkQXQgfHwgMCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVCID0gbmV3IERhdGUoKGIgYXMgYW55KS5jcmVhdGVkQXQgfHwgMCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlQiAtIGRhdGVBO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBzbTp0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE5vIHNlIGVuY29udHJhcm9uIG5vdmVsYXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSB0ZXh0LWdyYXktNjAwIG1iLTQgc206bWItNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBObyBoYXkgbm92ZWxhcyBxdWUgY29pbmNpZGFuIGNvbiBsb3MgZmlsdHJvcyBzZWxlY2Npb25hZG9zLlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhckZpbHRlcnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXB1cnBsZS01MDAgaG92ZXI6YmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHB4LTQgc206cHgtNiBweS0yIHNtOnB5LTMgcm91bmRlZC14bCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBMaW1waWFyIGZpbHRyb3NcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWROb3ZlbGFzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTUwIHRvLXBpbmstNTAgcC0zIHNtOnAtNiBib3JkZXItdCBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS00IHNtOnNwYWNlLXktMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtbGcgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkTm92ZWxhcy5sZW5ndGh9IG5vdmVsYXMgc2VsZWNjaW9uYWRhc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgVG90YWw6ICR7dG90YWxzLmdyYW5kVG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRmluYWxpemVQZWRpZG99XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17c2VsZWN0ZWROb3ZlbGFzLmxlbmd0aCA9PT0gMH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBzbTp3LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktMyBzbTpweS00IHJvdW5kZWQtMnhsIHRleHQtc20gc206dGV4dC1iYXNlIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgdHJhbnNmb3JtIGhvdmVyOnNjYWxlLTEwNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWROb3ZlbGFzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNTAwIHRvLWdyZWVuLTYwMCBob3Zlcjpmcm9tLWdyZWVuLTYwMCBob3Zlcjp0by1ncmVlbi03MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmF5LTMwMCB0ZXh0LWdyYXktNTAwIGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTaG9wcGluZ0NhcnQgY2xhc3NOYW1lPVwiaC00IHctNCBzbTpoLTUgc206dy01IGxnOmgtNiBsZzp3LTYgbXItMiBzbTptci0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbmFsaXphciBQZWRpZG9cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sImZpbGUiOiIvaG9tZS9wcm9qZWN0L3NyYy9jb21wb25lbnRzL05vdmVsYXNNb2RhbC50c3gifQ==