"use client"

import Link from "next/link"
import { Home, Calendar, Compass, User } from "lucide-react"

export default function DiscoverPage() {
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
          <span className="text-[#F6861F] text-lg font-normal mx-1">1</span>
          <span className="text-white text-lg font-normal">PERCENT</span>
        </div>

        <h1 className="text-2xl font-medium mt-6">Discover</h1>
        <p className="text-gray-400 text-sm mt-1">Explore new training content</p>
      </div>

      {/* Content Placeholder */}
      <div className="flex-1 flex items-center justify-center px-6">
        <p className="text-gray-400">Discover content will go here</p>
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
        <Link href="/discover" className="flex flex-col items-center text-white">
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
