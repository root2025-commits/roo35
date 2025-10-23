export const generateSystemReadme = (adminState) => `# TV a la Carta - Sistema de Gestión

## Descripción
Sistema completo de gestión para TV a la Carta con panel de administración, carrito de compras y sincronización en tiempo real.

## Versión
${adminState.systemConfig?.version || "2.1.0"}

## Última Exportación
${(/* @__PURE__ */ new Date()).toISOString()}

## Configuración Actual

### Precios
- Películas: $${adminState.prices?.moviePrice || 80} CUP
- Series: $${adminState.prices?.seriesPrice || 300} CUP por temporada
- Recargo transferencia: ${adminState.prices?.transferFeePercentage || 10}%
- Novelas: $${adminState.prices?.novelPricePerChapter || 5} CUP por capítulo

### Zonas de Entrega
Total configuradas: ${adminState.deliveryZones?.length || 0}

### Novelas Administradas
Total: ${adminState.novels?.length || 0}

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
3. Contraseña: admin123

## Tecnologías
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Lucide Icons
- JSZip

## Contacto
WhatsApp: +5354690878
`;
export const generateSystemConfig = (adminState) => {
  const config = {
    version: adminState.systemConfig?.version || "2.1.0",
    lastExport: (/* @__PURE__ */ new Date()).toISOString(),
    exportedBy: "TV a la Carta Admin Panel",
    prices: adminState.prices || {
      moviePrice: 80,
      seriesPrice: 300,
      transferFeePercentage: 10,
      novelPricePerChapter: 5
    },
    deliveryZones: adminState.deliveryZones || [],
    novels: adminState.novels || [],
    settings: adminState.systemConfig?.settings || {
      autoSync: true,
      syncInterval: 3e5,
      enableNotifications: true,
      maxNotifications: 100
    },
    metadata: {
      totalOrders: adminState.systemConfig?.metadata?.totalOrders || 0,
      totalRevenue: adminState.systemConfig?.metadata?.totalRevenue || 0,
      lastOrderDate: adminState.systemConfig?.metadata?.lastOrderDate || "",
      systemUptime: adminState.systemConfig?.metadata?.systemUptime || (/* @__PURE__ */ new Date()).toISOString(),
      exportTimestamp: (/* @__PURE__ */ new Date()).toISOString()
    },
    notifications: adminState.notifications || [],
    syncStatus: adminState.syncStatus || {
      lastSync: (/* @__PURE__ */ new Date()).toISOString(),
      isOnline: true,
      pendingChanges: 0
    }
  };
  return JSON.stringify(config, null, 2);
};
export const generateUpdatedPackageJson = () => `{
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
export const getViteConfig = () => `import { defineConfig } from 'vite';
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
export const getTailwindConfig = () => `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
export const getIndexHtml = () => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/unnamed.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <base href="/" />
    <title>TV a la Carta: Películas y series ilimitadas y mucho más</title>
    <style>
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      body {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
        touch-action: manipulation;
      }
      
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
export const getNetlifyRedirects = () => `# Netlify redirects for SPA routing
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
export const getVercelConfig = () => `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`;
export const getMainTsxSource = () => `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;
export const getIndexCssSource = () => `@tailwind base;
@tailwind components;
@tailwind utilities;

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
  
  input, textarea, [contenteditable="true"] {
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    user-select: text !important;
  }
  
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
  
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    pointer-events: none;
  }
  
  button, a, [role="button"], .clickable {
    pointer-events: auto;
  }
  
  button img, a img, [role="button"] img, .clickable img {
    pointer-events: none;
  }
  
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
  
  .animate-shrink {
    animation: shrink 3s linear forwards;
  }
}`;
export const getAppTsxSource = () => `// App.tsx source code would be here`;
export const getAdminContextSource = (state) => `// AdminContext.tsx source code with state: ${JSON.stringify(state, null, 2)}`;
export const getCartContextSource = (state) => `// CartContext.tsx source code with state`;
export const getCheckoutModalSource = (state) => `// CheckoutModal.tsx source code with state`;
export const getPriceCardSource = (state) => `// PriceCard.tsx source code with state`;
export const getNovelasModalSource = (state) => `// NovelasModal.tsx source code with state`;
export const getToastSource = () => `// Toast.tsx source code`;
export const getOptimizedImageSource = () => `// OptimizedImage.tsx source code`;
export const getLoadingSpinnerSource = () => `// LoadingSpinner.tsx source code`;
export const getErrorMessageSource = () => `// ErrorMessage.tsx source code`;
export const getSystemExportSource = () => `// systemExport.ts source code`;
export const getWhatsAppUtilsSource = () => `// whatsapp.ts source code`;
export const getPerformanceUtilsSource = () => `// performance.ts source code`;
export const getErrorHandlerSource = () => `// errorHandler.ts source code`;
export const getTmdbServiceSource = () => `// tmdb.ts source code`;
export const getApiServiceSource = () => `// api.ts source code`;
export const getContentSyncSource = () => `// contentSync.ts source code`;
export const getApiConfigSource = () => `// api.ts config source code`;
export const getMovieTypesSource = () => `// movie.ts types source code`;
export const getOptimizedContentHookSource = () => `// useOptimizedContent.ts source code`;
export const getPerformanceHookSource = () => `// usePerformance.ts source code`;
export const getContentSyncHookSource = () => `// useContentSync.ts source code`;
export const getHomePageSource = () => `// Home.tsx source code`;
export const getMoviesPageSource = () => `// Movies.tsx source code`;
export const getTVShowsPageSource = () => `// TVShows.tsx source code`;
export const getAnimePageSource = () => `// Anime.tsx source code`;
export const getSearchPageSource = () => `// Search.tsx source code`;
export const getCartPageSource = () => `// Cart.tsx source code`;
export const getMovieDetailPageSource = () => `// MovieDetail.tsx source code`;
export const getTVDetailPageSource = () => `// TVDetail.tsx source code`;
export const getAdminPanelSource = () => `// AdminPanel.tsx source code`;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbUV4cG9ydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTeXN0ZW0gZXhwb3J0IHV0aWxpdGllcyBmb3IgY29tcHJlaGVuc2l2ZSBiYWNrdXAgYW5kIGNvbmZpZ3VyYXRpb24gbWFuYWdlbWVudFxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTeXN0ZW1SZWFkbWUgPSAoYWRtaW5TdGF0ZTogYW55KSA9PiBgIyBUViBhIGxhIENhcnRhIC0gU2lzdGVtYSBkZSBHZXN0acOzblxuXG4jIyBEZXNjcmlwY2nDs25cblNpc3RlbWEgY29tcGxldG8gZGUgZ2VzdGnDs24gcGFyYSBUViBhIGxhIENhcnRhIGNvbiBwYW5lbCBkZSBhZG1pbmlzdHJhY2nDs24sIGNhcnJpdG8gZGUgY29tcHJhcyB5IHNpbmNyb25pemFjacOzbiBlbiB0aWVtcG8gcmVhbC5cblxuIyMgVmVyc2nDs25cbiR7YWRtaW5TdGF0ZS5zeXN0ZW1Db25maWc/LnZlcnNpb24gfHwgJzIuMS4wJ31cblxuIyMgw5psdGltYSBFeHBvcnRhY2nDs25cbiR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfVxuXG4jIyBDb25maWd1cmFjacOzbiBBY3R1YWxcblxuIyMjIFByZWNpb3Ncbi0gUGVsw61jdWxhczogJCR7YWRtaW5TdGF0ZS5wcmljZXM/Lm1vdmllUHJpY2UgfHwgODB9IENVUFxuLSBTZXJpZXM6ICQke2FkbWluU3RhdGUucHJpY2VzPy5zZXJpZXNQcmljZSB8fCAzMDB9IENVUCBwb3IgdGVtcG9yYWRhXG4tIFJlY2FyZ28gdHJhbnNmZXJlbmNpYTogJHthZG1pblN0YXRlLnByaWNlcz8udHJhbnNmZXJGZWVQZXJjZW50YWdlIHx8IDEwfSVcbi0gTm92ZWxhczogJCR7YWRtaW5TdGF0ZS5wcmljZXM/Lm5vdmVsUHJpY2VQZXJDaGFwdGVyIHx8IDV9IENVUCBwb3IgY2Fww610dWxvXG5cbiMjIyBab25hcyBkZSBFbnRyZWdhXG5Ub3RhbCBjb25maWd1cmFkYXM6ICR7YWRtaW5TdGF0ZS5kZWxpdmVyeVpvbmVzPy5sZW5ndGggfHwgMH1cblxuIyMjIE5vdmVsYXMgQWRtaW5pc3RyYWRhc1xuVG90YWw6ICR7YWRtaW5TdGF0ZS5ub3ZlbHM/Lmxlbmd0aCB8fCAwfVxuXG4jIyBDYXJhY3RlcsOtc3RpY2FzXG4tIOKchSBQYW5lbCBkZSBhZG1pbmlzdHJhY2nDs24gY29tcGxldG9cbi0g4pyFIFNpbmNyb25pemFjacOzbiBlbiB0aWVtcG8gcmVhbFxuLSDinIUgR2VzdGnDs24gZGUgcHJlY2lvcyBkaW7DoW1pY29zXG4tIOKchSBab25hcyBkZSBlbnRyZWdhIHBlcnNvbmFsaXphYmxlc1xuLSDinIUgQ2F0w6Fsb2dvIGRlIG5vdmVsYXMgYWRtaW5pc3RyYWJsZVxuLSDinIUgU2lzdGVtYSBkZSBub3RpZmljYWNpb25lc1xuLSDinIUgRXhwb3J0YWNpw7NuL0ltcG9ydGFjacOzbiBkZSBjb25maWd1cmFjacOzblxuLSDinIUgT3B0aW1pemFjacOzbiBkZSByZW5kaW1pZW50b1xuLSDinIUgQ2Fycml0byBkZSBjb21wcmFzIGF2YW56YWRvXG4tIOKchSBJbnRlZ3JhY2nDs24gY29uIFdoYXRzQXBwXG5cbiMjIEluc3RhbGFjacOzblxuXFxgXFxgXFxgYmFzaFxubnBtIGluc3RhbGxcbm5wbSBydW4gZGV2XG5cXGBcXGBcXGBcblxuIyMgVXNvIGRlbCBQYW5lbCBkZSBBZG1pbmlzdHJhY2nDs25cbjEuIEFjY2VkZXIgYSAvYWRtaW5cbjIuIFVzdWFyaW86IGFkbWluXG4zLiBDb250cmFzZcOxYTogYWRtaW4xMjNcblxuIyMgVGVjbm9sb2fDrWFzXG4tIFJlYWN0IDE4XG4tIFR5cGVTY3JpcHRcbi0gVGFpbHdpbmQgQ1NTXG4tIFZpdGVcbi0gUmVhY3QgUm91dGVyXG4tIEx1Y2lkZSBJY29uc1xuLSBKU1ppcFxuXG4jIyBDb250YWN0b1xuV2hhdHNBcHA6ICs1MzU0NjkwODc4XG5gO1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTeXN0ZW1Db25maWcgPSAoYWRtaW5TdGF0ZTogYW55KSA9PiB7XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICB2ZXJzaW9uOiBhZG1pblN0YXRlLnN5c3RlbUNvbmZpZz8udmVyc2lvbiB8fCAnMi4xLjAnLFxuICAgIGxhc3RFeHBvcnQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICBleHBvcnRlZEJ5OiAnVFYgYSBsYSBDYXJ0YSBBZG1pbiBQYW5lbCcsXG4gICAgcHJpY2VzOiBhZG1pblN0YXRlLnByaWNlcyB8fCB7XG4gICAgICBtb3ZpZVByaWNlOiA4MCxcbiAgICAgIHNlcmllc1ByaWNlOiAzMDAsXG4gICAgICB0cmFuc2ZlckZlZVBlcmNlbnRhZ2U6IDEwLFxuICAgICAgbm92ZWxQcmljZVBlckNoYXB0ZXI6IDUsXG4gICAgfSxcbiAgICBkZWxpdmVyeVpvbmVzOiBhZG1pblN0YXRlLmRlbGl2ZXJ5Wm9uZXMgfHwgW10sXG4gICAgbm92ZWxzOiBhZG1pblN0YXRlLm5vdmVscyB8fCBbXSxcbiAgICBzZXR0aW5nczogYWRtaW5TdGF0ZS5zeXN0ZW1Db25maWc/LnNldHRpbmdzIHx8IHtcbiAgICAgIGF1dG9TeW5jOiB0cnVlLFxuICAgICAgc3luY0ludGVydmFsOiAzMDAwMDAsXG4gICAgICBlbmFibGVOb3RpZmljYXRpb25zOiB0cnVlLFxuICAgICAgbWF4Tm90aWZpY2F0aW9uczogMTAwLFxuICAgIH0sXG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIHRvdGFsT3JkZXJzOiBhZG1pblN0YXRlLnN5c3RlbUNvbmZpZz8ubWV0YWRhdGE/LnRvdGFsT3JkZXJzIHx8IDAsXG4gICAgICB0b3RhbFJldmVudWU6IGFkbWluU3RhdGUuc3lzdGVtQ29uZmlnPy5tZXRhZGF0YT8udG90YWxSZXZlbnVlIHx8IDAsXG4gICAgICBsYXN0T3JkZXJEYXRlOiBhZG1pblN0YXRlLnN5c3RlbUNvbmZpZz8ubWV0YWRhdGE/Lmxhc3RPcmRlckRhdGUgfHwgJycsXG4gICAgICBzeXN0ZW1VcHRpbWU6IGFkbWluU3RhdGUuc3lzdGVtQ29uZmlnPy5tZXRhZGF0YT8uc3lzdGVtVXB0aW1lIHx8IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIGV4cG9ydFRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgIH0sXG4gICAgbm90aWZpY2F0aW9uczogYWRtaW5TdGF0ZS5ub3RpZmljYXRpb25zIHx8IFtdLFxuICAgIHN5bmNTdGF0dXM6IGFkbWluU3RhdGUuc3luY1N0YXR1cyB8fCB7XG4gICAgICBsYXN0U3luYzogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgaXNPbmxpbmU6IHRydWUsXG4gICAgICBwZW5kaW5nQ2hhbmdlczogMCxcbiAgICB9XG4gIH07XG4gIFxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY29uZmlnLCBudWxsLCAyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVVwZGF0ZWRQYWNrYWdlSnNvbiA9ICgpID0+IGB7XG4gIFwibmFtZVwiOiBcInR2LWEtbGEtY2FydGEtc2lzdGVtYS1jb21wbGV0b1wiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMi4xLjBcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJTaXN0ZW1hIGNvbXBsZXRvIGRlIGdlc3Rpw7NuIHBhcmEgVFYgYSBsYSBDYXJ0YSBjb24gcGFuZWwgZGUgYWRtaW5pc3RyYWNpw7NuXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLlwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjI0LjIuMVwiLFxuICAgIFwianN6aXBcIjogXCJeMy4xMC4xXCIsXG4gICAgXCJsdWNpZGUtcmVhY3RcIjogXCJeMC4zNDQuMFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMy4xXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMy4xXCIsXG4gICAgXCJyZWFjdC1yb3V0ZXItZG9tXCI6IFwiXjcuOC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVzbGludC9qc1wiOiBcIl45LjkuMVwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjMuNVwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4zLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMy4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjkuOS4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjUuMS4wLXJjLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtcmVmcmVzaFwiOiBcIl4wLjQuMTFcIixcbiAgICBcImdsb2JhbHNcIjogXCJeMTUuOS4wXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zNVwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS41LjNcIixcbiAgICBcInR5cGVzY3JpcHQtZXNsaW50XCI6IFwiXjguMy4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4yXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJ0dlwiLFxuICAgIFwibW92aWVzXCIsXG4gICAgXCJzZXJpZXNcIixcbiAgICBcImFuaW1lXCIsXG4gICAgXCJzdHJlYW1pbmdcIixcbiAgICBcImNhcnRcIixcbiAgICBcImFkbWluXCIsXG4gICAgXCJyZWFjdFwiLFxuICAgIFwidHlwZXNjcmlwdFwiXG4gIF0sXG4gIFwiYXV0aG9yXCI6IFwiVFYgYSBsYSBDYXJ0YVwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIlxufWA7XG5cbi8vIEFkZGl0aW9uYWwgdXRpbGl0eSBmdW5jdGlvbnMgZm9yIGNvbXBsZXRlIHN5c3RlbSBleHBvcnRcbmV4cG9ydCBjb25zdCBnZXRWaXRlQ29uZmlnID0gKCkgPT4gYGltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICBoaXN0b3J5QXBpRmFsbGJhY2s6IHRydWUsXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBoaXN0b3J5QXBpRmFsbGJhY2s6IHRydWUsXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG59KTtgO1xuXG5leHBvcnQgY29uc3QgZ2V0VGFpbHdpbmRDb25maWcgPSAoKSA9PiBgLyoqIEB0eXBlIHtpbXBvcnQoJ3RhaWx3aW5kY3NzJykuQ29uZmlnfSAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb250ZW50OiBbJy4vaW5kZXguaHRtbCcsICcuL3NyYy8qKi8qLntqcyx0cyxqc3gsdHN4fSddLFxuICB0aGVtZToge1xuICAgIGV4dGVuZDoge30sXG4gIH0sXG4gIHBsdWdpbnM6IFtdLFxufTtgO1xuXG5leHBvcnQgY29uc3QgZ2V0SW5kZXhIdG1sID0gKCkgPT4gYDwhZG9jdHlwZSBodG1sPlxuPGh0bWwgbGFuZz1cImVuXCI+XG4gIDxoZWFkPlxuICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiIC8+XG4gICAgPGxpbmsgcmVsPVwiaWNvblwiIHR5cGU9XCJpbWFnZS9wbmdcIiBocmVmPVwiL3VubmFtZWQucG5nXCIgLz5cbiAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLjAsIG1pbmltdW0tc2NhbGU9MS4wLCB1c2VyLXNjYWxhYmxlPW5vXCIgLz5cbiAgICA8YmFzZSBocmVmPVwiL1wiIC8+XG4gICAgPHRpdGxlPlRWIGEgbGEgQ2FydGE6IFBlbMOtY3VsYXMgeSBzZXJpZXMgaWxpbWl0YWRhcyB5IG11Y2hvIG3DoXM8L3RpdGxlPlxuICAgIDxzdHlsZT5cbiAgICAgICoge1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlucHV0LCB0ZXh0YXJlYSwgW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0ge1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgICAgICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgICAgIHVzZXItc2VsZWN0OiB0ZXh0O1xuICAgICAgfVxuICAgICAgXG4gICAgICBib2R5IHtcbiAgICAgICAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xuICAgICAgICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgICAgICAgdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgICAgICAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlucHV0W3R5cGU9XCJ0ZXh0XCJdLFxuICAgICAgaW5wdXRbdHlwZT1cImVtYWlsXCJdLFxuICAgICAgaW5wdXRbdHlwZT1cInRlbFwiXSxcbiAgICAgIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSxcbiAgICAgIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sXG4gICAgICBpbnB1dFt0eXBlPVwic2VhcmNoXCJdLFxuICAgICAgdGV4dGFyZWEsXG4gICAgICBzZWxlY3Qge1xuICAgICAgICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcbiAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICB9XG4gICAgPC9zdHlsZT5cbiAgPC9oZWFkPlxuICA8Ym9keT5cbiAgICA8ZGl2IGlkPVwicm9vdFwiPjwvZGl2PlxuICAgIDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiIHNyYz1cIi9zcmMvbWFpbi50c3hcIj48L3NjcmlwdD5cbiAgPC9ib2R5PlxuPC9odG1sPmA7XG5cbmV4cG9ydCBjb25zdCBnZXROZXRsaWZ5UmVkaXJlY3RzID0gKCkgPT4gYCMgTmV0bGlmeSByZWRpcmVjdHMgZm9yIFNQQSByb3V0aW5nXG4vKiAgICAvaW5kZXguaHRtbCAgIDIwMFxuXG4jIEhhbmRsZSBzcGVjaWZpYyByb3V0ZXNcbi9tb3ZpZXMgICAgL2luZGV4Lmh0bWwgICAyMDBcbi90diAgICAgICAgL2luZGV4Lmh0bWwgICAyMDBcbi9hbmltZSAgICAgL2luZGV4Lmh0bWwgICAyMDBcbi9jYXJ0ICAgICAgL2luZGV4Lmh0bWwgICAyMDBcbi9zZWFyY2ggICAgL2luZGV4Lmh0bWwgICAyMDBcbi9tb3ZpZS8qICAgL2luZGV4Lmh0bWwgICAyMDBcbi90di8qICAgICAgL2luZGV4Lmh0bWwgICAyMDBcbi9hZG1pbiAgICAgL2luZGV4Lmh0bWwgICAyMDBgO1xuXG5leHBvcnQgY29uc3QgZ2V0VmVyY2VsQ29uZmlnID0gKCkgPT4gYHsgXCJyZXdyaXRlc1wiOiBbeyBcInNvdXJjZVwiOiBcIi8oLiopXCIsIFwiZGVzdGluYXRpb25cIjogXCIvXCIgfV0gfWA7XG5cbi8vIENvbXBvbmVudCBzb3VyY2UgY29kZSBnZW5lcmF0b3JzXG5leHBvcnQgY29uc3QgZ2V0TWFpblRzeFNvdXJjZSA9ICgpID0+IGBpbXBvcnQgeyBTdHJpY3RNb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gJ3JlYWN0LWRvbS9jbGllbnQnO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC50c3gnO1xuaW1wb3J0ICcuL2luZGV4LmNzcyc7XG5cbmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSEpLnJlbmRlcihcbiAgPFN0cmljdE1vZGU+XG4gICAgPEFwcCAvPlxuICA8L1N0cmljdE1vZGU+XG4pO2A7XG5cbmV4cG9ydCBjb25zdCBnZXRJbmRleENzc1NvdXJjZSA9ICgpID0+IGBAdGFpbHdpbmQgYmFzZTtcbkB0YWlsd2luZCBjb21wb25lbnRzO1xuQHRhaWx3aW5kIHV0aWxpdGllcztcblxuQGxheWVyIGJhc2Uge1xuICBodG1sIHtcbiAgICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gICAgLW1zLXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gICAgdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgfVxuICBcbiAgYm9keSB7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIH1cbiAgXG4gIGlucHV0LCB0ZXh0YXJlYSwgW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0ge1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IHRleHQgIWltcG9ydGFudDtcbiAgICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0ICFpbXBvcnRhbnQ7XG4gICAgLW1zLXVzZXItc2VsZWN0OiB0ZXh0ICFpbXBvcnRhbnQ7XG4gICAgdXNlci1zZWxlY3Q6IHRleHQgIWltcG9ydGFudDtcbiAgfVxuICBcbiAgaW5wdXRbdHlwZT1cInRleHRcIl0sXG4gIGlucHV0W3R5cGU9XCJlbWFpbFwiXSxcbiAgaW5wdXRbdHlwZT1cInRlbFwiXSxcbiAgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLFxuICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLFxuICBpbnB1dFt0eXBlPVwic2VhcmNoXCJdLFxuICB0ZXh0YXJlYSxcbiAgc2VsZWN0IHtcbiAgICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICBhcHBlYXJhbmNlOiBub25lO1xuICB9XG4gIFxuICBpbWcge1xuICAgIC13ZWJraXQtdXNlci1kcmFnOiBub25lO1xuICAgIC1raHRtbC11c2VyLWRyYWc6IG5vbmU7XG4gICAgLW1vei11c2VyLWRyYWc6IG5vbmU7XG4gICAgLW8tdXNlci1kcmFnOiBub25lO1xuICAgIHVzZXItZHJhZzogbm9uZTtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuICBcbiAgYnV0dG9uLCBhLCBbcm9sZT1cImJ1dHRvblwiXSwgLmNsaWNrYWJsZSB7XG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gIH1cbiAgXG4gIGJ1dHRvbiBpbWcsIGEgaW1nLCBbcm9sZT1cImJ1dHRvblwiXSBpbWcsIC5jbGlja2FibGUgaW1nIHtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuICBcbiAgQGtleWZyYW1lcyBzaHJpbmsge1xuICAgIGZyb20geyB3aWR0aDogMTAwJTsgfVxuICAgIHRvIHsgd2lkdGg6IDAlOyB9XG4gIH1cbiAgXG4gIC5hbmltYXRlLXNocmluayB7XG4gICAgYW5pbWF0aW9uOiBzaHJpbmsgM3MgbGluZWFyIGZvcndhcmRzO1xuICB9XG59YDtcblxuLy8gUGxhY2Vob2xkZXIgZnVuY3Rpb25zIGZvciBvdGhlciBjb21wb25lbnRzICh0aGVzZSB3b3VsZCBjb250YWluIHRoZSBhY3R1YWwgc291cmNlIGNvZGUpXG5leHBvcnQgY29uc3QgZ2V0QXBwVHN4U291cmNlID0gKCkgPT4gYC8vIEFwcC50c3ggc291cmNlIGNvZGUgd291bGQgYmUgaGVyZWA7XG5leHBvcnQgY29uc3QgZ2V0QWRtaW5Db250ZXh0U291cmNlID0gKHN0YXRlOiBhbnkpID0+IGAvLyBBZG1pbkNvbnRleHQudHN4IHNvdXJjZSBjb2RlIHdpdGggc3RhdGU6ICR7SlNPTi5zdHJpbmdpZnkoc3RhdGUsIG51bGwsIDIpfWA7XG5leHBvcnQgY29uc3QgZ2V0Q2FydENvbnRleHRTb3VyY2UgPSAoc3RhdGU6IGFueSkgPT4gYC8vIENhcnRDb250ZXh0LnRzeCBzb3VyY2UgY29kZSB3aXRoIHN0YXRlYDtcbmV4cG9ydCBjb25zdCBnZXRDaGVja291dE1vZGFsU291cmNlID0gKHN0YXRlOiBhbnkpID0+IGAvLyBDaGVja291dE1vZGFsLnRzeCBzb3VyY2UgY29kZSB3aXRoIHN0YXRlYDtcbmV4cG9ydCBjb25zdCBnZXRQcmljZUNhcmRTb3VyY2UgPSAoc3RhdGU6IGFueSkgPT4gYC8vIFByaWNlQ2FyZC50c3ggc291cmNlIGNvZGUgd2l0aCBzdGF0ZWA7XG5leHBvcnQgY29uc3QgZ2V0Tm92ZWxhc01vZGFsU291cmNlID0gKHN0YXRlOiBhbnkpID0+IGAvLyBOb3ZlbGFzTW9kYWwudHN4IHNvdXJjZSBjb2RlIHdpdGggc3RhdGVgO1xuZXhwb3J0IGNvbnN0IGdldFRvYXN0U291cmNlID0gKCkgPT4gYC8vIFRvYXN0LnRzeCBzb3VyY2UgY29kZWA7XG5leHBvcnQgY29uc3QgZ2V0T3B0aW1pemVkSW1hZ2VTb3VyY2UgPSAoKSA9PiBgLy8gT3B0aW1pemVkSW1hZ2UudHN4IHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRMb2FkaW5nU3Bpbm5lclNvdXJjZSA9ICgpID0+IGAvLyBMb2FkaW5nU3Bpbm5lci50c3ggc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldEVycm9yTWVzc2FnZVNvdXJjZSA9ICgpID0+IGAvLyBFcnJvck1lc3NhZ2UudHN4IHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRTeXN0ZW1FeHBvcnRTb3VyY2UgPSAoKSA9PiBgLy8gc3lzdGVtRXhwb3J0LnRzIHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRXaGF0c0FwcFV0aWxzU291cmNlID0gKCkgPT4gYC8vIHdoYXRzYXBwLnRzIHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRQZXJmb3JtYW5jZVV0aWxzU291cmNlID0gKCkgPT4gYC8vIHBlcmZvcm1hbmNlLnRzIHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRFcnJvckhhbmRsZXJTb3VyY2UgPSAoKSA9PiBgLy8gZXJyb3JIYW5kbGVyLnRzIHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRUbWRiU2VydmljZVNvdXJjZSA9ICgpID0+IGAvLyB0bWRiLnRzIHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRBcGlTZXJ2aWNlU291cmNlID0gKCkgPT4gYC8vIGFwaS50cyBzb3VyY2UgY29kZWA7XG5leHBvcnQgY29uc3QgZ2V0Q29udGVudFN5bmNTb3VyY2UgPSAoKSA9PiBgLy8gY29udGVudFN5bmMudHMgc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldEFwaUNvbmZpZ1NvdXJjZSA9ICgpID0+IGAvLyBhcGkudHMgY29uZmlnIHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRNb3ZpZVR5cGVzU291cmNlID0gKCkgPT4gYC8vIG1vdmllLnRzIHR5cGVzIHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRPcHRpbWl6ZWRDb250ZW50SG9va1NvdXJjZSA9ICgpID0+IGAvLyB1c2VPcHRpbWl6ZWRDb250ZW50LnRzIHNvdXJjZSBjb2RlYDtcbmV4cG9ydCBjb25zdCBnZXRQZXJmb3JtYW5jZUhvb2tTb3VyY2UgPSAoKSA9PiBgLy8gdXNlUGVyZm9ybWFuY2UudHMgc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldENvbnRlbnRTeW5jSG9va1NvdXJjZSA9ICgpID0+IGAvLyB1c2VDb250ZW50U3luYy50cyBzb3VyY2UgY29kZWA7XG5leHBvcnQgY29uc3QgZ2V0SG9tZVBhZ2VTb3VyY2UgPSAoKSA9PiBgLy8gSG9tZS50c3ggc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldE1vdmllc1BhZ2VTb3VyY2UgPSAoKSA9PiBgLy8gTW92aWVzLnRzeCBzb3VyY2UgY29kZWA7XG5leHBvcnQgY29uc3QgZ2V0VFZTaG93c1BhZ2VTb3VyY2UgPSAoKSA9PiBgLy8gVFZTaG93cy50c3ggc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldEFuaW1lUGFnZVNvdXJjZSA9ICgpID0+IGAvLyBBbmltZS50c3ggc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldFNlYXJjaFBhZ2VTb3VyY2UgPSAoKSA9PiBgLy8gU2VhcmNoLnRzeCBzb3VyY2UgY29kZWA7XG5leHBvcnQgY29uc3QgZ2V0Q2FydFBhZ2VTb3VyY2UgPSAoKSA9PiBgLy8gQ2FydC50c3ggc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldE1vdmllRGV0YWlsUGFnZVNvdXJjZSA9ICgpID0+IGAvLyBNb3ZpZURldGFpbC50c3ggc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldFRWRGV0YWlsUGFnZVNvdXJjZSA9ICgpID0+IGAvLyBUVkRldGFpbC50c3ggc291cmNlIGNvZGVgO1xuZXhwb3J0IGNvbnN0IGdldEFkbWluUGFuZWxTb3VyY2UgPSAoKSA9PiBgLy8gQWRtaW5QYW5lbC50c3ggc291cmNlIGNvZGVgOyJdLCJtYXBwaW5ncyI6IkFB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