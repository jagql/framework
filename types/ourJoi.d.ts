import {AnySchema, JoiObject, Schema} from 'joi'
import Joi = require('joi')

type UidType = 'uuid' | 'autoincrement'

interface OurJoiSchema extends AnySchema {
  uidType: (type: UidType) => this
}

interface OurJoi extends Joi.Root {
  one: (...model: string[]) => OurJoiSchema
  many: (...model: string[]) => OurJoiSchema
}

export = OurJoi
