import { Abi } from '../../interfaces'
import { RicardianContractProcessorImpl } from './RicardianContractProcessorImpl'

import { eosioTokenAbi, transferTransaction } from '../../testfixtures/fixtures'

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
  })

  describe('permission_in_permission_level', () => {
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

  describe('amount_from_asset', () => {
    it('extracts the amount from an asset variable string', () =>{
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

  describe('symbol_name_from_asset', () => {
    it('extracts the amount from an asset variable string', () =>{
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nTransferring a random amount of <div class="variable data">EOS</div><br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            ricardian_contract: contractMetadata +
              '## Transfer Terms & Conditions\n\nTransferring a random amount of {{symbol_name_from_asset quantity}}\n',
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

  describe('verify if', () => {
    it('should detect presence of field in action data', () => {
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nTransferring <div class="variable data">1500.0000 EOS</div><br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            ricardian_contract: contractMetadata +
              '## Transfer Terms & Conditions\n\nTransferring {{#if quantity}}{{quantity}}{{/if}}\n',
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

    it('should detect absense of field in action data', () => {
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nTransferring<br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            ricardian_contract: contractMetadata +
              '## Transfer Terms & Conditions\n\nTransferring {{#if cheese}}Why do we have cheese? {{cheese}}{{/if}}\n',
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
