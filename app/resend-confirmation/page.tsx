"use client"

import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, AlertCircle, CheckCircle } from "lucide-react"
import { getSupabase } from "@/lib/supabase-client"

export default function ResendConfirmationPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = getSupabase()

  // Get the site URL - use environment variable or fallback to window.location.origin
  const getSiteUrl = () => {
    // For production, use the NEXT_PUBLIC_SITE_URL if available
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL
    }

    // For development or if NEXT_PUBLIC_SITE_URL is not set, use window.location.origin
    if (typeof window !== "undefined") {
      // Remove any trailing slash
      return window.location.origin.replace(/\/$/, "")
    }

    // Fallback
    return "https://daily-1-percent.vercel.app"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const siteUrl = getSiteUrl()
      console.log(`Using site URL for email redirect: ${siteUrl}/confirm`)

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${siteUrl}/confirm`,
        },
      })

      if (error) {
        console.error("Error resending confirmation email:", error)
        setError(error.message)
      } else {
        setSuccess(true)
        // Store the email in localStorage so we can pre-fill it on the login page
        localStorage.setItem("pendingConfirmationEmail", email)
      }
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/login" className="flex items-center text-white">
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Login</span>
        </Link>
      </div>

      <div className="flex flex-col items-center mt-12">
        {/* Logo Icon */}
        <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[80px] h-[80px] object-contain" />

        {/* Heading */}
        <h1 className="text-[32px] font-normal mt-6">Resend Confirmation</h1>
      </div>

      {success ? (
        <div className="mt-8 text-center">
          <div className="bg-green-900/50 p-4 rounded-lg mb-6 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <p>
              Confirmation email sent to <strong>{email}</strong>!
            </p>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Please check your inbox and spam folder. The confirmation link will expire in 24 hours. After confirming
            your email, you'll be able to log in to your account.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="w-full py-3.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium"
          >
            Return to Login
          </button>
        </div>
      ) : (
        <>
          <p className="mt-6 text-center text-gray-400">
            Enter your email address below and we'll send you another confirmation email.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-3 px-4 rounded-lg bg-white text-[#1E1E1E]"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-900/50 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium"
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend Confirmation Email"}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
