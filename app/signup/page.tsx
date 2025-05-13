"use client"
import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Create Supabase client directly
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    try {
      // Sign up the user with Supabase - NO email confirmation
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { username: formData.username },
          // No email confirmation required
          emailRedirectTo: undefined,
        },
      })

      if (error) {
        throw error
      }

      if (!data.user) {
        throw new Error("Failed to create user account")
      }

      // Try to sign in immediately
      if (!data.session) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) {
          console.warn("Auto sign-in error:", signInError)
          // Continue anyway, as the user account was created
        }
      }

      // Redirect to dashboard or login
      if (data.session) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    } catch (err: any) {
      console.error("Error during signup:", err)
      setError(err.message || "An error occurred during signup. Please try again.")
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

        {/* Sign Up Heading */}
        <h1 className="text-[32px] font-normal mt-6">Sign Up</h1>
      </div>

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
          <label className="block text-sm text-gray-400 mb-2">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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

        <div>
          <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
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
          className="w-full py-3.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium mt-6"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1F7CF6]">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
