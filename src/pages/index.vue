<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

defineOptions({ name: 'IndexPage' })

console.log(supabase)

const projects = ref([])
const loading = ref(true)
const error = ref<string | null>(null)

const getProjects = async () => {
  try {
    const { data, error: fetchError } = await supabase.from('project').select('*')
    if (fetchError) {
      error.value = fetchError.message
      console.error('Error fetching projects:', fetchError)
      return []
    }
    return data || []
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error:', err)
    return []
  }
}

onMounted(async () => {
  projects.value = await getProjects()
  console.log('Fetched projects:', projects.value)
  loading.value = false
})
</script>

<template>
  <div>
    <h2>Projects</h2>
    <div v-if="loading" class="loading">Loading projects...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <p v-if="projects.length === 0">No projects found.</p>
      <ul v-else>
        <li v-for="project in projects" :key="project.id">
          <h3>{{ project.name }}</h3>
          <p>Status: {{ project.status }}</p>
          <p>Slug: {{ project.slug }}</p>
        </li>
      </ul>
    </div>
    <RouterLink to="/projects">Go to Projects</RouterLink>
  </div>
</template>

<style scoped>
.loading {
  color: #999;
}

.error {
  color: red;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
}
</style>
