import { Namespace as RawNamespace } from 'socket.io'
import { HandlersMap, Namespace, OptionsPartial } from './types'
import { defaultOptions } from './config'
import { createListCore } from './core/createListCore'
import createClient from './core/createClient'
import socketHandler from './socketHandler'

export function createRouter(namespace: Namespace, options?: OptionsPartial) {
  if (!(namespace instanceof RawNamespace)) {
    throw new Error('First argument must be a namespace')
  }

  const store = new Map() as HandlersMap
  const config = options ? { ...defaultOptions, ...options } : defaultOptions

  namespace.on('connect', (socket) => {
    socket.onAny((...args: any[]) => {
      const entries = store.entries()
      const client = createClient(namespace, socket, args)
      socketHandler(entries, client, config)
    })
  })

  return createListCore(store)
}

export function createList() {
  const store = new Map() as HandlersMap
  return createListCore(store)
}

export default createRouter
