import { RicardianContractRenderError } from '../../RicardianContractRenderError'

export interface Asset {
  amount: string,
  symbol: string
}

export const parseAsset = (asset: string): Asset => {
  const assetMatch = /^((\d+\.)?\d+) +([A-Z]+)$/
  const match  = assetMatch.exec(asset)
  if (match) {
    return {
      amount: match[1],
      symbol: match[3],
    }
  }

  throw new RicardianContractRenderError(`Unable to parse '${asset}' as an asset string`)
}
