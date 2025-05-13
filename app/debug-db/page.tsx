"use client"
import { useState } from "react"
import { getSupabase } from "@/lib/supabase-simple"

export default function DebugDbPage() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = getSupabase()

  const checkProfilesTable = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Check if the profiles table exists
      const { data: tables, error: tablesError } = await supabase
        .from("information_schema.tables")
        .select("table_name")
        .eq("table_schema", "public")
        .eq("table_name", "profiles")

      if (tablesError) {
        setError(`Error checking tables: ${tablesError.message}`)
        return
      }

      const tableExists = tables && tables.length > 0

      if (!tableExists) {
        setResult({ exists: false, message: "Profiles table does not exist" })
        return
      }

      // Check the columns in the profiles table
      const { data: columns, error: columnsError } = await supabase
        .from("information_schema.columns")
        .select("column_name, data_type")
        .eq("table_schema", "public")
        .eq("table_name", "profiles")

      if (columnsError) {
        setError(`Error checking columns: ${columnsError.message}`)
        return
      }

      setResult({ exists: true, columns })
    } catch (err: any) {
      setError(`Unexpected error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const createProfilesTable = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/init-profiles", { method: "POST" })
      const data = await response.json()

      if (!response.ok) {
        setError(`API error: ${data.error || "Unknown error"}`)
        return
      }

      setResult({ created: true, message: "Profiles table created or already exists" })
    } catch (err: any) {
      setError(`Unexpected error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Database Debug</h1>

      <div className="space-y-4 mb-8">
        <button
          onClick={checkProfilesTable}
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Profiles Table"}
        </button>

        <button
          onClick={createProfilesTable}
          disabled={loading}
          className="w-full py-3 px-4 bg-green-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Profiles Table"}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/50 p-4 rounded-lg mb-4">
          <h2 className="font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-blue-900/50 p-4 rounded-lg">
          <h2 className="font-bold mb-2">Result</h2>
          <pre className="whitespace-pre-wrap overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8 bg-gray-800/50 p-4 rounded-lg">
        <h2 className="font-bold mb-2">Manual SQL</h2>
        <p className="mb-4 text-sm">If automatic methods fail, you can run this SQL in the Supabase SQL editor:</p>
        <pre className="text-xs bg-black/50 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
          {`-- Create the profiles table with the correct structure
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

-- Grant permissions
GRANT ALL ON profiles TO service_role;
GRANT SELECT ON profiles TO anon;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;`}
        </pre>
      </div>
    </div>
  )
}
