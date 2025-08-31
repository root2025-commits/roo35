// Analytics and performance monitoring utilities

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

interface UserAction {
  action: string;
  timestamp: number;
  data?: any;
}

class AnalyticsService {
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0
  };
  
  private userActions: UserAction[] = [];
  private maxActions = 100;

  constructor() {
    this.initializePerformanceMonitoring();
  }

  private initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cumulativeLayoutShift = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });
    }

    // Page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.firstContentfulPaint = this.getFirstContentfulPaint();
      }, 0);
    });
  }

  private getFirstContentfulPaint(): number {
    const entries = performance.getEntriesByType('paint');
    const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : 0;
  }

  // Track user actions
  trackAction(action: string, data?: any): void {
    const userAction: UserAction = {
      action,
      timestamp: Date.now(),
      data
    };

    this.userActions.push(userAction);

    // Keep only recent actions
    if (this.userActions.length > this.maxActions) {
      this.userActions = this.userActions.slice(-this.maxActions);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('User Action:', userAction);
    }
  }

  // Track page views
  trackPageView(page: string): void {
    this.trackAction('page_view', { page, url: window.location.href });
  }

  // Track cart actions
  trackCartAction(action: 'add' | 'remove' | 'clear', itemId?: number, itemTitle?: string): void {
    this.trackAction('cart_action', { action, itemId, itemTitle });
  }

  // Track search actions
  trackSearch(query: string, resultsCount: number): void {
    this.trackAction('search', { query, resultsCount });
  }

  // Track errors
  trackError(error: Error, context?: string): void {
    this.trackAction('error', {
      message: error.message,
      stack: error.stack,
      context
    });
  }

  // Get performance report
  getPerformanceReport(): PerformanceMetrics & { userActions: UserAction[] } {
    return {
      ...this.metrics,
      userActions: this.userActions.slice(-10) // Last 10 actions
    };
  }

  // Export analytics data
  exportAnalytics(): string {
    const report = {
      timestamp: new Date().toISOString(),
      performance: this.metrics,
      userActions: this.userActions,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    return JSON.stringify(report, null, 2);
  }

  // Clear analytics data
  clearData(): void {
    this.userActions = [];
    this.metrics = {
      pageLoadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0
    };
  }
}

export const analytics = new AnalyticsService();

// React hook for analytics
export function useAnalytics() {
  const trackPageView = React.useCallback((page: string) => {
    analytics.trackPageView(page);
  }, []);

  const trackAction = React.useCallback((action: string, data?: any) => {
    analytics.trackAction(action, data);
  }, []);

  const trackError = React.useCallback((error: Error, context?: string) => {
    analytics.trackError(error, context);
  }, []);

  return {
    trackPageView,
    trackAction,
    trackError,
    getReport: analytics.getPerformanceReport.bind(analytics),
    exportData: analytics.exportAnalytics.bind(analytics)
  };
}