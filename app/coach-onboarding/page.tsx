"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CoachOnboardingPage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/create-account")
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

      {/* Main Content */}
      <div className="mt-[48px]">
        <h1 className="text-[22px] font-medium mb-4">Coach Onboarding</h1>

        <p className="text-[16px] leading-relaxed">
          Welcome to the coach onboarding flow. Here you'll set up your profile and team information.
        </p>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-[#3A3A3A] rounded-lg">
            <h2 className="font-medium mb-2">As a coach, you'll be able to:</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Create and manage teams</li>
              <li>Invite athletes to join</li>
              <li>Track athlete progress</li>
              <li>Assign mental training exercises</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-[14px] px-4 rounded-full bg-[#1F7CF6] text-white font-medium mt-6"
        >
          Continue to Account Setup
        </button>
      </div>
    </div>
  )
}
