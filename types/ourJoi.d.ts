import {Schema} from 'joi'
import Joi = require('joi')

interface OurJoi extends Joi.Root {
  one: (...model: string[]) => Schema
  many: (...model: string[]) => Schema
}

export = OurJoi
