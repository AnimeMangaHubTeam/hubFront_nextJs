import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

export async function middleware(request: NextRequest) {
  const response = await NextResponse.next()

  if (response.status === 401) {
    try {
      const refreshResponse = await axios.post('https://localhost:7159/api/app/auth/refresh-token', {}, {
        withCredentials: true,
        headers: { 'accept': 'application/json' }
      })

      if (refreshResponse.status === 200) {
        return NextResponse.next()
      }
    } catch (error) {
      return NextResponse.redirect('/auth?page=signIn')
    }
  }

  return response
}
