"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Heart, Users, Briefcase, Sparkles } from "lucide-react"

export default function LandingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      // Check if profile is complete
      if (user.name && user.photos.length > 0) {
        router.push("/discover")
      } else {
        router.push("/onboarding")
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-orange-50 px-4 py-12">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-pink-500" />
            <span className="text-sm font-medium text-foreground">Conexões que importam</span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Encontre pessoas para{" "}
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              qualquer objetivo
            </span>
          </h1>

          <p className="mb-12 text-pretty text-lg text-muted-foreground sm:text-xl">
            Networking profissional, novas amizades, parcerias de negócios ou relacionamentos. Tudo em um só lugar.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-lg font-semibold text-white hover:from-pink-600 hover:to-orange-600"
              onClick={() => router.push("/auth")}
            >
              Começar agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg font-semibold bg-transparent"
              onClick={() => router.push("/auth")}
            >
              Fazer login
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Conexões para todos os momentos</h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Relacionamentos</h3>
              <p className="text-sm text-muted-foreground">
                Encontre pessoas especiais para namoro e relacionamentos sérios
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Amizades</h3>
              <p className="text-sm text-muted-foreground">Conheça novas pessoas e expanda seu círculo social</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Briefcase className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Networking</h3>
              <p className="text-sm text-muted-foreground">Conecte-se com profissionais e expanda sua rede</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Sparkles className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Parcerias</h3>
              <p className="text-sm text-muted-foreground">
                Encontre co-founders, investidores e parceiros de negócios
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
