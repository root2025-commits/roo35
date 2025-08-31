// Application monitoring and health check utilities

interface HealthCheck {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  lastCheck: string;
  error?: string;
}

interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  services: HealthCheck[];
  timestamp: string;
}

class MonitoringService {
  private healthChecks: Map<string, HealthCheck> = new Map();
  private checkInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    // Run health checks every 5 minutes
    this.checkInterval = setInterval(() => {
      this.runHealthChecks();
    }, 5 * 60 * 1000);

    // Initial health check
    this.runHealthChecks();
  }

  private async runHealthChecks() {
    const checks = [
      this.checkTMDBAPI(),
      this.checkLocalStorage(),
      this.checkNetworkConnection(),
      this.checkMemoryUsage()
    ];

    await Promise.allSettled(checks);
  }

  private async checkTMDBAPI(): Promise<void> {
    const start = performance.now();
    try {
      const response = await fetch('https://api.themoviedb.org/3/configuration', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmMwODI5N2I1NTY1YjU2MDRlZDg2NDZjYjBjMTM5MyIsIm5iZiI6MTcxNzM3MjM0Ny44NDcwMDAxLCJzdWIiOiI2NjVkMDViYmZkOTMxM2QwZDNhMGFjZDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X8jcKcjIT1svPP5EeO0CtF3Ct11pZwrXaJ0DLAz5pDQ'
        }
      });
      
      const responseTime = performance.now() - start;
      
      this.healthChecks.set('tmdb_api', {
        service: 'TMDB API',
        status: response.ok ? 'healthy' : 'degraded',
        responseTime,
        lastCheck: new Date().toISOString(),
        error: response.ok ? undefined : `HTTP ${response.status}`
      });
    } catch (error) {
      this.healthChecks.set('tmdb_api', {
        service: 'TMDB API',
        status: 'unhealthy',
        responseTime: performance.now() - start,
        lastCheck: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  private async checkLocalStorage(): Promise<void> {
    const start = performance.now();
    try {
      const testKey = 'health_check_test';
      const testValue = 'test_data';
      
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      
      const responseTime = performance.now() - start;
      
      this.healthChecks.set('local_storage', {
        service: 'Local Storage',
        status: retrieved === testValue ? 'healthy' : 'degraded',
        responseTime,
        lastCheck: new Date().toISOString()
      });
    } catch (error) {
      this.healthChecks.set('local_storage', {
        service: 'Local Storage',
        status: 'unhealthy',
        responseTime: performance.now() - start,
        lastCheck: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Storage unavailable'
      });
    }
  }

  private async checkNetworkConnection(): Promise<void> {
    const start = performance.now();
    
    this.healthChecks.set('network', {
      service: 'Network Connection',
      status: navigator.onLine ? 'healthy' : 'unhealthy',
      responseTime: performance.now() - start,
      lastCheck: new Date().toISOString(),
      error: navigator.onLine ? undefined : 'Offline'
    });
  }

  private async checkMemoryUsage(): Promise<void> {
    const start = performance.now();
    
    try {
      // @ts-ignore - memory API is experimental
      const memory = (performance as any).memory;
      
      if (memory) {
        const usedPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        
        this.healthChecks.set('memory', {
          service: 'Memory Usage',
          status: usedPercent < 80 ? 'healthy' : usedPercent < 95 ? 'degraded' : 'unhealthy',
          responseTime: performance.now() - start,
          lastCheck: new Date().toISOString(),
          error: usedPercent >= 95 ? 'High memory usage' : undefined
        });
      } else {
        this.healthChecks.set('memory', {
          service: 'Memory Usage',
          status: 'healthy',
          responseTime: performance.now() - start,
          lastCheck: new Date().toISOString(),
          error: 'Memory API not available'
        });
      }
    } catch (error) {
      this.healthChecks.set('memory', {
        service: 'Memory Usage',
        status: 'degraded',
        responseTime: performance.now() - start,
        lastCheck: new Date().toISOString(),
        error: 'Unable to check memory'
      });
    }
  }

  getSystemHealth(): SystemHealth {
    const services = Array.from(this.healthChecks.values());
    const unhealthyCount = services.filter(s => s.status === 'unhealthy').length;
    const degradedCount = services.filter(s => s.status === 'degraded').length;
    
    let overall: 'healthy' | 'degraded' | 'unhealthy';
    if (unhealthyCount > 0) {
      overall = 'unhealthy';
    } else if (degradedCount > 0) {
      overall = 'degraded';
    } else {
      overall = 'healthy';
    }

    return {
      overall,
      services,
      timestamp: new Date().toISOString()
    };
  }

  exportHealthReport(): string {
    const health = this.getSystemHealth();
    return JSON.stringify(health, null, 2);
  }

  destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}

export const monitoring = new MonitoringService();

// React hook for system health
export function useSystemHealth() {
  const [health, setHealth] = React.useState<SystemHealth | null>(null);

  React.useEffect(() => {
    const updateHealth = () => {
      setHealth(monitoring.getSystemHealth());
    };

    updateHealth();
    const interval = setInterval(updateHealth, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return health;
}