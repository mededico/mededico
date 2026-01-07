import { Link } from 'react-router-dom'
import { Home, ArrowLeft, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
        <CardContent className="p-6 md:p-8 text-center space-y-6">
          {/* Icono y número 404 */}
          <div className="space-y-4">
            <MapPin className="h-12 w-12 md:h-14 md:w-14 text-primary animate-pulse mx-auto" />
            <div className="text-6xl md:text-7xl font-bold text-muted-foreground select-none">404</div>
          </div>

          {/* Título y descripción */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">¡Ups! Página no encontrada</h1>
            <p className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Parece que la página que buscas no existe.
            </p>
          </div>

          <Separator className="w-20 mx-auto" />

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Ir al inicio
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Página anterior
            </Button>
          </div>

          {/* Código de error decorativo */}
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground font-mono">ERROR_CODE: PAGE_NOT_FOUND_404</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
