import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Breathwork Exercise - Daily 1 Percent",
  description: "Guided box breathing exercise for mental focus and relaxation",
}

export default function BreathworkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-[#1E1E1E]">{children}</div>
}
