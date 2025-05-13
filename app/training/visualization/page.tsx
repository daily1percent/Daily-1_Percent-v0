"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/shared/bottom-nav"

export default function VisualizationPage() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-white">
      <div className="flex-1 flex flex-col">
        {/* Logo */}
        <div className="w-full flex justify-center pt-4 px-5">
          <div className="flex items-center">
            <span className="text-[#FF9100]">▲</span>
            <span className="text-white text-sm font-medium ml-1">DAILY</span>
            <span className="text-[#FF9100] text-sm font-medium mx-0.5">1</span>
            <span className="text-white text-sm font-medium">PERCENT</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-5">
          <div className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <h1 className="text-2xl font-bold text-center mb-4">Visualization</h1>
            <p className="text-center text-gray-300">
              Welcome to the visualization exercise. This is the second step in your daily training routine.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
