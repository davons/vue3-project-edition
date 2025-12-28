<script setup lang="ts">
import Button from '../ui/button/Button.vue'
import SidebarLinks from './SidebarLinks.vue'

defineOptions({ name: 'SideBar' })

const links = [
  { to: '/', icon: 'lucide:house', label: 'Dashboard' },
  { to: '/projects', icon: 'lucide:building-2', label: 'Projects' },
  { to: '/tasks', icon: 'lucide:badge-check', label: 'My Tasks' },
]
const accountLinks = [
  { to: '/profile', icon: 'lucide:user', label: 'Profile' },
  { to: '/settings', icon: 'lucide:settings', label: 'Settings' },
  { to: '/signout', icon: 'lucide:log-out', label: 'Sign out' },
]
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>
