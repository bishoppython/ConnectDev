"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Profile } from "@/lib/types"
import { Heart, MessageCircle, X } from "lucide-react"
import { useEffect, useState } from "react"

interface MatchModalProps {
  profile: Profile
  onClose: () => void
}

export function MatchModal({ profile, onClose }: MatchModalProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleSendMessage = () => {
    onClose()
    router.push(`/chat/${profile.id}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div
        className={`relative w-full max-w-md transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <Card className="overflow-hidden">
          {/* Header with animation */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="animate-bounce">
                <Heart className="h-16 w-16 fill-white text-white" />
              </div>
            </div>
            <h2 className="mb-2 text-3xl font-bold text-white">É um Match!</h2>
            <p className="text-white/90">Você e {profile.name} deram like um no outro</p>
          </div>

          {/* Profile preview */}
          <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full">
                <img
                  src={profile.photos[0] || "/placeholder.svg?height=80&width=80"}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">
                  {profile.name}
                  {profile.age && <span className="ml-2 text-lg font-normal text-muted-foreground">{profile.age}</span>}
                </h3>
                {profile.occupation && (
                  <p className="text-sm text-muted-foreground">
                    {profile.occupation}
                    {profile.company && ` @ ${profile.company}`}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
                Continuar explorando
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                onClick={handleSendMessage}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Enviar mensagem
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
