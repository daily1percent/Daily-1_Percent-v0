"use client"

import { useState, useEffect } from "react"

interface GetReadyScreenProps {
  onComplete: () => void
}

export default function GetReadyScreen({ onComplete }: GetReadyScreenProps) {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1)
      } else {
        onComplete()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, onComplete])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-5 py-6">
      <h2 className="text-2xl font-medium text-center mb-8">Get Ready</h2>

      <div className="relative mb-8">
        <div className="w-48 h-48 rounded-full bg-[#A020F0] flex items-center justify-center">
          <div className="text-5xl font-bold text-white">{countdown}</div>
        </div>
      </div>

      <p className="text-gray-300 text-center">Find a comfortable position and prepare to begin...</p>
    </div>
  )
}
