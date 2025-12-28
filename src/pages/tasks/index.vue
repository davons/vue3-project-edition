<script lang="ts" setup>
import { h, ref } from 'vue'
import type { Tables } from '../../../database/types'
import { supabase } from '@/lib/supabaseClient'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from '@/components/ui/data-table/DataTable.vue'

defineOptions({ name: 'TasksPage' })

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

;(async () => {
  await getTasks()
})()

const columns: ColumnDef<Tables<'task'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return h('div', { class: 'text-left font-medium' }, name)
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
      const due_date = row.getValue('due_date') as string
      return h('div', { class: 'text-left font-medium' }, due_date)
    },
  },
  {
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project ID'),
    cell: ({ row }) => {
      const project_id = row.getValue('project_id') as string
      return h('div', { class: 'text-left font-medium' }, project_id)
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      const collaborators = row.getValue('collaborators') as string
      return h('div', { class: 'text-left font-medium' }, collaborators)
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
