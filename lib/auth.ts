import jwt from 'jsonwebtoken'

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.verify(token, secret);
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh access token')
    }

    const data = await response.json()
    return data.accessToken
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw error
  }
}
