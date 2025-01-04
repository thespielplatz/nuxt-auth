import { type IUserHandler } from '../lib/IUserHandler'

let _userHandler: IUserHandler | null = null

export default (userHandler?: IUserHandler) => {
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
