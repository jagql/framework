/**
 * @module @jagql/framework
 */

/// <reference types="express" />

import {Application, Request, Router} from 'express'
import {Schema} from 'joi'
import OurJoi = require('./ourJoi')
import ChainHandlerType = require('./ChainHandler')
import MemoryHandlerType = require('./MemoryHandler')
import {ResourceConfig} from './ResourceConfig'
import {Metrics} from './metrics'
import * as RC from './ResourceConfig'
import * as H from './Handler'

export import ResourceConfig = RC.ResourceConfig

type JsonApiProtocols = 'http' | 'https'
export import Handler = H.Handler
export import BaseType = RC.BaseType

interface ApiConfig {
  graphiql?: boolean
  jsonapi?: boolean
  protocol: JsonApiProtocols
  urlPrefixAlias?: string
  hostname: string
  port: number
  base: string,
  meta: any
  swagger?: any
  router?: Router
  bodyParserJsonOpts?: any
}
/**
 * Our modified Joi instance
 */
export const Joi: typeof OurJoi.Joi

/**
 * Configure things like -
 *  - http/https
 *  - host, port
 *  - enable/disable graphql and swagger
 *
 * For detailed info please check https://jagql.github.io/docs/pages/configuration.html
 * @param {ApiConfig} apiConfig
 */
export function setConfig(apiConfig: ApiConfig): void

/**
 * [[include:resources.md]]
 * @param {ResourceConfig<T>} resConfig
 */
export function define<T>(resConfig: ResourceConfig<T>): void
export function authenticate(authenticator: (req: Request, cb: () => void) => void): void

/**
 * Application metrics are generated and exposed via an event emitter interface.
 * Whenever a request has been processed and it about to be returned to the customer,
 * a `data` event will be emitted:
 *
 * ```javascript
 * jsonApi.metrics.on("data", function(data) {
 *   // send data to your metrics stack
 * });
 * ```
 *
 * For details read - https://jagql.github.io/docs/pages/debugging/metrics.html
 */
export const metrics: Metrics
export function getExpressServer(): Application
export const ChainHandler: typeof ChainHandlerType
export const MemoryHandler: typeof MemoryHandlerType
export function onUncaughtException(err: Error): void
export function start(callback: Function): void
export function close(): void
