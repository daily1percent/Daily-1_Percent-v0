-- Create a function to create the profiles table if it doesn't exist
CREATE OR REPLACE FUNCTION create_profiles_table_if_not_exists()
RETURNS BOOLEAN AS $$
BEGIN
  -- Create the table if it doesn't exist
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
  
  -- Drop existing policies to avoid conflicts
  DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
  
  -- Create new policies
  CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);
  
  CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);
  
  CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating profiles table: %', SQLERRM;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION create_profiles_table_if_not_exists TO service_role;
GRANT EXECUTE ON FUNCTION create_profiles_table_if_not_exists TO authenticated;
GRANT EXECUTE ON FUNCTION create_profiles_table_if_not_exists TO anon;
