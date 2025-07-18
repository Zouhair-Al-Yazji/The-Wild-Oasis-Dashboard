import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://afqrccbryeqkzkwavuhf.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcXJjY2JyeWVxa3prd2F2dWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyODY1MTUsImV4cCI6MjA1ODg2MjUxNX0.ctf5RYN11iHsgEMGB5P2CIfdU8Dkmv-UYnbou-IN-bQ";

const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcXJjY2JyeWVxa3prd2F2dWhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NjUxNSwiZXhwIjoyMDU4ODYyNTE1fQ.r3MCx-pbLajVaQbe5sVZeHp0ENy5v6NOh4YHYh8bOs4";

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
