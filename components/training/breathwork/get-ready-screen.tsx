"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"

interface GetReadyScreenProps {
  onComplete: () => void
  onBack: () => void
  onSkip: () => void
  onRestart: () => void
}

export default function GetReadyScreen({ onComplete, onBack, onSkip, onRestart }: GetReadyScreenProps) {
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
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-132px)] px-5 py-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-[#FF9100] flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="text-lg font-medium">Get</div>
            <div className="text-lg font-medium">Ready</div>
          </div>
        </div>

        <div className="text-center text-xl font-bold">{countdown}</div>
      </div>

      <div className="w-full space-y-3 mb-4">
        <button className="w-full py-3 px-4 rounded-full bg-[#2A2A2A] text-white font-medium" disabled>
          Pause
        </button>

        <div className="flex justify-between gap-3">
          <button
            className="flex-1 py-2 px-4 rounded-full bg-[#2A2A2A] text-white text-sm font-medium flex items-center justify-center"
            onClick={onBack}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>

          <button
            className="flex-1 py-2 px-4 rounded-full bg-[#2A2A2A] text-white text-sm font-medium flex items-center justify-center"
            onClick={onSkip}
          >
            Skip <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <button onClick={onRestart} className="w-full text-sm text-gray-400 py-2 flex items-center justify-center">
          <RefreshCw className="w-3 h-3 mr-1" /> Restart Session
        </button>
      </div>
    </div>
  )
}
