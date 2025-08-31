// Application constants for better maintainability

export const APP_CONFIG = {
  name: 'TV a la Carta',
  version: '2.0.0',
  description: 'Películas y series ilimitadas y mucho más',
  contact: {
    phone: '+5354690878',
    whatsapp: '5354690878'
  },
  urls: {
    main: 'https://tvalacarta.vercel.app/',
    fallback: 'https://tvalacarta.vercel.app/'
  }
} as const;

export const CACHE_KEYS = {
  CART: 'movieCart',
  ADMIN_STATE: 'admin_system_state',
  CONTENT_VIDEOS: 'content_videos',
  TRENDING_DAY: 'trending_day',
  TRENDING_WEEK: 'trending_week',
  POPULAR_MOVIES: 'popular_movies',
  POPULAR_TV: 'popular_tv',
  POPULAR_ANIME: 'popular_anime'
} as const;

export const CACHE_TTL = {
  SHORT: 5 * 60 * 1000,      // 5 minutes
  MEDIUM: 15 * 60 * 1000,    // 15 minutes
  LONG: 60 * 60 * 1000,      // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000  // 24 hours
} as const;

export const PERFORMANCE_THRESHOLDS = {
  GOOD_LCP: 2500,     // ms
  GOOD_FID: 100,      // ms
  GOOD_CLS: 0.1,      // score
  GOOD_LOAD_TIME: 3000 // ms
} as const;

export const UI_CONSTANTS = {
  DEBOUNCE_DELAY: 500,
  THROTTLE_DELAY: 100,
  ANIMATION_DURATION: 300,
  CAROUSEL_INTERVAL: 6000,
  TOAST_DURATION: 3000,
  MODAL_ANIMATION_DURATION: 300
} as const;

export const GRID_LAYOUTS = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
  LARGE_DESKTOP: 5
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

export const DEFAULT_PRICES = {
  MOVIE: 80,
  SERIES: 300,
  TRANSFER_FEE: 10,
  NOVEL_PER_CHAPTER: 5
} as const;

export const ADMIN_CREDENTIALS = {
  USERNAME: 'admin',
  PASSWORD: 'admin123'
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  NOT_FOUND: 'Contenido no encontrado.',
  GENERIC_ERROR: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
  SEARCH_ERROR: 'Error en la búsqueda. Por favor, intenta con otros términos.',
  CART_ERROR: 'Error al procesar el carrito. Por favor, intenta de nuevo.',
  ADMIN_ERROR: 'Error en el panel de administración. Verifica tus permisos.'
} as const;

export const SUCCESS_MESSAGES = {
  ITEM_ADDED: 'Elemento agregado al carrito',
  ITEM_REMOVED: 'Elemento retirado del carrito',
  CART_CLEARED: 'Carrito vaciado',
  ORDER_SENT: 'Pedido enviado correctamente',
  SETTINGS_SAVED: 'Configuración guardada',
  SYNC_COMPLETE: 'Sincronización completada'
} as const;