import type { TaksWithProjects } from '@/utils/task_queries'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

export const columns: ColumnDef<TaksWithProjects>[] = [
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
      return h(
        RouterLink,
        {
          to: `/projects/${row.original?.slug}`,
          class: 'text-left font-medium hover:underline hover:text-blue-600',
        },
        () => row.original?.name || '—',
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
