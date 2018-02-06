import {Application, Request} from 'express'
import {Schema} from 'joi'
import OurJoi = require('./ourJoi')
import ChainHandlerType = require('./ChainHandler')
import Handler = require('./Handler')
import MemoryHandlerType = require('./MemoryHandler')
import {ResourceConfig} from './ResourceConfig'


export type JsonApiProtocols = 'http' | 'https'

export interface ApiConfig {
  graphiql?: boolean
  jsonapi?: boolean
  protocol: JsonApiProtocols
  hostname: string
  port: number
  base: string,
  meta: any
  swagger?: any
}
export type ExampleObject = {
  type: string
  id?: string
  [x: string]: any
}

export const Joi: OurJoi
export const setConfig: (apiConfig: ApiConfig) => void
export const define: <T>(resConfig: ResourceConfig<T>) => void
export const authenticate: (authenticator: (req: Request, cb: () => void ) => void) => void
export const getExpressServer: () => Application
export type ChainHandler = ChainHandlerType
export type MemoryHandler = MemoryHandlerType
export const onUncaughtException: (err: Error) => void
export const start: () => void
export const close: () => void
