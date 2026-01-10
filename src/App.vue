<script setup lang="ts">
import { onErrorCaptured, onMounted } from 'vue'
import { useErrorStore } from '@/stores/error'
import { supabase } from './lib/supabaseClient'
import { useAuthStore } from './stores/auth'

defineOptions({ name: 'App' })

const errorStore = useErrorStore()
const authStore = useAuthStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })
})

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session?.user) await authStore.setAuth(data.session)
})
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
