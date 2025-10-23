const ALL_PROJECT_FILES = {
  source: [
    "src/main.tsx",
    "src/App.tsx",
    "src/index.css",
    "src/vite-env.d.ts",
    "src/components/CastSection.tsx",
    "src/components/CheckoutModal.tsx",
    "src/components/ErrorMessage.tsx",
    "src/components/FloatingNav.tsx",
    "src/components/Header.tsx",
    "src/components/HeroCarousel.tsx",
    "src/components/LoadingSpinner.tsx",
    "src/components/MovieCard.tsx",
    "src/components/NetflixNovelSection.tsx",
    "src/components/NetflixSection.tsx",
    "src/components/NovelasModal.tsx",
    "src/components/NovelCard.tsx",
    "src/components/OptimizedImage.tsx",
    "src/components/PriceCard.tsx",
    "src/components/Toast.tsx",
    "src/components/VideoPlayer.tsx",
    "src/config/api.ts",
    "src/context/AdminContext.tsx",
    "src/context/CartContext.tsx",
    "src/hooks/useContentSync.ts",
    "src/hooks/useOptimizedContent.ts",
    "src/hooks/usePerformance.ts",
    "src/pages/AdminPanel.tsx",
    "src/pages/Anime.tsx",
    "src/pages/Cart.tsx",
    "src/pages/Home.tsx",
    "src/pages/MovieDetail.tsx",
    "src/pages/Movies.tsx",
    "src/pages/NovelDetail.tsx",
    "src/pages/Search.tsx",
    "src/pages/TVDetail.tsx",
    "src/pages/TVShows.tsx",
    "src/services/api.ts",
    "src/services/contentFilter.ts",
    "src/services/contentSync.ts",
    "src/services/tmdb.ts",
    "src/types/movie.ts",
    "src/utils/errorHandler.ts",
    "src/utils/fileSystemReader.ts",
    "src/utils/performance.ts",
    "src/utils/sourceCodeGenerator.ts",
    "src/utils/systemExport.ts",
    "src/utils/whatsapp.ts"
  ],
  config: [
    "package.json",
    "vite.config.ts",
    "tailwind.config.js",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "postcss.config.js",
    "eslint.config.js",
    "index.html",
    "vercel.json",
    ".gitignore"
  ],
  public: [
    "public/_redirects"
  ]
};
export async function readProjectFiles() {
  const structure = {
    sourceFiles: [],
    configFiles: [],
    publicFiles: []
  };
  const readFileWithRetry = async (filePath, maxRetries = 2) => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(`/${filePath}?t=${Date.now()}`);
        if (response.ok) {
          return await response.text();
        }
      } catch (error) {
        if (attempt === maxRetries) {
          console.warn(`Could not read ${filePath} after ${maxRetries + 1} attempts`);
        }
      }
    }
    return null;
  };
  try {
    const sourcePromises = ALL_PROJECT_FILES.source.map(async (filePath) => {
      const content = await readFileWithRetry(filePath);
      if (content !== null) {
        structure.sourceFiles.push({ path: filePath, content });
      }
    });
    const configPromises = ALL_PROJECT_FILES.config.map(async (filePath) => {
      const content = await readFileWithRetry(filePath);
      if (content !== null) {
        structure.configFiles.push({ path: filePath, content });
      }
    });
    const publicPromises = ALL_PROJECT_FILES.public.map(async (filePath) => {
      const content = await readFileWithRetry(filePath);
      if (content !== null) {
        structure.publicFiles.push({ path: filePath, content });
      }
    });
    await Promise.all([...sourcePromises, ...configPromises, ...publicPromises]);
  } catch (error) {
    console.error("Error reading project files:", error);
  }
  return structure;
}
export function injectConfigIntoFile(fileContent, config, filePath) {
  if (filePath.includes("AdminContext.tsx")) {
    const initialStateMatch = fileContent.match(/const\s+initialState:\s*AdminState\s*=\s*\{[\s\S]*?\};/);
    if (initialStateMatch) {
      const updatedInitialState = `const initialState: AdminState = {
  isAuthenticated: false,
  prices: ${JSON.stringify(config.prices, null, 4).split("\n").join("\n  ")},
  deliveryZones: ${JSON.stringify(config.deliveryZones, null, 4).split("\n").join("\n  ")},
  novels: ${JSON.stringify(config.novels, null, 4).split("\n").join("\n  ")},
  notifications: [],
  systemConfig: ${JSON.stringify(config.settings || {
        version: config.version || "2.1.0",
        settings: {
          autoSync: true,
          syncInterval: 3e5,
          enableNotifications: true,
          maxNotifications: 100
        }
      }, null, 4).split("\n").join("\n  ")},
  syncStatus: {
    lastSync: new Date().toISOString(),
    isOnline: true,
    pendingChanges: 0
  }
};`;
      return fileContent.replace(initialStateMatch[0], updatedInitialState);
    }
  }
  if (filePath.includes("CartContext.tsx")) {
    const priceMatch = fileContent.match(/moviePrice:\s*\d+/);
    const seriesPriceMatch = fileContent.match(/seriesPrice:\s*\d+/);
    const feeMatch = fileContent.match(/transferFeePercentage:\s*\d+/);
    const novelMatch = fileContent.match(/novelPricePerChapter:\s*\d+/);
    let updated = fileContent;
    if (priceMatch && config.prices?.moviePrice) {
      updated = updated.replace(priceMatch[0], `moviePrice: ${config.prices.moviePrice}`);
    }
    if (seriesPriceMatch && config.prices?.seriesPrice) {
      updated = updated.replace(seriesPriceMatch[0], `seriesPrice: ${config.prices.seriesPrice}`);
    }
    if (feeMatch && config.prices?.transferFeePercentage) {
      updated = updated.replace(feeMatch[0], `transferFeePercentage: ${config.prices.transferFeePercentage}`);
    }
    if (novelMatch && config.prices?.novelPricePerChapter) {
      updated = updated.replace(novelMatch[0], `novelPricePerChapter: ${config.prices.novelPricePerChapter}`);
    }
    return updated;
  }
  if (filePath.includes("CheckoutModal.tsx")) {
    const deliveryZonesMatch = fileContent.match(/const\s+deliveryZones:\s*DeliveryZone\[\]\s*=\s*\[[\s\S]*?\];/);
    if (deliveryZonesMatch && config.deliveryZones) {
      const updatedZones = `const deliveryZones: DeliveryZone[] = ${JSON.stringify(config.deliveryZones, null, 2)};`;
      return fileContent.replace(deliveryZonesMatch[0], updatedZones);
    }
  }
  if (filePath.includes("NovelasModal.tsx")) {
    const novelsMatch = fileContent.match(/const\s+novelas:\s*Novel\[\]\s*=\s*\[[\s\S]*?\];/);
    if (novelsMatch && config.novels) {
      const updatedNovels = `const novelas: Novel[] = ${JSON.stringify(config.novels, null, 2)};`;
      return fileContent.replace(novelsMatch[0], updatedNovels);
    }
  }
  if (filePath.includes("PriceCard.tsx")) {
    let updated = fileContent;
    if (config.prices?.moviePrice) {
      updated = updated.replace(/price:\s*\d+,?\s*\/\/\s*Películas/g, `price: ${config.prices.moviePrice}, // Películas`);
    }
    if (config.prices?.seriesPrice) {
      updated = updated.replace(/price:\s*\d+,?\s*\/\/\s*Series/g, `price: ${config.prices.seriesPrice}, // Series`);
    }
    return updated;
  }
  return fileContent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVTeXN0ZW1SZWFkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIEZpbGVFbnRyeSB7XG4gIHBhdGg6IHN0cmluZztcbiAgY29udGVudDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUHJvamVjdFN0cnVjdHVyZSB7XG4gIHNvdXJjZUZpbGVzOiBGaWxlRW50cnlbXTtcbiAgY29uZmlnRmlsZXM6IEZpbGVFbnRyeVtdO1xuICBwdWJsaWNGaWxlczogRmlsZUVudHJ5W107XG59XG5cbmNvbnN0IEFMTF9QUk9KRUNUX0ZJTEVTID0ge1xuICBzb3VyY2U6IFtcbiAgICAnc3JjL21haW4udHN4JyxcbiAgICAnc3JjL0FwcC50c3gnLFxuICAgICdzcmMvaW5kZXguY3NzJyxcbiAgICAnc3JjL3ZpdGUtZW52LmQudHMnLFxuICAgICdzcmMvY29tcG9uZW50cy9DYXN0U2VjdGlvbi50c3gnLFxuICAgICdzcmMvY29tcG9uZW50cy9DaGVja291dE1vZGFsLnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL0Vycm9yTWVzc2FnZS50c3gnLFxuICAgICdzcmMvY29tcG9uZW50cy9GbG9hdGluZ05hdi50c3gnLFxuICAgICdzcmMvY29tcG9uZW50cy9IZWFkZXIudHN4JyxcbiAgICAnc3JjL2NvbXBvbmVudHMvSGVyb0Nhcm91c2VsLnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL0xvYWRpbmdTcGlubmVyLnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL01vdmllQ2FyZC50c3gnLFxuICAgICdzcmMvY29tcG9uZW50cy9OZXRmbGl4Tm92ZWxTZWN0aW9uLnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL05ldGZsaXhTZWN0aW9uLnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL05vdmVsYXNNb2RhbC50c3gnLFxuICAgICdzcmMvY29tcG9uZW50cy9Ob3ZlbENhcmQudHN4JyxcbiAgICAnc3JjL2NvbXBvbmVudHMvT3B0aW1pemVkSW1hZ2UudHN4JyxcbiAgICAnc3JjL2NvbXBvbmVudHMvUHJpY2VDYXJkLnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL1RvYXN0LnRzeCcsXG4gICAgJ3NyYy9jb21wb25lbnRzL1ZpZGVvUGxheWVyLnRzeCcsXG4gICAgJ3NyYy9jb25maWcvYXBpLnRzJyxcbiAgICAnc3JjL2NvbnRleHQvQWRtaW5Db250ZXh0LnRzeCcsXG4gICAgJ3NyYy9jb250ZXh0L0NhcnRDb250ZXh0LnRzeCcsXG4gICAgJ3NyYy9ob29rcy91c2VDb250ZW50U3luYy50cycsXG4gICAgJ3NyYy9ob29rcy91c2VPcHRpbWl6ZWRDb250ZW50LnRzJyxcbiAgICAnc3JjL2hvb2tzL3VzZVBlcmZvcm1hbmNlLnRzJyxcbiAgICAnc3JjL3BhZ2VzL0FkbWluUGFuZWwudHN4JyxcbiAgICAnc3JjL3BhZ2VzL0FuaW1lLnRzeCcsXG4gICAgJ3NyYy9wYWdlcy9DYXJ0LnRzeCcsXG4gICAgJ3NyYy9wYWdlcy9Ib21lLnRzeCcsXG4gICAgJ3NyYy9wYWdlcy9Nb3ZpZURldGFpbC50c3gnLFxuICAgICdzcmMvcGFnZXMvTW92aWVzLnRzeCcsXG4gICAgJ3NyYy9wYWdlcy9Ob3ZlbERldGFpbC50c3gnLFxuICAgICdzcmMvcGFnZXMvU2VhcmNoLnRzeCcsXG4gICAgJ3NyYy9wYWdlcy9UVkRldGFpbC50c3gnLFxuICAgICdzcmMvcGFnZXMvVFZTaG93cy50c3gnLFxuICAgICdzcmMvc2VydmljZXMvYXBpLnRzJyxcbiAgICAnc3JjL3NlcnZpY2VzL2NvbnRlbnRGaWx0ZXIudHMnLFxuICAgICdzcmMvc2VydmljZXMvY29udGVudFN5bmMudHMnLFxuICAgICdzcmMvc2VydmljZXMvdG1kYi50cycsXG4gICAgJ3NyYy90eXBlcy9tb3ZpZS50cycsXG4gICAgJ3NyYy91dGlscy9lcnJvckhhbmRsZXIudHMnLFxuICAgICdzcmMvdXRpbHMvZmlsZVN5c3RlbVJlYWRlci50cycsXG4gICAgJ3NyYy91dGlscy9wZXJmb3JtYW5jZS50cycsXG4gICAgJ3NyYy91dGlscy9zb3VyY2VDb2RlR2VuZXJhdG9yLnRzJyxcbiAgICAnc3JjL3V0aWxzL3N5c3RlbUV4cG9ydC50cycsXG4gICAgJ3NyYy91dGlscy93aGF0c2FwcC50cydcbiAgXSxcbiAgY29uZmlnOiBbXG4gICAgJ3BhY2thZ2UuanNvbicsXG4gICAgJ3ZpdGUuY29uZmlnLnRzJyxcbiAgICAndGFpbHdpbmQuY29uZmlnLmpzJyxcbiAgICAndHNjb25maWcuanNvbicsXG4gICAgJ3RzY29uZmlnLmFwcC5qc29uJyxcbiAgICAndHNjb25maWcubm9kZS5qc29uJyxcbiAgICAncG9zdGNzcy5jb25maWcuanMnLFxuICAgICdlc2xpbnQuY29uZmlnLmpzJyxcbiAgICAnaW5kZXguaHRtbCcsXG4gICAgJ3ZlcmNlbC5qc29uJyxcbiAgICAnLmdpdGlnbm9yZSdcbiAgXSxcbiAgcHVibGljOiBbXG4gICAgJ3B1YmxpYy9fcmVkaXJlY3RzJ1xuICBdXG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZFByb2plY3RGaWxlcygpOiBQcm9taXNlPFByb2plY3RTdHJ1Y3R1cmU+IHtcbiAgY29uc3Qgc3RydWN0dXJlOiBQcm9qZWN0U3RydWN0dXJlID0ge1xuICAgIHNvdXJjZUZpbGVzOiBbXSxcbiAgICBjb25maWdGaWxlczogW10sXG4gICAgcHVibGljRmlsZXM6IFtdXG4gIH07XG5cbiAgY29uc3QgcmVhZEZpbGVXaXRoUmV0cnkgPSBhc3luYyAoZmlsZVBhdGg6IHN0cmluZywgbWF4UmV0cmllcyA9IDIpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+ID0+IHtcbiAgICBmb3IgKGxldCBhdHRlbXB0ID0gMDsgYXR0ZW1wdCA8PSBtYXhSZXRyaWVzOyBhdHRlbXB0KyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC8ke2ZpbGVQYXRofT90PSR7RGF0ZS5ub3coKX1gKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGF0dGVtcHQgPT09IG1heFJldHJpZXMpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCByZWFkICR7ZmlsZVBhdGh9IGFmdGVyICR7bWF4UmV0cmllcyArIDF9IGF0dGVtcHRzYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzb3VyY2VQcm9taXNlcyA9IEFMTF9QUk9KRUNUX0ZJTEVTLnNvdXJjZS5tYXAoYXN5bmMgKGZpbGVQYXRoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcmVhZEZpbGVXaXRoUmV0cnkoZmlsZVBhdGgpO1xuICAgICAgaWYgKGNvbnRlbnQgIT09IG51bGwpIHtcbiAgICAgICAgc3RydWN0dXJlLnNvdXJjZUZpbGVzLnB1c2goeyBwYXRoOiBmaWxlUGF0aCwgY29udGVudCB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbmZpZ1Byb21pc2VzID0gQUxMX1BST0pFQ1RfRklMRVMuY29uZmlnLm1hcChhc3luYyAoZmlsZVBhdGgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCByZWFkRmlsZVdpdGhSZXRyeShmaWxlUGF0aCk7XG4gICAgICBpZiAoY29udGVudCAhPT0gbnVsbCkge1xuICAgICAgICBzdHJ1Y3R1cmUuY29uZmlnRmlsZXMucHVzaCh7IHBhdGg6IGZpbGVQYXRoLCBjb250ZW50IH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcHVibGljUHJvbWlzZXMgPSBBTExfUFJPSkVDVF9GSUxFUy5wdWJsaWMubWFwKGFzeW5jIChmaWxlUGF0aCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHJlYWRGaWxlV2l0aFJldHJ5KGZpbGVQYXRoKTtcbiAgICAgIGlmIChjb250ZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHN0cnVjdHVyZS5wdWJsaWNGaWxlcy5wdXNoKHsgcGF0aDogZmlsZVBhdGgsIGNvbnRlbnQgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbLi4uc291cmNlUHJvbWlzZXMsIC4uLmNvbmZpZ1Byb21pc2VzLCAuLi5wdWJsaWNQcm9taXNlc10pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlYWRpbmcgcHJvamVjdCBmaWxlczonLCBlcnJvcik7XG4gIH1cblxuICByZXR1cm4gc3RydWN0dXJlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0Q29uZmlnSW50b0ZpbGUoZmlsZUNvbnRlbnQ6IHN0cmluZywgY29uZmlnOiBhbnksIGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoZmlsZVBhdGguaW5jbHVkZXMoJ0FkbWluQ29udGV4dC50c3gnKSkge1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZU1hdGNoID0gZmlsZUNvbnRlbnQubWF0Y2goL2NvbnN0XFxzK2luaXRpYWxTdGF0ZTpcXHMqQWRtaW5TdGF0ZVxccyo9XFxzKlxce1tcXHNcXFNdKj9cXH07Lyk7XG4gICAgaWYgKGluaXRpYWxTdGF0ZU1hdGNoKSB7XG4gICAgICBjb25zdCB1cGRhdGVkSW5pdGlhbFN0YXRlID0gYGNvbnN0IGluaXRpYWxTdGF0ZTogQWRtaW5TdGF0ZSA9IHtcbiAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgcHJpY2VzOiAke0pTT04uc3RyaW5naWZ5KGNvbmZpZy5wcmljZXMsIG51bGwsIDQpLnNwbGl0KCdcXG4nKS5qb2luKCdcXG4gICcpfSxcbiAgZGVsaXZlcnlab25lczogJHtKU09OLnN0cmluZ2lmeShjb25maWcuZGVsaXZlcnlab25lcywgbnVsbCwgNCkuc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbiAgJyl9LFxuICBub3ZlbHM6ICR7SlNPTi5zdHJpbmdpZnkoY29uZmlnLm5vdmVscywgbnVsbCwgNCkuc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbiAgJyl9LFxuICBub3RpZmljYXRpb25zOiBbXSxcbiAgc3lzdGVtQ29uZmlnOiAke0pTT04uc3RyaW5naWZ5KGNvbmZpZy5zZXR0aW5ncyB8fCB7XG4gICAgdmVyc2lvbjogY29uZmlnLnZlcnNpb24gfHwgJzIuMS4wJyxcbiAgICBzZXR0aW5nczoge1xuICAgICAgYXV0b1N5bmM6IHRydWUsXG4gICAgICBzeW5jSW50ZXJ2YWw6IDMwMDAwMCxcbiAgICAgIGVuYWJsZU5vdGlmaWNhdGlvbnM6IHRydWUsXG4gICAgICBtYXhOb3RpZmljYXRpb25zOiAxMDBcbiAgICB9XG4gIH0sIG51bGwsIDQpLnNwbGl0KCdcXG4nKS5qb2luKCdcXG4gICcpfSxcbiAgc3luY1N0YXR1czoge1xuICAgIGxhc3RTeW5jOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgaXNPbmxpbmU6IHRydWUsXG4gICAgcGVuZGluZ0NoYW5nZXM6IDBcbiAgfVxufTtgO1xuICAgICAgcmV0dXJuIGZpbGVDb250ZW50LnJlcGxhY2UoaW5pdGlhbFN0YXRlTWF0Y2hbMF0sIHVwZGF0ZWRJbml0aWFsU3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmaWxlUGF0aC5pbmNsdWRlcygnQ2FydENvbnRleHQudHN4JykpIHtcbiAgICBjb25zdCBwcmljZU1hdGNoID0gZmlsZUNvbnRlbnQubWF0Y2goL21vdmllUHJpY2U6XFxzKlxcZCsvKTtcbiAgICBjb25zdCBzZXJpZXNQcmljZU1hdGNoID0gZmlsZUNvbnRlbnQubWF0Y2goL3Nlcmllc1ByaWNlOlxccypcXGQrLyk7XG4gICAgY29uc3QgZmVlTWF0Y2ggPSBmaWxlQ29udGVudC5tYXRjaCgvdHJhbnNmZXJGZWVQZXJjZW50YWdlOlxccypcXGQrLyk7XG4gICAgY29uc3Qgbm92ZWxNYXRjaCA9IGZpbGVDb250ZW50Lm1hdGNoKC9ub3ZlbFByaWNlUGVyQ2hhcHRlcjpcXHMqXFxkKy8pO1xuXG4gICAgbGV0IHVwZGF0ZWQgPSBmaWxlQ29udGVudDtcbiAgICBpZiAocHJpY2VNYXRjaCAmJiBjb25maWcucHJpY2VzPy5tb3ZpZVByaWNlKSB7XG4gICAgICB1cGRhdGVkID0gdXBkYXRlZC5yZXBsYWNlKHByaWNlTWF0Y2hbMF0sIGBtb3ZpZVByaWNlOiAke2NvbmZpZy5wcmljZXMubW92aWVQcmljZX1gKTtcbiAgICB9XG4gICAgaWYgKHNlcmllc1ByaWNlTWF0Y2ggJiYgY29uZmlnLnByaWNlcz8uc2VyaWVzUHJpY2UpIHtcbiAgICAgIHVwZGF0ZWQgPSB1cGRhdGVkLnJlcGxhY2Uoc2VyaWVzUHJpY2VNYXRjaFswXSwgYHNlcmllc1ByaWNlOiAke2NvbmZpZy5wcmljZXMuc2VyaWVzUHJpY2V9YCk7XG4gICAgfVxuICAgIGlmIChmZWVNYXRjaCAmJiBjb25maWcucHJpY2VzPy50cmFuc2ZlckZlZVBlcmNlbnRhZ2UpIHtcbiAgICAgIHVwZGF0ZWQgPSB1cGRhdGVkLnJlcGxhY2UoZmVlTWF0Y2hbMF0sIGB0cmFuc2ZlckZlZVBlcmNlbnRhZ2U6ICR7Y29uZmlnLnByaWNlcy50cmFuc2ZlckZlZVBlcmNlbnRhZ2V9YCk7XG4gICAgfVxuICAgIGlmIChub3ZlbE1hdGNoICYmIGNvbmZpZy5wcmljZXM/Lm5vdmVsUHJpY2VQZXJDaGFwdGVyKSB7XG4gICAgICB1cGRhdGVkID0gdXBkYXRlZC5yZXBsYWNlKG5vdmVsTWF0Y2hbMF0sIGBub3ZlbFByaWNlUGVyQ2hhcHRlcjogJHtjb25maWcucHJpY2VzLm5vdmVsUHJpY2VQZXJDaGFwdGVyfWApO1xuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlZDtcbiAgfVxuXG4gIGlmIChmaWxlUGF0aC5pbmNsdWRlcygnQ2hlY2tvdXRNb2RhbC50c3gnKSkge1xuICAgIGNvbnN0IGRlbGl2ZXJ5Wm9uZXNNYXRjaCA9IGZpbGVDb250ZW50Lm1hdGNoKC9jb25zdFxccytkZWxpdmVyeVpvbmVzOlxccypEZWxpdmVyeVpvbmVcXFtcXF1cXHMqPVxccypcXFtbXFxzXFxTXSo/XFxdOy8pO1xuICAgIGlmIChkZWxpdmVyeVpvbmVzTWF0Y2ggJiYgY29uZmlnLmRlbGl2ZXJ5Wm9uZXMpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRab25lcyA9IGBjb25zdCBkZWxpdmVyeVpvbmVzOiBEZWxpdmVyeVpvbmVbXSA9ICR7SlNPTi5zdHJpbmdpZnkoY29uZmlnLmRlbGl2ZXJ5Wm9uZXMsIG51bGwsIDIpfTtgO1xuICAgICAgcmV0dXJuIGZpbGVDb250ZW50LnJlcGxhY2UoZGVsaXZlcnlab25lc01hdGNoWzBdLCB1cGRhdGVkWm9uZXMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmaWxlUGF0aC5pbmNsdWRlcygnTm92ZWxhc01vZGFsLnRzeCcpKSB7XG4gICAgY29uc3Qgbm92ZWxzTWF0Y2ggPSBmaWxlQ29udGVudC5tYXRjaCgvY29uc3RcXHMrbm92ZWxhczpcXHMqTm92ZWxcXFtcXF1cXHMqPVxccypcXFtbXFxzXFxTXSo/XFxdOy8pO1xuICAgIGlmIChub3ZlbHNNYXRjaCAmJiBjb25maWcubm92ZWxzKSB7XG4gICAgICBjb25zdCB1cGRhdGVkTm92ZWxzID0gYGNvbnN0IG5vdmVsYXM6IE5vdmVsW10gPSAke0pTT04uc3RyaW5naWZ5KGNvbmZpZy5ub3ZlbHMsIG51bGwsIDIpfTtgO1xuICAgICAgcmV0dXJuIGZpbGVDb250ZW50LnJlcGxhY2Uobm92ZWxzTWF0Y2hbMF0sIHVwZGF0ZWROb3ZlbHMpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmaWxlUGF0aC5pbmNsdWRlcygnUHJpY2VDYXJkLnRzeCcpKSB7XG4gICAgbGV0IHVwZGF0ZWQgPSBmaWxlQ29udGVudDtcbiAgICBpZiAoY29uZmlnLnByaWNlcz8ubW92aWVQcmljZSkge1xuICAgICAgdXBkYXRlZCA9IHVwZGF0ZWQucmVwbGFjZSgvcHJpY2U6XFxzKlxcZCssP1xccypcXC9cXC9cXHMqUGVsw61jdWxhcy9nLCBgcHJpY2U6ICR7Y29uZmlnLnByaWNlcy5tb3ZpZVByaWNlfSwgLy8gUGVsw61jdWxhc2ApO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnByaWNlcz8uc2VyaWVzUHJpY2UpIHtcbiAgICAgIHVwZGF0ZWQgPSB1cGRhdGVkLnJlcGxhY2UoL3ByaWNlOlxccypcXGQrLD9cXHMqXFwvXFwvXFxzKlNlcmllcy9nLCBgcHJpY2U6ICR7Y29uZmlnLnByaWNlcy5zZXJpZXNQcmljZX0sIC8vIFNlcmllc2ApO1xuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlZDtcbiAgfVxuXG4gIHJldHVybiBmaWxlQ29udGVudDtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBV0EsTUFBTSxvQkFBb0I7QUFBQSxFQUN4QixRQUFRO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxR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