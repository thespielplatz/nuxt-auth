import consola from 'consola'

import Auth from '../lib/Auth'

declare module '#app' {
  interface NuxtApp {
    $auth: () => Auth;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: () => Auth;
  }
}

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
