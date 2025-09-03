import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import checker from 'vite-plugin-checker'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true,
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          vendor: ['react', 'react-dom'],
          // Routing and navigation
          router: ['@tanstack/react-router'],
          // Data fetching and caching
          query: ['@tanstack/react-query'],
          // State management
          state: ['zustand'],
          // UI component libraries
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-avatar', 
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-switch',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-label'
          ],
          // Drag and drop functionality
          dnd: ['react-dnd', 'react-dnd-html5-backend'],
          // Date and time utilities
          date: ['date-fns'],
          // Icons
          icons: ['lucide-react'],
          // Form handling
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
        // Optimize chunk naming for better caching
        chunkFileNames: () => {
          return `assets/js/[name]-[hash].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Additional build optimizations
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    // Minification options (use esbuild to avoid terser dependency)
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: [
      '@tanstack/react-router',
      '@tanstack/react-query',
      'zustand',
      'react-dnd',
      'react-dnd-html5-backend',
      'date-fns',
      'lucide-react',
      'react-hook-form',
      '@hookform/resolvers/zod',
      'zod',
    ],
    // Force optimization of these dependencies
    force: true,
  },
  // Performance monitoring
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  // Asset handling configuration
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  publicDir: 'public',
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
})