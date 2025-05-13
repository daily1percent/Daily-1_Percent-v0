import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase-client"

export async function POST() {
  try {
    const supabase = createServerSupabase()

    // Check if the profiles table exists
    const { error: checkError } = await supabase.from("profiles").select("id").limit(1)

    // If the table doesn't exist, we'll get an error
    if (checkError && checkError.message.includes("does not exist")) {
      console.log("Profiles table doesn't exist, creating it...")

      // Create the table directly using the REST API
      // First, create the table
      const { error: createError } = await supabase.from("_tables").insert({
        name: "profiles",
        schema: "public",
        columns: [
          {
            name: "id",
            type: "uuid",
            is_primary: true,
            is_nullable: false,
          },
          {
            name: "username",
            type: "text",
            is_nullable: true,
          },
          {
            name: "role",
            type: "text",
            is_nullable: true,
          },
          {
            name: "age_group",
            type: "text",
            is_nullable: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            is_nullable: true,
            default_value: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            is_nullable: true,
            default_value: "now()",
          },
        ],
      })

      if (createError) {
        console.error("Error creating profiles table:", createError)
        return NextResponse.json(
          {
            success: false,
            error: createError.message,
            message: "Failed to create profiles table. Please run the SQL manually from the debug page.",
          },
          { status: 500 },
        )
      }

      return NextResponse.json({ success: true, message: "Profiles table created successfully" })
    } else if (checkError) {
      // Some other error occurred
      console.error("Error checking profiles table:", checkError)
      return NextResponse.json({ success: false, error: checkError.message }, { status: 500 })
    }

    // Table exists
    return NextResponse.json({ success: true, message: "Profiles table already exists" })
  } catch (err: any) {
    console.error("Exception initializing database:", err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
