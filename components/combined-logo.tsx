export function CombinedLogo() {
  return (
    <div className="flex flex-col items-center">
      <img src="/images/d1p-icon.png" alt="Daily 1 Percent Logo" className="w-24 h-24 mb-4" />
      <div className="flex items-center">
        <span className="text-white text-3xl font-medium tracking-wide">DAILY</span>
        <img src="/images/d1p-wordmark.png" alt="1" className="h-8 mx-1" />
        <span className="text-white text-3xl font-medium tracking-wide">PERCENT</span>
      </div>
    </div>
  )
}
