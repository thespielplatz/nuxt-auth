import type { IUserProvider } from './IUserProvider'

let _userHandler: IUserProvider | null = null

export const useUserProvider = () => {
  return {
    set: (userHandler: IUserProvider) => {
      _userHandler = userHandler
    },
    get: (): IUserProvider => {
      if (!_userHandler) {
        throw new Error('IUserProvider not set! Call useUserHandler().set(handler: IUserProvider) first.')
      }
      return _userHandler
    },
  }
}
