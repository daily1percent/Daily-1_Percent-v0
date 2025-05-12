"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SetupLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    // Store the login details (in a real app, you'd use context or state management)
    localStorage.setItem("username", formData.username)

    // Navigate to the request sent page
    router.push("/request-sent")
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/parent-approval" className="flex items-center text-white">
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
          While we wait for your parent's approval, let's set up your login details so you're ready to go.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Create a username</label>
            <input
              type="text"
              name="username"
              placeholder="e.g. @jp.kicker23"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full py-3 px-4 rounded-full bg-[#3A3A3A] text-white"
            />
            <p className="text-xs text-gray-400 mt-1">Ask a parent if you need help.</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Create a password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full py-3 px-4 rounded-full bg-[#3A3A3A] text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Confirm your password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full py-3 px-4 rounded-full bg-[#3A3A3A] text-white"
            />
            <p className="text-xs text-gray-400 mt-1">Make sure it matches the password you typed above.</p>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button type="submit" className="w-full py-[14px] px-4 rounded-full bg-[#1F7CF6] text-white font-medium">
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  )
}
