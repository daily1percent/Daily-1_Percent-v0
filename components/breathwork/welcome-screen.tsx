"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
  onBack: () => void
  onSkip: () => void
}

export default function WelcomeScreen({ onStart, onBack, onSkip }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-80px)] px-5 py-6">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Box Breathing</h1>

        <p className="text-center mb-6 text-gray-200">
          Box breathing helps you stay calm and focused under pressure. Follow the circle through 4 rounds of breathing.
        </p>

        <div className="bg-[#2A2A2A] rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-2">How it works:</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="bg-[#00C853] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                1
              </span>
              <span>Inhale deeply for 5 seconds</span>
            </li>
            <li className="flex items-start">
              <span className="bg-[#A020F0] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                2
              </span>
              <span>Hold your breath for 5 seconds</span>
            </li>
            <li className="flex items-start">
              <span className="bg-[#FF9100] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                3
              </span>
              <span>Exhale completely for 5 seconds</span>
            </li>
            <li className="flex items-start">
              <span className="bg-[#A020F0] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                4
              </span>
              <span>Hold your breath for 5 seconds</span>
            </li>
          </ul>
        </div>

        <p className="text-center text-sm text-gray-400 mb-8">
          Find a quiet place where you won't be disturbed for the next few minutes.
        </p>
      </div>

      <div className="w-full space-y-3">
        <button onClick={onStart} className="w-full py-3 px-4 rounded-full bg-[#007BFF] text-white font-medium">
          Begin Breathing Exercise
        </button>

        <div className="flex justify-between gap-3">
          <button
            className="flex-1 py-2 px-4 rounded-full border border-gray-600 text-white text-sm font-medium flex items-center justify-center"
            onClick={onBack}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>

          <button
            className="flex-1 py-2 px-4 rounded-full border border-gray-600 text-white text-sm font-medium flex items-center justify-center"
            onClick={onSkip}
          >
            Skip <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
