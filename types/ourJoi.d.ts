import {Schema} from 'joi'
import * as Joi from 'joi'

declare module 'joi' {
  export const one: (resources: string[]) => Schema
  export const many: (resources: string[]) => Schema
}

export = Joi
