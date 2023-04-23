import { Namespace } from '../types'
import { namespaceKey } from '../config'
import { Namespace as RawNamespace } from 'socket.io'

export function checkNamespace(namespace: Namespace) {
  if (!(namespace instanceof RawNamespace)) {
    throw new Error('First argument must be a namespace')
  }

  if ((namespace as any)[namespaceKey]) {
    throw new Error('Another router attached with this namespace')
  }

  Object.defineProperty(namespace, namespaceKey, {
    value: true,
    writable: false,
    enumerable: false,
    configurable: false,
  })
}

export const parseEventAndBodyAndSendFn = (rawArgs: any[]) => {
  const [event, ...args] = rawArgs
  const lastElement = args[args.length - 1]

  return lastElement instanceof Function
    ? [event, args.slice(0, -1), lastElement]
    : [event, args]
}
