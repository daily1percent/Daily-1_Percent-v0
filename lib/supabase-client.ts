import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Types for user profile
export type Profile = {
  id: string
  username: string | null
  role: string | null
  age_group: string | null
  created_at?: string
  updated_at?: string
}

// Create a singleton instance for client-side usage
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseInstance && typeof window !== "undefined") {
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }

  return supabaseInstance || createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// For server components and API routes
export const createServerSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
