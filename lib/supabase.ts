import { createClient } from "@supabase/supabase-js"

// Types for user profile
export type Profile = {
  id: string
  username: string | null
  role: string | null
  age_group: string | null
  created_at: string
  updated_at: string
}

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton instance for client-side usage
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (!supabaseInstance && typeof window !== "undefined") {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      // Add debug logging
      global: {
        fetch: (...args) => {
          console.log("Supabase fetch:", args[0])
          return fetch(...args)
        },
      },
    })
  }
  return (
    supabaseInstance ||
    createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  )
}

// For server components
export const createServerSupabase = () => {
  return createClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
