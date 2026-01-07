import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ModeToggle } from '@/components/header/mode-toggle.jsx'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { LoginForm } from '@/components/auth/LoginForm.jsx'

export function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/')
    }
  }, [loading, isAuthenticated, navigate])

  return (
    <div className="relative flex min-h-screen w-full max-w-[1400px] flex-col items-center justify-start gap-4 p-4 pt-20 md:justify-center md:pt-4">
      <Link to="/" className="absolute left-4 top-4">
        <Button className="hover:cursor-pointer" variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </Link>

      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <Card className="mx-auto w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center">
          <img src={VetsyncLogo} className="w-14 md:w-20" alt="Vetsync Logo" />
        </Link>

        <CardHeader>
          <CardTitle className="text-center uppercase font-bold">Bienvenido de vuelta</CardTitle>
          <CardDescription className="text-center">Inicia sesión en tu cuenta de Vetsync</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
