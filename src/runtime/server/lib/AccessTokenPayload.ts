import { z } from 'zod'

export const AccessTokenPayload = z.object({
  userId: z.string(),
})

export type AccessTokenPayload = z.infer<typeof AccessTokenPayload>
