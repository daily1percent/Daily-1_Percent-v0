"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GeneralOnboardingPage() {
  const router = useRouter()

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
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-[22px] font-medium">General Onboarding</h1>
        <p className="mt-4 text-center">This is a placeholder for the general onboarding flow.</p>
      </div>
    </div>
  )
}
