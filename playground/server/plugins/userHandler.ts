import consola from 'consola'
import { AuthUserSchema } from '../../../src/runtime/server/lib/AuthUserSchema'

const user = {
  id: 'random-id',
  name: 'Foo Bar',
  accessKey: 'test',
}

export default defineNitroPlugin(() => {
  consola.info('Configuring Auth Plugin - User Handler')
  useUserHandler().set({
    login: (accessKey) => {
      if (user.accessKey === accessKey) {
        return AuthUserSchema.parse(user)
      }
      return null
    },
    getUser(userId) {
      if (user.id === userId) {
        return AuthUserSchema.parse(user)
      }
      return null
    },
  })
})
