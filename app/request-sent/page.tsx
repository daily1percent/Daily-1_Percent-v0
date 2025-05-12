"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RequestSentPage() {
  const router = useRouter()
  const [parentEmail, setParentEmail] = useState("")

  useEffect(() => {
    // Get the parent email from localStorage
    const email = localStorage.getItem("parentEmail") || ""
    setParentEmail(email)
  }, [])

  const handleResendEmail = () => {
    // In a real app, this would trigger an API call to resend the email
    alert("Email resent to " + parentEmail)
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/setup-login" className="flex items-center text-white">
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
      <div className="mt-[48px] text-center">
        <h1 className="text-[28px] font-bold text-[#F6861F]">Request Sent!</h1>

        <p className="mt-4 text-[16px] leading-relaxed">
          We've emailed your parent. You'll be able to use the app once they approve.
        </p>

        <div className="mt-6 p-4 bg-[#3A3A3A] rounded-lg">
          <p className="text-sm text-gray-300">Sent to:</p>
          <p className="font-medium">{parentEmail}</p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleResendEmail}
            className="w-full py-[14px] px-4 rounded-full bg-[#1F7CF6] text-white font-medium"
          >
            Resend Email
          </button>

          <Link href="/" className="block w-full">
            <button className="w-full py-[14px] px-4 rounded-full bg-white text-[#1E1E1E] font-medium">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
