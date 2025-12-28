<script lang="ts" setup>
import { useRoute } from 'vue-router'

defineOptions({ name: 'SingleProjectPage' })

const route = useRoute('/projects/[id]')
const projectId = route.params.id as string
console.log('Project ID:', projectId)
</script>

<template>
  <div>
    <h2>Single Project View: {{ projectId }}</h2>
    <p>This is the Single Project view content.</p>
    <RouterLink to="/projects">Go to Projects</RouterLink>
  </div>
</template>

<style scoped></style>
