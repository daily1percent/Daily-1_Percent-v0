"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
  onBack: () => void
  onSkip: () => void
  onRestart: () => void
}

export default function WelcomeScreen({ onStart, onBack, onSkip, onRestart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-132px)] px-5 py-6">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome to
          <br />
          Breath work
        </h1>

        <p className="text-center mb-6 text-gray-200 text-sm">
          Box breathing helps you stay calm and focused under pressure. Inhale, hold, exhale, and repeat — just follow
          the circle. Let's build control, one breath at a time.
        </p>
      </div>

      <div className="w-full space-y-3 mb-4">
        <button onClick={onStart} className="w-full py-3 px-4 rounded-full bg-[#007BFF] text-white font-medium">
          Begin Breathing Exercise
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

        <button onClick={onRestart} className="w-full text-sm text-gray-400 py-2">
          Restart Session
        </button>
      </div>
    </div>
  )
}
