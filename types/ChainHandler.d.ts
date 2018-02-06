import Handler from './Handler'

declare class ChainHandler extends Handler{
  constructor()
  chain: (nextHandler: Handler) => ChainHandler
}

export = ChainHandler
