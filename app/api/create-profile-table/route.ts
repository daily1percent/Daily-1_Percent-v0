import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

export async function POST() {
  try {
    console.log("Creating profiles table...")

    // Try direct SQL approach first
    try {
      const { data, error } = await supabaseAdmin.rpc("exec_sql", {
        sql: `
          DROP TABLE IF EXISTS profiles;
          
          CREATE TABLE profiles (
            id UUID PRIMARY KEY,
            username TEXT,
            role TEXT,
            age_group TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
          
          DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
          DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
          DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
          
          CREATE POLICY "Profiles are viewable by everyone" 
          ON profiles FOR SELECT 
          USING (true);
          
          CREATE POLICY "Users can update their own profile" 
          ON profiles FOR UPDATE 
          USING (auth.uid() = id);
          
          CREATE POLICY "Users can insert their own profile" 
          ON profiles FOR INSERT 
          WITH CHECK (auth.uid() = id);
        `,
      })

      if (error) {
        console.error("Error using RPC to create table:", error)
        // Fall back to direct SQL
      } else {
        return NextResponse.json({ success: true, method: "rpc" })
      }
    } catch (rpcErr) {
      console.error("RPC approach failed:", rpcErr)
      // Continue to try direct SQL
    }

    // If RPC failed, try direct SQL
    const { error } = await supabaseAdmin.from("profiles").delete().neq("id", "00000000-0000-0000-0000-000000000000")

    if (error && !error.message.includes("does not exist")) {
      console.error("Error deleting from profiles:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Create the table
    const { error: createError } = await supabaseAdmin.rpc("create_profiles_table_if_not_exists")

    if (createError) {
      console.error("Error creating profiles table:", createError)
      return NextResponse.json({ success: false, error: createError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, method: "direct" })
  } catch (err: any) {
    console.error("Exception creating profiles table:", err)
    return NextResponse.json({ success: false, error: err.message || "An error occurred" }, { status: 500 })
  }
}
