<script lang="ts" setup>
defineOptions({ name: 'ProjectsPage' })

import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../database/types'
import { h, ref } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from '@/components/ui/data-table/DataTable.vue'

const projects = ref<Tables<'project'>[] | null>(null)

const getProjects = async () => {
  try {
    const { data, error: fetchError } = await supabase.from('project').select('*')
    if (fetchError) {
      throw fetchError
    }
    projects.value = data
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}
;(async () => {
  await getProjects()
})()

const columns: ColumnDef<Tables<'project'>>[] = [
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
    <DataTable v-if="projects" :columns="columns" :data="projects" />
  </div>
</template>

<style scoped></style>
