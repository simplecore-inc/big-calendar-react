/**
 * Performance monitoring utilities for development and production
 */

declare global {
  const __DEV__: boolean;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start measuring performance for a given operation
   */
  startMeasure(name: string): void {
    if (typeof performance !== 'undefined') {
      this.metrics.set(name, performance.now());
    }
  }

  /**
   * End measuring and log the result
   */
  endMeasure(name: string): number | null {
    if (typeof performance === 'undefined') return null;

    const startTime = this.metrics.get(name);
    if (!startTime) return null;

    const duration = performance.now() - startTime;
    this.metrics.delete(name);

    if (__DEV__) {
      // Performance logging in development mode
      // eslint-disable-next-line no-console
      console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  /**
   * Measure component render time
   */
  measureComponent<T extends (...args: unknown[]) => unknown>(
    name: string,
    component: T
  ): T {
    return ((...args: Parameters<T>) => {
      this.startMeasure(`Component: ${name}`);
      const result = component(...args);
      
      // For React components, measure after render
      if (typeof result === 'object' && result && 'type' in result) {
        setTimeout(() => this.endMeasure(`Component: ${name}`), 0);
      } else {
        this.endMeasure(`Component: ${name}`);
      }
      
      return result;
    }) as T;
  }

  /**
   * Measure async operation
   */
  async measureAsync<T>(name: string, operation: () => Promise<T>): Promise<T> {
    this.startMeasure(name);
    try {
      const result = await operation();
      this.endMeasure(name);
      return result;
    } catch (error) {
      this.endMeasure(name);
      throw error;
    }
  }

  /**
   * Log bundle size information (development only)
   */
  logBundleInfo(): void {
    if (!__DEV__ || typeof navigator === 'undefined') return;

    // Log memory usage if available
    if ('memory' in performance) {
      const memory = (performance as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      // eslint-disable-next-line no-console
      console.group('📦 Bundle Performance');
      // eslint-disable-next-line no-console
      console.log(`Used JS Heap: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      // eslint-disable-next-line no-console
      console.log(`Total JS Heap: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      // eslint-disable-next-line no-console
      console.log(`Heap Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
      // eslint-disable-next-line no-console
      console.groupEnd();
    }
  }

  /**
   * Monitor Core Web Vitals
   */
  monitorWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log(`🎯 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (_e) {
        // PerformanceObserver not supported
      }
    }

    // First Input Delay
    if ('addEventListener' in window) {
      let firstInputDelay: number | null = null;
      
      const measureFID = (event: Event) => {
        if (firstInputDelay === null) {
          firstInputDelay = performance.now() - (event as Event & { timeStamp: number }).timeStamp;
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log(`⚡ FID: ${firstInputDelay.toFixed(2)}ms`);
          }
        }
      };

      ['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(type => {
        window.addEventListener(type, measureFID, { once: true, passive: true });
      });
    }
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Auto-start monitoring in development
if (__DEV__ && typeof window !== 'undefined') {
  performanceMonitor.monitorWebVitals();
  performanceMonitor.logBundleInfo();
}