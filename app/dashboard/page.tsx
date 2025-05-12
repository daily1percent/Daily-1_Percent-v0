"use client"

import Link from "next/link"
import { Home, Calendar, Compass, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const { profile, isLoading } = useAuth()

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

        <h1 className="text-2xl font-medium mt-6">
          {isLoading ? (
            <div className="h-8 w-48 bg-gray-700 animate-pulse rounded"></div>
          ) : profile?.username ? (
            `Welcome back, ${profile.username}`
          ) : (
            "Welcome back"
          )}
        </h1>
        <p className="text-gray-400 text-sm mt-1">Train Your Mind Like a Muscle</p>
      </div>

      {/* Today's Session */}
      <div className="px-6 mt-6">
        <div className="bg-[#2A2A2A] rounded-lg p-4">
          <h2 className="text-xl font-medium mb-3">Today's Session</h2>

          <div className="space-y-2 mb-4">
            <div className="text-sm">Breathwork</div>
            <div className="text-sm">Visualization (eyes closed)</div>
            <div className="text-sm">Eye Coordination</div>
            <div className="text-sm">Watch Self Video</div>
            <div className="text-sm">Mantra Work</div>
          </div>

          <button className="w-full bg-[#1F7CF6] text-white py-3 px-4 rounded-full font-medium text-sm">
            Start Todays 14-Min Training
          </button>
        </div>
      </div>

      {/* 28 Day Series */}
      <div className="px-6 mt-4">
        <div className="bg-[#2A2A2A] rounded-lg p-4">
          <h2 className="text-xl font-medium mb-1">28 Day Series</h2>
          <p className="text-sm text-gray-400 mb-3">The Dominant Hitter – Week 1: Foundation</p>

          <div className="flex flex-wrap gap-2">
            {[...Array(28)].map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${i < 5 ? "bg-white" : "bg-gray-600"}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Video */}
      <div className="px-6 mt-4">
        <div className="bg-[#2A2A2A] rounded-lg p-4">
          <h2 className="text-xl font-medium mb-1">Upload Video</h2>
          <p className="text-sm text-gray-400 mb-3">See your best self in motion</p>

          <button className="w-full border border-[#1F7CF6] text-[#1F7CF6] py-2.5 px-4 rounded-full font-medium text-sm">
            Upload Video
          </button>
        </div>
      </div>

      {/* Explore */}
      <div className="px-6 mt-4">
        <div className="bg-[#2A2A2A] rounded-lg p-4">
          <h2 className="text-xl font-medium mb-3">Explore</h2>

          <div className="space-y-3">
            <div className="text-sm">Add a Sport/Position</div>
            <div className="text-sm">Pick a New Visualization Series</div>
            <div className="text-sm">Breathwork Menu</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2A2A2A] border-t border-[#3A3A3A] h-16 flex items-center justify-around">
        <Link href="/dashboard" className="flex flex-col items-center text-white">
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
        <Link href="/account" className="flex flex-col items-center text-gray-400">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  )
}
