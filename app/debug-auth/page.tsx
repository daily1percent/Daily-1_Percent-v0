"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getSupabase } from "@/lib/supabase-client"

export default function DebugAuthPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [siteUrl, setSiteUrl] = useState("")
  const supabase = getSupabase()

  useEffect(() => {
    // Get the site URL
    const url = typeof window !== "undefined" ? window.location.origin : ""
    setSiteUrl(url)
  }, [])

  const handleCheckSession = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Error checking session:", error)
        setError(error.message)
      } else {
        setResult({
          session: data.session
            ? {
                user: {
                  id: data.session.user.id,
                  email: data.session.user.email,
                  email_confirmed_at: data.session.user.email_confirmed_at,
                  created_at: data.session.user.created_at,
                },
                expires_at: data.session.expires_at,
              }
            : null,
        })
      }
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleTestEmailRedirect = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
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

      const siteUrl = getSiteUrl()

      setResult({
        redirectUrl: `${siteUrl}/confirm`,
        env: {
          NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "not set",
          window_location_origin: typeof window !== "undefined" ? window.location.origin : "not available",
        },
      })
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An error occurred")
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

      <h1 className="text-2xl font-bold mt-6">Auth Debug</h1>

      <div className="mt-4 p-3 bg-blue-900/50 rounded-lg">
        <p>Current Site URL: {siteUrl}</p>
      </div>

      <div className="mt-6 space-y-4">
        <button
          onClick={handleCheckSession}
          className="w-full py-3 px-4 rounded-lg bg-[#1F7CF6] text-white font-medium"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Current Session"}
        </button>

        <button
          onClick={handleTestEmailRedirect}
          className="w-full py-3 px-4 rounded-lg bg-[#3A3A3A] text-white font-medium"
          disabled={loading}
        >
          {loading ? "Testing..." : "Test Email Redirect URL"}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 rounded-lg">
          <h3 className="font-bold mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-green-900/50 rounded-lg">
          <h3 className="font-bold mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-[#3A3A3A] rounded-lg">
        <h3 className="font-bold mb-2">Email Confirmation Troubleshooting:</h3>
        <ul className="space-y-2 text-sm">
          <li>• Make sure your Supabase project has the correct Site URL in the Authentication settings</li>
          <li>• The redirect URL should be your deployed site URL, not localhost</li>
          <li>• Check that the NEXT_PUBLIC_SITE_URL environment variable is set correctly</li>
          <li>• Try using the debug tools above to verify your current session and redirect URL</li>
        </ul>
      </div>
    </div>
  )
}
