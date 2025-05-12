"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const blockers = [
  "Focus when it counts",
  "Letting go of mistakes",
  "Confidence under pressure",
  "Handling slumps",
  "Dealing with failure",
  "Managing expectations",
  "Staying present",
  "Controlling emotions",
  "Handling criticism",
]

export default function HitterBlockersPage() {
  const router = useRouter()
  const [selectedBlockers, setSelectedBlockers] = useState<string[]>([])

  const toggleBlocker = (blocker: string) => {
    if (selectedBlockers.includes(blocker)) {
      setSelectedBlockers(selectedBlockers.filter((b) => b !== blocker))
    } else {
      setSelectedBlockers([...selectedBlockers, blocker])
    }
  }

  const handleContinue = () => {
    router.push("/congrats")
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh]">
      <div className="w-full">
        <Logo className="mb-4" />

        <h2 className="text-xl font-bold mb-2 text-center">What are your biggest mental blockers?</h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">Select all that apply</p>

        <div className="space-y-3">
          {blockers.map((blocker) => (
            <div key={blocker} className="flex items-center space-x-3 p-3 rounded-lg border border-accent bg-muted">
              <Checkbox
                id={blocker}
                checked={selectedBlockers.includes(blocker)}
                onCheckedChange={() => toggleBlocker(blocker)}
              />
              <Label htmlFor={blocker} className="cursor-pointer flex-1">
                {blocker}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleContinue} className="w-full mt-6" size="lg" disabled={selectedBlockers.length === 0}>
        Continue
      </Button>
    </div>
  )
}
