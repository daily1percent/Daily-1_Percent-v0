import { getSupabase } from "./supabase"

export async function checkProfilesTable() {
  const supabase = getSupabase()

  try {
    // Check if the profiles table exists
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .eq("table_name", "profiles")

    if (tablesError) {
      console.error("Error checking tables:", tablesError)
      return { exists: false, error: tablesError }
    }

    const tableExists = tables && tables.length > 0

    if (!tableExists) {
      return { exists: false, error: null }
    }

    // Check the columns in the profiles table
    const { data: columns, error: columnsError } = await supabase
      .from("information_schema.columns")
      .select("column_name, data_type")
      .eq("table_schema", "public")
      .eq("table_name", "profiles")

    if (columnsError) {
      console.error("Error checking columns:", columnsError)
      return { exists: true, columns: [], error: columnsError }
    }

    return { exists: true, columns, error: null }
  } catch (error) {
    console.error("Unexpected error checking profiles table:", error)
    return { exists: false, error }
  }
}

export async function createProfilesTable() {
  const supabase = getSupabase()

  try {
    // Create the profiles table if it doesn't exist
    const { error } = await supabase.rpc("create_profiles_table")

    if (error) {
      console.error("Error creating profiles table:", error)
      return { success: false, error }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Unexpected error creating profiles table:", error)
    return { success: false, error }
  }
}
