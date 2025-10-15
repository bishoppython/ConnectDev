"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useMatches } from "@/lib/matches-context"
import { mockProfiles } from "@/lib/mock-data"
import type { Profile } from "@/lib/types"
import { ProfileCard } from "@/components/profile-card"
import { BottomNav } from "@/components/bottom-nav"
import { FilterDialog } from "@/components/filter-dialog"
import { MatchModal } from "@/components/match-modal"
import type { ConnectionType } from "@/lib/types"
import { Sparkles } from "lucide-react"

export default function DiscoverPage() {
  const { user, isLoading } = useAuth()
  const { addMatch, newMatch, clearNewMatch } = useMatches()
  const router = useRouter()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipedProfiles, setSwipedProfiles] = useState<Set<string>>(new Set())
  const [filterTypes, setFilterTypes] = useState<ConnectionType[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    // Filter profiles based on selected connection types
    let filtered = mockProfiles.filter((p) => p.id !== user?.id && !swipedProfiles.has(p.id))

    if (filterTypes.length > 0) {
      filtered = filtered.filter((p) => p.connection_types.some((type) => filterTypes.includes(type)))
    }

    setProfiles(filtered)
    setCurrentIndex(0)
  }, [user, swipedProfiles, filterTypes])

  const handleSwipe = (direction: "left" | "right" | "super") => {
    if (currentIndex < profiles.length) {
      const currentProfile = profiles[currentIndex]
      setSwipedProfiles((prev) => new Set([...prev, currentProfile.id]))

      if ((direction === "right" || direction === "super") && Math.random() > 0.7) {
        addMatch(currentProfile)
      }

      console.log(`[v0] Swiped ${direction} on ${currentProfile.name}`)

      setCurrentIndex((prev) => prev + 1)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const currentProfile = profiles[currentIndex]
  const hasMoreProfiles = currentIndex < profiles.length

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-white to-orange-80">
    {/* <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-white to-orange-50"> */}

      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-foreground">Connect</h1>
        <FilterDialog selectedTypes={filterTypes} onTypesChange={setFilterTypes} />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        {hasMoreProfiles ? (
          <div className="relative w-full max-w-md">
            {/* Show next card in background for depth effect */}
            {currentIndex + 1 < profiles.length && (
              <div className="absolute inset-0 scale-95 opacity-50">
                <ProfileCard profile={profiles[currentIndex + 1]} onSwipe={() => {}} isActive={false} />
              </div>
            )}

            {/* Current card */}
            <ProfileCard profile={currentProfile} onSwipe={handleSwipe} isActive={true} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Sem mais perfis</h2>
            <p className="text-muted-foreground">
              Você viu todos os perfis disponíveis. Volte mais tarde para ver novos perfis!
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Match Modal */}
      {newMatch && <MatchModal profile={newMatch} onClose={clearNewMatch} />}
    </div>
  )
}
