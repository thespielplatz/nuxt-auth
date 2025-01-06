import consola from 'consola'

export default defineNitroPlugin(() => {
  consola.info('Configuring Auth Plugin - User Provider')
  useUserProvider().set(userProvider)
})
