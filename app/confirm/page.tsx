"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabase } from "@/lib/supabase-client"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function ConfirmPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = getSupabase()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error checking session:", error)
          setError(error.message)
          setLoading(false)
          return
        }

        if (data?.session?.user) {
          console.log("User is authenticated, redirecting to dashboard")
          setSuccess(true)
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000) // Give the user a moment to see the success message
        } else {
          console.log("No active session found")
          setLoading(false)
        }
      } catch (err) {
        console.error("Unexpected error checking session:", err)
        setLoading(false)
      }
    }

    // Check for hash parameters that might indicate auth callback
    const handleAuthCallback = async () => {
      try {
        const supabase = getSupabase()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          setError(error.message)
        } else if (data?.session) {
          console.log("Auth callback successful, redirecting to dashboard")
          setSuccess(true)
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000) // Give the user a moment to see the success message
          return
        }
      } catch (err) {
        console.error("Unexpected error in auth callback:", err)
      }

      setLoading(false)
    }

    // Check if we're in a callback scenario
    if (window.location.hash && window.location.hash.includes("access_token")) {
      handleAuthCallback()
    } else {
      checkSession()
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#1E1E1E] text-white">
        <div className="flex flex-col items-center mt-12 mb-8">
          {/* Logo Icon */}
          <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[80px] h-[80px] object-contain" />
        </div>

        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#1F7CF6]" />
        </div>
        <p className="mt-4">Verifying your account...</p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#1E1E1E] text-white">
        <div className="flex flex-col items-center mt-12 mb-8">
          {/* Logo Icon */}
          <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[80px] h-[80px] object-contain" />
        </div>

        <div className="bg-green-900/50 p-6 rounded-lg w-full max-w-md flex flex-col items-center">
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h1 className="text-[24px] font-bold mb-2 text-center">Email Confirmed!</h1>
          <p className="text-center">Your email has been confirmed successfully. Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#1E1E1E] text-white">
      <div className="flex flex-col items-center mt-12 mb-8">
        {/* Logo Icon */}
        <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[80px] h-[80px] object-contain" />
      </div>

      <h1 className="text-[32px] font-normal mb-6 text-center">Check Your Email</h1>

      <p className="text-center text-[16px] leading-relaxed mb-4">
        We've sent a confirmation link to your inbox. Please click the link in your email to activate your account.
      </p>

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 rounded-lg w-full max-w-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-[#3A3A3A] rounded-lg w-full max-w-md">
        <h3 className="font-bold mb-2">Didn't receive the email?</h3>
        <ul className="space-y-2 text-sm">
          <li>• Check your spam or junk folder</li>
          <li>• Make sure you entered the correct email address</li>
          <li>• The email might take a few minutes to arrive</li>
        </ul>
        <button
          onClick={() => router.push("/resend-confirmation")}
          className="mt-4 w-full py-2.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium text-sm"
        >
          Resend Confirmation Email
        </button>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-8 py-3.5 px-6 rounded-full bg-transparent border border-white text-white font-medium"
      >
        Return to Home
      </button>
    </div>
  )
}
