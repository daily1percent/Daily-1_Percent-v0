"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const sports = [
  { name: "Baseball / Softball", available: true },
  { name: "Basketball", available: false },
  { name: "Football", available: false },
  { name: "Soccer", available: false },
  { name: "Volleyball", available: false },
  { name: "Tennis", available: false },
  { name: "Golf", available: false },
  { name: "Swimming", available: false },
  { name: "Track & Field", available: false },
]

export default function SportSelectionPage() {
  const router = useRouter()
  const [selectedSport, setSelectedSport] = useState<string | null>("Baseball / Softball")

  const handleContinue = () => {
    if (selectedSport) {
      localStorage.setItem("userSport", selectedSport)
      router.push("/position-selection")
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/age-selection" className="flex items-center text-white">
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
      <h1 className="text-[22px] font-medium mt-[48px]">Select your sport</h1>

      {/* Sport Selection Buttons */}
      <div className="mt-[32px] space-y-[16px] w-full">
        {sports.map((sport) => (
          <button
            key={sport.name}
            className={`w-full py-[14px] px-4 rounded-full text-white font-medium transition-colors ${
              !sport.available
                ? "bg-[#3A3A3A] opacity-50 cursor-not-allowed"
                : selectedSport === sport.name
                  ? "bg-[#1F7CF6]"
                  : "bg-[#3A3A3A]"
            }`}
            onClick={() => sport.available && setSelectedSport(sport.name)}
            disabled={!sport.available}
          >
            {sport.name}
            {!sport.available && <span className="text-xs ml-2">(Coming Soon)</span>}
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
