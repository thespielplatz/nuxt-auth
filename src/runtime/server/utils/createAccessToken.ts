import { useJwt, useRuntimeConfig } from '#imports'

export const createAccessToken = async ({ userId, sessionId }: { userId: string, sessionId: string }) => {
  return useJwt().createJwt({
    payload: {
      userId,
      sessionId,
    },
    issuer: useRuntimeConfig().authModule.issuer,
    audience: useRuntimeConfig().authModule.audience,
    expirationTime: useRuntimeConfig().authModule.accessTokenExpirationTime,
  })
}
