import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SimpleAuthProvider } from "@/contexts/simple-auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Daily 1 Percent",
  description: "Mental resilience app for athletes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SimpleAuthProvider>
          <main className="flex min-h-screen flex-col items-center bg-[#1E1E1E]">
            <div className="w-full max-w-md mx-auto h-full">{children}</div>
          </main>
        </SimpleAuthProvider>
      </body>
    </html>
  )
}
