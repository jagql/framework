import {CreateFunction, DeleteFunction, FindFunction, Handler, SearchFunction, UpdateFunction} from './Handler'

type BeforeSearchFunction = SearchFunction
type BeforeFindFunction = FindFunction
type BeforeCreateFunction = CreateFunction
type BeforeDeleteFunction = DeleteFunction
type BeforeUpdateFunction = UpdateFunction

/**
 * [[include:chain-handler.md]]
 */
declare class ChainHandler extends Handler{
  constructor()
  chain(nextHandler: Handler): this
  beforeInitialise(...args: any[]): any // TODO
  afterInitialise(...args: any[]): any // TODO
  beforeClose(...args: any[]): any // TODO
  afterClose(...args: any[]): any // TODO
  beforeSearch: BeforeSearchFunction
  afterSearch(): void
  beforeFind: BeforeFindFunction
  afterFind(): void
  beforeCreate: BeforeCreateFunction
  afterCreate(): void
  beforeUpdate: BeforeUpdateFunction
  afterUpdate(): void
  beforeDelete: BeforeDeleteFunction
  afterDelete(): void
}

export = ChainHandler
