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
    // Navigate to age selection
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

      {/* Header with Logo and Wordmark */}
      <div className="flex items-center mt-6">
        <span className="text-[#F6861F] text-lg font-medium mr-2">DAILY 1 PERCENT</span>
      </div>

      {/* Main Question */}
      <h1 className="text-[22px] font-normal mt-12">
        What best describes your
        <br />
        role?
      </h1>

      {/* Role Selection Buttons */}
      <div className="mt-8 space-y-4 w-full">
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
