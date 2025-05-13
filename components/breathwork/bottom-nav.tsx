"use client"

import Link from "next/link"
import { Home, Calendar, Compass, User } from "lucide-react"

export default function BottomNav() {
  return (
    <div className="bg-[#2A2A2A] border-t border-[#3A3A3A] h-16 flex items-center justify-around px-5">
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
  )
}
