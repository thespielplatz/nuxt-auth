# @thespielplatz/nuxt-auth

<!-- Badges Start -->
<p>
  <a href="https://npmjs.com/package/@thespielplatz/nuxt-auth">
    <img src="https://img.shields.io/npm/v/@thespielplatz/nuxt-auth.svg?style=flat-square&colorA=202128&colorB=36936A" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@thespielplatz/nuxt-auth">
    <img src="https://img.shields.io/npm/dm/@thespielplatz/nuxt-auth.svg?style=flat-square&colorA=202128&colorB=36936A" alt="Downloads">
  </a>
  <a href="https://github.com/thespielplatz/nuxt-auth/stargazers">
    <img src="https://img.shields.io/github/stars/thespielplatz/nuxt-auth.svg?style=flat-square&colorA=202128&colorB=36936A" alt="Downloads">
  </a>
  <a href="https://github.com/thespielplatz/nuxt-auth/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/sidebase/nuxt-auth.svg?style=flat-square&colorA=202128&colorB=36936A" alt="License">
  </a>
</p>
<!-- Badges End -->

Simple DB agnostic Auth Module using jwt with a refresh token cookie and and access token in the authorization header

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

<!-- Highlight some of the features your module provide here -->
- Database agnostic
- Refresh Token in cookie & Auth Token in header

## Quick Setup

### 1. Install the package as a dev dependency

```sh
npm i -D @thespielplatz/nuxt-auth
```

### 2. Add the modules to your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@thespielplatz/nuxt-auth']
})
```

## Usage

### 1. Server

#### Implement & register an `IUserProidver`

The auth modiule needs an `IUserProidver` implemented and set via `userUserProvider().set(...)`. See playground implementation via plugin: [Source](playground/server/plugins/registerUserProvider.ts)

#### Use `defineLoggedInEventHandler((event, user) => {})` to saveguard api routes

When the user is authenticated from the IUserProvider the user object is passed to the
event handler. See playground implementation: [Source](playground/server/api/user.get.ts)

### 2. Frontend

Everyhing is found in the provided `$auth` in `useNuxtApp()`

```ts
<script setup lang="ts">
const { $auth } = useNuxtApp()
```

The auth module automatically send a refresh request to the server to check for the logged in state. You should wait for this request to be finished, before dooing any server api 
calls.

```ts
onMounted(async () => {
  const isLoggedIn = await $auth.isLoggedIn()
})
```

#### Auto redirect, if logged in

```ts
onMounted(async () => {
  await $auth.redirectIfLoggedIn()
})
```

- If this autoredirect is used, no wait via `$auth.isLoggedIn()` is necessary.
- Login redirection path can be configured in the module variables. Default: `/dashboard`

#### Auto redirect, if logged out


```ts
onMounted(async () => {
  await $auth.redirectIfLoggedOut()
})
```

- If this autoredirect is used, no wait via `$auth.isLoggedIn()` is necessary.
- Logout redirection path can be configured in the module variables. Default: `/`

#### Login

```ts
const login = async () => {
  const success = await $auth.loginWithAccessKey(accessKey.value)
  if (success) {
    await navigateTo('/dashboard')
  }
  else {
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

Start playing around in the playground 🎉

_(I was basically following the [nuxt module guide](https://nuxt.com/docs/guide/going-further/modules))_

## Support

If you like this project, give it a star! If you love it, fork it and take it out for dinner. 🌟🍽️ 

And hey, why not [send some tip love?](https://thespielplatz.com/tip-jar)
