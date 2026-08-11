import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : {
        auth: {
          getSession: async () => ({
            data: { session: null }
          }),

          onAuthStateChange: () => ({
            data: {
              subscription: {
                unsubscribe: () => {}
              }
            }
          }),

          signInWithPassword: async () => ({
            error: {
              message: 'Supabase environment variables are missing.'
            }
          }),

          signUp: async () => ({
            data: { session: null },
            error: {
              message: 'Supabase environment variables are missing.'
            }
          }),

          signOut: async () => ({
            error: null
          })
        }
      }