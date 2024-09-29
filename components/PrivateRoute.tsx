import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from '@supabase/auth-helpers-react'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (session === null && router.pathname !== '/auth') {
      router.push('/auth')
    }
  }, [session, router])

  if (session === undefined) {
    return null // ou um componente de loading
  }

  // Se estiver na página de autenticação e não houver sessão, renderize normalmente
  if (router.pathname === '/auth' && !session) {
    return <>{children}</>
  }

  // Para outras páginas, só renderize se houver uma sessão
  return session ? <>{children}</> : null
}

export default PrivateRoute