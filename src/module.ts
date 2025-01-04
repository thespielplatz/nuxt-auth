import { defineNuxtModule, createResolver, addPlugin, addServerScanDir } from '@nuxt/kit'
import consola from 'consola'
import { defu } from 'defu'

import type { Nuxt } from 'nuxt/schema'

import isDevelopmentMode from './runtime/server/utils/isDevelopmentMode'

// Module options TypeScript interface definition
export interface ModuleOptions {
  issuer: string
  audience: string
  refreshTokenExpirationTime: string
  accessTokenExpirationTime: string
  refreshCookie: {
    name: string
    secure: boolean
    sameSite: 'lax' | 'strict' | 'none'
    expiresInDays: number
  }
  public: {
    redirectOnLoggedIn: string
    redirectOnLoggedOut: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'auth-module',
    configKey: 'authModule',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    issuer: 'not-set',
    audience: 'not-set',
    refreshTokenExpirationTime: '28 days',
    accessTokenExpirationTime: '5 min',
    refreshCookie: {
      name: 'refresh_token',
      secure: true,
      sameSite: 'lax',
      expiresInDays: 25,
    },
    public: {
      redirectOnLoggedIn: '/dashboard',
      redirectOnLoggedOut: '/',
    },
  },
  setup(inlineOptions, nuxt) {
    if (isDevelopmentMode()) {
      inlineOptions.refreshCookie.secure = false
    }

    nuxt.options.runtimeConfig = defu(nuxt.options.runtimeConfig, {
      authModule: inlineOptions,
    })
    nuxt.options.runtimeConfig.public = defu(nuxt.options.runtimeConfig.public, {
      authModule: inlineOptions.public,
    })

    registerAll(nuxt)
  },
})

const registerAll = (nuxt: Nuxt) => {
  consola.info('Auth Module: Setup')

  const { resolve } = createResolver(import.meta.url)

  const runtimeDir = resolve('./runtime')
  nuxt.options.build.transpile.push(runtimeDir)

  addPlugin({
    src: resolve(runtimeDir, 'plugins/auth.client'),
    mode: 'client',
  })

  addServerScanDir(resolve(runtimeDir, 'server'))
}
