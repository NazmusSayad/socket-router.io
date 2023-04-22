import { HandlersMap, SocketHandler } from '../types'

export function createListCore(store: HandlersMap) {
  return {
    get store() {
      return store
    },

    useList(...args: any[]) {
      args.forEach(({ store: list }: { store: HandlersMap }) => {
        ;[...list].forEach(([key, handler]) => {
          store.set(key, handler)
        })
      })
    },

    use<T extends any[]>(...callbacks: SocketHandler<T>[]) {
      callbacks.forEach((handler) => {
        store.set({}, handler)
      })
    },

    on<T extends any[]>(event: string, ...callbacks: SocketHandler<T>[]) {
      callbacks.forEach((handler) => {
        store.set({ event }, handler)
      })
    },
  }
}
