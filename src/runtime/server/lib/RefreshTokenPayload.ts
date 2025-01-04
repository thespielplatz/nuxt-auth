import { z } from 'zod'

export const RefreshTokenPayload = z.object({
  userId: z.string(),
  sessionId: z.string(),
})

export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayload>
