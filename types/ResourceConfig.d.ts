import {Schema} from 'joi'
import Handler = require('./Handler')

type BaseType = {
  id?: string
  type: string
}
type ResourceAttributes<Item> = {
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
