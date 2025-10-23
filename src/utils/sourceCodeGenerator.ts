import __vite__cjsImport0_jszip from "/node_modules/.vite/deps/jszip.js?v=c93e2ed8"; const JSZip = __vite__cjsImport0_jszip.__esModule ? __vite__cjsImport0_jszip.default : __vite__cjsImport0_jszip;
import { readProjectFiles, injectConfigIntoFile } from "/src/utils/fileSystemReader.ts";
export async function generateCompleteSourceCode(systemConfig) {
  try {
    const zip = new JSZip();
    const projectStructure = await readProjectFiles();
    await generateAllSourceFilesFromReal(zip, systemConfig, projectStructure);
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = `TV_a_la_Carta_Sistema_Completo_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating complete source code:", error);
    throw error;
  }
}
async function generateAllSourceFilesFromReal(zip, systemConfig, projectStructure) {
  for (const file of projectStructure.configFiles) {
    let content = file.content;
    if (file.path === "package.json") {
      try {
        const pkg = JSON.parse(content);
        pkg.version = systemConfig.version || "2.1.0";
        pkg.description = `Sistema completo de gestión para TV a la Carta - v${pkg.version}`;
        content = JSON.stringify(pkg, null, 2);
      } catch (error) {
        console.warn("Error updating package.json:", error);
      }
    }
    zip.file(file.path, content);
  }
  for (const file of projectStructure.publicFiles) {
    zip.file(file.path, file.content);
  }
  for (const file of projectStructure.sourceFiles) {
    const content = injectConfigIntoFile(file.content, systemConfig, file.path);
    zip.file(file.path, content);
  }
  zip.file("README.md", generateReadme(systemConfig));
  zip.file("config-backup.json", JSON.stringify({
    version: systemConfig.version,
    exportDate: (/* @__PURE__ */ new Date()).toISOString(),
    prices: systemConfig.prices,
    deliveryZones: systemConfig.deliveryZones,
    novels: systemConfig.novels,
    settings: systemConfig.settings,
    syncStatus: systemConfig.syncStatus
  }, null, 2));
}
async function generateAllSourceFiles(zip, systemConfig) {
  zip.file("package.json", generatePackageJson());
  zip.file("vite.config.ts", generateViteConfig());
  zip.file("tailwind.config.js", generateTailwindConfig());
  zip.file("tsconfig.json", generateTsConfig());
  zip.file("tsconfig.app.json", generateTsConfigApp());
  zip.file("tsconfig.node.json", generateTsConfigNode());
  zip.file("postcss.config.js", generatePostcssConfig());
  zip.file("eslint.config.js", generateEslintConfig());
  zip.file("index.html", generateIndexHtml());
  zip.file("vercel.json", generateVercelConfig());
  zip.file("README.md", generateReadme(systemConfig));
  const publicFolder = zip.folder("public");
  if (publicFolder) {
    publicFolder.file("_redirects", generateNetlifyRedirects());
  }
  const srcFolder = zip.folder("src");
  if (srcFolder) {
    srcFolder.file("main.tsx", generateMainTsx());
    srcFolder.file("App.tsx", generateAppTsx());
    srcFolder.file("index.css", generateIndexCss());
    srcFolder.file("vite-env.d.ts", generateViteEnvDts());
    const componentsFolder = srcFolder.folder("components");
    if (componentsFolder) {
      componentsFolder.file("CheckoutModal.tsx", generateCheckoutModalWithEmbeddedConfig(systemConfig));
      componentsFolder.file("NovelasModal.tsx", generateNovelasModalWithEmbeddedConfig(systemConfig));
      componentsFolder.file("PriceCard.tsx", generatePriceCardWithEmbeddedConfig(systemConfig));
      componentsFolder.file("CartAnimation.tsx", generateCartAnimation());
      componentsFolder.file("CastSection.tsx", generateCastSection());
      componentsFolder.file("ErrorMessage.tsx", generateErrorMessage());
      componentsFolder.file("Header.tsx", generateHeader());
      componentsFolder.file("HeroCarousel.tsx", generateHeroCarousel());
      componentsFolder.file("LoadingSpinner.tsx", generateLoadingSpinner());
      componentsFolder.file("MovieCard.tsx", generateMovieCard());
      componentsFolder.file("OptimizedImage.tsx", generateOptimizedImage());
      componentsFolder.file("Toast.tsx", generateToast());
      componentsFolder.file("VideoPlayer.tsx", generateVideoPlayer());
    }
    const contextFolder = srcFolder.folder("context");
    if (contextFolder) {
      contextFolder.file("AdminContext.tsx", generateAdminContextWithEmbeddedConfig(systemConfig));
      contextFolder.file("CartContext.tsx", generateCartContextWithEmbeddedConfig(systemConfig));
    }
    const pagesFolder = srcFolder.folder("pages");
    if (pagesFolder) {
      pagesFolder.file("Home.tsx", generateHomePage());
      pagesFolder.file("Movies.tsx", generateMoviesPage());
      pagesFolder.file("TVShows.tsx", generateTVShowsPage());
      pagesFolder.file("Anime.tsx", generateAnimePage());
      pagesFolder.file("Search.tsx", generateSearchPage());
      pagesFolder.file("Cart.tsx", generateCartPage());
      pagesFolder.file("MovieDetail.tsx", generateMovieDetailPage());
      pagesFolder.file("TVDetail.tsx", generateTVDetailPage());
      pagesFolder.file("AdminPanel.tsx", generateAdminPanelPage());
    }
    const servicesFolder = srcFolder.folder("services");
    if (servicesFolder) {
      servicesFolder.file("api.ts", generateApiService());
      servicesFolder.file("tmdb.ts", generateTmdbService());
      servicesFolder.file("contentSync.ts", generateContentSyncService());
      servicesFolder.file("contentFilter.ts", generateContentFilterService());
    }
    const utilsFolder = srcFolder.folder("utils");
    if (utilsFolder) {
      utilsFolder.file("whatsapp.ts", generateWhatsappUtils());
      utilsFolder.file("performance.ts", generatePerformanceUtils());
      utilsFolder.file("errorHandler.ts", generateErrorHandlerUtils());
      utilsFolder.file("systemExport.ts", generateSystemExportUtils());
      utilsFolder.file("sourceCodeGenerator.ts", generateSourceCodeGeneratorUtils());
    }
    const hooksFolder = srcFolder.folder("hooks");
    if (hooksFolder) {
      hooksFolder.file("useOptimizedContent.ts", generateOptimizedContentHook());
      hooksFolder.file("usePerformance.ts", generatePerformanceHook());
      hooksFolder.file("useContentSync.ts", generateContentSyncHook());
    }
    const configFolder = srcFolder.folder("config");
    if (configFolder) {
      configFolder.file("api.ts", generateApiConfig());
    }
    const typesFolder = srcFolder.folder("types");
    if (typesFolder) {
      typesFolder.file("movie.ts", generateMovieTypes());
    }
  }
}
function generateCheckoutModalWithEmbeddedConfig(systemConfig) {
  const deliveryZones = JSON.stringify(systemConfig.deliveryZones, null, 2);
  const prices = JSON.stringify(systemConfig.prices, null, 2);
  return `import React, { useState, useEffect } from 'react';
import { X, MapPin, User, Phone, Home, CreditCard, DollarSign, MessageCircle, Calculator, Truck, ExternalLink } from 'lucide-react';

// ZONAS DE ENTREGA EMBEBIDAS - Generadas automáticamente
const EMBEDDED_DELIVERY_ZONES = ${deliveryZones};

// PRECIOS EMBEBIDOS
const EMBEDDED_PRICES = ${prices};

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
}

export interface OrderData {
  orderId: string;
  customerInfo: CustomerInfo;
  deliveryZone: string;
  deliveryCost: number;
  items: any[];
  subtotal: number;
  transferFee: number;
  total: number;
  cashTotal?: number;
  transferTotal?: number;
  pickupLocation?: boolean;
  showLocationMap?: boolean;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (orderData: OrderData) => void;
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export function CheckoutModal({ isOpen, onClose, onCheckout, items, total }: CheckoutModalProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: ''
  });
  const [selectedZone, setSelectedZone] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [pickupLocation, setPickupLocation] = useState(false);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  // Use embedded delivery zones
  const deliveryZones = EMBEDDED_DELIVERY_ZONES;

  // Agregar opción de recogida en el local
  const pickupOption = {
    id: 'pickup',
    name: 'Recogida en TV a la Carta',
    cost: 0
  };

  const allDeliveryOptions = [pickupOption, ...deliveryZones];

  useEffect(() => {
    if (selectedZone === 'pickup') {
      setDeliveryCost(0);
      setPickupLocation(true);
    } else if (selectedZone) {
      const zone = deliveryZones.find(z => z.name === selectedZone);
      setDeliveryCost(zone ? zone.cost : 0);
      setPickupLocation(false);
    }
  }, [selectedZone, deliveryZones]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^[+]?[0-9\\s\\-()]{8,}$/.test(customerInfo.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    if (!pickupLocation && !customerInfo.address.trim()) {
      newErrors.address = 'La dirección es requerida para entrega a domicilio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!selectedZone) {
      alert('Por favor selecciona una opción de entrega');
      return;
    }

    const orderId = \`TV-\${Date.now()}\`;
    const orderData: OrderData = {
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

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const openLocationMap = () => {
    const mapUrl = 'https://www.google.com/maps/place/20%C2%B002\\'22.5%22N+75%C2%B050\\'58.8%22W/@20.0394604,-75.8495414,180m/data=!3m1!1e3!4m4!3m3!8m2!3d20.039585!4d-75.849663?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D';
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-xl mr-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
                <p className="text-blue-100">Completa tus datos para proceder</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Customer Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Información Personal
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={\`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 \${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }\`}
                    placeholder="Ingresa tu nombre completo"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={\`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 \${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }\`}
                    placeholder="+53 5469 0878"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {!pickupLocation && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección Completa *
                    </label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className={\`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none \${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }\`}
                      placeholder="Calle, número, entre calles, referencias..."
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Opciones de Entrega
              </h3>
              
              <div className="space-y-3">
                {allDeliveryOptions.map((option) => (
                  <label
                    key={option.id || option.name}
                    className={\`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors \${
                      selectedZone === (option.id === 'pickup' ? 'pickup' : option.name)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-green-300'
                    }\`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value={option.id === 'pickup' ? 'pickup' : option.name}
                        checked={selectedZone === (option.id === 'pickup' ? 'pickup' : option.name)}
                        onChange={(e) => setSelectedZone(e.target.value)}
                        className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{option.name}</p>
                        {option.id === 'pickup' && (
                          <p className="text-sm text-gray-600">Reparto Nuevo Vista Alegre, Santiago de Cuba</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={\`font-semibold \${option.cost === 0 ? 'text-green-600' : 'text-green-600'}\`}>
                        {option.cost === 0 ? 'GRATIS' : \`$\${option.cost.toLocaleString()} CUP\`}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Location Map Option */}
              {pickupLocation && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Ubicación del Local</h4>
                      <p className="text-sm text-blue-700">Ver ubicación en Google Maps (opcional)</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={showLocationMap}
                          onChange={(e) => setShowLocationMap(e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-blue-700">Incluir ubicación</span>
                      </label>
                      <button
                        type="button"
                        onClick={openLocationMap}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Ver Mapa
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {allDeliveryOptions.length === 1 && (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Solo disponible recogida en el local
                  </h3>
                  <p className="text-gray-600">
                    Contacta con el administrador para configurar zonas de entrega adicionales.
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                Resumen del Pedido
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({items.length} elementos)</span>
                  <span className="font-semibold">$\${total.toLocaleString()} CUP</span>
                </div>
                
                {selectedZone && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {pickupLocation ? 'Recogida en local' : 'Entrega'}
                    </span>
                    <span className={\`font-semibold \${deliveryCost === 0 ? 'text-green-600' : ''}\`}>
                      {deliveryCost === 0 ? 'GRATIS' : \`$\${deliveryCost.toLocaleString()} CUP\`}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-blue-600">
                      $\${(total + deliveryCost).toLocaleString()} CUP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedZone}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center disabled:cursor-not-allowed"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Enviar Pedido por WhatsApp
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Al enviar el pedido serás redirigido a WhatsApp para completar la transacción
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}`;
}
function generateNovelasModalWithEmbeddedConfig(systemConfig) {
  const novels = JSON.stringify(systemConfig.novels, null, 2);
  const prices = JSON.stringify(systemConfig.prices, null, 2);
  return `import React, { useState, useEffect } from 'react';
import { X, Download, MessageCircle, Phone, BookOpen, Info, Check, DollarSign, CreditCard, Calculator, Search, Filter, SortAsc, SortDesc, Smartphone } from 'lucide-react';

// CATÁLOGO DE NOVELAS EMBEBIDO - Generado automáticamente
const EMBEDDED_NOVELS = ${novels};

// PRECIOS EMBEBIDOS
const EMBEDDED_PRICES = ${prices};

interface Novela {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  paymentType?: 'cash' | 'transfer';
}

interface NovelasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NovelasModal({ isOpen, onClose }: NovelasModalProps) {
  const [selectedNovelas, setSelectedNovelas] = useState<number[]>([]);
  const [novelasWithPayment, setNovelasWithPayment] = useState<Novela[]>([]);
  const [showNovelList, setShowNovelList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState<'titulo' | 'año' | 'capitulos'>('titulo');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get novels and prices from embedded configuration
  const adminNovels = EMBEDDED_NOVELS;
  const novelPricePerChapter = EMBEDDED_PRICES.novelPricePerChapter;
  const transferFeePercentage = EMBEDDED_PRICES.transferFeePercentage;
  
  // Base novels list
  const defaultNovelas: Novela[] = [];

  // Combine admin novels with default novels
  const allNovelas = [...defaultNovelas, ...adminNovels.map(novel => ({
    id: novel.id,
    titulo: novel.titulo,
    genero: novel.genero,
    capitulos: novel.capitulos,
    año: novel.año,
    descripcion: novel.descripcion
  }))];

  const phoneNumber = '+5354690878';

  // Get unique genres
  const uniqueGenres = [...new Set(allNovelas.map(novela => novela.genero))].sort();
  
  // Get unique years
  const uniqueYears = [...new Set(allNovelas.map(novela => novela.año))].sort((a, b) => b - a);

  // Initialize novels with default payment type
  useEffect(() => {
    const novelasWithDefaultPayment = allNovelas.map(novela => ({
      ...novela,
      paymentType: 'cash' as const
    }));
    setNovelasWithPayment(novelasWithDefaultPayment);
  }, []);

  // Filter novels function
  const getFilteredNovelas = () => {
    let filtered = novelasWithPayment.filter(novela => {
      const matchesSearch = novela.titulo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === '' || novela.genero === selectedGenre;
      const matchesYear = selectedYear === '' || novela.año.toString() === selectedYear;
      
      return matchesSearch && matchesGenre && matchesYear;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'titulo':
          comparison = a.titulo.localeCompare(b.titulo);
          break;
        case 'año':
          comparison = a.año - b.año;
          break;
        case 'capitulos':
          comparison = a.capitulos - b.capitulos;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  };

  const filteredNovelas = getFilteredNovelas();

  const handleNovelToggle = (novelaId: number) => {
    setSelectedNovelas(prev => {
      if (prev.includes(novelaId)) {
        return prev.filter(id => id !== novelaId);
      } else {
        return [...prev, novelaId];
      }
    });
  };

  const handlePaymentTypeChange = (novelaId: number, paymentType: 'cash' | 'transfer') => {
    setNovelasWithPayment(prev => 
      prev.map(novela => 
        novela.id === novelaId 
          ? { ...novela, paymentType }
          : novela
      )
    );
  };

  const selectAllNovelas = () => {
    setSelectedNovelas(allNovelas.map(n => n.id));
  };

  const clearAllNovelas = () => {
    setSelectedNovelas([]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSelectedYear('');
    setSortBy('titulo');
    setSortOrder('asc');
  };

  // Calculate totals by payment type with embedded pricing
  const calculateTotals = () => {
    const selectedNovelasData = novelasWithPayment.filter(n => selectedNovelas.includes(n.id));
    
    const cashNovelas = selectedNovelasData.filter(n => n.paymentType === 'cash');
    const transferNovelas = selectedNovelasData.filter(n => n.paymentType === 'transfer');
    
    const cashTotal = cashNovelas.reduce((sum, n) => sum + (n.capitulos * novelPricePerChapter), 0);
    const transferBaseTotal = transferNovelas.reduce((sum, n) => sum + (n.capitulos * novelPricePerChapter), 0);
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
    let listText = "📚 CATÁLOGO DE NOVELAS DISPONIBLES\\n";
    listText += "TV a la Carta - Novelas Completas\\n\\n";
    listText += \`💰 Precio: $\${novelPricePerChapter} CUP por capítulo\\n\`;
    listText += \`💳 Recargo transferencia: \${transferFeePercentage}%\\n\`;
    listText += "📱 Contacto: +5354690878\\n\\n";
    listText += "═══════════════════════════════════\\n\\n";
    
    if (allNovelas.length === 0) {
      listText += "📋 No hay novelas disponibles en este momento.\\n";
      listText += "Contacta con el administrador para más información.\\n\\n";
    } else {
      listText += "💵 PRECIOS EN EFECTIVO:\\n";
      listText += "═══════════════════════════════════\\n\\n";
      
      allNovelas.forEach((novela, index) => {
        const baseCost = novela.capitulos * novelPricePerChapter;
        listText += \`\${index + 1}. \${novela.titulo}\\n\`;
        listText += \`   📺 Género: \${novela.genero}\\n\`;
        listText += \`   📊 Capítulos: \${novela.capitulos}\\n\`;
        listText += \`   📅 Año: \${novela.año}\\n\`;
        listText += \`   💰 Costo en efectivo: \${baseCost.toLocaleString()} CUP\\n\\n\`;
      });
      
      listText += \`\\n🏦 PRECIOS CON TRANSFERENCIA BANCARIA (+\${transferFeePercentage}%):\\n\`;
      listText += "═══════════════════════════════════\\n\\n";
      
      allNovelas.forEach((novela, index) => {
        const baseCost = novela.capitulos * novelPricePerChapter;
        const transferCost = Math.round(baseCost * (1 + transferFeePercentage / 100));
        const recargo = transferCost - baseCost;
        listText += \`\${index + 1}. \${novela.titulo}\\n\`;
        listText += \`   📺 Género: \${novela.genero}\\n\`;
        listText += \`   📊 Capítulos: \${novela.capitulos}\\n\`;
        listText += \`   📅 Año: \${novela.año}\\n\`;
        listText += \`   💰 Costo base: \${baseCost.toLocaleString()} CUP\\n\`;
        listText += \`   💳 Recargo (\${transferFeePercentage}%): +\${recargo.toLocaleString()} CUP\\n\`;
        listText += \`   💰 Costo con transferencia: \${transferCost.toLocaleString()} CUP\\n\\n\`;
      });
      
      listText += "\\n📊 RESUMEN DE COSTOS:\\n";
      listText += "═══════════════════════════════════\\n\\n";
      
      const totalCapitulos = allNovelas.reduce((sum, novela) => sum + novela.capitulos, 0);
      const totalEfectivo = allNovelas.reduce((sum, novela) => sum + (novela.capitulos * novelPricePerChapter), 0);
      const totalTransferencia = allNovelas.reduce((sum, novela) => sum + Math.round((novela.capitulos * novelPricePerChapter) * (1 + transferFeePercentage / 100)), 0);
      const totalRecargo = totalTransferencia - totalEfectivo;
      
      listText += \`📊 Total de novelas: \${allNovelas.length}\\n\`;
      listText += \`📊 Total de capítulos: \${totalCapitulos.toLocaleString()}\\n\\n\`;
      listText += \`💵 CATÁLOGO COMPLETO EN EFECTIVO:\\n\`;
      listText += \`   💰 Costo total: \${totalEfectivo.toLocaleString()} CUP\\n\\n\`;
      listText += \`🏦 CATÁLOGO COMPLETO CON TRANSFERENCIA:\\n\`;
      listText += \`   💰 Costo base: \${totalEfectivo.toLocaleString()} CUP\\n\`;
      listText += \`   💳 Recargo total (\${transferFeePercentage}%): +\${totalRecargo.toLocaleString()} CUP\\n\`;
      listText += \`   💰 Costo total con transferencia: \${totalTransferencia.toLocaleString()} CUP\\n\\n\`;
    }
    
    listText += "═══════════════════════════════════\\n";
    listText += "💡 INFORMACIÓN IMPORTANTE:\\n";
    listText += "• Los precios en efectivo no tienen recargo adicional\\n";
    listText += \`• Las transferencias bancarias tienen un \${transferFeePercentage}% de recargo\\n\`;
    listText += "• Puedes seleccionar novelas individuales o el catálogo completo\\n";
    listText += "• Todos los precios están en pesos cubanos (CUP)\\n\\n";
    listText += "📞 Para encargar, contacta al +5354690878\\n";
    listText += "🌟 ¡Disfruta de las mejores novelas!\\n";
    listText += \`\\n📅 Generado el: \${new Date().toLocaleString('es-ES')}\`;
    
    return listText;
  };

  const downloadNovelList = () => {
    const listText = generateNovelListText();
    const blob = new Blob([listText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Catalogo_Novelas_TV_a_la_Carta.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sendSelectedNovelas = () => {
    if (selectedNovelas.length === 0) {
      alert('Por favor selecciona al menos una novela');
      return;
    }

    const { cashNovelas, transferNovelas, cashTotal, transferBaseTotal, transferFee, transferTotal, grandTotal, totalCapitulos } = totals;
    
    let message = "Me interesan los siguientes títulos:\\n\\n";
    
    // Cash novels
    if (cashNovelas.length > 0) {
      message += "💵 PAGO EN EFECTIVO:\\n";
      message += "═══════════════════════════════════\\n";
      cashNovelas.forEach((novela, index) => {
        message += \`\${index + 1}. \${novela.titulo}\\n\`;
        message += \`   📺 Género: \${novela.genero}\\n\`;
        message += \`   📊 Capítulos: \${novela.capitulos}\\n\`;
        message += \`   📅 Año: \${novela.año}\\n\`;
        message += \`   💰 Costo: $\${(novela.capitulos * novelPricePerChapter).toLocaleString()} CUP\\n\\n\`;
      });
      message += \`💰 Subtotal Efectivo: $\${cashTotal.toLocaleString()} CUP\\n\`;
      message += \`📊 Total capítulos: \${cashNovelas.reduce((sum, n) => sum + n.capitulos, 0)}\\n\\n\`;
    }
    
    // Transfer novels
    if (transferNovelas.length > 0) {
      message += \`🏦 PAGO POR TRANSFERENCIA BANCARIA (+\${transferFeePercentage}%):\\n\`;
      message += "═══════════════════════════════════\\n";
      transferNovelas.forEach((novela, index) => {
        const baseCost = novela.capitulos * novelPricePerChapter;
        const fee = Math.round(baseCost * (transferFeePercentage / 100));
        const totalCost = baseCost + fee;
        message += \`\${index + 1}. \${novela.titulo}\\n\`;
        message += \`   📺 Género: \${novela.genero}\\n\`;
        message += \`   📊 Capítulos: \${novela.capitulos}\\n\`;
        message += \`   📅 Año: \${novela.año}\\n\`;
        message += \`   💰 Costo base: $\${baseCost.toLocaleString()} CUP\\n\`;
        message += \`   💳 Recargo (\${transferFeePercentage}%): +$\${fee.toLocaleString()} CUP\\n\`;
        message += \`   💰 Costo total: $\${totalCost.toLocaleString()} CUP\\n\\n\`;
      });
      message += \`💰 Subtotal base transferencia: $\${transferBaseTotal.toLocaleString()} CUP\\n\`;
      message += \`💳 Recargo total (\${transferFeePercentage}%): +$\${transferFee.toLocaleString()} CUP\\n\`;
      message += \`💰 Subtotal Transferencia: $\${transferTotal.toLocaleString()} CUP\\n\`;
      message += \`📊 Total capítulos: \${transferNovelas.reduce((sum, n) => sum + n.capitulos, 0)}\\n\\n\`;
    }
    
    // Final summary
    message += "📊 RESUMEN FINAL:\\n";
    message += "═══════════════════════════════════\\n";
    message += \`• Total de novelas: \${selectedNovelas.length}\\n\`;
    message += \`• Total de capítulos: \${totalCapitulos}\\n\`;
    if (cashTotal > 0) {
      message += \`• Efectivo: $\${cashTotal.toLocaleString()} CUP (\${cashNovelas.length} novelas)\\n\`;
    }
    if (transferTotal > 0) {
      message += \`• Transferencia: $\${transferTotal.toLocaleString()} CUP (\${transferNovelas.length} novelas)\\n\`;
    }
    message += \`• TOTAL A PAGAR: $\${grandTotal.toLocaleString()} CUP\\n\\n\`;
    message += \`📱 Enviado desde TV a la Carta\\n\`;
    message += \`📅 Fecha: \${new Date().toLocaleString('es-ES')}\`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = \`https://wa.me/5354690878?text=\${encodedMessage}\`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    window.open(\`tel:\${phoneNumber}\`, '_self');
  };

  const handleWhatsApp = () => {
    const message = "📚 *Solicitar novelas*\\n\\n¿Hay novelas que me gustaría ver en [TV a la Carta] a continuación te comento:";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = \`https://wa.me/5354690878?text=\${encodedMessage}\`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Catálogo de Novelas</h2>
                <p className="text-sm sm:text-base opacity-90">Novelas completas disponibles</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="p-4 sm:p-6">
            {/* Main Information */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl p-8 mb-8 border-2 border-pink-200 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-2xl mr-4 shadow-lg">
                  <Info className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Información Importante
                </h3>
              </div>
              
              <div className="space-y-6 text-gray-800">
                <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-pink-200 shadow-sm">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-3 rounded-xl mr-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <p className="font-bold text-lg">Las novelas se encargan completas</p>
                </div>
                <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-green-200 shadow-sm">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-3 rounded-xl mr-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <p className="font-bold text-lg">Costo: $\${novelPricePerChapter} CUP por cada capítulo</p>
                </div>
                <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-orange-200 shadow-sm">
                  <div className="bg-gradient-to-r from-orange-400 to-red-400 p-3 rounded-xl mr-4">
                    <span className="text-2xl">💳</span>
                  </div>
                  <p className="font-bold text-lg">Transferencia bancaria: +{transferFeePercentage}% de recargo</p>
                </div>
                <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-blue-200 shadow-sm">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-3 rounded-xl mr-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="font-bold text-lg">Para más información, contacta al número:</p>
                </div>
              </div>

              {/* Contact number */}
              <div className="mt-8 bg-gradient-to-r from-white to-blue-50 rounded-2xl p-6 border-2 border-blue-300 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start mb-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                        <Smartphone className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-xl font-black text-gray-900">{phoneNumber}</p>
                    </div>
                    <p className="text-sm font-semibold text-blue-600 ml-10">Contacto directo</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handleCall}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Llamar
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Catalog options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={downloadNovelList}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                <Download className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="text-lg">Descargar Catálogo</div>
                  <div className="text-sm opacity-90">Lista completa de novelas</div>
                </div>
              </button>
              
              <button
                onClick={() => setShowNovelList(!showNovelList)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                <BookOpen className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="text-lg">Ver y Seleccionar</div>
                  <div className="text-sm opacity-90">Elegir novelas específicas</div>
                </div>
              </button>
            </div>

            {/* Show message when no novels available */}
            {allNovelas.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <BookOpen className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  No hay novelas disponibles
                </h3>
                <p className="text-yellow-700">
                  El catálogo de novelas está vacío. Contacta con el administrador para agregar novelas al sistema.
                </p>
              </div>
            )}

            {/* Novels list */}
            {showNovelList && allNovelas.length > 0 && (
              <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                {/* Filters */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-200">
                  <div className="flex items-center mb-4">
                    <Filter className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="text-lg font-bold text-purple-900">Filtros de Búsqueda</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar por título..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <select
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Todos los géneros</option>
                      {uniqueGenres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                    
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Todos los años</option>
                      {uniqueYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    
                    <div className="flex space-x-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'titulo' | 'año' | 'capitulos')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      >
                        <option value="titulo">Título</option>
                        <option value="año">Año</option>
                        <option value="capitulos">Capítulos</option>
                      </select>
                      
                      <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                        title={\`Ordenar \${sortOrder === 'asc' ? 'descendente' : 'ascendente'}\`}
                      >
                        {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div className="text-sm text-purple-700">
                      Mostrando {filteredNovelas.length} de {allNovelas.length} novelas
                      {(searchTerm || selectedGenre || selectedYear) && (
                        <span className="ml-2 text-purple-600">• Filtros activos</span>
                      )}
                    </div>
                    
                    {(searchTerm || selectedGenre || selectedYear || sortBy !== 'titulo' || sortOrder !== 'asc') && (
                      <button
                        onClick={clearFilters}
                        className="text-sm bg-purple-200 hover:bg-purple-300 text-purple-800 px-3 py-1 rounded-lg transition-colors"
                      >
                        Limpiar filtros
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <h4 className="text-lg font-bold text-gray-900">
                      Seleccionar Novelas ({selectedNovelas.length} seleccionadas)
                    </h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={selectAllNovelas}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Todas
                      </button>
                      <button
                        onClick={clearAllNovelas}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Ninguna
                      </button>
                    </div>
                  </div>
                </div>

                {/* Totals summary */}
                {selectedNovelas.length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-b border-gray-200">
                    <div className="flex items-center mb-4">
                      <Calculator className="h-6 w-6 text-green-600 mr-3" />
                      <h5 className="text-lg font-bold text-gray-900">Resumen de Selección</h5>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedNovelas.length}</div>
                        <div className="text-sm text-gray-600">Novelas</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-blue-600">{totals.totalCapitulos}</div>
                        <div className="text-sm text-gray-600">Capítulos</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-green-600">$\${totals.cashTotal.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Efectivo</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-orange-600">$\${totals.transferTotal.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Transferencia</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 border-2 border-green-300">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">TOTAL A PAGAR:</span>
                        <span className="text-2xl font-bold text-green-600">$\${totals.grandTotal.toLocaleString()} CUP</span>
                      </div>
                      {totals.transferFee > 0 && (
                        <div className="text-sm text-orange-600 mt-2">
                          Incluye $\${totals.transferFee.toLocaleString()} CUP de recargo por transferencia ({transferFeePercentage}%)
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="max-h-96 overflow-y-auto p-4">
                  <div className="grid grid-cols-1 gap-3">
                    {filteredNovelas.length > 0 ? (
                      filteredNovelas.map((novela) => {
                      const isSelected = selectedNovelas.includes(novela.id);
                      const baseCost = novela.capitulos * novelPricePerChapter;
                      const transferCost = Math.round(baseCost * (1 + transferFeePercentage / 100));
                      const finalCost = novela.paymentType === 'transfer' ? transferCost : baseCost;
                      
                      return (
                        <div
                          key={novela.id}
                          className={\`p-4 rounded-xl border transition-all \${
                            isSelected 
                              ? 'bg-purple-50 border-purple-300 shadow-md' 
                              : 'bg-gray-50 border-gray-200 hover:bg-purple-25 hover:border-purple-200'
                          }\`}
                        >
                          <div className="flex items-start space-x-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleNovelToggle(novela.id)}
                              className="mt-1 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900 mb-2">{novela.titulo}</p>
                                  <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                      {novela.genero}
                                    </span>
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                      {novela.capitulos} capítulos
                                    </span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                      {novela.año}
                                    </span>
                                  </div>
                                  
                                  {/* Payment type selector */}
                                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                    <span className="text-sm font-medium text-gray-700">Tipo de pago:</span>
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => handlePaymentTypeChange(novela.id, 'cash')}
                                        className={\`px-3 py-2 rounded-full text-xs font-medium transition-colors \${
                                          novela.paymentType === 'cash'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                                        }\`}
                                      >
                                        <DollarSign className="h-3 w-3 inline mr-1" />
                                        Efectivo
                                      </button>
                                      <button
                                        onClick={() => handlePaymentTypeChange(novela.id, 'transfer')}
                                        className={\`px-3 py-2 rounded-full text-xs font-medium transition-colors \${
                                          novela.paymentType === 'transfer'
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-200 text-gray-600 hover:bg-orange-100'
                                        }\`}
                                      >
                                        <CreditCard className="h-3 w-3 inline mr-1" />
                                        Transferencia (+{transferFeePercentage}%)
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-right sm:ml-4">
                                  <div className={\`text-lg font-bold \${
                                    novela.paymentType === 'cash' ? 'text-green-600' : 'text-orange-600'
                                  }\`}>
                                    $\${finalCost.toLocaleString()} CUP
                                  </div>
                                  {novela.paymentType === 'transfer' && (
                                    <div className="text-xs text-gray-500">
                                      Base: $\${baseCost.toLocaleString()} CUP
                                      <br />
                                      Recargo: +$\${(transferCost - baseCost).toLocaleString()} CUP
                                    </div>
                                  )}
                                  <div className="text-xs text-gray-500 mt-1">
                                    $\${novelPricePerChapter} CUP × {novela.capitulos} cap.
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {isSelected && (
                              <Check className="h-5 w-5 text-purple-600 mt-1" />
                            )}
                          </div>
                        </div>
                      );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No se encontraron novelas
                        </h3>
                        <p className="text-gray-600 mb-4">
                          No hay novelas que coincidan con los filtros seleccionados.
                        </p>
                        <button
                          onClick={clearFilters}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Limpiar filtros
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {selectedNovelas.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="text-center sm:text-left">
                        <p className="font-semibold text-gray-900">
                          {selectedNovelas.length} novelas seleccionadas
                        </p>
                        <p className="text-sm text-gray-600">
                          Total: $\${totals.grandTotal.toLocaleString()} CUP
                        </p>
                      </div>
                      <button
                        onClick={sendSelectedNovelas}
                        disabled={selectedNovelas.length === 0}
                        className={\`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center \${
                          selectedNovelas.length > 0
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }\`}
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Enviar por WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}`;
}
function generatePriceCardWithEmbeddedConfig(systemConfig) {
  const prices = JSON.stringify(systemConfig.prices, null, 2);
  return `import React from 'react';
import { DollarSign, Tv, Film, Star, CreditCard } from 'lucide-react';

// PRECIOS EMBEBIDOS - Generados automáticamente
const EMBEDDED_PRICES = ${prices};

interface PriceCardProps {
  type: 'movie' | 'tv';
  selectedSeasons?: number[];
  episodeCount?: number;
  isAnime?: boolean;
}

export function PriceCard({ type, selectedSeasons = [], episodeCount = 0, isAnime = false }: PriceCardProps) {
  // Use embedded prices
  const moviePrice = EMBEDDED_PRICES.moviePrice;
  const seriesPrice = EMBEDDED_PRICES.seriesPrice;
  const transferFeePercentage = EMBEDDED_PRICES.transferFeePercentage;
  
  const calculatePrice = () => {
    if (type === 'movie') {
      return moviePrice;
    } else {
      // Series: dynamic price per season
      return selectedSeasons.length * seriesPrice;
    }
  };

  const price = calculatePrice();
  const transferPrice = Math.round(price * (1 + transferFeePercentage / 100));
  
  const getIcon = () => {
    if (type === 'movie') {
      return isAnime ? '🎌' : '🎬';
    }
    return isAnime ? '🎌' : '📺';
  };

  const getTypeLabel = () => {
    if (type === 'movie') {
      return isAnime ? 'Película Animada' : 'Película';
    }
    return isAnime ? 'Anime' : 'Serie';
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-green-300 shadow-xl transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-3 rounded-xl mr-4 shadow-lg">
            <span className="text-2xl">{getIcon()}</span>
          </div>
          <div>
            <h3 className="font-black text-green-800 text-lg">{getTypeLabel()}</h3>
            <p className="text-green-600 text-sm font-semibold">
              {type === 'tv' && selectedSeasons.length > 0 
                ? \`\${selectedSeasons.length} temporada\${selectedSeasons.length > 1 ? 's' : ''}\`
                : 'Contenido completo'
              }
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full shadow-lg animate-pulse">
          <DollarSign className="h-4 w-4" />
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Cash Price */}
        <div className="bg-gradient-to-r from-white to-green-50 rounded-xl p-4 border-2 border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-green-700 flex items-center">
              <div className="bg-green-100 p-1 rounded-lg mr-2">
                <DollarSign className="h-4 w-4" />
              </div>
              Efectivo
            </span>
            <span className="text-xl font-black text-green-700">
              $\${price.toLocaleString()} CUP
            </span>
          </div>
        </div>
        
        {/* Transfer Price */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-orange-700 flex items-center">
              <div className="bg-orange-100 p-1 rounded-lg mr-2">
                <CreditCard className="h-4 w-4" />
              </div>
              Transferencia
            </span>
            <span className="text-xl font-black text-orange-700">
              $\${transferPrice.toLocaleString()} CUP
            </span>
          </div>
          <div className="text-sm text-orange-600 font-semibold bg-orange-100 px-2 py-1 rounded-full text-center">
            +{transferFeePercentage}% recargo bancario
          </div>
        </div>
        
        {type === 'tv' && selectedSeasons.length > 0 && (
          <div className="text-sm text-green-600 font-bold text-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-3 border border-green-200">
            $\${(price / selectedSeasons.length).toLocaleString()} CUP por temporada (efectivo)
          </div>
        )}
      </div>
    </div>
  );
}`;
}
function generateAdminContextWithEmbeddedConfig(systemConfig) {
  const config = JSON.stringify(systemConfig, null, 2);
  return `import React, { createContext, useContext, useReducer, useEffect } from 'react';
import JSZip from 'jszip';

// CONFIGURACIÓN EMBEBIDA - Generada automáticamente
const EMBEDDED_CONFIG = ${config};

// CREDENCIALES DE ACCESO (CONFIGURABLES)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'tvalacarta2024'
};

// Types
export interface PriceConfig {
  moviePrice: number;
  seriesPrice: number;
  transferFeePercentage: number;
  novelPricePerChapter: number;
}

export interface DeliveryZone {
  id: number;
  name: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

export interface Novel {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  section: string;
  action: string;
}

export interface SyncStatus {
  lastSync: string;
  isOnline: boolean;
  pendingChanges: number;
}

export interface SystemConfig {
  version: string;
  lastExport: string;
  prices: PriceConfig;
  deliveryZones: DeliveryZone[];
  novels: Novel[];
  settings: {
    autoSync: boolean;
    syncInterval: number;
    enableNotifications: boolean;
    maxNotifications: number;
  };
  metadata: {
    totalOrders: number;
    totalRevenue: number;
    lastOrderDate: string;
    systemUptime: string;
  };
}

export interface AdminState {
  isAuthenticated: boolean;
  prices: PriceConfig;
  deliveryZones: DeliveryZone[];
  novels: Novel[];
  notifications: Notification[];
  syncStatus: SyncStatus;
  systemConfig: SystemConfig;
}

type AdminAction = 
  | { type: 'LOGIN'; payload: { username: string; password: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PRICES'; payload: PriceConfig }
  | { type: 'ADD_DELIVERY_ZONE'; payload: Omit<DeliveryZone, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_DELIVERY_ZONE'; payload: DeliveryZone }
  | { type: 'DELETE_DELIVERY_ZONE'; payload: number }
  | { type: 'ADD_NOVEL'; payload: Omit<Novel, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_NOVEL'; payload: Novel }
  | { type: 'DELETE_NOVEL'; payload: number }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'UPDATE_SYNC_STATUS'; payload: Partial<SyncStatus> }
  | { type: 'SYNC_STATE'; payload: Partial<AdminState> }
  | { type: 'LOAD_SYSTEM_CONFIG'; payload: SystemConfig }
  | { type: 'UPDATE_SYSTEM_CONFIG'; payload: Partial<SystemConfig> };

interface AdminContextType {
  state: AdminState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updatePrices: (prices: PriceConfig) => void;
  addDeliveryZone: (zone: Omit<DeliveryZone, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDeliveryZone: (zone: DeliveryZone) => void;
  deleteDeliveryZone: (id: number) => void;
  addNovel: (novel: Omit<Novel, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNovel: (novel: Novel) => void;
  deleteNovel: (id: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  clearNotifications: () => void;
  exportSystemConfig: () => void;
  importSystemConfig: (config: SystemConfig) => void;
  exportCompleteSourceCode: () => void;
  syncWithRemote: () => Promise<void>;
  broadcastChange: (change: any) => void;
  syncAllSections: () => Promise<void>;
}

// Initial state with embedded configuration
const initialState: AdminState = {
  isAuthenticated: false,
  prices: EMBEDDED_CONFIG.prices,
  deliveryZones: EMBEDDED_CONFIG.deliveryZones,
  novels: EMBEDDED_CONFIG.novels,
  notifications: [],
  syncStatus: {
    lastSync: new Date().toISOString(),
    isOnline: true,
    pendingChanges: 0,
  },
  systemConfig: EMBEDDED_CONFIG,
};

// Reducer
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload.username === ADMIN_CREDENTIALS.username && action.payload.password === ADMIN_CREDENTIALS.password) {
        return { ...state, isAuthenticated: true };
      }
      return state;

    case 'LOGOUT':
      return { ...state, isAuthenticated: false };

    case 'UPDATE_PRICES':
      const updatedConfig = {
        ...state.systemConfig,
        prices: action.payload,
        lastExport: new Date().toISOString(),
      };
      return {
        ...state,
        prices: action.payload,
        systemConfig: updatedConfig,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };

    case 'ADD_DELIVERY_ZONE':
      const newZone: DeliveryZone = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const configWithNewZone = {
        ...state.systemConfig,
        deliveryZones: [...state.systemConfig.deliveryZones, newZone],
        lastExport: new Date().toISOString(),
      };
      return {
        ...state,
        deliveryZones: [...state.deliveryZones, newZone],
        systemConfig: configWithNewZone,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };

    case 'UPDATE_DELIVERY_ZONE':
      const updatedZones = state.deliveryZones.map(zone =>
        zone.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() }
          : zone
      );
      const configWithUpdatedZone = {
        ...state.systemConfig,
        deliveryZones: updatedZones,
        lastExport: new Date().toISOString(),
      };
      return {
        ...state,
        deliveryZones: updatedZones,
        systemConfig: configWithUpdatedZone,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };

    case 'DELETE_DELIVERY_ZONE':
      const filteredZones = state.deliveryZones.filter(zone => zone.id !== action.payload);
      const configWithDeletedZone = {
        ...state.systemConfig,
        deliveryZones: filteredZones,
        lastExport: new Date().toISOString(),
      };
      return {
        ...state,
        deliveryZones: filteredZones,
        systemConfig: configWithDeletedZone,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };

    case 'ADD_NOVEL':
      const newNovel: Novel = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const configWithNewNovel = {
        ...state.systemConfig,
        novels: [...state.systemConfig.novels, newNovel],
        lastExport: new Date().toISOString(),
      };
      return {
        ...state,
        novels: [...state.novels, newNovel],
        systemConfig: configWithNewNovel,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };

    case 'UPDATE_NOVEL':
      const updatedNovels = state.novels.map(novel =>
        novel.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() }
          : novel
      );
      const configWithUpdatedNovel = {
        ...state.systemConfig,
        novels: updatedNovels,
        lastExport: new Date().toISOString(),
      };
      return {
        ...state,
        novels: updatedNovels,
        systemConfig: configWithUpdatedNovel,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };

    case 'DELETE_NOVEL':
      const filteredNovels = state.novels.filter(novel => novel.id !== action.payload);
      const configWithDeletedNovel = {
        ...state.systemConfig,
        novels: filteredNovels,
        lastExport: new Date().toISOString(),
      };
      return {
        ...state,
        novels: filteredNovels,
        systemConfig: configWithDeletedNovel,
        syncStatus: { ...state.syncStatus, pendingChanges: state.syncStatus.pendingChanges + 1 }
      };

    case 'ADD_NOTIFICATION':
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      return {
        ...state,
        notifications: [notification, ...state.notifications].slice(0, state.systemConfig.settings.maxNotifications),
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };

    case 'UPDATE_SYNC_STATUS':
      return {
        ...state,
        syncStatus: { ...state.syncStatus, ...action.payload },
      };

    case 'LOAD_SYSTEM_CONFIG':
      return {
        ...state,
        prices: action.payload.prices,
        deliveryZones: action.payload.deliveryZones,
        novels: action.payload.novels,
        systemConfig: action.payload,
        syncStatus: { ...state.syncStatus, lastSync: new Date().toISOString(), pendingChanges: 0 }
      };

    case 'UPDATE_SYSTEM_CONFIG':
      const newSystemConfig = { ...state.systemConfig, ...action.payload };
      return {
        ...state,
        systemConfig: newSystemConfig,
      };

    case 'SYNC_STATE':
      return {
        ...state,
        ...action.payload,
        syncStatus: { ...state.syncStatus, lastSync: new Date().toISOString(), pendingChanges: 0 }
      };

    default:
      return state;
  }
}

// Context creation
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Real-time sync service
class RealTimeSyncService {
  private listeners: Set<(data: any) => void> = new Set();
  private syncInterval: NodeJS.Timeout | null = null;
  private storageKey = 'admin_system_state';
  private configKey = 'system_config';

  constructor() {
    this.initializeSync();
  }

  private initializeSync() {
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    this.syncInterval = setInterval(() => {
      this.checkForUpdates();
    }, 5000);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
  }

  private handleStorageChange(event: StorageEvent) {
    if ((event.key === this.storageKey || event.key === this.configKey) && event.newValue) {
      try {
        const newState = JSON.parse(event.newValue);
        this.notifyListeners(newState);
      } catch (error) {
        console.error('Error parsing sync data:', error);
      }
    }
  }

  private checkForUpdates() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      const config = localStorage.getItem(this.configKey);
      
      if (stored) {
        const storedState = JSON.parse(stored);
        this.notifyListeners(storedState);
      }
      
      if (config) {
        const configData = JSON.parse(config);
        this.notifyListeners({ systemConfig: configData });
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }

  subscribe(callback: (data: any) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  broadcast(state: AdminState) {
    try {
      const syncData = {
        ...state,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(this.storageKey, JSON.stringify(syncData));
      localStorage.setItem(this.configKey, JSON.stringify(state.systemConfig));
      this.notifyListeners(syncData);
    } catch (error) {
      console.error('Error broadcasting state:', error);
    }
  }

  private notifyListeners(data: any) {
    this.listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in sync listener:', error);
      }
    });
  }

  destroy() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
    this.listeners.clear();
  }
}

// Provider component
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const [syncService] = React.useState(() => new RealTimeSyncService());

  // Load system config on startup
  useEffect(() => {
    try {
      const storedConfig = localStorage.getItem('system_config');
      if (storedConfig) {
        const config = JSON.parse(storedConfig);
        dispatch({ type: 'LOAD_SYSTEM_CONFIG', payload: config });
      }
      
      const stored = localStorage.getItem('admin_system_state');
      if (stored) {
        const storedState = JSON.parse(stored);
        dispatch({ type: 'SYNC_STATE', payload: storedState });
      }
    } catch (error) {
      console.error('Error loading initial state:', error);
    }
  }, []);

  // Save state changes
  useEffect(() => {
    try {
      localStorage.setItem('admin_system_state', JSON.stringify(state));
      localStorage.setItem('system_config', JSON.stringify(state.systemConfig));
      syncService.broadcast(state);
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }, [state, syncService]);

  // Real-time sync listener
  useEffect(() => {
    const unsubscribe = syncService.subscribe((syncedState) => {
      if (JSON.stringify(syncedState) !== JSON.stringify(state)) {
        dispatch({ type: 'SYNC_STATE', payload: syncedState });
      }
    });
    return unsubscribe;
  }, [syncService, state]);

  useEffect(() => {
    return () => {
      syncService.destroy();
    };
  }, [syncService]);

  // Context methods implementation
  const login = (username: string, password: string): boolean => {
    dispatch({ type: 'LOGIN', payload: { username, password } });
    const success = username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
    if (success) {
      addNotification({
        type: 'success',
        title: 'Inicio de sesión exitoso',
        message: 'Bienvenido al panel de administración',
        section: 'Autenticación',
        action: 'login'
      });
    }
    return success;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    addNotification({
      type: 'info',
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente',
      section: 'Autenticación',
      action: 'logout'
    });
  };

  const updatePrices = (prices: PriceConfig) => {
    dispatch({ type: 'UPDATE_PRICES', payload: prices });
    addNotification({
      type: 'success',
      title: 'Precios actualizados',
      message: 'Los precios se han actualizado y sincronizado automáticamente',
      section: 'Precios',
      action: 'update'
    });
    broadcastChange({ type: 'prices', data: prices });
  };

  const addDeliveryZone = (zone: Omit<DeliveryZone, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_DELIVERY_ZONE', payload: zone });
    addNotification({
      type: 'success',
      title: 'Zona de entrega agregada',
      message: \`Se agregó la zona "\${zone.name}" y se sincronizó automáticamente\`,
      section: 'Zonas de Entrega',
      action: 'create'
    });
    broadcastChange({ type: 'delivery_zone_add', data: zone });
  };

  const updateDeliveryZone = (zone: DeliveryZone) => {
    dispatch({ type: 'UPDATE_DELIVERY_ZONE', payload: zone });
    addNotification({
      type: 'success',
      title: 'Zona de entrega actualizada',
      message: \`Se actualizó la zona "\${zone.name}" y se sincronizó automáticamente\`,
      section: 'Zonas de Entrega',
      action: 'update'
    });
    broadcastChange({ type: 'delivery_zone_update', data: zone });
  };

  const deleteDeliveryZone = (id: number) => {
    const zone = state.deliveryZones.find(z => z.id === id);
    dispatch({ type: 'DELETE_DELIVERY_ZONE', payload: id });
    addNotification({
      type: 'warning',
      title: 'Zona de entrega eliminada',
      message: \`Se eliminó la zona "\${zone?.name || 'Desconocida'}" y se sincronizó automáticamente\`,
      section: 'Zonas de Entrega',
      action: 'delete'
    });
    broadcastChange({ type: 'delivery_zone_delete', data: { id } });
  };

  const addNovel = (novel: Omit<Novel, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_NOVEL', payload: novel });
    addNotification({
      type: 'success',
      title: 'Novela agregada',
      message: \`Se agregó la novela "\${novel.titulo}" y se sincronizó automáticamente\`,
      section: 'Gestión de Novelas',
      action: 'create'
    });
    broadcastChange({ type: 'novel_add', data: novel });
  };

  const updateNovel = (novel: Novel) => {
    dispatch({ type: 'UPDATE_NOVEL', payload: novel });
    addNotification({
      type: 'success',
      title: 'Novela actualizada',
      message: \`Se actualizó la novela "\${novel.titulo}" y se sincronizó automáticamente\`,
      section: 'Gestión de Novelas',
      action: 'update'
    });
    broadcastChange({ type: 'novel_update', data: novel });
  };

  const deleteNovel = (id: number) => {
    const novel = state.novels.find(n => n.id === id);
    dispatch({ type: 'DELETE_NOVEL', payload: id });
    addNotification({
      type: 'warning',
      title: 'Novela eliminada',
      message: \`Se eliminó la novela "\${novel?.titulo || 'Desconocida'}" y se sincronizó automáticamente\`,
      section: 'Gestión de Novelas',
      action: 'delete'
    });
    broadcastChange({ type: 'novel_delete', data: { id } });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
    addNotification({
      type: 'info',
      title: 'Notificaciones limpiadas',
      message: 'Se han eliminado todas las notificaciones del sistema',
      section: 'Notificaciones',
      action: 'clear'
    });
  };

  const exportSystemConfig = async () => {
    try {
      addNotification({
        type: 'info',
        title: 'Exportación de configuración iniciada',
        message: 'Generando archivo de configuración JSON...',
        section: 'Sistema',
        action: 'export_config_start'
      });

      // Create comprehensive system configuration
      const completeConfig: SystemConfig = {
        ...state.systemConfig,
        version: '2.1.0',
        lastExport: new Date().toISOString(),
        prices: state.prices,
        deliveryZones: state.deliveryZones,
        novels: state.novels,
        metadata: {
          ...state.systemConfig.metadata,
          totalOrders: state.systemConfig.metadata.totalOrders,
          totalRevenue: state.systemConfig.metadata.totalRevenue,
          lastOrderDate: state.systemConfig.metadata.lastOrderDate,
          systemUptime: state.systemConfig.metadata.systemUptime,
        },
      };

      // Generate JSON file
      const configJson = JSON.stringify(completeConfig, null, 2);
      const blob = new Blob([configJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = \`TV_a_la_Carta_Config_\${new Date().toISOString().split('T')[0]}.json\`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Update system config with export timestamp
      dispatch({ 
        type: 'UPDATE_SYSTEM_CONFIG', 
        payload: { lastExport: new Date().toISOString() } 
      });

      addNotification({
        type: 'success',
        title: 'Configuración exportada',
        message: 'La configuración JSON se ha exportado correctamente',
        section: 'Sistema',
        action: 'export_config'
      });
    } catch (error) {
      console.error('Error exporting system config:', error);
      addNotification({
        type: 'error',
        title: 'Error en la exportación de configuración',
        message: 'No se pudo exportar la configuración JSON',
        section: 'Sistema',
        action: 'export_config_error'
      });
    }
  };

  const exportCompleteSourceCode = async () => {
    try {
      addNotification({
        type: 'info',
        title: 'Exportación de código fuente iniciada',
        message: 'Generando sistema completo con código fuente...',
        section: 'Sistema',
        action: 'export_source_start'
      });

      // Importar dinámicamente el generador de código fuente
      try {
        const { generateCompleteSourceCode } = await import('../utils/sourceCodeGenerator');
        await generateCompleteSourceCode(state.systemConfig);
      } catch (importError) {
        console.error('Error importing source code generator:', importError);
        throw new Error('No se pudo cargar el generador de código fuente');
      }

      addNotification({
        type: 'success',
        title: 'Código fuente exportado',
        message: 'El sistema completo se ha exportado como código fuente',
        section: 'Sistema',
        action: 'export_source'
      });
    } catch (error) {
      console.error('Error exporting source code:', error);
      addNotification({
        type: 'error',
        title: 'Error en la exportación de código',
        message: error instanceof Error ? error.message : 'No se pudo exportar el código fuente completo',
        section: 'Sistema',
        action: 'export_source_error'
      });
      throw error;
    }
  };

  const importSystemConfig = (config: SystemConfig) => {
    try {
      dispatch({ type: 'LOAD_SYSTEM_CONFIG', payload: config });
      addNotification({
        type: 'success',
        title: 'Configuración importada',
        message: 'La configuración del sistema se ha cargado correctamente',
        section: 'Sistema',
        action: 'import'
      });
    } catch (error) {
      console.error('Error importing system config:', error);
      addNotification({
        type: 'error',
        title: 'Error en la importación',
        message: 'No se pudo cargar la configuración del sistema',
        section: 'Sistema',
        action: 'import_error'
      });
    }
  };

  const syncAllSections = async (): Promise<void> => {
    try {
      addNotification({
        type: 'info',
        title: 'Sincronización completa iniciada',
        message: 'Sincronizando todas las secciones del sistema...',
        section: 'Sistema',
        action: 'sync_all_start'
      });

      // Simulate comprehensive sync of all sections
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update all components with current state
      const updatedConfig: SystemConfig = {
        ...state.systemConfig,
        lastExport: new Date().toISOString(),
        prices: state.prices,
        deliveryZones: state.deliveryZones,
        novels: state.novels,
      };

      dispatch({ type: 'UPDATE_SYSTEM_CONFIG', payload: updatedConfig });
      
      // Broadcast changes to all components
      window.dispatchEvent(new CustomEvent('admin_full_sync', { 
        detail: { 
          config: updatedConfig,
          timestamp: new Date().toISOString()
        } 
      }));

      addNotification({
        type: 'success',
        title: 'Sincronización completa exitosa',
        message: 'Todas las secciones se han sincronizado correctamente',
        section: 'Sistema',
        action: 'sync_all'
      });
    } catch (error) {
      console.error('Error in full sync:', error);
      addNotification({
        type: 'error',
        title: 'Error en sincronización completa',
        message: 'No se pudo completar la sincronización de todas las secciones',
        section: 'Sistema',
        action: 'sync_all_error'
      });
    }
  };

  const broadcastChange = (change: any) => {
    const changeEvent = {
      ...change,
      timestamp: new Date().toISOString(),
      source: 'admin_panel'
    };
    
    dispatch({ 
      type: 'UPDATE_SYNC_STATUS', 
      payload: { 
        lastSync: new Date().toISOString(),
        pendingChanges: Math.max(0, state.syncStatus.pendingChanges - 1)
      } 
    });

    window.dispatchEvent(new CustomEvent('admin_state_change', { 
      detail: changeEvent 
    }));
  };

  const syncWithRemote = async (): Promise<void> => {
    try {
      dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { isOnline: true } });
      
      addNotification({
        type: 'info',
        title: 'Sincronización iniciada',
        message: 'Iniciando sincronización con el sistema remoto...',
        section: 'Sistema',
        action: 'sync_start'
      });

      // Simulate remote sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch({ 
        type: 'UPDATE_SYNC_STATUS', 
        payload: { 
          lastSync: new Date().toISOString(),
          pendingChanges: 0
        } 
      });
      
      addNotification({
        type: 'success',
        title: 'Sincronización completada',
        message: 'Todos los datos se han sincronizado correctamente',
        section: 'Sistema',
        action: 'sync'
      });
    } catch (error) {
      dispatch({ type: 'UPDATE_SYNC_STATUS', payload: { isOnline: false } });
      addNotification({
        type: 'error',
        title: 'Error de sincronización',
        message: 'No se pudo sincronizar con el servidor remoto',
        section: 'Sistema',
        action: 'sync_error'
      });
    }
  };

  return (
    <AdminContext.Provider
      value={{
        state,
        login,
        logout,
        updatePrices,
        addDeliveryZone,
        updateDeliveryZone,
        deleteDeliveryZone,
        addNovel,
        updateNovel,
        deleteNovel,
        addNotification,
        clearNotifications,
        exportSystemConfig,
        importSystemConfig,
        exportCompleteSourceCode,
        syncWithRemote,
        broadcastChange,
        syncAllSections,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export { AdminContext };`;
}
function generateCartContextWithEmbeddedConfig(systemConfig) {
  const prices = JSON.stringify(systemConfig.prices, null, 2);
  return `import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Toast } from '../components/Toast';
import type { CartItem } from '../types/movie';

// PRECIOS EMBEBIDOS - Generados automáticamente
const EMBEDDED_PRICES = ${prices};

interface SeriesCartItem extends CartItem {
  selectedSeasons?: number[];
  paymentType?: 'cash' | 'transfer';
}

interface CartState {
  items: SeriesCartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: SeriesCartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_SEASONS'; payload: { id: number; seasons: number[] } }
  | { type: 'UPDATE_PAYMENT_TYPE'; payload: { id: number; paymentType: 'cash' | 'transfer' } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: SeriesCartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (item: SeriesCartItem) => void;
  removeItem: (id: number) => void;
  updateSeasons: (id: number, seasons: number[]) => void;
  updatePaymentType: (id: number, paymentType: 'cash' | 'transfer') => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  getItemSeasons: (id: number) => number[];
  getItemPaymentType: (id: number) => 'cash' | 'transfer';
  calculateItemPrice: (item: SeriesCartItem) => number;
  calculateTotalPrice: () => number;
  calculateTotalByPaymentType: () => { cash: number; transfer: number };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.some(item => item.id === action.payload.id && item.type === action.payload.type)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + 1
      };
    case 'UPDATE_SEASONS':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, selectedSeasons: action.payload.seasons }
            : item
        )
      };
    case 'UPDATE_PAYMENT_TYPE':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, paymentType: action.payload.paymentType }
            : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - 1
      };
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: action.payload.length
      };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const [toast, setToast] = React.useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({ message: '', type: 'success', isVisible: false });

  // Clear cart on page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('pageRefreshed', 'true');
    };

    const handleLoad = () => {
      if (sessionStorage.getItem('pageRefreshed') === 'true') {
        localStorage.removeItem('movieCart');
        dispatch({ type: 'CLEAR_CART' });
        sessionStorage.removeItem('pageRefreshed');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    if (sessionStorage.getItem('pageRefreshed') === 'true') {
      localStorage.removeItem('movieCart');
      dispatch({ type: 'CLEAR_CART' });
      sessionStorage.removeItem('pageRefreshed');
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('pageRefreshed') !== 'true') {
      const savedCart = localStorage.getItem('movieCart');
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: items });
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movieCart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: SeriesCartItem) => {
    const itemWithDefaults = { 
      ...item, 
      paymentType: 'cash' as const,
      selectedSeasons: item.type === 'tv' && !item.selectedSeasons ? [1] : item.selectedSeasons
    };
    dispatch({ type: 'ADD_ITEM', payload: itemWithDefaults });
    
    setToast({
      message: \`"\${item.title}" agregado al carrito\`,
      type: 'success',
      isVisible: true
    });
  };

  const removeItem = (id: number) => {
    const item = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    
    if (item) {
      setToast({
        message: \`"\${item.title}" retirado del carrito\`,
        type: 'error',
        isVisible: true
      });
    }
  };

  const updateSeasons = (id: number, seasons: number[]) => {
    dispatch({ type: 'UPDATE_SEASONS', payload: { id, seasons } });
  };

  const updatePaymentType = (id: number, paymentType: 'cash' | 'transfer') => {
    dispatch({ type: 'UPDATE_PAYMENT_TYPE', payload: { id, paymentType } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (id: number) => {
    return state.items.some(item => item.id === id);
  };

  const getItemSeasons = (id: number): number[] => {
    const item = state.items.find(item => item.id === id);
    return item?.selectedSeasons || [];
  };

  const getItemPaymentType = (id: number): 'cash' | 'transfer' => {
    const item = state.items.find(item => item.id === id);
    return item?.paymentType || 'cash';
  };

  const calculateItemPrice = (item: SeriesCartItem): number => {
    // Use embedded prices
    const moviePrice = EMBEDDED_PRICES.moviePrice;
    const seriesPrice = EMBEDDED_PRICES.seriesPrice;
    const transferFeePercentage = EMBEDDED_PRICES.transferFeePercentage;
    
    if (item.type === 'movie') {
      const basePrice = moviePrice;
      return item.paymentType === 'transfer' ? Math.round(basePrice * (1 + transferFeePercentage / 100)) : basePrice;
    } else {
      const seasons = item.selectedSeasons?.length || 1;
      const basePrice = seasons * seriesPrice;
      return item.paymentType === 'transfer' ? Math.round(basePrice * (1 + transferFeePercentage / 100)) : basePrice;
    }
  };

  const calculateTotalPrice = (): number => {
    return state.items.reduce((total, item) => {
      return total + calculateItemPrice(item);
    }, 0);
  };

  const calculateTotalByPaymentType = (): { cash: number; transfer: number } => {
    const moviePrice = EMBEDDED_PRICES.moviePrice;
    const seriesPrice = EMBEDDED_PRICES.seriesPrice;
    const transferFeePercentage = EMBEDDED_PRICES.transferFeePercentage;
    
    return state.items.reduce((totals, item) => {
      const basePrice = item.type === 'movie' ? moviePrice : (item.selectedSeasons?.length || 1) * seriesPrice;
      if (item.paymentType === 'transfer') {
        totals.transfer += Math.round(basePrice * (1 + transferFeePercentage / 100));
      } else {
        totals.cash += basePrice;
      }
      return totals;
    }, { cash: 0, transfer: 0 });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <CartContext.Provider value={{ 
      state, 
      addItem, 
      removeItem, 
      updateSeasons, 
      updatePaymentType,
      clearCart, 
      isInCart, 
      getItemSeasons,
      getItemPaymentType,
      calculateItemPrice,
      calculateTotalPrice,
      calculateTotalByPaymentType
    }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}`;
}
function generatePackageJson() {
  return `{
  "name": "tv-a-la-carta-sistema-completo",
  "private": true,
  "version": "2.1.0",
  "type": "module",
  "description": "Sistema completo de gestión para TV a la Carta con panel de administración",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@types/node": "^24.2.1",
    "jszip": "^3.10.1",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.8.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  },
  "keywords": [
    "tv",
    "movies",
    "series",
    "anime",
    "streaming",
    "cart",
    "admin",
    "react",
    "typescript"
  ],
  "author": "TV a la Carta",
  "license": "MIT"
}`;
}
function generateViteConfig() {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});`;
}
function generateTailwindConfig() {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
}
function generateTsConfig() {
  return `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`;
}
function generateTsConfigApp() {
  return `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`;
}
function generateTsConfigNode() {
  return `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}`;
}
function generatePostcssConfig() {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;
}
function generateEslintConfig() {
  return `import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);`;
}
function generateIndexHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/unnamed.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <base href="/" />
    <title>TV a la Carta: Películas y series ilimitadas y mucho más</title>
    <style>
      /* Deshabilitar zoom y selección de texto */
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Permitir selección de texto solo en inputs y textareas */
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      /* Deshabilitar zoom en iOS Safari */
      body {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
        touch-action: manipulation;
      }
      
      /* Prevenir zoom en inputs en iOS */
      input[type="text"],
      input[type="email"],
      input[type="tel"],
      input[type="password"],
      input[type="number"],
      input[type="search"],
      textarea,
      select {
        font-size: 16px !important;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"><\/script>
  </body>
</html>`;
}
function generateVercelConfig() {
  return `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`;
}
function generateNetlifyRedirects() {
  return `# Netlify redirects for SPA routing
/*    /index.html   200

# Handle specific routes
/movies    /index.html   200
/tv        /index.html   200
/anime     /index.html   200
/cart      /index.html   200
/search    /index.html   200
/movie/*   /index.html   200
/tv/*      /index.html   200
/admin     /index.html   200`;
}
function generateReadme(systemConfig) {
  return `# TV a la Carta - Sistema de Gestión

## Descripción
Sistema completo de gestión para TV a la Carta con panel de administración, carrito de compras y sincronización en tiempo real.

## Versión
${systemConfig.version}

## Última Exportación
${(/* @__PURE__ */ new Date()).toISOString()}

## Configuración Actual

### Precios
- Películas: $${systemConfig.prices.moviePrice} CUP
- Series: $${systemConfig.prices.seriesPrice} CUP por temporada
- Recargo transferencia: ${systemConfig.prices.transferFeePercentage}%
- Novelas: $${systemConfig.prices.novelPricePerChapter} CUP por capítulo

### Zonas de Entrega
Total configuradas: ${systemConfig.deliveryZones.length}

### Novelas Administradas
Total: ${systemConfig.novels.length}

## Características
- ✅ Panel de administración completo
- ✅ Sincronización en tiempo real
- ✅ Gestión de precios dinámicos
- ✅ Zonas de entrega personalizables
- ✅ Catálogo de novelas administrable
- ✅ Sistema de notificaciones
- ✅ Exportación/Importación de configuración
- ✅ Optimización de rendimiento
- ✅ Carrito de compras avanzado
- ✅ Integración con WhatsApp

## Instalación
\`\`\`bash
npm install
npm run dev
\`\`\`

## Uso del Panel de Administración
1. Acceder a /admin
2. Usuario: admin
3. Contraseña: tvalacarta2024

## Tecnologías
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Lucide Icons
- JSZip

## Contacto
WhatsApp: +5354690878`;
}
function generateMainTsx() {
  return `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;
}
function generateAppTsx() {
  return `import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { TVShows } from './pages/TVShows';
import { Anime } from './pages/Anime';
import { SearchPage } from './pages/Search';
import { MovieDetail } from './pages/MovieDetail';
import { TVDetail } from './pages/TVDetail';
import { Cart } from './pages/Cart';
import { AdminPanel } from './pages/AdminPanel';

function App() {
  // Detectar refresh y redirigir a la página principal
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      // Marcar que la página se está recargando
      sessionStorage.setItem('pageRefreshed', 'true');
    };

    const handleLoad = () => {
      // Si se detecta que la página fue recargada, redirigir a la página principal
      if (sessionStorage.getItem('pageRefreshed') === 'true') {
        sessionStorage.removeItem('pageRefreshed');
        // Solo redirigir si no estamos ya en la página principal
        if (window.location.pathname !== '/') {
          window.location.href = 'https://tvalacarta.vercel.app/';
          return;
        }
      }
    };

    // Verificar al montar el componente si fue un refresh
    if (sessionStorage.getItem('pageRefreshed') === 'true') {
      sessionStorage.removeItem('pageRefreshed');
      if (window.location.pathname !== '/') {
        window.location.href = 'https://tvalacarta.vercel.app/';
        return;
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Deshabilitar zoom con teclado y gestos
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Deshabilitar Ctrl/Cmd + Plus/Minus/0 para zoom
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
        return false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Deshabilitar Ctrl/Cmd + scroll para zoom
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return false;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Deshabilitar pinch-to-zoom en dispositivos táctiles
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Deshabilitar pinch-to-zoom en dispositivos táctiles
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };

    // Agregar event listeners
    document.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/*" element={
                <>
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/movies" element={<Movies />} />
                      <Route path="/tv" element={<TVShows />} />
                      <Route path="/anime" element={<Anime />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/movie/:id" element={<MovieDetail />} />
                      <Route path="/tv/:id" element={<TVDetail />} />
                      <Route path="/cart" element={<Cart />} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;`;
}
function generateIndexCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Configuraciones adicionales para deshabilitar zoom */
@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    touch-action: manipulation;
  }
  
  body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    overflow-x: hidden;
  }
  
  /* Permitir selección solo en elementos de entrada */
  input, textarea, [contenteditable="true"] {
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    user-select: text !important;
  }
  
  /* Prevenir zoom accidental en dispositivos móviles */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="password"],
  input[type="number"],
  input[type="search"],
  textarea,
  select {
    font-size: 16px !important;
    transform: translateZ(0);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  
  /* Deshabilitar zoom en imágenes */
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    pointer-events: none;
  }
  
  /* Permitir interacción en botones e imágenes clickeables */
  button, a, [role="button"], .clickable {
    pointer-events: auto;
  }
  
  button img, a img, [role="button"] img, .clickable img {
    pointer-events: none;
  }
  
  /* Custom animations */
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
  
  .animate-shrink {
    animation: shrink 3s linear forwards;
  }
  
  /* Animaciones para efectos visuales modernos */
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  
  .animation-delay-400 {
    animation-delay: 400ms;
  }
  
  .animation-delay-600 {
    animation-delay: 600ms;
  }
  
  /* Animaciones para el modal */
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-in {
    animation: fade-in 0.3s ease-out;
  }
  
  /* Enhanced hover effects */
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(147, 51, 234, 0.6);
    }
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  /* Floating animation */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  /* Shimmer effect */
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .animate-shimmer {
    animation: shimmer 2s ease-in-out infinite;
  }
  
  /* Enhanced pulse */
  @keyframes enhanced-pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
  
  .animate-enhanced-pulse {
    animation: enhanced-pulse 2s ease-in-out infinite;
  }
}`;
}
function generateViteEnvDts() {
  return `/// <reference types="vite/client" />`;
}
function generateCartAnimation() {
  return "// CartAnimation.tsx source code";
}
function generateCastSection() {
  return "// CastSection.tsx source code";
}
function generateErrorMessage() {
  return "// ErrorMessage.tsx source code";
}
function generateHeader() {
  return "// Header.tsx source code";
}
function generateHeroCarousel() {
  return "// HeroCarousel.tsx source code";
}
function generateLoadingSpinner() {
  return "// LoadingSpinner.tsx source code";
}
function generateMovieCard() {
  return "// MovieCard.tsx source code";
}
function generateOptimizedImage() {
  return "// OptimizedImage.tsx source code";
}
function generateToast() {
  return "// Toast.tsx source code";
}
function generateVideoPlayer() {
  return "// VideoPlayer.tsx source code";
}
function generateHomePage() {
  return "// Home.tsx source code";
}
function generateMoviesPage() {
  return "// Movies.tsx source code";
}
function generateTVShowsPage() {
  return "// TVShows.tsx source code";
}
function generateAnimePage() {
  return "// Anime.tsx source code";
}
function generateSearchPage() {
  return "// Search.tsx source code";
}
function generateCartPage() {
  return "// Cart.tsx source code";
}
function generateMovieDetailPage() {
  return "// MovieDetail.tsx source code";
}
function generateTVDetailPage() {
  return "// TVDetail.tsx source code";
}
function generateAdminPanelPage() {
  return "// AdminPanel.tsx source code";
}
function generateApiService() {
  return "// api.ts source code";
}
function generateTmdbService() {
  return "// tmdb.ts source code";
}
function generateContentSyncService() {
  return "// contentSync.ts source code";
}
function generateContentFilterService() {
  return "// contentFilter.ts source code";
}
function generateWhatsappUtils() {
  return "// whatsapp.ts source code";
}
function generatePerformanceUtils() {
  return "// performance.ts source code";
}
function generateErrorHandlerUtils() {
  return "// errorHandler.ts source code";
}
function generateSystemExportUtils() {
  return "// systemExport.ts source code";
}
function generateSourceCodeGeneratorUtils() {
  return "// sourceCodeGenerator.ts source code";
}
function generateOptimizedContentHook() {
  return "// useOptimizedContent.ts source code";
}
function generatePerformanceHook() {
  return "// usePerformance.ts source code";
}
function generateContentSyncHook() {
  return "// useContentSync.ts source code";
}
function generateApiConfig() {
  return "// api.ts config source code";
}
function generateMovieTypes() {
  return "// movie.ts types source code";
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdXJjZUNvZGVHZW5lcmF0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJztcbmltcG9ydCB0eXBlIHsgU3lzdGVtQ29uZmlnIH0gZnJvbSAnLi4vY29udGV4dC9BZG1pbkNvbnRleHQnO1xuaW1wb3J0IHsgcmVhZFByb2plY3RGaWxlcywgaW5qZWN0Q29uZmlnSW50b0ZpbGUgfSBmcm9tICcuL2ZpbGVTeXN0ZW1SZWFkZXInO1xuXG4vLyBGdW5jacOzbiBwcmluY2lwYWwgcGFyYSBnZW5lcmFyIGVsIGPDs2RpZ28gZnVlbnRlIGNvbXBsZXRvIGNvbiBjb25maWd1cmFjacOzbiBlbWJlYmlkYVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlQ29tcGxldGVTb3VyY2VDb2RlKHN5c3RlbUNvbmZpZzogU3lzdGVtQ29uZmlnKTogUHJvbWlzZTx2b2lkPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgemlwID0gbmV3IEpTWmlwKCk7XG5cbiAgICAvLyBMZWVyIGFyY2hpdm9zIHJlYWxlcyBkZWwgcHJveWVjdG9cbiAgICBjb25zdCBwcm9qZWN0U3RydWN0dXJlID0gYXdhaXQgcmVhZFByb2plY3RGaWxlcygpO1xuXG4gICAgLy8gR2VuZXJhciB0b2RvcyBsb3MgYXJjaGl2b3MgZGVsIHNpc3RlbWEgY29uIGNvbmZpZ3VyYWNpw7NuIGVtYmViaWRhIHVzYW5kbyBhcmNoaXZvcyByZWFsZXNcbiAgICBhd2FpdCBnZW5lcmF0ZUFsbFNvdXJjZUZpbGVzRnJvbVJlYWwoemlwLCBzeXN0ZW1Db25maWcsIHByb2plY3RTdHJ1Y3R1cmUpO1xuXG4gICAgLy8gR2VuZXJhciB5IGRlc2NhcmdhciBlbCBaSVBcbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiAnYmxvYicgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChjb250ZW50KTtcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICBsaW5rLmRvd25sb2FkID0gYFRWX2FfbGFfQ2FydGFfU2lzdGVtYV9Db21wbGV0b18ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfS56aXBgO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgbGluay5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZ2VuZXJhdGluZyBjb21wbGV0ZSBzb3VyY2UgY29kZTonLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuLy8gRnVuY2nDs24gbWVqb3JhZGEgcXVlIHVzYSBhcmNoaXZvcyByZWFsZXMgZGVsIHByb3llY3RvXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUFsbFNvdXJjZUZpbGVzRnJvbVJlYWwoXG4gIHppcDogSlNaaXAsXG4gIHN5c3RlbUNvbmZpZzogU3lzdGVtQ29uZmlnLFxuICBwcm9qZWN0U3RydWN0dXJlOiBBd2FpdGVkPFJldHVyblR5cGU8dHlwZW9mIHJlYWRQcm9qZWN0RmlsZXM+PlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIFByb2Nlc2FyIGFyY2hpdm9zIGRlIGNvbmZpZ3VyYWNpw7NuXG4gIGZvciAoY29uc3QgZmlsZSBvZiBwcm9qZWN0U3RydWN0dXJlLmNvbmZpZ0ZpbGVzKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBmaWxlLmNvbnRlbnQ7XG5cbiAgICAvLyBJbnllY3RhciBjb25maWd1cmFjacOzbiBzaSBlcyBuZWNlc2FyaW9cbiAgICBpZiAoZmlsZS5wYXRoID09PSAncGFja2FnZS5qc29uJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgcGtnLnZlcnNpb24gPSBzeXN0ZW1Db25maWcudmVyc2lvbiB8fCAnMi4xLjAnO1xuICAgICAgICBwa2cuZGVzY3JpcHRpb24gPSBgU2lzdGVtYSBjb21wbGV0byBkZSBnZXN0acOzbiBwYXJhIFRWIGEgbGEgQ2FydGEgLSB2JHtwa2cudmVyc2lvbn1gO1xuICAgICAgICBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkocGtnLCBudWxsLCAyKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgdXBkYXRpbmcgcGFja2FnZS5qc29uOicsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB6aXAuZmlsZShmaWxlLnBhdGgsIGNvbnRlbnQpO1xuICB9XG5cbiAgLy8gUHJvY2VzYXIgYXJjaGl2b3MgcMO6YmxpY29zXG4gIGZvciAoY29uc3QgZmlsZSBvZiBwcm9qZWN0U3RydWN0dXJlLnB1YmxpY0ZpbGVzKSB7XG4gICAgemlwLmZpbGUoZmlsZS5wYXRoLCBmaWxlLmNvbnRlbnQpO1xuICB9XG5cbiAgLy8gUHJvY2VzYXIgYXJjaGl2b3MgZnVlbnRlIGNvbiBpbnllY2Npw7NuIGRlIGNvbmZpZ3VyYWNpw7NuXG4gIGZvciAoY29uc3QgZmlsZSBvZiBwcm9qZWN0U3RydWN0dXJlLnNvdXJjZUZpbGVzKSB7XG4gICAgY29uc3QgY29udGVudCA9IGluamVjdENvbmZpZ0ludG9GaWxlKGZpbGUuY29udGVudCwgc3lzdGVtQ29uZmlnLCBmaWxlLnBhdGgpO1xuICAgIHppcC5maWxlKGZpbGUucGF0aCwgY29udGVudCk7XG4gIH1cblxuICAvLyBBZ3JlZ2FyIGFyY2hpdm8gUkVBRE1FIGNvbiBpbmZvcm1hY2nDs24gZGUgY29uZmlndXJhY2nDs24gYWN0dWFsXG4gIHppcC5maWxlKCdSRUFETUUubWQnLCBnZW5lcmF0ZVJlYWRtZShzeXN0ZW1Db25maWcpKTtcblxuICAvLyBBZ3JlZ2FyIGFyY2hpdm8gZGUgY29uZmlndXJhY2nDs24gSlNPTiBwYXJhIHJlZmVyZW5jaWFcbiAgemlwLmZpbGUoJ2NvbmZpZy1iYWNrdXAuanNvbicsIEpTT04uc3RyaW5naWZ5KHtcbiAgICB2ZXJzaW9uOiBzeXN0ZW1Db25maWcudmVyc2lvbixcbiAgICBleHBvcnREYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgcHJpY2VzOiBzeXN0ZW1Db25maWcucHJpY2VzLFxuICAgIGRlbGl2ZXJ5Wm9uZXM6IHN5c3RlbUNvbmZpZy5kZWxpdmVyeVpvbmVzLFxuICAgIG5vdmVsczogc3lzdGVtQ29uZmlnLm5vdmVscyxcbiAgICBzZXR0aW5nczogc3lzdGVtQ29uZmlnLnNldHRpbmdzLFxuICAgIHN5bmNTdGF0dXM6IHN5c3RlbUNvbmZpZy5zeW5jU3RhdHVzXG4gIH0sIG51bGwsIDIpKTtcbn1cblxuLy8gRnVuY2nDs24gcGFyYSBnZW5lcmFyIHRvZG9zIGxvcyBhcmNoaXZvcyBkZWwgc2lzdGVtYVxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVBbGxTb3VyY2VGaWxlcyh6aXA6IEpTWmlwLCBzeXN0ZW1Db25maWc6IFN5c3RlbUNvbmZpZyk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBBcmNoaXZvcyBkZSBjb25maWd1cmFjacOzbiBkZWwgcHJveWVjdG9cbiAgemlwLmZpbGUoJ3BhY2thZ2UuanNvbicsIGdlbmVyYXRlUGFja2FnZUpzb24oKSk7XG4gIHppcC5maWxlKCd2aXRlLmNvbmZpZy50cycsIGdlbmVyYXRlVml0ZUNvbmZpZygpKTtcbiAgemlwLmZpbGUoJ3RhaWx3aW5kLmNvbmZpZy5qcycsIGdlbmVyYXRlVGFpbHdpbmRDb25maWcoKSk7XG4gIHppcC5maWxlKCd0c2NvbmZpZy5qc29uJywgZ2VuZXJhdGVUc0NvbmZpZygpKTtcbiAgemlwLmZpbGUoJ3RzY29uZmlnLmFwcC5qc29uJywgZ2VuZXJhdGVUc0NvbmZpZ0FwcCgpKTtcbiAgemlwLmZpbGUoJ3RzY29uZmlnLm5vZGUuanNvbicsIGdlbmVyYXRlVHNDb25maWdOb2RlKCkpO1xuICB6aXAuZmlsZSgncG9zdGNzcy5jb25maWcuanMnLCBnZW5lcmF0ZVBvc3Rjc3NDb25maWcoKSk7XG4gIHppcC5maWxlKCdlc2xpbnQuY29uZmlnLmpzJywgZ2VuZXJhdGVFc2xpbnRDb25maWcoKSk7XG4gIHppcC5maWxlKCdpbmRleC5odG1sJywgZ2VuZXJhdGVJbmRleEh0bWwoKSk7XG4gIHppcC5maWxlKCd2ZXJjZWwuanNvbicsIGdlbmVyYXRlVmVyY2VsQ29uZmlnKCkpO1xuICB6aXAuZmlsZSgnUkVBRE1FLm1kJywgZ2VuZXJhdGVSZWFkbWUoc3lzdGVtQ29uZmlnKSk7XG4gIFxuICAvLyBBcmNoaXZvcyBww7pibGljb3NcbiAgY29uc3QgcHVibGljRm9sZGVyID0gemlwLmZvbGRlcigncHVibGljJyk7XG4gIGlmIChwdWJsaWNGb2xkZXIpIHtcbiAgICBwdWJsaWNGb2xkZXIuZmlsZSgnX3JlZGlyZWN0cycsIGdlbmVyYXRlTmV0bGlmeVJlZGlyZWN0cygpKTtcbiAgfVxuICBcbiAgLy8gQXJjaGl2b3MgZnVlbnRlIHByaW5jaXBhbGVzXG4gIGNvbnN0IHNyY0ZvbGRlciA9IHppcC5mb2xkZXIoJ3NyYycpO1xuICBpZiAoc3JjRm9sZGVyKSB7XG4gICAgc3JjRm9sZGVyLmZpbGUoJ21haW4udHN4JywgZ2VuZXJhdGVNYWluVHN4KCkpO1xuICAgIHNyY0ZvbGRlci5maWxlKCdBcHAudHN4JywgZ2VuZXJhdGVBcHBUc3goKSk7XG4gICAgc3JjRm9sZGVyLmZpbGUoJ2luZGV4LmNzcycsIGdlbmVyYXRlSW5kZXhDc3MoKSk7XG4gICAgc3JjRm9sZGVyLmZpbGUoJ3ZpdGUtZW52LmQudHMnLCBnZW5lcmF0ZVZpdGVFbnZEdHMoKSk7XG4gICAgXG4gICAgLy8gQ29tcG9uZW50ZXMgY29uIGNvbmZpZ3VyYWNpw7NuIGVtYmViaWRhXG4gICAgY29uc3QgY29tcG9uZW50c0ZvbGRlciA9IHNyY0ZvbGRlci5mb2xkZXIoJ2NvbXBvbmVudHMnKTtcbiAgICBpZiAoY29tcG9uZW50c0ZvbGRlcikge1xuICAgICAgY29tcG9uZW50c0ZvbGRlci5maWxlKCdDaGVja291dE1vZGFsLnRzeCcsIGdlbmVyYXRlQ2hlY2tvdXRNb2RhbFdpdGhFbWJlZGRlZENvbmZpZyhzeXN0ZW1Db25maWcpKTtcbiAgICAgIGNvbXBvbmVudHNGb2xkZXIuZmlsZSgnTm92ZWxhc01vZGFsLnRzeCcsIGdlbmVyYXRlTm92ZWxhc01vZGFsV2l0aEVtYmVkZGVkQ29uZmlnKHN5c3RlbUNvbmZpZykpO1xuICAgICAgY29tcG9uZW50c0ZvbGRlci5maWxlKCdQcmljZUNhcmQudHN4JywgZ2VuZXJhdGVQcmljZUNhcmRXaXRoRW1iZWRkZWRDb25maWcoc3lzdGVtQ29uZmlnKSk7XG4gICAgICBjb21wb25lbnRzRm9sZGVyLmZpbGUoJ0NhcnRBbmltYXRpb24udHN4JywgZ2VuZXJhdGVDYXJ0QW5pbWF0aW9uKCkpO1xuICAgICAgY29tcG9uZW50c0ZvbGRlci5maWxlKCdDYXN0U2VjdGlvbi50c3gnLCBnZW5lcmF0ZUNhc3RTZWN0aW9uKCkpO1xuICAgICAgY29tcG9uZW50c0ZvbGRlci5maWxlKCdFcnJvck1lc3NhZ2UudHN4JywgZ2VuZXJhdGVFcnJvck1lc3NhZ2UoKSk7XG4gICAgICBjb21wb25lbnRzRm9sZGVyLmZpbGUoJ0hlYWRlci50c3gnLCBnZW5lcmF0ZUhlYWRlcigpKTtcbiAgICAgIGNvbXBvbmVudHNGb2xkZXIuZmlsZSgnSGVyb0Nhcm91c2VsLnRzeCcsIGdlbmVyYXRlSGVyb0Nhcm91c2VsKCkpO1xuICAgICAgY29tcG9uZW50c0ZvbGRlci5maWxlKCdMb2FkaW5nU3Bpbm5lci50c3gnLCBnZW5lcmF0ZUxvYWRpbmdTcGlubmVyKCkpO1xuICAgICAgY29tcG9uZW50c0ZvbGRlci5maWxlKCdNb3ZpZUNhcmQudHN4JywgZ2VuZXJhdGVNb3ZpZUNhcmQoKSk7XG4gICAgICBjb21wb25lbnRzRm9sZGVyLmZpbGUoJ09wdGltaXplZEltYWdlLnRzeCcsIGdlbmVyYXRlT3B0aW1pemVkSW1hZ2UoKSk7XG4gICAgICBjb21wb25lbnRzRm9sZGVyLmZpbGUoJ1RvYXN0LnRzeCcsIGdlbmVyYXRlVG9hc3QoKSk7XG4gICAgICBjb21wb25lbnRzRm9sZGVyLmZpbGUoJ1ZpZGVvUGxheWVyLnRzeCcsIGdlbmVyYXRlVmlkZW9QbGF5ZXIoKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIENvbnRleHRvcyBjb24gY29uZmlndXJhY2nDs24gZW1iZWJpZGFcbiAgICBjb25zdCBjb250ZXh0Rm9sZGVyID0gc3JjRm9sZGVyLmZvbGRlcignY29udGV4dCcpO1xuICAgIGlmIChjb250ZXh0Rm9sZGVyKSB7XG4gICAgICBjb250ZXh0Rm9sZGVyLmZpbGUoJ0FkbWluQ29udGV4dC50c3gnLCBnZW5lcmF0ZUFkbWluQ29udGV4dFdpdGhFbWJlZGRlZENvbmZpZyhzeXN0ZW1Db25maWcpKTtcbiAgICAgIGNvbnRleHRGb2xkZXIuZmlsZSgnQ2FydENvbnRleHQudHN4JywgZ2VuZXJhdGVDYXJ0Q29udGV4dFdpdGhFbWJlZGRlZENvbmZpZyhzeXN0ZW1Db25maWcpKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUMOhZ2luYXNcbiAgICBjb25zdCBwYWdlc0ZvbGRlciA9IHNyY0ZvbGRlci5mb2xkZXIoJ3BhZ2VzJyk7XG4gICAgaWYgKHBhZ2VzRm9sZGVyKSB7XG4gICAgICBwYWdlc0ZvbGRlci5maWxlKCdIb21lLnRzeCcsIGdlbmVyYXRlSG9tZVBhZ2UoKSk7XG4gICAgICBwYWdlc0ZvbGRlci5maWxlKCdNb3ZpZXMudHN4JywgZ2VuZXJhdGVNb3ZpZXNQYWdlKCkpO1xuICAgICAgcGFnZXNGb2xkZXIuZmlsZSgnVFZTaG93cy50c3gnLCBnZW5lcmF0ZVRWU2hvd3NQYWdlKCkpO1xuICAgICAgcGFnZXNGb2xkZXIuZmlsZSgnQW5pbWUudHN4JywgZ2VuZXJhdGVBbmltZVBhZ2UoKSk7XG4gICAgICBwYWdlc0ZvbGRlci5maWxlKCdTZWFyY2gudHN4JywgZ2VuZXJhdGVTZWFyY2hQYWdlKCkpO1xuICAgICAgcGFnZXNGb2xkZXIuZmlsZSgnQ2FydC50c3gnLCBnZW5lcmF0ZUNhcnRQYWdlKCkpO1xuICAgICAgcGFnZXNGb2xkZXIuZmlsZSgnTW92aWVEZXRhaWwudHN4JywgZ2VuZXJhdGVNb3ZpZURldGFpbFBhZ2UoKSk7XG4gICAgICBwYWdlc0ZvbGRlci5maWxlKCdUVkRldGFpbC50c3gnLCBnZW5lcmF0ZVRWRGV0YWlsUGFnZSgpKTtcbiAgICAgIHBhZ2VzRm9sZGVyLmZpbGUoJ0FkbWluUGFuZWwudHN4JywgZ2VuZXJhdGVBZG1pblBhbmVsUGFnZSgpKTtcbiAgICB9XG4gICAgXG4gICAgLy8gU2VydmljaW9zXG4gICAgY29uc3Qgc2VydmljZXNGb2xkZXIgPSBzcmNGb2xkZXIuZm9sZGVyKCdzZXJ2aWNlcycpO1xuICAgIGlmIChzZXJ2aWNlc0ZvbGRlcikge1xuICAgICAgc2VydmljZXNGb2xkZXIuZmlsZSgnYXBpLnRzJywgZ2VuZXJhdGVBcGlTZXJ2aWNlKCkpO1xuICAgICAgc2VydmljZXNGb2xkZXIuZmlsZSgndG1kYi50cycsIGdlbmVyYXRlVG1kYlNlcnZpY2UoKSk7XG4gICAgICBzZXJ2aWNlc0ZvbGRlci5maWxlKCdjb250ZW50U3luYy50cycsIGdlbmVyYXRlQ29udGVudFN5bmNTZXJ2aWNlKCkpO1xuICAgICAgc2VydmljZXNGb2xkZXIuZmlsZSgnY29udGVudEZpbHRlci50cycsIGdlbmVyYXRlQ29udGVudEZpbHRlclNlcnZpY2UoKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIFV0aWxpZGFkZXNcbiAgICBjb25zdCB1dGlsc0ZvbGRlciA9IHNyY0ZvbGRlci5mb2xkZXIoJ3V0aWxzJyk7XG4gICAgaWYgKHV0aWxzRm9sZGVyKSB7XG4gICAgICB1dGlsc0ZvbGRlci5maWxlKCd3aGF0c2FwcC50cycsIGdlbmVyYXRlV2hhdHNhcHBVdGlscygpKTtcbiAgICAgIHV0aWxzRm9sZGVyLmZpbGUoJ3BlcmZvcm1hbmNlLnRzJywgZ2VuZXJhdGVQZXJmb3JtYW5jZVV0aWxzKCkpO1xuICAgICAgdXRpbHNGb2xkZXIuZmlsZSgnZXJyb3JIYW5kbGVyLnRzJywgZ2VuZXJhdGVFcnJvckhhbmRsZXJVdGlscygpKTtcbiAgICAgIHV0aWxzRm9sZGVyLmZpbGUoJ3N5c3RlbUV4cG9ydC50cycsIGdlbmVyYXRlU3lzdGVtRXhwb3J0VXRpbHMoKSk7XG4gICAgICB1dGlsc0ZvbGRlci5maWxlKCdzb3VyY2VDb2RlR2VuZXJhdG9yLnRzJywgZ2VuZXJhdGVTb3VyY2VDb2RlR2VuZXJhdG9yVXRpbHMoKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIEhvb2tzXG4gICAgY29uc3QgaG9va3NGb2xkZXIgPSBzcmNGb2xkZXIuZm9sZGVyKCdob29rcycpO1xuICAgIGlmIChob29rc0ZvbGRlcikge1xuICAgICAgaG9va3NGb2xkZXIuZmlsZSgndXNlT3B0aW1pemVkQ29udGVudC50cycsIGdlbmVyYXRlT3B0aW1pemVkQ29udGVudEhvb2soKSk7XG4gICAgICBob29rc0ZvbGRlci5maWxlKCd1c2VQZXJmb3JtYW5jZS50cycsIGdlbmVyYXRlUGVyZm9ybWFuY2VIb29rKCkpO1xuICAgICAgaG9va3NGb2xkZXIuZmlsZSgndXNlQ29udGVudFN5bmMudHMnLCBnZW5lcmF0ZUNvbnRlbnRTeW5jSG9vaygpKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQ29uZmlndXJhY2nDs25cbiAgICBjb25zdCBjb25maWdGb2xkZXIgPSBzcmNGb2xkZXIuZm9sZGVyKCdjb25maWcnKTtcbiAgICBpZiAoY29uZmlnRm9sZGVyKSB7XG4gICAgICBjb25maWdGb2xkZXIuZmlsZSgnYXBpLnRzJywgZ2VuZXJhdGVBcGlDb25maWcoKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIFRpcG9zXG4gICAgY29uc3QgdHlwZXNGb2xkZXIgPSBzcmNGb2xkZXIuZm9sZGVyKCd0eXBlcycpO1xuICAgIGlmICh0eXBlc0ZvbGRlcikge1xuICAgICAgdHlwZXNGb2xkZXIuZmlsZSgnbW92aWUudHMnLCBnZW5lcmF0ZU1vdmllVHlwZXMoKSk7XG4gICAgfVxuICB9XG59XG5cbi8vIEZ1bmNpb25lcyBwYXJhIGdlbmVyYXIgYXJjaGl2b3MgZXNwZWPDrWZpY29zIGNvbiBjb25maWd1cmFjacOzbiBlbWJlYmlkYVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNoZWNrb3V0TW9kYWxXaXRoRW1iZWRkZWRDb25maWcoc3lzdGVtQ29uZmlnOiBTeXN0ZW1Db25maWcpOiBzdHJpbmcge1xuICBjb25zdCBkZWxpdmVyeVpvbmVzID0gSlNPTi5zdHJpbmdpZnkoc3lzdGVtQ29uZmlnLmRlbGl2ZXJ5Wm9uZXMsIG51bGwsIDIpO1xuICBjb25zdCBwcmljZXMgPSBKU09OLnN0cmluZ2lmeShzeXN0ZW1Db25maWcucHJpY2VzLCBudWxsLCAyKTtcbiAgXG4gIHJldHVybiBgaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBYLCBNYXBQaW4sIFVzZXIsIFBob25lLCBIb21lLCBDcmVkaXRDYXJkLCBEb2xsYXJTaWduLCBNZXNzYWdlQ2lyY2xlLCBDYWxjdWxhdG9yLCBUcnVjaywgRXh0ZXJuYWxMaW5rIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuLy8gWk9OQVMgREUgRU5UUkVHQSBFTUJFQklEQVMgLSBHZW5lcmFkYXMgYXV0b23DoXRpY2FtZW50ZVxuY29uc3QgRU1CRURERURfREVMSVZFUllfWk9ORVMgPSAke2RlbGl2ZXJ5Wm9uZXN9O1xuXG4vLyBQUkVDSU9TIEVNQkVCSURPU1xuY29uc3QgRU1CRURERURfUFJJQ0VTID0gJHtwcmljZXN9O1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbWVySW5mbyB7XG4gIGZ1bGxOYW1lOiBzdHJpbmc7XG4gIHBob25lOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcmRlckRhdGEge1xuICBvcmRlcklkOiBzdHJpbmc7XG4gIGN1c3RvbWVySW5mbzogQ3VzdG9tZXJJbmZvO1xuICBkZWxpdmVyeVpvbmU6IHN0cmluZztcbiAgZGVsaXZlcnlDb3N0OiBudW1iZXI7XG4gIGl0ZW1zOiBhbnlbXTtcbiAgc3VidG90YWw6IG51bWJlcjtcbiAgdHJhbnNmZXJGZWU6IG51bWJlcjtcbiAgdG90YWw6IG51bWJlcjtcbiAgY2FzaFRvdGFsPzogbnVtYmVyO1xuICB0cmFuc2ZlclRvdGFsPzogbnVtYmVyO1xuICBwaWNrdXBMb2NhdGlvbj86IGJvb2xlYW47XG4gIHNob3dMb2NhdGlvbk1hcD86IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBDaGVja291dE1vZGFsUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uQ2hlY2tvdXQ6IChvcmRlckRhdGE6IE9yZGVyRGF0YSkgPT4gdm9pZDtcbiAgaXRlbXM6IEFycmF5PHtcbiAgICBpZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgcHJpY2U6IG51bWJlcjtcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICB9PjtcbiAgdG90YWw6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENoZWNrb3V0TW9kYWwoeyBpc09wZW4sIG9uQ2xvc2UsIG9uQ2hlY2tvdXQsIGl0ZW1zLCB0b3RhbCB9OiBDaGVja291dE1vZGFsUHJvcHMpIHtcbiAgY29uc3QgW2N1c3RvbWVySW5mbywgc2V0Q3VzdG9tZXJJbmZvXSA9IHVzZVN0YXRlPEN1c3RvbWVySW5mbz4oe1xuICAgIGZ1bGxOYW1lOiAnJyxcbiAgICBwaG9uZTogJycsXG4gICAgYWRkcmVzczogJydcbiAgfSk7XG4gIGNvbnN0IFtzZWxlY3RlZFpvbmUsIHNldFNlbGVjdGVkWm9uZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtkZWxpdmVyeUNvc3QsIHNldERlbGl2ZXJ5Q29zdF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3BpY2t1cExvY2F0aW9uLCBzZXRQaWNrdXBMb2NhdGlvbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaG93TG9jYXRpb25NYXAsIHNldFNob3dMb2NhdGlvbk1hcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvcnMsIHNldEVycm9yc10gPSB1c2VTdGF0ZTxQYXJ0aWFsPEN1c3RvbWVySW5mbz4+KHt9KTtcblxuICAvLyBVc2UgZW1iZWRkZWQgZGVsaXZlcnkgem9uZXNcbiAgY29uc3QgZGVsaXZlcnlab25lcyA9IEVNQkVEREVEX0RFTElWRVJZX1pPTkVTO1xuXG4gIC8vIEFncmVnYXIgb3BjacOzbiBkZSByZWNvZ2lkYSBlbiBlbCBsb2NhbFxuICBjb25zdCBwaWNrdXBPcHRpb24gPSB7XG4gICAgaWQ6ICdwaWNrdXAnLFxuICAgIG5hbWU6ICdSZWNvZ2lkYSBlbiBUViBhIGxhIENhcnRhJyxcbiAgICBjb3N0OiAwXG4gIH07XG5cbiAgY29uc3QgYWxsRGVsaXZlcnlPcHRpb25zID0gW3BpY2t1cE9wdGlvbiwgLi4uZGVsaXZlcnlab25lc107XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2VsZWN0ZWRab25lID09PSAncGlja3VwJykge1xuICAgICAgc2V0RGVsaXZlcnlDb3N0KDApO1xuICAgICAgc2V0UGlja3VwTG9jYXRpb24odHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZFpvbmUpIHtcbiAgICAgIGNvbnN0IHpvbmUgPSBkZWxpdmVyeVpvbmVzLmZpbmQoeiA9PiB6Lm5hbWUgPT09IHNlbGVjdGVkWm9uZSk7XG4gICAgICBzZXREZWxpdmVyeUNvc3Qoem9uZSA/IHpvbmUuY29zdCA6IDApO1xuICAgICAgc2V0UGlja3VwTG9jYXRpb24oZmFsc2UpO1xuICAgIH1cbiAgfSwgW3NlbGVjdGVkWm9uZSwgZGVsaXZlcnlab25lc10pO1xuXG4gIGNvbnN0IHZhbGlkYXRlRm9ybSA9ICgpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBuZXdFcnJvcnM6IFBhcnRpYWw8Q3VzdG9tZXJJbmZvPiA9IHt9O1xuXG4gICAgaWYgKCFjdXN0b21lckluZm8uZnVsbE5hbWUudHJpbSgpKSB7XG4gICAgICBuZXdFcnJvcnMuZnVsbE5hbWUgPSAnRWwgbm9tYnJlIGNvbXBsZXRvIGVzIHJlcXVlcmlkbyc7XG4gICAgfVxuXG4gICAgaWYgKCFjdXN0b21lckluZm8ucGhvbmUudHJpbSgpKSB7XG4gICAgICBuZXdFcnJvcnMucGhvbmUgPSAnRWwgdGVsw6lmb25vIGVzIHJlcXVlcmlkbyc7XG4gICAgfSBlbHNlIGlmICghL15bK10/WzAtOVxcXFxzXFxcXC0oKV17OCx9JC8udGVzdChjdXN0b21lckluZm8ucGhvbmUpKSB7XG4gICAgICBuZXdFcnJvcnMucGhvbmUgPSAnRm9ybWF0byBkZSB0ZWzDqWZvbm8gaW52w6FsaWRvJztcbiAgICB9XG5cbiAgICBpZiAoIXBpY2t1cExvY2F0aW9uICYmICFjdXN0b21lckluZm8uYWRkcmVzcy50cmltKCkpIHtcbiAgICAgIG5ld0Vycm9ycy5hZGRyZXNzID0gJ0xhIGRpcmVjY2nDs24gZXMgcmVxdWVyaWRhIHBhcmEgZW50cmVnYSBhIGRvbWljaWxpbyc7XG4gICAgfVxuXG4gICAgc2V0RXJyb3JzKG5ld0Vycm9ycyk7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld0Vycm9ycykubGVuZ3RoID09PSAwO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgaWYgKCF2YWxpZGF0ZUZvcm0oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghc2VsZWN0ZWRab25lKSB7XG4gICAgICBhbGVydCgnUG9yIGZhdm9yIHNlbGVjY2lvbmEgdW5hIG9wY2nDs24gZGUgZW50cmVnYScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9yZGVySWQgPSBcXGBUVi1cXCR7RGF0ZS5ub3coKX1cXGA7XG4gICAgY29uc3Qgb3JkZXJEYXRhOiBPcmRlckRhdGEgPSB7XG4gICAgICBvcmRlcklkLFxuICAgICAgY3VzdG9tZXJJbmZvLFxuICAgICAgZGVsaXZlcnlab25lOiBzZWxlY3RlZFpvbmUsXG4gICAgICBkZWxpdmVyeUNvc3QsXG4gICAgICBpdGVtcyxcbiAgICAgIHN1YnRvdGFsOiB0b3RhbCxcbiAgICAgIHRyYW5zZmVyRmVlOiAwLFxuICAgICAgdG90YWw6IHRvdGFsICsgZGVsaXZlcnlDb3N0LFxuICAgICAgcGlja3VwTG9jYXRpb24sXG4gICAgICBzaG93TG9jYXRpb25NYXBcbiAgICB9O1xuXG4gICAgb25DaGVja291dChvcmRlckRhdGEpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGZpZWxkOiBrZXlvZiBDdXN0b21lckluZm8sIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBzZXRDdXN0b21lckluZm8ocHJldiA9PiAoeyAuLi5wcmV2LCBbZmllbGRdOiB2YWx1ZSB9KSk7XG4gICAgaWYgKGVycm9yc1tmaWVsZF0pIHtcbiAgICAgIHNldEVycm9ycyhwcmV2ID0+ICh7IC4uLnByZXYsIFtmaWVsZF06IHVuZGVmaW5lZCB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG9wZW5Mb2NhdGlvbk1hcCA9ICgpID0+IHtcbiAgICBjb25zdCBtYXBVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3BsYWNlLzIwJUMyJUIwMDJcXFxcJzIyLjUlMjJOKzc1JUMyJUIwNTBcXFxcJzU4LjglMjJXL0AyMC4wMzk0NjA0LC03NS44NDk1NDE0LDE4MG0vZGF0YT0hM20xITFlMyE0bTQhM20zIThtMiEzZDIwLjAzOTU4NSE0ZC03NS44NDk2NjM/ZW50cnk9dHR1JmdfZXA9RWdveU1ESTFNRGN6TUM0d0lLWE1EU29BU0FGUUF3JTNEJTNEJztcbiAgICB3aW5kb3cub3BlbihtYXBVcmwsICdfYmxhbmsnLCAnbm9vcGVuZXIsbm9yZWZlcnJlcicpO1xuICB9O1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjay81MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgei01MFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCB3LWZ1bGwgbWF4LXctMnhsIG1heC1oLVs5MHZoXSBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4bFwiPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTYwMCB0by1wdXJwbGUtNjAwIHAtNiB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS8yMCBwLTMgcm91bmRlZC14bCBtci00XCI+XG4gICAgICAgICAgICAgICAgPE1lc3NhZ2VDaXJjbGUgY2xhc3NOYW1lPVwiaC02IHctNlwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGRcIj5GaW5hbGl6YXIgUGVkaWRvPC9oMj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtMTAwXCI+Q29tcGxldGEgdHVzIGRhdG9zIHBhcmEgcHJvY2VkZXI8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiBob3ZlcjpiZy13aGl0ZS8yMCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJoLTYgdy02XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LXktYXV0byBtYXgtaC1bY2FsYyg5MHZoLTEyMHB4KV1cIj5cbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBjbGFzc05hbWU9XCJwLTYgc3BhY2UteS02XCI+XG4gICAgICAgICAgICB7LyogQ3VzdG9tZXIgSW5mb3JtYXRpb24gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktNTAgcm91bmRlZC14bCBwLTZcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTQgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8VXNlciBjbGFzc05hbWU9XCJoLTUgdy01IG1yLTIgdGV4dC1ibHVlLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgSW5mb3JtYWNpw7NuIFBlcnNvbmFsXG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgTm9tYnJlIENvbXBsZXRvICpcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VzdG9tZXJJbmZvLmZ1bGxOYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUlucHV0Q2hhbmdlKCdmdWxsTmFtZScsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcXGB3LWZ1bGwgcHgtNCBweS0zIGJvcmRlciByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBcXCR7XG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLmZ1bGxOYW1lID8gJ2JvcmRlci1yZWQtNTAwJyA6ICdib3JkZXItZ3JheS0zMDAnXG4gICAgICAgICAgICAgICAgICAgIH1cXGB9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSW5ncmVzYSB0dSBub21icmUgY29tcGxldG9cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHtlcnJvcnMuZnVsbE5hbWUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDAgdGV4dC1zbSBtdC0xXCI+e2Vycm9ycy5mdWxsTmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICBUZWzDqWZvbm8gKlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGVsXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1c3RvbWVySW5mby5waG9uZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJbnB1dENoYW5nZSgncGhvbmUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XFxgdy1mdWxsIHB4LTQgcHktMyBib3JkZXIgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgXFwke1xuICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5waG9uZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnYm9yZGVyLWdyYXktMzAwJ1xuICAgICAgICAgICAgICAgICAgICB9XFxgfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIis1MyA1NDY5IDA4NzhcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHtlcnJvcnMucGhvbmUgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDAgdGV4dC1zbSBtdC0xXCI+e2Vycm9ycy5waG9uZX08L3A+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgeyFwaWNrdXBMb2NhdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICBEaXJlY2Npw7NuIENvbXBsZXRhICpcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1c3RvbWVySW5mby5hZGRyZXNzfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlSW5wdXRDaGFuZ2UoJ2FkZHJlc3MnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xcYHctZnVsbCBweC00IHB5LTMgYm9yZGVyIHJvdW5kZWQtbGcgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIHJlc2l6ZS1ub25lIFxcJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycy5hZGRyZXNzID8gJ2JvcmRlci1yZWQtNTAwJyA6ICdib3JkZXItZ3JheS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgfVxcYH1cbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNhbGxlLCBuw7ptZXJvLCBlbnRyZSBjYWxsZXMsIHJlZmVyZW5jaWFzLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAge2Vycm9ycy5hZGRyZXNzICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC01MDAgdGV4dC1zbSBtdC0xXCI+e2Vycm9ycy5hZGRyZXNzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBEZWxpdmVyeSBPcHRpb25zICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIHJvdW5kZWQteGwgcC02XCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00IGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPE1hcFBpbiBjbGFzc05hbWU9XCJoLTUgdy01IG1yLTIgdGV4dC1ncmVlbi02MDBcIiAvPlxuICAgICAgICAgICAgICAgIE9wY2lvbmVzIGRlIEVudHJlZ2FcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAge2FsbERlbGl2ZXJ5T3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgIGtleT17b3B0aW9uLmlkIHx8IG9wdGlvbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xcYGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTQgYm9yZGVyIHJvdW5kZWQtbGcgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnMgXFwke1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkWm9uZSA9PT0gKG9wdGlvbi5pZCA9PT0gJ3BpY2t1cCcgPyAncGlja3VwJyA6IG9wdGlvbi5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWdyZWVuLTUwMCBiZy1ncmVlbi01MCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1ncmF5LTMwMCBob3Zlcjpib3JkZXItZ3JlZW4tMzAwJ1xuICAgICAgICAgICAgICAgICAgICB9XFxgfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImRlbGl2ZXJ5T3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtvcHRpb24uaWQgPT09ICdwaWNrdXAnID8gJ3BpY2t1cCcgOiBvcHRpb24ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkWm9uZSA9PT0gKG9wdGlvbi5pZCA9PT0gJ3BpY2t1cCcgPyAncGlja3VwJyA6IG9wdGlvbi5uYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRab25lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1yLTMgaC00IHctNCB0ZXh0LWdyZWVuLTYwMCBmb2N1czpyaW5nLWdyZWVuLTUwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMFwiPntvcHRpb24ubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLmlkID09PSAncGlja3VwJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPlJlcGFydG8gTnVldm8gVmlzdGEgQWxlZ3JlLCBTYW50aWFnbyBkZSBDdWJhPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17XFxgZm9udC1zZW1pYm9sZCBcXCR7b3B0aW9uLmNvc3QgPT09IDAgPyAndGV4dC1ncmVlbi02MDAnIDogJ3RleHQtZ3JlZW4tNjAwJ31cXGB9PlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5jb3N0ID09PSAwID8gJ0dSQVRJUycgOiBcXGAkXFwke29wdGlvbi5jb3N0LnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcYH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIExvY2F0aW9uIE1hcCBPcHRpb24gKi99XG4gICAgICAgICAgICAgIHtwaWNrdXBMb2NhdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHAtNCBiZy1ibHVlLTUwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1ibHVlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1ibHVlLTkwMFwiPlViaWNhY2nDs24gZGVsIExvY2FsPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtYmx1ZS03MDBcIj5WZXIgdWJpY2FjacOzbiBlbiBHb29nbGUgTWFwcyAob3BjaW9uYWwpPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtzaG93TG9jYXRpb25NYXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2hvd0xvY2F0aW9uTWFwKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtci0yIGgtNCB3LTQgdGV4dC1ibHVlLTYwMCBmb2N1czpyaW5nLWJsdWUtNTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtYmx1ZS03MDBcIj5JbmNsdWlyIHViaWNhY2nDs248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5Mb2NhdGlvbk1hcH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWJsdWUtNTAwIGhvdmVyOmJnLWJsdWUtNjAwIHRleHQtd2hpdGUgcHgtMyBweS0yIHJvdW5kZWQtbGcgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEV4dGVybmFsTGluayBjbGFzc05hbWU9XCJoLTQgdy00IG1yLTFcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgVmVyIE1hcGFcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7YWxsRGVsaXZlcnlPcHRpb25zLmxlbmd0aCA9PT0gMSAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS04XCI+XG4gICAgICAgICAgICAgICAgICA8VHJ1Y2sgY2xhc3NOYW1lPVwiaC0xMiB3LTEyIHRleHQtZ3JheS00MDAgbXgtYXV0byBtYi00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIFNvbG8gZGlzcG9uaWJsZSByZWNvZ2lkYSBlbiBlbCBsb2NhbFxuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgQ29udGFjdGEgY29uIGVsIGFkbWluaXN0cmFkb3IgcGFyYSBjb25maWd1cmFyIHpvbmFzIGRlIGVudHJlZ2EgYWRpY2lvbmFsZXMuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE9yZGVyIFN1bW1hcnkgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibHVlLTUwIHRvLXB1cnBsZS01MCByb3VuZGVkLXhsIHAtNiBib3JkZXIgYm9yZGVyLWJsdWUtMjAwXCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi00IGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPENhbGN1bGF0b3IgY2xhc3NOYW1lPVwiaC01IHctNSBtci0yIHRleHQtYmx1ZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgIFJlc3VtZW4gZGVsIFBlZGlkb1xuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPlN1YnRvdGFsICh7aXRlbXMubGVuZ3RofSBlbGVtZW50b3MpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPiRcXCR7dG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZFpvbmUgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtwaWNrdXBMb2NhdGlvbiA/ICdSZWNvZ2lkYSBlbiBsb2NhbCcgOiAnRW50cmVnYSd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtcXGBmb250LXNlbWlib2xkIFxcJHtkZWxpdmVyeUNvc3QgPT09IDAgPyAndGV4dC1ncmVlbi02MDAnIDogJyd9XFxgfT5cbiAgICAgICAgICAgICAgICAgICAgICB7ZGVsaXZlcnlDb3N0ID09PSAwID8gJ0dSQVRJUycgOiBcXGAkXFwke2RlbGl2ZXJ5Q29zdC50b0xvY2FsZVN0cmluZygpfSBDVVBcXGB9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItdCBib3JkZXItZ3JheS0zMDAgcHQtM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPlRvdGFsPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWJsdWUtNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgJFxcJHsodG90YWwgKyBkZWxpdmVyeUNvc3QpLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFN1Ym1pdCBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17IXNlbGVjdGVkWm9uZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdG8tZ3JlZW4tNjAwIGhvdmVyOmZyb20tZ3JlZW4tNjAwIGhvdmVyOnRvLWdyZWVuLTcwMCBkaXNhYmxlZDpmcm9tLWdyYXktNDAwIGRpc2FibGVkOnRvLWdyYXktNTAwIHRleHQtd2hpdGUgcHgtNiBweS00IHJvdW5kZWQteGwgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE1lc3NhZ2VDaXJjbGUgY2xhc3NOYW1lPVwiaC01IHctNSBtci0yXCIgLz5cbiAgICAgICAgICAgICAgRW52aWFyIFBlZGlkbyBwb3IgV2hhdHNBcHBcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgICAgICAgIEFsIGVudmlhciBlbCBwZWRpZG8gc2Vyw6FzIHJlZGlyaWdpZG8gYSBXaGF0c0FwcCBwYXJhIGNvbXBsZXRhciBsYSB0cmFuc2FjY2nDs25cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufWA7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTm92ZWxhc01vZGFsV2l0aEVtYmVkZGVkQ29uZmlnKHN5c3RlbUNvbmZpZzogU3lzdGVtQ29uZmlnKTogc3RyaW5nIHtcbiAgY29uc3Qgbm92ZWxzID0gSlNPTi5zdHJpbmdpZnkoc3lzdGVtQ29uZmlnLm5vdmVscywgbnVsbCwgMik7XG4gIGNvbnN0IHByaWNlcyA9IEpTT04uc3RyaW5naWZ5KHN5c3RlbUNvbmZpZy5wcmljZXMsIG51bGwsIDIpO1xuICBcbiAgcmV0dXJuIGBpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFgsIERvd25sb2FkLCBNZXNzYWdlQ2lyY2xlLCBQaG9uZSwgQm9va09wZW4sIEluZm8sIENoZWNrLCBEb2xsYXJTaWduLCBDcmVkaXRDYXJkLCBDYWxjdWxhdG9yLCBTZWFyY2gsIEZpbHRlciwgU29ydEFzYywgU29ydERlc2MsIFNtYXJ0cGhvbmUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG4vLyBDQVTDgUxPR08gREUgTk9WRUxBUyBFTUJFQklETyAtIEdlbmVyYWRvIGF1dG9tw6F0aWNhbWVudGVcbmNvbnN0IEVNQkVEREVEX05PVkVMUyA9ICR7bm92ZWxzfTtcblxuLy8gUFJFQ0lPUyBFTUJFQklET1NcbmNvbnN0IEVNQkVEREVEX1BSSUNFUyA9ICR7cHJpY2VzfTtcblxuaW50ZXJmYWNlIE5vdmVsYSB7XG4gIGlkOiBudW1iZXI7XG4gIHRpdHVsbzogc3RyaW5nO1xuICBnZW5lcm86IHN0cmluZztcbiAgY2FwaXR1bG9zOiBudW1iZXI7XG4gIGHDsW86IG51bWJlcjtcbiAgZGVzY3JpcGNpb24/OiBzdHJpbmc7XG4gIHBheW1lbnRUeXBlPzogJ2Nhc2gnIHwgJ3RyYW5zZmVyJztcbn1cblxuaW50ZXJmYWNlIE5vdmVsYXNNb2RhbFByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTm92ZWxhc01vZGFsKHsgaXNPcGVuLCBvbkNsb3NlIH06IE5vdmVsYXNNb2RhbFByb3BzKSB7XG4gIGNvbnN0IFtzZWxlY3RlZE5vdmVsYXMsIHNldFNlbGVjdGVkTm92ZWxhc10gPSB1c2VTdGF0ZTxudW1iZXJbXT4oW10pO1xuICBjb25zdCBbbm92ZWxhc1dpdGhQYXltZW50LCBzZXROb3ZlbGFzV2l0aFBheW1lbnRdID0gdXNlU3RhdGU8Tm92ZWxhW10+KFtdKTtcbiAgY29uc3QgW3Nob3dOb3ZlbExpc3QsIHNldFNob3dOb3ZlbExpc3RdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VhcmNoVGVybSwgc2V0U2VhcmNoVGVybV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzZWxlY3RlZEdlbnJlLCBzZXRTZWxlY3RlZEdlbnJlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3NlbGVjdGVkWWVhciwgc2V0U2VsZWN0ZWRZZWFyXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3NvcnRCeSwgc2V0U29ydEJ5XSA9IHVzZVN0YXRlPCd0aXR1bG8nIHwgJ2HDsW8nIHwgJ2NhcGl0dWxvcyc+KCd0aXR1bG8nKTtcbiAgY29uc3QgW3NvcnRPcmRlciwgc2V0U29ydE9yZGVyXSA9IHVzZVN0YXRlPCdhc2MnIHwgJ2Rlc2MnPignYXNjJyk7XG5cbiAgLy8gR2V0IG5vdmVscyBhbmQgcHJpY2VzIGZyb20gZW1iZWRkZWQgY29uZmlndXJhdGlvblxuICBjb25zdCBhZG1pbk5vdmVscyA9IEVNQkVEREVEX05PVkVMUztcbiAgY29uc3Qgbm92ZWxQcmljZVBlckNoYXB0ZXIgPSBFTUJFRERFRF9QUklDRVMubm92ZWxQcmljZVBlckNoYXB0ZXI7XG4gIGNvbnN0IHRyYW5zZmVyRmVlUGVyY2VudGFnZSA9IEVNQkVEREVEX1BSSUNFUy50cmFuc2ZlckZlZVBlcmNlbnRhZ2U7XG4gIFxuICAvLyBCYXNlIG5vdmVscyBsaXN0XG4gIGNvbnN0IGRlZmF1bHROb3ZlbGFzOiBOb3ZlbGFbXSA9IFtdO1xuXG4gIC8vIENvbWJpbmUgYWRtaW4gbm92ZWxzIHdpdGggZGVmYXVsdCBub3ZlbHNcbiAgY29uc3QgYWxsTm92ZWxhcyA9IFsuLi5kZWZhdWx0Tm92ZWxhcywgLi4uYWRtaW5Ob3ZlbHMubWFwKG5vdmVsID0+ICh7XG4gICAgaWQ6IG5vdmVsLmlkLFxuICAgIHRpdHVsbzogbm92ZWwudGl0dWxvLFxuICAgIGdlbmVybzogbm92ZWwuZ2VuZXJvLFxuICAgIGNhcGl0dWxvczogbm92ZWwuY2FwaXR1bG9zLFxuICAgIGHDsW86IG5vdmVsLmHDsW8sXG4gICAgZGVzY3JpcGNpb246IG5vdmVsLmRlc2NyaXBjaW9uXG4gIH0pKV07XG5cbiAgY29uc3QgcGhvbmVOdW1iZXIgPSAnKzUzNTQ2OTA4NzgnO1xuXG4gIC8vIEdldCB1bmlxdWUgZ2VucmVzXG4gIGNvbnN0IHVuaXF1ZUdlbnJlcyA9IFsuLi5uZXcgU2V0KGFsbE5vdmVsYXMubWFwKG5vdmVsYSA9PiBub3ZlbGEuZ2VuZXJvKSldLnNvcnQoKTtcbiAgXG4gIC8vIEdldCB1bmlxdWUgeWVhcnNcbiAgY29uc3QgdW5pcXVlWWVhcnMgPSBbLi4ubmV3IFNldChhbGxOb3ZlbGFzLm1hcChub3ZlbGEgPT4gbm92ZWxhLmHDsW8pKV0uc29ydCgoYSwgYikgPT4gYiAtIGEpO1xuXG4gIC8vIEluaXRpYWxpemUgbm92ZWxzIHdpdGggZGVmYXVsdCBwYXltZW50IHR5cGVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub3ZlbGFzV2l0aERlZmF1bHRQYXltZW50ID0gYWxsTm92ZWxhcy5tYXAobm92ZWxhID0+ICh7XG4gICAgICAuLi5ub3ZlbGEsXG4gICAgICBwYXltZW50VHlwZTogJ2Nhc2gnIGFzIGNvbnN0XG4gICAgfSkpO1xuICAgIHNldE5vdmVsYXNXaXRoUGF5bWVudChub3ZlbGFzV2l0aERlZmF1bHRQYXltZW50KTtcbiAgfSwgW10pO1xuXG4gIC8vIEZpbHRlciBub3ZlbHMgZnVuY3Rpb25cbiAgY29uc3QgZ2V0RmlsdGVyZWROb3ZlbGFzID0gKCkgPT4ge1xuICAgIGxldCBmaWx0ZXJlZCA9IG5vdmVsYXNXaXRoUGF5bWVudC5maWx0ZXIobm92ZWxhID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoZXNTZWFyY2ggPSBub3ZlbGEudGl0dWxvLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGNvbnN0IG1hdGNoZXNHZW5yZSA9IHNlbGVjdGVkR2VucmUgPT09ICcnIHx8IG5vdmVsYS5nZW5lcm8gPT09IHNlbGVjdGVkR2VucmU7XG4gICAgICBjb25zdCBtYXRjaGVzWWVhciA9IHNlbGVjdGVkWWVhciA9PT0gJycgfHwgbm92ZWxhLmHDsW8udG9TdHJpbmcoKSA9PT0gc2VsZWN0ZWRZZWFyO1xuICAgICAgXG4gICAgICByZXR1cm4gbWF0Y2hlc1NlYXJjaCAmJiBtYXRjaGVzR2VucmUgJiYgbWF0Y2hlc1llYXI7XG4gICAgfSk7XG5cbiAgICBmaWx0ZXJlZC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBsZXQgY29tcGFyaXNvbiA9IDA7XG4gICAgICBcbiAgICAgIHN3aXRjaCAoc29ydEJ5KSB7XG4gICAgICAgIGNhc2UgJ3RpdHVsbyc6XG4gICAgICAgICAgY29tcGFyaXNvbiA9IGEudGl0dWxvLmxvY2FsZUNvbXBhcmUoYi50aXR1bG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhw7FvJzpcbiAgICAgICAgICBjb21wYXJpc29uID0gYS5hw7FvIC0gYi5hw7FvO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjYXBpdHVsb3MnOlxuICAgICAgICAgIGNvbXBhcmlzb24gPSBhLmNhcGl0dWxvcyAtIGIuY2FwaXR1bG9zO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgXG4gICAgICByZXR1cm4gc29ydE9yZGVyID09PSAnYXNjJyA/IGNvbXBhcmlzb24gOiAtY29tcGFyaXNvbjtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWx0ZXJlZDtcbiAgfTtcblxuICBjb25zdCBmaWx0ZXJlZE5vdmVsYXMgPSBnZXRGaWx0ZXJlZE5vdmVsYXMoKTtcblxuICBjb25zdCBoYW5kbGVOb3ZlbFRvZ2dsZSA9IChub3ZlbGFJZDogbnVtYmVyKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWROb3ZlbGFzKHByZXYgPT4ge1xuICAgICAgaWYgKHByZXYuaW5jbHVkZXMobm92ZWxhSWQpKSB7XG4gICAgICAgIHJldHVybiBwcmV2LmZpbHRlcihpZCA9PiBpZCAhPT0gbm92ZWxhSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsuLi5wcmV2LCBub3ZlbGFJZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUGF5bWVudFR5cGVDaGFuZ2UgPSAobm92ZWxhSWQ6IG51bWJlciwgcGF5bWVudFR5cGU6ICdjYXNoJyB8ICd0cmFuc2ZlcicpID0+IHtcbiAgICBzZXROb3ZlbGFzV2l0aFBheW1lbnQocHJldiA9PiBcbiAgICAgIHByZXYubWFwKG5vdmVsYSA9PiBcbiAgICAgICAgbm92ZWxhLmlkID09PSBub3ZlbGFJZCBcbiAgICAgICAgICA/IHsgLi4ubm92ZWxhLCBwYXltZW50VHlwZSB9XG4gICAgICAgICAgOiBub3ZlbGFcbiAgICAgIClcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdEFsbE5vdmVsYXMgPSAoKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWROb3ZlbGFzKGFsbE5vdmVsYXMubWFwKG4gPT4gbi5pZCkpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyQWxsTm92ZWxhcyA9ICgpID0+IHtcbiAgICBzZXRTZWxlY3RlZE5vdmVsYXMoW10pO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyRmlsdGVycyA9ICgpID0+IHtcbiAgICBzZXRTZWFyY2hUZXJtKCcnKTtcbiAgICBzZXRTZWxlY3RlZEdlbnJlKCcnKTtcbiAgICBzZXRTZWxlY3RlZFllYXIoJycpO1xuICAgIHNldFNvcnRCeSgndGl0dWxvJyk7XG4gICAgc2V0U29ydE9yZGVyKCdhc2MnKTtcbiAgfTtcblxuICAvLyBDYWxjdWxhdGUgdG90YWxzIGJ5IHBheW1lbnQgdHlwZSB3aXRoIGVtYmVkZGVkIHByaWNpbmdcbiAgY29uc3QgY2FsY3VsYXRlVG90YWxzID0gKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkTm92ZWxhc0RhdGEgPSBub3ZlbGFzV2l0aFBheW1lbnQuZmlsdGVyKG4gPT4gc2VsZWN0ZWROb3ZlbGFzLmluY2x1ZGVzKG4uaWQpKTtcbiAgICBcbiAgICBjb25zdCBjYXNoTm92ZWxhcyA9IHNlbGVjdGVkTm92ZWxhc0RhdGEuZmlsdGVyKG4gPT4gbi5wYXltZW50VHlwZSA9PT0gJ2Nhc2gnKTtcbiAgICBjb25zdCB0cmFuc2Zlck5vdmVsYXMgPSBzZWxlY3RlZE5vdmVsYXNEYXRhLmZpbHRlcihuID0+IG4ucGF5bWVudFR5cGUgPT09ICd0cmFuc2ZlcicpO1xuICAgIFxuICAgIGNvbnN0IGNhc2hUb3RhbCA9IGNhc2hOb3ZlbGFzLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyAobi5jYXBpdHVsb3MgKiBub3ZlbFByaWNlUGVyQ2hhcHRlciksIDApO1xuICAgIGNvbnN0IHRyYW5zZmVyQmFzZVRvdGFsID0gdHJhbnNmZXJOb3ZlbGFzLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyAobi5jYXBpdHVsb3MgKiBub3ZlbFByaWNlUGVyQ2hhcHRlciksIDApO1xuICAgIGNvbnN0IHRyYW5zZmVyRmVlID0gTWF0aC5yb3VuZCh0cmFuc2ZlckJhc2VUb3RhbCAqICh0cmFuc2ZlckZlZVBlcmNlbnRhZ2UgLyAxMDApKTtcbiAgICBjb25zdCB0cmFuc2ZlclRvdGFsID0gdHJhbnNmZXJCYXNlVG90YWwgKyB0cmFuc2ZlckZlZTtcbiAgICBcbiAgICBjb25zdCBncmFuZFRvdGFsID0gY2FzaFRvdGFsICsgdHJhbnNmZXJUb3RhbDtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgY2FzaE5vdmVsYXMsXG4gICAgICB0cmFuc2Zlck5vdmVsYXMsXG4gICAgICBjYXNoVG90YWwsXG4gICAgICB0cmFuc2ZlckJhc2VUb3RhbCxcbiAgICAgIHRyYW5zZmVyRmVlLFxuICAgICAgdHJhbnNmZXJUb3RhbCxcbiAgICAgIGdyYW5kVG90YWwsXG4gICAgICB0b3RhbENhcGl0dWxvczogc2VsZWN0ZWROb3ZlbGFzRGF0YS5yZWR1Y2UoKHN1bSwgbikgPT4gc3VtICsgbi5jYXBpdHVsb3MsIDApXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCB0b3RhbHMgPSBjYWxjdWxhdGVUb3RhbHMoKTtcblxuICBjb25zdCBnZW5lcmF0ZU5vdmVsTGlzdFRleHQgPSAoKSA9PiB7XG4gICAgbGV0IGxpc3RUZXh0ID0gXCLwn5OaIENBVMOBTE9HTyBERSBOT1ZFTEFTIERJU1BPTklCTEVTXFxcXG5cIjtcbiAgICBsaXN0VGV4dCArPSBcIlRWIGEgbGEgQ2FydGEgLSBOb3ZlbGFzIENvbXBsZXRhc1xcXFxuXFxcXG5cIjtcbiAgICBsaXN0VGV4dCArPSBcXGDwn5KwIFByZWNpbzogJFxcJHtub3ZlbFByaWNlUGVyQ2hhcHRlcn0gQ1VQIHBvciBjYXDDrXR1bG9cXFxcblxcYDtcbiAgICBsaXN0VGV4dCArPSBcXGDwn5KzIFJlY2FyZ28gdHJhbnNmZXJlbmNpYTogXFwke3RyYW5zZmVyRmVlUGVyY2VudGFnZX0lXFxcXG5cXGA7XG4gICAgbGlzdFRleHQgKz0gXCLwn5OxIENvbnRhY3RvOiArNTM1NDY5MDg3OFxcXFxuXFxcXG5cIjtcbiAgICBsaXN0VGV4dCArPSBcIuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxcXFxuXFxcXG5cIjtcbiAgICBcbiAgICBpZiAoYWxsTm92ZWxhcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxpc3RUZXh0ICs9IFwi8J+TiyBObyBoYXkgbm92ZWxhcyBkaXNwb25pYmxlcyBlbiBlc3RlIG1vbWVudG8uXFxcXG5cIjtcbiAgICAgIGxpc3RUZXh0ICs9IFwiQ29udGFjdGEgY29uIGVsIGFkbWluaXN0cmFkb3IgcGFyYSBtw6FzIGluZm9ybWFjacOzbi5cXFxcblxcXFxuXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3RUZXh0ICs9IFwi8J+StSBQUkVDSU9TIEVOIEVGRUNUSVZPOlxcXFxuXCI7XG4gICAgICBsaXN0VGV4dCArPSBcIuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxcXFxuXFxcXG5cIjtcbiAgICAgIFxuICAgICAgYWxsTm92ZWxhcy5mb3JFYWNoKChub3ZlbGEsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2VDb3N0ID0gbm92ZWxhLmNhcGl0dWxvcyAqIG5vdmVsUHJpY2VQZXJDaGFwdGVyO1xuICAgICAgICBsaXN0VGV4dCArPSBcXGBcXCR7aW5kZXggKyAxfS4gXFwke25vdmVsYS50aXR1bG99XFxcXG5cXGA7XG4gICAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfk7ogR8OpbmVybzogXFwke25vdmVsYS5nZW5lcm99XFxcXG5cXGA7XG4gICAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfk4ogQ2Fww610dWxvczogXFwke25vdmVsYS5jYXBpdHVsb3N9XFxcXG5cXGA7XG4gICAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfk4UgQcOxbzogXFwke25vdmVsYS5hw7FvfVxcXFxuXFxgO1xuICAgICAgICBsaXN0VGV4dCArPSBcXGAgICDwn5KwIENvc3RvIGVuIGVmZWN0aXZvOiBcXCR7YmFzZUNvc3QudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxcXG5cXFxcblxcYDtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBsaXN0VGV4dCArPSBcXGBcXFxcbvCfj6YgUFJFQ0lPUyBDT04gVFJBTlNGRVJFTkNJQSBCQU5DQVJJQSAoK1xcJHt0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSk6XFxcXG5cXGA7XG4gICAgICBsaXN0VGV4dCArPSBcIuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxcXFxuXFxcXG5cIjtcbiAgICAgIFxuICAgICAgYWxsTm92ZWxhcy5mb3JFYWNoKChub3ZlbGEsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2VDb3N0ID0gbm92ZWxhLmNhcGl0dWxvcyAqIG5vdmVsUHJpY2VQZXJDaGFwdGVyO1xuICAgICAgICBjb25zdCB0cmFuc2ZlckNvc3QgPSBNYXRoLnJvdW5kKGJhc2VDb3N0ICogKDEgKyB0cmFuc2ZlckZlZVBlcmNlbnRhZ2UgLyAxMDApKTtcbiAgICAgICAgY29uc3QgcmVjYXJnbyA9IHRyYW5zZmVyQ29zdCAtIGJhc2VDb3N0O1xuICAgICAgICBsaXN0VGV4dCArPSBcXGBcXCR7aW5kZXggKyAxfS4gXFwke25vdmVsYS50aXR1bG99XFxcXG5cXGA7XG4gICAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfk7ogR8OpbmVybzogXFwke25vdmVsYS5nZW5lcm99XFxcXG5cXGA7XG4gICAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfk4ogQ2Fww610dWxvczogXFwke25vdmVsYS5jYXBpdHVsb3N9XFxcXG5cXGA7XG4gICAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfk4UgQcOxbzogXFwke25vdmVsYS5hw7FvfVxcXFxuXFxgO1xuICAgICAgICBsaXN0VGV4dCArPSBcXGAgICDwn5KwIENvc3RvIGJhc2U6IFxcJHtiYXNlQ29zdC50b0xvY2FsZVN0cmluZygpfSBDVVBcXFxcblxcYDtcbiAgICAgICAgbGlzdFRleHQgKz0gXFxgICAg8J+SsyBSZWNhcmdvIChcXCR7dHJhbnNmZXJGZWVQZXJjZW50YWdlfSUpOiArXFwke3JlY2FyZ28udG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxcXG5cXGA7XG4gICAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfkrAgQ29zdG8gY29uIHRyYW5zZmVyZW5jaWE6IFxcJHt0cmFuc2ZlckNvc3QudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxcXG5cXFxcblxcYDtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBsaXN0VGV4dCArPSBcIlxcXFxu8J+TiiBSRVNVTUVOIERFIENPU1RPUzpcXFxcblwiO1xuICAgICAgbGlzdFRleHQgKz0gXCLilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcXFxcblxcXFxuXCI7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvdGFsQ2FwaXR1bG9zID0gYWxsTm92ZWxhcy5yZWR1Y2UoKHN1bSwgbm92ZWxhKSA9PiBzdW0gKyBub3ZlbGEuY2FwaXR1bG9zLCAwKTtcbiAgICAgIGNvbnN0IHRvdGFsRWZlY3Rpdm8gPSBhbGxOb3ZlbGFzLnJlZHVjZSgoc3VtLCBub3ZlbGEpID0+IHN1bSArIChub3ZlbGEuY2FwaXR1bG9zICogbm92ZWxQcmljZVBlckNoYXB0ZXIpLCAwKTtcbiAgICAgIGNvbnN0IHRvdGFsVHJhbnNmZXJlbmNpYSA9IGFsbE5vdmVsYXMucmVkdWNlKChzdW0sIG5vdmVsYSkgPT4gc3VtICsgTWF0aC5yb3VuZCgobm92ZWxhLmNhcGl0dWxvcyAqIG5vdmVsUHJpY2VQZXJDaGFwdGVyKSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSksIDApO1xuICAgICAgY29uc3QgdG90YWxSZWNhcmdvID0gdG90YWxUcmFuc2ZlcmVuY2lhIC0gdG90YWxFZmVjdGl2bztcbiAgICAgIFxuICAgICAgbGlzdFRleHQgKz0gXFxg8J+TiiBUb3RhbCBkZSBub3ZlbGFzOiBcXCR7YWxsTm92ZWxhcy5sZW5ndGh9XFxcXG5cXGA7XG4gICAgICBsaXN0VGV4dCArPSBcXGDwn5OKIFRvdGFsIGRlIGNhcMOtdHVsb3M6IFxcJHt0b3RhbENhcGl0dWxvcy50b0xvY2FsZVN0cmluZygpfVxcXFxuXFxcXG5cXGA7XG4gICAgICBsaXN0VGV4dCArPSBcXGDwn5K1IENBVMOBTE9HTyBDT01QTEVUTyBFTiBFRkVDVElWTzpcXFxcblxcYDtcbiAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfkrAgQ29zdG8gdG90YWw6IFxcJHt0b3RhbEVmZWN0aXZvLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcXFxuXFxcXG5cXGA7XG4gICAgICBsaXN0VGV4dCArPSBcXGDwn4+mIENBVMOBTE9HTyBDT01QTEVUTyBDT04gVFJBTlNGRVJFTkNJQTpcXFxcblxcYDtcbiAgICAgIGxpc3RUZXh0ICs9IFxcYCAgIPCfkrAgQ29zdG8gYmFzZTogXFwke3RvdGFsRWZlY3Rpdm8udG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxcXG5cXGA7XG4gICAgICBsaXN0VGV4dCArPSBcXGAgICDwn5KzIFJlY2FyZ28gdG90YWwgKFxcJHt0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSk6ICtcXCR7dG90YWxSZWNhcmdvLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcXFxuXFxgO1xuICAgICAgbGlzdFRleHQgKz0gXFxgICAg8J+SsCBDb3N0byB0b3RhbCBjb24gdHJhbnNmZXJlbmNpYTogXFwke3RvdGFsVHJhbnNmZXJlbmNpYS50b0xvY2FsZVN0cmluZygpfSBDVVBcXFxcblxcXFxuXFxgO1xuICAgIH1cbiAgICBcbiAgICBsaXN0VGV4dCArPSBcIuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxcXFxuXCI7XG4gICAgbGlzdFRleHQgKz0gXCLwn5KhIElORk9STUFDScOTTiBJTVBPUlRBTlRFOlxcXFxuXCI7XG4gICAgbGlzdFRleHQgKz0gXCLigKIgTG9zIHByZWNpb3MgZW4gZWZlY3Rpdm8gbm8gdGllbmVuIHJlY2FyZ28gYWRpY2lvbmFsXFxcXG5cIjtcbiAgICBsaXN0VGV4dCArPSBcXGDigKIgTGFzIHRyYW5zZmVyZW5jaWFzIGJhbmNhcmlhcyB0aWVuZW4gdW4gXFwke3RyYW5zZmVyRmVlUGVyY2VudGFnZX0lIGRlIHJlY2FyZ29cXFxcblxcYDtcbiAgICBsaXN0VGV4dCArPSBcIuKAoiBQdWVkZXMgc2VsZWNjaW9uYXIgbm92ZWxhcyBpbmRpdmlkdWFsZXMgbyBlbCBjYXTDoWxvZ28gY29tcGxldG9cXFxcblwiO1xuICAgIGxpc3RUZXh0ICs9IFwi4oCiIFRvZG9zIGxvcyBwcmVjaW9zIGVzdMOhbiBlbiBwZXNvcyBjdWJhbm9zIChDVVApXFxcXG5cXFxcblwiO1xuICAgIGxpc3RUZXh0ICs9IFwi8J+TniBQYXJhIGVuY2FyZ2FyLCBjb250YWN0YSBhbCArNTM1NDY5MDg3OFxcXFxuXCI7XG4gICAgbGlzdFRleHQgKz0gXCLwn4yfIMKhRGlzZnJ1dGEgZGUgbGFzIG1lam9yZXMgbm92ZWxhcyFcXFxcblwiO1xuICAgIGxpc3RUZXh0ICs9IFxcYFxcXFxu8J+ThSBHZW5lcmFkbyBlbDogXFwke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoJ2VzLUVTJyl9XFxgO1xuICAgIFxuICAgIHJldHVybiBsaXN0VGV4dDtcbiAgfTtcblxuICBjb25zdCBkb3dubG9hZE5vdmVsTGlzdCA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0VGV4dCA9IGdlbmVyYXRlTm92ZWxMaXN0VGV4dCgpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbbGlzdFRleHRdLCB7IHR5cGU6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgnIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgbGluay5kb3dubG9hZCA9ICdDYXRhbG9nb19Ob3ZlbGFzX1RWX2FfbGFfQ2FydGEudHh0JztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgfTtcblxuICBjb25zdCBzZW5kU2VsZWN0ZWROb3ZlbGFzID0gKCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZE5vdmVsYXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBhbGVydCgnUG9yIGZhdm9yIHNlbGVjY2lvbmEgYWwgbWVub3MgdW5hIG5vdmVsYScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY2FzaE5vdmVsYXMsIHRyYW5zZmVyTm92ZWxhcywgY2FzaFRvdGFsLCB0cmFuc2ZlckJhc2VUb3RhbCwgdHJhbnNmZXJGZWUsIHRyYW5zZmVyVG90YWwsIGdyYW5kVG90YWwsIHRvdGFsQ2FwaXR1bG9zIH0gPSB0b3RhbHM7XG4gICAgXG4gICAgbGV0IG1lc3NhZ2UgPSBcIk1lIGludGVyZXNhbiBsb3Mgc2lndWllbnRlcyB0w610dWxvczpcXFxcblxcXFxuXCI7XG4gICAgXG4gICAgLy8gQ2FzaCBub3ZlbHNcbiAgICBpZiAoY2FzaE5vdmVsYXMubGVuZ3RoID4gMCkge1xuICAgICAgbWVzc2FnZSArPSBcIvCfkrUgUEFHTyBFTiBFRkVDVElWTzpcXFxcblwiO1xuICAgICAgbWVzc2FnZSArPSBcIuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxcXFxuXCI7XG4gICAgICBjYXNoTm92ZWxhcy5mb3JFYWNoKChub3ZlbGEsIGluZGV4KSA9PiB7XG4gICAgICAgIG1lc3NhZ2UgKz0gXFxgXFwke2luZGV4ICsgMX0uIFxcJHtub3ZlbGEudGl0dWxvfVxcXFxuXFxgO1xuICAgICAgICBtZXNzYWdlICs9IFxcYCAgIPCfk7ogR8OpbmVybzogXFwke25vdmVsYS5nZW5lcm99XFxcXG5cXGA7XG4gICAgICAgIG1lc3NhZ2UgKz0gXFxgICAg8J+TiiBDYXDDrXR1bG9zOiBcXCR7bm92ZWxhLmNhcGl0dWxvc31cXFxcblxcYDtcbiAgICAgICAgbWVzc2FnZSArPSBcXGAgICDwn5OFIEHDsW86IFxcJHtub3ZlbGEuYcOxb31cXFxcblxcYDtcbiAgICAgICAgbWVzc2FnZSArPSBcXGAgICDwn5KwIENvc3RvOiAkXFwkeyhub3ZlbGEuY2FwaXR1bG9zICogbm92ZWxQcmljZVBlckNoYXB0ZXIpLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcXFxuXFxcXG5cXGA7XG4gICAgICB9KTtcbiAgICAgIG1lc3NhZ2UgKz0gXFxg8J+SsCBTdWJ0b3RhbCBFZmVjdGl2bzogJFxcJHtjYXNoVG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXFxcXG5cXGA7XG4gICAgICBtZXNzYWdlICs9IFxcYPCfk4ogVG90YWwgY2Fww610dWxvczogXFwke2Nhc2hOb3ZlbGFzLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyBuLmNhcGl0dWxvcywgMCl9XFxcXG5cXFxcblxcYDtcbiAgICB9XG4gICAgXG4gICAgLy8gVHJhbnNmZXIgbm92ZWxzXG4gICAgaWYgKHRyYW5zZmVyTm92ZWxhcy5sZW5ndGggPiAwKSB7XG4gICAgICBtZXNzYWdlICs9IFxcYPCfj6YgUEFHTyBQT1IgVFJBTlNGRVJFTkNJQSBCQU5DQVJJQSAoK1xcJHt0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSk6XFxcXG5cXGA7XG4gICAgICBtZXNzYWdlICs9IFwi4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXFxcXG5cIjtcbiAgICAgIHRyYW5zZmVyTm92ZWxhcy5mb3JFYWNoKChub3ZlbGEsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2VDb3N0ID0gbm92ZWxhLmNhcGl0dWxvcyAqIG5vdmVsUHJpY2VQZXJDaGFwdGVyO1xuICAgICAgICBjb25zdCBmZWUgPSBNYXRoLnJvdW5kKGJhc2VDb3N0ICogKHRyYW5zZmVyRmVlUGVyY2VudGFnZSAvIDEwMCkpO1xuICAgICAgICBjb25zdCB0b3RhbENvc3QgPSBiYXNlQ29zdCArIGZlZTtcbiAgICAgICAgbWVzc2FnZSArPSBcXGBcXCR7aW5kZXggKyAxfS4gXFwke25vdmVsYS50aXR1bG99XFxcXG5cXGA7XG4gICAgICAgIG1lc3NhZ2UgKz0gXFxgICAg8J+TuiBHw6luZXJvOiBcXCR7bm92ZWxhLmdlbmVyb31cXFxcblxcYDtcbiAgICAgICAgbWVzc2FnZSArPSBcXGAgICDwn5OKIENhcMOtdHVsb3M6IFxcJHtub3ZlbGEuY2FwaXR1bG9zfVxcXFxuXFxgO1xuICAgICAgICBtZXNzYWdlICs9IFxcYCAgIPCfk4UgQcOxbzogXFwke25vdmVsYS5hw7FvfVxcXFxuXFxgO1xuICAgICAgICBtZXNzYWdlICs9IFxcYCAgIPCfkrAgQ29zdG8gYmFzZTogJFxcJHtiYXNlQ29zdC50b0xvY2FsZVN0cmluZygpfSBDVVBcXFxcblxcYDtcbiAgICAgICAgbWVzc2FnZSArPSBcXGAgICDwn5KzIFJlY2FyZ28gKFxcJHt0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSk6ICskXFwke2ZlZS50b0xvY2FsZVN0cmluZygpfSBDVVBcXFxcblxcYDtcbiAgICAgICAgbWVzc2FnZSArPSBcXGAgICDwn5KwIENvc3RvIHRvdGFsOiAkXFwke3RvdGFsQ29zdC50b0xvY2FsZVN0cmluZygpfSBDVVBcXFxcblxcXFxuXFxgO1xuICAgICAgfSk7XG4gICAgICBtZXNzYWdlICs9IFxcYPCfkrAgU3VidG90YWwgYmFzZSB0cmFuc2ZlcmVuY2lhOiAkXFwke3RyYW5zZmVyQmFzZVRvdGFsLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcXFxuXFxgO1xuICAgICAgbWVzc2FnZSArPSBcXGDwn5KzIFJlY2FyZ28gdG90YWwgKFxcJHt0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSk6ICskXFwke3RyYW5zZmVyRmVlLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxcXFxuXFxgO1xuICAgICAgbWVzc2FnZSArPSBcXGDwn5KwIFN1YnRvdGFsIFRyYW5zZmVyZW5jaWE6ICRcXCR7dHJhbnNmZXJUb3RhbC50b0xvY2FsZVN0cmluZygpfSBDVVBcXFxcblxcYDtcbiAgICAgIG1lc3NhZ2UgKz0gXFxg8J+TiiBUb3RhbCBjYXDDrXR1bG9zOiBcXCR7dHJhbnNmZXJOb3ZlbGFzLnJlZHVjZSgoc3VtLCBuKSA9PiBzdW0gKyBuLmNhcGl0dWxvcywgMCl9XFxcXG5cXFxcblxcYDtcbiAgICB9XG4gICAgXG4gICAgLy8gRmluYWwgc3VtbWFyeVxuICAgIG1lc3NhZ2UgKz0gXCLwn5OKIFJFU1VNRU4gRklOQUw6XFxcXG5cIjtcbiAgICBtZXNzYWdlICs9IFwi4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXFxcXG5cIjtcbiAgICBtZXNzYWdlICs9IFxcYOKAoiBUb3RhbCBkZSBub3ZlbGFzOiBcXCR7c2VsZWN0ZWROb3ZlbGFzLmxlbmd0aH1cXFxcblxcYDtcbiAgICBtZXNzYWdlICs9IFxcYOKAoiBUb3RhbCBkZSBjYXDDrXR1bG9zOiBcXCR7dG90YWxDYXBpdHVsb3N9XFxcXG5cXGA7XG4gICAgaWYgKGNhc2hUb3RhbCA+IDApIHtcbiAgICAgIG1lc3NhZ2UgKz0gXFxg4oCiIEVmZWN0aXZvOiAkXFwke2Nhc2hUb3RhbC50b0xvY2FsZVN0cmluZygpfSBDVVAgKFxcJHtjYXNoTm92ZWxhcy5sZW5ndGh9IG5vdmVsYXMpXFxcXG5cXGA7XG4gICAgfVxuICAgIGlmICh0cmFuc2ZlclRvdGFsID4gMCkge1xuICAgICAgbWVzc2FnZSArPSBcXGDigKIgVHJhbnNmZXJlbmNpYTogJFxcJHt0cmFuc2ZlclRvdGFsLnRvTG9jYWxlU3RyaW5nKCl9IENVUCAoXFwke3RyYW5zZmVyTm92ZWxhcy5sZW5ndGh9IG5vdmVsYXMpXFxcXG5cXGA7XG4gICAgfVxuICAgIG1lc3NhZ2UgKz0gXFxg4oCiIFRPVEFMIEEgUEFHQVI6ICRcXCR7Z3JhbmRUb3RhbC50b0xvY2FsZVN0cmluZygpfSBDVVBcXFxcblxcXFxuXFxgO1xuICAgIG1lc3NhZ2UgKz0gXFxg8J+TsSBFbnZpYWRvIGRlc2RlIFRWIGEgbGEgQ2FydGFcXFxcblxcYDtcbiAgICBtZXNzYWdlICs9IFxcYPCfk4UgRmVjaGE6IFxcJHtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCdlcy1FUycpfVxcYDtcblxuICAgIGNvbnN0IGVuY29kZWRNZXNzYWdlID0gZW5jb2RlVVJJQ29tcG9uZW50KG1lc3NhZ2UpO1xuICAgIGNvbnN0IHdoYXRzYXBwVXJsID0gXFxgaHR0cHM6Ly93YS5tZS81MzU0NjkwODc4P3RleHQ9XFwke2VuY29kZWRNZXNzYWdlfVxcYDtcbiAgICB3aW5kb3cub3Blbih3aGF0c2FwcFVybCwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2FsbCA9ICgpID0+IHtcbiAgICB3aW5kb3cub3BlbihcXGB0ZWw6XFwke3Bob25lTnVtYmVyfVxcYCwgJ19zZWxmJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlV2hhdHNBcHAgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IFwi8J+TmiAqU29saWNpdGFyIG5vdmVsYXMqXFxcXG5cXFxcbsK/SGF5IG5vdmVsYXMgcXVlIG1lIGd1c3RhcsOtYSB2ZXIgZW4gW1RWIGEgbGEgQ2FydGFdIGEgY29udGludWFjacOzbiB0ZSBjb21lbnRvOlwiO1xuICAgIGNvbnN0IGVuY29kZWRNZXNzYWdlID0gZW5jb2RlVVJJQ29tcG9uZW50KG1lc3NhZ2UpO1xuICAgIGNvbnN0IHdoYXRzYXBwVXJsID0gXFxgaHR0cHM6Ly93YS5tZS81MzU0NjkwODc4P3RleHQ9XFwke2VuY29kZWRNZXNzYWdlfVxcYDtcbiAgICB3aW5kb3cub3Blbih3aGF0c2FwcFVybCwgJ19ibGFuaycsICdub29wZW5lcixub3JlZmVycmVyJyk7XG4gIH07XG5cbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrLzUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCB6LTUwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtMnhsIHctZnVsbCBtYXgtdy02eGwgbWF4LWgtWzk1dmhdIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctMnhsIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0zMDBcIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcGluay02MDAgdG8tcHVycGxlLTYwMCBwLTQgc206cC02IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzIwIHAtMyByb3VuZGVkLXhsIG1yLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cImgtOCB3LThcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgc206dGV4dC0zeGwgZm9udC1ib2xkXCI+Q2F0w6Fsb2dvIGRlIE5vdmVsYXM8L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gc206dGV4dC1iYXNlIG9wYWNpdHktOTBcIj5Ob3ZlbGFzIGNvbXBsZXRhcyBkaXNwb25pYmxlczwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIGhvdmVyOmJnLXdoaXRlLzIwIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteS1hdXRvIG1heC1oLVtjYWxjKDk1dmgtMTIwcHgpXVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHNtOnAtNlwiPlxuICAgICAgICAgICAgey8qIE1haW4gSW5mb3JtYXRpb24gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWJyIGZyb20tcGluay01MCB2aWEtcHVycGxlLTUwIHRvLWJsdWUtNTAgcm91bmRlZC0zeGwgcC04IG1iLTggYm9yZGVyLTIgYm9yZGVyLXBpbmstMjAwIHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1waW5rLTUwMCB0by1wdXJwbGUtNTAwIHAtNCByb3VuZGVkLTJ4bCBtci00IHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICAgICAgPEluZm8gY2xhc3NOYW1lPVwiaC04IHctOCB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1waW5rLTYwMCB0by1wdXJwbGUtNjAwIGJnLWNsaXAtdGV4dCB0ZXh0LXRyYW5zcGFyZW50XCI+XG4gICAgICAgICAgICAgICAgICBJbmZvcm1hY2nDs24gSW1wb3J0YW50ZVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTYgdGV4dC1ncmF5LTgwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgYmctd2hpdGUvNjAgYmFja2Ryb3AtYmx1ci1zbSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1waW5rLTIwMCBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNDAwIHRvLXB1cnBsZS00MDAgcC0zIHJvdW5kZWQteGwgbXItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCfk5o8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWxnXCI+TGFzIG5vdmVsYXMgc2UgZW5jYXJnYW4gY29tcGxldGFzPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgYmctd2hpdGUvNjAgYmFja2Ryb3AtYmx1ci1zbSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1ncmVlbi0yMDAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi00MDAgdG8tZW1lcmFsZC00MDAgcC0zIHJvdW5kZWQteGwgbXItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCfkrA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWxnXCI+Q29zdG86ICRcXCR7bm92ZWxQcmljZVBlckNoYXB0ZXJ9IENVUCBwb3IgY2FkYSBjYXDDrXR1bG88L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy13aGl0ZS82MCBiYWNrZHJvcC1ibHVyLXNtIHJvdW5kZWQtMnhsIHAtNCBib3JkZXIgYm9yZGVyLW9yYW5nZS0yMDAgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1vcmFuZ2UtNDAwIHRvLXJlZC00MDAgcC0zIHJvdW5kZWQteGwgbXItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPvCfkrM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWxnXCI+VHJhbnNmZXJlbmNpYSBiYW5jYXJpYTogK3t0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSBkZSByZWNhcmdvPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgYmctd2hpdGUvNjAgYmFja2Ryb3AtYmx1ci1zbSByb3VuZGVkLTJ4bCBwLTQgYm9yZGVyIGJvcmRlci1ibHVlLTIwMCBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNDAwIHRvLWN5YW4tNDAwIHAtMyByb3VuZGVkLXhsIG1yLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0yeGxcIj7wn5OxPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1sZ1wiPlBhcmEgbcOhcyBpbmZvcm1hY2nDs24sIGNvbnRhY3RhIGFsIG7Dum1lcm86PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQ29udGFjdCBudW1iZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtOCBiZy1ncmFkaWVudC10by1yIGZyb20td2hpdGUgdG8tYmx1ZS01MCByb3VuZGVkLTJ4bCBwLTYgYm9yZGVyLTIgYm9yZGVyLWJsdWUtMzAwIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNCBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc206anVzdGlmeS1zdGFydCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MDAgdG8tcHVycGxlLTUwMCBwLTIgcm91bmRlZC1sZyBtci0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJoLTUgdy01IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ibGFjayB0ZXh0LWdyYXktOTAwXCI+e3Bob25lTnVtYmVyfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LWJsdWUtNjAwIG1sLTEwXCI+Q29udGFjdG8gZGlyZWN0bzwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggc3BhY2UteC00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDYWxsfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdG8tZW1lcmFsZC01MDAgaG92ZXI6ZnJvbS1ncmVlbi02MDAgaG92ZXI6dG8tZW1lcmFsZC02MDAgdGV4dC13aGl0ZSBweC02IHB5LTMgcm91bmRlZC14bCBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgc2hhZG93LWxnIGZsZXggaXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxQaG9uZSBjbGFzc05hbWU9XCJoLTUgdy01IG1yLTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIExsYW1hclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVdoYXRzQXBwfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi02MDAgdG8tdGVhbC02MDAgaG92ZXI6ZnJvbS1ncmVlbi03MDAgaG92ZXI6dG8tdGVhbC03MDAgdGV4dC13aGl0ZSBweC02IHB5LTMgcm91bmRlZC14bCBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgc2hhZG93LWxnIGZsZXggaXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlQ2lyY2xlIGNsYXNzTmFtZT1cImgtNSB3LTUgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgV2hhdHNBcHBcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIENhdGFsb2cgb3B0aW9ucyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtNCBtYi02XCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtkb3dubG9hZE5vdmVsTGlzdH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MDAgdG8tYmx1ZS02MDAgaG92ZXI6ZnJvbS1ibHVlLTYwMCBob3Zlcjp0by1ibHVlLTcwMCB0ZXh0LXdoaXRlIHAtNiByb3VuZGVkLXhsIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgaG92ZXI6c2hhZG93LWxnIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJoLTYgdy02IG1yLTNcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGdcIj5EZXNjYXJnYXIgQ2F0w6Fsb2dvPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gb3BhY2l0eS05MFwiPkxpc3RhIGNvbXBsZXRhIGRlIG5vdmVsYXM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd05vdmVsTGlzdCghc2hvd05vdmVsTGlzdCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS01MDAgdG8tcHVycGxlLTYwMCBob3Zlcjpmcm9tLXB1cnBsZS02MDAgaG92ZXI6dG8tcHVycGxlLTcwMCB0ZXh0LXdoaXRlIHAtNiByb3VuZGVkLXhsIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgaG92ZXI6c2hhZG93LWxnIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxCb29rT3BlbiBjbGFzc05hbWU9XCJoLTYgdy02IG1yLTNcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGdcIj5WZXIgeSBTZWxlY2Npb25hcjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIG9wYWNpdHktOTBcIj5FbGVnaXIgbm92ZWxhcyBlc3BlY8OtZmljYXM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNob3cgbWVzc2FnZSB3aGVuIG5vIG5vdmVscyBhdmFpbGFibGUgKi99XG4gICAgICAgICAgICB7YWxsTm92ZWxhcy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXllbGxvdy01MCBib3JkZXIgYm9yZGVyLXllbGxvdy0yMDAgcm91bmRlZC14bCBwLTYgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8Qm9va09wZW4gY2xhc3NOYW1lPVwiaC0xMiB3LTEyIHRleHQteWVsbG93LTYwMCBteC1hdXRvIG1iLTRcIiAvPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC15ZWxsb3ctODAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgIE5vIGhheSBub3ZlbGFzIGRpc3BvbmlibGVzXG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy03MDBcIj5cbiAgICAgICAgICAgICAgICAgIEVsIGNhdMOhbG9nbyBkZSBub3ZlbGFzIGVzdMOhIHZhY8Otby4gQ29udGFjdGEgY29uIGVsIGFkbWluaXN0cmFkb3IgcGFyYSBhZ3JlZ2FyIG5vdmVsYXMgYWwgc2lzdGVtYS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIE5vdmVscyBsaXN0ICovfVxuICAgICAgICAgICAge3Nob3dOb3ZlbExpc3QgJiYgYWxsTm92ZWxhcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBib3JkZXItMiBib3JkZXItZ3JheS0yMDAgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgey8qIEZpbHRlcnMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTUwIHRvLXBpbmstNTAgcC00IGJvcmRlci1iIGJvcmRlci1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgIDxGaWx0ZXIgY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LXB1cnBsZS02MDAgbXItMlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXB1cnBsZS05MDBcIj5GaWx0cm9zIGRlIELDunNxdWVkYTwvaDQ+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC00IG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zIHRvcC0xLzIgdHJhbnNmb3JtIC10cmFuc2xhdGUteS0xLzIgaC00IHctNCB0ZXh0LWdyYXktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQnVzY2FyIHBvciB0w610dWxvLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hUZXJtfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC0xMCBwci00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wdXJwbGUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkR2VucmV9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWxlY3RlZEdlbnJlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHVycGxlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlRvZG9zIGxvcyBnw6luZXJvczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIHt1bmlxdWVHZW5yZXMubWFwKGdlbnJlID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtnZW5yZX0gdmFsdWU9e2dlbnJlfT57Z2VucmV9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZFllYXJ9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWxlY3RlZFllYXIoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wdXJwbGUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+VG9kb3MgbG9zIGHDsW9zPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAge3VuaXF1ZVllYXJzLm1hcCh5ZWFyID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXt5ZWFyfSB2YWx1ZT17eWVhcn0+e3llYXJ9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzb3J0Qnl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNvcnRCeShlLnRhcmdldC52YWx1ZSBhcyAndGl0dWxvJyB8ICdhw7FvJyB8ICdjYXBpdHVsb3MnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweC0zIHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wdXJwbGUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidGl0dWxvXCI+VMOtdHVsbzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImHDsW9cIj5Bw7FvPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY2FwaXR1bG9zXCI+Q2Fww610dWxvczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNvcnRPcmRlcihzb3J0T3JkZXIgPT09ICdhc2MnID8gJ2Rlc2MnIDogJ2FzYycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIGJnLXB1cnBsZS0xMDAgaG92ZXI6YmctcHVycGxlLTIwMCB0ZXh0LXB1cnBsZS03MDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17XFxgT3JkZW5hciBcXCR7c29ydE9yZGVyID09PSAnYXNjJyA/ICdkZXNjZW5kZW50ZScgOiAnYXNjZW5kZW50ZSd9XFxgfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzb3J0T3JkZXIgPT09ICdhc2MnID8gPFNvcnRBc2MgY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+IDogPFNvcnREZXNjIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0yIHNtOnNwYWNlLXktMFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1wdXJwbGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTW9zdHJhbmRvIHtmaWx0ZXJlZE5vdmVsYXMubGVuZ3RofSBkZSB7YWxsTm92ZWxhcy5sZW5ndGh9IG5vdmVsYXNcbiAgICAgICAgICAgICAgICAgICAgICB7KHNlYXJjaFRlcm0gfHwgc2VsZWN0ZWRHZW5yZSB8fCBzZWxlY3RlZFllYXIpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTIgdGV4dC1wdXJwbGUtNjAwXCI+4oCiIEZpbHRyb3MgYWN0aXZvczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHsoc2VhcmNoVGVybSB8fCBzZWxlY3RlZEdlbnJlIHx8IHNlbGVjdGVkWWVhciB8fCBzb3J0QnkgIT09ICd0aXR1bG8nIHx8IHNvcnRPcmRlciAhPT0gJ2FzYycpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbGVhckZpbHRlcnN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNtIGJnLXB1cnBsZS0yMDAgaG92ZXI6YmctcHVycGxlLTMwMCB0ZXh0LXB1cnBsZS04MDAgcHgtMyBweS0xIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIExpbXBpYXIgZmlsdHJvc1xuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtMTAwIHRvLXBpbmstMTAwIHAtNCBib3JkZXItYiBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNCBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBTZWxlY2Npb25hciBOb3ZlbGFzICh7c2VsZWN0ZWROb3ZlbGFzLmxlbmd0aH0gc2VsZWNjaW9uYWRhcylcbiAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3NlbGVjdEFsbE5vdmVsYXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1wdXJwbGUtNTAwIGhvdmVyOmJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBweC0zIHB5LTIgcm91bmRlZC1sZyB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBUb2Rhc1xuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyQWxsTm92ZWxhc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYXktNTAwIGhvdmVyOmJnLWdyYXktNjAwIHRleHQtd2hpdGUgcHgtMyBweS0yIHJvdW5kZWQtbGcgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmluZ3VuYVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFRvdGFscyBzdW1tYXJ5ICovfVxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZE5vdmVsYXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MCB0by1ibHVlLTUwIHAtNCBib3JkZXItYiBib3JkZXItZ3JheS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENhbGN1bGF0b3IgY2xhc3NOYW1lPVwiaC02IHctNiB0ZXh0LWdyZWVuLTYwMCBtci0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPlJlc3VtZW4gZGUgU2VsZWNjacOzbjwvaDU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC00IG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgcC0zIGJvcmRlciBib3JkZXItZ3JheS0yMDAgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtcHVycGxlLTYwMFwiPntzZWxlY3RlZE5vdmVsYXMubGVuZ3RofTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj5Ob3ZlbGFzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLWxnIHAtMyBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWJsdWUtNjAwXCI+e3RvdGFscy50b3RhbENhcGl0dWxvc308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+Q2Fww610dWxvczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgcm91bmRlZC1sZyBwLTMgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmVlbi02MDBcIj4kXFwke3RvdGFscy5jYXNoVG90YWwudG9Mb2NhbGVTdHJpbmcoKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+RWZlY3Rpdm88L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgcC0zIGJvcmRlciBib3JkZXItZ3JheS0yMDAgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtb3JhbmdlLTYwMFwiPiRcXCR7dG90YWxzLnRyYW5zZmVyVG90YWwudG9Mb2NhbGVTdHJpbmcoKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+VHJhbnNmZXJlbmNpYTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTEwMCB0by1ibHVlLTEwMCByb3VuZGVkLWxnIHAtNCBib3JkZXItMiBib3JkZXItZ3JlZW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj5UT1RBTCBBIFBBR0FSOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyZWVuLTYwMFwiPiRcXCR7dG90YWxzLmdyYW5kVG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHt0b3RhbHMudHJhbnNmZXJGZWUgPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LW9yYW5nZS02MDAgbXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBJbmNsdXllICRcXCR7dG90YWxzLnRyYW5zZmVyRmVlLnRvTG9jYWxlU3RyaW5nKCl9IENVUCBkZSByZWNhcmdvIHBvciB0cmFuc2ZlcmVuY2lhICh7dHJhbnNmZXJGZWVQZXJjZW50YWdlfSUpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC1oLTk2IG92ZXJmbG93LXktYXV0byBwLTRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyZWROb3ZlbGFzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWROb3ZlbGFzLm1hcCgobm92ZWxhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkTm92ZWxhcy5pbmNsdWRlcyhub3ZlbGEuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDb3N0ID0gbm92ZWxhLmNhcGl0dWxvcyAqIG5vdmVsUHJpY2VQZXJDaGFwdGVyO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zZmVyQ29zdCA9IE1hdGgucm91bmQoYmFzZUNvc3QgKiAoMSArIHRyYW5zZmVyRmVlUGVyY2VudGFnZSAvIDEwMCkpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsQ29zdCA9IG5vdmVsYS5wYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJyA/IHRyYW5zZmVyQ29zdCA6IGJhc2VDb3N0O1xuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17bm92ZWxhLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xcYHAtNCByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBcXCR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS01MCBib3JkZXItcHVycGxlLTMwMCBzaGFkb3ctbWQnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JheS01MCBib3JkZXItZ3JheS0yMDAgaG92ZXI6YmctcHVycGxlLTI1IGhvdmVyOmJvcmRlci1wdXJwbGUtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XFxgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgc3BhY2UteC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17aXNTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBoYW5kbGVOb3ZlbFRvZ2dsZShub3ZlbGEuaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMSBoLTUgdy01IHRleHQtcHVycGxlLTYwMCBmb2N1czpyaW5nLXB1cnBsZS01MDAgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0zIHNtOnNwYWNlLXktMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCI+e25vdmVsYS50aXR1bG99PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTIgdGV4dC1zbSB0ZXh0LWdyYXktNjAwIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtNzAwIHB4LTIgcHktMSByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25vdmVsYS5nZW5lcm99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy1ibHVlLTEwMCB0ZXh0LWJsdWUtNzAwIHB4LTIgcHktMSByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25vdmVsYS5jYXBpdHVsb3N9IGNhcMOtdHVsb3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTcwMCBweC0yIHB5LTEgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtub3ZlbGEuYcOxb31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogUGF5bWVudCB0eXBlIHNlbGVjdG9yICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIgc3BhY2UteS0yIHNtOnNwYWNlLXktMCBzbTpzcGFjZS14LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMFwiPlRpcG8gZGUgcGFnbzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVQYXltZW50VHlwZUNoYW5nZShub3ZlbGEuaWQsICdjYXNoJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcXGBweC0zIHB5LTIgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgXFwke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm92ZWxhLnBheW1lbnRUeXBlID09PSAnY2FzaCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JlZW4tNTAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYXktMjAwIHRleHQtZ3JheS02MDAgaG92ZXI6YmctZ3JlZW4tMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cXGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG9sbGFyU2lnbiBjbGFzc05hbWU9XCJoLTMgdy0zIGlubGluZSBtci0xXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZmVjdGl2b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVBheW1lbnRUeXBlQ2hhbmdlKG5vdmVsYS5pZCwgJ3RyYW5zZmVyJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcXGBweC0zIHB5LTIgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgXFwke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm92ZWxhLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLW9yYW5nZS01MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JheS0yMDAgdGV4dC1ncmF5LTYwMCBob3ZlcjpiZy1vcmFuZ2UtMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cXGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q3JlZGl0Q2FyZCBjbGFzc05hbWU9XCJoLTMgdy0zIGlubGluZSBtci0xXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFuc2ZlcmVuY2lhICgre3RyYW5zZmVyRmVlUGVyY2VudGFnZX0lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodCBzbTptbC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1xcYHRleHQtbGcgZm9udC1ib2xkIFxcJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdmVsYS5wYXltZW50VHlwZSA9PT0gJ2Nhc2gnID8gJ3RleHQtZ3JlZW4tNjAwJyA6ICd0ZXh0LW9yYW5nZS02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxcYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkXFwke2ZpbmFsQ29zdC50b0xvY2FsZVN0cmluZygpfSBDVVBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bm92ZWxhLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJhc2U6ICRcXCR7YmFzZUNvc3QudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWNhcmdvOiArJFxcJHsodHJhbnNmZXJDb3N0IC0gYmFzZUNvc3QpLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkXFwke25vdmVsUHJpY2VQZXJDaGFwdGVyfSBDVVAgw5cge25vdmVsYS5jYXBpdHVsb3N9IGNhcC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNTZWxlY3RlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LXB1cnBsZS02MDAgbXQtMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm9va09wZW4gY2xhc3NOYW1lPVwiaC0xMiB3LTEyIHRleHQtZ3JheS00MDAgbXgtYXV0byBtYi00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE5vIHNlIGVuY29udHJhcm9uIG5vdmVsYXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwIG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgTm8gaGF5IG5vdmVsYXMgcXVlIGNvaW5jaWRhbiBjb24gbG9zIGZpbHRyb3Mgc2VsZWNjaW9uYWRvcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xlYXJGaWx0ZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1wdXJwbGUtNTAwIGhvdmVyOmJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBweC00IHB5LTIgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIExpbXBpYXIgZmlsdHJvc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZE5vdmVsYXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNTAgdG8tcGluay01MCBwLTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNCBzbTpzcGFjZS15LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZE5vdmVsYXMubGVuZ3RofSBub3ZlbGFzIHNlbGVjY2lvbmFkYXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBUb3RhbDogJFxcJHt0b3RhbHMuZ3JhbmRUb3RhbC50b0xvY2FsZVN0cmluZygpfSBDVVBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtzZW5kU2VsZWN0ZWROb3ZlbGFzfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NlbGVjdGVkTm92ZWxhcy5sZW5ndGggPT09IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xcYHB4LTYgcHktMyByb3VuZGVkLXhsIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHRyYW5zZm9ybSBob3ZlcjpzY2FsZS0xMDUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgXFwke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE5vdmVsYXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdG8tZ3JlZW4tNjAwIGhvdmVyOmZyb20tZ3JlZW4tNjAwIGhvdmVyOnRvLWdyZWVuLTcwMCB0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYXktMzAwIHRleHQtZ3JheS01MDAgY3Vyc29yLW5vdC1hbGxvd2VkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxcYH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZUNpcmNsZSBjbGFzc05hbWU9XCJoLTUgdy01IG1yLTJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgRW52aWFyIHBvciBXaGF0c0FwcFxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1gO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVByaWNlQ2FyZFdpdGhFbWJlZGRlZENvbmZpZyhzeXN0ZW1Db25maWc6IFN5c3RlbUNvbmZpZyk6IHN0cmluZyB7XG4gIGNvbnN0IHByaWNlcyA9IEpTT04uc3RyaW5naWZ5KHN5c3RlbUNvbmZpZy5wcmljZXMsIG51bGwsIDIpO1xuICBcbiAgcmV0dXJuIGBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRG9sbGFyU2lnbiwgVHYsIEZpbG0sIFN0YXIsIENyZWRpdENhcmQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG4vLyBQUkVDSU9TIEVNQkVCSURPUyAtIEdlbmVyYWRvcyBhdXRvbcOhdGljYW1lbnRlXG5jb25zdCBFTUJFRERFRF9QUklDRVMgPSAke3ByaWNlc307XG5cbmludGVyZmFjZSBQcmljZUNhcmRQcm9wcyB7XG4gIHR5cGU6ICdtb3ZpZScgfCAndHYnO1xuICBzZWxlY3RlZFNlYXNvbnM/OiBudW1iZXJbXTtcbiAgZXBpc29kZUNvdW50PzogbnVtYmVyO1xuICBpc0FuaW1lPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByaWNlQ2FyZCh7IHR5cGUsIHNlbGVjdGVkU2Vhc29ucyA9IFtdLCBlcGlzb2RlQ291bnQgPSAwLCBpc0FuaW1lID0gZmFsc2UgfTogUHJpY2VDYXJkUHJvcHMpIHtcbiAgLy8gVXNlIGVtYmVkZGVkIHByaWNlc1xuICBjb25zdCBtb3ZpZVByaWNlID0gRU1CRURERURfUFJJQ0VTLm1vdmllUHJpY2U7XG4gIGNvbnN0IHNlcmllc1ByaWNlID0gRU1CRURERURfUFJJQ0VTLnNlcmllc1ByaWNlO1xuICBjb25zdCB0cmFuc2ZlckZlZVBlcmNlbnRhZ2UgPSBFTUJFRERFRF9QUklDRVMudHJhbnNmZXJGZWVQZXJjZW50YWdlO1xuICBcbiAgY29uc3QgY2FsY3VsYXRlUHJpY2UgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGUgPT09ICdtb3ZpZScpIHtcbiAgICAgIHJldHVybiBtb3ZpZVByaWNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXJpZXM6IGR5bmFtaWMgcHJpY2UgcGVyIHNlYXNvblxuICAgICAgcmV0dXJuIHNlbGVjdGVkU2Vhc29ucy5sZW5ndGggKiBzZXJpZXNQcmljZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcHJpY2UgPSBjYWxjdWxhdGVQcmljZSgpO1xuICBjb25zdCB0cmFuc2ZlclByaWNlID0gTWF0aC5yb3VuZChwcmljZSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSk7XG4gIFxuICBjb25zdCBnZXRJY29uID0gKCkgPT4ge1xuICAgIGlmICh0eXBlID09PSAnbW92aWUnKSB7XG4gICAgICByZXR1cm4gaXNBbmltZSA/ICfwn46MJyA6ICfwn46sJztcbiAgICB9XG4gICAgcmV0dXJuIGlzQW5pbWUgPyAn8J+OjCcgOiAn8J+Tuic7XG4gIH07XG5cbiAgY29uc3QgZ2V0VHlwZUxhYmVsID0gKCkgPT4ge1xuICAgIGlmICh0eXBlID09PSAnbW92aWUnKSB7XG4gICAgICByZXR1cm4gaXNBbmltZSA/ICdQZWzDrWN1bGEgQW5pbWFkYScgOiAnUGVsw61jdWxhJztcbiAgICB9XG4gICAgcmV0dXJuIGlzQW5pbWUgPyAnQW5pbWUnIDogJ1NlcmllJztcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1ncmVlbi01MCB2aWEtZW1lcmFsZC01MCB0by10ZWFsLTUwIHJvdW5kZWQtMnhsIHAtNiBib3JkZXItMiBib3JkZXItZ3JlZW4tMzAwIHNoYWRvdy14bCB0cmFuc2Zvcm0gaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNDAwIHRvLWVtZXJhbGQtNDAwIHAtMyByb3VuZGVkLXhsIG1yLTQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPntnZXRJY29uKCl9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1ibGFjayB0ZXh0LWdyZWVuLTgwMCB0ZXh0LWxnXCI+e2dldFR5cGVMYWJlbCgpfTwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTYwMCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAge3R5cGUgPT09ICd0dicgJiYgc2VsZWN0ZWRTZWFzb25zLmxlbmd0aCA+IDAgXG4gICAgICAgICAgICAgICAgPyBcXGBcXCR7c2VsZWN0ZWRTZWFzb25zLmxlbmd0aH0gdGVtcG9yYWRhXFwke3NlbGVjdGVkU2Vhc29ucy5sZW5ndGggPiAxID8gJ3MnIDogJyd9XFxgXG4gICAgICAgICAgICAgICAgOiAnQ29udGVuaWRvIGNvbXBsZXRvJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1ncmVlbi01MDAgdG8tZW1lcmFsZC01MDAgdGV4dC13aGl0ZSBwLTMgcm91bmRlZC1mdWxsIHNoYWRvdy1sZyBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgPERvbGxhclNpZ24gY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgIHsvKiBDYXNoIFByaWNlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS13aGl0ZSB0by1ncmVlbi01MCByb3VuZGVkLXhsIHAtNCBib3JkZXItMiBib3JkZXItZ3JlZW4tMjAwIHNoYWRvdy1tZCBob3ZlcjpzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1ncmVlbi03MDAgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmVlbi0xMDAgcC0xIHJvdW5kZWQtbGcgbXItMlwiPlxuICAgICAgICAgICAgICAgIDxEb2xsYXJTaWduIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgRWZlY3Rpdm9cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ibGFjayB0ZXh0LWdyZWVuLTcwMFwiPlxuICAgICAgICAgICAgICAkXFwke3ByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IENVUFxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBUcmFuc2ZlciBQcmljZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tb3JhbmdlLTUwIHRvLXJlZC01MCByb3VuZGVkLXhsIHAtNCBib3JkZXItMiBib3JkZXItb3JhbmdlLTIwMCBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtb3JhbmdlLTcwMCBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLW9yYW5nZS0xMDAgcC0xIHJvdW5kZWQtbGcgbXItMlwiPlxuICAgICAgICAgICAgICAgIDxDcmVkaXRDYXJkIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgVHJhbnNmZXJlbmNpYVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJsYWNrIHRleHQtb3JhbmdlLTcwMFwiPlxuICAgICAgICAgICAgICAkXFwke3RyYW5zZmVyUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gQ1VQXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtb3JhbmdlLTYwMCBmb250LXNlbWlib2xkIGJnLW9yYW5nZS0xMDAgcHgtMiBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgK3t0cmFuc2ZlckZlZVBlcmNlbnRhZ2V9JSByZWNhcmdvIGJhbmNhcmlvXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAge3R5cGUgPT09ICd0dicgJiYgc2VsZWN0ZWRTZWFzb25zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyZWVuLTYwMCBmb250LWJvbGQgdGV4dC1jZW50ZXIgYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTEwMCB0by1lbWVyYWxkLTEwMCByb3VuZGVkLXhsIHAtMyBib3JkZXIgYm9yZGVyLWdyZWVuLTIwMFwiPlxuICAgICAgICAgICAgJFxcJHsocHJpY2UgLyBzZWxlY3RlZFNlYXNvbnMubGVuZ3RoKS50b0xvY2FsZVN0cmluZygpfSBDVVAgcG9yIHRlbXBvcmFkYSAoZWZlY3Rpdm8pXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1gO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUFkbWluQ29udGV4dFdpdGhFbWJlZGRlZENvbmZpZyhzeXN0ZW1Db25maWc6IFN5c3RlbUNvbmZpZyk6IHN0cmluZyB7XG4gIGNvbnN0IGNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHN5c3RlbUNvbmZpZywgbnVsbCwgMik7XG4gIFxuICByZXR1cm4gYGltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VSZWR1Y2VyLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnO1xuXG4vLyBDT05GSUdVUkFDScOTTiBFTUJFQklEQSAtIEdlbmVyYWRhIGF1dG9tw6F0aWNhbWVudGVcbmNvbnN0IEVNQkVEREVEX0NPTkZJRyA9ICR7Y29uZmlnfTtcblxuLy8gQ1JFREVOQ0lBTEVTIERFIEFDQ0VTTyAoQ09ORklHVVJBQkxFUylcbmNvbnN0IEFETUlOX0NSRURFTlRJQUxTID0ge1xuICB1c2VybmFtZTogJ2FkbWluJyxcbiAgcGFzc3dvcmQ6ICd0dmFsYWNhcnRhMjAyNCdcbn07XG5cbi8vIFR5cGVzXG5leHBvcnQgaW50ZXJmYWNlIFByaWNlQ29uZmlnIHtcbiAgbW92aWVQcmljZTogbnVtYmVyO1xuICBzZXJpZXNQcmljZTogbnVtYmVyO1xuICB0cmFuc2ZlckZlZVBlcmNlbnRhZ2U6IG51bWJlcjtcbiAgbm92ZWxQcmljZVBlckNoYXB0ZXI6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWxpdmVyeVpvbmUge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvc3Q6IG51bWJlcjtcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gIHVwZGF0ZWRBdDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vdmVsIHtcbiAgaWQ6IG51bWJlcjtcbiAgdGl0dWxvOiBzdHJpbmc7XG4gIGdlbmVybzogc3RyaW5nO1xuICBjYXBpdHVsb3M6IG51bWJlcjtcbiAgYcOxbzogbnVtYmVyO1xuICBkZXNjcmlwY2lvbj86IHN0cmluZztcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gIHVwZGF0ZWRBdDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbiB7XG4gIGlkOiBzdHJpbmc7XG4gIHR5cGU6ICdzdWNjZXNzJyB8ICdlcnJvcicgfCAnd2FybmluZycgfCAnaW5mbyc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgdGltZXN0YW1wOiBzdHJpbmc7XG4gIHNlY3Rpb246IHN0cmluZztcbiAgYWN0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3luY1N0YXR1cyB7XG4gIGxhc3RTeW5jOiBzdHJpbmc7XG4gIGlzT25saW5lOiBib29sZWFuO1xuICBwZW5kaW5nQ2hhbmdlczogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN5c3RlbUNvbmZpZyB7XG4gIHZlcnNpb246IHN0cmluZztcbiAgbGFzdEV4cG9ydDogc3RyaW5nO1xuICBwcmljZXM6IFByaWNlQ29uZmlnO1xuICBkZWxpdmVyeVpvbmVzOiBEZWxpdmVyeVpvbmVbXTtcbiAgbm92ZWxzOiBOb3ZlbFtdO1xuICBzZXR0aW5nczoge1xuICAgIGF1dG9TeW5jOiBib29sZWFuO1xuICAgIHN5bmNJbnRlcnZhbDogbnVtYmVyO1xuICAgIGVuYWJsZU5vdGlmaWNhdGlvbnM6IGJvb2xlYW47XG4gICAgbWF4Tm90aWZpY2F0aW9uczogbnVtYmVyO1xuICB9O1xuICBtZXRhZGF0YToge1xuICAgIHRvdGFsT3JkZXJzOiBudW1iZXI7XG4gICAgdG90YWxSZXZlbnVlOiBudW1iZXI7XG4gICAgbGFzdE9yZGVyRGF0ZTogc3RyaW5nO1xuICAgIHN5c3RlbVVwdGltZTogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFkbWluU3RhdGUge1xuICBpc0F1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XG4gIHByaWNlczogUHJpY2VDb25maWc7XG4gIGRlbGl2ZXJ5Wm9uZXM6IERlbGl2ZXJ5Wm9uZVtdO1xuICBub3ZlbHM6IE5vdmVsW107XG4gIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbltdO1xuICBzeW5jU3RhdHVzOiBTeW5jU3RhdHVzO1xuICBzeXN0ZW1Db25maWc6IFN5c3RlbUNvbmZpZztcbn1cblxudHlwZSBBZG1pbkFjdGlvbiA9IFxuICB8IHsgdHlwZTogJ0xPR0lOJzsgcGF5bG9hZDogeyB1c2VybmFtZTogc3RyaW5nOyBwYXNzd29yZDogc3RyaW5nIH0gfVxuICB8IHsgdHlwZTogJ0xPR09VVCcgfVxuICB8IHsgdHlwZTogJ1VQREFURV9QUklDRVMnOyBwYXlsb2FkOiBQcmljZUNvbmZpZyB9XG4gIHwgeyB0eXBlOiAnQUREX0RFTElWRVJZX1pPTkUnOyBwYXlsb2FkOiBPbWl0PERlbGl2ZXJ5Wm9uZSwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3VwZGF0ZWRBdCc+IH1cbiAgfCB7IHR5cGU6ICdVUERBVEVfREVMSVZFUllfWk9ORSc7IHBheWxvYWQ6IERlbGl2ZXJ5Wm9uZSB9XG4gIHwgeyB0eXBlOiAnREVMRVRFX0RFTElWRVJZX1pPTkUnOyBwYXlsb2FkOiBudW1iZXIgfVxuICB8IHsgdHlwZTogJ0FERF9OT1ZFTCc7IHBheWxvYWQ6IE9taXQ8Tm92ZWwsICdpZCcgfCAnY3JlYXRlZEF0JyB8ICd1cGRhdGVkQXQnPiB9XG4gIHwgeyB0eXBlOiAnVVBEQVRFX05PVkVMJzsgcGF5bG9hZDogTm92ZWwgfVxuICB8IHsgdHlwZTogJ0RFTEVURV9OT1ZFTCc7IHBheWxvYWQ6IG51bWJlciB9XG4gIHwgeyB0eXBlOiAnQUREX05PVElGSUNBVElPTic7IHBheWxvYWQ6IE9taXQ8Tm90aWZpY2F0aW9uLCAnaWQnIHwgJ3RpbWVzdGFtcCc+IH1cbiAgfCB7IHR5cGU6ICdDTEVBUl9OT1RJRklDQVRJT05TJyB9XG4gIHwgeyB0eXBlOiAnVVBEQVRFX1NZTkNfU1RBVFVTJzsgcGF5bG9hZDogUGFydGlhbDxTeW5jU3RhdHVzPiB9XG4gIHwgeyB0eXBlOiAnU1lOQ19TVEFURSc7IHBheWxvYWQ6IFBhcnRpYWw8QWRtaW5TdGF0ZT4gfVxuICB8IHsgdHlwZTogJ0xPQURfU1lTVEVNX0NPTkZJRyc7IHBheWxvYWQ6IFN5c3RlbUNvbmZpZyB9XG4gIHwgeyB0eXBlOiAnVVBEQVRFX1NZU1RFTV9DT05GSUcnOyBwYXlsb2FkOiBQYXJ0aWFsPFN5c3RlbUNvbmZpZz4gfTtcblxuaW50ZXJmYWNlIEFkbWluQ29udGV4dFR5cGUge1xuICBzdGF0ZTogQWRtaW5TdGF0ZTtcbiAgbG9naW46ICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiBib29sZWFuO1xuICBsb2dvdXQ6ICgpID0+IHZvaWQ7XG4gIHVwZGF0ZVByaWNlczogKHByaWNlczogUHJpY2VDb25maWcpID0+IHZvaWQ7XG4gIGFkZERlbGl2ZXJ5Wm9uZTogKHpvbmU6IE9taXQ8RGVsaXZlcnlab25lLCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAndXBkYXRlZEF0Jz4pID0+IHZvaWQ7XG4gIHVwZGF0ZURlbGl2ZXJ5Wm9uZTogKHpvbmU6IERlbGl2ZXJ5Wm9uZSkgPT4gdm9pZDtcbiAgZGVsZXRlRGVsaXZlcnlab25lOiAoaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgYWRkTm92ZWw6IChub3ZlbDogT21pdDxOb3ZlbCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3VwZGF0ZWRBdCc+KSA9PiB2b2lkO1xuICB1cGRhdGVOb3ZlbDogKG5vdmVsOiBOb3ZlbCkgPT4gdm9pZDtcbiAgZGVsZXRlTm92ZWw6IChpZDogbnVtYmVyKSA9PiB2b2lkO1xuICBhZGROb3RpZmljYXRpb246IChub3RpZmljYXRpb246IE9taXQ8Tm90aWZpY2F0aW9uLCAnaWQnIHwgJ3RpbWVzdGFtcCc+KSA9PiB2b2lkO1xuICBjbGVhck5vdGlmaWNhdGlvbnM6ICgpID0+IHZvaWQ7XG4gIGV4cG9ydFN5c3RlbUNvbmZpZzogKCkgPT4gdm9pZDtcbiAgaW1wb3J0U3lzdGVtQ29uZmlnOiAoY29uZmlnOiBTeXN0ZW1Db25maWcpID0+IHZvaWQ7XG4gIGV4cG9ydENvbXBsZXRlU291cmNlQ29kZTogKCkgPT4gdm9pZDtcbiAgc3luY1dpdGhSZW1vdGU6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIGJyb2FkY2FzdENoYW5nZTogKGNoYW5nZTogYW55KSA9PiB2b2lkO1xuICBzeW5jQWxsU2VjdGlvbnM6ICgpID0+IFByb21pc2U8dm9pZD47XG59XG5cbi8vIEluaXRpYWwgc3RhdGUgd2l0aCBlbWJlZGRlZCBjb25maWd1cmF0aW9uXG5jb25zdCBpbml0aWFsU3RhdGU6IEFkbWluU3RhdGUgPSB7XG4gIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXG4gIHByaWNlczogRU1CRURERURfQ09ORklHLnByaWNlcyxcbiAgZGVsaXZlcnlab25lczogRU1CRURERURfQ09ORklHLmRlbGl2ZXJ5Wm9uZXMsXG4gIG5vdmVsczogRU1CRURERURfQ09ORklHLm5vdmVscyxcbiAgbm90aWZpY2F0aW9uczogW10sXG4gIHN5bmNTdGF0dXM6IHtcbiAgICBsYXN0U3luYzogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgIGlzT25saW5lOiB0cnVlLFxuICAgIHBlbmRpbmdDaGFuZ2VzOiAwLFxuICB9LFxuICBzeXN0ZW1Db25maWc6IEVNQkVEREVEX0NPTkZJRyxcbn07XG5cbi8vIFJlZHVjZXJcbmZ1bmN0aW9uIGFkbWluUmVkdWNlcihzdGF0ZTogQWRtaW5TdGF0ZSwgYWN0aW9uOiBBZG1pbkFjdGlvbik6IEFkbWluU3RhdGUge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnTE9HSU4nOlxuICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkLnVzZXJuYW1lID09PSBBRE1JTl9DUkVERU5USUFMUy51c2VybmFtZSAmJiBhY3Rpb24ucGF5bG9hZC5wYXNzd29yZCA9PT0gQURNSU5fQ1JFREVOVElBTFMucGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGlzQXV0aGVudGljYXRlZDogdHJ1ZSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuXG4gICAgY2FzZSAnTE9HT1VUJzpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlIH07XG5cbiAgICBjYXNlICdVUERBVEVfUFJJQ0VTJzpcbiAgICAgIGNvbnN0IHVwZGF0ZWRDb25maWcgPSB7XG4gICAgICAgIC4uLnN0YXRlLnN5c3RlbUNvbmZpZyxcbiAgICAgICAgcHJpY2VzOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgbGFzdEV4cG9ydDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwcmljZXM6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBzeXN0ZW1Db25maWc6IHVwZGF0ZWRDb25maWcsXG4gICAgICAgIHN5bmNTdGF0dXM6IHsgLi4uc3RhdGUuc3luY1N0YXR1cywgcGVuZGluZ0NoYW5nZXM6IHN0YXRlLnN5bmNTdGF0dXMucGVuZGluZ0NoYW5nZXMgKyAxIH1cbiAgICAgIH07XG5cbiAgICBjYXNlICdBRERfREVMSVZFUllfWk9ORSc6XG4gICAgICBjb25zdCBuZXdab25lOiBEZWxpdmVyeVpvbmUgPSB7XG4gICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpZDogRGF0ZS5ub3coKSxcbiAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGNvbmZpZ1dpdGhOZXdab25lID0ge1xuICAgICAgICAuLi5zdGF0ZS5zeXN0ZW1Db25maWcsXG4gICAgICAgIGRlbGl2ZXJ5Wm9uZXM6IFsuLi5zdGF0ZS5zeXN0ZW1Db25maWcuZGVsaXZlcnlab25lcywgbmV3Wm9uZV0sXG4gICAgICAgIGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGVsaXZlcnlab25lczogWy4uLnN0YXRlLmRlbGl2ZXJ5Wm9uZXMsIG5ld1pvbmVdLFxuICAgICAgICBzeXN0ZW1Db25maWc6IGNvbmZpZ1dpdGhOZXdab25lLFxuICAgICAgICBzeW5jU3RhdHVzOiB7IC4uLnN0YXRlLnN5bmNTdGF0dXMsIHBlbmRpbmdDaGFuZ2VzOiBzdGF0ZS5zeW5jU3RhdHVzLnBlbmRpbmdDaGFuZ2VzICsgMSB9XG4gICAgICB9O1xuXG4gICAgY2FzZSAnVVBEQVRFX0RFTElWRVJZX1pPTkUnOlxuICAgICAgY29uc3QgdXBkYXRlZFpvbmVzID0gc3RhdGUuZGVsaXZlcnlab25lcy5tYXAoem9uZSA9PlxuICAgICAgICB6b25lLmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZFxuICAgICAgICAgID8geyAuLi5hY3Rpb24ucGF5bG9hZCwgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfVxuICAgICAgICAgIDogem9uZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbmZpZ1dpdGhVcGRhdGVkWm9uZSA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3lzdGVtQ29uZmlnLFxuICAgICAgICBkZWxpdmVyeVpvbmVzOiB1cGRhdGVkWm9uZXMsXG4gICAgICAgIGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGVsaXZlcnlab25lczogdXBkYXRlZFpvbmVzLFxuICAgICAgICBzeXN0ZW1Db25maWc6IGNvbmZpZ1dpdGhVcGRhdGVkWm9uZSxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCBwZW5kaW5nQ2hhbmdlczogc3RhdGUuc3luY1N0YXR1cy5wZW5kaW5nQ2hhbmdlcyArIDEgfVxuICAgICAgfTtcblxuICAgIGNhc2UgJ0RFTEVURV9ERUxJVkVSWV9aT05FJzpcbiAgICAgIGNvbnN0IGZpbHRlcmVkWm9uZXMgPSBzdGF0ZS5kZWxpdmVyeVpvbmVzLmZpbHRlcih6b25lID0+IHpvbmUuaWQgIT09IGFjdGlvbi5wYXlsb2FkKTtcbiAgICAgIGNvbnN0IGNvbmZpZ1dpdGhEZWxldGVkWm9uZSA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3lzdGVtQ29uZmlnLFxuICAgICAgICBkZWxpdmVyeVpvbmVzOiBmaWx0ZXJlZFpvbmVzLFxuICAgICAgICBsYXN0RXhwb3J0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGRlbGl2ZXJ5Wm9uZXM6IGZpbHRlcmVkWm9uZXMsXG4gICAgICAgIHN5c3RlbUNvbmZpZzogY29uZmlnV2l0aERlbGV0ZWRab25lLFxuICAgICAgICBzeW5jU3RhdHVzOiB7IC4uLnN0YXRlLnN5bmNTdGF0dXMsIHBlbmRpbmdDaGFuZ2VzOiBzdGF0ZS5zeW5jU3RhdHVzLnBlbmRpbmdDaGFuZ2VzICsgMSB9XG4gICAgICB9O1xuXG4gICAgY2FzZSAnQUREX05PVkVMJzpcbiAgICAgIGNvbnN0IG5ld05vdmVsOiBOb3ZlbCA9IHtcbiAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIGlkOiBEYXRlLm5vdygpLFxuICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9O1xuICAgICAgY29uc3QgY29uZmlnV2l0aE5ld05vdmVsID0ge1xuICAgICAgICAuLi5zdGF0ZS5zeXN0ZW1Db25maWcsXG4gICAgICAgIG5vdmVsczogWy4uLnN0YXRlLnN5c3RlbUNvbmZpZy5ub3ZlbHMsIG5ld05vdmVsXSxcbiAgICAgICAgbGFzdEV4cG9ydDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBub3ZlbHM6IFsuLi5zdGF0ZS5ub3ZlbHMsIG5ld05vdmVsXSxcbiAgICAgICAgc3lzdGVtQ29uZmlnOiBjb25maWdXaXRoTmV3Tm92ZWwsXG4gICAgICAgIHN5bmNTdGF0dXM6IHsgLi4uc3RhdGUuc3luY1N0YXR1cywgcGVuZGluZ0NoYW5nZXM6IHN0YXRlLnN5bmNTdGF0dXMucGVuZGluZ0NoYW5nZXMgKyAxIH1cbiAgICAgIH07XG5cbiAgICBjYXNlICdVUERBVEVfTk9WRUwnOlxuICAgICAgY29uc3QgdXBkYXRlZE5vdmVscyA9IHN0YXRlLm5vdmVscy5tYXAobm92ZWwgPT5cbiAgICAgICAgbm92ZWwuaWQgPT09IGFjdGlvbi5wYXlsb2FkLmlkXG4gICAgICAgICAgPyB7IC4uLmFjdGlvbi5wYXlsb2FkLCB1cGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9XG4gICAgICAgICAgOiBub3ZlbFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbmZpZ1dpdGhVcGRhdGVkTm92ZWwgPSB7XG4gICAgICAgIC4uLnN0YXRlLnN5c3RlbUNvbmZpZyxcbiAgICAgICAgbm92ZWxzOiB1cGRhdGVkTm92ZWxzLFxuICAgICAgICBsYXN0RXhwb3J0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5vdmVsczogdXBkYXRlZE5vdmVscyxcbiAgICAgICAgc3lzdGVtQ29uZmlnOiBjb25maWdXaXRoVXBkYXRlZE5vdmVsLFxuICAgICAgICBzeW5jU3RhdHVzOiB7IC4uLnN0YXRlLnN5bmNTdGF0dXMsIHBlbmRpbmdDaGFuZ2VzOiBzdGF0ZS5zeW5jU3RhdHVzLnBlbmRpbmdDaGFuZ2VzICsgMSB9XG4gICAgICB9O1xuXG4gICAgY2FzZSAnREVMRVRFX05PVkVMJzpcbiAgICAgIGNvbnN0IGZpbHRlcmVkTm92ZWxzID0gc3RhdGUubm92ZWxzLmZpbHRlcihub3ZlbCA9PiBub3ZlbC5pZCAhPT0gYWN0aW9uLnBheWxvYWQpO1xuICAgICAgY29uc3QgY29uZmlnV2l0aERlbGV0ZWROb3ZlbCA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3lzdGVtQ29uZmlnLFxuICAgICAgICBub3ZlbHM6IGZpbHRlcmVkTm92ZWxzLFxuICAgICAgICBsYXN0RXhwb3J0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5vdmVsczogZmlsdGVyZWROb3ZlbHMsXG4gICAgICAgIHN5c3RlbUNvbmZpZzogY29uZmlnV2l0aERlbGV0ZWROb3ZlbCxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCBwZW5kaW5nQ2hhbmdlczogc3RhdGUuc3luY1N0YXR1cy5wZW5kaW5nQ2hhbmdlcyArIDEgfVxuICAgICAgfTtcblxuICAgIGNhc2UgJ0FERF9OT1RJRklDQVRJT04nOlxuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24gPSB7XG4gICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbm90aWZpY2F0aW9uczogW25vdGlmaWNhdGlvbiwgLi4uc3RhdGUubm90aWZpY2F0aW9uc10uc2xpY2UoMCwgc3RhdGUuc3lzdGVtQ29uZmlnLnNldHRpbmdzLm1heE5vdGlmaWNhdGlvbnMpLFxuICAgICAgfTtcblxuICAgIGNhc2UgJ0NMRUFSX05PVElGSUNBVElPTlMnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IFtdLFxuICAgICAgfTtcblxuICAgIGNhc2UgJ1VQREFURV9TWU5DX1NUQVRVUyc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCAuLi5hY3Rpb24ucGF5bG9hZCB9LFxuICAgICAgfTtcblxuICAgIGNhc2UgJ0xPQURfU1lTVEVNX0NPTkZJRyc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcHJpY2VzOiBhY3Rpb24ucGF5bG9hZC5wcmljZXMsXG4gICAgICAgIGRlbGl2ZXJ5Wm9uZXM6IGFjdGlvbi5wYXlsb2FkLmRlbGl2ZXJ5Wm9uZXMsXG4gICAgICAgIG5vdmVsczogYWN0aW9uLnBheWxvYWQubm92ZWxzLFxuICAgICAgICBzeXN0ZW1Db25maWc6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBzeW5jU3RhdHVzOiB7IC4uLnN0YXRlLnN5bmNTdGF0dXMsIGxhc3RTeW5jOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIHBlbmRpbmdDaGFuZ2VzOiAwIH1cbiAgICAgIH07XG5cbiAgICBjYXNlICdVUERBVEVfU1lTVEVNX0NPTkZJRyc6XG4gICAgICBjb25zdCBuZXdTeXN0ZW1Db25maWcgPSB7IC4uLnN0YXRlLnN5c3RlbUNvbmZpZywgLi4uYWN0aW9uLnBheWxvYWQgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzeXN0ZW1Db25maWc6IG5ld1N5c3RlbUNvbmZpZyxcbiAgICAgIH07XG5cbiAgICBjYXNlICdTWU5DX1NUQVRFJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgc3luY1N0YXR1czogeyAuLi5zdGF0ZS5zeW5jU3RhdHVzLCBsYXN0U3luYzogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLCBwZW5kaW5nQ2hhbmdlczogMCB9XG4gICAgICB9O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG4vLyBDb250ZXh0IGNyZWF0aW9uXG5jb25zdCBBZG1pbkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEFkbWluQ29udGV4dFR5cGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbi8vIFJlYWwtdGltZSBzeW5jIHNlcnZpY2VcbmNsYXNzIFJlYWxUaW1lU3luY1NlcnZpY2Uge1xuICBwcml2YXRlIGxpc3RlbmVyczogU2V0PChkYXRhOiBhbnkpID0+IHZvaWQ+ID0gbmV3IFNldCgpO1xuICBwcml2YXRlIHN5bmNJbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzdG9yYWdlS2V5ID0gJ2FkbWluX3N5c3RlbV9zdGF0ZSc7XG4gIHByaXZhdGUgY29uZmlnS2V5ID0gJ3N5c3RlbV9jb25maWcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZVN5bmMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVN5bmMoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCB0aGlzLmhhbmRsZVN0b3JhZ2VDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zeW5jSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrRm9yVXBkYXRlcygpO1xuICAgIH0sIDUwMDApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICB0aGlzLmNoZWNrRm9yVXBkYXRlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTdG9yYWdlQ2hhbmdlKGV2ZW50OiBTdG9yYWdlRXZlbnQpIHtcbiAgICBpZiAoKGV2ZW50LmtleSA9PT0gdGhpcy5zdG9yYWdlS2V5IHx8IGV2ZW50LmtleSA9PT0gdGhpcy5jb25maWdLZXkpICYmIGV2ZW50Lm5ld1ZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IEpTT04ucGFyc2UoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyhuZXdTdGF0ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIHN5bmMgZGF0YTonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0ZvclVwZGF0ZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0b3JlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICBjb25zdCBjb25maWcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbmZpZ0tleSk7XG4gICAgICBcbiAgICAgIGlmIChzdG9yZWQpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3RhdGUgPSBKU09OLnBhcnNlKHN0b3JlZCk7XG4gICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKHN0b3JlZFN0YXRlKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICBjb25zdCBjb25maWdEYXRhID0gSlNPTi5wYXJzZShjb25maWcpO1xuICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyh7IHN5c3RlbUNvbmZpZzogY29uZmlnRGF0YSB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2hlY2tpbmcgZm9yIHVwZGF0ZXM6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHN1YnNjcmliZShjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMubGlzdGVuZXJzLmFkZChjYWxsYmFjayk7XG4gICAgcmV0dXJuICgpID0+IHRoaXMubGlzdGVuZXJzLmRlbGV0ZShjYWxsYmFjayk7XG4gIH1cblxuICBicm9hZGNhc3Qoc3RhdGU6IEFkbWluU3RhdGUpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3luY0RhdGEgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KHN5bmNEYXRhKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmNvbmZpZ0tleSwgSlNPTi5zdHJpbmdpZnkoc3RhdGUuc3lzdGVtQ29uZmlnKSk7XG4gICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyhzeW5jRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGJyb2FkY2FzdGluZyBzdGF0ZTonLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnlMaXN0ZW5lcnMoZGF0YTogYW55KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIHN5bmMgbGlzdGVuZXI6JywgZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zeW5jSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zeW5jSW50ZXJ2YWwpO1xuICAgIH1cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIHRoaXMuaGFuZGxlU3RvcmFnZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmxpc3RlbmVycy5jbGVhcigpO1xuICB9XG59XG5cbi8vIFByb3ZpZGVyIGNvbXBvbmVudFxuZXhwb3J0IGZ1bmN0aW9uIEFkbWluUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoYWRtaW5SZWR1Y2VyLCBpbml0aWFsU3RhdGUpO1xuICBjb25zdCBbc3luY1NlcnZpY2VdID0gUmVhY3QudXNlU3RhdGUoKCkgPT4gbmV3IFJlYWxUaW1lU3luY1NlcnZpY2UoKSk7XG5cbiAgLy8gTG9hZCBzeXN0ZW0gY29uZmlnIG9uIHN0YXJ0dXBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RvcmVkQ29uZmlnID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N5c3RlbV9jb25maWcnKTtcbiAgICAgIGlmIChzdG9yZWRDb25maWcpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gSlNPTi5wYXJzZShzdG9yZWRDb25maWcpO1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdMT0FEX1NZU1RFTV9DT05GSUcnLCBwYXlsb2FkOiBjb25maWcgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IHN0b3JlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhZG1pbl9zeXN0ZW1fc3RhdGUnKTtcbiAgICAgIGlmIChzdG9yZWQpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3RhdGUgPSBKU09OLnBhcnNlKHN0b3JlZCk7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1NZTkNfU1RBVEUnLCBwYXlsb2FkOiBzdG9yZWRTdGF0ZSB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBpbml0aWFsIHN0YXRlOicsIGVycm9yKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICAvLyBTYXZlIHN0YXRlIGNoYW5nZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FkbWluX3N5c3RlbV9zdGF0ZScsIEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3lzdGVtX2NvbmZpZycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLnN5c3RlbUNvbmZpZykpO1xuICAgICAgc3luY1NlcnZpY2UuYnJvYWRjYXN0KHN0YXRlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHN0YXRlOicsIGVycm9yKTtcbiAgICB9XG4gIH0sIFtzdGF0ZSwgc3luY1NlcnZpY2VdKTtcblxuICAvLyBSZWFsLXRpbWUgc3luYyBsaXN0ZW5lclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gc3luY1NlcnZpY2Uuc3Vic2NyaWJlKChzeW5jZWRTdGF0ZSkgPT4ge1xuICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHN5bmNlZFN0YXRlKSAhPT0gSlNPTi5zdHJpbmdpZnkoc3RhdGUpKSB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1NZTkNfU1RBVEUnLCBwYXlsb2FkOiBzeW5jZWRTdGF0ZSB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gIH0sIFtzeW5jU2VydmljZSwgc3RhdGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzeW5jU2VydmljZS5kZXN0cm95KCk7XG4gICAgfTtcbiAgfSwgW3N5bmNTZXJ2aWNlXSk7XG5cbiAgLy8gQ29udGV4dCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG4gIGNvbnN0IGxvZ2luID0gKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdMT0dJTicsIHBheWxvYWQ6IHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0gfSk7XG4gICAgY29uc3Qgc3VjY2VzcyA9IHVzZXJuYW1lID09PSBBRE1JTl9DUkVERU5USUFMUy51c2VybmFtZSAmJiBwYXNzd29yZCA9PT0gQURNSU5fQ1JFREVOVElBTFMucGFzc3dvcmQ7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGl0bGU6ICdJbmljaW8gZGUgc2VzacOzbiBleGl0b3NvJyxcbiAgICAgICAgbWVzc2FnZTogJ0JpZW52ZW5pZG8gYWwgcGFuZWwgZGUgYWRtaW5pc3RyYWNpw7NuJyxcbiAgICAgICAgc2VjdGlvbjogJ0F1dGVudGljYWNpw7NuJyxcbiAgICAgICAgYWN0aW9uOiAnbG9naW4nXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH07XG5cbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0xPR09VVCcgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgIHRpdGxlOiAnU2VzacOzbiBjZXJyYWRhJyxcbiAgICAgIG1lc3NhZ2U6ICdIYXMgY2VycmFkbyBzZXNpw7NuIGNvcnJlY3RhbWVudGUnLFxuICAgICAgc2VjdGlvbjogJ0F1dGVudGljYWNpw7NuJyxcbiAgICAgIGFjdGlvbjogJ2xvZ291dCdcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVQcmljZXMgPSAocHJpY2VzOiBQcmljZUNvbmZpZykgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ1VQREFURV9QUklDRVMnLCBwYXlsb2FkOiBwcmljZXMgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIHRpdGxlOiAnUHJlY2lvcyBhY3R1YWxpemFkb3MnLFxuICAgICAgbWVzc2FnZTogJ0xvcyBwcmVjaW9zIHNlIGhhbiBhY3R1YWxpemFkbyB5IHNpbmNyb25pemFkbyBhdXRvbcOhdGljYW1lbnRlJyxcbiAgICAgIHNlY3Rpb246ICdQcmVjaW9zJyxcbiAgICAgIGFjdGlvbjogJ3VwZGF0ZSdcbiAgICB9KTtcbiAgICBicm9hZGNhc3RDaGFuZ2UoeyB0eXBlOiAncHJpY2VzJywgZGF0YTogcHJpY2VzIH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZERlbGl2ZXJ5Wm9uZSA9ICh6b25lOiBPbWl0PERlbGl2ZXJ5Wm9uZSwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3VwZGF0ZWRBdCc+KSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnQUREX0RFTElWRVJZX1pPTkUnLCBwYXlsb2FkOiB6b25lIH0pO1xuICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICB0aXRsZTogJ1pvbmEgZGUgZW50cmVnYSBhZ3JlZ2FkYScsXG4gICAgICBtZXNzYWdlOiBcXGBTZSBhZ3JlZ8OzIGxhIHpvbmEgXCJcXCR7em9uZS5uYW1lfVwiIHkgc2Ugc2luY3Jvbml6w7MgYXV0b23DoXRpY2FtZW50ZVxcYCxcbiAgICAgIHNlY3Rpb246ICdab25hcyBkZSBFbnRyZWdhJyxcbiAgICAgIGFjdGlvbjogJ2NyZWF0ZSdcbiAgICB9KTtcbiAgICBicm9hZGNhc3RDaGFuZ2UoeyB0eXBlOiAnZGVsaXZlcnlfem9uZV9hZGQnLCBkYXRhOiB6b25lIH0pO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZURlbGl2ZXJ5Wm9uZSA9ICh6b25lOiBEZWxpdmVyeVpvbmUpID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdVUERBVEVfREVMSVZFUllfWk9ORScsIHBheWxvYWQ6IHpvbmUgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIHRpdGxlOiAnWm9uYSBkZSBlbnRyZWdhIGFjdHVhbGl6YWRhJyxcbiAgICAgIG1lc3NhZ2U6IFxcYFNlIGFjdHVhbGl6w7MgbGEgem9uYSBcIlxcJHt6b25lLm5hbWV9XCIgeSBzZSBzaW5jcm9uaXrDsyBhdXRvbcOhdGljYW1lbnRlXFxgLFxuICAgICAgc2VjdGlvbjogJ1pvbmFzIGRlIEVudHJlZ2EnLFxuICAgICAgYWN0aW9uOiAndXBkYXRlJ1xuICAgIH0pO1xuICAgIGJyb2FkY2FzdENoYW5nZSh7IHR5cGU6ICdkZWxpdmVyeV96b25lX3VwZGF0ZScsIGRhdGE6IHpvbmUgfSk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlRGVsaXZlcnlab25lID0gKGlkOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB6b25lID0gc3RhdGUuZGVsaXZlcnlab25lcy5maW5kKHogPT4gei5pZCA9PT0gaWQpO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0RFTEVURV9ERUxJVkVSWV9aT05FJywgcGF5bG9hZDogaWQgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgICAgIHRpdGxlOiAnWm9uYSBkZSBlbnRyZWdhIGVsaW1pbmFkYScsXG4gICAgICBtZXNzYWdlOiBcXGBTZSBlbGltaW7DsyBsYSB6b25hIFwiXFwke3pvbmU/Lm5hbWUgfHwgJ0Rlc2Nvbm9jaWRhJ31cIiB5IHNlIHNpbmNyb25pesOzIGF1dG9tw6F0aWNhbWVudGVcXGAsXG4gICAgICBzZWN0aW9uOiAnWm9uYXMgZGUgRW50cmVnYScsXG4gICAgICBhY3Rpb246ICdkZWxldGUnXG4gICAgfSk7XG4gICAgYnJvYWRjYXN0Q2hhbmdlKHsgdHlwZTogJ2RlbGl2ZXJ5X3pvbmVfZGVsZXRlJywgZGF0YTogeyBpZCB9IH0pO1xuICB9O1xuXG4gIGNvbnN0IGFkZE5vdmVsID0gKG5vdmVsOiBPbWl0PE5vdmVsLCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAndXBkYXRlZEF0Jz4pID0+IHtcbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdBRERfTk9WRUwnLCBwYXlsb2FkOiBub3ZlbCB9KTtcbiAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgdGl0bGU6ICdOb3ZlbGEgYWdyZWdhZGEnLFxuICAgICAgbWVzc2FnZTogXFxgU2UgYWdyZWfDsyBsYSBub3ZlbGEgXCJcXCR7bm92ZWwudGl0dWxvfVwiIHkgc2Ugc2luY3Jvbml6w7MgYXV0b23DoXRpY2FtZW50ZVxcYCxcbiAgICAgIHNlY3Rpb246ICdHZXN0acOzbiBkZSBOb3ZlbGFzJyxcbiAgICAgIGFjdGlvbjogJ2NyZWF0ZSdcbiAgICB9KTtcbiAgICBicm9hZGNhc3RDaGFuZ2UoeyB0eXBlOiAnbm92ZWxfYWRkJywgZGF0YTogbm92ZWwgfSk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlTm92ZWwgPSAobm92ZWw6IE5vdmVsKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnVVBEQVRFX05PVkVMJywgcGF5bG9hZDogbm92ZWwgfSk7XG4gICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIHRpdGxlOiAnTm92ZWxhIGFjdHVhbGl6YWRhJyxcbiAgICAgIG1lc3NhZ2U6IFxcYFNlIGFjdHVhbGl6w7MgbGEgbm92ZWxhIFwiXFwke25vdmVsLnRpdHVsb31cIiB5IHNlIHNpbmNyb25pesOzIGF1dG9tw6F0aWNhbWVudGVcXGAsXG4gICAgICBzZWN0aW9uOiAnR2VzdGnDs24gZGUgTm92ZWxhcycsXG4gICAgICBhY3Rpb246ICd1cGRhdGUnXG4gICAgfSk7XG4gICAgYnJvYWRjYXN0Q2hhbmdlKHsgdHlwZTogJ25vdmVsX3VwZGF0ZScsIGRhdGE6IG5vdmVsIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZU5vdmVsID0gKGlkOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBub3ZlbCA9IHN0YXRlLm5vdmVscy5maW5kKG4gPT4gbi5pZCA9PT0gaWQpO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0RFTEVURV9OT1ZFTCcsIHBheWxvYWQ6IGlkIH0pO1xuICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICB0aXRsZTogJ05vdmVsYSBlbGltaW5hZGEnLFxuICAgICAgbWVzc2FnZTogXFxgU2UgZWxpbWluw7MgbGEgbm92ZWxhIFwiXFwke25vdmVsPy50aXR1bG8gfHwgJ0Rlc2Nvbm9jaWRhJ31cIiB5IHNlIHNpbmNyb25pesOzIGF1dG9tw6F0aWNhbWVudGVcXGAsXG4gICAgICBzZWN0aW9uOiAnR2VzdGnDs24gZGUgTm92ZWxhcycsXG4gICAgICBhY3Rpb246ICdkZWxldGUnXG4gICAgfSk7XG4gICAgYnJvYWRjYXN0Q2hhbmdlKHsgdHlwZTogJ25vdmVsX2RlbGV0ZScsIGRhdGE6IHsgaWQgfSB9KTtcbiAgfTtcblxuICBjb25zdCBhZGROb3RpZmljYXRpb24gPSAobm90aWZpY2F0aW9uOiBPbWl0PE5vdGlmaWNhdGlvbiwgJ2lkJyB8ICd0aW1lc3RhbXAnPikgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0FERF9OT1RJRklDQVRJT04nLCBwYXlsb2FkOiBub3RpZmljYXRpb24gfSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJOb3RpZmljYXRpb25zID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0NMRUFSX05PVElGSUNBVElPTlMnIH0pO1xuICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICB0eXBlOiAnaW5mbycsXG4gICAgICB0aXRsZTogJ05vdGlmaWNhY2lvbmVzIGxpbXBpYWRhcycsXG4gICAgICBtZXNzYWdlOiAnU2UgaGFuIGVsaW1pbmFkbyB0b2RhcyBsYXMgbm90aWZpY2FjaW9uZXMgZGVsIHNpc3RlbWEnLFxuICAgICAgc2VjdGlvbjogJ05vdGlmaWNhY2lvbmVzJyxcbiAgICAgIGFjdGlvbjogJ2NsZWFyJ1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGV4cG9ydFN5c3RlbUNvbmZpZyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICB0aXRsZTogJ0V4cG9ydGFjacOzbiBkZSBjb25maWd1cmFjacOzbiBpbmljaWFkYScsXG4gICAgICAgIG1lc3NhZ2U6ICdHZW5lcmFuZG8gYXJjaGl2byBkZSBjb25maWd1cmFjacOzbiBKU09OLi4uJyxcbiAgICAgICAgc2VjdGlvbjogJ1Npc3RlbWEnLFxuICAgICAgICBhY3Rpb246ICdleHBvcnRfY29uZmlnX3N0YXJ0J1xuICAgICAgfSk7XG5cbiAgICAgIC8vIENyZWF0ZSBjb21wcmVoZW5zaXZlIHN5c3RlbSBjb25maWd1cmF0aW9uXG4gICAgICBjb25zdCBjb21wbGV0ZUNvbmZpZzogU3lzdGVtQ29uZmlnID0ge1xuICAgICAgICAuLi5zdGF0ZS5zeXN0ZW1Db25maWcsXG4gICAgICAgIHZlcnNpb246ICcyLjEuMCcsXG4gICAgICAgIGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgcHJpY2VzOiBzdGF0ZS5wcmljZXMsXG4gICAgICAgIGRlbGl2ZXJ5Wm9uZXM6IHN0YXRlLmRlbGl2ZXJ5Wm9uZXMsXG4gICAgICAgIG5vdmVsczogc3RhdGUubm92ZWxzLFxuICAgICAgICBtZXRhZGF0YToge1xuICAgICAgICAgIC4uLnN0YXRlLnN5c3RlbUNvbmZpZy5tZXRhZGF0YSxcbiAgICAgICAgICB0b3RhbE9yZGVyczogc3RhdGUuc3lzdGVtQ29uZmlnLm1ldGFkYXRhLnRvdGFsT3JkZXJzLFxuICAgICAgICAgIHRvdGFsUmV2ZW51ZTogc3RhdGUuc3lzdGVtQ29uZmlnLm1ldGFkYXRhLnRvdGFsUmV2ZW51ZSxcbiAgICAgICAgICBsYXN0T3JkZXJEYXRlOiBzdGF0ZS5zeXN0ZW1Db25maWcubWV0YWRhdGEubGFzdE9yZGVyRGF0ZSxcbiAgICAgICAgICBzeXN0ZW1VcHRpbWU6IHN0YXRlLnN5c3RlbUNvbmZpZy5tZXRhZGF0YS5zeXN0ZW1VcHRpbWUsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBHZW5lcmF0ZSBKU09OIGZpbGVcbiAgICAgIGNvbnN0IGNvbmZpZ0pzb24gPSBKU09OLnN0cmluZ2lmeShjb21wbGV0ZUNvbmZpZywgbnVsbCwgMik7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NvbmZpZ0pzb25dLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgbGluay5kb3dubG9hZCA9IFxcYFRWX2FfbGFfQ2FydGFfQ29uZmlnX1xcJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX0uanNvblxcYDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuXG4gICAgICAvLyBVcGRhdGUgc3lzdGVtIGNvbmZpZyB3aXRoIGV4cG9ydCB0aW1lc3RhbXBcbiAgICAgIGRpc3BhdGNoKHsgXG4gICAgICAgIHR5cGU6ICdVUERBVEVfU1lTVEVNX0NPTkZJRycsIFxuICAgICAgICBwYXlsb2FkOiB7IGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9IFxuICAgICAgfSk7XG5cbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGl0bGU6ICdDb25maWd1cmFjacOzbiBleHBvcnRhZGEnLFxuICAgICAgICBtZXNzYWdlOiAnTGEgY29uZmlndXJhY2nDs24gSlNPTiBzZSBoYSBleHBvcnRhZG8gY29ycmVjdGFtZW50ZScsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnZXhwb3J0X2NvbmZpZydcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBleHBvcnRpbmcgc3lzdGVtIGNvbmZpZzonLCBlcnJvcik7XG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIGVuIGxhIGV4cG9ydGFjacOzbiBkZSBjb25maWd1cmFjacOzbicsXG4gICAgICAgIG1lc3NhZ2U6ICdObyBzZSBwdWRvIGV4cG9ydGFyIGxhIGNvbmZpZ3VyYWNpw7NuIEpTT04nLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ2V4cG9ydF9jb25maWdfZXJyb3InXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZXhwb3J0Q29tcGxldGVTb3VyY2VDb2RlID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIHRpdGxlOiAnRXhwb3J0YWNpw7NuIGRlIGPDs2RpZ28gZnVlbnRlIGluaWNpYWRhJyxcbiAgICAgICAgbWVzc2FnZTogJ0dlbmVyYW5kbyBzaXN0ZW1hIGNvbXBsZXRvIGNvbiBjw7NkaWdvIGZ1ZW50ZS4uLicsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnZXhwb3J0X3NvdXJjZV9zdGFydCdcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJbXBvcnRhciBkaW7DoW1pY2FtZW50ZSBlbCBnZW5lcmFkb3IgZGUgY8OzZGlnbyBmdWVudGVcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuZXJhdGVDb21wbGV0ZVNvdXJjZUNvZGUgfSA9IGF3YWl0IGltcG9ydCgnLi4vdXRpbHMvc291cmNlQ29kZUdlbmVyYXRvcicpO1xuICAgICAgICBhd2FpdCBnZW5lcmF0ZUNvbXBsZXRlU291cmNlQ29kZShzdGF0ZS5zeXN0ZW1Db25maWcpO1xuICAgICAgfSBjYXRjaCAoaW1wb3J0RXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW1wb3J0aW5nIHNvdXJjZSBjb2RlIGdlbmVyYXRvcjonLCBpbXBvcnRFcnJvcik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc2UgcHVkbyBjYXJnYXIgZWwgZ2VuZXJhZG9yIGRlIGPDs2RpZ28gZnVlbnRlJyk7XG4gICAgICB9XG5cbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGl0bGU6ICdDw7NkaWdvIGZ1ZW50ZSBleHBvcnRhZG8nLFxuICAgICAgICBtZXNzYWdlOiAnRWwgc2lzdGVtYSBjb21wbGV0byBzZSBoYSBleHBvcnRhZG8gY29tbyBjw7NkaWdvIGZ1ZW50ZScsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnZXhwb3J0X3NvdXJjZSdcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBleHBvcnRpbmcgc291cmNlIGNvZGU6JywgZXJyb3IpO1xuICAgICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgdGl0bGU6ICdFcnJvciBlbiBsYSBleHBvcnRhY2nDs24gZGUgY8OzZGlnbycsXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ05vIHNlIHB1ZG8gZXhwb3J0YXIgZWwgY8OzZGlnbyBmdWVudGUgY29tcGxldG8nLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ2V4cG9ydF9zb3VyY2VfZXJyb3InXG4gICAgICB9KTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpbXBvcnRTeXN0ZW1Db25maWcgPSAoY29uZmlnOiBTeXN0ZW1Db25maWcpID0+IHtcbiAgICB0cnkge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnTE9BRF9TWVNURU1fQ09ORklHJywgcGF5bG9hZDogY29uZmlnIH0pO1xuICAgICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICB0aXRsZTogJ0NvbmZpZ3VyYWNpw7NuIGltcG9ydGFkYScsXG4gICAgICAgIG1lc3NhZ2U6ICdMYSBjb25maWd1cmFjacOzbiBkZWwgc2lzdGVtYSBzZSBoYSBjYXJnYWRvIGNvcnJlY3RhbWVudGUnLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ2ltcG9ydCdcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbXBvcnRpbmcgc3lzdGVtIGNvbmZpZzonLCBlcnJvcik7XG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIGVuIGxhIGltcG9ydGFjacOzbicsXG4gICAgICAgIG1lc3NhZ2U6ICdObyBzZSBwdWRvIGNhcmdhciBsYSBjb25maWd1cmFjacOzbiBkZWwgc2lzdGVtYScsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnaW1wb3J0X2Vycm9yJ1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHN5bmNBbGxTZWN0aW9ucyA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgYWRkTm90aWZpY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICB0aXRsZTogJ1NpbmNyb25pemFjacOzbiBjb21wbGV0YSBpbmljaWFkYScsXG4gICAgICAgIG1lc3NhZ2U6ICdTaW5jcm9uaXphbmRvIHRvZGFzIGxhcyBzZWNjaW9uZXMgZGVsIHNpc3RlbWEuLi4nLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ3N5bmNfYWxsX3N0YXJ0J1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFNpbXVsYXRlIGNvbXByZWhlbnNpdmUgc3luYyBvZiBhbGwgc2VjdGlvbnNcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAzMDAwKSk7XG5cbiAgICAgIC8vIFVwZGF0ZSBhbGwgY29tcG9uZW50cyB3aXRoIGN1cnJlbnQgc3RhdGVcbiAgICAgIGNvbnN0IHVwZGF0ZWRDb25maWc6IFN5c3RlbUNvbmZpZyA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3lzdGVtQ29uZmlnLFxuICAgICAgICBsYXN0RXhwb3J0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIHByaWNlczogc3RhdGUucHJpY2VzLFxuICAgICAgICBkZWxpdmVyeVpvbmVzOiBzdGF0ZS5kZWxpdmVyeVpvbmVzLFxuICAgICAgICBub3ZlbHM6IHN0YXRlLm5vdmVscyxcbiAgICAgIH07XG5cbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1VQREFURV9TWVNURU1fQ09ORklHJywgcGF5bG9hZDogdXBkYXRlZENvbmZpZyB9KTtcbiAgICAgIFxuICAgICAgLy8gQnJvYWRjYXN0IGNoYW5nZXMgdG8gYWxsIGNvbXBvbmVudHNcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnYWRtaW5fZnVsbF9zeW5jJywgeyBcbiAgICAgICAgZGV0YWlsOiB7IFxuICAgICAgICAgIGNvbmZpZzogdXBkYXRlZENvbmZpZyxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgICB9IFxuICAgICAgfSkpO1xuXG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgIHRpdGxlOiAnU2luY3Jvbml6YWNpw7NuIGNvbXBsZXRhIGV4aXRvc2EnLFxuICAgICAgICBtZXNzYWdlOiAnVG9kYXMgbGFzIHNlY2Npb25lcyBzZSBoYW4gc2luY3Jvbml6YWRvIGNvcnJlY3RhbWVudGUnLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ3N5bmNfYWxsJ1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIGZ1bGwgc3luYzonLCBlcnJvcik7XG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIGVuIHNpbmNyb25pemFjacOzbiBjb21wbGV0YScsXG4gICAgICAgIG1lc3NhZ2U6ICdObyBzZSBwdWRvIGNvbXBsZXRhciBsYSBzaW5jcm9uaXphY2nDs24gZGUgdG9kYXMgbGFzIHNlY2Npb25lcycsXG4gICAgICAgIHNlY3Rpb246ICdTaXN0ZW1hJyxcbiAgICAgICAgYWN0aW9uOiAnc3luY19hbGxfZXJyb3InXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYnJvYWRjYXN0Q2hhbmdlID0gKGNoYW5nZTogYW55KSA9PiB7XG4gICAgY29uc3QgY2hhbmdlRXZlbnQgPSB7XG4gICAgICAuLi5jaGFuZ2UsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHNvdXJjZTogJ2FkbWluX3BhbmVsJ1xuICAgIH07XG4gICAgXG4gICAgZGlzcGF0Y2goeyBcbiAgICAgIHR5cGU6ICdVUERBVEVfU1lOQ19TVEFUVVMnLCBcbiAgICAgIHBheWxvYWQ6IHsgXG4gICAgICAgIGxhc3RTeW5jOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIHBlbmRpbmdDaGFuZ2VzOiBNYXRoLm1heCgwLCBzdGF0ZS5zeW5jU3RhdHVzLnBlbmRpbmdDaGFuZ2VzIC0gMSlcbiAgICAgIH0gXG4gICAgfSk7XG5cbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2FkbWluX3N0YXRlX2NoYW5nZScsIHsgXG4gICAgICBkZXRhaWw6IGNoYW5nZUV2ZW50IFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBzeW5jV2l0aFJlbW90ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnVVBEQVRFX1NZTkNfU1RBVFVTJywgcGF5bG9hZDogeyBpc09ubGluZTogdHJ1ZSB9IH0pO1xuICAgICAgXG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIHRpdGxlOiAnU2luY3Jvbml6YWNpw7NuIGluaWNpYWRhJyxcbiAgICAgICAgbWVzc2FnZTogJ0luaWNpYW5kbyBzaW5jcm9uaXphY2nDs24gY29uIGVsIHNpc3RlbWEgcmVtb3RvLi4uJyxcbiAgICAgICAgc2VjdGlvbjogJ1Npc3RlbWEnLFxuICAgICAgICBhY3Rpb246ICdzeW5jX3N0YXJ0J1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFNpbXVsYXRlIHJlbW90ZSBzeW5jXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMCkpO1xuICAgICAgXG4gICAgICBkaXNwYXRjaCh7IFxuICAgICAgICB0eXBlOiAnVVBEQVRFX1NZTkNfU1RBVFVTJywgXG4gICAgICAgIHBheWxvYWQ6IHsgXG4gICAgICAgICAgbGFzdFN5bmM6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICBwZW5kaW5nQ2hhbmdlczogMFxuICAgICAgICB9IFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGFkZE5vdGlmaWNhdGlvbih7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgdGl0bGU6ICdTaW5jcm9uaXphY2nDs24gY29tcGxldGFkYScsXG4gICAgICAgIG1lc3NhZ2U6ICdUb2RvcyBsb3MgZGF0b3Mgc2UgaGFuIHNpbmNyb25pemFkbyBjb3JyZWN0YW1lbnRlJyxcbiAgICAgICAgc2VjdGlvbjogJ1Npc3RlbWEnLFxuICAgICAgICBhY3Rpb246ICdzeW5jJ1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1VQREFURV9TWU5DX1NUQVRVUycsIHBheWxvYWQ6IHsgaXNPbmxpbmU6IGZhbHNlIH0gfSk7XG4gICAgICBhZGROb3RpZmljYXRpb24oe1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB0aXRsZTogJ0Vycm9yIGRlIHNpbmNyb25pemFjacOzbicsXG4gICAgICAgIG1lc3NhZ2U6ICdObyBzZSBwdWRvIHNpbmNyb25pemFyIGNvbiBlbCBzZXJ2aWRvciByZW1vdG8nLFxuICAgICAgICBzZWN0aW9uOiAnU2lzdGVtYScsXG4gICAgICAgIGFjdGlvbjogJ3N5bmNfZXJyb3InXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QWRtaW5Db250ZXh0LlByb3ZpZGVyXG4gICAgICB2YWx1ZT17e1xuICAgICAgICBzdGF0ZSxcbiAgICAgICAgbG9naW4sXG4gICAgICAgIGxvZ291dCxcbiAgICAgICAgdXBkYXRlUHJpY2VzLFxuICAgICAgICBhZGREZWxpdmVyeVpvbmUsXG4gICAgICAgIHVwZGF0ZURlbGl2ZXJ5Wm9uZSxcbiAgICAgICAgZGVsZXRlRGVsaXZlcnlab25lLFxuICAgICAgICBhZGROb3ZlbCxcbiAgICAgICAgdXBkYXRlTm92ZWwsXG4gICAgICAgIGRlbGV0ZU5vdmVsLFxuICAgICAgICBhZGROb3RpZmljYXRpb24sXG4gICAgICAgIGNsZWFyTm90aWZpY2F0aW9ucyxcbiAgICAgICAgZXhwb3J0U3lzdGVtQ29uZmlnLFxuICAgICAgICBpbXBvcnRTeXN0ZW1Db25maWcsXG4gICAgICAgIGV4cG9ydENvbXBsZXRlU291cmNlQ29kZSxcbiAgICAgICAgc3luY1dpdGhSZW1vdGUsXG4gICAgICAgIGJyb2FkY2FzdENoYW5nZSxcbiAgICAgICAgc3luY0FsbFNlY3Rpb25zLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BZG1pbkNvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VBZG1pbigpIHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQWRtaW5Db250ZXh0KTtcbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlQWRtaW4gbXVzdCBiZSB1c2VkIHdpdGhpbiBhbiBBZG1pblByb3ZpZGVyJyk7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbmV4cG9ydCB7IEFkbWluQ29udGV4dCB9O2A7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ2FydENvbnRleHRXaXRoRW1iZWRkZWRDb25maWcoc3lzdGVtQ29uZmlnOiBTeXN0ZW1Db25maWcpOiBzdHJpbmcge1xuICBjb25zdCBwcmljZXMgPSBKU09OLnN0cmluZ2lmeShzeXN0ZW1Db25maWcucHJpY2VzLCBudWxsLCAyKTtcbiAgXG4gIHJldHVybiBgaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZVJlZHVjZXIsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdCc7XG5pbXBvcnQgdHlwZSB7IENhcnRJdGVtIH0gZnJvbSAnLi4vdHlwZXMvbW92aWUnO1xuXG4vLyBQUkVDSU9TIEVNQkVCSURPUyAtIEdlbmVyYWRvcyBhdXRvbcOhdGljYW1lbnRlXG5jb25zdCBFTUJFRERFRF9QUklDRVMgPSAke3ByaWNlc307XG5cbmludGVyZmFjZSBTZXJpZXNDYXJ0SXRlbSBleHRlbmRzIENhcnRJdGVtIHtcbiAgc2VsZWN0ZWRTZWFzb25zPzogbnVtYmVyW107XG4gIHBheW1lbnRUeXBlPzogJ2Nhc2gnIHwgJ3RyYW5zZmVyJztcbn1cblxuaW50ZXJmYWNlIENhcnRTdGF0ZSB7XG4gIGl0ZW1zOiBTZXJpZXNDYXJ0SXRlbVtdO1xuICB0b3RhbDogbnVtYmVyO1xufVxuXG50eXBlIENhcnRBY3Rpb24gPSBcbiAgfCB7IHR5cGU6ICdBRERfSVRFTSc7IHBheWxvYWQ6IFNlcmllc0NhcnRJdGVtIH1cbiAgfCB7IHR5cGU6ICdSRU1PVkVfSVRFTSc7IHBheWxvYWQ6IG51bWJlciB9XG4gIHwgeyB0eXBlOiAnVVBEQVRFX1NFQVNPTlMnOyBwYXlsb2FkOiB7IGlkOiBudW1iZXI7IHNlYXNvbnM6IG51bWJlcltdIH0gfVxuICB8IHsgdHlwZTogJ1VQREFURV9QQVlNRU5UX1RZUEUnOyBwYXlsb2FkOiB7IGlkOiBudW1iZXI7IHBheW1lbnRUeXBlOiAnY2FzaCcgfCAndHJhbnNmZXInIH0gfVxuICB8IHsgdHlwZTogJ0NMRUFSX0NBUlQnIH1cbiAgfCB7IHR5cGU6ICdMT0FEX0NBUlQnOyBwYXlsb2FkOiBTZXJpZXNDYXJ0SXRlbVtdIH07XG5cbmludGVyZmFjZSBDYXJ0Q29udGV4dFR5cGUge1xuICBzdGF0ZTogQ2FydFN0YXRlO1xuICBhZGRJdGVtOiAoaXRlbTogU2VyaWVzQ2FydEl0ZW0pID0+IHZvaWQ7XG4gIHJlbW92ZUl0ZW06IChpZDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVTZWFzb25zOiAoaWQ6IG51bWJlciwgc2Vhc29uczogbnVtYmVyW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVBheW1lbnRUeXBlOiAoaWQ6IG51bWJlciwgcGF5bWVudFR5cGU6ICdjYXNoJyB8ICd0cmFuc2ZlcicpID0+IHZvaWQ7XG4gIGNsZWFyQ2FydDogKCkgPT4gdm9pZDtcbiAgaXNJbkNhcnQ6IChpZDogbnVtYmVyKSA9PiBib29sZWFuO1xuICBnZXRJdGVtU2Vhc29uczogKGlkOiBudW1iZXIpID0+IG51bWJlcltdO1xuICBnZXRJdGVtUGF5bWVudFR5cGU6IChpZDogbnVtYmVyKSA9PiAnY2FzaCcgfCAndHJhbnNmZXInO1xuICBjYWxjdWxhdGVJdGVtUHJpY2U6IChpdGVtOiBTZXJpZXNDYXJ0SXRlbSkgPT4gbnVtYmVyO1xuICBjYWxjdWxhdGVUb3RhbFByaWNlOiAoKSA9PiBudW1iZXI7XG4gIGNhbGN1bGF0ZVRvdGFsQnlQYXltZW50VHlwZTogKCkgPT4geyBjYXNoOiBudW1iZXI7IHRyYW5zZmVyOiBudW1iZXIgfTtcbn1cblxuY29uc3QgQ2FydENvbnRleHQgPSBjcmVhdGVDb250ZXh0PENhcnRDb250ZXh0VHlwZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuZnVuY3Rpb24gY2FydFJlZHVjZXIoc3RhdGU6IENhcnRTdGF0ZSwgYWN0aW9uOiBDYXJ0QWN0aW9uKTogQ2FydFN0YXRlIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgJ0FERF9JVEVNJzpcbiAgICAgIGlmIChzdGF0ZS5pdGVtcy5zb21lKGl0ZW0gPT4gaXRlbS5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWQgJiYgaXRlbS50eXBlID09PSBhY3Rpb24ucGF5bG9hZC50eXBlKSkge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXRlbXM6IFsuLi5zdGF0ZS5pdGVtcywgYWN0aW9uLnBheWxvYWRdLFxuICAgICAgICB0b3RhbDogc3RhdGUudG90YWwgKyAxXG4gICAgICB9O1xuICAgIGNhc2UgJ1VQREFURV9TRUFTT05TJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBpdGVtczogc3RhdGUuaXRlbXMubWFwKGl0ZW0gPT4gXG4gICAgICAgICAgaXRlbS5pZCA9PT0gYWN0aW9uLnBheWxvYWQuaWQgXG4gICAgICAgICAgICA/IHsgLi4uaXRlbSwgc2VsZWN0ZWRTZWFzb25zOiBhY3Rpb24ucGF5bG9hZC5zZWFzb25zIH1cbiAgICAgICAgICAgIDogaXRlbVxuICAgICAgICApXG4gICAgICB9O1xuICAgIGNhc2UgJ1VQREFURV9QQVlNRU5UX1RZUEUnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGl0ZW1zOiBzdGF0ZS5pdGVtcy5tYXAoaXRlbSA9PiBcbiAgICAgICAgICBpdGVtLmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZCBcbiAgICAgICAgICAgID8geyAuLi5pdGVtLCBwYXltZW50VHlwZTogYWN0aW9uLnBheWxvYWQucGF5bWVudFR5cGUgfVxuICAgICAgICAgICAgOiBpdGVtXG4gICAgICAgIClcbiAgICAgIH07XG4gICAgY2FzZSAnUkVNT1ZFX0lURU0nOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGl0ZW1zOiBzdGF0ZS5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBhY3Rpb24ucGF5bG9hZCksXG4gICAgICAgIHRvdGFsOiBzdGF0ZS50b3RhbCAtIDFcbiAgICAgIH07XG4gICAgY2FzZSAnQ0xFQVJfQ0FSVCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIHRvdGFsOiAwXG4gICAgICB9O1xuICAgIGNhc2UgJ0xPQURfQ0FSVCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpdGVtczogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIHRvdGFsOiBhY3Rpb24ucGF5bG9hZC5sZW5ndGhcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2FydFByb3ZpZGVyKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKGNhcnRSZWR1Y2VyLCB7IGl0ZW1zOiBbXSwgdG90YWw6IDAgfSk7XG4gIGNvbnN0IFt0b2FzdCwgc2V0VG9hc3RdID0gUmVhY3QudXNlU3RhdGU8e1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0eXBlOiAnc3VjY2VzcycgfCAnZXJyb3InO1xuICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgfT4oeyBtZXNzYWdlOiAnJywgdHlwZTogJ3N1Y2Nlc3MnLCBpc1Zpc2libGU6IGZhbHNlIH0pO1xuXG4gIC8vIENsZWFyIGNhcnQgb24gcGFnZSByZWZyZXNoXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQmVmb3JlVW5sb2FkID0gKCkgPT4ge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncGFnZVJlZnJlc2hlZCcsICd0cnVlJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncGFnZVJlZnJlc2hlZCcpID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ21vdmllQ2FydCcpO1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdDTEVBUl9DQVJUJyB9KTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgncGFnZVJlZnJlc2hlZCcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgaGFuZGxlQmVmb3JlVW5sb2FkKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGhhbmRsZUxvYWQpO1xuXG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKSA9PT0gJ3RydWUnKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbW92aWVDYXJ0Jyk7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6ICdDTEVBUl9DQVJUJyB9KTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGhhbmRsZUJlZm9yZVVubG9hZCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGhhbmRsZUxvYWQpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwYWdlUmVmcmVzaGVkJykgIT09ICd0cnVlJykge1xuICAgICAgY29uc3Qgc2F2ZWRDYXJ0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21vdmllQ2FydCcpO1xuICAgICAgaWYgKHNhdmVkQ2FydCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gSlNPTi5wYXJzZShzYXZlZENhcnQpO1xuICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0xPQURfQ0FSVCcsIHBheWxvYWQ6IGl0ZW1zIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgY2FydCBmcm9tIGxvY2FsU3RvcmFnZTonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtb3ZpZUNhcnQnLCBKU09OLnN0cmluZ2lmeShzdGF0ZS5pdGVtcykpO1xuICB9LCBbc3RhdGUuaXRlbXNdKTtcblxuICBjb25zdCBhZGRJdGVtID0gKGl0ZW06IFNlcmllc0NhcnRJdGVtKSA9PiB7XG4gICAgY29uc3QgaXRlbVdpdGhEZWZhdWx0cyA9IHsgXG4gICAgICAuLi5pdGVtLCBcbiAgICAgIHBheW1lbnRUeXBlOiAnY2FzaCcgYXMgY29uc3QsXG4gICAgICBzZWxlY3RlZFNlYXNvbnM6IGl0ZW0udHlwZSA9PT0gJ3R2JyAmJiAhaXRlbS5zZWxlY3RlZFNlYXNvbnMgPyBbMV0gOiBpdGVtLnNlbGVjdGVkU2Vhc29uc1xuICAgIH07XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnQUREX0lURU0nLCBwYXlsb2FkOiBpdGVtV2l0aERlZmF1bHRzIH0pO1xuICAgIFxuICAgIHNldFRvYXN0KHtcbiAgICAgIG1lc3NhZ2U6IFxcYFwiXFwke2l0ZW0udGl0bGV9XCIgYWdyZWdhZG8gYWwgY2Fycml0b1xcYCxcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUl0ZW0gPSAoaWQ6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBzdGF0ZS5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ1JFTU9WRV9JVEVNJywgcGF5bG9hZDogaWQgfSk7XG4gICAgXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHNldFRvYXN0KHtcbiAgICAgICAgbWVzc2FnZTogXFxgXCJcXCR7aXRlbS50aXRsZX1cIiByZXRpcmFkbyBkZWwgY2Fycml0b1xcYCxcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgaXNWaXNpYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlU2Vhc29ucyA9IChpZDogbnVtYmVyLCBzZWFzb25zOiBudW1iZXJbXSkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ1VQREFURV9TRUFTT05TJywgcGF5bG9hZDogeyBpZCwgc2Vhc29ucyB9IH0pO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVBheW1lbnRUeXBlID0gKGlkOiBudW1iZXIsIHBheW1lbnRUeXBlOiAnY2FzaCcgfCAndHJhbnNmZXInKSA9PiB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnVVBEQVRFX1BBWU1FTlRfVFlQRScsIHBheWxvYWQ6IHsgaWQsIHBheW1lbnRUeXBlIH0gfSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJDYXJ0ID0gKCkgPT4ge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ0NMRUFSX0NBUlQnIH0pO1xuICB9O1xuXG4gIGNvbnN0IGlzSW5DYXJ0ID0gKGlkOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gc3RhdGUuaXRlbXMuc29tZShpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgfTtcblxuICBjb25zdCBnZXRJdGVtU2Vhc29ucyA9IChpZDogbnVtYmVyKTogbnVtYmVyW10gPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBzdGF0ZS5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgIHJldHVybiBpdGVtPy5zZWxlY3RlZFNlYXNvbnMgfHwgW107XG4gIH07XG5cbiAgY29uc3QgZ2V0SXRlbVBheW1lbnRUeXBlID0gKGlkOiBudW1iZXIpOiAnY2FzaCcgfCAndHJhbnNmZXInID0+IHtcbiAgICBjb25zdCBpdGVtID0gc3RhdGUuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgICByZXR1cm4gaXRlbT8ucGF5bWVudFR5cGUgfHwgJ2Nhc2gnO1xuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZUl0ZW1QcmljZSA9IChpdGVtOiBTZXJpZXNDYXJ0SXRlbSk6IG51bWJlciA9PiB7XG4gICAgLy8gVXNlIGVtYmVkZGVkIHByaWNlc1xuICAgIGNvbnN0IG1vdmllUHJpY2UgPSBFTUJFRERFRF9QUklDRVMubW92aWVQcmljZTtcbiAgICBjb25zdCBzZXJpZXNQcmljZSA9IEVNQkVEREVEX1BSSUNFUy5zZXJpZXNQcmljZTtcbiAgICBjb25zdCB0cmFuc2ZlckZlZVBlcmNlbnRhZ2UgPSBFTUJFRERFRF9QUklDRVMudHJhbnNmZXJGZWVQZXJjZW50YWdlO1xuICAgIFxuICAgIGlmIChpdGVtLnR5cGUgPT09ICdtb3ZpZScpIHtcbiAgICAgIGNvbnN0IGJhc2VQcmljZSA9IG1vdmllUHJpY2U7XG4gICAgICByZXR1cm4gaXRlbS5wYXltZW50VHlwZSA9PT0gJ3RyYW5zZmVyJyA/IE1hdGgucm91bmQoYmFzZVByaWNlICogKDEgKyB0cmFuc2ZlckZlZVBlcmNlbnRhZ2UgLyAxMDApKSA6IGJhc2VQcmljZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2Vhc29ucyA9IGl0ZW0uc2VsZWN0ZWRTZWFzb25zPy5sZW5ndGggfHwgMTtcbiAgICAgIGNvbnN0IGJhc2VQcmljZSA9IHNlYXNvbnMgKiBzZXJpZXNQcmljZTtcbiAgICAgIHJldHVybiBpdGVtLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInID8gTWF0aC5yb3VuZChiYXNlUHJpY2UgKiAoMSArIHRyYW5zZmVyRmVlUGVyY2VudGFnZSAvIDEwMCkpIDogYmFzZVByaWNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjYWxjdWxhdGVUb3RhbFByaWNlID0gKCk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLml0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiB0b3RhbCArIGNhbGN1bGF0ZUl0ZW1QcmljZShpdGVtKTtcbiAgICB9LCAwKTtcbiAgfTtcblxuICBjb25zdCBjYWxjdWxhdGVUb3RhbEJ5UGF5bWVudFR5cGUgPSAoKTogeyBjYXNoOiBudW1iZXI7IHRyYW5zZmVyOiBudW1iZXIgfSA9PiB7XG4gICAgY29uc3QgbW92aWVQcmljZSA9IEVNQkVEREVEX1BSSUNFUy5tb3ZpZVByaWNlO1xuICAgIGNvbnN0IHNlcmllc1ByaWNlID0gRU1CRURERURfUFJJQ0VTLnNlcmllc1ByaWNlO1xuICAgIGNvbnN0IHRyYW5zZmVyRmVlUGVyY2VudGFnZSA9IEVNQkVEREVEX1BSSUNFUy50cmFuc2ZlckZlZVBlcmNlbnRhZ2U7XG4gICAgXG4gICAgcmV0dXJuIHN0YXRlLml0ZW1zLnJlZHVjZSgodG90YWxzLCBpdGVtKSA9PiB7XG4gICAgICBjb25zdCBiYXNlUHJpY2UgPSBpdGVtLnR5cGUgPT09ICdtb3ZpZScgPyBtb3ZpZVByaWNlIDogKGl0ZW0uc2VsZWN0ZWRTZWFzb25zPy5sZW5ndGggfHwgMSkgKiBzZXJpZXNQcmljZTtcbiAgICAgIGlmIChpdGVtLnBheW1lbnRUeXBlID09PSAndHJhbnNmZXInKSB7XG4gICAgICAgIHRvdGFscy50cmFuc2ZlciArPSBNYXRoLnJvdW5kKGJhc2VQcmljZSAqICgxICsgdHJhbnNmZXJGZWVQZXJjZW50YWdlIC8gMTAwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b3RhbHMuY2FzaCArPSBiYXNlUHJpY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWxzO1xuICAgIH0sIHsgY2FzaDogMCwgdHJhbnNmZXI6IDAgfSk7XG4gIH07XG5cbiAgY29uc3QgY2xvc2VUb2FzdCA9ICgpID0+IHtcbiAgICBzZXRUb2FzdChwcmV2ID0+ICh7IC4uLnByZXYsIGlzVmlzaWJsZTogZmFsc2UgfSkpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPENhcnRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IFxuICAgICAgc3RhdGUsIFxuICAgICAgYWRkSXRlbSwgXG4gICAgICByZW1vdmVJdGVtLCBcbiAgICAgIHVwZGF0ZVNlYXNvbnMsIFxuICAgICAgdXBkYXRlUGF5bWVudFR5cGUsXG4gICAgICBjbGVhckNhcnQsIFxuICAgICAgaXNJbkNhcnQsIFxuICAgICAgZ2V0SXRlbVNlYXNvbnMsXG4gICAgICBnZXRJdGVtUGF5bWVudFR5cGUsXG4gICAgICBjYWxjdWxhdGVJdGVtUHJpY2UsXG4gICAgICBjYWxjdWxhdGVUb3RhbFByaWNlLFxuICAgICAgY2FsY3VsYXRlVG90YWxCeVBheW1lbnRUeXBlXG4gICAgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgICA8VG9hc3RcbiAgICAgICAgbWVzc2FnZT17dG9hc3QubWVzc2FnZX1cbiAgICAgICAgdHlwZT17dG9hc3QudHlwZX1cbiAgICAgICAgaXNWaXNpYmxlPXt0b2FzdC5pc1Zpc2libGV9XG4gICAgICAgIG9uQ2xvc2U9e2Nsb3NlVG9hc3R9XG4gICAgICAvPlxuICAgIDwvQ2FydENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYXJ0KCkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChDYXJ0Q29udGV4dCk7XG4gIGlmIChjb250ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUNhcnQgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIENhcnRQcm92aWRlcicpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufWA7XG59XG5cbi8vIEZ1bmNpb25lcyBwYXJhIGdlbmVyYXIgYXJjaGl2b3MgYsOhc2ljb3MgZGVsIHByb3llY3RvXG5cbmZ1bmN0aW9uIGdlbmVyYXRlUGFja2FnZUpzb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB7XG4gIFwibmFtZVwiOiBcInR2LWEtbGEtY2FydGEtc2lzdGVtYS1jb21wbGV0b1wiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMi4xLjBcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJTaXN0ZW1hIGNvbXBsZXRvIGRlIGdlc3Rpw7NuIHBhcmEgVFYgYSBsYSBDYXJ0YSBjb24gcGFuZWwgZGUgYWRtaW5pc3RyYWNpw7NuXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLlwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjI0LjIuMVwiLFxuICAgIFwianN6aXBcIjogXCJeMy4xMC4xXCIsXG4gICAgXCJsdWNpZGUtcmVhY3RcIjogXCJeMC4zNDQuMFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMy4xXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMy4xXCIsXG4gICAgXCJyZWFjdC1yb3V0ZXItZG9tXCI6IFwiXjcuOC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVzbGludC9qc1wiOiBcIl45LjkuMVwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjMuNVwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4zLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMy4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjkuOS4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjUuMS4wLXJjLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtcmVmcmVzaFwiOiBcIl4wLjQuMTFcIixcbiAgICBcImdsb2JhbHNcIjogXCJeMTUuOS4wXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zNVwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS41LjNcIixcbiAgICBcInR5cGVzY3JpcHQtZXNsaW50XCI6IFwiXjguMy4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4yXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJ0dlwiLFxuICAgIFwibW92aWVzXCIsXG4gICAgXCJzZXJpZXNcIixcbiAgICBcImFuaW1lXCIsXG4gICAgXCJzdHJlYW1pbmdcIixcbiAgICBcImNhcnRcIixcbiAgICBcImFkbWluXCIsXG4gICAgXCJyZWFjdFwiLFxuICAgIFwidHlwZXNjcmlwdFwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IFwiVFYgYSBsYSBDYXJ0YVwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIlxufWA7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVml0ZUNvbmZpZygpOiBzdHJpbmcge1xuICByZXR1cm4gYGltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICBoaXN0b3J5QXBpRmFsbGJhY2s6IHRydWUsXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBoaXN0b3J5QXBpRmFsbGJhY2s6IHRydWUsXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG59KTtgO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhaWx3aW5kQ29uZmlnKCk6IHN0cmluZyB7XG4gIHJldHVybiBgLyoqIEB0eXBlIHtpbXBvcnQoJ3RhaWx3aW5kY3NzJykuQ29uZmlnfSAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb250ZW50OiBbJy4vaW5kZXguaHRtbCcsICcuL3NyYy8qKi8qLntqcyx0cyxqc3gsdHN4fSddLFxuICB0aGVtZToge1xuICAgIGV4dGVuZDoge30sXG4gIH0sXG4gIHBsdWdpbnM6IFtdLFxufTtgO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRzQ29uZmlnKCk6IHN0cmluZyB7XG4gIHJldHVybiBge1xuICBcImZpbGVzXCI6IFtdLFxuICBcInJlZmVyZW5jZXNcIjogW1xuICAgIHsgXCJwYXRoXCI6IFwiLi90c2NvbmZpZy5hcHAuanNvblwiIH0sXG4gICAgeyBcInBhdGhcIjogXCIuL3RzY29uZmlnLm5vZGUuanNvblwiIH1cbiAgXVxufWA7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVHNDb25maWdBcHAoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB7XG4gIFwiY29tcGlsZXJPcHRpb25zXCI6IHtcbiAgICBcInRhcmdldFwiOiBcIkVTMjAyMFwiLFxuICAgIFwidXNlRGVmaW5lRm9yQ2xhc3NGaWVsZHNcIjogdHJ1ZSxcbiAgICBcImxpYlwiOiBbXCJFUzIwMjBcIiwgXCJET01cIiwgXCJET00uSXRlcmFibGVcIl0sXG4gICAgXCJtb2R1bGVcIjogXCJFU05leHRcIixcbiAgICBcInNraXBMaWJDaGVja1wiOiB0cnVlLFxuXG4gICAgLyogQnVuZGxlciBtb2RlICovXG4gICAgXCJtb2R1bGVSZXNvbHV0aW9uXCI6IFwiYnVuZGxlclwiLFxuICAgIFwiYWxsb3dJbXBvcnRpbmdUc0V4dGVuc2lvbnNcIjogdHJ1ZSxcbiAgICBcImlzb2xhdGVkTW9kdWxlc1wiOiB0cnVlLFxuICAgIFwibW9kdWxlRGV0ZWN0aW9uXCI6IFwiZm9yY2VcIixcbiAgICBcIm5vRW1pdFwiOiB0cnVlLFxuICAgIFwianN4XCI6IFwicmVhY3QtanN4XCIsXG5cbiAgICAvKiBMaW50aW5nICovXG4gICAgXCJzdHJpY3RcIjogdHJ1ZSxcbiAgICBcIm5vVW51c2VkTG9jYWxzXCI6IHRydWUsXG4gICAgXCJub1VudXNlZFBhcmFtZXRlcnNcIjogdHJ1ZSxcbiAgICBcIm5vRmFsbHRocm91Z2hDYXNlc0luU3dpdGNoXCI6IHRydWVcbiAgfSxcbiAgXCJpbmNsdWRlXCI6IFtcInNyY1wiXVxufWA7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVHNDb25maWdOb2RlKCk6IHN0cmluZyB7XG4gIHJldHVybiBge1xuICBcImNvbXBpbGVyT3B0aW9uc1wiOiB7XG4gICAgXCJ0YXJnZXRcIjogXCJFUzIwMjJcIixcbiAgICBcImxpYlwiOiBbXCJFUzIwMjNcIl0sXG4gICAgXCJtb2R1bGVcIjogXCJFU05leHRcIixcbiAgICBcInNraXBMaWJDaGVja1wiOiB0cnVlLFxuXG4gICAgLyogQnVuZGxlciBtb2RlICovXG4gICAgXCJtb2R1bGVSZXNvbHV0aW9uXCI6IFwiYnVuZGxlclwiLFxuICAgIFwiYWxsb3dJbXBvcnRpbmdUc0V4dGVuc2lvbnNcIjogdHJ1ZSxcbiAgICBcImlzb2xhdGVkTW9kdWxlc1wiOiB0cnVlLFxuICAgIFwibW9kdWxlRGV0ZWN0aW9uXCI6IFwiZm9yY2VcIixcbiAgICBcIm5vRW1pdFwiOiB0cnVlLFxuXG4gICAgLyogTGludGluZyAqL1xuICAgIFwic3RyaWN0XCI6IHRydWUsXG4gICAgXCJub1VudXNlZExvY2Fsc1wiOiB0cnVlLFxuICAgIFwibm9VbnVzZWRQYXJhbWV0ZXJzXCI6IHRydWUsXG4gICAgXCJub0ZhbGx0aHJvdWdoQ2FzZXNJblN3aXRjaFwiOiB0cnVlXG4gIH0sXG4gIFwiaW5jbHVkZVwiOiBbXCJ2aXRlLmNvbmZpZy50c1wiXVxufWA7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUG9zdGNzc0NvbmZpZygpOiBzdHJpbmcge1xuICByZXR1cm4gYGV4cG9ydCBkZWZhdWx0IHtcbiAgcGx1Z2luczoge1xuICAgIHRhaWx3aW5kY3NzOiB7fSxcbiAgICBhdXRvcHJlZml4ZXI6IHt9LFxuICB9LFxufTtgO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUVzbGludENvbmZpZygpOiBzdHJpbmcge1xuICByZXR1cm4gYGltcG9ydCBqcyBmcm9tICdAZXNsaW50L2pzJztcbmltcG9ydCBnbG9iYWxzIGZyb20gJ2dsb2JhbHMnO1xuaW1wb3J0IHJlYWN0SG9va3MgZnJvbSAnZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rcyc7XG5pbXBvcnQgcmVhY3RSZWZyZXNoIGZyb20gJ2VzbGludC1wbHVnaW4tcmVhY3QtcmVmcmVzaCc7XG5pbXBvcnQgdHNlc2xpbnQgZnJvbSAndHlwZXNjcmlwdC1lc2xpbnQnO1xuXG5leHBvcnQgZGVmYXVsdCB0c2VzbGludC5jb25maWcoXG4gIHsgaWdub3JlczogWydkaXN0J10gfSxcbiAge1xuICAgIGV4dGVuZHM6IFtqcy5jb25maWdzLnJlY29tbWVuZGVkLCAuLi50c2VzbGludC5jb25maWdzLnJlY29tbWVuZGVkXSxcbiAgICBmaWxlczogWycqKi8qLnt0cyx0c3h9J10sXG4gICAgbGFuZ3VhZ2VPcHRpb25zOiB7XG4gICAgICBlY21hVmVyc2lvbjogMjAyMCxcbiAgICAgIGdsb2JhbHM6IGdsb2JhbHMuYnJvd3NlcixcbiAgICB9LFxuICAgIHBsdWdpbnM6IHtcbiAgICAgICdyZWFjdC1ob29rcyc6IHJlYWN0SG9va3MsXG4gICAgICAncmVhY3QtcmVmcmVzaCc6IHJlYWN0UmVmcmVzaCxcbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICBcbiAgICAgIC4uLnJlYWN0SG9va3MuY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgICdyZWFjdC1yZWZyZXNoL29ubHktZXhwb3J0LWNvbXBvbmVudHMnOiBbXG4gICAgICAgICd3YXJuJyxcbiAgICAgICAgeyBhbGxvd0NvbnN0YW50RXhwb3J0OiB0cnVlIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH1cbik7YDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVJbmRleEh0bWwoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGA8IWRvY3R5cGUgaHRtbD5cbjxodG1sIGxhbmc9XCJlblwiPlxuICA8aGVhZD5cbiAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIiAvPlxuICAgIDxsaW5rIHJlbD1cImljb25cIiB0eXBlPVwiaW1hZ2UvcG5nXCIgaHJlZj1cIi91bm5hbWVkLnBuZ1wiIC8+XG4gICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MS4wLCBtaW5pbXVtLXNjYWxlPTEuMCwgdXNlci1zY2FsYWJsZT1ub1wiIC8+XG4gICAgPGJhc2UgaHJlZj1cIi9cIiAvPlxuICAgIDx0aXRsZT5UViBhIGxhIENhcnRhOiBQZWzDrWN1bGFzIHkgc2VyaWVzIGlsaW1pdGFkYXMgeSBtdWNobyBtw6FzPC90aXRsZT5cbiAgICA8c3R5bGU+XG4gICAgICAvKiBEZXNoYWJpbGl0YXIgem9vbSB5IHNlbGVjY2nDs24gZGUgdGV4dG8gKi9cbiAgICAgICoge1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8qIFBlcm1pdGlyIHNlbGVjY2nDs24gZGUgdGV4dG8gc29sbyBlbiBpbnB1dHMgeSB0ZXh0YXJlYXMgKi9cbiAgICAgIGlucHV0LCB0ZXh0YXJlYSwgW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0ge1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgICAgICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgICAgIHVzZXItc2VsZWN0OiB0ZXh0O1xuICAgICAgfVxuICAgICAgXG4gICAgICAvKiBEZXNoYWJpbGl0YXIgem9vbSBlbiBpT1MgU2FmYXJpICovXG4gICAgICBib2R5IHtcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xuICAgICAgICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgICAgICAgdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgICAgICAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8qIFByZXZlbmlyIHpvb20gZW4gaW5wdXRzIGVuIGlPUyAqL1xuICAgICAgaW5wdXRbdHlwZT1cInRleHRcIl0sXG4gICAgICBpbnB1dFt0eXBlPVwiZW1haWxcIl0sXG4gICAgICBpbnB1dFt0eXBlPVwidGVsXCJdLFxuICAgICAgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLFxuICAgICAgaW5wdXRbdHlwZT1cIm51bWJlclwiXSxcbiAgICAgIGlucHV0W3R5cGU9XCJzZWFyY2hcIl0sXG4gICAgICB0ZXh0YXJlYSxcbiAgICAgIHNlbGVjdCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweCAhaW1wb3J0YW50O1xuICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICA8L2hlYWQ+XG4gIDxib2R5PlxuICAgIDxkaXYgaWQ9XCJyb290XCI+PC9kaXY+XG4gICAgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiL3NyYy9tYWluLnRzeFwiPjwvc2NyaXB0PlxuICA8L2JvZHk+XG48L2h0bWw+YDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVWZXJjZWxDb25maWcoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB7IFwicmV3cml0ZXNcIjogW3sgXCJzb3VyY2VcIjogXCIvKC4qKVwiLCBcImRlc3RpbmF0aW9uXCI6IFwiL1wiIH1dIH1gO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldGxpZnlSZWRpcmVjdHMoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAjIE5ldGxpZnkgcmVkaXJlY3RzIGZvciBTUEEgcm91dGluZ1xuLyogICAgL2luZGV4Lmh0bWwgICAyMDBcblxuIyBIYW5kbGUgc3BlY2lmaWMgcm91dGVzXG4vbW92aWVzICAgIC9pbmRleC5odG1sICAgMjAwXG4vdHYgICAgICAgIC9pbmRleC5odG1sICAgMjAwXG4vYW5pbWUgICAgIC9pbmRleC5odG1sICAgMjAwXG4vY2FydCAgICAgIC9pbmRleC5odG1sICAgMjAwXG4vc2VhcmNoICAgIC9pbmRleC5odG1sICAgMjAwXG4vbW92aWUvKiAgIC9pbmRleC5odG1sICAgMjAwXG4vdHYvKiAgICAgIC9pbmRleC5odG1sICAgMjAwXG4vYWRtaW4gICAgIC9pbmRleC5odG1sICAgMjAwYDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSZWFkbWUoc3lzdGVtQ29uZmlnOiBTeXN0ZW1Db25maWcpOiBzdHJpbmcge1xuICByZXR1cm4gYCMgVFYgYSBsYSBDYXJ0YSAtIFNpc3RlbWEgZGUgR2VzdGnDs25cblxuIyMgRGVzY3JpcGNpw7NuXG5TaXN0ZW1hIGNvbXBsZXRvIGRlIGdlc3Rpw7NuIHBhcmEgVFYgYSBsYSBDYXJ0YSBjb24gcGFuZWwgZGUgYWRtaW5pc3RyYWNpw7NuLCBjYXJyaXRvIGRlIGNvbXByYXMgeSBzaW5jcm9uaXphY2nDs24gZW4gdGllbXBvIHJlYWwuXG5cbiMjIFZlcnNpw7NuXG4ke3N5c3RlbUNvbmZpZy52ZXJzaW9ufVxuXG4jIyDDmmx0aW1hIEV4cG9ydGFjacOzblxuJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9XG5cbiMjIENvbmZpZ3VyYWNpw7NuIEFjdHVhbFxuXG4jIyMgUHJlY2lvc1xuLSBQZWzDrWN1bGFzOiAkJHtzeXN0ZW1Db25maWcucHJpY2VzLm1vdmllUHJpY2V9IENVUFxuLSBTZXJpZXM6ICQke3N5c3RlbUNvbmZpZy5wcmljZXMuc2VyaWVzUHJpY2V9IENVUCBwb3IgdGVtcG9yYWRhXG4tIFJlY2FyZ28gdHJhbnNmZXJlbmNpYTogJHtzeXN0ZW1Db25maWcucHJpY2VzLnRyYW5zZmVyRmVlUGVyY2VudGFnZX0lXG4tIE5vdmVsYXM6ICQke3N5c3RlbUNvbmZpZy5wcmljZXMubm92ZWxQcmljZVBlckNoYXB0ZXJ9IENVUCBwb3IgY2Fww610dWxvXG5cbiMjIyBab25hcyBkZSBFbnRyZWdhXG5Ub3RhbCBjb25maWd1cmFkYXM6ICR7c3lzdGVtQ29uZmlnLmRlbGl2ZXJ5Wm9uZXMubGVuZ3RofVxuXG4jIyMgTm92ZWxhcyBBZG1pbmlzdHJhZGFzXG5Ub3RhbDogJHtzeXN0ZW1Db25maWcubm92ZWxzLmxlbmd0aH1cblxuIyMgQ2FyYWN0ZXLDrXN0aWNhc1xuLSDinIUgUGFuZWwgZGUgYWRtaW5pc3RyYWNpw7NuIGNvbXBsZXRvXG4tIOKchSBTaW5jcm9uaXphY2nDs24gZW4gdGllbXBvIHJlYWxcbi0g4pyFIEdlc3Rpw7NuIGRlIHByZWNpb3MgZGluw6FtaWNvc1xuLSDinIUgWm9uYXMgZGUgZW50cmVnYSBwZXJzb25hbGl6YWJsZXNcbi0g4pyFIENhdMOhbG9nbyBkZSBub3ZlbGFzIGFkbWluaXN0cmFibGVcbi0g4pyFIFNpc3RlbWEgZGUgbm90aWZpY2FjaW9uZXNcbi0g4pyFIEV4cG9ydGFjacOzbi9JbXBvcnRhY2nDs24gZGUgY29uZmlndXJhY2nDs25cbi0g4pyFIE9wdGltaXphY2nDs24gZGUgcmVuZGltaWVudG9cbi0g4pyFIENhcnJpdG8gZGUgY29tcHJhcyBhdmFuemFkb1xuLSDinIUgSW50ZWdyYWNpw7NuIGNvbiBXaGF0c0FwcFxuXG4jIyBJbnN0YWxhY2nDs25cblxcYFxcYFxcYGJhc2hcbm5wbSBpbnN0YWxsXG5ucG0gcnVuIGRldlxuXFxgXFxgXFxgXG5cbiMjIFVzbyBkZWwgUGFuZWwgZGUgQWRtaW5pc3RyYWNpw7NuXG4xLiBBY2NlZGVyIGEgL2FkbWluXG4yLiBVc3VhcmlvOiBhZG1pblxuMy4gQ29udHJhc2XDsWE6IHR2YWxhY2FydGEyMDI0XG5cbiMjIFRlY25vbG9nw61hc1xuLSBSZWFjdCAxOFxuLSBUeXBlU2NyaXB0XG4tIFRhaWx3aW5kIENTU1xuLSBWaXRlXG4tIFJlYWN0IFJvdXRlclxuLSBMdWNpZGUgSWNvbnNcbi0gSlNaaXBcblxuIyMgQ29udGFjdG9cbldoYXRzQXBwOiArNTM1NDY5MDg3OGA7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTWFpblRzeCgpOiBzdHJpbmcge1xuICByZXR1cm4gYGltcG9ydCB7IFN0cmljdE1vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSAncmVhY3QtZG9tL2NsaWVudCc7XG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwLnRzeCc7XG5pbXBvcnQgJy4vaW5kZXguY3NzJztcblxuY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpISkucmVuZGVyKFxuICA8U3RyaWN0TW9kZT5cbiAgICA8QXBwIC8+XG4gIDwvU3RyaWN0TW9kZT5cbik7YDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVBcHBUc3goKTogc3RyaW5nIHtcbiAgcmV0dXJuIGBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIsIFJvdXRlcywgUm91dGUsIE5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBDYXJ0UHJvdmlkZXIgfSBmcm9tICcuL2NvbnRleHQvQ2FydENvbnRleHQnO1xuaW1wb3J0IHsgQWRtaW5Qcm92aWRlciB9IGZyb20gJy4vY29udGV4dC9BZG1pbkNvbnRleHQnO1xuaW1wb3J0IHsgSGVhZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL0hlYWRlcic7XG5pbXBvcnQgeyBIb21lIH0gZnJvbSAnLi9wYWdlcy9Ib21lJztcbmltcG9ydCB7IE1vdmllcyB9IGZyb20gJy4vcGFnZXMvTW92aWVzJztcbmltcG9ydCB7IFRWU2hvd3MgfSBmcm9tICcuL3BhZ2VzL1RWU2hvd3MnO1xuaW1wb3J0IHsgQW5pbWUgfSBmcm9tICcuL3BhZ2VzL0FuaW1lJztcbmltcG9ydCB7IFNlYXJjaFBhZ2UgfSBmcm9tICcuL3BhZ2VzL1NlYXJjaCc7XG5pbXBvcnQgeyBNb3ZpZURldGFpbCB9IGZyb20gJy4vcGFnZXMvTW92aWVEZXRhaWwnO1xuaW1wb3J0IHsgVFZEZXRhaWwgfSBmcm9tICcuL3BhZ2VzL1RWRGV0YWlsJztcbmltcG9ydCB7IENhcnQgfSBmcm9tICcuL3BhZ2VzL0NhcnQnO1xuaW1wb3J0IHsgQWRtaW5QYW5lbCB9IGZyb20gJy4vcGFnZXMvQWRtaW5QYW5lbCc7XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgLy8gRGV0ZWN0YXIgcmVmcmVzaCB5IHJlZGlyaWdpciBhIGxhIHDDoWdpbmEgcHJpbmNpcGFsXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlQmVmb3JlVW5sb2FkID0gKCkgPT4ge1xuICAgICAgLy8gTWFyY2FyIHF1ZSBsYSBww6FnaW5hIHNlIGVzdMOhIHJlY2FyZ2FuZG9cbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3BhZ2VSZWZyZXNoZWQnLCAndHJ1ZScpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVMb2FkID0gKCkgPT4ge1xuICAgICAgLy8gU2kgc2UgZGV0ZWN0YSBxdWUgbGEgcMOhZ2luYSBmdWUgcmVjYXJnYWRhLCByZWRpcmlnaXIgYSBsYSBww6FnaW5hIHByaW5jaXBhbFxuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKTtcbiAgICAgICAgLy8gU29sbyByZWRpcmlnaXIgc2kgbm8gZXN0YW1vcyB5YSBlbiBsYSBww6FnaW5hIHByaW5jaXBhbFxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICE9PSAnLycpIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL3R2YWxhY2FydGEudmVyY2VsLmFwcC8nO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBWZXJpZmljYXIgYWwgbW9udGFyIGVsIGNvbXBvbmVudGUgc2kgZnVlIHVuIHJlZnJlc2hcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncGFnZVJlZnJlc2hlZCcpID09PSAndHJ1ZScpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3BhZ2VSZWZyZXNoZWQnKTtcbiAgICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgIT09ICcvJykge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL3R2YWxhY2FydGEudmVyY2VsLmFwcC8nO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGhhbmRsZUJlZm9yZVVubG9hZCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBoYW5kbGVMb2FkKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgaGFuZGxlQmVmb3JlVW5sb2FkKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgaGFuZGxlTG9hZCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIC8vIERlc2hhYmlsaXRhciB6b29tIGNvbiB0ZWNsYWRvIHkgZ2VzdG9zXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAvLyBEZXNoYWJpbGl0YXIgQ3RybC9DbWQgKyBQbHVzL01pbnVzLzAgcGFyYSB6b29tXG4gICAgICBpZiAoKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpICYmIChlLmtleSA9PT0gJysnIHx8IGUua2V5ID09PSAnLScgfHwgZS5rZXkgPT09ICcwJykpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZVdoZWVsID0gKGU6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgIC8vIERlc2hhYmlsaXRhciBDdHJsL0NtZCArIHNjcm9sbCBwYXJhIHpvb21cbiAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0ID0gKGU6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIC8vIERlc2hhYmlsaXRhciBwaW5jaC10by16b29tIGVuIGRpc3Bvc2l0aXZvcyB0w6FjdGlsZXNcbiAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlID0gKGU6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIC8vIERlc2hhYmlsaXRhciBwaW5jaC10by16b29tIGVuIGRpc3Bvc2l0aXZvcyB0w6FjdGlsZXNcbiAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQWdyZWdhciBldmVudCBsaXN0ZW5lcnNcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93biwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIGhhbmRsZVdoZWVsLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoYW5kbGVUb3VjaFN0YXJ0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGhhbmRsZVRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGhhbmRsZVdoZWVsKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGhhbmRsZVRvdWNoTW92ZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPEFkbWluUHJvdmlkZXI+XG4gICAgICA8Q2FydFByb3ZpZGVyPlxuICAgICAgICA8Um91dGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTBcIj5cbiAgICAgICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FkbWluXCIgZWxlbWVudD17PEFkbWluUGFuZWwgLz59IC8+XG4gICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiLypcIiBlbGVtZW50PXtcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPEhlYWRlciAvPlxuICAgICAgICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZXM+XG4gICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PEhvbWUgLz59IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvbW92aWVzXCIgZWxlbWVudD17PE1vdmllcyAvPn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi90dlwiIGVsZW1lbnQ9ezxUVlNob3dzIC8+fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL2FuaW1lXCIgZWxlbWVudD17PEFuaW1lIC8+fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL3NlYXJjaFwiIGVsZW1lbnQ9ezxTZWFyY2hQYWdlIC8+fSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL21vdmllLzppZFwiIGVsZW1lbnQ9ezxNb3ZpZURldGFpbCAvPn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi90di86aWRcIiBlbGVtZW50PXs8VFZEZXRhaWwgLz59IC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvY2FydFwiIGVsZW1lbnQ9ezxDYXJ0IC8+fSAvPlxuICAgICAgICAgICAgICAgICAgICA8L1JvdXRlcz5cbiAgICAgICAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgfSAvPlxuICAgICAgICAgICAgPC9Sb3V0ZXM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvUm91dGVyPlxuICAgICAgPC9DYXJ0UHJvdmlkZXI+XG4gICAgPC9BZG1pblByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7YDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVJbmRleENzcygpOiBzdHJpbmcge1xuICByZXR1cm4gYEB0YWlsd2luZCBiYXNlO1xuQHRhaWx3aW5kIGNvbXBvbmVudHM7XG5AdGFpbHdpbmQgdXRpbGl0aWVzO1xuXG4vKiBDb25maWd1cmFjaW9uZXMgYWRpY2lvbmFsZXMgcGFyYSBkZXNoYWJpbGl0YXIgem9vbSAqL1xuQGxheWVyIGJhc2Uge1xuICBodG1sIHtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gICAgLW1zLXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gICAgdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgfVxuICBcbiAgYm9keSB7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIH1cbiAgXG4gIC8qIFBlcm1pdGlyIHNlbGVjY2nDs24gc29sbyBlbiBlbGVtZW50b3MgZGUgZW50cmFkYSAqL1xuICBpbnB1dCwgdGV4dGFyZWEsIFtjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJdIHtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiB0ZXh0ICFpbXBvcnRhbnQ7XG4gICAgLW1vei11c2VyLXNlbGVjdDogdGV4dCAhaW1wb3J0YW50O1xuICAgIC1tcy11c2VyLXNlbGVjdDogdGV4dCAhaW1wb3J0YW50O1xuICAgIHVzZXItc2VsZWN0OiB0ZXh0ICFpbXBvcnRhbnQ7XG4gIH1cbiAgXG4gIC8qIFByZXZlbmlyIHpvb20gYWNjaWRlbnRhbCBlbiBkaXNwb3NpdGl2b3MgbcOzdmlsZXMgKi9cbiAgaW5wdXRbdHlwZT1cInRleHRcIl0sXG4gIGlucHV0W3R5cGU9XCJlbWFpbFwiXSxcbiAgaW5wdXRbdHlwZT1cInRlbFwiXSxcbiAgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLFxuICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLFxuICBpbnB1dFt0eXBlPVwic2VhcmNoXCJdLFxuICB0ZXh0YXJlYSxcbiAgc2VsZWN0IHtcbiAgICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICBhcHBlYXJhbmNlOiBub25lO1xuICB9XG4gIFxuICAvKiBEZXNoYWJpbGl0YXIgem9vbSBlbiBpbcOhZ2VuZXMgKi9cbiAgaW1nIHtcbiAgICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTtcbiAgICAta2h0bWwtdXNlci1kcmFnOiBub25lO1xuICAgIC1tb3otdXNlci1kcmFnOiBub25lO1xuICAgIC1vLXVzZXItZHJhZzogbm9uZTtcbiAgICB1c2VyLWRyYWc6IG5vbmU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cbiAgXG4gIC8qIFBlcm1pdGlyIGludGVyYWNjacOzbiBlbiBib3RvbmVzIGUgaW3DoWdlbmVzIGNsaWNrZWFibGVzICovXG4gIGJ1dHRvbiwgYSwgW3JvbGU9XCJidXR0b25cIl0sIC5jbGlja2FibGUge1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICB9XG4gIFxuICBidXR0b24gaW1nLCBhIGltZywgW3JvbGU9XCJidXR0b25cIl0gaW1nLCAuY2xpY2thYmxlIGltZyB7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cbiAgXG4gIC8qIEN1c3RvbSBhbmltYXRpb25zICovXG4gIEBrZXlmcmFtZXMgc2hyaW5rIHtcbiAgICBmcm9tIHsgd2lkdGg6IDEwMCU7IH1cbiAgICB0byB7IHdpZHRoOiAwJTsgfVxuICB9XG4gIFxuICAuYW5pbWF0ZS1zaHJpbmsge1xuICAgIGFuaW1hdGlvbjogc2hyaW5rIDNzIGxpbmVhciBmb3J3YXJkcztcbiAgfVxuICBcbiAgLyogQW5pbWFjaW9uZXMgcGFyYSBlZmVjdG9zIHZpc3VhbGVzIG1vZGVybm9zICovXG4gIEBrZXlmcmFtZXMgYmxvYiB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpIHNjYWxlKDEpO1xuICAgIH1cbiAgICAzMyUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzBweCwgLTUwcHgpIHNjYWxlKDEuMSk7XG4gICAgfVxuICAgIDY2JSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMjBweCkgc2NhbGUoMC45KTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgsIDBweCkgc2NhbGUoMSk7XG4gICAgfVxuICB9XG4gIFxuICAuYW5pbWF0ZS1ibG9iIHtcbiAgICBhbmltYXRpb246IGJsb2IgN3MgaW5maW5pdGU7XG4gIH1cbiAgXG4gIC5hbmltYXRpb24tZGVsYXktMjAwMCB7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcbiAgfVxuICBcbiAgLmFuaW1hdGlvbi1kZWxheS00MDAwIHtcbiAgICBhbmltYXRpb24tZGVsYXk6IDRzO1xuICB9XG4gIFxuICAuYW5pbWF0aW9uLWRlbGF5LTIwMCB7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyMDBtcztcbiAgfVxuICBcbiAgLmFuaW1hdGlvbi1kZWxheS00MDAge1xuICAgIGFuaW1hdGlvbi1kZWxheTogNDAwbXM7XG4gIH1cbiAgXG4gIC5hbmltYXRpb24tZGVsYXktNjAwIHtcbiAgICBhbmltYXRpb24tZGVsYXk6IDYwMG1zO1xuICB9XG4gIFxuICAvKiBBbmltYWNpb25lcyBwYXJhIGVsIG1vZGFsICovXG4gIEBrZXlmcmFtZXMgZmFkZS1pbiB7XG4gICAgZnJvbSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogc2NhbGUoMC45NSk7IH1cbiAgICB0byB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cbiAgfVxuICBcbiAgLmFuaW1hdGUtaW4ge1xuICAgIGFuaW1hdGlvbjogZmFkZS1pbiAwLjNzIGVhc2Utb3V0O1xuICB9XG4gIFxuICAvKiBFbmhhbmNlZCBob3ZlciBlZmZlY3RzICovXG4gIEBrZXlmcmFtZXMgZ2xvdyB7XG4gICAgMCUsIDEwMCUge1xuICAgICAgYm94LXNoYWRvdzogMCAwIDIwcHggcmdiYSg1OSwgMTMwLCAyNDYsIDAuNSk7XG4gICAgfVxuICAgIDUwJSB7XG4gICAgICBib3gtc2hhZG93OiAwIDAgNDBweCByZ2JhKDU5LCAxMzAsIDI0NiwgMC44KSwgMCAwIDYwcHggcmdiYSgxNDcsIDUxLCAyMzQsIDAuNik7XG4gICAgfVxuICB9XG4gIFxuICAuYW5pbWF0ZS1nbG93IHtcbiAgICBhbmltYXRpb246IGdsb3cgMnMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG4gIH1cbiAgXG4gIC8qIEZsb2F0aW5nIGFuaW1hdGlvbiAqL1xuICBAa2V5ZnJhbWVzIGZsb2F0IHtcbiAgICAwJSwgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTBweCk7XG4gICAgfVxuICB9XG4gIFxuICAuYW5pbWF0ZS1mbG9hdCB7XG4gICAgYW5pbWF0aW9uOiBmbG9hdCAzcyBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgfVxuICBcbiAgLyogU2hpbW1lciBlZmZlY3QgKi9cbiAgQGtleWZyYW1lcyBzaGltbWVyIHtcbiAgICAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgICB9XG4gIH1cbiAgXG4gIC5hbmltYXRlLXNoaW1tZXIge1xuICAgIGFuaW1hdGlvbjogc2hpbW1lciAycyBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgfVxuICBcbiAgLyogRW5oYW5jZWQgcHVsc2UgKi9cbiAgQGtleWZyYW1lcyBlbmhhbmNlZC1wdWxzZSB7XG4gICAgMCUsIDEwMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDUwJSB7XG4gICAgICBvcGFjaXR5OiAwLjg7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIH1cbiAgfVxuICBcbiAgLmFuaW1hdGUtZW5oYW5jZWQtcHVsc2Uge1xuICAgIGFuaW1hdGlvbjogZW5oYW5jZWQtcHVsc2UgMnMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG4gIH1cbn1gO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVZpdGVFbnZEdHMoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGUvY2xpZW50XCIgLz5gO1xufVxuXG4vLyBGdW5jaW9uZXMgcGxhY2Vob2xkZXIgcGFyYSBvdHJvcyBjb21wb25lbnRlcyAoc2UgaW5jbHVpcsOtYW4gbG9zIGPDs2RpZ29zIGNvbXBsZXRvcylcbmZ1bmN0aW9uIGdlbmVyYXRlQ2FydEFuaW1hdGlvbigpOiBzdHJpbmcgeyByZXR1cm4gJy8vIENhcnRBbmltYXRpb24udHN4IHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVDYXN0U2VjdGlvbigpOiBzdHJpbmcgeyByZXR1cm4gJy8vIENhc3RTZWN0aW9uLnRzeCBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlRXJyb3JNZXNzYWdlKCk6IHN0cmluZyB7IHJldHVybiAnLy8gRXJyb3JNZXNzYWdlLnRzeCBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlSGVhZGVyKCk6IHN0cmluZyB7IHJldHVybiAnLy8gSGVhZGVyLnRzeCBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlSGVyb0Nhcm91c2VsKCk6IHN0cmluZyB7IHJldHVybiAnLy8gSGVyb0Nhcm91c2VsLnRzeCBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlTG9hZGluZ1NwaW5uZXIoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBMb2FkaW5nU3Bpbm5lci50c3ggc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZU1vdmllQ2FyZCgpOiBzdHJpbmcgeyByZXR1cm4gJy8vIE1vdmllQ2FyZC50c3ggc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZU9wdGltaXplZEltYWdlKCk6IHN0cmluZyB7IHJldHVybiAnLy8gT3B0aW1pemVkSW1hZ2UudHN4IHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVUb2FzdCgpOiBzdHJpbmcgeyByZXR1cm4gJy8vIFRvYXN0LnRzeCBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlVmlkZW9QbGF5ZXIoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBWaWRlb1BsYXllci50c3ggc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZUhvbWVQYWdlKCk6IHN0cmluZyB7IHJldHVybiAnLy8gSG9tZS50c3ggc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZU1vdmllc1BhZ2UoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBNb3ZpZXMudHN4IHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVUVlNob3dzUGFnZSgpOiBzdHJpbmcgeyByZXR1cm4gJy8vIFRWU2hvd3MudHN4IHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVBbmltZVBhZ2UoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBBbmltZS50c3ggc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZVNlYXJjaFBhZ2UoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBTZWFyY2gudHN4IHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVDYXJ0UGFnZSgpOiBzdHJpbmcgeyByZXR1cm4gJy8vIENhcnQudHN4IHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVNb3ZpZURldGFpbFBhZ2UoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBNb3ZpZURldGFpbC50c3ggc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZVRWRGV0YWlsUGFnZSgpOiBzdHJpbmcgeyByZXR1cm4gJy8vIFRWRGV0YWlsLnRzeCBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlQWRtaW5QYW5lbFBhZ2UoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBBZG1pblBhbmVsLnRzeCBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlQXBpU2VydmljZSgpOiBzdHJpbmcgeyByZXR1cm4gJy8vIGFwaS50cyBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlVG1kYlNlcnZpY2UoKTogc3RyaW5nIHsgcmV0dXJuICcvLyB0bWRiLnRzIHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVDb250ZW50U3luY1NlcnZpY2UoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBjb250ZW50U3luYy50cyBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlQ29udGVudEZpbHRlclNlcnZpY2UoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBjb250ZW50RmlsdGVyLnRzIHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVXaGF0c2FwcFV0aWxzKCk6IHN0cmluZyB7IHJldHVybiAnLy8gd2hhdHNhcHAudHMgc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZVBlcmZvcm1hbmNlVXRpbHMoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBwZXJmb3JtYW5jZS50cyBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlRXJyb3JIYW5kbGVyVXRpbHMoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBlcnJvckhhbmRsZXIudHMgc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZVN5c3RlbUV4cG9ydFV0aWxzKCk6IHN0cmluZyB7IHJldHVybiAnLy8gc3lzdGVtRXhwb3J0LnRzIHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVTb3VyY2VDb2RlR2VuZXJhdG9yVXRpbHMoKTogc3RyaW5nIHsgcmV0dXJuICcvLyBzb3VyY2VDb2RlR2VuZXJhdG9yLnRzIHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVPcHRpbWl6ZWRDb250ZW50SG9vaygpOiBzdHJpbmcgeyByZXR1cm4gJy8vIHVzZU9wdGltaXplZENvbnRlbnQudHMgc291cmNlIGNvZGUnOyB9XG5mdW5jdGlvbiBnZW5lcmF0ZVBlcmZvcm1hbmNlSG9vaygpOiBzdHJpbmcgeyByZXR1cm4gJy8vIHVzZVBlcmZvcm1hbmNlLnRzIHNvdXJjZSBjb2RlJzsgfVxuZnVuY3Rpb24gZ2VuZXJhdGVDb250ZW50U3luY0hvb2soKTogc3RyaW5nIHsgcmV0dXJuICcvLyB1c2VDb250ZW50U3luYy50cyBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlQXBpQ29uZmlnKCk6IHN0cmluZyB7IHJldHVybiAnLy8gYXBpLnRzIGNvbmZpZyBzb3VyY2UgY29kZSc7IH1cbmZ1bmN0aW9uIGdlbmVyYXRlTW92aWVUeXBlcygpOiBzdHJpbmcgeyByZXR1cm4gJy8vIG1vdmllLnRzIHR5cGVzIHNvdXJjZSBjb2RlJzsgfSJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXO0FBRWxCLFNBQVMsa0JBQWtCLDRCQUE0QjtBQUd2RCxzQkFBc0IsMkJBQTJCLGNBQTJDO0FBQzFGLE1BQUk7QUFDRixVQUFNLE1BQU0sSUFBSSxNQUFNO0FBR3RCLFVBQU0sbUJBQW1CLE1BQU0saUJBQWlCO0FBR2hELFVBQU0sK0JBQStCLEtBQUssY0FBYyxnQkFBZ0I7QUFHeEUsVUFBTSxVQUFVLE1BQU0sSUFBSSxjQUFjLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDeEQsVUFBTSxNQUFNLElBQUksZ0JBQWdCLE9BQU87QUFDdkMsVUFBTSxPQUFPLFNBQVMsY0FBYyxHQUFHO0FBQ3ZDLFNBQUssT0FBTztBQUNaLFNBQUssV0FBVyxtQ0FBa0Msb0JBQUksS0FBSyxHQUFFLFlBQVksRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDeEYsYUFBUyxLQUFLLFlBQVksSUFBSTtBQUM5QixTQUFLLE1BQU07QUFDWCxhQUFTLEtBQUssWUFBWSxJQUFJO0FBQzlCLFFBQUksZ0JBQWdCLEdBQUc7QUFBQSxFQUV6QixTQUFTLE9BQU87QUFDZCxZQUFRLE1BQU0sMENBQTBDLEtBQUs7QUFDN0QsVUFBTTtBQUFBLEVBQ1I7QUFDRjtBQUdBLGVBQWUsK0JBQ2IsS0FDQSxjQUNBLGtCQUNlO0FBRWYsYUFBVyxRQUFRLGlCQUFpQixhQUFhO0FBQy9DLFFBQUksVUFBVSxLQUFLO0FBR25CLFFBQUksS0FBSyxTQUFTLGdCQUFnQjtBQUNoQyxVQUFJO0FBQ0YsY0FBTSxNQUFNLEtBQUssTUFBTSxPQUFPO0FBQzlCLFlBQUksVUFBVSxhQUFhLFdBQVc7QUFDdEMsWUFBSSxjQUFjLHFEQUFxRCxJQUFJLE9BQU87QUFDbEYsa0JBQVUsS0FBSyxVQUFVLEtBQUssTUFBTSxDQUFDO0FBQUEsTUFDdkMsU0FBUyxPQUFPO0FBQ2QsZ0JBQVEsS0FBSyxnQ0FBZ0MsS0FBSztBQUFBLE1BQ3BEO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FBSyxLQUFLLE1BQU0sT0FBTztBQUFBLEVBQzdCO0FBR0EsYUFBVyxRQUFRLGlCQUFpQixhQUFhO0FBQy9DLFFBQUksS0FBSyxLQUFLLE1BQU0sS0FBSyxPQUFPO0FBQUEsRUFDbEM7QUFHQSxhQUFXLFFBQVEsaUJBQWlCLGFBQWE7QUFDL0MsVUFBTSxVQUFVLHFCQUFxQixLQUFLLFNBQVMsY0FBYyxLQUFLLElBQUk7QUFDMUUsUUFBSSxLQUFLLEtBQUssTUFBTSxPQUFPO0FBQUEsRUFDN0I7QUFHQSxNQUFJLEtBQUssYUFBYSxlQUFlLFlBQVksQ0FBQztBQUdsRCxNQUFJLEtBQUssc0JBQXNCLEtBQUssVUFBVTtBQUFBLElBQzVDLFNBQVMsYUFBYTtBQUFBLElBQ3RCLGFBQVksb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFBQSxJQUNuQyxRQUFRLGFBQWE7QUFBQSxJQUNyQixlQUFlLGFBQWE7QUFBQSxJQUM1QixRQUFRLGFBQWE7QUFBQSxJQUNyQixVQUFVLGFBQWE7QUFBQSxJQUN2QixZQUFZLGFBQWE7QUFBQSxFQUMzQixHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQ2I7QUFHQSxlQUFlLHVCQUF1QixLQUFZLGNBQTJDO0FBRTNGLE1BQUksS0FBSyxnQkFBZ0Isb0JBQW9CLENBQUM7QUFDOUMsTUFBSSxLQUFLLGtCQUFrQixtQkFBbUIsQ0FBQztBQUMvQyxNQUFJLEtBQUssc0JBQXNCLHVCQUF1QixDQUFDO0FBQ3ZELE1BQUksS0FBSyxpQkFBaUIsaUJBQWlCLENBQUM7QUFDNUMsTUFBSSxLQUFLLHFCQUFxQixvQkFBb0IsQ0FBQztBQUNuRCxNQUFJLEtBQUssc0JBQXNCLHFCQUFxQixDQUFDO0FBQ3JELE1BQUksS0FBSyxxQkFBcUIsc0JBQXNCLENBQUM7QUFDckQsTUFBSSxLQUFLLG9CQUFvQixxQkFBcUIsQ0FBQztBQUNuRCxNQUFJLEtBQUssY0FBYyxrQkFBa0IsQ0FBQztBQUMxQyxNQUFJLEtBQUssZUFBZSxxQkFBcUIsQ0FBQztBQUM5QyxNQUFJLEtBQUssYUFBYSxlQUFlLFlBQVksQ0FBQztBQUdsRCxRQUFNLGVBQWUsSUFBSSxPQUFPLFFBQVE7QUFDeEMsTUFBSSxjQUFjO0FBQ2hCLGlCQUFhLEtBQUssY0FBYyx5QkFBeUIsQ0FBQztBQUFBLEVBQzVEO0FBR0EsUUFBTSxZQUFZLElBQUksT0FBTyxLQUFLO0FBQ2xDLE1BQUksV0FBVztBQUNiLGNBQVUsS0FBSyxZQUFZLGdCQUFnQixDQUFDO0FBQzVDLGNBQVUsS0FBSyxXQUFXLGVBQWUsQ0FBQztBQUMxQyxjQUFVLEtBQUssYUFBYSxpQkFBaUIsQ0FBQztBQUM5QyxjQUFVLEtBQUssaUJBQWlCLG1CQUFtQixDQUFDO0FBR3BELFVBQU0sbUJBQW1CLFVBQVUsT0FBTyxZQUFZO0FBQ3RELFFBQUksa0JBQWtCO0FBQ3BCLHVCQUFpQixLQUFLLHFCQUFxQix3Q0FBd0MsWUFBWSxDQUFDO0FBQ2hHLHVCQUFpQixLQUFLLG9CQUFvQix1Q0FBdUMsWUFBWSxDQUFDO0FBQzlGLHVCQUFpQixLQUFLLGlCQUFpQixvQ0FBb0MsWUFBWSxDQUFDO0FBQ3hGLHVCQUFpQixLQUFLLHFCQUFxQixzQkFBc0IsQ0FBQztBQUNsRSx1QkFBaUIsS0FBSyxtQkFBbUIsb0JBQW9CLENBQUM7QUFDOUQsdUJBQWlCLEtBQUssb0JBQW9CLHFCQUFxQixDQUFDO0FBQ2hFLHVCQUFpQixLQUFLLGNBQWMsZUFBZSxDQUFDO0FBQ3BELHVCQUFpQixLQUFLLG9CQUFvQixxQkFBcUIsQ0FBQztBQUNoRSx1QkFBaUIsS0FBSyxzQkFBc0IsdUJBQXVCLENBQUM7QUFDcEUsdUJBQWlCLEtBQUssaUJBQWlCLGtCQUFrQixDQUFDO0FBQzFELHVCQUFpQixLQUFLLHNCQUFzQix1QkFBdUIsQ0FBQztBQUNwRSx1QkFBaUIsS0FBSyxhQUFhLGNBQWMsQ0FBQztBQUNsRCx1QkFBaUIsS0FBSyxtQkFBbUIsb0JBQW9CLENBQUM7QUFBQSxJQUNoRTtBQUdBLFVBQU0sZ0JBQWdCLFVBQVUsT0FBTyxTQUFTO0FBQ2hELFFBQUksZUFBZTtBQUNqQixvQkFBYyxLQUFLLG9CQUFvQix1Q0FBdUMsWUFBWSxDQUFDO0FBQzNGLG9CQUFjLEtBQUssbUJBQW1CLHNDQUFzQyxZQUFZLENBQUM7QUFBQSxJQUMzRjtBQUdBLFVBQU0sY0FBYyxVQUFVLE9BQU8sT0FBTztBQUM1QyxRQUFJLGFBQWE7QUFDZixrQkFBWSxLQUFLLFlBQVksaUJBQWlCLENBQUM7QUFDL0Msa0JBQVksS0FBSyxjQUFjLG1CQUFtQixDQUFDO0FBQ25ELGtCQUFZLEtBQUssZUFBZSxvQkFBb0IsQ0FBQztBQUNyRCxrQkFBWSxLQUFLLGFBQWEsa0JBQWtCLENBQUM7QUFDakQsa0JBQVksS0FBSyxjQUFjLG1CQUFtQixDQUFDO0FBQ25ELGtCQUFZLEtBQUssWUFBWSxpQkFBaUIsQ0FBQztBQUMvQyxrQkFBWSxLQUFLLG1CQUFtQix3QkFBd0IsQ0FBQztBQUM3RCxrQkFBWSxLQUFLLGdCQUFnQixxQkFBcUIsQ0FBQztBQUN2RCxrQkFBWSxLQUFLLGtCQUFrQix1QkFBdUIsQ0FBQztBQUFBLElBQzdEO0FBR0EsVUFBTSxpQkFBaUIsVUFBVSxPQUFPLFVBQVU7QUFDbEQsUUFBSSxnQkFBZ0I7QUFDbEIscUJBQWUsS0FBSyxVQUFVLG1CQUFtQixDQUFDO0FBQ2xELHFCQUFlLEtBQUssV0FBVyxvQkFBb0IsQ0FBQztBQUNwRCxxQkFBZSxLQUFLLGtCQUFrQiwyQkFBMkIsQ0FBQztBQUNsRSxxQkFBZSxLQUFLLG9CQUFvQiw2QkFBNkIsQ0FBQztBQUFBLElBQ3hFO0FBR0EsVUFBTSxjQUFjLFVBQVUsT0FBTyxPQUFPO0FBQzVDLFFBQUksYUFBYTtBQUNmLGtCQUFZLEtBQUssZUFBZSxzQkFBc0IsQ0FBQztBQUN2RCxrQkFBWSxLQUFLLGtCQUFrQix5QkFBeUIsQ0FBQztBQUM3RCxrQkFBWSxLQUFLLG1CQUFtQiwwQkFBMEIsQ0FBQztBQUMvRCxrQkFBWSxLQUFLLG1CQUFtQiwwQkFBMEIsQ0FBQztBQUMvRCxrQkFBWSxLQUFLLDBCQUEwQixpQ0FBaUMsQ0FBQztBQUFBLElBQy9FO0FBR0EsVUFBTSxjQUFjLFVBQVUsT0FBTyxPQUFPO0FBQzVDLFFBQUksYUFBYTtBQUNmLGtCQUFZLEtBQUssMEJBQTBCLDZCQUE2QixDQUFDO0FBQ3pFLGtCQUFZLEtBQUsscUJBQXFCLHdCQUF3QixDQUFDO0FBQy9ELGtCQUFZLEtBQUsscUJBQXFCLHdCQUF3QixDQUFDO0FBQUEsSUFDakU7QUFHQSxVQUFNLGVBQWUsVUFBVSxPQUFPLFFBQVE7QUFDOUMsUUFBSSxjQUFjO0FBQ2hCLG1CQUFhLEtBQUssVUFBVSxrQkFBa0IsQ0FBQztBQUFBLElBQ2pEO0FBR0EsVUFBTSxjQUFjLFVBQVUsT0FBTyxPQUFPO0FBQzVDLFFBQUksYUFBYTtBQUNmLGtCQUFZLEtBQUssWUFBWSxtQkFBbUIsQ0FBQztBQUFBLElBQ25EO0FBQUEsRUFDRjtBQUNGO0FBSUEsU0FBUyx3Q0FBd0MsY0FBb0M7QUFDbkYsUUFBTSxnQkFBZ0IsS0FBSyxVQUFVLGFBQWEsZUFBZSxNQUFNLENBQUM7QUFDeEUsUUFBTSxTQUFTLEtBQUssVUFBVSxhQUFhLFFBQVEsTUFBTSxDQUFDO0FBRTFELFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxrQ0FJeUIsYUFBYTtBQUFBO0FBQUE7QUFBQSwwQkFHckIsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpWGhDO0FBRUEsU0FBUyx1Q0FBdUMsY0FBb0M7QUFDbEYsUUFBTSxTQUFTLEtBQUssVUFBVSxhQUFhLFFBQVEsTUFBTSxDQUFDO0FBQzFELFFBQU0sU0FBUyxLQUFLLFVBQVUsYUFBYSxRQUFRLE1BQU0sQ0FBQztBQUUxRCxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBSWlCLE1BQU07QUFBQTtBQUFBO0FBQUEsMEJBR04sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc3ZCaEM7QUFFQSxTQUFTLG9DQUFvQyxjQUFvQztBQUMvRSxRQUFNLFNBQVMsS0FBSyxVQUFVLGFBQWEsUUFBUSxNQUFNLENBQUM7QUFFMUQsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUlpQixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMEdoQztBQUVBLFNBQVMsdUNBQXVDLGNBQW9DO0FBQ2xGLFFBQU0sU0FBUyxLQUFLLFVBQVUsY0FBYyxNQUFNLENBQUM7QUFFbkQsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUlpQixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTYxQmhDO0FBRUEsU0FBUyxzQ0FBc0MsY0FBb0M7QUFDakYsUUFBTSxTQUFTLEtBQUssVUFBVSxhQUFhLFFBQVEsTUFBTSxDQUFDO0FBRTFELFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUtpQixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK1FoQztBQUlBLFNBQVMsc0JBQThCO0FBQ3JDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtEVDtBQUVBLFNBQVMscUJBQTZCO0FBQ3BDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZVQ7QUFFQSxTQUFTLHlCQUFpQztBQUN4QyxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRVDtBQUVBLFNBQVMsbUJBQTJCO0FBQ2xDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPVDtBQUVBLFNBQVMsc0JBQThCO0FBQ3JDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd0JUO0FBRUEsU0FBUyx1QkFBK0I7QUFDdEMsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNCVDtBQUVBLFNBQVMsd0JBQWdDO0FBQ3ZDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTVQ7QUFFQSxTQUFTLHVCQUErQjtBQUN0QyxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE2QlQ7QUFFQSxTQUFTLG9CQUE0QjtBQUNuQyxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3RFQ7QUFFQSxTQUFTLHVCQUErQjtBQUN0QyxTQUFPO0FBQ1Q7QUFFQSxTQUFTLDJCQUFtQztBQUMxQyxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVlUO0FBRUEsU0FBUyxlQUFlLGNBQW9DO0FBQzFELFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNUCxhQUFhLE9BQU87QUFBQTtBQUFBO0FBQUEsR0FHcEIsb0JBQUksS0FBSyxHQUFFLFlBQVksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBS1YsYUFBYSxPQUFPLFVBQVU7QUFBQSxhQUNqQyxhQUFhLE9BQU8sV0FBVztBQUFBLDJCQUNqQixhQUFhLE9BQU8scUJBQXFCO0FBQUEsY0FDdEQsYUFBYSxPQUFPLG9CQUFvQjtBQUFBO0FBQUE7QUFBQSxzQkFHaEMsYUFBYSxjQUFjLE1BQU07QUFBQTtBQUFBO0FBQUEsU0FHOUMsYUFBYSxPQUFPLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0NuQztBQUVBLFNBQVMsa0JBQTBCO0FBQ2pDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVVDtBQUVBLFNBQVMsaUJBQXlCO0FBQ2hDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXNJVDtBQUVBLFNBQVMsbUJBQTJCO0FBQ2xDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlMVDtBQUVBLFNBQVMscUJBQTZCO0FBQ3BDLFNBQU87QUFDVDtBQUdBLFNBQVMsd0JBQWdDO0FBQUUsU0FBTztBQUFvQztBQUN0RixTQUFTLHNCQUE4QjtBQUFFLFNBQU87QUFBa0M7QUFDbEYsU0FBUyx1QkFBK0I7QUFBRSxTQUFPO0FBQW1DO0FBQ3BGLFNBQVMsaUJBQXlCO0FBQUUsU0FBTztBQUE2QjtBQUN4RSxTQUFTLHVCQUErQjtBQUFFLFNBQU87QUFBbUM7QUFDcEYsU0FBUyx5QkFBaUM7QUFBRSxTQUFPO0FBQXFDO0FBQ3hGLFNBQVMsb0JBQTRCO0FBQUUsU0FBTztBQUFnQztBQUM5RSxTQUFTLHlCQUFpQztBQUFFLFNBQU87QUFBcUM7QUFDeEYsU0FBUyxnQkFBd0I7QUFBRSxTQUFPO0FBQTRCO0FBQ3RFLFNBQVMsc0JBQThCO0FBQUUsU0FBTztBQUFrQztBQUNsRixTQUFTLG1CQUEyQjtBQUFFLFNBQU87QUFBMkI7QUFDeEUsU0FBUyxxQkFBNkI7QUFBRSxTQUFPO0FBQTZCO0FBQzVFLFNBQVMsc0JBQThCO0FBQUUsU0FBTztBQUE4QjtBQUM5RSxTQUFTLG9CQUE0QjtBQUFFLFNBQU87QUFBNEI7QUFDMUUsU0FBUyxxQkFBNkI7QUFBRSxTQUFPO0FBQTZCO0FBQzVFLFNBQVMsbUJBQTJCO0FBQUUsU0FBTztBQUEyQjtBQUN4RSxTQUFTLDBCQUFrQztBQUFFLFNBQU87QUFBa0M7QUFDdEYsU0FBUyx1QkFBK0I7QUFBRSxTQUFPO0FBQStCO0FBQ2hGLFNBQVMseUJBQWlDO0FBQUUsU0FBTztBQUFpQztBQUNwRixTQUFTLHFCQUE2QjtBQUFFLFNBQU87QUFBeUI7QUFDeEUsU0FBUyxzQkFBOEI7QUFBRSxTQUFPO0FBQTBCO0FBQzFFLFNBQVMsNkJBQXFDO0FBQUUsU0FBTztBQUFpQztBQUN4RixTQUFTLCtCQUF1QztBQUFFLFNBQU87QUFBbUM7QUFDNUYsU0FBUyx3QkFBZ0M7QUFBRSxTQUFPO0FBQThCO0FBQ2hGLFNBQVMsMkJBQW1DO0FBQUUsU0FBTztBQUFpQztBQUN0RixTQUFTLDRCQUFvQztBQUFFLFNBQU87QUFBa0M7QUFDeEYsU0FBUyw0QkFBb0M7QUFBRSxTQUFPO0FBQWtDO0FBQ3hGLFNBQVMsbUNBQTJDO0FBQUUsU0FBTztBQUF5QztBQUN0RyxTQUFTLCtCQUF1QztBQUFFLFNBQU87QUFBeUM7QUFDbEcsU0FBUywwQkFBa0M7QUFBRSxTQUFPO0FBQW9DO0FBQ3hGLFNBQVMsMEJBQWtDO0FBQUUsU0FBTztBQUFvQztBQUN4RixTQUFTLG9CQUE0QjtBQUFFLFNBQU87QUFBZ0M7QUFDOUUsU0FBUyxxQkFBNkI7QUFBRSxTQUFPO0FBQWlDOyIsIm5hbWVzIjpbXX0=