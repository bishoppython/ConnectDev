"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Match, Profile } from "./types"
import { mockProfiles } from "./mock-data"
import { useAuth } from "./auth-context"

interface MatchesContextType {
  matches: Match[]
  addMatch: (profile: Profile) => void
  newMatch: Profile | null
  clearNewMatch: () => void
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined)

export function MatchesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [newMatch, setNewMatch] = useState<Profile | null>(null)

  useEffect(() => {
    // Load matches from localStorage
    const storedMatches = localStorage.getItem("matches")
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches))
    } else {
      // Initialize with some mock matches for demo
      const initialMatches: Match[] = [
        {
          id: "match-1",
          profile1_id: user?.id || "current-user",
          profile2_id: mockProfiles[0].id,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          last_message_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          profile: mockProfiles[0],
        },
        {
          id: "match-2",
          profile1_id: user?.id || "current-user",
          profile2_id: mockProfiles[1].id,
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          profile: mockProfiles[1],
        },
      ]
      setMatches(initialMatches)
      localStorage.setItem("matches", JSON.stringify(initialMatches))
    }
  }, [user])

  const addMatch = (profile: Profile) => {
    const newMatchData: Match = {
      id: `match-${Date.now()}`,
      profile1_id: user?.id || "current-user",
      profile2_id: profile.id,
      created_at: new Date().toISOString(),
      profile,
    }

    const updatedMatches = [newMatchData, ...matches]
    setMatches(updatedMatches)
    localStorage.setItem("matches", JSON.stringify(updatedMatches))

    // Show match modal
    setNewMatch(profile)
  }

  const clearNewMatch = () => {
    setNewMatch(null)
  }

  return (
    <MatchesContext.Provider value={{ matches, addMatch, newMatch, clearNewMatch }}>{children}</MatchesContext.Provider>
  )
}

export function useMatches() {
  const context = useContext(MatchesContext)
  if (context === undefined) {
    throw new Error("useMatches must be used within a MatchesProvider")
  }
  return context
}
