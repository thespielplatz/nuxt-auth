import type { IUserHandler } from './IUserHandler'

let _userHandler: IUserHandler | null = null

export const useUserHandler = () => {
  return {
    set: (userHandler: IUserHandler) => {
      _userHandler = userHandler
    },
    get: (): IUserHandler => {
      if (!_userHandler) {
        throw new Error('useUserHandler IUserHandler not set!')
      }
      return _userHandler
    },
  }
}
