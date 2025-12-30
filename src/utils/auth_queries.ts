import { supabase } from '@/lib/supabaseClient'

export const signup = async(email: string, password: string) => {

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })


  if (error) {
     useErrorStore().setError({
        error: error,
        customCode: 500
     })

     return null;
  }

  return data;
}
