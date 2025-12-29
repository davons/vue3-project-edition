<script setup lang="ts">
defineOptions({ name: 'App' })
</script>

<template>
  <Auth>
    <RouterView v-slot="{ Component, route }">
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
