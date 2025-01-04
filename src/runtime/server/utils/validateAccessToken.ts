import { AccessTokenPayload, type AccessTokenPayload as AccessTokenPayloadType } from '../lib/AccessTokenPayload'
import { useJwt, useRuntimeConfig } from '#imports'

export const validateAccessToken = async ({ jwt }: { jwt: string }): Promise<AccessTokenPayloadType> => {
  const payload = await useJwt().validate({
    jwt,
    issuer: useRuntimeConfig().authModule.issuer,
    audience: useRuntimeConfig().authModule.audience,
  })
  return AccessTokenPayload.parse(payload)
}
