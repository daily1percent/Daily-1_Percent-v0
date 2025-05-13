"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { getSupabase } from "@/lib/supabase-client"
import type { Profile } from "@/lib/supabase-client"

type AuthContextType = {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (profile: Partial<Profile>) => Promise<{ error: any }>
  isEmailConfirmed: boolean
  refreshProfile: () => Promise<void>
  resendConfirmationEmail: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)
  const router = useRouter()
  const supabase = getSupabase()

  // Get the site URL - use environment variable or fallback to window.location.origin
  const getSiteUrl = () => {
    // For production, use the NEXT_PUBLIC_SITE_URL if available
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL
    }

    // For development or if NEXT_PUBLIC_SITE_URL is not set, use window.location.origin
    if (typeof window !== "undefined") {
      // Remove any trailing slash
      return window.location.origin.replace(/\/$/, "")
    }

    // Fallback
    return "https://daily-1-percent.vercel.app"
  }

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching profile:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Unexpected error fetching profile:", error)
      return null
    }
  }

  // Refresh the user's profile
  const refreshProfile = async () => {
    if (!user) return

    const profileData = await fetchProfile(user.id)
    if (profileData) {
      setProfile(profileData)
    }
  }

  // Resend confirmation email
  const resendConfirmationEmail = async (email: string) => {
    try {
      const siteUrl = getSiteUrl()
      console.log(`Using site URL for email redirect: ${siteUrl}/confirm`)

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${siteUrl}/confirm`,
        },
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true)

      try {
        // Get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        setSession(session)
        setUser(session?.user ?? null)

        // Check if email is confirmed
        if (session?.user) {
          setIsEmailConfirmed(session.user.email_confirmed_at !== null)

          // Fetch the user's profile
          const profileData = await fetchProfile(session.user.id)
          setProfile(profileData)
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      // Check if email is confirmed
      if (session?.user) {
        setIsEmailConfirmed(session.user.email_confirmed_at !== null)

        // Fetch the user's profile
        const profileData = await fetchProfile(session.user.id)
        setProfile(profileData)
      } else {
        setProfile(null)
        setIsEmailConfirmed(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Sign up a new user
  const signUp = async (email: string, password: string, username: string) => {
    try {
      const siteUrl = getSiteUrl()
      console.log(`Using site URL for signup redirect: ${siteUrl}/confirm`)

      // Sign up the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: `${siteUrl}/confirm`,
        },
      })

      if (error) {
        console.error("Signup error:", error)
        return { error }
      }

      if (!data.user) {
        return { error: new Error("Failed to create user account") }
      }

      // Store user metadata
      const userRole = localStorage.getItem("userRole") || "Athlete"
      const userAge = localStorage.getItem("userAge") || "18+"

      // Try to create profile directly first
      try {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          username,
          role: userRole,
          age_group: userAge,
        })

        if (profileError) {
          console.warn("Direct profile creation error:", profileError)

          // If direct creation fails, try using the API endpoint
          try {
            const response = await fetch("/api/create-profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: data.user.id,
                username,
                role: userRole,
                ageGroup: userAge,
              }),
            })

            const result = await response.json()

            if (!response.ok) {
              console.warn("API profile creation warning:", result.error)
              // Continue anyway, as the user account was created
            }
          } catch (apiErr) {
            console.warn("API profile creation exception:", apiErr)
            // Continue anyway, as the user account was created
          }
        }
      } catch (directErr) {
        console.warn("Direct profile creation exception:", directErr)
        // Continue anyway, as the user account was created
      }

      return { error: null }
    } catch (error) {
      console.error("Unexpected error during signup:", error)
      return { error }
    }
  }

  // Sign in an existing user
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      // Explicitly check if email is confirmed
      if (data.user && !data.user.email_confirmed_at) {
        setIsEmailConfirmed(false)
        return { error: new Error("Email not confirmed") }
      }

      setIsEmailConfirmed(true)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Sign out the current user
  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  // Update the user's profile
  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) return { error: "No user logged in" }

    try {
      const { error } = await supabase.from("profiles").update(profileData).eq("id", user.id)

      if (!error) {
        // Update local profile state
        setProfile((prev) => (prev ? { ...prev, ...profileData } : null))
      }

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    user,
    profile,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isEmailConfirmed,
    refreshProfile,
    resendConfirmationEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
