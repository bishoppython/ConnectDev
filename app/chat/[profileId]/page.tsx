"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useMessages } from "@/lib/messages-context"
import { mockProfiles } from "@/lib/mock-data"
import type { Profile } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send, MoreVertical, Info } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function ChatPage() {
  const { user, isLoading } = useAuth()
  const { getMessages, sendMessage } = useMessages()
  const router = useRouter()
  const params = useParams()
  const profileId = params.profileId as string

  const [profile, setProfile] = useState<Profile | null>(null)
  const [messages, setMessages] = useState<ReturnType<typeof getMessages>>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    // Find the profile
    const foundProfile = mockProfiles.find((p) => p.id === profileId)
    setProfile(foundProfile || null)

    // Load messages
    if (foundProfile) {
      setMessages(getMessages(profileId))
    }
  }, [profileId, getMessages])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !user || !profile) return

    sendMessage(profileId, user.id, newMessage.trim())
    setMessages(getMessages(profileId))
    setNewMessage("")
  }

  if (isLoading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center gap-3 border-b bg-white px-4 py-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10">
          <AvatarImage src={profile.photos[0] || "/placeholder.svg"} alt={profile.name} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="font-semibold text-foreground">{profile.name}</h2>
          <p className="text-xs text-muted-foreground">
            {profile.occupation}
            {profile.company && ` @ ${profile.company}`}
          </p>
        </div>

        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-pink-50/30 via-white to-orange-50/30 p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.photos[0] || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">Você deu match com {profile.name}!</h3>
                <p className="text-sm text-muted-foreground">Envie uma mensagem para começar a conversa</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => {
              const isCurrentUser = message.sender_id === user?.id || message.sender_id === "current-user"
              const showTimestamp =
                index === 0 ||
                new Date(message.created_at).getTime() - new Date(messages[index - 1].created_at).getTime() >
                  5 * 60 * 1000

              return (
                <div key={message.id}>
                  {showTimestamp && (
                    <div className="mb-2 text-center text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.created_at), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </div>
                  )}
                  <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                          : "bg-gray-100 text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="mx-auto flex max-w-3xl gap-2">
          <Input
            placeholder="Enviar mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
