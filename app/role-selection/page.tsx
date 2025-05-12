"use client"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const roles = [
  "Athlete",
  "Coach or Trainer",
  "Teacher or School Staff",
  "Speaker / Performer",
  "Business Leader or Entrepreneur",
  "Just here for personal growth",
]

export default function RoleSelectionPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleRoleSelect = (role: string) => {
    // Store the selected role
    localStorage.setItem("userRole", role)
    // Immediately navigate to age selection
    router.push("/age-selection")
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

      {/* Centered Logo and Wordmark - STACKED as per Figma design */}
      <div className="flex flex-col items-center mt-8">
        {/* Logo Icon - Exact size from Figma */}
        <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[124px] h-[112px] object-contain" />

        {/* Wordmark - 24px below logo */}
        <div className="mt-6 flex items-center">
          <span className="text-white text-xl font-normal">DAILY</span>
          <span className="text-[#F6861F] text-xl font-normal mx-1">1</span>
          <span className="text-white text-xl font-normal">PERCENT</span>
        </div>
      </div>

      {/* Main Question - 48px below wordmark */}
      <h1 className="text-[22px] font-normal mt-12 text-center">
        What best describes your
        <br />
        role?
      </h1>

      {/* Role Selection Buttons - 32px below question, 16px spacing between buttons */}
      <div className="mt-8 space-y-4 w-[85%] mx-auto">
        {roles.map((role) => (
          <button
            key={role}
            className={`w-full py-3.5 px-4 rounded-full text-white font-medium text-[17px] transition-colors ${
              role === selectedRole ? "bg-[#1F7CF6]" : "bg-[#3A3A3A]"
            }`}
            onClick={() => {
              setSelectedRole(role)
              handleRoleSelect(role)
            }}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  )
}
