import type { RefreshTokenPayload } from '../lib/RefreshTokenPayload'
import { useJwt, useRuntimeConfig } from '#imports'

export const createRefreshToken = async ({ userId, sessionId }: { userId: string, sessionId: string }) => {
  const payload: RefreshTokenPayload = {
    userId,
    sessionId,
  }

  return useJwt().createJwt({
    payload,
    issuer: useRuntimeConfig().authModule.issuer,
    audience: useRuntimeConfig().authModule.audience,
    expirationTime: useRuntimeConfig().authModule.refreshTokenExpirationTime,
  })
}
