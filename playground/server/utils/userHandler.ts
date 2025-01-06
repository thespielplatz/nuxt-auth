const user = {
  id: 'random-id',
  name: 'Foo Bar',
  accessKey: 'test',
}

export const userHandler: IUserHandler = {
  login(accessKey) {
    if (user.accessKey === accessKey) {
      return user
    }
    return null
  },
  getUser(userId: string) {
    if (user.id === userId) {
      return user
    }
    return null
  },
}
