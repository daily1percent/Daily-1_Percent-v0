"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ParentApprovalPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store the parent email (in a real app, you'd use context or state management)
    localStorage.setItem("parentEmail", email)
    router.push("/setup-login")
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
        <p className="text-[16px] leading-relaxed">
          Since you're under 13, we need your parent or guardian's permission before you can start.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-sm text-gray-400 mb-2">Parent's email address</label>
          <input
            type="email"
            placeholder="parent@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-3 px-4 rounded-full bg-[#3A3A3A] text-white mb-6"
          />

          <button type="submit" className="w-full py-[14px] px-4 rounded-full bg-[#1F7CF6] text-white font-medium">
            Send Request
          </button>
        </form>
      </div>
    </div>
  )
}
