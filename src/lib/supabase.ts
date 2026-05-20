import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://vyfifpqgppomclfievmv.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZmlmcHFncHBvbWNsZmlldm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTU0OTUsImV4cCI6MjA5NDgzMTQ5NX0.VsQj5RwEVQxOjx5b4s_IJ-iZx7BnJ0dL-EVHJhL6JUA"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)