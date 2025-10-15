"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Profile } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Heart, Star, MapPin, Briefcase } from "lucide-react"

interface ProfileCardProps {
  profile: Profile
  onSwipe: (direction: "left" | "right" | "super") => void
  isActive: boolean
}

export function ProfileCard({ profile, onSwipe, isActive }: ProfileCardProps) {
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (clientX: number, clientY: number) => {
    if (!isActive) return
    setDragStart({ x: clientX, y: clientY })
    setIsDragging(true)
  }

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!dragStart || !isActive) return

    const deltaX = clientX - dragStart.x
    const deltaY = clientY - dragStart.y
    setDragOffset({ x: deltaX, y: deltaY })
  }

  const handleDragEnd = () => {
    if (!isActive) return

    const threshold = 100
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        onSwipe("right")
      } else {
        onSwipe("left")
      }
    }

    setDragStart(null)
    setDragOffset({ x: 0, y: 0 })
    setIsDragging(false)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragMove(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleDragMove(e.clientX, e.clientY)
      }

      const handleGlobalMouseUp = () => {
        handleDragEnd()
      }

      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
      }
    }
  }, [isDragging, dragStart])

  const rotation = dragOffset.x * 0.1
  const opacity = 1 - Math.abs(dragOffset.x) / 300

  return (
    <div className="relative">
      <Card
        ref={cardRef}
        className="relative h-[600px] w-full cursor-grab overflow-hidden active:cursor-grabbing"
        style={{
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
          opacity: isDragging ? opacity : 1,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe indicators */}
        {isDragging && (
          <>
            <div
              className="absolute left-8 top-8 z-10 rounded-lg border-4 border-green-500 bg-green-500/20 px-6 py-3 text-2xl font-bold text-green-500"
              style={{ opacity: Math.max(0, dragOffset.x / 100) }}
            >
              LIKE
            </div>
            <div
              className="absolute right-8 top-8 z-10 rounded-lg border-4 border-red-500 bg-red-500/20 px-6 py-3 text-2xl font-bold text-red-500"
              style={{ opacity: Math.max(0, -dragOffset.x / 100) }}
            >
              NOPE
            </div>
          </>
        )}

        {/* Profile Image */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <img
            src={profile.photos[0] || "/placeholder.svg?height=400&width=400"}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Name and Age */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="mb-1 text-3xl font-bold text-white">
              {profile.name}
              {profile.age && <span className="ml-2 text-2xl font-normal">{profile.age}</span>}
            </h2>
            {profile.occupation && (
              <div className="flex items-center gap-2 text-white/90">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">
                  {profile.occupation}
                  {profile.company && ` @ ${profile.company}`}
                </span>
              </div>
            )}
            {profile.location && (
              <div className="mt-1 flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-4">
          {profile.bio && <p className="mb-3 text-sm text-foreground">{profile.bio}</p>}

          {/* Connection Types */}
          {profile.connection_types.length > 0 && (
            <div className="mb-3">
              <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Buscando</p>
              <div className="flex flex-wrap gap-2">
                {profile.connection_types.map((type) => (
                  <Badge key={type} variant="secondary" className="capitalize">
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
          )}

          {/* Interests */}
          {profile.interests.length > 0 && (
            <div className="mb-3">
              <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Interesses</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.slice(0, 6).map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Skills</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-primary/5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Action Buttons */}
      {isActive && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="h-14 w-14 rounded-full border-2 border-red-500 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => onSwipe("left")}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-blue-500 bg-white text-blue-500 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => onSwipe("super")}
          >
            <Star className="h-7 w-7" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-14 w-14 rounded-full border-2 border-green-500 bg-white text-green-500 hover:bg-green-50 hover:text-green-600"
            onClick={() => onSwipe("right")}
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  )
}
