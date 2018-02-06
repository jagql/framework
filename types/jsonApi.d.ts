import {Application, Request} from 'express'
import {Schema} from 'joi'
import OurJoi = require('./ourJoi')
import ChainHandler = require('./ChainHandler')
import Handler = require('./Handler')
import MemoryHandler = require('./MemoryHandler')


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
interface ResourceAttributes {
  [x: string]: Schema
}
export type ExampleObject = {
  type: string
  id?: string
  [x: string]: any
}
export interface ResourceConfig {
  namespace: string,
  resource: string,
  handlers: Handler
  primaryKey: string,
  attributes: ResourceAttributes
  examples: ExampleObject[]
}
export const Joi = OurJoi
export const setConfig: (apiConfig: ApiConfig) => void
export const define: (resConfig: ResourceConfig) => void
export const authenticate: (authenticator: (req: Request, cb: () => void ) => void) => void
export const getExpressServer: () => Application
export const ChainHandler = ChainHandler
export const MemoryHandler = MemoryHandler
export const onUncaughtException: (err: Error) => void
export const start: () => void
export const close: () => void
