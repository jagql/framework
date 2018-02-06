import {ResourceConfig} from './jsonApi'
import {PathParams} from 'express-serve-static-core'
import {Request, Response} from 'express'

type HttpVerbs = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export interface JsonApiRequest {
  params: any
  headers: any
  safeHeaders: any
  cookies: any
  originalUrl: string
  express: {
    req: Request,
    res: Response
  }
  route: {
    verb: HttpVerbs
    host: string
    base: string
    path: string
    query: string
    combined: string
  }
}

export interface JsonApiError {
  status: string
  code: string
  title: string
  detail: string
}

export interface HandlerCallback<T> {
  (err?: JsonApiError, result?: T): any
}


interface SearchFunction {
  (request: JsonApiRequest, callback: HandlerCallback<any[]>): void
}
interface FindFunction {
  (request: JsonApiRequest, callback: HandlerCallback<any>): void
}

interface CreateFunction {
  (request: JsonApiRequest, newResource: any, callback: HandlerCallback<any>): void
}

interface DeleteFunction {
  (request: JsonApiRequest, callback: HandlerCallback<void>): void
}

interface UpdateFunction {
  (request: JsonApiRequest, newPartialResource: any, callback: HandlerCallback<any>): void
}

declare class Handler {
  constructor(o?: any)
  initialise: (resConfig: ResourceConfig<any>) => any
  create: CreateFunction
  search: SearchFunction
  find: FindFunction
  update: UpdateFunction
  delete: DeleteFunction
  close: () => any
  ready: boolean
  handlesSort: boolean
  handlesFilter: boolean
}

export = Handler
