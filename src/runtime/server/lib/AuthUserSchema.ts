import { z } from 'zod'

export const AuthUserSchema = z.object({
  id: z.string(),
}).passthrough()

export type AuthUserType = z.infer<typeof AuthUserSchema>
