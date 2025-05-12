"use client"

import { useRouter } from "next/navigation"

export default function OnboardingCompletePage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Logo and Wordmark */}
      <div className="mb-8">
        <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-24 h-24 mx-auto" />
        <div className="mt-4 flex items-center justify-center">
          <span className="text-white text-2xl font-medium">DAILY</span>
          <span className="text-[#F6861F] text-2xl font-medium mx-1">1</span>
          <span className="text-white text-2xl font-medium">PERCENT</span>
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-[32px] font-bold mb-4 text-[#F6861F]">Success!</h1>

      <p className="text-center text-[16px] leading-relaxed mb-12">
        Your account has been created. Let's start your mental training journey.
      </p>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full py-[14px] px-4 rounded-full bg-[#1F7CF6] text-white font-medium"
      >
        Continue to Dashboard
      </button>
    </div>
  )
}
