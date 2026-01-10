<script lang="ts" setup>
interface link {
  to?: string
  icon: string
  label: string
}

defineProps<{
  links: link[]
}>()

const emits = defineEmits<{
  actionClicked: [string]
}>()

const handleActionClicked = (title: string) => {
  emits('actionClicked', title)
}
</script>

<template>
  <template v-for="link in links" :key="link.label">
    <RouterLink
      active-class=""
      exact-active-class="text-primary bg-muted"
      v-if="link.to"
      :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.label }}</span>
    </RouterLink>
    <div
      v-else
      @click="handleActionClicked(link.label)"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground cursor-pointer"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.label }}</span>
    </div>
  </template>
</template>

<style scoped></style>
