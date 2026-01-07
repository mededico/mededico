import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App.jsx'
import '@/styles/index.css'
import { ThemeProvider } from '@/contexts/theme-context.jsx'
import { AppWrapper } from '@/app/AppWrapper'
import { AppointmentsProvider } from '@/contexts/AppointmentsContext.jsx'
import { ServicesProvider } from '@/contexts/ServicesContext.jsx'
import { PetsProvider } from '@/contexts/PetsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppWrapper>
        <AppointmentsProvider>
          <ServicesProvider>
            <PetsProvider>
              <App />
            </PetsProvider>
          </ServicesProvider>
        </AppointmentsProvider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
)
