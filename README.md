# @thespielplatz/nuxt-auth

<!-- Badges Start -->
<p>
  <a href="https://npmjs.com/package/@thespielplatz/nuxt-auth"><img src="https://img.shields.io/npm/v/@thespielplatz/nuxt-auth.svg?style=flat-square&colorA=202128&colorB=36936A" alt="Version"></a>
  <a href="https://npmjs.com/package/@thespielplatz/nuxt-auth"><img src="https://img.shields.io/npm/dm/@thespielplatz/nuxt-auth.svg?style=flat-square&colorA=202128&colorB=36936A" alt="Downloads"></a>
  <a href="https://github.com/thespielplatz/nuxt-auth/stargazers"><img src="https://img.shields.io/github/stars/thespielplatz/nuxt-auth.svg?style=flat-square&colorA=202128&colorB=36936A" alt="Stars"></a>
  <a href="https://github.com/thespielplatz/nuxt-auth/blob/main/LICENSE"><img src="https://img.shields.io/github/license/thespielplatz/nuxt-auth.svg?style=flat-square&colorA=202128&colorB=36936A" alt="License"></a>
</p>
<!-- Badges End -->

A simple, database-agnostic authentication module for Nuxt, using JWT for access tokens (in the authorization header) and refresh tokens (stored in cookies).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- Database-agnostic design
- Secure token management: Refresh tokens in cookies & access tokens in headers

## Quick Setup

### 1. Install the package

```sh
npm i -D @thespielplatz/nuxt-auth
```

### 2. Add the module to your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@thespielplatz/nuxt-auth']
})
```

## Usage

### 1. Server

#### Implement & Register an `IUserProvider`

The auth module requires an `IUserProvider` implementation, which can be set using `useUserProvider().set(...)`. For reference, see the [playground implementation](playground/server/plugins/registerUserProvider.ts).

#### Protect API Routes with `defineLoggedInEventHandler`

The `defineLoggedInEventHandler((event, user) => {})` function ensures only authenticated users can access certain routes. The user object, retrieved from `IUserProvider`, is passed to the handler. For an example, see the [playground implementation](playground/server/api/user.get.ts).

### 2. Frontend

All authentication-related features are accessible via `$auth` in `useNuxtApp()`.

```ts
<script setup lang="ts">
const { $auth } = useNuxtApp()
```

The auth module automatically sends a refresh request to the server to verify the login state. Ensure this process is completed before making any server API calls.

#### Check Login State

```ts
onMounted(async () => {
  const isLoggedIn = await $auth.isLoggedIn()
})
```

#### Redirect if Logged In

```ts
onMounted(async () => {
  await $auth.redirectIfLoggedIn()
})
```

- No need to manually call `$auth.isLoggedIn()` if this redirection is used.
- Configure the login redirection path in module variables (default: `/dashboard`).

#### Redirect if Logged Out

```ts
onMounted(async () => {
  await $auth.redirectIfLoggedOut()
})
```

- No need to manually call `$auth.isLoggedIn()` if this redirection is used.
- Configure the logout redirection path in module variables (default: `/`).

#### Login

```ts
const login = async () => {
  const success = await $auth.loginWithAccessKey(accessKey.value)
  if (success) {
    await navigateTo('/dashboard')
  } else {
    console.error('Login denied')
  }
}
```

#### Logout

```ts
await $auth.logout()
```

## Development

```sh
npm run dev:prepare
npm run dev
```

Experiment with the module in the playground environment 🎉

_(Inspired by the [Nuxt module guide](https://nuxt.com/docs/guide/going-further/modules))_

## Support

If you find this project helpful, please give it a star! ⭐

If you love it, consider forking it and taking it out for dinner. 🌟🍽️

[Tip the developer](https://thespielplatz.com/tip-jar) ❤️
