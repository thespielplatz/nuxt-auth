import { setCookie, H3Event } from 'h3'
import { z } from 'zod'

const SameSiteSchema = z.union([
  z.literal(true),
  z.literal(false),
  z.literal('lax'),
  z.literal('strict'),
  z.literal('none'),
  z.undefined(),
])

export const setRefreshTokenAsCookie = async ({ event, userId, sessionId }: { event: H3Event, userId: string, sessionId: string }) => {
  const newRefreshToken = await createRefreshToken({ userId, sessionId })
  const refreshCookieConfig = useRuntimeConfig().authModule.refreshCookie
  setCookie(event, refreshCookieConfig.name, newRefreshToken, {
    httpOnly: true,
    secure: refreshCookieConfig.secure,
    expires: new Date(+ new Date() + 1000 * 60 * 60 * refreshCookieConfig.expiresInDays * 365),
    sameSite: SameSiteSchema.parse(refreshCookieConfig.sameSite),
  })
}
