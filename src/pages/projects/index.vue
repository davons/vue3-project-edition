<script lang="ts" setup>
import { columns } from '../../utils/table-columns/projects-columns'
import { getProjects, type Projects } from '@/utils/supaProject'

defineOptions({ name: 'ProjectsPage' })

const pageStore = usePageStore()
const projects = ref<Projects | null>(null)

pageStore.setPageTitle('My Projects')
projects.value = await getProjects()
</script>

<template>
  <div>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
  </div>
</template>

<style scoped></style>
