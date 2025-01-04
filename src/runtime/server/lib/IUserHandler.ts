import type { AuthUserType } from './AuthUserSchema'

export interface IUserHandler {
  login(accessKey: string ): AuthUserType | null
  getUser(userId: string): AuthUserType | null
}
