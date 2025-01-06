import type { AuthUserSchema } from '../lib/AuthUserSchema'

export interface IUserHandler {
  login(accessKey: string): AuthUserSchema | null
  getUser(userId: string): AuthUserSchema | null
}
