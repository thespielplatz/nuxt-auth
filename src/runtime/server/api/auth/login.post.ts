import { z } from 'zod'

const InputSchema = z.object({
  accessKey: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, InputSchema.parse)

  const user = useUserHandler().get().login(body.accessKey)
  if (!user) {
    throw createError({
      status: 401,
      message: "Login Denied",
      statusMessage: "Login request Denied",
    })
  }

  const sessionId = await createSessionId()
  await setRefreshTokenAsCookie({ event, userId: user.id, sessionId })

  const accessToken = await createAccessToken({ userId: user.id })

  return {
    accessToken,
  }
})
