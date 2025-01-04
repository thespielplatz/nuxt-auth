import { createAccessToken, createError, defineEventHandler, deleteCookie, getCookie, setRefreshTokenAsCookie, useRuntimeConfig, validateRefreshToken } from '#imports'

export default defineEventHandler(async (event) => {
  const refreshCookieName = useRuntimeConfig().authModule.refreshCookie.name
  const refreshToken = getCookie(event, refreshCookieName)
  if (!refreshToken) {
    deleteCookie(event, refreshCookieName)
    throw createError({
      status: 400,
      message: 'No refresh token cookie',
    })
  }

  try {
    const { userId, sessionId } = await validateRefreshToken({ jwt: refreshToken })
    await setRefreshTokenAsCookie({ event, userId, sessionId })
    const accessToken = await createAccessToken({ userId: userId, sessionId })

    return {
      accessToken,
    }
  } catch {
    deleteCookie(event, refreshCookieName)
    throw createError({
      status: 400,
      message: 'Invalid refresh token',
    })
  }
})
