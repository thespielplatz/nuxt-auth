import type { AuthUserSchema } from './AuthUserSchema'

export interface IUserHandler {
  login(accessKey: string): AuthUserSchema | null
  getUser(userId: string): AuthUserSchema | null
}
