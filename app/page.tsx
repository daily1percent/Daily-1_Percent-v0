export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 bg-[#1E1E1E]">
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
        {/* Sign Up Button */}
        <a href="/role-selection" className="w-full block">
          <button className="w-full bg-[#1F7CF6] text-white py-3 px-4 rounded-full font-medium">Sign Up</button>
        </a>

        {/* Login Button */}
        <a href="/login" className="w-full block">
          <button className="w-full bg-white text-[#1F7CF6] py-3 px-4 rounded-full font-medium">Login</button>
        </a>
      </div>
    </div>
  )
}
