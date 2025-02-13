import consola from 'consola'
import { addConsolaPrefix } from '../../lib/addConsolaPrefix'
import { defineNitroPlugin, initJwt, isDevelopmentMode, useRuntimeConfig } from '#imports'

export default defineNitroPlugin(() => {
  consola.info(addConsolaPrefix('Initializing Auth module'))
  consola.info(addConsolaPrefix(`- Development mode: ${isDevelopmentMode()}`))
  consola.info(addConsolaPrefix(`- Refresh Cookie Config: ${JSON.stringify(useRuntimeConfig().authModule.refreshCookie)}`))

  // Currently Nitro Plugins are synchronous, so we can't use async/await
  initJwt()
})
