"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import BottomNav from "@/components/shared/bottom-nav"

export default function TrainingPage() {
  const trainingModules = [
    { name: "Breathwork", route: "/training/breathwork", completed: false },
    { name: "Visualization", route: "/training/visualization", completed: false },
    { name: "Focus Training", route: "/training/focus", completed: false },
    { name: "Affirmations", route: "/training/affirmations", completed: false },
    { name: "Reflection", route: "/training/reflection", completed: false },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#1E1E1E] text-white">
      <div className="flex-1 flex flex-col p-5">
        {/* Logo */}
        <div className="w-full flex justify-center pt-4">
          <div className="flex items-center">
            <span className="text-[#FF9100]">▲</span>
            <span className="text-white text-sm font-medium ml-1">DAILY</span>
            <span className="text-[#FF9100] text-sm font-medium mx-0.5">1</span>
            <span className="text-white text-sm font-medium">PERCENT</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-6 mb-4">Daily Training</h1>

        <div className="space-y-3">
          {trainingModules.map((module, index) => (
            <Link href={module.route} key={index}>
              <div className="bg-[#2A2A2A] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <span>{module.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
