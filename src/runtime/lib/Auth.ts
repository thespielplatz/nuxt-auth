import { navigateTo, useRuntimeConfig } from '#imports'

export default class Auth {
  accessToken: string | null = null
  initialRefreshPromise: Promise<boolean> | null = null

  async loginWithAccessKey(accessKey: string) {
    try {
      const { accessToken } = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { accessKey },
      })
      this.accessToken = accessToken
      return true
    } catch {
      this.accessToken = null
      return false
    }
  }

  async refresh() {
    if (this.initialRefreshPromise) {
      return this.initialRefreshPromise
    }

    this.initialRefreshPromise = this.startRefresh()
    return this.initialRefreshPromise
  }

  async logout() {
    try {
      const success = await $fetch('/api/auth/logout')
      this.accessToken = null
      return success
    } catch {
      this.accessToken = null
      return false
    }
  }

  async redirectIfLoggedIn() {
    const loggedIn = await this.isLoggedIn()
    console.info('redirectIfLoggedIn', loggedIn)
    if (loggedIn) {
      await navigateTo(useRuntimeConfig().public.authModule.redirectOnLoggedIn, { replace: true })
    }
  }

  async redirectIfLoggedOut() {
    const loggedIn = await this.isLoggedIn()
    console.info('redirectIfLoggedOut', loggedIn)
    if (!loggedIn) {
      await navigateTo(useRuntimeConfig().public.authModule.redirectOnLoggedOut, { replace: true })
    }
  }

  async isLoggedIn() {
    if (!this.initialRefreshPromise) {
      this.initialRefreshPromise = this.startRefresh()
    }
    await this.initialRefreshPromise
    return this.accessToken !== null
  }

  get $fetch() {
    return $fetch.create({
      headers: {
        Authorization: `${this.accessToken}`,
      },
    })
  }

  private async startRefresh() {
    try {
      const { accessToken } = await $fetch('/api/auth/refresh')
      this.accessToken = accessToken
      console.info('refresh - success')
      return true
    } catch {
      this.accessToken = null
      console.info('refresh - fail')
      return false
    }
  }
}
