"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { getSupabase } from "@/lib/supabase-simple"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabase()

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
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Sign up a new user
  const signUp = async (email: string, password: string, username: string) => {
    try {
      // Sign up the user with Supabase - NO email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          // No email confirmation required
          emailRedirectTo: undefined,
        },
      })

      if (error) {
        console.error("Signup error:", error)
        return { error }
      }

      if (!data.user) {
        return { error: new Error("Failed to create user account") }
      }

      // Auto sign in after signup
      if (data.session) {
        setSession(data.session)
        setUser(data.user)

        // Redirect to dashboard
        router.push("/dashboard")
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

      // Redirect to dashboard
      router.push("/dashboard")
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Sign out the current user
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    router.push("/")
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useSimpleAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useSimpleAuth must be used within a SimpleAuthProvider")
  }
  return context
}
