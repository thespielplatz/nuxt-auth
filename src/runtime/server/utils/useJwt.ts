import Jwt from '../lib/Jwt'

let jwtCache: Jwt | null = null

export const initJwt = async () => {
  jwtCache = await Jwt.init()
}

export const useJwt = (): Jwt => {
  if (!jwtCache) {
    throw new Error('JWT not initialized - call init JWT first')
  }

  return jwtCache
}