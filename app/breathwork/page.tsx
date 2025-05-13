"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import WelcomeScreen from "@/components/breathwork/welcome-screen"
import GetReadyScreen from "@/components/breathwork/get-ready-screen"
import BreathingExercise from "@/components/breathwork/breathing-exercise"
import CompletedScreen from "@/components/breathwork/completed-screen"
import BottomNav from "@/components/breathwork/bottom-nav"
import { Logo } from "@/components/breathwork/logo"

type BreathworkStage = "welcome" | "get-ready" | "exercise" | "completed"

export default function BreathworkPage() {
  const router = useRouter()
  const [stage, setStage] = useState<BreathworkStage>("welcome")
  const [isPaused, setIsPaused] = useState(false)

  const startExercise = () => {
    setStage("get-ready")
  }

  const handleGetReadyComplete = () => {
    setStage("exercise")
  }

  const handleExerciseComplete = () => {
    setStage("completed")
  }

  const handleRestart = () => {
    setStage("welcome")
    setIsPaused(false)
  }

  const handleBack = () => {
    if (stage === "exercise" || stage === "get-ready") {
      setStage("welcome")
    } else if (stage === "completed") {
      setStage("exercise")
    }
  }

  const handleSkip = () => {
    if (stage === "get-ready") {
      setStage("exercise")
    } else if (stage === "exercise") {
      setStage("completed")
    } else if (stage === "welcome") {
      setStage("exercise")
    }
  }

  const handleDashboard = () => {
    router.push("/dashboard")
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-white">
      <div className="flex-1 flex flex-col">
        {/* Logo */}
        <div className="w-full flex justify-center mt-6 px-5">
          <Logo />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full flex flex-col">
          {stage === "welcome" && <WelcomeScreen onStart={startExercise} onBack={handleBack} onSkip={handleSkip} />}
          {stage === "get-ready" && <GetReadyScreen onComplete={handleGetReadyComplete} />}
          {stage === "exercise" && (
            <BreathingExercise
              isPaused={isPaused}
              onComplete={handleExerciseComplete}
              onBack={handleBack}
              onSkip={handleSkip}
              onPause={togglePause}
              onRestart={handleRestart}
            />
          )}
          {stage === "completed" && <CompletedScreen onDashboard={handleDashboard} />}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
