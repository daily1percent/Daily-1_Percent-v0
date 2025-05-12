"use client"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function GetReadyPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      router.push("/breathwork/exercise")
    }
  }, [countdown, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <Logo className="mb-8 scale-75" />

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Get Ready</h1>
        <p className="text-muted-foreground">Find a comfortable position and prepare to begin</p>
      </div>

      <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-8">
        <span className="text-4xl font-bold">{countdown}</span>
      </div>

      <p className="text-sm text-muted-foreground text-center">Starting in {countdown} seconds...</p>
    </div>
  )
}
