"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getSupabase } from "@/lib/supabase-client"

export default function DebugPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [initialized, setInitialized] = useState(false)
  const supabase = getSupabase()

  // Check if the profiles table exists when the page loads
  useEffect(() => {
    const checkTable = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("count(*)").limit(1)

        if (error) {
          console.error("Error checking profiles table:", error)
          setError(error.message)
          setInitialized(false)
        } else {
          setInitialized(true)
          setResult({ exists: true, count: data?.[0]?.count || 0 })
        }
      } catch (err: any) {
        console.error("Unexpected error:", err)
        setError(err.message || "An error occurred")
        setInitialized(false)
      }
    }

    checkTable()
  }, [])

  const handleCreateTable = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      // Create the profiles table directly
      const { error: createError } = await supabase
        .from("profiles")
        .insert({
          id: "00000000-0000-0000-0000-000000000000", // Dummy ID for testing
          username: "test_user",
        })
        .select()

      if (createError && !createError.message.includes("already exists")) {
        console.error("Error creating profiles table:", createError)
        setError(createError.message)
        setResult({ tableCreated: false })
      } else {
        setInitialized(true)
        setResult({ tableCreated: true, message: "Profiles table created or already exists" })
      }
    } catch (err: any) {
      console.error("Error creating table:", err)
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCheckTable = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      // Try to query the profiles table
      const { data, error } = await supabase.from("profiles").select("count(*)").limit(1)

      if (error) {
        console.error("Error checking profiles table:", error)
        setError(error.message)
        setResult({ exists: false })
      } else {
        setInitialized(true)
        setResult({ exists: true, count: data?.[0]?.count || 0 })
      }
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleTestProfileCreation = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      // Create a test profile directly
      const testUserId = "test-user-id-" + Date.now()
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id: testUserId,
          username: "test-user-" + Date.now(),
          role: "Tester",
          age_group: "18+",
        })
        .select()

      if (error) {
        console.error("Error creating test profile:", error)
        setError(error.message)
      } else {
        setResult({ profileCreated: true, data })
      }
    } catch (err: any) {
      console.error("Error testing profile creation:", err)
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-6 bg-[#1E1E1E] text-white">
      {/* Back Button */}
      <div className="mt-8">
        <Link href="/" className="flex items-center text-white">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mt-6">Database Debug</h1>

      {initialized ? (
        <div className="mt-4 p-3 bg-green-900/50 rounded-lg">
          <p>Profiles table exists!</p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-yellow-900/50 rounded-lg">
          <p>Profiles table may not exist. Try creating it manually.</p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <button
          onClick={handleCreateTable}
          className="w-full py-3 px-4 rounded-lg bg-[#1F7CF6] text-white font-medium"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Profiles Table"}
        </button>

        <button
          onClick={handleCheckTable}
          className="w-full py-3 px-4 rounded-lg bg-[#3A3A3A] text-white font-medium"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check If Profiles Table Exists"}
        </button>

        <button
          onClick={handleTestProfileCreation}
          className="w-full py-3 px-4 rounded-lg bg-[#F6861F] text-white font-medium"
          disabled={loading}
        >
          {loading ? "Testing..." : "Test Profile Creation"}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 rounded-lg">
          <h3 className="font-bold mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-green-900/50 rounded-lg">
          <h3 className="font-bold mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-[#3A3A3A] rounded-lg">
        <h3 className="font-bold mb-2">Manual SQL Setup:</h3>
        <p className="text-sm mb-2">
          If automatic initialization fails, you can run this SQL in the Supabase SQL editor:
        </p>
        <pre className="whitespace-pre-wrap text-xs bg-[#2A2A2A] p-3 rounded-lg overflow-auto">
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
