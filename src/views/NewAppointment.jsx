import { FormContent } from '@/components/appointments/form/FormContent'

export function NewAppointment() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end mb-4 md:mb-8">
          <section className="mb-6 md:mb-2">
            <h1 className="text-3xl font-bold text-foreground mb-2">Agendar cita</h1>
            <p className="text-muted-foreground">
              Llena la información del formulario para agendar una cita para tu mascota.
            </p>
          </section>
        </div>
        <FormContent />
      </div>
    </div>
  )
}
