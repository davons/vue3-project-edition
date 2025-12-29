<script lang="ts" setup>
defineOptions({ name: 'SingletaskPage' })

const route = useRoute('/tasks/[slug]')
const taskSlug = route.params.slug as string
</script>

<template>
  <div>
    <h2>Single Task View: {{ taskSlug }}</h2>
    <p>This is the Single Task view content.</p>
    <RouterLink to="/tasks">Go to Tasks</RouterLink>
  </div>
</template>

<style scoped></style>
