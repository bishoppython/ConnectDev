"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useMatches } from "@/lib/matches-context"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Heart } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function MatchesPage() {
  const { user, isLoading } = useAuth()
  const { matches } = useMatches()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 px-4 py-3 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-foreground">Matches</h1>
        <p className="text-sm text-muted-foreground">{matches.length} conexões</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {matches.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Nenhum match ainda</h2>
            <p className="text-muted-foreground">Continue explorando perfis para encontrar suas primeiras conexões!</p>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-3">
            {matches.map((match) => {
              const profile = match.profile
              if (!profile) return null

              return (
                <Card
                  key={match.id}
                  className="cursor-pointer transition-all hover:shadow-md"
                  onClick={() => router.push(`/chat/${profile.id}`)}
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Profile Image */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                      <img
                        src={profile.photos[0] || "/placeholder.svg?height=64&width=64"}
                        alt={profile.name}
                        className="h-full w-full object-cover"
                      />
                      {match.last_message_at && (
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 overflow-hidden">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="truncate font-semibold text-foreground">
                          {profile.name}
                          {profile.age && <span className="ml-1 font-normal text-muted-foreground">{profile.age}</span>}
                        </h3>
                      </div>

                      {profile.occupation && (
                        <p className="mb-2 truncate text-sm text-muted-foreground">
                          {profile.occupation}
                          {profile.company && ` @ ${profile.company}`}
                        </p>
                      )}

                      {/* Connection Types */}
                      <div className="flex flex-wrap gap-1">
                        {profile.connection_types.slice(0, 3).map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type === "friendship" && "Amizade"}
                            {type === "networking" && "Networking"}
                            {type === "dating" && "Namoro"}
                            {type === "business" && "Negócios"}
                            {type === "creative" && "Criativo"}
                            {type === "sports" && "Esportes"}
                            {type === "learning" && "Aprendizado"}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Icon */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                        <MessageCircle className="h-5 w-5 text-pink-500" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(match.created_at), {
                          addSuffix: false,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
