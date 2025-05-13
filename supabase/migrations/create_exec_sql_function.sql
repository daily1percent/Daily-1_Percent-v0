-- Create a function to execute SQL commands
CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to the service role
GRANT EXECUTE ON FUNCTION exec_sql TO service_role;
