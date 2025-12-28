<script lang="ts" setup>
import { useRoute } from 'vue-router'

defineOptions({ name: 'SingletaskPage' })

const route = useRoute('/tasks/[slug]')
const taskSlug = route.params.slug as string
console.log('Task Slug:', taskSlug)
</script>

<template>
  <div>
    <h2>Single Task View: {{ taskSlug }}</h2>
    <p>This is the Single Task view content.</p>
    <RouterLink to="/tasks">Go to Tasks</RouterLink>
  </div>
</template>

<style scoped></style>
