import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const projectQuery = supabase.from('project').select('*')
export type Projects = QueryData<typeof projectQuery>
export const getProjects = async (): Promise<Projects | null> => {
  const { data, error } = await projectQuery

  if (error) {
    console.error('Error fetching projects:', error)
    return null
  }

  return data
}
