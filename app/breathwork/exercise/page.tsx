"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

type BreathState = "inhale" | "hold1" | "exhale" | "hold2"

export default function BreathworkExercisePage() {
  const router = useRouter()
  const [breathState, setBreathState] = useState<BreathState>("inhale")
  const [seconds, setSeconds] = useState(5)
  const [cycle, setCycle] = useState(1)
  const [totalCycles] = useState(4)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 1) {
        setSeconds(seconds - 1)
      } else {
        // Move to next breath state
        if (breathState === "inhale") {
          setBreathState("hold1")
          setSeconds(5)
        } else if (breathState === "hold1") {
          setBreathState("exhale")
          setSeconds(5)
        } else if (breathState === "exhale") {
          setBreathState("hold2")
          setSeconds(5)
        } else {
          // End of cycle
          if (cycle < totalCycles) {
            setCycle(cycle + 1)
            setBreathState("inhale")
            setSeconds(5)
          } else {
            // End of exercise
            router.push("/breathwork/complete")
          }
        }
      }
    }, 1000)

    // Calculate overall progress (0-100)
    const totalSteps = totalCycles * 4 * 5 // cycles * states * seconds
    const currentStep =
      (cycle - 1) * 4 * 5 + // completed cycles
      ["inhale", "hold1", "exhale", "hold2"].indexOf(breathState) * 5 + // completed states
      (5 - seconds + 1) // current seconds
    setProgress((currentStep / totalSteps) * 100)

    return () => clearTimeout(timer)
  }, [seconds, breathState, cycle, totalCycles, router])

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

  const getCircleColor = () => {
    switch (breathState) {
      case "inhale":
        return "breathwork-circle-inhale"
      case "hold1":
      case "hold2":
        return "breathwork-circle-hold"
      case "exhale":
        return "breathwork-circle-exhale"
    }
  }

  const getCircleSize = () => {
    switch (breathState) {
      case "inhale":
        return "scale-100"
      case "hold1":
      case "hold2":
        return "scale-100"
      case "exhale":
        return "scale-90"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{getInstructions()}</h1>
        <p className="text-muted-foreground">
          Cycle {cycle} of {totalCycles}
        </p>
      </div>

      <div
        className={`breathwork-circle ${getCircleColor()} ${getCircleSize()} w-48 h-48 mb-8 transition-all duration-1000`}
      >
        <span className="text-5xl font-bold">{seconds}</span>
      </div>

      <div className="w-full max-w-xs mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex space-x-2">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <div key={i} className={`progress-dot ${i < cycle ? "active" : ""}`}></div>
        ))}
      </div>
    </div>
  )
}
