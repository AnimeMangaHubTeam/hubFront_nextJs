'use server'

import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid email or password' }
  }

  // Here you would typically validate the user credentials
  // and create a session. This is a placeholder implementation.
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call

  return { success: true }
}