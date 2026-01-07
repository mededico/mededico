import { useEffect } from 'react'
import { useServices } from '@/hooks/useServices.js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ServicesCard } from '@/components/Services/ServicesCard'
import { ServicesSkeleton } from '@/components/loaders/ServicesSkeleton.jsx'
import { ErrorCard } from '@/components/ErrorCard'
import { AppointmentsForm } from '@/components/appointments/form/FormDialog'
import { filterServicesByCategory } from '@/lib/utils'

export function Services() {
  const { services, loading, error, initializeServices } = useServices()

  useEffect(() => {
    if (!loading) {
      initializeServices()
    }
  }, [loading, initializeServices])

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="Veterinaria" className="w-full gap-3 md:gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-2 md:mb-2.5 lg:mb-5">
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold text-foreground mb-2">Nuestros Servicios</h1>
              <p className="text-muted-foreground">Servicios veterinarios completos para el cuidado de tu mascota</p>
            </div>

            <div className="lg:w-1/2">
              <TabsList className="w-full">
                <TabsTrigger value="Veterinaria" className="hover:cursor-pointer w-1/2" disabled={loading || error}>
                  Veterinaria
                </TabsTrigger>
                <TabsTrigger value="Estética" className="hover:cursor-pointer w-1/2" disabled={loading || error}>
                  Estética
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Mostrar loader si está cargando */}
          {loading && (
            <div>
              <ServicesSkeleton />
            </div>
          )}

          {/* Mostrar error si hay un error */}
          {error && (
            <div className="my-8">
              <ErrorCard
                title="Error al cargar los servicios"
                message={
                  error.message ||
                  'Ocurrió un error al intentar cargar los servicios. Por favor, inténtalo de nuevo más tarde.'
                }
              />
            </div>
          )}

          {/* Mostrar contenido solo si no hay loading ni error */}
          {!loading && !error && (
            <>
              <TabsContent value="Veterinaria" className="w-full">
                {filterServicesByCategory(services, 'Veterinaria').length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {filterServicesByCategory(services, 'Veterinaria').map((service, index) => (
                      <ServicesCard key={index} service={service} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No hay servicios de veterinaria disponibles en este momento.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="Estética" className="w-full">
                {filterServicesByCategory(services, 'Estética').length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {filterServicesByCategory(services, 'Estética').map((service, index) => (
                      <ServicesCard key={index} service={service} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No hay servicios de estética disponibles en este momento.
                  </p>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
        <AppointmentsForm />
      </div>
    </div>
  )
}
