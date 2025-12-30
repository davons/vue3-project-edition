<script lang="ts" setup>
  const pageStore = usePageStore()
  const router = useRouter()
  const errorStore = useErrorStore()
  const error = ref(errorStore.activeError)

  const message = ref('')
  const customerCode = ref(0)
  const details = ref('')
  const code = ref('')
  const hint = ref('')
  const statusCode = ref(0)

  const ErrorTemplate = import.meta.env.DEV ?
  defineAsyncComponent(() => import('./AppErrorDev.vue')) :
  defineAsyncComponent(() => import('./AppErrorProd.vue'))

  pageStore.setPageTitle('Not Found')

  if (error.value && !('code' in error.value)) {
    message.value = error.value.message
    customerCode.value = error.value.customCode ?? 0
  }

  if (error.value && 'code' in error.value) {
    message.value = error.value.message
    details.value = error.value.details
    hint.value = error.value.hint
    code.value = error.value.code
    statusCode.value = error.value.statusCode ?? 0
  }

  router.afterEach(() => {
    errorStore.clearError()
  })

</script>

<template>
  <section class="mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh]">
    <ErrorTemplate
      :message="message"
      :customerCode="customerCode"
      :details="details"
      :hint="hint"
      :code="code"
      :statusCode="statusCode"
      :isCustomError="errorStore.isCustomError"
     />
  </section>
</template>

<style scoped></style>
