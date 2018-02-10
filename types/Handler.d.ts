/**
 * @module jagapi
 */
import {PathParams} from 'express-serve-static-core'
import {Request, Response} from 'express'
import {ResourceConfig} from './ResourceConfig'

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

interface JsonApiError {
  status: string
  code: string
  title: string
  detail: string
}

interface HandlerCallback<R, C = undefined> {
  <R,C>(err?: JsonApiError, result?: R, count?: C): any
  <R>(err?: JsonApiError, result?: R): any
}


interface SearchFunction {
  (request: JsonApiRequest, callback: HandlerCallback<any[], number>): void
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

/**
 * [[include:handlers.md]]
 */
export declare class Handler {
  constructor(o?: any)
  initialise(resConfig: ResourceConfig<any>): any
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
