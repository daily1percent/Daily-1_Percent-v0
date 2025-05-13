"use client"
import { useEffect, useState } from "react"

export function DbInitializer() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initDb = async () => {
      if (initialized) return

      try {
        const response = await fetch("/api/init-profiles", { method: "POST" })
        if (response.ok) {
          console.log("Database initialized successfully")
          setInitialized(true)
        } else {
          console.error("Database initialization failed")
        }
      } catch (error) {
        console.error("Failed to initialize database:", error)
      }
    }

    initDb()
  }, [initialized])

  return null // This component doesn't render anything
}

export default DbInitializer
