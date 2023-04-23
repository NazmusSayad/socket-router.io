# socket-router.io

Inspired by express

## Features

- TypeScript full support
- Custom Error with message and statusCode
- Error catcher function with a geart durablity
- Error handler with common situations

<a href="https://npmjs.com/package/socket-router.io">
  <img src="https://img.shields.io/npm/v/socket-router.io" alt="npm package"> 
</a>

---

## Installation

- with npm

```shell
npm i socket-router.io socket.io
```

- with yarn

```shell
yarn add socket-router.io socket.io
```

- with pnpm

```shell
pnpm add socket-router.io socket.io
```

<br/> <br/>

# Express

Configure your application with whatever configuration you want.

## Basic Usage:

`/* app.js */`

```js
import { createServer } from 'http'
import { Server } from 'socket.io'
import router from './router'

const httpServer = createServer()

const io = new Server(httpServer)
const namespace = io.of('/')

router.connect(namespace)
httpServer.listen(3000)
```

`/* router.js */`

```js
import Router, { createRouter } from 'socket-router.io'
import nestedRouter from './nestedRouter'

/* Use any of them */
const router = new Router()
const router = createRouter()
const router = Router.create()

router.use((client, next) => {
  // Do your stuff...
  next()
})

router.on('event', (client, next) => {
  // Do your stuff...
  next()
})

router.on('event', (client, next) => {
  client.return('Hello world!')
})

router.on('user', nestedRouter)
```

`/* nestedRouter.js */`

```js
import Router from 'socket-router.io'
const router = new Router()

router.use((client, next) => {
  // Do your stuff...
  next()
})

// This will work as "user/get"
router.on('/get', (client, next) => {
  client.return('User: John Doe')
})

// This will work as "user/post"
router.on('/post', (client, next) => {
  console.log(client.body)
  client.return('User: John Doe created!')
})
```

## <br/>

<br/>

---

Made by [Nazmus Sayad](https://github.com/NazmusSayad) with ❤️.
