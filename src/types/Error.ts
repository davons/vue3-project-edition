import type { PostgrestError } from "@supabase/supabase-js"

export interface CustomerError extends Error {
  customCode?: number
}
export interface CustomerPostgrestError extends PostgrestError {
  statusCode?: number
}
