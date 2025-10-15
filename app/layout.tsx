import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { MatchesProvider } from "@/lib/matches-context"
import { MessagesProvider } from "@/lib/messages-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Connect - Encontre Conexões Significativas",
  description: "Networking, amizades, parcerias e muito mais",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <MatchesProvider>
              <MessagesProvider>{children}</MessagesProvider>
            </MatchesProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
