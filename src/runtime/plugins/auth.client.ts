import consola from 'consola'

import Auth from '../lib/Auth'

let auth: Auth

export default defineNuxtPlugin({
  name: 'auth-plugin',
  async setup() {
    consola.info('Installing Auth Plugin')
    auth = new Auth()
    return {
      provide: {
        auth,
      },
    }
  },
  hooks: {
    'app:beforeMount'() {
      auth.refresh()
    },
  },
})
