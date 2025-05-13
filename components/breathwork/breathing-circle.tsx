"use client"
import "./breathing-styles.css"

type BreathState = "inhale" | "hold1" | "exhale" | "hold2"

interface BreathingCircleProps {
  breathState: BreathState
  seconds: number
  isPaused: boolean
}

export default function BreathingCircle({ breathState, seconds, isPaused }: BreathingCircleProps) {
  // Get the appropriate animation class based on breath state
  const getAnimationClass = () => {
    if (isPaused) return "paused"

    switch (breathState) {
      case "inhale":
        return "circle-inhale"
      case "hold1":
        return "circle-hold-big" // Hold after inhale (big circle)
      case "exhale":
        return "circle-exhale"
      case "hold2":
        return "circle-hold-small" // Hold after exhale (small circle)
    }
  }

  // Get the appropriate color based on breath state
  const getCircleColor = () => {
    switch (breathState) {
      case "inhale":
        return "bg-[#00C853]" // Green
      case "hold1":
      case "hold2":
        return "bg-[#A020F0]" // Purple
      case "exhale":
        return "bg-[#FF9100]" // Orange
    }
  }

  // Get the instruction text
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

  return (
    <div
      className={`breathing-circle ${getAnimationClass()} ${getCircleColor()} ${
        isPaused ? "animation-paused" : ""
      } flex items-center justify-center transition-colors duration-500`}
    >
      <div className="text-center text-white">
        <div className="text-xl font-medium">{getInstructions()}</div>
        <div className="text-5xl font-bold">{seconds}</div>
      </div>
    </div>
  )
}
