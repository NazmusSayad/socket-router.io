import { HandlersMap, Namespace, OptionsPartial, Controller } from '../types'
import { checkNamespace } from './utils'
import { defaultOptions } from '../config'
import socketHandler from './socketHandler'
import Client from './Client'

export default class Router {
  static create() {
    return new Router()
  }

  #store = new Map() as HandlersMap

  #addRouter(path: string, router: Router) {
    const store = [...router.store]
    store.forEach(([key, handler]) => {
      const newEvent = path + key.event
      this.#store.set({ ...key, event: newEvent }, handler)
    })
  }

  #addCallback(path: string, cb: Controller) {
    this.#store.set({ event: path }, cb)
  }

  get store() {
    return this.#store
  }

  connect(namespace: Namespace, options?: OptionsPartial) {
    checkNamespace(namespace)
    const config = options ? { ...defaultOptions, ...options } : defaultOptions

    namespace.on('connect', (socket) => {
      socket.onAny((...args: any[]) => {
        const entries = this.#store.entries()
        const client = new Client(namespace, socket, args)
        socketHandler(entries, client, config)
      })
    })
  }

  on(path: string, ...handlers: (Controller | Router)[]) {
    handlers.forEach((handler) => {
      handler instanceof Router
        ? this.#addRouter(path, handler)
        : this.#addCallback(path, handler)
    })
  }

  use(...handlers: (Controller | Router)[]) {
    this.on('', ...handlers)
  }
}
