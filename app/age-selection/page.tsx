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

    // For simplicity, just go to signup for all ages
    router.push("/signup")
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

      {/* Header with Logo and Wordmark */}
      <div className="flex items-center mt-6">
        <span className="text-[#F6861F] text-lg font-medium mr-2">DAILY 1 PERCENT</span>
      </div>

      {/* Main Question */}
      <h1 className="text-[22px] font-normal mt-12">How old are you?</h1>

      {/* Age Selection Buttons */}
      <div className="mt-8 space-y-4 w-full">
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
