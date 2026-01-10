import { profileQuery } from '@/utils/supaAuth'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id)
      profile.value = data || null
    }
  }

  const setAuth = async (useSesion: null | Session = null) => {
    if (!useSesion) {
      user.value = null
      return
    }

    user.value = useSesion.user
    await setProfile()
  }

  return {
    user,
    profile,
    setAuth,
  }
})
