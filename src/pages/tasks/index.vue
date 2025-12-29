<script lang="ts" setup>
import { getTasks, type TaksWithProjects } from '@/utils/task_queries'
import { columns } from '../../utils/table-columns/tasks-columns'

defineOptions({ name: 'TasksPage' })

const pageStore = usePageStore()
const tasks = ref<TaksWithProjects | null>(null)

pageStore.setPageTitle('My Tasks')
tasks.value = await getTasks()
</script>

<template>
  <div>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>

<style scoped></style>
