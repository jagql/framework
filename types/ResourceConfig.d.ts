import {Schema} from 'joi'
import Handler = require('./Handler')

export type BaseType = {
  id?: string
  type: string
}
export type ResourceAttributes<Item> = {
  [x in keyof Item]: Schema
}

export interface ResourceConfig<Item> {
  namespace: string,
  resource: string,
  handlers: Handler
  primaryKey: string,
  attributes: ResourceAttributes<Item>
  examples: (BaseType & Item)[]
}
