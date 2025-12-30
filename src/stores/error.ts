import type { CustomerError, CustomerPostgrestError } from "@/types/Error";
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error-store', () =>{

  const activeError = ref<CustomerError | CustomerPostgrestError | null>(null)
  const isCustomError = ref(false)

  const setError = (payload: { error: unknown; customCode?: number }) => {
    const { error, customCode } = payload

    if (typeof error === 'string') {
      isCustomError.value = true
      activeError.value = new Error(error) as CustomerError
      ;(activeError.value as CustomerError).customCode = customCode || 500
      return
    }

    if (error instanceof Error) {
      activeError.value = error as CustomerError
      ;(activeError.value as CustomerError).customCode = customCode || 500
      return
    }

    // handle PostgrestError-like objects
    if (error && typeof error === 'object') {
      activeError.value = error as CustomerPostgrestError
      ;(activeError.value as CustomerPostgrestError).statusCode = customCode || 500
      return
    }

    // fallback: wrap unknown values into an Error
    activeError.value = new Error(String(error)) as CustomerError
    ;(activeError.value as CustomerError).customCode = customCode || 500
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return { activeError, setError, clearError, isCustomError }
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
