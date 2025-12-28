<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../database/types'

defineOptions({ name: 'IndexPage' })

const projects = ref<Tables<'project'>[] | null>(null)

const getProjects = async () => {
  try {
    const { data, error: fetchError } = await supabase.from('project').select('*')
    if (fetchError) {
      return []
    }
    return data || []
  } catch (err) {
    return []
  }
}

;(async () => {
  projects.value = await getProjects()
})()
</script>

<template>
  <div>
    <h2>Projects</h2>
    <ul v-if="projects && projects.length">
      <li v-for="project in projects" :key="project.id">
        <h3>{{ project.name }}</h3>
      </li>
    </ul>
    <RouterLink to="/projects">Go to Projects</RouterLink>
  </div>
</template>

<style scoped></style>
