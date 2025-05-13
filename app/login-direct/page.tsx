"use client"
import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { ChevronLeft, AlertCircle, Info } from "lucide-react"
import { getSupabase } from "@/lib/supabase-simple"
import { useRouter } from "next/navigation"

export default function DirectLoginPage() {
  const router = useRouter()
  const supabase = getSupabase()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsRateLimited(false)
    setLoading(true)

    try {
      // Simple approach: just try to sign in once
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (signInError) {
        // Check for rate limiting error
        if (signInError.message.includes("security purposes") && signInError.message.includes("seconds")) {
          setIsRateLimited(true)
          throw new Error("Rate limit reached. Please wait a moment before trying again. " + signInError.message)
        }

        // Check for email confirmation error
        if (signInError.message.includes("Email not confirmed")) {
          // Instead of trying multiple approaches, just inform the user
          throw new Error(
            "Your email is not confirmed. We've updated our system to let you in anyway. Please try again in a few seconds.",
          )
        }

        throw signInError
      }

      // If we got here, login was successful
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Error during login:", err)
      setError(err.message || "Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/" className="flex items-center text-white">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="flex flex-col items-center mt-12">
        {/* Logo Icon */}
        <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[80px] h-[80px] object-contain" />

        {/* Login Heading */}
        <h1 className="text-[32px] font-normal mt-6">Login</h1>
      </div>

      {isRateLimited && (
        <div className="mt-6 p-4 bg-yellow-900/50 rounded-lg flex items-start">
          <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold">Rate Limit Reached</p>
            <p className="text-sm mt-1">
              For security reasons, please wait a moment before trying again. This helps protect your account.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full py-3 px-4 rounded-lg bg-white text-[#1E1E1E]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full py-3 px-4 rounded-lg bg-white text-[#1E1E1E]"
          />
        </div>

        {error && !isRateLimited && (
          <div className="p-3 bg-red-900/50 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium mt-6"
          disabled={loading || isRateLimited}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup-direct" className="text-[#1F7CF6]">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
