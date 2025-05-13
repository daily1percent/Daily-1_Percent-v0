-- Create a function to create the profiles table
CREATE OR REPLACE FUNCTION create_profiles_table_if_not_exists()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the table exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) THEN
    -- Create the table
    CREATE TABLE profiles (
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
    GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;
    
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating profiles table: %', SQLERRM;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION create_profiles_table_if_not_exists TO service_role;
