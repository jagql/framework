import {Schema} from 'joi'
import * as OurJoi from 'joi'

declare namespace OurJoi {
  export const one: (resources: string[]) => Schema
  export const many: (resources: string[]) => Schema
}

export = OurJoi
