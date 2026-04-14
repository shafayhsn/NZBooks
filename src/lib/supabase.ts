import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  url && anon
    ? createClient<Database>(url, anon)
    : null
