import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('task').select(
  `
  *,
  project( id, name, slug )
  `,
)
export type TaksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export const getTasks = async (): Promise<TaksWithProjects | null> => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) {
    console.error('Error fetching tasks with projects:', error)
    return null
  }

  return data
}
