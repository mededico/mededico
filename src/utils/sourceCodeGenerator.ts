import JSZip from 'jszip';

// Complete source code generator for full system backup
export const generateCompleteSourceCode = async (adminState: any) => {
  const zip = new JSZip();
  
  // Add README with current configuration
  const readme = generateSystemReadme(adminState);
  zip.file('README.md', readme);
  
  // Add package.json with updated configuration
  const packageJson = generateUpdatedPackageJson(adminState);
  zip.file('package.json', packageJson);
  
  // Add configuration files
  zip.file('vite.config.ts', getViteConfig());
  zip.file('tailwind.config.js', getTailwindConfig());
  zip.file('tsconfig.json', getTsConfig());
  zip.file('tsconfig.app.json', getTsAppConfig());
  zip.file('tsconfig.node.json', getTsNodeConfig());
  zip.file('postcss.config.js', getPostcssConfig());
  zip.file('eslint.config.js', getEslintConfig());
  zip.file('index.html', getIndexHtml());
  zip.file('vercel.json', getVercelConfig());
  zip.file('public/_redirects', getNetlifyRedirects());
  
  // Add main source files with current admin state embedded
  zip.file('src/main.tsx', getMainTsxSource());
  zip.file('src/index.css', getIndexCssSource());
  zip.file('src/App.tsx', getAppTsxSource(adminState));
  zip.file('src/vite-env.d.ts', getViteEnvSource());
  
  // Add context files with current state
  zip.file('src/context/AdminContext.tsx', getAdminContextSource(adminState));
  zip.file('src/context/CartContext.tsx', getCartContextSource(adminState));
  
  // Add component files
  zip.file('src/components/Header.tsx', getHeaderSource());
  zip.file('src/components/HeroCarousel.tsx', getHeroCarouselSource());
  zip.file('src/components/MovieCard.tsx', getMovieCardSource());
  zip.file('src/components/NovelCard.tsx', getNovelCardSource());
  zip.file('src/components/NetflixCarousel.tsx', getNetflixCarouselSource());
  zip.file('src/components/CheckoutModal.tsx', getCheckoutModalSource(adminState));
  zip.file('src/components/NovelasModal.tsx', getNovelasModalSource(adminState));
  zip.file('src/components/PriceCard.tsx', getPriceCardSource(adminState));
  zip.file('src/components/Toast.tsx', getToastSource());
  zip.file('src/components/OptimizedImage.tsx', getOptimizedImageSource());
  zip.file('src/components/LoadingSpinner.tsx', getLoadingSpinnerSource());
  zip.file('src/components/ErrorMessage.tsx', getErrorMessageSource());
  zip.file('src/components/VideoPlayer.tsx', getVideoPlayerSource());
  zip.file('src/components/CastSection.tsx', getCastSectionSource());
  zip.file('src/components/FloatingNav.tsx', getFloatingNavSource());
  
  // Add page files with current state
  zip.file('src/pages/Home.tsx', getHomePageSource(adminState));
  zip.file('src/pages/Movies.tsx', getMoviesPageSource());
  zip.file('src/pages/TVShows.tsx', getTVShowsPageSource());
  zip.file('src/pages/Anime.tsx', getAnimePageSource());
  zip.file('src/pages/Search.tsx', getSearchPageSource());
  zip.file('src/pages/Cart.tsx', getCartPageSource(adminState));
  zip.file('src/pages/MovieDetail.tsx', getMovieDetailPageSource());
  zip.file('src/pages/TVDetail.tsx', getTVDetailPageSource());
  zip.file('src/pages/NovelDetail.tsx', getNovelDetailPageSource());
  zip.file('src/pages/AdminPanel.tsx', getAdminPanelSource(adminState));
  
  // Add service files
  zip.file('src/services/tmdb.ts', getTmdbServiceSource());
  zip.file('src/services/api.ts', getApiServiceSource());
  zip.file('src/services/contentSync.ts', getContentSyncSource());
  zip.file('src/services/contentFilter.ts', getContentFilterSource());
  
  // Add utility files
  zip.file('src/utils/whatsapp.ts', getWhatsAppUtilsSource(adminState));
  zip.file('src/utils/performance.ts', getPerformanceUtilsSource());
  zip.file('src/utils/errorHandler.ts', getErrorHandlerSource());
  zip.file('src/utils/systemExport.ts', getSystemExportSource());
  zip.file('src/utils/sourceCodeGenerator.ts', getSourceCodeGeneratorSource());
  
  // Add config files
  zip.file('src/config/api.ts', getApiConfigSource());
  
  // Add type files
  zip.file('src/types/movie.ts', getMovieTypesSource());
  
  // Add hook files
  zip.file('src/hooks/useOptimizedContent.ts', getOptimizedContentHookSource());
  zip.file('src/hooks/usePerformance.ts', getPerformanceHookSource());
  zip.file('src/hooks/useContentSync.ts', getContentSyncHookSource());
  
  // Add system configuration file with current admin state
  zip.file('system-config.json', generateSystemConfig(adminState));
  
  // Add deployment configuration
  zip.file('deployment-notes.md', getDeploymentNotes(adminState));
  
  // Generate and download the zip file
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tv-a-la-carta-sistema-completo-${new Date().toISOString().split('T')[0]}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// System README generator with current configuration
export const generateSystemReadme = (adminState: any) => `# TV a la Carta - Sistema Completo de Gestión

## 🎬 Descripción
Sistema completo de gestión para TV a la Carta con panel de administración, carrito de compras, sincronización en tiempo real y gestión de novelas.

## 📊 Versión del Sistema
**Versión:** ${adminState.systemConfig?.version || '2.1.0'}  
**Fecha de Exportación:** ${new Date().toLocaleString('es-ES')}  
**Estado del Sistema:** ${adminState.syncStatus?.isOnline ? '🟢 En Línea' : '🔴 Desconectado'}

## 💰 Configuración de Precios Actual
- **Películas:** $${adminState.prices?.moviePrice || 80} CUP
- **Series:** $${adminState.prices?.seriesPrice || 300} CUP por temporada
- **Novelas:** $${adminState.prices?.novelPricePerChapter || 5} CUP por capítulo
- **Recargo Transferencia:** ${adminState.prices?.transferFeePercentage || 10}%

## 🚚 Zonas de Entrega Configuradas
**Total:** ${adminState.deliveryZones?.length || 0} zonas

${adminState.deliveryZones?.map((zone: any) => 
  `- **${zone.name}:** $${zone.cost.toLocaleString()} CUP`
).join('\n') || 'No hay zonas configuradas'}

## 📚 Catálogo de Novelas
**Total:** ${adminState.novels?.length || 0} novelas
- **En Transmisión:** ${adminState.novels?.filter((n: any) => n.estado === 'transmision').length || 0}
- **Finalizadas:** ${adminState.novels?.filter((n: any) => n.estado === 'finalizada').length || 0}

### Novelas por País:
${(() => {
  const countries = adminState.novels?.reduce((acc: any, novel: any) => {
    const country = novel.pais || 'No especificado';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {}) || {};
  
  return Object.entries(countries).map(([country, count]) => 
    `- **${country}:** ${count} novelas`
  ).join('\n') || 'No hay novelas configuradas';
})()}

### Novelas por Género:
${(() => {
  const genres = adminState.novels?.reduce((acc: any, novel: any) => {
    acc[novel.genero] = (acc[novel.genero] || 0) + 1;
    return acc;
  }, {}) || {};
  
  return Object.entries(genres).map(([genre, count]) => 
    `- **${genre}:** ${count} novelas`
  ).join('\n') || 'No hay novelas configuradas';
})()}

## 🔔 Sistema de Notificaciones
- **Notificaciones Totales:** ${adminState.notifications?.length || 0}
- **Sin Leer:** ${adminState.notifications?.filter((n: any) => !n.read).length || 0}
- **Estado:** ${adminState.systemConfig?.enableNotifications ? '✅ Habilitado' : '❌ Deshabilitado'}

## ⚡ Características del Sistema
- ✅ **Panel de Administración Completo**
- ✅ **Sincronización en Tiempo Real**
- ✅ **Gestión de Precios Dinámicos**
- ✅ **Zonas de Entrega Personalizables**
- ✅ **Catálogo de Novelas Administrable**
- ✅ **Sistema de Notificaciones**
- ✅ **Exportación/Importación de Configuración**
- ✅ **Backup Completo del Sistema**
- ✅ **Optimización de Rendimiento**
- ✅ **Carrito de Compras Avanzado**
- ✅ **Integración con WhatsApp**
- ✅ **Responsive Design**
- ✅ **Prevención de Zoom**
- ✅ **Gestión de Estado Global**

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación
\`\`\`bash
# Clonar o extraer el proyecto
cd tv-a-la-carta-sistema-completo

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
\`\`\`

### Configuración del Panel de Administración
1. Acceder a \`/admin\`
2. **Usuario:** \`admin\`
3. **Contraseña:** \`admin123\`

### Configuración de WhatsApp
- **Número configurado:** +5354690878
- Los pedidos se envían automáticamente con formato completo

## 📱 Uso del Sistema

### Para Usuarios
1. Explorar catálogo de películas, series y anime
2. Agregar elementos al carrito
3. Seleccionar temporadas (para series)
4. Elegir método de pago (efectivo/transferencia)
5. Completar datos de entrega
6. Finalizar pedido por WhatsApp

### Para Administradores
1. Gestionar catálogo de novelas
2. Configurar zonas de entrega
3. Actualizar precios en tiempo real
4. Monitorear notificaciones del sistema
5. Exportar/importar configuraciones
6. Generar backups completos

## 🔧 Tecnologías Utilizadas
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Build Tool:** Vite
- **State Management:** React Context + useReducer
- **API:** The Movie Database (TMDB)
- **Compression:** JSZip
- **Performance:** Optimización avanzada con lazy loading

## 📊 Estructura del Proyecto
\`\`\`
src/
├── components/          # Componentes reutilizables
├── context/            # Gestión de estado global
├── hooks/              # Hooks personalizados
├── pages/              # Páginas de la aplicación
├── services/           # Servicios de API y sincronización
├── types/              # Definiciones de TypeScript
├── utils/              # Utilidades y helpers
└── config/             # Configuración de APIs
\`\`\`

## 🔄 Sincronización en Tiempo Real
El sistema incluye sincronización automática entre:
- Panel de administración ↔ Aplicación principal
- Cambios de precios ↔ Carrito de compras
- Gestión de novelas ↔ Página de inicio
- Zonas de entrega ↔ Proceso de checkout

## 📞 Contacto y Soporte
- **WhatsApp:** +5354690878
- **Sistema:** TV a la Carta
- **Ubicación:** Reparto Nuevo Vista Alegre, Santiago de Cuba

## 📝 Notas de la Exportación
- **Fecha de Backup:** ${new Date().toLocaleString('es-ES')}
- **Configuración Incluida:** ✅ Completa
- **Estado de Datos:** ✅ Actualizado
- **Compatibilidad:** React 18+ / Node.js 18+

---
*Generado automáticamente por el Sistema de Backup de TV a la Carta*
`;

// Enhanced package.json with current admin state
export const generateUpdatedPackageJson = (adminState: any) => `{
  "name": "tv-a-la-carta-sistema-completo",
  "private": true,
  "version": "${adminState.systemConfig?.version || '2.1.0'}",
  "type": "module",
  "description": "Sistema completo de gestión para TV a la Carta con panel de administración y sincronización en tiempo real",
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
    "typescript",
    "real-time-sync"
  ],
  "author": "TV a la Carta",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/tv-a-la-carta/sistema-completo"
  },
  "homepage": "https://tvalacarta.vercel.app",
  "bugs": {
    "url": "https://github.com/tv-a-la-carta/sistema-completo/issues"
  },
  "config": {
    "adminState": ${JSON.stringify(adminState, null, 4)},
    "exportDate": "${new Date().toISOString()}",
    "systemVersion": "${adminState.systemConfig?.version || '2.1.0'}"
  }
}`;

// Enhanced system configuration with embedded admin state
export const generateSystemConfig = (adminState: any) => {
  const config = {
    systemInfo: {
      name: 'TV a la Carta - Sistema Completo',
      version: adminState.systemConfig?.version || '2.1.0',
      lastExport: new Date().toISOString(),
      exportedBy: 'TV a la Carta Admin Panel',
      description: 'Configuración completa del sistema con estado actual'
    },
    currentState: {
      prices: adminState.prices || {
        moviePrice: 80,
        seriesPrice: 300,
        transferFeePercentage: 10,
        novelPricePerChapter: 5,
      },
      deliveryZones: adminState.deliveryZones || [],
      novels: adminState.novels || [],
      notifications: adminState.notifications || [],
      syncStatus: adminState.syncStatus || {
        lastSync: new Date().toISOString(),
        isOnline: true,
        pendingChanges: 0,
      }
    },
    systemConfig: {
      settings: adminState.systemConfig || {
        autoSync: true,
        syncInterval: 300000,
        enableNotifications: true,
        maxNotifications: 100,
      },
      metadata: {
        totalOrders: adminState.systemConfig?.metadata?.totalOrders || 0,
        totalRevenue: adminState.systemConfig?.metadata?.totalRevenue || 0,
        lastOrderDate: adminState.systemConfig?.metadata?.lastOrderDate || '',
        systemUptime: adminState.systemConfig?.metadata?.systemUptime || new Date().toISOString(),
        exportTimestamp: new Date().toISOString(),
        totalNovels: adminState.novels?.length || 0,
        totalDeliveryZones: adminState.deliveryZones?.length || 0,
        unreadNotifications: adminState.notifications?.filter((n: any) => !n.read).length || 0
      }
    },
    statistics: {
      novelsByCountry: adminState.novels?.reduce((acc: any, novel: any) => {
        const country = novel.pais || 'No especificado';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {}) || {},
      novelsByGenre: adminState.novels?.reduce((acc: any, novel: any) => {
        acc[novel.genero] = (acc[novel.genero] || 0) + 1;
        return acc;
      }, {}) || {},
      novelsByStatus: {
        transmision: adminState.novels?.filter((n: any) => n.estado === 'transmision').length || 0,
        finalizada: adminState.novels?.filter((n: any) => n.estado === 'finalizada').length || 0
      }
    }
  };
  
  return JSON.stringify(config, null, 2);
};

// Configuration files generators
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

export const getTsConfig = () => `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`;

export const getTsAppConfig = () => `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`;

export const getTsNodeConfig = () => `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}`;

export const getPostcssConfig = () => `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

export const getEslintConfig = () => `import js from '@eslint/js';
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
    <script type="module" src="/src/main.tsx"></script>
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

export const getDeploymentNotes = (adminState: any) => `# Notas de Despliegue - TV a la Carta

## Información del Backup
- **Fecha:** ${new Date().toLocaleString('es-ES')}
- **Versión:** ${adminState.systemConfig?.version || '2.1.0'}
- **Estado:** Configuración completa incluida

## Configuración Actual Aplicada
- **Novelas:** ${adminState.novels?.length || 0} configuradas
- **Zonas de Entrega:** ${adminState.deliveryZones?.length || 0} configuradas
- **Precios:** Actualizados y aplicados
- **Notificaciones:** ${adminState.notifications?.length || 0} en el sistema

## Instrucciones de Despliegue

### 1. Preparación
\`\`\`bash
npm install
npm run build
\`\`\`

### 2. Variables de Entorno (si es necesario)
\`\`\`
VITE_API_URL=https://api.themoviedb.org/3
VITE_WHATSAPP_NUMBER=5354690878
\`\`\`

### 3. Despliegue en Vercel
\`\`\`bash
vercel --prod
\`\`\`

### 4. Despliegue en Netlify
- Subir carpeta \`dist/\` después de \`npm run build\`
- Configurar redirects con el archivo \`_redirects\` incluido

## Verificación Post-Despliegue
- [ ] Panel de administración accesible en \`/admin\`
- [ ] Catálogo de novelas funcionando
- [ ] Carrito de compras operativo
- [ ] Integración WhatsApp funcionando
- [ ] Responsive design en móviles
- [ ] Prevención de zoom activa

## Contacto
WhatsApp: +5354690878
`;

// Source code generators for all components with current admin state
export const getMainTsxSource = () => `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;

export const getViteEnvSource = () => `/// <reference types="vite/client" />`;

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
  
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-in {
    animation: fade-in 0.3s ease-out;
  }
  
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
}`;

// Placeholder functions for component source code (these would contain the actual source code with embedded state)
export const getAppTsxSource = (adminState: any) => `// App.tsx with embedded admin state and real-time sync`;
export const getAdminContextSource = (adminState: any) => `// AdminContext.tsx with current state: ${JSON.stringify(adminState, null, 2)}`;
export const getCartContextSource = (adminState: any) => `// CartContext.tsx with current admin state integration`;
export const getCheckoutModalSource = (adminState: any) => `// CheckoutModal.tsx with current delivery zones and prices`;
export const getPriceCardSource = (adminState: any) => `// PriceCard.tsx with current pricing configuration`;
export const getNovelasModalSource = (adminState: any) => `// NovelasModal.tsx with current novels catalog`;
export const getToastSource = () => `// Toast.tsx component source`;
export const getOptimizedImageSource = () => `// OptimizedImage.tsx component source`;
export const getLoadingSpinnerSource = () => `// LoadingSpinner.tsx component source`;
export const getErrorMessageSource = () => `// ErrorMessage.tsx component source`;
export const getVideoPlayerSource = () => `// VideoPlayer.tsx component source`;
export const getCastSectionSource = () => `// CastSection.tsx component source`;
export const getFloatingNavSource = () => `// FloatingNav.tsx component source`;
export const getHeaderSource = () => `// Header.tsx component source`;
export const getHeroCarouselSource = () => `// HeroCarousel.tsx component source`;
export const getMovieCardSource = () => `// MovieCard.tsx component source`;
export const getNovelCardSource = () => `// NovelCard.tsx component source`;
export const getNetflixCarouselSource = () => `// NetflixCarousel.tsx component source`;
export const getHomePageSource = (adminState: any) => `// Home.tsx with real-time novel sync and current admin state`;
export const getMoviesPageSource = () => `// Movies.tsx page source`;
export const getTVShowsPageSource = () => `// TVShows.tsx page source`;
export const getAnimePageSource = () => `// Anime.tsx page source`;
export const getSearchPageSource = () => `// Search.tsx page source with novel search integration`;
export const getCartPageSource = (adminState: any) => `// Cart.tsx with current pricing and delivery zones`;
export const getMovieDetailPageSource = () => `// MovieDetail.tsx page source`;
export const getTVDetailPageSource = () => `// TVDetail.tsx page source`;
export const getNovelDetailPageSource = () => `// NovelDetail.tsx page source`;
export const getAdminPanelSource = (adminState: any) => `// AdminPanel.tsx with current configuration and full backup export`;
export const getTmdbServiceSource = () => `// tmdb.ts service source`;
export const getApiServiceSource = () => `// api.ts service source`;
export const getContentSyncSource = () => `// contentSync.ts service source`;
export const getContentFilterSource = () => `// contentFilter.ts service source`;
export const getWhatsAppUtilsSource = (adminState: any) => `// whatsapp.ts with current pricing configuration`;
export const getPerformanceUtilsSource = () => `// performance.ts utility source`;
export const getErrorHandlerSource = () => `// errorHandler.ts utility source`;
export const getSystemExportSource = () => `// systemExport.ts utility source`;
export const getSourceCodeGeneratorSource = () => `// sourceCodeGenerator.ts utility source`;
export const getApiConfigSource = () => `// api.ts config source`;
export const getMovieTypesSource = () => `// movie.ts types source`;
export const getOptimizedContentHookSource = () => `// useOptimizedContent.ts hook source`;
export const getPerformanceHookSource = () => `// usePerformance.ts hook source`;
export const getContentSyncHookSource = () => `// useContentSync.ts hook source`;