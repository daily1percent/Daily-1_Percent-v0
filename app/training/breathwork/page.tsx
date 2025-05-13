"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BreathworkExercise from "@/components/training/breathwork/breathwork-exercise"
import WelcomeScreen from "@/components/training/breathwork/welcome-screen"
import GetReadyScreen from "@/components/training/breathwork/get-ready-screen"
import CompletedScreen from "@/components/training/breathwork/completed-screen"
import BottomNav from "@/components/shared/bottom-nav"
import { preloadRoute } from "@/lib/navigation-utils"

type BreathworkStage = "welcome" | "get-ready" | "exercise" | "completed"

export default function BreathworkPage() {
  const router = useRouter()
  const [stage, setStage] = useState<BreathworkStage>("welcome")
  const [isPaused, setIsPaused] = useState(false)

  // Preload the next route when we reach the exercise stage
  useEffect(() => {
    if (stage === "exercise") {
      preloadRoute("/training/visualization")
    }
  }, [stage])

  // Auto-redirect after completion animation
  useEffect(() => {
    if (stage === "completed") {
      const redirectTimer = setTimeout(() => {
        router.push("/training/visualization")
      }, 3000) // 3 second delay before redirect

      return () => clearTimeout(redirectTimer)
    }
  }, [stage, router])

  const startExercise = () => {
    setStage("get-ready")
  }

  const handleGetReadyComplete = () => {
    setStage("exercise")
  }

  const handleExerciseComplete = () => {
    setStage("completed")
  }

  const handleBack = () => {
    if (stage === "welcome") {
      router.push("/training") // Go back to training menu
    } else if (stage === "get-ready") {
      setStage("welcome")
    } else if (stage === "exercise") {
      setStage("welcome")
    }
  }

  const handleSkip = () => {
    if (stage === "welcome" || stage === "get-ready") {
      setStage("exercise")
    } else if (stage === "exercise") {
      setStage("completed")
    } else if (stage === "completed") {
      router.push("/training/visualization")
    }
  }

  const handleRestart = () => {
    setStage("welcome")
    setIsPaused(false)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-white">
      <div className="flex-1 flex flex-col">
        {/* Logo */}
        <div className="w-full flex justify-center pt-4 px-5">
          <div className="flex items-center">
            <span className="text-[#FF9100]">▲</span>
            <span className="text-white text-sm font-medium ml-1">DAILY</span>
            <span className="text-[#FF9100] text-sm font-medium mx-0.5">1</span>
            <span className="text-white text-sm font-medium">PERCENT</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full flex flex-col">
          {stage === "welcome" && (
            <WelcomeScreen onStart={startExercise} onBack={handleBack} onSkip={handleSkip} onRestart={handleRestart} />
          )}

          {stage === "get-ready" && (
            <GetReadyScreen
              onComplete={handleGetReadyComplete}
              onBack={handleBack}
              onSkip={handleSkip}
              onRestart={handleRestart}
            />
          )}

          {stage === "exercise" && (
            <BreathworkExercise
              isPaused={isPaused}
              onComplete={handleExerciseComplete}
              onBack={handleBack}
              onSkip={handleSkip}
              onPause={togglePause}
              onRestart={handleRestart}
            />
          )}

          {stage === "completed" && <CompletedScreen nextModule="Visualization" nextRoute="/training/visualization" />}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
