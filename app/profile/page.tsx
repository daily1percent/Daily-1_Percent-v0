"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Save, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ProfilePage() {
  const { profile, updateProfile, signOut } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    role: profile?.role || "",
    age_group: profile?.age_group || "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const { error: updateError } = await updateProfile({
        username: formData.username,
        role: formData.role,
        age_group: formData.age_group,
      })

      if (updateError) {
        throw updateError
      }

      setSuccess("Profile updated successfully!")
    } catch (err: any) {
      console.error("Error updating profile:", err)
      setError(err.message || "An error occurred while updating your profile")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white pb-16">
      {/* Header */}
      <div className="mt-8">
        <Link href="/account" className="flex items-center text-white">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="flex items-center mt-[32px]">
        <img src="/images/d1p-icon-small.png" alt="Daily 1 Percent Logo" className="w-8 h-8" />
        <div className="ml-2 flex items-center">
          <span className="text-white text-lg font-medium">DAILY</span>
          <span className="text-[#F6861F] text-lg font-medium mx-1">1</span>
          <span className="text-white text-lg font-medium">PERCENT</span>
        </div>
      </div>

      <h1 className="text-2xl font-medium mt-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full py-3 px-4 rounded-lg bg-[#3A3A3A] text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Role</label>
          <select
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            className="w-full py-3 px-4 rounded-lg bg-[#3A3A3A] text-white"
          >
            <option value="">Select a role</option>
            <option value="Athlete">Athlete</option>
            <option value="Coach or Trainer">Coach or Trainer</option>
            <option value="Teacher or School Staff">Teacher or School Staff</option>
            <option value="Speaker / Performer">Speaker / Performer</option>
            <option value="Business Leader or Entrepreneur">Business Leader or Entrepreneur</option>
            <option value="Just here for personal growth">Just here for personal growth</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Age Group</label>
          <select
            name="age_group"
            value={formData.age_group || ""}
            onChange={handleChange}
            className="w-full py-3 px-4 rounded-lg bg-[#3A3A3A] text-white"
          >
            <option value="">Select an age group</option>
            <option value="Under 12">Under 12</option>
            <option value="13-17">13-17</option>
            <option value="18+">18+</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium mt-6 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="w-full py-3.5 px-4 rounded-full bg-[#3A3A3A] text-white font-medium mt-6 flex items-center justify-center"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Log Out
      </button>
    </div>
  )
}
