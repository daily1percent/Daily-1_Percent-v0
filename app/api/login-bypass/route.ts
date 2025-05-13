import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase-simple"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const supabase = createServerSupabase()

    // Try to sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // If the error is about email confirmation, try to get the user
      if (error.message.includes("Email not confirmed")) {
        // Get the user by email
        const { data: userData, error: userError } = await supabase.auth.admin.getUserByEmail(email)

        if (userError || !userData?.user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Return the user info so the client can handle it
        return NextResponse.json({
          success: false,
          emailNotConfirmed: true,
          user: {
            id: userData.user.id,
            email: userData.user.email,
          },
        })
      }

      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json({ success: true, session: data.session })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
