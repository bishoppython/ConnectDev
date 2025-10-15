"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Profile } from "./types"
import { mockProfiles } from "./mock-data"

interface AuthContextType {
  user: Profile | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: Partial<Profile>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call Supabase
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo, use first mock profile
    const mockUser = mockProfiles[0]
    setUser(mockUser)
    localStorage.setItem("currentUser", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const signup = async (email: string, password: string) => {
    // Mock signup - in production, this would call Supabase
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a new user profile (incomplete, will be filled in onboarding)
    const newUser: Profile = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: Math.random().toString(36).substr(2, 9),
      name: "",
      photos: [],
      interests: [],
      connection_types: [],
      skills: [],
      looking_for: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  const updateProfile = (profileData: Partial<Profile>) => {
    if (user) {
      const updatedUser = { ...user, ...profileData, updated_at: new Date().toISOString() }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
