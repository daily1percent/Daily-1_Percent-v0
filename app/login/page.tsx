"use client"
import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      // Simple direct login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error
      }

      // If login was successful, redirect to dashboard
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#1F7CF6]">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
