/// <reference types="joi" />
/**
 * @module @jagql/framework/lib/ourJoi
 */
import {AnySchema, JoiObject, Schema, FunctionSchema} from 'joi'
import BaseJoi = require('joi')

type UidType = 'uuid' | 'autoincrement'

interface OurJoiSchema extends AnySchema {
  uidType(type: UidType): this
}
interface ActionConfig {
  params: {
    [x: string]: Schema
  }
  get?()
  post?()
}
interface OurJoi extends BaseJoi.Root {
  one(...model: string[]): OurJoiSchema
  many(...model: string[]): OurJoiSchema
  belongsToOne(model: string): OurJoiSchema
  belongsToMany(model: string): OurJoiSchema
  action(config: ActionConfig): FunctionSchema
}

export const Joi: OurJoi