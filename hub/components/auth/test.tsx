'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { Eye, EyeOff, Lock, Mail, User, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import { signUp, SignUpState } from './signUpActions'

const initialState: SignUpState = {
  errors: {},
  message: null,
  user: null
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('String1!')
  const [repeatPassword, setRepeatPassword] = useState('String1!')
  const [state, dispatch] = useActionState(signUp, initialState)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length > 6) strength += 20
    if (password.match(/[a-z]+/)) strength += 20
    if (password.match(/[A-Z]+/)) strength += 20
    if (password.match(/[0-9]+/)) strength += 20
    if (password.match(/[$@#&!]+/)) strength += 20
    return strength
  }

  const passwordStrength = calculatePasswordStrength(password)

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500'
    if (passwordStrength < 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
          <CardDescription className="text-center">Create an account to get started</CardDescription>
        </CardHeader>
        <form action={dispatch}>
          <CardContent className="space-y-4">
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="John" defaultValue={"test"}/>
                {state.errors?.firstName && <p className="text-xs text-red-500">{state.errors.firstName[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="Doe" defaultValue={"test"}/>
                {state.errors?.lastName && <p className="text-xs text-red-500">{state.errors.lastName[0]}</p>}
              </div>
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" name="email" placeholder="m@example.com" type="email" className="pl-10" />
              </div>
              {state.errors?.email && <p className="text-xs text-red-500">{state.errors.email[0]}</p>}
            </div>
            {/*<div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="dateOfBirth" name="dateOfBirth" type="date" className="pl-10" />
              </div>
              {state.errors?.dateOfBirth && <p className="text-xs text-red-500">{state.errors.dateOfBirth[0]}</p>}
            </div>*/}
            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="userName" name="userName" placeholder="johndoe" className="pl-10" defaultValue={"test"}/>
              </div>
              {state.errors?.userName && <p className="text-xs text-red-500">{state.errors.userName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Progress value={passwordStrength} className={`h-2 ${getPasswordStrengthColor()}`} />
              <p className="text-xs text-muted-foreground">Password strength: {passwordStrength}%</p>
              {state.errors?.password && <p className="text-xs text-red-500">{state.errors.password[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="repeatPassword">Repeat Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="repeatPassword"
                  name="repeatPassword"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {repeatPassword && (
                <p className={`text-xs ${password === repeatPassword ? "text-green-500" : "text-red-500"}`}>
                  {password === repeatPassword ? "Passwords match" : "Passwords do not match"}
                </p>
              )}
              {state.errors?.repeatPassword && <p className="text-xs text-red-500">{state.errors.repeatPassword[0]}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit">Sign up</Button>
            {state.message && (
              <div className={`text-sm ${state.user ? 'text-green-500' : 'text-red-500'}`}>
                <p>{state.message}</p>
                {state.user && (
                  <p>Welcome, {state.user.firstName}! Your account has been created.</p>
                )}
              </div>
            )}
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth?page=signIn" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
            <Link
              href="/"
              className="text-primary hover:underline"
            >
              Return to the main page?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}