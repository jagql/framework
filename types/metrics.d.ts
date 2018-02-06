import {EventEmitter} from 'events'
import HttpVerbs = require('./Handler')

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


export class Metrics extends EventEmitter {
  on: (event: 'data', listener: MetricsListener) => this
}
