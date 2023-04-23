import Router from './core/Router'

export * from './types'
export default Router
export function createRouter() {
  return new Router()
}
