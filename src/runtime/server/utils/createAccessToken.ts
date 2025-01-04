import { nanoid } from 'nanoid'

export const createAccessToken = async ({ userId }: { userId: string }) => {
  return useJwt().createJwt({
    payload: {
      userId,
      sessionId: nanoid(),
    },
    issuer: useRuntimeConfig().authModule.issuer,
    audience:  useRuntimeConfig().authModule.audience,
    expirationTime: useRuntimeConfig().authModule.accessTokenExpirationTime,
  })
}
