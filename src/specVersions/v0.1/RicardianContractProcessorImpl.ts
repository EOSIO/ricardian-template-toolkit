import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import { RicardianContractProcessorImpl as RCP_0_0 } from '../v0.0/RicardianContractProcessorImpl'
import { parseAsset } from './helpers'

const implVersion = {
  major: 0,
  minor: 1,
}

export class RicardianContractProcessorImpl extends RCP_0_0 {
  constructor() {
    super()

    this.registerWrappedHelper('account_in_permission_level', (permissionLevel: any): string => {
      if (permissionLevel.actor) {
        return permissionLevel.actor
      }

      throw new RicardianContractRenderError(`No 'actor' found in given permission_level`)
    })

    this.registerWrappedHelper('permission_in_permission_level', (permissionLevel: any): string => {
      if (permissionLevel.permission) {
        return permissionLevel.permission
      }

      throw new RicardianContractRenderError(`No 'permission' found in given permission_level`)
    })

    this.registerWrappedHelper('amount_from_asset', (asset: string): string => {
      return parseAsset(asset).amount
    })

    this.registerWrappedHelper('symbol_name_from_asset', (asset: string): string => {
      return parseAsset(asset).symbol
    })
  }

  public getSpecVersion() {
    return implVersion
  }
}
