"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Pause, Play, RefreshCw } from "lucide-react"
import BreathingCircle from "./breathing-circle"

type BreathState = "inhale" | "hold1" | "exhale" | "hold2"

interface BreathingExerciseProps {
  isPaused: boolean
  onComplete: () => void
  onBack: () => void
  onSkip: () => void
  onPause: () => void
  onRestart: () => void
}

export default function BreathingExercise({
  isPaused,
  onComplete,
  onBack,
  onSkip,
  onPause,
  onRestart,
}: BreathingExerciseProps) {
  const [breathState, setBreathState] = useState<BreathState>("inhale")
  const [seconds, setSeconds] = useState(5)
  const [round, setRound] = useState(1)
  const [totalRounds] = useState(4)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // Handle timer logic
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setTimeout(() => {
      if (seconds > 1) {
        setSeconds(seconds - 1)
      } else {
        // Move to next breath state
        let nextBreathState: BreathState = breathState
        let nextRound = round

        if (breathState === "inhale") {
          nextBreathState = "hold1"
        } else if (breathState === "hold1") {
          nextBreathState = "exhale"
        } else if (breathState === "exhale") {
          nextBreathState = "hold2"
        } else {
          // End of cycle
          if (round < totalRounds) {
            nextBreathState = "inhale"
            nextRound = round + 1
          } else {
            // End of exercise
            onComplete()
            return
          }
        }

        setBreathState(nextBreathState)
        setSeconds(5)
        setRound(nextRound)
      }
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [seconds, breathState, round, totalRounds, isPaused, onComplete])

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-132px)] px-5 py-6">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Breathing circle */}
        <div className="relative mb-8">
          <BreathingCircle breathState={breathState} seconds={seconds} isPaused={isPaused} />
        </div>

        {/* Round indicator */}
        <div className="text-gray-300 mb-4">
          Round {round} of {totalRounds}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < round - 1 ? "bg-[#FF9100]" : i === round - 1 ? "bg-[#FF9100]" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Control buttons */}
      <div className="w-full space-y-3 mb-4">
        <button
          className="w-full py-3 px-4 rounded-full bg-[#2A2A2A] text-white font-medium flex items-center justify-center"
          onClick={onPause}
        >
          {isPaused ? (
            <>
              <Play className="w-5 h-5 mr-2" /> Resume
            </>
          ) : (
            <>
              <Pause className="w-5 h-5 mr-2" /> Pause
            </>
          )}
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
