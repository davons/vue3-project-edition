<script setup lang="ts">
import Input from './components/ui/input/Input.vue'
import { Search } from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

defineOptions({ name: 'App' })
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex items-center justify-between px-4 gap-4">
    <form class="flex-1 max-w-md h-full flex items-center relative">
      <Search class="absolute left-3 w-4 h-4 text-muted-foreground" />
      <Input type="text" placeholder="Search..." class="w-full bg-background pl-8 h-9" />
    </form>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
