/**
 * @module @jagql/framework
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
export declare class Metrics extends EventEmitter {
  on(event: MetricsEventName, listener: MetricsListener): this
}
