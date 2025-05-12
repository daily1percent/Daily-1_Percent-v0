"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PermissionConfirmationPage() {
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
        <h1 className="text-[22px] font-medium mb-4">Permission Confirmation</h1>

        <p className="text-[16px] leading-relaxed">
          Since you're between 13-17 years old, we recommend getting permission from a parent or guardian before
          creating an account.
        </p>

        <div className="mt-6 p-4 bg-[#3A3A3A] rounded-lg">
          <p className="text-sm">
            By continuing, you confirm that you have permission from a parent or guardian to use this app.
          </p>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-[14px] px-4 rounded-full bg-[#1F7CF6] text-white font-medium mt-6"
        >
          I Have Permission
        </button>
      </div>
    </div>
  )
}
