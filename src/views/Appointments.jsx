import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AuthPrompt } from '@/components/AuthPrompt'
import { NoAppointments } from '@/components/appointments/NoAppointments'
import { useAppointments } from '@/hooks/useAppointments'
import { TableSkeleton } from '@/components/loaders/TableSkeleton'
import { ErrorCard } from '@/components/ErrorCard'
import { createColumns } from '@/components/appointments/table/columns'
import { DataTable } from '@/components/appointments/table/data-table'
import { AppointmentsForm } from '@/components/appointments/form/FormDialog'
import { Button } from '@/components/ui/button'
import { CalendarPlus } from 'lucide-react'
import { sortAppointments } from '@/lib/utils.js'

export function Appointments() {
  const { appointments, noAppointments, loading, error, initializeAppointments, cancelAppointment, openForm } =
    useAppointments()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && !loading) {
      initializeAppointments()
    }
  }, [isAuthenticated, loading, initializeAppointments])

  const renderContent = () => {
    if (!isAuthenticated) {
      return <AuthPrompt icon="📅" message="Debes iniciar sesión para agendar y ver tus citas" />
    }

    if (loading) {
      return <TableSkeleton />
    }

    if (error) {
      return <ErrorCard message="No se pudieron cargar tus citas. Inténtalo de nuevo." />
    }

    if (noAppointments) return <NoAppointments />

    const sortedAppointments = sortAppointments(appointments)
    const columns = createColumns(cancelAppointment)

    return (
      <DataTable
        columns={columns}
        data={sortedAppointments}
        cancelAppointment={cancelAppointment}
        openForm={openForm}
      />
    )
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-8">
          <section className="mb-6 md:mb-2">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mis Citas</h1>
            <p className="text-muted-foreground">
              Administra tus citas veterinarias de forma sencilla y eficiente en un solo lugar.
            </p>
          </section>
          {isAuthenticated && noAppointments && (
            <Button onClick={() => openForm()} className="flex items-center gap-2">
              Agendar Cita
              <CalendarPlus className="h-4 w-4" />
            </Button>
          )}
        </div>
        {renderContent()}
        <AppointmentsForm />
      </div>
    </div>
  )
}
