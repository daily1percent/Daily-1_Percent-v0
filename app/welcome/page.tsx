"use client"
import { useRouter } from "next/navigation"

export default function WelcomePage() {
  const router = useRouter()

  const handleBegin = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-12 bg-[#1E1E1E] text-white">
      <div className="flex-1"></div>

      <div className="flex flex-col items-center">
        {/* Logo Icon - larger size as shown in the reference */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 10L13.3333 50H66.6667L40 10Z" fill="#F6861F" />
        </svg>

        {/* Congrats Heading */}
        <h1 className="text-[32px] font-normal mt-6">Congrats</h1>

        {/* Success Message */}
        <p className="text-center text-[16px] leading-relaxed mt-6">
          You're signed up let's start working on your training plan.
        </p>
      </div>

      <div className="flex-1"></div>

      {/* Begin Button */}
      <button
        onClick={handleBegin}
        className="w-full py-3.5 px-4 rounded-full bg-[#1F7CF6] text-white font-medium mt-auto"
      >
        Let's Begin
      </button>
    </div>
  )
}
