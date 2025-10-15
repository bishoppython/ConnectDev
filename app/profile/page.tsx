"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { LogOut, MapPin, Briefcase, Settings } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-foreground">Meu Perfil</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src={user.photos[0] || "/placeholder.svg?height=128&width=128"}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="mb-1 text-2xl font-bold text-foreground">
                  {user.name}
                  {user.age && <span className="ml-2 text-xl font-normal text-muted-foreground">{user.age}</span>}
                </h2>
                {user.occupation && (
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm">
                      {user.occupation}
                      {user.company && ` @ ${user.company}`}
                    </span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          {user.bio && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{user.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Connection Types */}
          {user.connection_types.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Buscando</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.connection_types.map((type) => (
                    <Badge key={type} className="bg-gradient-to-r from-pink-500 to-orange-500">
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
              </CardContent>
            </Card>
          )}

          {/* Interests */}
          {user.interests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Interesses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {user.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Logout Button */}
          <Button
            variant="outline"
            className="w-full bg-transparent text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
