import type { IUserHandler } from './IUserHandler'

let _userHandler: IUserHandler | null = null

export const useUserHandler = () => {
  return {
    set: (userHandler: IUserHandler) => {
      _userHandler = userHandler
    },
    get: (): IUserHandler => {
      if (!_userHandler) {
        throw new Error('UserHandler not set! Call useUserHandler().set(handler: IUserHandler) first.')
      }
      return _userHandler
    },
  }
}
