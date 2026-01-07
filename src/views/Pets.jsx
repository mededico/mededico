import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoPets } from '@/components/pets/NoPets'
import { PetsSkeleton } from '@/components/loaders/PetsSkeleton.jsx'
import { ErrorCard } from '@/components/ErrorCard'
import { PetsCard } from '@/components/pets/card/PetsCard'
import { Button } from '@/components/ui/button'
import { HeartPlus } from 'lucide-react'
import { PetsForm } from '@/components/pets/form/PetsForm'
import { usePets } from '@/hooks/usePets'

export function Pets() {
  const { pets, loading, error, noPets, openAddForm, initializePets } = usePets()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && !loading) {
      initializePets()
    }
  }, [isAuthenticated, loading, initializePets])

  const renderContent = () => {
    if (!isAuthenticated) {
      return <AuthPrompt icon="🐾" message="Debes iniciar sesión para ver tus mascotas" />
    }

    if (loading) {
      return <PetsSkeleton />
    }

    if (error) {
      return <ErrorCard message="No se pudieron cargar tus mascotas. Inténtalo de nuevo." />
    }

    if (noPets) return <NoPets />

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {pets.map((pet) => (
          <PetsCard key={pet.id} pet={pet} />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end mb-4 md:mb-8">
          <section className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mis Mascotas</h1>
            <p className="text-muted-foreground">Gestiona la información de todas tus mascotas</p>
          </section>
          <section className="w-full md:w-1/2 md:flex md:justify-end">
            {isAuthenticated && (
              <Button className="w-full md:w-auto" onClick={openAddForm}>
                Agregar Mascota
                <HeartPlus className="h-4 w-4" />
              </Button>
            )}
          </section>
        </div>
        {renderContent()}
        <PetsForm />
      </div>
    </div>
  )
}
