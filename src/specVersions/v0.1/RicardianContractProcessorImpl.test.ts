import { Abi } from '../../interfaces'
import { RicardianContractProcessorImpl } from './RicardianContractProcessorImpl'

import { eosioTokenAbi, transferTransaction } from '../../testfixtures/fixtures'

const transaction = JSON.parse(transferTransaction)
const abi = JSON.parse(eosioTokenAbi)

// tslint:disable:max-line-length
describe('RicardianContractProcessorImp - v0.1', () => {
  const rcp = new RicardianContractProcessorImpl()
  const contractMetadata = '---\ntitle: Token Transfer\nsummary: Transfer tokens between accounts.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n'

  describe('amount_from_asset', () => {
    it('extracts the amount from an asset variable string', () => {
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nTransferring <div class="variable data">1500.0000</div> units of something<br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            ricardian_contract: contractMetadata +
              '## Transfer Terms & Conditions\n\nTransferring {{amount_from_asset quantity}} units of something\n',
          },
        ],
      }

      const rc = rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })
      expect(rc.getHtml()).toEqual(expectedHtml)

    })
  })
})
