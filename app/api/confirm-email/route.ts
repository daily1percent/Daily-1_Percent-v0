import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase-simple"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const supabase = createServerSupabase()

    // Get the user by email
    const { data: userData, error: userError } = await supabase.auth.admin.getUserByEmail(email)

    if (userError || !userData?.user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Try to update the user's email_confirmed_at timestamp
    // Note: This requires admin privileges and may not work depending on your Supabase setup
    try {
      const { error: updateError } = await supabase.auth.admin.updateUserById(userData.user.id, {
        email_confirmed_at: new Date().toISOString(),
      })

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
