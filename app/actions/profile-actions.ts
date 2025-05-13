"use server"

import { createServerSupabase } from "@/lib/supabase"

export async function createUserProfile(userId: string, username: string, role: string, ageGroup: string) {
  try {
    const supabase = createServerSupabase()

    console.log("Creating profile for user:", userId)

    // Try to create the profile
    const { error } = await supabase.from("profiles").insert({
      id: userId,
      username,
      role,
      age_group: ageGroup,
    })

    if (error) {
      console.error("Server profile creation error:", error)
      return { success: false, error }
    }

    return { success: true }
  } catch (err) {
    console.error("Server profile creation exception:", err)
    return { success: false, error: err }
  }
}
