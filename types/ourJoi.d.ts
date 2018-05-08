/**
 * @module @jagql/framework/lib/ourJoi
 */
/// <reference types="joi" />
import {AnySchema, JoiObject, Schema, FunctionSchema} from 'joi'
import Joi = require('joi')

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
interface OurJoi extends Joi.Root {
  one(...model: string[]): OurJoiSchema
  many(...model: string[]): OurJoiSchema
  belongsToOne(model: string): OurJoiSchema
  belongsToMany(model: string): OurJoiSchema
  action(config: ActionConfig): FunctionSchema
}

export = OurJoi
