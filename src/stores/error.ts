import type { CustomerError, CustomerPostgrestError } from "@/types/Error";

export const useErrorStore = defineStore('error-store', () =>{

  const activeError = ref<CustomerError | CustomerPostgrestError | null>(null)

  const setError = ({ error, customCode}:
     {
      error: string | CustomerPostgrestError | Error,
      customCode?: number
    }) => {

    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? new Error(error) : error;
      activeError.value.customCode = customCode || 500

      return
    }

    activeError.value = error
    activeError.value.statusCode = customCode  || 500
  }

  const clearError = () => {
    activeError.value = null
  }

  return { activeError, setError, clearError }
});
