import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase-client"

export async function POST(request: Request) {
  try {
    const { userId, username, role, ageGroup } = await request.json()

    if (!userId || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createServerSupabase()

    // First, check if the profiles table exists
    const { error: checkError } = await supabase.from("profiles").select("id").limit(1)

    // If the table doesn't exist, try to create it
    if (checkError && checkError.message.includes("does not exist")) {
      console.log("Profiles table doesn't exist, attempting to create it...")

      try {
        // Try to create the table directly
        const { error: createError } = await supabase
          .from("profiles")
          .insert({
            id: "00000000-0000-0000-0000-000000000000", // Dummy ID for testing
            username: "system_init",
          })
          .select()

        if (createError && !createError.message.includes("already exists")) {
          console.error("Error creating profiles table:", createError)
          return NextResponse.json(
            {
              error: "Failed to create profiles table. Please visit /debug to initialize the database.",
              details: createError.message,
            },
            { status: 500 },
          )
        }
      } catch (createErr: any) {
        console.error("Error creating profiles table:", createErr)
        return NextResponse.json(
          {
            error: "Exception creating profiles table. Please visit /debug to initialize the database.",
            details: createErr.message,
          },
          { status: 500 },
        )
      }
    } else if (checkError) {
      // Some other error occurred during check
      console.error("Error checking profiles table:", checkError)
      // Continue anyway, as we'll try to insert the profile
    }

    // Create the profile using the service role key (bypasses RLS)
    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: userId,
          username,
          role: role || null,
          age_group: ageGroup || null,
        },
        { onConflict: "id" },
      )
      .select()

    if (error) {
      console.error("Profile creation error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, profile: data })
  } catch (err: any) {
    console.error("API profile creation exception:", err)
    return NextResponse.json({ error: err.message || "An error occurred" }, { status: 500 })
  }
}
