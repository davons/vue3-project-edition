import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { TaksWithProjects } from '@/utils/task_queries'

type TaskRow = TaksWithProjects extends (infer U)[] ? U : TaksWithProjects

export const columns: ColumnDef<TaskRow>[] = [
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
        () => name,
      )
    },
  },
  // {
  //   accessorKey: 'description',
  //   header: () => h('div', { class: 'text-left' }, 'Description'),
  //   cell: ({ row }) => {
  //     const description = row.getValue('description') as string
  //     return h('div', { class: 'text-left font-medium' }, description)
  //   },
  // },
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
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Projects'),
    cell: ({ row }) => {
      const slug = row.original?.project?.slug ?? ''
      return h(
        RouterLink,
        {
          to: `/projects/${slug}`,
          class: 'text-left font-medium hover:underline hover:text-blue-600',
        },
        () => row.original?.project.name || '—',
      )
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
