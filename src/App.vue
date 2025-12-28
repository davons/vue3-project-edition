<script setup lang="ts">
defineOptions({ name: 'App' })

import { supabase } from './lib/supabaseClient'

console.log('Supabase Client:', supabase)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
