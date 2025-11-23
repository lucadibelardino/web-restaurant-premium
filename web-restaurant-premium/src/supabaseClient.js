
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qtihbjttkyvqzocjgxqh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aWhianR0a3l2cXpvY2pneHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MTc3OTEsImV4cCI6MjA3OTI5Mzc5MX0.D4V8TICLLUwneIOyCM8yHacZZkKf_8Mamb6Q0eH1X94'

export const supabase = createClient(supabaseUrl, supabaseKey)
