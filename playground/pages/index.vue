<template>
  <div>
    <h1>Auth Module - Logged Out</h1>
    <div style="font-weight: bold;">
      Enter Access Key:
    </div>
    <input
      v-model="accessKey"
      type="text"
      placeholder="Access Key"
    >
    <button @click="login">
      Login
    </button>
    <div>
      Status: {{ status }}
    </div>
    <div style="font-style: italic;">
      The access key is 'test'
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from '#imports'

const { $auth } = useNuxtApp()
const accessKey = ref('')
const status = ref('none')

onMounted(async () => {
  status.value = 'Checking login status...'
  await $auth.redirectIfLoggedIn()
  status.value = 'Login in status check, done'
})

const login = async () => {
  status.value = 'Logging in...'
  const success = await $auth.loginWithAccessKey(accessKey.value)
  if (success) {
    await navigateTo('/dashboard')
  }
  else {
    status.value = 'Login denied'
  }
}
</script>
