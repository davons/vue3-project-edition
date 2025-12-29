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

export const taskBySlugWithProjectQuery = (slug: string) =>
  supabase
    .from('task')
    .select(
      `
    *,
    project( id, name, slug )
    `,
    )
    .eq('slug', slug)
    .single()
export type TaskBySlugWithProject = QueryData<ReturnType<typeof taskBySlugWithProjectQuery>>

export const getTaskBySlugWithProject = async (
  slug: string,
): Promise<TaskBySlugWithProject | null> => {
  const { data, error } = await taskBySlugWithProjectQuery(slug)

  if (error) {
    console.error('Error fetching task by slug with project:', error)
    return null
  }

  return data
}
