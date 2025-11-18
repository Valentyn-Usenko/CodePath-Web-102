import { createClient } from '@supabase/supabase-js'


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ekstysjazqhhlptevjuc.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrc3R5c2phenFoaGxwdGV2anVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzODM4MzMsImV4cCI6MjA3Nzk1OTgzM30.GTwr7-AkSkDAKES1ruTvrdp4vHhhI9VtvhkOa0CpeuI'


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)