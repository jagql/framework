import {ResourceConfig} from './jsonApi'
import {PathParams} from 'express-serve-static-core'
import {Request, Response} from 'express'
interface HandlerErrorCallback<T> {
  (err?: Error, result?: T): any
}

type HttpVerbs = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

interface JsonApiRequest {
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

interface SearchFunction {
  // TODO: Define Request
  (request: JsonApiRequest, callback: HandlerErrorCallback<any[]>): void
}
interface FindFunction {
  // TODO: Define Request
  (request: JsonApiRequest, callback: HandlerErrorCallback<any>): void
}

interface CreateFunction {
  (request: JsonApiRequest, newResource: any, callback: HandlerErrorCallback<any>): void
}

interface DeleteFunction {
  (request: JsonApiRequest, callback: HandlerErrorCallback<void>): void
}

interface UpdateFunction {
  (request: JsonApiRequest, newPartialResource: any, callback: HandlerErrorCallback<any>): void
}

declare class Handler {
  initialise: (resConfig: ResourceConfig) => any
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
