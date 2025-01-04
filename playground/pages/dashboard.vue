<template>
  <div>
    <h1>Auth Module - Logged In</h1>
    <div>User: {{ user?.name }}</div>
    <button @click="logout">
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import type { UserDto } from '../server/api/user.get'

const { $auth } = useNuxtApp()
const user = ref<UserDto | undefined>()

onMounted(async () => {
  await $auth.redirectIfLoggedOut()
  user.value = await $auth.$fetch('/api/user', {
    method: 'GET',
  })
})

const logout = async () => {
  await $auth.logout()
  await navigateTo('/')
}
</script>
