import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const projectQuery = supabase.from('project').select('*')

export type Projects = QueryData<typeof projectQuery>

export const getProjects = async (): Promise<Projects | null> => {
  const { data, error, status } = await projectQuery

  if (error) {
     useErrorStore().setError({
        error: error,
        customCode: status
     })

     return null;
  }

  return data
}

export const projectBySlugWithTasksQuery = (slug: string) =>
  supabase
    .from('project')
    .select('*, task (id, name, slug, status, due_date)')
    .eq('slug', slug)
    .maybeSingle()
export type ProjectBySlugWithTasks = QueryData<ReturnType<typeof projectBySlugWithTasksQuery>>

export const getProjectBySlugWithTasks = async (
  slug: string,
): Promise<ProjectBySlugWithTasks | null> => {
  const { data, error, status } = await projectBySlugWithTasksQuery(slug)

  if (error) {
     useErrorStore().setError({
        error: error,
        customCode: status
    })

     return null;
  }

  return data
}
