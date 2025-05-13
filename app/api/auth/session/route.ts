import { NextResponse } from "next/server"
import { getSupabase } from "@/lib/supabase-simple"

export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json({ session: data.session })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
