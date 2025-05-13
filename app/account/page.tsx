"use client"

import Link from "next/link"
import { Home, Calendar, Compass, User, Settings, LogOut, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Create Supabase client directly
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        router.push("/login")
        return
      }

      setUser(data.session.user)
      setLoading(false)
    }

    checkUser()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-white pb-16">
      {/* Header */}
      <div className="px-6 pt-8">
        <div className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path d="M12 3L4 15H20L12 3Z" fill="#F6861F" />
          </svg>
          <span className="text-white text-lg font-normal">DAILY</span>
          <span className="text-[#F6861F] text-lg font-medium mx-1">1</span>
          <span className="text-white text-lg font-normal">PERCENT</span>
        </div>

        <h1 className="text-2xl font-medium mt-6">Account</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your profile</p>
      </div>

      {/* User Profile Summary */}
      <div className="px-6 mt-6">
        <div className="bg-[#2A2A2A] rounded-lg p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-[#3A3A3A] flex items-center justify-center text-xl font-bold">
            {user?.user_metadata?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="ml-4">
            <h2 className="font-medium">{user?.user_metadata?.username || "User"}</h2>
            <p className="text-sm text-gray-400">{user?.user_metadata?.role || "Athlete"}</p>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-medium mb-3">Account Settings</h2>
        <div className="space-y-2">
          <Link href="/profile" className="block">
            <div className="bg-[#2A2A2A] rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-gray-400" />
                <span>Edit Profile</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full bg-[#2A2A2A] rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <LogOut className="h-5 w-5 mr-3 text-gray-400" />
              <span>Log Out</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-medium mb-3">App Info</h2>
        <div className="space-y-2">
          <div className="bg-[#2A2A2A] rounded-lg p-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Version</span>
              <span>1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2A2A2A] border-t border-[#3A3A3A] h-16 flex items-center justify-around">
        <Link href="/dashboard" className="flex flex-col items-center text-gray-400">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/my-plan" className="flex flex-col items-center text-gray-400">
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">My Plan</span>
        </Link>
        <Link href="/discover" className="flex flex-col items-center text-gray-400">
          <Compass className="h-5 w-5" />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center text-white">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  )
}
