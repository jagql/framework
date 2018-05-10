
declare module '@jagql/framework/lib/handlers/Handler' {

  import {PathParams} from 'express-serve-static-core'
  import {Request, Response} from 'express'
  import {ResourceConfig} from '@jagql/framework'

  export type HttpVerbs = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

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

  export interface HandlerCallback<R, C = undefined> {
    <R,C>(err?: JsonApiError, result?: R, count?: C): any
    <R>(err?: JsonApiError, result?: R): any
  }


  export interface SearchFunction<R=any> {
    (request: JsonApiRequest, callback: HandlerCallback<R[], number>): void
  }
  export interface FindFunction<R=any> {
    (request: JsonApiRequest, callback: HandlerCallback<R>): void
  }

  export interface CreateFunction<R=any> {
    (request: JsonApiRequest, newResource: R, callback: HandlerCallback<R>): void
  }

  export interface DeleteFunction {
    (request: JsonApiRequest, callback: HandlerCallback<void>): void
  }

  export interface UpdateFunction<R=any> {
    (request: JsonApiRequest, newPartialResource: Partial<R>, callback: HandlerCallback<R>): void
  }

  /**
   * [[include:handlers.md]]
   * @param R type of resource (if unspecified, `any`)
   */
  class Handler<R=any> {
    constructor(o?: any)
    initialise(resConfig: ResourceConfig<R>): any
    create: CreateFunction<R>
    search: SearchFunction<R>
    find: FindFunction<R>
    update: UpdateFunction<R>
    delete: DeleteFunction
    close: () => any
    ready: boolean
    handlesSort: boolean
    handlesFilter: boolean
  }

  export {
    Handler
  }
}
