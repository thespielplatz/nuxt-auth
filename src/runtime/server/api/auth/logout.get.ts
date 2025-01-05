import { defineEventHandler, deleteCookie, useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  deleteCookie(event, useRuntimeConfig().authModule.refreshCookie.name)
  return true
})
