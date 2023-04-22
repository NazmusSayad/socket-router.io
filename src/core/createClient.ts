import { HandlerClient, Namespace, Socket } from '../types'

const parseArgs = (args: any[]) => {
  if (args.at(-1) instanceof Function) {
    return [args.slice(0, -1), args.at(-1)]
  }
  return [args]
}

function createClient(space: Namespace, socket: Socket, rawArgs: any[]) {
  const [event, ...args] = rawArgs
  const [body, sendFn] = parseArgs(args)

  const client: HandlerClient = {
    body,
    event,
    space,
    socket,

    isDone: false,
    hasSendFn: Boolean(sendFn),

    send(...args: any) {
      if (this.isDone) throw new Error('Can not send data twice!')
      this.isDone = true
      sendFn && sendFn(...args)
    },
  }

  return client
}

export default createClient
