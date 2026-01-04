import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from "database/types"

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref< null | User> (null)
  const profile = ref< null | Tables<'profiles'>>(null)

  const setAuth = (useSesion: null | Session = null) => {
    if (!useSesion) {
      user.value = null
      return
    }

    user.value = useSesion.user
  }

    return {
      user,
      profile,
      setAuth
    }
})
