import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken, refreshAccessToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')
  const refreshToken = request.cookies.get('refreshToken')

  const signInUrl = `${request.nextUrl.origin}/auth?page=signIn`

  // Only protect routes under /admin
  if (pathname.startsWith('/admin')) {
    if (!accessToken) {
      console.log('No access token found, redirecting to sign in')
      return NextResponse.redirect(signInUrl)
    }

    try {
      verifyToken(accessToken.value)
      console.log('Access token is valid')
    } catch (error) {
      console.log('Access token verification failed:', error)
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken.value)
          const response = NextResponse.next()
          response.cookies.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
          })
          console.log('Access token refreshed successfully')
          return response
        } catch (refreshError) {
          console.log('Refresh token failed:', refreshError)
          return NextResponse.redirect(signInUrl)
        }
      } else {
        console.log('No refresh token found, redirecting to sign in')
        return NextResponse.redirect(signInUrl)
      }
    }
  }

  return NextResponse.next()
}