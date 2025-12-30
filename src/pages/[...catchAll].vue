<script lang="ts" setup>
  const pageStore = usePageStore()

  pageStore.setPageTitle('Not Found')
  useErrorStore().setError({ error: 'Page not found', customCode: 404 })

</script>

<template>
  <AppError />
</template>

<style scoped></style>
