-- Create a function to handle profile creation
CREATE OR REPLACE FUNCTION create_profile(
  user_id UUID,
  user_name TEXT,
  user_role TEXT,
  user_age_group TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO profiles (id, username, role, age_group)
  VALUES (user_id, user_name, user_role, user_age_group)
  ON CONFLICT (id) 
  DO UPDATE SET 
    username = user_name,
    role = user_role,
    age_group = user_age_group,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to the function
GRANT EXECUTE ON FUNCTION create_profile TO authenticated;
GRANT EXECUTE ON FUNCTION create_profile TO anon;
