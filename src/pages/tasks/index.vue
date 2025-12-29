<script lang="ts" setup>
import type { Tables } from '../../../database/types'
import { supabase } from '@/lib/supabaseClient'
import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'

defineOptions({ name: 'TasksPage' })

const pageStore = usePageStore()
pageStore.setPageTitle('My Tasks')

const tasks = ref<Tables<'task'>[] | null>(null)

const getTasks = async () => {
  try {
    const { data, error: fetchError } = await supabase.from('task').select('*')
    if (fetchError) {
      throw fetchError
    }
    tasks.value = data
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

await getTasks()

const columns: ColumnDef<Tables<'task'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      const slug = row.original?.slug ?? ''
      const name = (row.getValue('name') as string) ?? ''
      return h(
        RouterLink,
        {
          to: slug ? `/tasks/${slug}` : '/tasks',
          class: 'text-left font-medium hover:underline hover:text-blue-600',
        },
        { default: () => name },
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return h('div', { class: 'text-left font-medium' }, status)
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due date'),
    cell: ({ row }) => {
      const due_date = (row.getValue('due_date') as string) ?? ''
      return h('div', { class: 'text-left font-medium' }, due_date || '—')
    },
  },
  {
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project ID'),
    cell: ({ row }) => {
      const project_id = String(row.getValue('project_id') ?? '')
      return h('div', { class: 'text-left font-medium' }, project_id || '—')
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      const collaborators = (row.getValue('collaborators') as string) ?? ''
      return h('div', { class: 'text-left font-medium' }, collaborators || '—')
    },
  },
]
</script>

<template>
  <div>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>

<style scoped></style>
