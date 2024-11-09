'use server'

import { z } from 'zod'

const signUpSchema = z.object({
  //firstName: z.string().min(1, 'First name is required'),
  //lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  /*dateOfBirth: z.string().refine((dob) => {
    const date = new Date(dob)
    const now = new Date()
    return !isNaN(date.getTime()) && date < now
  }, 'Invalid date of birth'),*/
  userName: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  repeatPassword: z.string().min(6, 'Repeat password must be at least 6 characters long'),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ["repeatPassword"],
})

export type SignUpData = z.infer<typeof signUpSchema>

export type SignUpState = {
  errors?: {
    [K in keyof SignUpData]?: string[]
  }
  message: string | null
  user: any | null
}

export async function signUp(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
  const rawFormData = Object.fromEntries(formData.entries())
  const validatedFields = signUpSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Failed to create account.',
      user: null
    }
  }

  const userData = validatedFields.data

  // Convert date to ISO string format
  //userData.dateOfBirth =  "2024-11-07T20:13:15.393Z" //new Date(userData.dateOfBirth).toISOString()

  try {
    console.log(userData)
    const response = await fetch('https://localhost:7159/api/app/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      throw new Error('Failed to create account')
    }

    const data = await response.json()
    console.log(data)

    return {
      errors: {},
      message: 'Account created successfully!',
      user: data,
    }
  } catch (error) {
    return {
      errors: {},
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      user: null
    }
  }
}