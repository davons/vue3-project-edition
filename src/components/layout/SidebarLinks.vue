<script lang="ts" setup>
interface link {
  to: string
  icon: string
  label: string
}

defineProps<{
  links: link[]
}>()
</script>

<template>
  <RouterLink
    active-class=""
    exact-active-class="text-primary bg-muted"
    v-for="link in links"
    :to="link.to"
    :key="link.to"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
  >
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.label }}</span>
  </RouterLink>
</template>

<style scoped></style>
