<script lang="ts" setup>
defineOptions({ name: 'SingleProjectPage' })

const route = useRoute('/projects/[slug]')
const projectSlug = route.params.slug as string
</script>

<template>
  <div>
    <h2>Single Project View: {{ projectSlug }}</h2>
    <p>This is the Single Project view content.</p>
    <RouterLink to="/projects">Go to Projects</RouterLink>
  </div>
</template>

<style scoped></style>
