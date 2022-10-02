import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jwxluouysvjcljgkrfgp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3eGx1b3V5c3ZqY2xqZ2tyZmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA5ODQzMDUsImV4cCI6MTk3NjU2MDMwNX0.8Sh865N0N3LvywBVRuDyAMggi6aNFBfLLp4a1ex1p9I";

export default createClient(supabaseUrl, supabaseAnonKey);
