import type { AuthUserSchema } from '../lib/AuthUserSchema'

export interface IUserProvider {
  login(accessKey: string): AuthUserSchema | null
  getUser(userId: string): AuthUserSchema | null
}
