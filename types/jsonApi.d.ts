/**
 * @module @jagql/framework
 */

/// <reference types="express" />

import {Application, Request} from 'express'
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
  hostname: string
  port: number
  base: string,
  meta: any
  swagger?: any
}
/**
 * Our modified Joi instance
 */
export const Joi: typeof OurJoi.Joi

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
export function authenticate(authenticator: (req: Request, cb: () => void) => void): void

/**
 * [[include:metrics.md]]
 */
export const metrics: Metrics
export function getExpressServer(): Application
export const ChainHandler: typeof ChainHandlerType
export const MemoryHandler: typeof MemoryHandlerType
export function onUncaughtException(err: Error): void
export function start(callback: Function): void
export function close(): void
