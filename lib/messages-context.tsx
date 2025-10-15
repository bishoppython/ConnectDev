"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Message } from "./types"

interface MessagesContextType {
  getMessages: (matchId: string) => Message[]
  sendMessage: (matchId: string, senderId: string, content: string) => void
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [allMessages, setAllMessages] = useState<Record<string, Message[]>>({})

  useEffect(() => {
    // Load messages from localStorage
    const storedMessages = localStorage.getItem("messages")
    if (storedMessages) {
      setAllMessages(JSON.parse(storedMessages))
    } else {
      // Initialize with some mock messages
      const mockMessages: Record<string, Message[]> = {
        "1": [
          {
            id: "msg-1",
            match_id: "match-1",
            sender_id: "1",
            content: "Oi! Vi que você também trabalha com tecnologia. Que legal!",
            read: true,
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "msg-2",
            match_id: "match-1",
            sender_id: "current-user",
            content: "Oi Ana! Sim, adoro desenvolvimento. Vi que você trabalha com React também!",
            read: true,
            created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "msg-3",
            match_id: "match-1",
            sender_id: "1",
            content:
              "Exatamente! Estou sempre procurando pessoas para trocar ideias sobre projetos. Você está trabalhando em algo interessante?",
            read: true,
            created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          },
        ],
      }
      setAllMessages(mockMessages)
      localStorage.setItem("messages", JSON.stringify(mockMessages))
    }
  }, [])

  const getMessages = (matchId: string): Message[] => {
    return allMessages[matchId] || []
  }

  const sendMessage = (matchId: string, senderId: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      match_id: matchId,
      sender_id: senderId,
      content,
      read: false,
      created_at: new Date().toISOString(),
    }

    const updatedMessages = {
      ...allMessages,
      [matchId]: [...(allMessages[matchId] || []), newMessage],
    }

    setAllMessages(updatedMessages)
    localStorage.setItem("messages", JSON.stringify(updatedMessages))
  }

  return <MessagesContext.Provider value={{ getMessages, sendMessage }}>{children}</MessagesContext.Provider>
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider")
  }
  return context
}
