import { z } from 'zod'

export const UserDto = z.object({
  name: z.string(),
})

export type UserDto = z.infer<typeof UserDto>

export default defineLoggedInEventHandler(async (event, user) => {
  return UserDto.parse(user)
})
