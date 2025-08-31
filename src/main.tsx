import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './utils/errorBoundary';
import { analytics } from './utils/analytics';
import { clearUnusedCache } from './utils/performance';

// Initialize performance monitoring
analytics.trackPageView('app_start');

// Clean up old cache on app start
clearUnusedCache();

// Performance observer
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        analytics.trackAction('performance_lcp', { value: entry.startTime });
      }
    });
  });
  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
