"use client"
import { useRouter } from "next/navigation"
import { Home, Calendar, Compass, User, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BreathworkWelcomePage() {
  const router = useRouter()

  const handleBegin = () => {
    router.push("/breathwork/exercise")
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleSkip = () => {
    router.push("/breathwork/exercise")
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1E1E1E] text-white pb-16">
      {/* Top section with icon and wordmark */}
      <div className="flex flex-col items-center mt-12">
        {/* Icon */}
        <img src="/images/D1P_Icon_01.png" alt="Daily 1 Percent Icon" className="w-[80px] h-[80px] object-contain" />

        {/* Wordmark - 24px below icon */}
        <img src="/images/D1P_Wordmark.png" alt="Daily 1 Percent" className="h-8 mt-6 object-contain" />
      </div>

      {/* Main title - 132px below wordmark */}
      <h1 className="text-2xl font-bold mt-[132px] text-center">Welcome to Breath work</h1>

      {/* Description paragraph - 24px below title */}
      <p className="text-sm leading-relaxed text-center mt-6 max-w-[85%]">
        Box breathing helps you stay calm and focused under pressure. Inhale, hold, exhale, and repeat — just follow the
        circle. Let's build control, one breath at a time.
      </p>

      {/* Primary CTA button - 48px below paragraph */}
      <Button onClick={handleBegin} className="w-[85%] py-4 px-6 mt-12" size="lg">
        Begin Breathing Exercise
      </Button>

      {/* Secondary navigation - below primary CTA */}
      <div className="flex justify-center gap-4 mt-6 w-[85%]">
        <Button onClick={handleBack} variant="ghost" className="flex-1">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        <Button onClick={handleSkip} variant="ghost" className="flex-1">
          Skip <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Bottom Navigation Bar */}
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

        <Link href="/account" className="flex flex-col items-center text-gray-400">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  )
}
