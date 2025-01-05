import { RefreshTokenPayload, type RefreshTokenPayload as RefreshTokenPayloadType } from '../lib/RefreshTokenPayload'
import { useJwt, useRuntimeConfig } from '#imports'

export const validateRefreshToken = async ({ jwt }: { jwt: string }): Promise<RefreshTokenPayloadType> => {
  const payload = await useJwt().validate({
    jwt,
    issuer: useRuntimeConfig().authModule.issuer,
    audience: useRuntimeConfig().authModule.audience,
  })
  return RefreshTokenPayload.parse(payload)
}
