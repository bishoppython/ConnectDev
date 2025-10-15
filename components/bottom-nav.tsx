"use client"

import { usePathname, useRouter } from "next/navigation"
import { Flame, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { icon: Flame, label: "Descobrir", path: "/discover" },
    { icon: MessageCircle, label: "Matches", path: "/matches" },
    { icon: User, label: "Perfil", path: "/profile" },
  ]

  return (
    <nav className="border-t bg-white">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 transition-colors",
                isActive ? "text-pink-500" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
