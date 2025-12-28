<script lang="ts" setup>
import { ref } from 'vue'
import type { Tables } from '../../../database/types'
import { supabase } from '@/lib/supabaseClient'

defineOptions({ name: 'TasksPage' })

const tasks = ref<Tables<'task'>[] | null>(null)

const getTasks = async () => {
  try {
    const { data, error: fetchError } = await supabase.from('task').select('*')
    if (fetchError) {
      throw fetchError
    }
    tasks.value = data
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

;(async () => {
  await getTasks()
})()
</script>

<template>
  <div>
    <h2>Tasks View</h2>
    <ul v-if="tasks && tasks.length">
      <li v-for="task in tasks" :key="task.id">
        <h3>{{ task.name }}</h3>
      </li>
    </ul>
    <RouterLink to="/">Go to Home</RouterLink>
  </div>
</template>

<style scoped></style>
