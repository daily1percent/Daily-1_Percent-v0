import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/role-selection",
  "/age-selection",
  "/parent-permission",
  "/parent-approval",
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(
    (route) => req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route + "/"),
  )

  // Check auth status
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and trying to access protected route, redirect to login
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL("/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If session exists and trying to access login/signup, redirect to dashboard
  if (session && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")) {
    const redirectUrl = new URL("/dashboard", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
}
