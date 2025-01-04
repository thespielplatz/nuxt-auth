export default defineEventHandler(async (event) => {
  deleteCookie(event, useRuntimeConfig().authModule.refreshCookie.name)
  return true
})
