"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

interface CompletedScreenProps {
  nextModule: string
  nextRoute: string
}

export default function CompletedScreen({ nextModule, nextRoute }: CompletedScreenProps) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-132px)] px-5 py-6">
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-[#00C853] flex items-center justify-center">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">Breathwork Complete</h2>
      <p className="text-gray-300 text-center mb-8 max-w-md">
        Great job! Moving to {nextModule} in {countdown}...
      </p>
    </div>
  )
}
