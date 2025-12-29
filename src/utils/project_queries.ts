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

export const projectBySlugWithTasksQuery = (slug: string) =>
  supabase
    .from('project')
    .select('*, task (id, name, slug, status, due_date)')
    .eq('slug', slug)
    .single()
export type ProjectBySlugWithTasks = QueryData<ReturnType<typeof projectBySlugWithTasksQuery>>

export const getProjectBySlugWithTasks = async (
  slug: string,
): Promise<ProjectBySlugWithTasks | null> => {
  const { data, error } = await projectBySlugWithTasksQuery(slug)

  if (error) {
    console.error('Error fetching project by slug with tasks:', error)
    return null
  }

  return data
}
