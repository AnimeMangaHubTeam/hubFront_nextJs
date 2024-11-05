'use client';

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';

export default function Component() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
          <CardDescription className="text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="name" placeholder="John Doe" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" placeholder="m@example.com" type="email" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
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
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <Progress value={passwordStrength} className={`h-2 ${getPasswordStrengthColor()}`} />
            <p className="text-xs text-muted-foreground">Password strength: {passwordStrength}%</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {confirmPassword && (
              <p className={`text-xs ${password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">Sign up</Button>
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/signIn" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}