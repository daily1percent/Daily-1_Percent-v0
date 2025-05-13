"use client"

import { useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase-client"

export function DatabaseInitializer() {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabase()

  useEffect(() => {
    const checkAndCreateTable = async () => {
      try {
        // Only try to initialize once
        if (initialized) return

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
              setError(createError.message)
            } else {
              console.log("Profiles table created successfully")
              setInitialized(true)
            }
          } catch (createErr: any) {
            console.error("Error creating profiles table:", createErr)
            setError(createErr.message || "Unknown error creating profiles table")
          }
        } else if (checkError) {
          // Some other error occurred
          console.error("Error checking profiles table:", checkError)
          setError(checkError.message)
        } else {
          // Table exists
          console.log("Profiles table already exists")
          setInitialized(true)
        }
      } catch (err: any) {
        console.error("Error initializing database:", err)
        setError(err.message || "Unknown error initializing database")
      }
    }

    checkAndCreateTable()
  }, [initialized, supabase])

  // This component doesn't render anything visible
  return null
}
