"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"

export default function BreathworkIntroPage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/breathwork/get-ready")
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh]">
      <div className="w-full">
        <Logo className="mb-8 scale-75 origin-left" />

        <h1 className="text-2xl font-bold mb-4 text-center">Box Breathing</h1>

        <div className="space-y-4 mb-8">
          <p className="text-center">
            Box breathing is a powerful technique used by elite athletes and performers to calm the mind and improve
            focus.
          </p>

          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-bold mb-2">How it works:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  1
                </span>
                <span>Inhale deeply through your nose for 5 seconds</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#cb26ee] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  2
                </span>
                <span>Hold your breath for 5 seconds</span>
              </li>
              <li className="flex items-start">
                <span className="bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  3
                </span>
                <span>Exhale completely through your mouth for 5 seconds</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#cb26ee] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  4
                </span>
                <span>Repeat the cycle 4 times</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Find a quiet place where you won't be disturbed for the next 5 minutes.
          </p>
        </div>
      </div>

      <Button onClick={handleContinue} className="w-full" size="lg">
        I'm Ready
      </Button>
    </div>
  )
}
