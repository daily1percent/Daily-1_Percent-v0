"use client"
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Logo Icon - centered */}
      <div className="mt-[48px]">
        <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-[124px] h-[112px] object-contain" />
      </div>

      {/* Wordmark */}
      <div className="mt-[24px] flex items-center">
        <span className="text-white text-[32px] font-normal">DAILY</span>
        <span className="text-[#F6861F] text-[32px] font-normal mx-1">1</span>
        <span className="text-white text-[32px] font-normal">PERCENT</span>
      </div>

      {/* Tagline - centered */}
      <p className="mt-[132px] text-white text-center text-[16px] leading-relaxed">
        Building Mental Toughness,
        <br />
        One Percent at a Time
      </p>

      {/* Buttons Container - Fixed spacing from bottom */}
      <div className="w-full max-w-[85%] mt-auto space-y-[16px] mb-[60px]">
        {/* Sign Up Button - now goes to role selection first */}
        <Link href="/role-selection" className="block w-full">
          <button className="w-full py-3.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium">Sign Up</button>
        </Link>

        {/* Login Button */}
        <Link href="/login" className="block w-full">
          <button className="w-full py-3.5 px-4 rounded-full bg-white text-[#1E1E1E] font-medium">Login</button>
        </Link>
      </div>
    </div>
  )
}
