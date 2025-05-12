"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const positions = ["Hitter", "Pitcher"]

export default function PositionSelectionPage() {
  const router = useRouter()
  const [selectedPosition, setSelectedPosition] = useState<string>("Hitter")

  const handleContinue = () => {
    localStorage.setItem("userPosition", selectedPosition)

    if (selectedPosition === "Hitter") {
      router.push("/hitter-blockers")
    } else {
      router.push("/pitcher-blockers")
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/sport-selection" className="flex items-center text-white">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
      </div>

      {/* Header with Logo and Wordmark */}
      <div className="flex items-center mt-[32px]">
        <img src="/images/d1p-icon-small.png" alt="Daily 1 Percent Logo" className="w-8 h-8" />
        <div className="ml-2 flex items-center">
          <span className="text-white text-lg font-medium">DAILY</span>
          <span className="text-[#F6861F] text-lg font-medium mx-1">1</span>
          <span className="text-white text-lg font-medium">PERCENT</span>
        </div>
      </div>

      {/* Main Question */}
      <h1 className="text-[22px] font-medium mt-[48px]">Select your position</h1>

      {/* Position Selection Buttons */}
      <div className="mt-[32px] space-y-[16px] w-full">
        {positions.map((position) => (
          <button
            key={position}
            className={`w-full py-[14px] px-4 rounded-full text-white font-medium transition-colors ${
              selectedPosition === position ? "bg-[#1F7CF6]" : "bg-[#3A3A3A]"
            }`}
            onClick={() => setSelectedPosition(position)}
          >
            {position}
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full py-[14px] px-4 rounded-full bg-[#1F7CF6] text-white font-medium mt-[32px] mb-[60px]"
      >
        Continue
      </button>
    </div>
  )
}
