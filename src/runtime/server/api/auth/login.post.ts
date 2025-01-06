import { z } from 'zod'
import { useUserProvider } from '../../utils/useUserProvider'
import { createAccessToken, createError, createSessionId, defineEventHandler, readValidatedBody, setRefreshTokenAsCookie } from '#imports'

const InputSchema = z.object({
  accessKey: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, InputSchema.parse)

  const user = useUserProvider().get().login(body.accessKey)
  if (!user) {
    throw createError({
      status: 401,
      message: 'Login Denied',
      statusMessage: 'Login request denied',
    })
  }

  const sessionId = await createSessionId()
  await setRefreshTokenAsCookie({ event, userId: user.id, sessionId })

  const accessToken = await createAccessToken({ userId: user.id, sessionId })

  return {
    accessToken,
  }
})
