"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

const focusAreas = [
  "Mental Toughness",
  "Confidence",
  "Focus & Clarity",
  "Resilience",
  "Handling Pressure",
  "Motivation",
  "Growth Mindset",
]

export default function FocusAreasPage() {
  const router = useRouter()
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["Mental Toughness"])

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area))
    } else {
      setSelectedAreas([...selectedAreas, area])
    }
  }

  const handleNext = () => {
    // Store the selected focus areas
    localStorage.setItem("focusAreas", JSON.stringify(selectedAreas))
    router.push("/preparation-intent")
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/request-sent" className="flex items-center text-white">
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
      <h1 className="text-[22px] font-medium mt-[48px]">What do you want to get better at?</h1>

      {/* Focus Areas Selection */}
      <div className="mt-[32px] space-y-[16px] w-full">
        {focusAreas.map((area) => (
          <div
            key={area}
            className="flex items-center space-x-3 p-3 rounded-lg border border-[#3A3A3A] bg-[#2A2A2A] cursor-pointer"
            onClick={() => toggleArea(area)}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center ${
                selectedAreas.includes(area) ? "bg-[#1F7CF6]" : "bg-[#3A3A3A]"
              }`}
            >
              {selectedAreas.includes(area) && <Check className="h-4 w-4 text-white" />}
            </div>
            <span>{area}</span>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full py-[14px] px-4 rounded-full bg-[#1F7CF6] text-white font-medium mt-[32px] mb-[60px]"
        disabled={selectedAreas.length === 0}
      >
        Next
      </button>
    </div>
  )
}
