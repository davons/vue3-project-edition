import type { ColumnDef } from '@tanstack/vue-table'
import type { Tables } from 'database/types'
import { RouterLink } from 'vue-router'

export const columns: ColumnDef<Tables<'project'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      const slug = row.original.slug
      const name = row.getValue('name') as string
      return h(
        RouterLink,
        {
          to: `/projects/${slug}`,
          class: 'text-left font-medium hover:underline hover:text-blue-600',
        },
        () => name,
      )
    },
  },

  {
    accessorKey: 'description',
    header: () => h('div', { class: 'text-left' }, 'Description'),
    cell: ({ row }) => {
      const description = row.getValue('description') as string
      return h('div', { class: 'text-left font-medium' }, description)
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
