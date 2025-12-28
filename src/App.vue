<script setup lang="ts">
import Auth from './components/layout/main/Auth.vue'
defineOptions({ name: 'App' })
</script>

<template>
  <Auth>
    <RouterView />
  </Auth>
</template>

<style scoped></style>
