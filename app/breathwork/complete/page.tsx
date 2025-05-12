"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function BreathworkCompletePage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh]">
      <div className="w-full text-center">
        <Logo className="mb-8 mx-auto" />

        <div className="mb-4 flex justify-center">
          <CheckCircle className="h-16 w-16 text-success" />
        </div>

        <h1 className="text-2xl font-bold mb-2">You Did It!</h1>

        <p className="text-muted-foreground mb-8">
          Great job completing your first breathwork session. This practice will help you stay calm and focused during
          high-pressure situations.
        </p>

        <div className="bg-muted rounded-lg p-4 mb-8 text-left">
          <h3 className="font-bold mb-2">Benefits You'll Experience:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Reduced anxiety before competition</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Improved focus during critical moments</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Better recovery between plays</span>
            </li>
            <li className="flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>Enhanced decision-making under pressure</span>
            </li>
          </ul>
        </div>
      </div>

      <Button onClick={handleContinue} className="w-full" size="lg">
        Return to Dashboard
      </Button>
    </div>
  )
}
