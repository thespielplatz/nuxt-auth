import { z } from 'zod'

export const AuthUserSchema = z.object({
  id: z.string(),
}).passthrough()

export type AuthUserSchema = z.infer<typeof AuthUserSchema>
