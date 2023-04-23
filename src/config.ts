import { Client } from './types'

export const defaultOptions = {
  handleException(err: any, client: Client) {
    // throw err
  },
}

export const namespaceKey = '___ socket-router.io attached ___'
