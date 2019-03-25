import { Abi } from '../../interfaces'
// import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import { RicardianContractProcessorImpl } from './RicardianContractProcessorImpl'

// import {
//   complexEosioTokenAbi,
//   complexExpectedHtml,
//   complexExpectedMetadata,
//   complexTransferTransaction,
// } from '../../testfixtures/complex-fixtures'
import { eosioTokenAbi, transferTransaction } from '../../testfixtures/fixtures'

// const complexMetadata = JSON.parse(complexExpectedMetadata)
// const complexTransaction = JSON.parse(complexTransferTransaction)
// const complexAbi = JSON.parse(complexEosioTokenAbi)

const transaction = JSON.parse(transferTransaction)
const abi = JSON.parse(eosioTokenAbi)

// tslint:disable:max-line-length
describe('RicardianContractProcessorImp - v1.1', () => {
  const rcp = new RicardianContractProcessorImpl()
  const contractMetadata = '---\ntitle: Token Transfer\nsummary: Transfer tokens between accounts.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n'

  describe('account_in_permission_level', () => {

    it('extracts the account from a permission_level object', () => {
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nAuthorization is given by <div class=\"variable data\">thegazelle</div><br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            ricardian_contract: contractMetadata +
              '## Transfer Terms & Conditions\n\nAuthorization is given by {{account_in_permission_level $action.authorization.[0]}}\n',
          },
        ],
      }

      const rc = rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 2,
      })
      expect(rc.getHtml()).toEqual(expectedHtml)
    })

    it('extracts the permission from a permission_level object', () => {
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nAuthorization has permissions <div class=\"variable data\">active</div><br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            ricardian_contract: contractMetadata +
              '## Transfer Terms & Conditions\n\nAuthorization has permissions {{permission_in_permission_level $action.authorization.[0]}}\n',
          },
        ],
      }

      const rc = rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 2,
      })
      expect(rc.getHtml()).toEqual(expectedHtml)
    })
  })
})
