import * as utils from './contractUtils'

import {
  complexEosioTokenAbi,
  complexTransferTransaction,
} from '../testfixtures/complex-fixtures'
import { eosioTokenAbi, transferTransaction } from '../testfixtures/fixtures'

const complexTransaction = JSON.parse(complexTransferTransaction)
const complexAbi = JSON.parse(complexEosioTokenAbi)

const transaction = JSON.parse(transferTransaction)
const abi = JSON.parse(eosioTokenAbi)

describe('getContractSpecVersion', () => {
  it('returns the default spec version if none found', () => {
    const specVersion = utils.getContractSpecVersion({
      abi: complexAbi,
      transaction: complexTransaction,
      actionIndex: 0,
    })
    expect(specVersion).toEqual({ major: 0, minor: 0, patch: 0 })
  })

  it('returns the spec version if found', () => {
    const newAbi = {
      ...abi,
      actions: [{
        name: 'transfer',
        type: 'transfer',
        // tslint:disable-next-line:max-line-length
        ricardian_contract: '---\nspec_version: \'1.2.3\'\ntitle: Token Transfer\nsummary: \'{{$metadata.summary}}\'\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\n',
      }],
    }

    const specVersion = utils.getContractSpecVersion({
      abi: newAbi,
      transaction,
      actionIndex: 0,
    })

    expect(specVersion).toEqual({ major: 1, minor: 2, patch: 3 })
  })

})
