import {Application, Request} from 'express'
import {Schema} from 'joi'
import OurJoi = require('./ourJoi')
import ChainHandlerType = require('./ChainHandler')
import MemoryHandlerType = require('./MemoryHandler')
import {ResourceConfig} from './ResourceConfig'
import {Metrics} from './metrics'
export * from './metrics'
export * from './ResourceConfig'
export * from './Handler'


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

/**
 * Our modified Joi instance
 */
export const Joi: OurJoi

/**
 * [[include:configuring.md]]
 * @param {ApiConfig} apiConfig
 */
export function setConfig(apiConfig: ApiConfig): void

/**
 * [[include:resources.md]]
 * @param {ResourceConfig<T>} resConfig
 */
export function define<T>(resConfig: ResourceConfig<T>): void
export function authenticate(authenticator: (req: Request, cb: () => void ) => void): void
export const metrics: Metrics
export function getExpressServer(): Application
export const ChainHandler: typeof ChainHandlerType
export const MemoryHandler: typeof MemoryHandlerType
export function onUncaughtException(err: Error): void
export function start(cb: () => void): void
export function close(): void
