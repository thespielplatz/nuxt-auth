import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import type { AuthUserType } from '../lib/AuthUserSchema'

export const defineLoggedInEventHandler = <T extends EventHandlerRequest, D>(
  handler: (event: H3Event<T>, user: AuthUserType) => Promise<D> // Update handler type to include user parameter
): EventHandler<T, D> =>
  defineEventHandler<T>(async event => {
    const authorization = getHeader(event, 'Authorization')
    if (!authorization) {
      throw createError({
        status: 400,
        message: 'Authorization header is missing',
      })
    }

    let user
    try {
      const { userId } = await validateAccessToken({ jwt: authorization })
      user = useUserHandler().get().getUser(userId)
      if (!user) {
        throw createError({
          status: 500,
          message: 'User not found',
        })
      }
    } catch (err) {
      throw createError({
        status: 401,
        message: 'Invalid access token',
      })
    }

    return await handler(event, user)
  })
