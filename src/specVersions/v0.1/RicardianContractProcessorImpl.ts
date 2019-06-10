import { RicardianContractProcessorImpl as RCP_0_0 } from '../v0.0/RicardianContractProcessorImpl'
import { parseAsset } from './helpers'

const implVersion = {
  major: 0,
  minor: 1,
}

export class RicardianContractProcessorImpl extends RCP_0_0 {
  constructor() {
    super()

    this.registerWrappedHelper('amount_from_asset', (asset: string): string => {
      return parseAsset(asset).amount
    })
  }

  public getSpecVersion() {
    return implVersion
  }
}
