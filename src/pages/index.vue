<script lang="ts" setup>
defineOptions({ name: 'HomePage' })
const pageStore = usePageStore()
pageStore.setPageTitle('My Dashboard')
</script>

<template>
  <div class="prose dark:prose-invert max-w-full">
    <h2>Welcome to the Home Page</h2>
    <p>This is the main landing page of the application.</p>
  </div>
</template>

<style scoped></style>
