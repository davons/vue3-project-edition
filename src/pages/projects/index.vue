<script lang="ts" setup>
defineOptions({ name: 'ProjectsPage' })

import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../database/types'
import { ref } from 'vue'

const projects = ref<Tables<'project'>[] | null>(null)

const getProjects = async () => {
  try {
    const { data, error: fetchError } = await supabase.from('project').select('*')
    if (fetchError) {
      throw fetchError
    }
    projects.value = data
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}
;(async () => {
  await getProjects()
})()
</script>

<template>
  <div>
    <h2>Projects View</h2>
    <ul v-if="projects && projects.length">
      <li v-for="project in projects" :key="project.id">
        <h3>{{ project.name }}</h3>
      </li>
    </ul>
    <RouterLink to="/">Go to Home</RouterLink>
  </div>
</template>

<style scoped></style>
