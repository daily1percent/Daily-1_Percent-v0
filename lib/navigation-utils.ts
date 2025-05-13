/**
 * Preloads a route by creating a hidden link and triggering prefetch
 * @param route The route to preload
 */
export function preloadRoute(route: string): void {
  if (typeof window === "undefined") return

  // Create a link element
  const link = document.createElement("link")
  link.rel = "prefetch"
  link.href = route
  link.as = "document"

  // Add it to the head to trigger prefetch
  document.head.appendChild(link)

  // Clean up after a short delay
  setTimeout(() => {
    document.head.removeChild(link)
  }, 3000)
}
