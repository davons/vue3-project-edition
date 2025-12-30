<script lang="ts" setup>
import { getProjectBySlugWithTasks, type ProjectBySlugWithTasks } from '@/utils/project_queries'

defineOptions({ name: 'SingleProjectPage' })

const route = useRoute('/projects/[slug]')
const projectSlug = route.params.slug as string

const pageStore = usePageStore()

const project = ref<ProjectBySlugWithTasks | null>(null)

watch(
  () => project.value,
  (newProject) => {
    if (newProject) {
      pageStore.setPageTitle(`Project: ${newProject.name}`)
    }
  },
  { immediate: true },
)

project.value = await getProjectBySlugWithTasks(projectSlug)
</script>

<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project?.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ project?.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ project?.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <template v-if="Array.isArray(project?.collaborators)">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collaborator in project?.collaborators"
              :key="collaborator"
            >
              <template v-if="collaborator && typeof collaborator === 'object'">
                <RouterLink
                  class="w-full h-full flex items-center justify-center"
                  :to="`/users/${collaborator}`"
                >
                  <AvatarImage :src="collaborator || ''" alt="" />
                  <AvatarFallback>{{
                   collaborator
                  }}</AvatarFallback>
                </RouterLink>
              </template>
              <template v-else>
                <div class="w-full h-full flex items-center justify-center">
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>{{ String(collaborator) }}</AvatarFallback>
                </div>
              </template>
            </Avatar>
          </template>
          <template v-else>
            <div class="text-left font-medium">{{ project?.collaborators }}</div>
          </template>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in project?.task" :key="task.id">
              <TableCell> {{ task.name }} </TableCell>
              <TableCell> {{ task.status }} </TableCell>
              <TableCell> {{ task.due_date }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>
<style scoped></style>
