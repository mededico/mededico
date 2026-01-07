import { Link, useNavigate } from 'react-router-dom'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/header/mode-toggle.jsx'
import { useAuth } from '@/hooks/useAuth'
import { RegisterForm } from '@/components/auth/RegisterForm.jsx'

export function Register() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) navigate('/')

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

      <Card className="mx-auto w-full max-w-md">
        <Link to="/" className="flex items-center justify-center">
          <img src={VetsyncLogo} className="w-14 md:w-20" alt="Vetsync Logo" />
        </Link>

        <CardHeader>
          <CardTitle className="text-center uppercase font-bold">Crea una cuenta</CardTitle>
          <CardDescription className="text-center">Regístrate para ser parte de Vetsync</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}
