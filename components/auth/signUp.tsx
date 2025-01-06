'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { BASE_URL } from '@/lib/baseUrl'







const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ['repeatPassword'],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
    },
  })

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length > 6) strength += 20
    if (password.match(/[a-z]+/)) strength += 20
    if (password.match(/[A-Z]+/)) strength += 20
    if (password.match(/[0-9]+/)) strength += 20
    if (password.match(/[$@#&!]+/)) strength += 20
    return strength
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-destructive'
    if (passwordStrength < 80) return 'bg-warning'
    return 'bg-success'
  }

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await fetch(`${BASE_URL}api/app/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Sign up failed')
      }
      const responseData = await response.json()
      console.log(responseData)
      // Handle successful sign up (e.g., redirect to login page or show success message)
    } catch (error) {
      console.error('Sign up error:', error)
      form.setError('root', { 
        type: 'manual',
        message: 'Sign up failed. Please try again.'
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {form.formState.errors.root && (
              <div className="text-destructive text-center text-sm mb-4">
                {form.formState.errors.root.message}
              </div>
            )}
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="m@example.com" type="email" className={`pl-10 ${form.formState.errors.email ? 'border-destructive' : ''}`} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="johndoe" className={`pl-10 ${form.formState.errors.username ? 'border-destructive' : ''}`} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className={`pl-10 pr-10 ${form.formState.errors.password ? 'border-destructive' : ''}`}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            setPasswordStrength(calculatePasswordStrength(e.target.value))
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <Progress
                      value={passwordStrength}
                      className={`h-2 ${getPasswordStrengthColor()}`}
                    />
                    <p className="text-xs text-muted-foreground">
                      Password strength: {passwordStrength}%
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          className={`pl-10 pr-10 ${form.formState.errors.repeatPassword ? 'border-destructive' : ''}`}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Sign up
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link href="/auth?page=signIn" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
              <Link href="/" className="text-primary hover:underline">
                Return to the main page
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}