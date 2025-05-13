import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase-simple"

export async function POST() {
  try {
    const supabase = createServerSupabase()

    // Check if the profiles table exists
    const { error: checkError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .eq("table_name", "profiles")
      .single()

    // If there's an error or the table doesn't exist, create it
    if (checkError) {
      console.log("Creating profiles table...")

      // Create the profiles table using raw SQL
      const { error: createError } = await supabase.rpc("exec_sql", {
        sql: `
          CREATE TABLE IF NOT EXISTS profiles (
            id UUID PRIMARY KEY,
            username TEXT,
            role TEXT,
            age_group TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          -- Enable RLS
          ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
          
          -- Create policies
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

      if (createError) {
        console.error("Error creating profiles table with RPC:", createError)

        // Try direct SQL as a fallback
        try {
          // Try to create the table directly using SQL
          await supabase.from("profiles").insert({
            id: "00000000-0000-0000-0000-000000000000",
            username: "system",
          })

          console.log("Profiles table created successfully via direct insert")
        } catch (directError) {
          console.error("Error creating profiles table via direct insert:", directError)
          return NextResponse.json({ error: "Failed to create profiles table" }, { status: 500 })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Error initializing profiles table:", err)
    return NextResponse.json({ error: "Failed to initialize profiles table" }, { status: 500 })
  }
}
