import { Namespace as RawNamespace, Socket as RawSocket } from 'socket.io'
import RawClient from './core/Client'

export type Socket = RawSocket
export type Namespace = RawNamespace
export type Client<TBody extends any[] = any[]> = RawClient<TBody>

export type OptionsPartial = Partial<Options>
export interface Options {
  handleException(err: any, client: Client): void
}

export type HandlersMap = Map<RouteConfig, Controller>
export type HandlersList = [RouteConfig, Controller]
export type HandlersEntries = IterableIterator<HandlersList>

export interface RouteConfig {
  event?: string
}

export type Controller<TBody extends any[] = any[]> = (
  client: Client<TBody>,
  next: (err?: any) => void
) => void | Promise<void>
