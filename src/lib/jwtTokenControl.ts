import * as jose from 'jose'
import { NextRequest } from 'next/server'

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.SECRET_KEY),
}

export const isAuthenticated = async (req: NextRequest) => {
  let token = req.headers.get('authorization') || req.headers.get('Authorization')

  if (token) {
    try {
      if (token.startsWith('Bearer')) {
        token = token.replace('Bearer ', '')
      }

      const decoded = await jose.jwtVerify(token, jwtConfig.secret)

      if (decoded.payload?._id) {
        return decoded
      } else {
        return false
      }
    } catch (err) {
      console.error('isAuthenticated error: ', err)

      return false
    }
  } else {
    return false
  }
}