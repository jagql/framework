import {Handler} from './Handler'

declare class ChainHandler extends Handler{
  constructor()
  chain(nextHandler: Handler): ChainHandler
  beforeInitialise(): void
  afterInitialise(): void
  beforeClose(): void
  afterClose(): void
  beforeSearch(): void
  afterSearch(): void
  beforeFind(): void
  afterFind(): void
  beforeCreate(): void
  afterCreate(): void
  beforeUpdate(): void
  afterUpdate(): void
  beforeDelete(): void
  afterDelete(): void
}

export = ChainHandler
