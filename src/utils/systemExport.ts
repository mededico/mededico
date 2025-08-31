// Utility functions for system export with real-time synchronization and complete source code

import type { AdminState } from '../context/AdminContext';

// Get all current file contents from the project
export function getAllProjectFiles(): { [path: string]: string } {
  return {
    // Root configuration files
    'package.json': `{
  "name": "tv-a-la-carta-sistema-completo",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "description": "Sistema completo de TV a la Carta con panel de administración sincronizado",
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
  }
}`,

    'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
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
});`,

    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`,

    'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,

    'eslint.config.js': `import js from '@eslint/js';
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
);`,

    'tsconfig.json': `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`,

    'tsconfig.app.json': `{
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
}`,

    'tsconfig.node.json': `{
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
}`,

    'vercel.json': `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`,

    'index.html': `<!doctype html>
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
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

    // Source files
    'src/main.tsx': `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,

    'src/vite-env.d.ts': `/// <reference types="vite/client" />`,

    'src/index.css': `@tailwind base;
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
  
  /* Animaciones para el modal */
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-in {
    animation: fade-in 0.3s ease-out;
  }
}`,

    // Public files
    'public/_redirects': `# Netlify redirects for SPA routing
/*    /index.html   200

# Handle specific routes
/movies    /index.html   200
/tv        /index.html   200
/anime     /index.html   200
/cart      /index.html   200
/search    /index.html   200
/movie/*   /index.html   200
/tv/*      /index.html   200
/admin     /index.html   200`
  };
}

// Get the complete App.tsx source code
export function getAppTsxSource(): string {
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

// Get all component source files
export function getComponentSources(): { [path: string]: string } {
  return {
    'src/components/Header.tsx': `import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Film } from 'lucide-react';
import { performanceOptimizer } from '../utils/performance';
import { useCart } from '../context/CartContext';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCart();

  // Real-time search effect
  const debouncedNavigate = React.useMemo(
    () => performanceOptimizer.debounce((query: string) => {
      navigate(\`/search?q=\${encodeURIComponent(query.trim())}\`);
    }, 500),
    [navigate]
  );

  React.useEffect(() => {
    if (searchQuery.trim() && searchQuery.length > 2) {
      debouncedNavigate(searchQuery.trim());
    }
  }, [searchQuery, debouncedNavigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(\`/search?q=\${encodeURIComponent(searchQuery.trim())}\`);
    }
  };

  // Clear search when navigating away from search page
  React.useEffect(() => {
    if (!location.pathname.includes('/search')) {
      setSearchQuery('');
    }
  }, [location.pathname]);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <img src="/unnamed.png" alt="TV a la Carta" className="h-8 w-8" />
              <span className="font-bold text-xl hidden sm:block">TV a la Carta</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/movies" className="hover:text-blue-200 transition-colors">
                Películas
              </Link>
              <Link to="/tv" className="hover:text-blue-200 transition-colors">
                Series
              </Link>
              <Link to="/anime" className="hover:text-blue-200 transition-colors">
                Anime
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar películas, series..."
                  className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-64"
                />
              </div>
            </form>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ShoppingCart className="h-6 w-6 transition-transform duration-300" />
              {state.total > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {state.total}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar películas, series..."
                className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}`,

    'src/components/MovieCard.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Plus, Check } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { useCart } from '../context/CartContext';
import { CartAnimation } from './CartAnimation';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config/api';
import type { Movie, TVShow, CartItem } from '../types/movie';

interface MovieCardProps {
  item: Movie | TVShow;
  type: 'movie' | 'tv';
}

export function MovieCard({ item, type }: MovieCardProps) {
  const { addItem, removeItem, isInCart } = useCart();
  const [showAnimation, setShowAnimation] = React.useState(false);
  
  const title = 'title' in item ? item.title : item.name;
  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const posterUrl = item.poster_path 
    ? \`\${IMAGE_BASE_URL}/\${POSTER_SIZE}\${item.poster_path}\`
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop&crop=center';

  const inCart = isInCart(item.id);

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem: CartItem = {
      id: item.id,
      title,
      poster_path: item.poster_path,
      type,
      release_date: 'release_date' in item ? item.release_date : undefined,
      first_air_date: 'first_air_date' in item ? item.first_air_date : undefined,
      vote_average: item.vote_average,
      selectedSeasons: type === 'tv' ? [1] : undefined,
    };

    if (inCart) {
      removeItem(item.id);
    } else {
      addItem(cartItem);
      setShowAnimation(true);
    }
  };

  return (
    <>
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <Link to={\`/\${type}/\${item.id}\`}>
        <div className="relative overflow-hidden">
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className="w-full h-80 group-hover:scale-110 transition-transform duration-300"
            lazy={true}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{year}</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {item.overview || 'Sin descripción disponible'}
          </p>
        </div>
      </Link>
      
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleCartAction}
          className={\`p-2 rounded-full shadow-lg transition-all duration-200 \${
            inCart
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }\`}
        >
          {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
      
      <CartAnimation 
        show={showAnimation} 
        onComplete={() => setShowAnimation(false)} 
      />
    </div>
    </>
  );
}`,

    'src/components/LoadingSpinner.tsx': `import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-r-2 border-blue-400 absolute top-0 left-0 animation-delay-75"></div>
      </div>
    </div>
  );
}`,

    'src/components/ErrorMessage.tsx': `import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Oops! Algo salió mal</h3>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
    </div>
  );
}`,

    'src/components/OptimizedImage.tsx': `import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop&crop=center',
  lazy = true,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(lazy ? '' : src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, lazy]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setImageSrc(fallbackSrc);
    onError?.();
  };

  return (
    <div className={\`relative overflow-hidden \${className}\`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={\`w-full h-full object-cover transition-opacity duration-300 \${
          isLoading ? 'opacity-0' : 'opacity-100'
        } \${className}\`}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
      />
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Error al cargar imagen</span>
        </div>
      )}
    </div>
  );
}`,

    'src/components/Toast.tsx': `import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X, ShoppingCart, Trash2 } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div className={\`fixed top-20 right-4 z-50 transform transition-all duration-500 \${
      isAnimating ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
    }\`}>
      <div className={\`flex items-center p-4 rounded-2xl shadow-2xl max-w-sm backdrop-blur-sm border-2 \${
        type === 'success' 
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300' 
          : 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-300'
      } animate-bounce\`}>
        <div className={\`flex-shrink-0 mr-3 p-2 rounded-full \${
          type === 'success' ? 'bg-white/20' : 'bg-white/20'
        } animate-pulse\`}>
          {type === 'success' ? (
            <ShoppingCart className="h-5 w-5" />
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 ml-3 hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>
        
        {/* Animated progress bar */}
        <div className={\`absolute bottom-0 left-0 h-1 rounded-b-2xl \${
          type === 'success' ? 'bg-white/30' : 'bg-white/30'
        } animate-pulse\`}>
          <div className={\`h-full rounded-b-2xl \${
            type === 'success' ? 'bg-white' : 'bg-white'
          } animate-[shrink_3s_linear_forwards]\`} />
        </div>
      </div>
    </div>
  );
}`
  };
}

// Get all page source files
export function getPageSources(): { [path: string]: string } {
  return {
    'src/pages/Home.tsx': `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Star, Tv, Filter, Calendar, Clock, Flame, BookOpen } from 'lucide-react';
import { tmdbService } from '../services/tmdb';
import { MovieCard } from '../components/MovieCard';
import { HeroCarousel } from '../components/HeroCarousel';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { NovelasModal } from '../components/NovelasModal';
import type { Movie, TVShow } from '../types/movie';

type TrendingTimeWindow = 'day' | 'week';

export function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<TVShow[]>([]);
  const [popularAnime, setPopularAnime] = useState<TVShow[]>([]);
  const [trendingContent, setTrendingContent] = useState<(Movie | TVShow)[]>([]);
  const [heroItems, setHeroItems] = useState<(Movie | TVShow)[]>([]);
  const [trendingTimeWindow, setTrendingTimeWindow] = useState<TrendingTimeWindow>('day');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showNovelasModal, setShowNovelasModal] = useState(false);

  const timeWindowLabels = {
    day: 'Hoy',
    week: 'Esta Semana'
  };

  const fetchTrendingContent = async (timeWindow: TrendingTimeWindow) => {
    try {
      const response = await tmdbService.getTrendingAll(timeWindow, 1);
      const uniqueContent = tmdbService.removeDuplicates(response.results);
      setTrendingContent(uniqueContent.slice(0, 12));
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching trending content:', err);
    }
  };

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      
      // Get hero content first (no duplicates)
      const heroContent = await tmdbService.getHeroContent();
      setHeroItems(heroContent);
      
      // Get trending content
      const trendingResponse = await tmdbService.getTrendingAll(trendingTimeWindow, 1);
      const uniqueTrending = tmdbService.removeDuplicates(trendingResponse.results);
      setTrendingContent(uniqueTrending.slice(0, 12));
      
      // Get other content, excluding items already in hero and trending
      const usedIds = new Set([
        ...heroContent.map(item => item.id),
        ...uniqueTrending.slice(0, 12).map(item => item.id)
      ]);
      
      const [moviesRes, tvRes, animeRes] = await Promise.all([
        tmdbService.getPopularMovies(1),
        tmdbService.getPopularTVShows(1),
        tmdbService.getAnimeFromMultipleSources(1)
      ]);

      // Filter out duplicates
      const filteredMovies = moviesRes.results.filter(movie => !usedIds.has(movie.id)).slice(0, 8);
      const filteredTVShows = tvRes.results.filter(show => !usedIds.has(show.id)).slice(0, 8);
      const filteredAnime = animeRes.results.filter(anime => !usedIds.has(anime.id)).slice(0, 8);

      setPopularMovies(filteredMovies);
      setPopularTVShows(filteredTVShows);
      setPopularAnime(filteredAnime);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Error al cargar el contenido. Por favor, intenta de nuevo.');
      console.error('Error fetching home data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  useEffect(() => {
    fetchTrendingContent(trendingTimeWindow);
  }, [trendingTimeWindow]);

  // Auto-refresh content daily and weekly
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    // Set initial timeout for midnight
    const midnightTimeout = setTimeout(() => {
      fetchAllContent();
      
      // Then set daily interval
      const dailyInterval = setInterval(() => {
        fetchAllContent();
      }, 24 * 60 * 60 * 1000); // 24 hours
      
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    // Weekly refresh on Sundays
    const weeklyInterval = setInterval(() => {
      const currentDay = new Date().getDay();
      if (currentDay === 0) { // Sunday
        fetchAllContent();
      }
    }, 24 * 60 * 60 * 1000); // Check daily for Sunday

    return () => {
      clearTimeout(midnightTimeout);
      clearInterval(weeklyInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <HeroCarousel items={heroItems} />
      
      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Descubre el Mundo del
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
              {' '}Entretenimiento
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Explora miles de películas, animes, series ilimitadas y mucho más. Encuentra tus favoritos y agrégalos a tu carrito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/movies"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Explorar Películas
            </Link>
            <Link
              to="/tv"
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <Tv className="mr-2 h-5 w-5" />
              Ver Series
            </Link>
            <button
              onClick={() => setShowNovelasModal(true)}
              className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Catálogo de Novelas
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Content */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Flame className="mr-2 h-6 w-6 text-red-500" />
              En Tendencia
            </h2>
            
            {/* Trending Filter */}
            <div className="flex items-center space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <Filter className="h-4 w-4 text-gray-500 ml-2" />
              <span className="text-sm font-medium text-gray-700 px-2">Período:</span>
              {Object.entries(timeWindowLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTrendingTimeWindow(key as TrendingTimeWindow)}
                  className={\`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center \${
                    trendingTimeWindow === key
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md transform scale-105'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }\`}
                >
                  {key === 'day' ? <Calendar className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingContent.map((item) => {
              const itemType = 'title' in item ? 'movie' : 'tv';
              return (
                <MovieCard key={\`trending-\${itemType}-\${item.id}\`} item={item} type={itemType} />
              );
            })}
          </div>
        </section>

        {/* Popular Movies */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Star className="mr-2 h-6 w-6 text-yellow-500" />
              Películas Destacadas
            </h2>
            <Link
              to="/movies"
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              Ver todas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        </section>

        {/* Popular TV Shows */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Tv className="mr-2 h-6 w-6 text-blue-500" />
              Series Destacadas
            </h2>
            <Link
              to="/tv"
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              Ver todas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularTVShows.map((show) => (
              <MovieCard key={show.id} item={show} type="tv" />
            ))}
          </div>
        </section>

        {/* Popular Anime */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="mr-2 text-2xl">🎌</span>
              Anime Destacado
            </h2>
            <Link
              to="/anime"
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              Ver todos
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularAnime.map((anime) => (
              <MovieCard key={anime.id} item={anime} type="tv" />
            ))}
          </div>
        </section>

        {/* Last Update Info (Hidden from users) */}
        <div className="hidden">
          <p>Última actualización: {lastUpdate.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Modal de Novelas */}
      <NovelasModal 
        isOpen={showNovelasModal} 
        onClose={() => setShowNovelasModal(false)} 
      />
    </div>
  );
}`,

    'src/pages/Movies.tsx': `import React, { useState, useEffect } from 'react';
import { Film, Filter } from 'lucide-react';
import { useOptimizedContent } from '../hooks/useOptimizedContent';
import { tmdbService } from '../services/tmdb';
import { MovieCard } from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Movie } from '../types/movie';

type MovieCategory = 'popular' | 'top_rated' | 'upcoming';

export function Movies() {
  const [category, setCategory] = useState<MovieCategory>('popular');

  const categoryTitles = {
    popular: 'Populares',
    top_rated: 'Mejor Valoradas',
    upcoming: 'Próximos Estrenos'
  };

  const getFetchFunction = (selectedCategory: MovieCategory) => {
    switch (selectedCategory) {
      case 'top_rated':
        return tmdbService.getTopRatedMovies.bind(tmdbService);
      case 'upcoming':
        return tmdbService.getUpcomingMovies.bind(tmdbService);
      default:
        return tmdbService.getPopularMovies.bind(tmdbService);
    }
  };

  const { data: movies, loading, error, hasMore, loadMore } = useOptimizedContent(
    getFetchFunction(category),
    [category]
  );

  const handleCategoryChange = (newCategory: MovieCategory) => {
    setCategory(newCategory);
  };

  if (loading && movies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Film className="mr-3 h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Películas {categoryTitles[category]}
            </h1>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-1 bg-white rounded-lg p-1 shadow-sm w-fit">
            <Filter className="h-4 w-4 text-gray-500 ml-2" />
            {Object.entries(categoryTitles).map(([key, title]) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key as MovieCategory)}
                className={\`px-4 py-2 rounded-md text-sm font-medium transition-colors \${
                  category === key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }\`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {movies.map((movie) => (
            <MovieCard key={\`\${movie.id}-\${category}\`} item={movie} type="movie" />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Cargando...' : 'Cargar más películas'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}`
  };
}

// Get all service source files
export function getServiceSources(): { [path: string]: string } {
  return {
    'src/services/tmdb.ts': `import { BASE_URL, API_OPTIONS } from '../config/api';
import { apiService } from './api';
import type { Movie, TVShow, MovieDetails, TVShowDetails, Video, APIResponse, Genre, Cast, CastMember } from '../types/movie';

class TMDBService {
  private async fetchData<T>(endpoint: string, useCache: boolean = true): Promise<T> {
    return apiService.fetchWithCache<T>(endpoint, useCache);
  }

  // Enhanced video fetching with better filtering
  private async getVideosWithFallback(endpoint: string): Promise<{ results: Video[] }> {
    try {
      // Try Spanish first
      const spanishVideos = await this.fetchData<{ results: Video[] }>(\`\${endpoint}?language=es-ES\`);
      
      // If no Spanish videos, try English
      if (!spanishVideos.results || spanishVideos.results.length === 0) {
        const englishVideos = await this.fetchData<{ results: Video[] }>(\`\${endpoint}?language=en-US\`);
        return englishVideos;
      }
      
      // If Spanish videos exist but no trailers, combine with English
      const spanishTrailers = spanishVideos.results.filter(
        video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
      );
      
      if (spanishTrailers.length === 0) {
        const englishVideos = await this.fetchData<{ results: Video[] }>(\`\${endpoint}?language=en-US\`);
        const englishTrailers = englishVideos.results.filter(
          video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
        );
        
        return {
          results: [...spanishVideos.results, ...englishTrailers]
        };
      }
      
      return spanishVideos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return { results: [] };
    }
  }

  // Movies
  async getPopularMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchData(\`/movie/popular?language=es-ES&page=\${page}\`, page === 1);
  }

  async getTopRatedMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchData(\`/movie/top_rated?language=es-ES&page=\${page}\`, page === 1);
  }

  async getUpcomingMovies(page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchData(\`/movie/upcoming?language=es-ES&page=\${page}\`, page === 1);
  }

  async searchMovies(query: string, page: number = 1): Promise<APIResponse<Movie>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(\`/search/movie?query=\${encodedQuery}&language=es-ES&page=\${page}\`);
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.fetchData(\`/movie/\${id}?language=es-ES\`, true);
  }

  async getMovieVideos(id: number): Promise<{ results: Video[] }> {
    return this.getVideosWithFallback(\`/movie/\${id}/videos\`);
  }

  async getMovieCredits(id: number): Promise<Cast> {
    return this.fetchData(\`/movie/\${id}/credits?language=es-ES\`, true);
  }

  // TV Shows
  async getPopularTVShows(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/tv/popular?language=es-ES&page=\${page}\`, page === 1);
  }

  async getTopRatedTVShows(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/tv/top_rated?language=es-ES&page=\${page}\`, page === 1);
  }

  async searchTVShows(query: string, page: number = 1): Promise<APIResponse<TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(\`/search/tv?query=\${encodedQuery}&language=es-ES&page=\${page}\`);
  }

  async getTVShowDetails(id: number): Promise<TVShowDetails> {
    return this.fetchData(\`/tv/\${id}?language=es-ES\`, true);
  }

  async getTVShowVideos(id: number): Promise<{ results: Video[] }> {
    return this.getVideosWithFallback(\`/tv/\${id}/videos\`);
  }

  async getTVShowCredits(id: number): Promise<Cast> {
    return this.fetchData(\`/tv/\${id}/credits?language=es-ES\`, true);
  }

  // Anime (using discover with Japanese origin)
  async getPopularAnime(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=\${page}&sort_by=popularity.desc&include_adult=false\`, page === 1);
  }

  async getTopRatedAnime(page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=\${page}&sort_by=vote_average.desc&vote_count.gte=100&include_adult=false\`, page === 1);
  }

  async searchAnime(query: string, page: number = 1): Promise<APIResponse<TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(\`/search/tv?query=\${encodedQuery}&language=es-ES&page=\${page}&with_genres=16&with_origin_country=JP\`);
  }

  // Enhanced anime discovery with multiple sources
  async getAnimeFromMultipleSources(page: number = 1): Promise<APIResponse<TVShow>> {
    try {
      const [japaneseAnime, animationGenre, koreanAnimation] = await Promise.all([
        this.fetchData<APIResponse<TVShow>>(\`/discover/tv?with_origin_country=JP&with_genres=16&language=es-ES&page=\${page}&sort_by=popularity.desc&include_adult=false\`, page === 1),
        this.fetchData<APIResponse<TVShow>>(\`/discover/tv?with_genres=16&language=es-ES&page=\${page}&sort_by=popularity.desc&include_adult=false\`, page === 1),
        this.fetchData<APIResponse<TVShow>>(\`/discover/tv?with_origin_country=KR&with_genres=16&language=es-ES&page=\${page}&sort_by=popularity.desc&include_adult=false\`, page === 1)
      ]);

      // Combine and remove duplicates
      const combinedResults = [
        ...japaneseAnime.results,
        ...animationGenre.results.filter(item => 
          !japaneseAnime.results.some(jp => jp.id === item.id)
        ),
        ...koreanAnimation.results.filter(item => 
          !japaneseAnime.results.some(jp => jp.id === item.id) &&
          !animationGenre.results.some(an => an.id === item.id)
        )
      ];

      return {
        ...japaneseAnime,
        results: this.removeDuplicates(combinedResults)
      };
    } catch (error) {
      console.error('Error fetching anime from multiple sources:', error);
      return this.getPopularAnime(page);
    }
  }

  // Genres
  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchData('/genre/movie/list?language=es-ES', true);
  }

  async getTVGenres(): Promise<{ genres: Genre[] }> {
    return this.fetchData('/genre/tv/list?language=es-ES', true);
  }

  // Multi search
  async searchMulti(query: string, page: number = 1): Promise<APIResponse<Movie | TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchData(\`/search/multi?query=\${encodedQuery}&language=es-ES&page=\${page}\`);
  }

  // Trending content - synchronized with TMDB
  async getTrendingAll(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<Movie | TVShow>> {
    return this.fetchData(\`/trending/all/\${timeWindow}?language=es-ES&page=\${page}\`, page === 1);
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<Movie>> {
    return this.fetchData(\`/trending/movie/\${timeWindow}?language=es-ES&page=\${page}\`, page === 1);
  }

  async getTrendingTV(timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<APIResponse<TVShow>> {
    return this.fetchData(\`/trending/tv/\${timeWindow}?language=es-ES&page=\${page}\`, page === 1);
  }

  // Enhanced content discovery methods
  async getDiscoverMovies(params: {
    genre?: number;
    year?: number;
    sortBy?: string;
    page?: number;
  } = {}): Promise<APIResponse<Movie>> {
    const { genre, year, sortBy = 'popularity.desc', page = 1 } = params;
    let endpoint = \`/discover/movie?language=es-ES&page=\${page}&sort_by=\${sortBy}&include_adult=false\`;
    
    if (genre) endpoint += \`&with_genres=\${genre}\`;
    if (year) endpoint += \`&year=\${year}\`;
    
    return this.fetchData(endpoint);
  }

  async getDiscoverTVShows(params: {
    genre?: number;
    year?: number;
    sortBy?: string;
    page?: number;
    country?: string;
  } = {}): Promise<APIResponse<TVShow>> {
    const { genre, year, sortBy = 'popularity.desc', page = 1, country } = params;
    let endpoint = \`/discover/tv?language=es-ES&page=\${page}&sort_by=\${sortBy}&include_adult=false\`;
    
    if (genre) endpoint += \`&with_genres=\${genre}\`;
    if (year) endpoint += \`&first_air_date_year=\${year}\`;
    if (country) endpoint += \`&with_origin_country=\${country}\`;
    
    return this.fetchData(endpoint);
  }

  // Utility method to remove duplicates from combined results
  removeDuplicates<T extends { id: number }>(items: T[]): T[] {
    const seen = new Set<number>();
    return items.filter(item => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }

  // Get fresh trending content for hero carousel (no duplicates)
  async getHeroContent(): Promise<(Movie | TVShow)[]> {
    try {
      const [trendingDay, trendingWeek, popularMovies, popularTV] = await Promise.all([
        this.getTrendingAll('day', 1),
        this.getTrendingAll('week', 1),
        this.getPopularMovies(1),
        this.getPopularTVShows(1)
      ]);

      // Combine and prioritize trending content
      const combinedItems = [
        ...trendingDay.results.slice(0, 8),
        ...trendingWeek.results.slice(0, 4),
        ...popularMovies.results.slice(0, 3),
        ...popularTV.results.slice(0, 3)
      ];

      // Remove duplicates and return top items
      return this.removeDuplicates(combinedItems).slice(0, 10);
    } catch (error) {
      console.error('Error fetching hero content:', error);
      return [];
    }
  }

  // Batch fetch videos for multiple items
  async batchFetchVideos(items: { id: number; type: 'movie' | 'tv' }[]): Promise<Map<string, Video[]>> {
    const videoMap = new Map<string, Video[]>();
    
    try {
      const videoPromises = items.map(async (item) => {
        const key = \`\${item.type}-\${item.id}\`;
        try {
          const videos = item.type === 'movie' 
            ? await this.getMovieVideos(item.id)
            : await this.getTVShowVideos(item.id);
          
          const trailers = videos.results.filter(
            video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
          );
          
          return { key, videos: trailers };
        } catch (error) {
          console.error(\`Error fetching videos for \${key}:\`, error);
          return { key, videos: [] };
        }
      });

      const results = await Promise.all(videoPromises);
      results.forEach(({ key, videos }) => {
        videoMap.set(key, videos);
      });
    } catch (error) {
      console.error('Error in batch fetch videos:', error);
    }
    
    return videoMap;
  }

  // Clear API cache
  clearCache(): void {
    apiService.clearCache();
  }

  // Get cache statistics
  getCacheStats(): { size: number; items: { key: string; age: number }[] } {
    return {
      size: apiService.getCacheSize(),
      items: apiService.getCacheInfo()
    };
  }

  // Enhanced sync method for better content freshness
  async syncAllContent(): Promise<{
    movies: Movie[];
    tvShows: TVShow[];
    anime: TVShow[];
    trending: (Movie | TVShow)[];
  }> {
    try {
      const [
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        popularTV,
        topRatedTV,
        popularAnime,
        topRatedAnime,
        trendingDay,
        trendingWeek
      ] = await Promise.all([
        this.getPopularMovies(1),
        this.getTopRatedMovies(1),
        this.getUpcomingMovies(1),
        this.getPopularTVShows(1),
        this.getTopRatedTVShows(1),
        this.getAnimeFromMultipleSources(1),
        this.getTopRatedAnime(1),
        this.getTrendingAll('day', 1),
        this.getTrendingAll('week', 1)
      ]);

      // Combine and deduplicate content
      const movies = this.removeDuplicates([
        ...popularMovies.results,
        ...topRatedMovies.results,
        ...upcomingMovies.results
      ]);

      const tvShows = this.removeDuplicates([
        ...popularTV.results,
        ...topRatedTV.results
      ]);

      const anime = this.removeDuplicates([
        ...popularAnime.results,
        ...topRatedAnime.results
      ]);

      const trending = this.removeDuplicates([
        ...trendingDay.results,
        ...trendingWeek.results
      ]);

      return { movies, tvShows, anime, trending };
    } catch (error) {
      console.error('Error syncing all content:', error);
      return { movies: [], tvShows: [], anime: [], trending: [] };
    }
  }
}

export const tmdbService = new TMDBService();`,

    'src/services/api.ts': `// Centralized API service for better error handling and caching
import { BASE_URL, API_OPTIONS } from '../config/api';

export class APIService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async fetchWithCache<T>(endpoint: string, useCache: boolean = true): Promise<T> {
    const cacheKey = endpoint;
    
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
      
      if (!isExpired) {
        return cached.data;
      }
    }

    try {
      const response = await fetch(\`\${BASE_URL}\${endpoint}\`, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      
      if (useCache) {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      }
      
      return data;
    } catch (error) {
      console.error(\`API Error for \${endpoint}:\`, error);
      
      // Return cached data if available, even if expired
      if (this.cache.has(cacheKey)) {
        console.warn(\`Using expired cache for \${endpoint}\`);
        return this.cache.get(cacheKey)!.data;
      }
      
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  getCacheInfo(): { key: string; age: number }[] {
    const now = Date.now();
    return Array.from(this.cache.entries()).map(([key, { timestamp }]) => ({
      key,
      age: now - timestamp
    }));
  }
}

export const apiService = new APIService();`
  };
}

// Get all utility source files
export function getUtilitySources(): { [path: string]: string } {
  return {
    'src/utils/performance.ts': `// Performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observers: Map<string, IntersectionObserver> = new Map();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Lazy loading for images
  setupLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      this.observers.set('images', imageObserver);

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Debounce function for search and other frequent operations
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttle function for scroll events
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Preload critical resources
  preloadResource(url: string, type: 'image' | 'script' | 'style'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    switch (type) {
      case 'image':
        link.as = 'image';
        break;
      case 'script':
        link.as = 'script';
        break;
      case 'style':
        link.as = 'style';
        break;
    }
    
    document.head.appendChild(link);
  }

  // Clean up observers
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();`,

    'src/utils/errorHandler.ts': `// Centralized error handling utility
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: Array<{ error: Error; timestamp: Date; context: string }> = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  logError(error: Error, context: string = 'Unknown'): void {
    const errorEntry = {
      error,
      timestamp: new Date(),
      context
    };

    this.errorLog.push(errorEntry);
    
    // Keep only last 50 errors
    if (this.errorLog.length > 50) {
      this.errorLog = this.errorLog.slice(-50);
    }

    console.error(\`[\${context}] Error:\`, error);
  }

  getErrorLog(): Array<{ error: Error; timestamp: Date; context: string }> {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }

  handleAsyncError(promise: Promise<any>, context: string): Promise<any> {
    return promise.catch(error => {
      this.logError(error, context);
      throw error;
    });
  }
}

export const errorHandler = ErrorHandler.getInstance();

// Error boundary hook
export function useErrorHandler() {
  const logError = (error: Error, context: string) => {
    errorHandler.logError(error, context);
  };

  const handleAsyncError = (promise: Promise<any>, context: string) => {
    return errorHandler.handleAsyncError(promise, context);
  };

  return { logError, handleAsyncError };
}`,

    'src/utils/whatsapp.ts': `import { OrderData, CustomerInfo } from '../components/CheckoutModal';

export function sendOrderToWhatsApp(orderData: OrderData): void {
  const { 
    orderId, 
    customerInfo, 
    deliveryZone, 
    deliveryCost, 
    items, 
    subtotal, 
    transferFee, 
    total,
    cashTotal = 0,
    transferTotal = 0
  } = orderData;

  // Formatear lista de productos
  const itemsList = items
    .map(item => {
      const seasonInfo = item.selectedSeasons && item.selectedSeasons.length > 0 
        ? \`\\n  📺 Temporadas: \${item.selectedSeasons.sort((a, b) => a - b).join(', ')}\` 
        : '';
      const itemType = item.type === 'movie' ? 'Película' : 'Serie';
      const basePrice = item.type === 'movie' ? 80 : (item.selectedSeasons?.length || 1) * 300;
      const finalPrice = item.paymentType === 'transfer' ? Math.round(basePrice * 1.1) : basePrice;
      const paymentTypeText = item.paymentType === 'transfer' ? 'Transferencia (+10%)' : 'Efectivo';
      const emoji = item.type === 'movie' ? '🎬' : '📺';
      return \`\${emoji} *\${item.title}*\${seasonInfo}\\n  📋 Tipo: \${itemType}\\n  💳 Pago: \${paymentTypeText}\\n  💰 Precio: $\${finalPrice.toLocaleString()} CUP\`;
    })
    .join('\\n\\n');

  // Construir mensaje completo
  let message = \`🎬 *NUEVO PEDIDO - TV A LA CARTA*\\n\\n\`;
  message += \`📋 *ID de Orden:* \${orderId}\\n\\n\`;
  
  message += \`👤 *DATOS DEL CLIENTE:*\\n\`;
  message += \`• Nombre: \${customerInfo.fullName}\\n\`;
  message += \`• Teléfono: \${customerInfo.phone}\\n\`;
  message += \`• Dirección: \${customerInfo.address}\\n\\n\`;
  
  message += \`🎯 *PRODUCTOS SOLICITADOS:*\\n\${itemsList}\\n\\n\`;
  
  message += \`💰 *RESUMEN DE COSTOS:*\\n\`;
  
  // Desglosar por tipo de pago
  const cashItems = items.filter(item => item.paymentType === 'cash');
  const transferItems = items.filter(item => item.paymentType === 'transfer');
  
  // Mostrar desglose detallado por tipo de pago
  message += \`\\n📊 *DESGLOSE POR TIPO DE PAGO:*\\n\`;
  
  if (cashItems.length > 0) {
    message += \`💵 *EFECTIVO:*\\n\`;
    cashItems.forEach(item => {
      const basePrice = item.type === 'movie' ? 80 : (item.selectedSeasons?.length || 1) * 300;
      const emoji = item.type === 'movie' ? '🎬' : '📺';
      message += \`  \${emoji} \${item.title}: $\${basePrice.toLocaleString()} CUP\\n\`;
    });
    message += \`  💰 *Subtotal Efectivo: $\${cashTotal.toLocaleString()} CUP*\\n\\n\`;
  }
  
  if (transferItems.length > 0) {
    message += \`🏦 *TRANSFERENCIA (+10%):*\\n\`;
    transferItems.forEach(item => {
      const basePrice = item.type === 'movie' ? 80 : (item.selectedSeasons?.length || 1) * 300;
      const finalPrice = Math.round(basePrice * 1.1);
      const emoji = item.type === 'movie' ? '🎬' : '📺';
      message += \`  \${emoji} \${item.title}: $\${basePrice.toLocaleString()} → $\${finalPrice.toLocaleString()} CUP\\n\`;
    });
    message += \`  💰 *Subtotal Transferencia: $\${transferTotal.toLocaleString()} CUP*\\n\\n\`;
  }
  
  message += \`📋 *RESUMEN FINAL:*\\n\`;
  if (cashTotal > 0) {
    message += \`• Efectivo: $\${cashTotal.toLocaleString()} CUP (\${cashItems.length} elementos)\\n\`;
  }
  if (transferTotal > 0) {
    message += \`• Transferencia: $\${transferTotal.toLocaleString()} CUP (\${transferItems.length} elementos)\\n\`;
  }
  message += \`• *Subtotal Contenido: $\${subtotal.toLocaleString()} CUP*\\n\`;
  
  if (transferFee > 0) {
    message += \`• Recargo transferencia (10%): +$\${transferFee.toLocaleString()} CUP\\n\`;
  }
  
  message += \`🚚 Entrega (\${deliveryZone.split(' > ')[2]}): +$\${deliveryCost.toLocaleString()} CUP\\n\`;
  message += \`\\n🎯 *TOTAL FINAL: $\${total.toLocaleString()} CUP*\\n\\n\`;
  
  message += \`📍 *ZONA DE ENTREGA:*\\n\`;
  message += \`\${deliveryZone.replace(' > ', ' → ')}\\n\`;
  message += \`💰 Costo de entrega: $\${deliveryCost.toLocaleString()} CUP\\n\\n\`;
  
  message += \`📊 *ESTADÍSTICAS DEL PEDIDO:*\\n\`;
  message += \`• Total de elementos: \${items.length}\\n\`;
  message += \`• Películas: \${items.filter(item => item.type === 'movie').length}\\n\`;
  message += \`• Series: \${items.filter(item => item.type === 'tv').length}\\n\`;
  if (cashItems.length > 0) {
    message += \`• Pago en efectivo: \${cashItems.length} elementos\\n\`;
  }
  if (transferItems.length > 0) {
    message += \`• Pago por transferencia: \${transferItems.length} elementos\\n\`;
  }
  message += \`\\n\`;
  
  message += \`📱 *Enviado desde:* TV a la Carta App\\n\`;
  message += \`⏰ *Fecha y hora:* \${new Date().toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })}\\n\`;
  message += \`🌟 *¡Gracias por elegir TV a la Carta!*\`;
  
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = '5354690878'; // Número de WhatsApp
  const whatsappUrl = \`https://wa.me/\${phoneNumber}?text=\${encodedMessage}\`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}`
  };
}

// Get all config source files
export function getConfigSources(): { [path: string]: string } {
  return {
    'src/config/api.ts': `const API_KEY = '36c08297b5565b5604ed8646cb0c1393';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmMwODI5N2I1NTY1YjU2MDRlZDg2NDZjYjBjMTM5MyIsIm5iZiI6MTcxNzM3MjM0Ny44NDcwMDAxLCJzdWIiOiI2NjVkMDViYmZkOTMxM2QwZDNhMGFjZDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X8jcKcjIT1svPP5EeO0CtF3Ct11pZwrXaJ0DLAz5pDQ';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const POSTER_SIZE = 'w500';
export const BACKDROP_SIZE = 'w1280';

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: \`Bearer \${ACCESS_TOKEN}\`
  }
};

export { API_KEY };`
  };
}

// Get all type definition files
export function getTypeSources(): { [path: string]: string } {
  return {
    'src/types/movie.ts': `export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  video: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface TVShowDetails extends TVShow {
  genres: Genre[];
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
  tagline: string;
  homepage: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  seasons: Season[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Cast {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CartItem {
  id: number;
  title: string;
  poster_path: string | null;
  type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  selectedSeasons?: number[];
  price?: number;
  totalPrice?: number;
  paymentType?: 'cash' | 'transfer';
  original_language?: string;
  genre_ids?: number[];
}

export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}`
  };
}

export function generateSystemReadme(state: AdminState): string {
  return `# TV a la Carta - Sistema Completo

## Descripción
Sistema completo de TV a la Carta con panel de administración avanzado y sincronización en tiempo real.

## Características Principales
- ✅ Panel de administración completo con autenticación
- ✅ Gestión de precios en tiempo real con sincronización automática
- ✅ Gestión de zonas de entrega personalizables
- ✅ Catálogo de novelas completamente administrable
- ✅ Sistema de notificaciones en tiempo real
- ✅ Sincronización automática entre pestañas/dispositivos
- ✅ Exportación del sistema completo con código fuente
- ✅ Carrito de compras con múltiples tipos de pago
- ✅ Integración completa con TMDB API
- ✅ Búsqueda avanzada de contenido
- ✅ Responsive design optimizado para móviles
- ✅ Sistema anti-zoom y protecciones de seguridad
- ✅ Optimización de rendimiento y caché inteligente

## Configuración Actual del Sistema

### Precios Configurados (Sincronizados en Tiempo Real)
- Películas: $${state.prices.moviePrice} CUP
- Series (por temporada): $${state.prices.seriesPrice} CUP
- Recargo transferencia bancaria: ${state.prices.transferFeePercentage}%
- Novelas (por capítulo): $${state.prices.novelPricePerChapter} CUP

### Zonas de Entrega Configuradas (${state.deliveryZones.length} zonas)
${state.deliveryZones.length > 0 
  ? state.deliveryZones.map((zone: any) => `- ${zone.name}: $${zone.cost} CUP`).join('\n')
  : '- No hay zonas personalizadas configuradas (usando zonas base)'
}

### Novelas Administradas (${state.novels.length} novelas)
${state.novels.length > 0 
  ? state.novels.map((novel: any) => `- ${novel.titulo} (${novel.año}) - ${novel.capitulos} capítulos - $${(novel.capitulos * state.prices.novelPricePerChapter).toLocaleString()} CUP`).join('\n')
  : '- Usando catálogo base de 50 novelas clásicas'
}

## Estructura del Proyecto

### Archivos de Configuración
- \`package.json\` - Dependencias y scripts del proyecto
- \`vite.config.ts\` - Configuración de Vite
- \`tailwind.config.js\` - Configuración de Tailwind CSS
- \`tsconfig.json\` - Configuración de TypeScript
- \`eslint.config.js\` - Configuración de ESLint
- \`vercel.json\` - Configuración para despliegue en Vercel

### Código Fuente Principal
- \`src/App.tsx\` - Componente principal con routing y providers
- \`src/main.tsx\` - Punto de entrada de la aplicación
- \`src/index.css\` - Estilos globales y configuraciones anti-zoom

### Componentes (\`src/components/\`)
- \`Header.tsx\` - Navegación principal con búsqueda en tiempo real
- \`MovieCard.tsx\` - Tarjeta de película/serie con animaciones
- \`CartAnimation.tsx\` - Animaciones del carrito de compras
- \`CheckoutModal.tsx\` - Modal de checkout con integración WhatsApp
- \`NovelasModal.tsx\` - Modal del catálogo de novelas
- \`HeroCarousel.tsx\` - Carrusel principal con auto-play
- \`CastSection.tsx\` - Sección de reparto de actores
- \`PriceCard.tsx\` - Tarjeta de precios con cálculos dinámicos
- \`VideoPlayer.tsx\` - Reproductor de videos de YouTube
- \`OptimizedImage.tsx\` - Componente de imagen optimizada
- \`LoadingSpinner.tsx\` - Spinner de carga
- \`ErrorMessage.tsx\` - Componente de mensajes de error
- \`Toast.tsx\` - Notificaciones toast animadas

### Páginas (\`src/pages/\`)
- \`Home.tsx\` - Página principal con contenido destacado
- \`Movies.tsx\` - Catálogo de películas con filtros
- \`TVShows.tsx\` - Catálogo de series con categorías
- \`Anime.tsx\` - Catálogo especializado de anime
- \`Search.tsx\` - Página de búsqueda avanzada
- \`MovieDetail.tsx\` - Detalles de película con tráilers
- \`TVDetail.tsx\` - Detalles de serie con selección de temporadas
- \`Cart.tsx\` - Carrito de compras con checkout
- \`AdminPanel.tsx\` - Panel de administración completo

### Contextos (\`src/context/\`)
- \`AdminContext.tsx\` - Estado global del panel de administración
- \`CartContext.tsx\` - Estado global del carrito de compras

### Servicios (\`src/services/\`)
- \`tmdb.ts\` - Servicio principal de TMDB API
- \`api.ts\` - Servicio base de API con caché
- \`contentSync.ts\` - Sincronización automática de contenido

### Utilidades (\`src/utils/\`)
- \`performance.ts\` - Optimizaciones de rendimiento
- \`errorHandler.ts\` - Manejo centralizado de errores
- \`whatsapp.ts\` - Integración con WhatsApp
- \`systemExport.ts\` - Exportación completa del sistema

### Hooks Personalizados (\`src/hooks/\`)
- \`useOptimizedContent.ts\` - Hook para contenido optimizado
- \`useContentSync.ts\` - Hook para sincronización de contenido
- \`usePerformance.ts\` - Hook para métricas de rendimiento

### Configuración (\`src/config/\`)
- \`api.ts\` - Configuración de API y endpoints

### Tipos (\`src/types/\`)
- \`movie.ts\` - Definiciones de tipos TypeScript

## Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o yarn
- Conexión a internet para TMDB API

### Pasos de Instalación
1. Extraer el archivo ZIP del sistema completo
2. Navegar al directorio del proyecto
3. Ejecutar: \`npm install\`
4. Ejecutar: \`npm run dev\`
5. Abrir http://localhost:5173 en el navegador

### Panel de Administración
- **URL de acceso:** \`/admin\`
- **Usuario:** \`admin\`
- **Contraseña:** \`admin123\`

### Funcionalidades del Panel de Administración
1. **Dashboard Principal**
   - Estado del sistema en tiempo real
   - Métricas de rendimiento
   - Estadísticas de uso
   - Actividad reciente

2. **Gestión de Precios**
   - Configuración de precios de películas
   - Configuración de precios de series
   - Configuración de recargo por transferencia
   - Configuración de precios de novelas
   - Sincronización automática en tiempo real

3. **Zonas de Entrega**
   - Agregar nuevas zonas de entrega
   - Editar zonas existentes
   - Eliminar zonas
   - Cálculo automático de costos

4. **Gestión de Novelas**
   - Agregar nuevas novelas al catálogo
   - Editar información de novelas
   - Eliminar novelas
   - Cálculo automático de precios por capítulo

5. **Sistema de Notificaciones**
   - Notificaciones en tiempo real
   - Historial de actividades
   - Limpieza de notificaciones

6. **Gestión del Sistema**
   - Exportación completa del sistema
   - Sincronización con sistemas remotos
   - Optimización de rendimiento
   - Métricas del sistema

## Características Técnicas

### Tecnologías Utilizadas
- **Frontend:** React 18 + TypeScript
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 3.4
- **Build Tool:** Vite 5.4
- **Icons:** Lucide React
- **API:** TMDB (The Movie Database)
- **State Management:** React Context + useReducer
- **Animations:** CSS Transitions + Tailwind

### Optimizaciones Implementadas
- Lazy loading de imágenes
- Caché inteligente de API
- Debounce en búsquedas
- Throttle en scroll events
- Preload de recursos críticos
- Eliminación de duplicados
- Sincronización automática de contenido
- Optimización de memoria

### Seguridad y UX
- Sistema anti-zoom completo
- Protección contra selección de texto
- Responsive design optimizado
- Navegación por teclado
- Accesibilidad mejorada
- Manejo robusto de errores

### Sincronización en Tiempo Real
- Cambios de precios se reflejan instantáneamente
- Zonas de entrega sincronizadas automáticamente
- Notificaciones en tiempo real
- Estado compartido entre pestañas
- Persistencia en localStorage

## API y Servicios

### TMDB Integration
- Películas populares, mejor valoradas y próximos estrenos
- Series populares y mejor valoradas
- Anime de múltiples fuentes (Japón, Corea)
- Búsqueda avanzada multi-tipo
- Contenido en tendencia (diario/semanal)
- Videos y tráilers
- Información de reparto
- Detalles completos de contenido

### WhatsApp Integration
- Generación automática de pedidos
- Formato profesional de mensajes
- Cálculos automáticos de precios
- Información completa del cliente
- Desglose detallado por tipo de pago

## Despliegue

### Plataformas Soportadas
- Vercel (configuración incluida)
- Netlify (redirects incluidos)
- Cualquier hosting estático

### Comandos de Build
- \`npm run build\` - Construir para producción
- \`npm run preview\` - Vista previa de build
- \`npm run lint\` - Verificar código

## Mantenimiento

### Actualizaciones Automáticas
- Contenido se actualiza diariamente a medianoche
- Refresh semanal los domingos
- Caché inteligente con expiración
- Sincronización automática de estado

### Monitoreo
- Métricas de rendimiento en tiempo real
- Log de errores centralizado
- Estadísticas de uso del sistema
- Estado de sincronización

## Soporte y Contacto
- **Teléfono:** +53 5469 0878
- **WhatsApp:** +53 5469 0878
- **Sistema:** TV a la Carta v2.0.0

## Notas Importantes
- Todos los precios están en pesos cubanos (CUP)
- El sistema requiere conexión a internet para TMDB API
- Las imágenes se cargan desde TMDB y Unsplash
- El sistema está optimizado para dispositivos móviles
- La sincronización funciona en tiempo real entre dispositivos

## Exportado el: ${new Date().toLocaleString('es-ES')}
## Versión del Sistema: 2.0.0
## Estado de Sincronización: ${state.syncStatus.isOnline ? 'En línea' : 'Sin conexión'}
## Última Sincronización: ${new Date(state.syncStatus.lastSync).toLocaleString('es-ES')}
`;
}

export function generateSystemConfig(state: AdminState): string {
  return JSON.stringify({
    systemVersion: "2.0.0",
    exportDate: new Date().toISOString(),
    configuration: {
      prices: state.prices,
      deliveryZones: state.deliveryZones,
      novels: state.novels,
      notifications: state.notifications.slice(0, 20),
      syncStatus: state.syncStatus
    },
    features: [
      "Real-time synchronization",
      "Complete admin panel",
      "Dynamic price management",
      "Delivery zones management",
      "Novel catalog management",
      "Notification system",
      "Complete system export",
      "WhatsApp integration",
      "TMDB API integration",
      "Advanced search",
      "Shopping cart",
      "Mobile optimization",
      "Anti-zoom security",
      "Performance optimization",
      "Error handling",
      "Content caching",
      "Auto-refresh content"
    ],
    technicalSpecs: {
      frontend: "React 18 + TypeScript",
      styling: "Tailwind CSS 3.4",
      buildTool: "Vite 5.4",
      routing: "React Router DOM 7",
      stateManagement: "React Context + useReducer",
      api: "TMDB (The Movie Database)",
      icons: "Lucide React",
      animations: "CSS Transitions + Tailwind"
    },
    fileStructure: {
      totalFiles: "50+ archivos de código fuente",
      components: "15+ componentes React",
      pages: "8 páginas principales",
      services: "3 servicios de API",
      utilities: "4 utilidades principales",
      hooks: "3 hooks personalizados",
      contexts: "2 contextos globales"
    }
  }, null, 2);
}

export function generateUpdatedPackageJson(): string {
  return JSON.stringify({
    "name": "tv-a-la-carta-sistema-completo",
    "private": true,
    "version": "2.0.0",
    "type": "module",
    "description": "Sistema completo de TV a la Carta con panel de administración sincronizado en tiempo real",
    "keywords": ["tv", "movies", "series", "anime", "streaming", "cart", "admin", "react", "typescript"],
    "author": "TV a la Carta",
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
    }
  }, null, 2);
}

export function getViteConfig(): string {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
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

export function getTailwindConfig(): string {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
}

export function getIndexHtml(): string {
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
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

export function getNetlifyRedirects(): string {
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

export function getVercelConfig(): string {
  return JSON.stringify({ 
    "rewrites": [{ "source": "/(.*)", "destination": "/" }],
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "installCommand": "npm install"
  }, null, 2);
}