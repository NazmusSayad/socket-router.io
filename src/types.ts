import { Namespace as RawNamespace, Socket as RawSocket } from 'socket.io'

export type Socket = RawSocket
export type Namespace = RawNamespace

export type OptionsPartial = Partial<Options>
export interface Options {
  handleException(err: any, client: HandlerClient): void
}

export type NextFn = (err?: any) => void
export type SocketHandler<TBody extends any[] = any> = (
  client: HandlerClient<TBody>,
  next: NextFn
) => void | Promise<void>

export type HandlersMap = Map<HandlerConfig, SocketHandler>
export type HandlersList = [HandlerConfig, SocketHandler]
export type HandlersEntries = IterableIterator<[HandlerConfig, SocketHandler]>

export interface HandlerConfig {
  event?: string
}

export interface HandlerClient<TBody extends any[] = any> {
  isDone: boolean
  hasSendFn: boolean
  space: Namespace
  socket: Socket
  event: string
  body: TBody
  send(...args: any[]): void
}
