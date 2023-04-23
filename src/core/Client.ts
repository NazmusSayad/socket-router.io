import { Namespace, Socket } from '../types'
import { parseEventAndBodyAndSendFn } from './utils'

export default class Client<TBody extends any[]> {
  body: TBody
  event
  space
  socket

  #isDone = false
  get isDone() {
    return this.#isDone
  }

  #sendFn
  get hasSendFn() {
    return Boolean(this.#sendFn)
  }

  constructor(space: Namespace, socket: Socket, args: any[]) {
    const [event, body, sendFn] = parseEventAndBodyAndSendFn(args)
    this.event = event
    this.body = body
    this.#sendFn = sendFn
    this.space = space
    this.socket = socket
  }

  emit(...args: any[]) {
    this.space.emit(this.event, ...args)
  }

  return(...args: any) {
    if (this.#isDone) throw new Error('Can not send data twice!')
    this.#isDone = true
    this.#sendFn && this.#sendFn(...args)
  }
}
