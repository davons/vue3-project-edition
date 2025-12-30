<script setup lang="ts">
defineOptions({ name: 'App' })
const errorStore = useErrorStore()
</script>

<template>
  <Auth>

    <AppError v-if="errorStore.activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <template #default>
          <component :is="Component" :key="route" />
        </template>
        <template #fallback>
          <div class="flex items-center justify-center h-screen">
            <Spinner size="lg" />
          </div>
        </template>
      </Suspense>
    </RouterView>
  </Auth>
</template>

<style scoped></style>
