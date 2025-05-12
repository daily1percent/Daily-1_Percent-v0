"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const ageGroups = ["Under 12", "13-17", "18+"]

export default function AgeSelectionPage() {
  const router = useRouter()
  const [selectedAge, setSelectedAge] = useState<string | null>(null)

  const handleAgeSelect = (age: string) => {
    // Store the selected age
    localStorage.setItem("userAge", age)

    // Route based on age and role
    const userRole = localStorage.getItem("userRole") || "Athlete"

    // Branching logic based on role and age
    if (userRole === "Athlete") {
      if (age === "Under 12") {
        router.push("/parent-permission")
      } else {
        router.push("/signup")
      }
    } else if (userRole === "Coach or Trainer") {
      router.push("/signup")
    } else {
      router.push("/signup")
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/role-selection" className="flex items-center text-white">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
      </div>

      {/* Centered Logo and Wordmark - STACKED as per Figma design */}
      <div className="flex flex-col items-center mt-8">
        {/* Logo Icon - Exact size from Figma */}
        <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[124px] h-[112px] object-contain" />

        {/* Wordmark - 24px below logo */}
        <div className="mt-6 flex items-center">
          <span className="text-white text-xl font-normal">DAILY</span>
          <span className="text-[#F6861F] text-xl font-normal mx-1">1</span>
          <span className="text-white text-xl font-normal">PERCENT</span>
        </div>
      </div>

      {/* Main Question - 48px below wordmark */}
      <h1 className="text-[22px] font-normal mt-12 text-center">How old are you?</h1>

      {/* Age Selection Buttons - 32px below question, 16px spacing between buttons */}
      <div className="mt-8 space-y-4 w-[85%] mx-auto">
        {ageGroups.map((age) => (
          <button
            key={age}
            className={`w-full py-3.5 px-4 rounded-full text-white font-medium text-[17px] transition-colors ${
              age === selectedAge ? "bg-[#1F7CF6]" : "bg-[#3A3A3A]"
            }`}
            onClick={() => {
              setSelectedAge(age)
              handleAgeSelect(age)
            }}
          >
            {age}
          </button>
        ))}
      </div>
    </div>
  )
}
