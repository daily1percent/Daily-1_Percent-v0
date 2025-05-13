"use client"
import "../../app/breathwork/breathwork.css"

type BreathState = "inhale" | "hold1" | "exhale" | "hold2"

interface EnhancedBubbleProps {
  breathState: BreathState
  seconds: number
  isPaused: boolean
}

export default function EnhancedBubble({ breathState, seconds, isPaused }: EnhancedBubbleProps) {
  const getBubbleColor = () => {
    switch (breathState) {
      case "inhale":
        return "bg-[#1FCB27]" // Green
      case "hold1":
      case "hold2":
        return "bg-[#CB26EE]" // Purple
      case "exhale":
        return "bg-[#F6861F]" // Orange
    }
  }

  const getInstructions = () => {
    switch (breathState) {
      case "inhale":
        return "Inhale"
      case "hold1":
      case "hold2":
        return "Hold"
      case "exhale":
        return "Exhale"
    }
  }

  const getAnimationClass = () => {
    switch (breathState) {
      case "inhale":
        return "bubble-inhale"
      case "exhale":
        return "bubble-exhale"
      case "hold1":
      case "hold2":
        return "bubble-hold"
    }
  }

  return (
    <div
      className={`w-48 h-48 rounded-full ${getBubbleColor()} flex items-center justify-center ${getAnimationClass()} ${isPaused ? "paused" : ""}`}
    >
      <div className="text-center">
        <div className="text-xl font-medium">{getInstructions()}</div>
        <div className="text-5xl font-bold">{seconds}</div>
      </div>
    </div>
  )
}
