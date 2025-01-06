import consola from 'consola'

export default defineNitroPlugin(() => {
  consola.info('Configuring Auth Plugin - User Handler')
  useUserHandler().set(userHandler)
})
