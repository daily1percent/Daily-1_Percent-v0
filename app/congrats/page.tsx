"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import { Confetti } from "@/components/confetti"

export default function CongratsPage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <Confetti />

      <Logo className="mb-4" />

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
        <p className="text-muted-foreground mb-8">You're all set up. Let's begin your training.</p>
      </div>

      <Button onClick={handleContinue} className="w-full" size="lg">
        Start Training
      </Button>
    </div>
  )
}
