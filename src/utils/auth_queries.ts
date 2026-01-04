import { supabase } from '@/lib/supabaseClient'

export const signup = async(email: string, password: string) => {
  return  await supabase.auth.signUp({
    email: email,
    password: password
  })
}

export const profileRegister = async (
  userId: string,
  username: string,
  firstName: string,
  lastName: string
) => {
  return await supabase
    .from('profiles')
    .insert({
      id: userId,
      username: username,
      full_name: `${firstName} ${lastName}`,
    })
    .select()
    .single()
}


export const login = async(email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
}
