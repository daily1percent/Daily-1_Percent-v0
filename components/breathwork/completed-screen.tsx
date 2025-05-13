"use client"
import { CheckCircle } from "lucide-react"

interface CompletedScreenProps {
  onDashboard: () => void
}

export default function CompletedScreen({ onDashboard }: CompletedScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-5 py-6">
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-[#00C853] flex items-center justify-center">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">Session Completed</h2>
      <p className="text-gray-300 text-center mb-8 max-w-md">Great job! You've finished 4 rounds of breathwork.</p>

      <button
        onClick={onDashboard}
        className="w-full max-w-xs py-3 px-4 rounded-full bg-[#007BFF] text-white font-medium"
      >
        Return to Dashboard
      </button>
    </div>
  )
}
