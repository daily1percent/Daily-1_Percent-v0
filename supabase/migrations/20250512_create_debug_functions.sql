-- Create a function to create the profiles table
CREATE OR REPLACE FUNCTION create_profiles_table()
RETURNS BOOLEAN AS $$
DECLARE
  table_exists BOOLEAN;
BEGIN
  -- Check if the table exists
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) INTO table_exists;
  
  -- Create the table if it doesn't exist
  IF NOT table_exists THEN
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
    
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a manual function with SQL statements
CREATE OR REPLACE FUNCTION create_profiles_table_manual()
RETURNS VOID AS $$
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION create_profiles_table TO authenticated;
GRANT EXECUTE ON FUNCTION create_profiles_table TO anon;
GRANT EXECUTE ON FUNCTION create_profiles_table_manual TO authenticated;
GRANT EXECUTE ON FUNCTION create_profiles_table_manual TO anon;
