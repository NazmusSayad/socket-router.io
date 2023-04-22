import { HandlerClient } from './types'

export const defaultOptions = {
  handleException(err: any, client: HandlerClient) {
    // throw err
  },
}
