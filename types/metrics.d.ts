/**
 * @module jagapi
 */
import {EventEmitter} from 'events'
import {HttpVerbs} from './Handler'

export interface MetricsData {
  route: string
  verb: HttpVerbs
  httpCode: number
  error?: string
  duration: number
}

export interface MetricsListener {
  (data: MetricsData): void
}

type MetricsEventName = 'data'

/**
 * [[include:metrics.md]]
 */
export declare class Metrics extends EventEmitter {
  on(event: MetricsEventName, listener: MetricsListener): this
}
