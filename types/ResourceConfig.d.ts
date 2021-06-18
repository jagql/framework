/**
 * @module @jagql/framework
 */
import {Schema} from 'joi'
import {Handler} from './Handler'

export type BaseType = {
  id?: string
  type: string
}

export type ResourceAttributes<Item> = {
  [x in keyof Item]: Schema
}

export type OptionalResourceAttributes<Item> = {
  [x in keyof Item]?: Schema
}

type PrimaryKeyType = 'uuid' | 'autoincrement' | 'string'

export interface ResourceConfig<Item> {
  namespace?: string,
  description?: string,
  resource: string,
  handlers: Handler
  primaryKey: PrimaryKeyType,
  attributes: ResourceAttributes<Item>
  examples: (BaseType & Item)[]
  searchParams?: OptionalResourceAttributes<Item>
}
