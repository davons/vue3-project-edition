export const usePageStore = defineStore('page-store', () => {
  const pageData = ref<{ title: string }>({ title: '' })

  const title = computed(() => pageData.value.title)
  const pageTitle = computed(() => `Vue3 - ${title.value}`)
  const setPageTitle = (newTitle: string) => {
    pageData.value.title = newTitle
  }

  return { title, pageTitle, setPageTitle }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
