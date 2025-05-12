"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ParentPermissionPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store the parent email
    localStorage.setItem("parentEmail", email)
    router.push("/signup")
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

      <div className="flex flex-col items-center mt-12">
        {/* Logo Icon */}
        <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[80px] h-[80px] object-contain" />

        {/* Heading */}
        <h1 className="text-[28px] font-normal mt-6">Parent Permission</h1>
      </div>

      <div className="mt-8">
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
            className="w-full py-3 px-4 rounded-lg bg-white text-[#1E1E1E] mb-6"
          />

          <button type="submit" className="w-full py-3.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium">
            Send Request
          </button>
        </form>
      </div>
    </div>
  )
}
