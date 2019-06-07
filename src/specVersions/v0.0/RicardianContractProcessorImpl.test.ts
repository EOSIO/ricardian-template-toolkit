import { Abi, ContractMetadata, RicardianContract } from '../../interfaces'
import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import { RicardianContractProcessorImpl } from './RicardianContractProcessorImpl'

import {
  complexEosioTokenAbi,
  complexExpectedHtml,
  complexExpectedMetadata,
  complexTransferTransaction,
} from '../../testfixtures/complex-fixtures'
import { eosioTokenAbi, transferTransaction } from '../../testfixtures/fixtures'

const complexMetadata = JSON.parse(complexExpectedMetadata)
const complexTransaction = JSON.parse(complexTransferTransaction)
const complexAbi = JSON.parse(complexEosioTokenAbi)

const transaction = JSON.parse(transferTransaction)
const abi = JSON.parse(eosioTokenAbi)

const ricardianMetadata: ContractMetadata = {
  spec_version: '0.0.0',
  title: 'Token Transfer',
  summary: 'Transfer tokens from one account to another.',
  icon: 'https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562',
}
// tslint:disable:max-line-length
const ricardianHtml: string = `<h2>Transfer Terms & Conditions</h2>
I, <div class=\"variable data\">bobsmith</div>, certify the following to be true to the best of my knowledge:<br />
<ol>
<li>I certify that <div class=\"variable data\">123.0000 EOS</div> is not the proceeds of fraudulent or violent activities.</li>
<li>I certify that, to the best of my knowledge, <div class=\"variable data\">alicejones</div> is not supporting initiation of violence against others.</li>
<li>I have disclosed any contractual terms & conditions with respect to <div class=\"variable data\">123.0000 EOS</div> to <div class=\"variable data\">alicejones</div>.</li>
</ol>
I understand that funds transfers are not reversible after the <div class=\"variable transaction\">0</div> seconds or other delay as configured by <div class=\"variable data\">bobsmith</div>\'s permissions.<br />
If this action fails to be irreversibly confirmed after receiving goods or services from \'<div class=\"variable data\">alicejones</div>\', I agree to either return the goods or services or resend <div class=\"variable data\">123.0000 EOS</div> in a timely manner.<br />
<div class=\"variable clauses\">You are sending this transfer with the following memo: <div class=\"variable data\">Testing.</div></div><br />
Oh, and one more thing...<br />
<div class=\"variable clauses\">I, <div class=\"variable data\">bobsmith</div>, swear by the moon and the stars in the sky<br />
I\'ll be there<br />
I swear like a shadow that\'s by your side<br />
I\'ll be there<br />
For better or worse, till death do us part<br />
I\'ll love you with every beat of my heart<br />
And I swear</div><br />
<div class=\"variable clauses\"><img src=\"https://files.readme.io/aeb2530-small-logo_2x.png#HA8HG03SH3R3\" alt=\"EOS ricardian_contract_images\" /></div><br />
`
// tslint:enable:max-line-length

describe('RicardianContractProcessorImp - v0.0', (): void => {
  const rcp = new RicardianContractProcessorImpl()

  describe('provided a valid transaction and ABI', (): void => {
    let rc: RicardianContract

    beforeAll((): void => {
      rc = rcp.process({
        abi,
        transaction,
        actionIndex: 1,
      })
    })

    it('has the right metadata', (): void => {
      expect(rc.getMetadata()).toEqual(ricardianMetadata)
    })

    it('outputs the right HTML', (): void => {
      expect(rc.getHtml()).toEqual(ricardianHtml)
    })

    // tslint:disable-next-line:max-line-length
    it('succeeds when the exact number of passes required to fully interpolate the contract body === MAX_PASSES', () => {
      const exactRc = rcp.process({
        abi,
        transaction,
        actionIndex: 1,
        maxPasses: 2,
      })
      expect(exactRc.getHtml()).toEqual(ricardianHtml)
    })

    // tslint:disable-next-line:max-line-length
    it('succeeds when the exact number of passes required to fully interpolate the contract metadata === MAX_PASSES', (): void => {
      const newAbi: Abi = {
        ...abi,
        actions: [{
          name: 'transfer',
          type: 'transfer',
          // tslint:disable-next-line:max-line-length
          ricardian_contract: '---\ntitle: Token Transfer\nsummary: \'{{$metadata.summary}}\'\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\n',
        }],
      }

      const exactRc = rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 2,
        maxPasses: 2,
      })
      // tslint:disable-next-line:max-line-length
      expect(exactRc.getMetadata().summary).toEqual('<div class="variable metadata">Transfer from <div class="variable data">bobsmith</div> to <div class="variable data">alicejones</div></div>')

    })

  })

  describe('when variables appear in the contract body', () => {
    it('wraps variables in <div> tags', () => {
      // tslint:disable-next-line:max-line-length
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nThis contract describes the <div class=\"variable metadata\">Transfer from <div class=\"variable data\">bobsmith</div> to <div class=\"variable data\">alicejones</div></div><br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            // tslint:disable-next-line:max-line-length
            ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens between accounts.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nThis contract describes the {{ $metadata.summary }}\n',
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

    it('handles token symbols properly', () => {
      // tslint:disable-next-line:max-line-length
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nThis contract describes the transfer of <div class=\"variable data\">EOS</div> tokens<br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            // tslint:disable-next-line:max-line-length
            ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens between accounts.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nThis contract describes the transfer of {{asset_to_symbol_code quantity}} tokens\n',
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

    it('handles unwrapped token symbols properly', () => {
      // tslint:disable-next-line:max-line-length
      const expectedHtml = `<h2>Transfer Terms & Conditions</h2>\nThis contract describes the transfer of EOS tokens<br />\n`
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            // tslint:disable-next-line:max-line-length
            ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens between accounts.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nThis contract describes the transfer of {{nowrap (asset_to_symbol_code quantity)}} tokens\n',
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

  describe('when variables appear in metadata', (): void => {
    it('replaces variables except in title or icon metadata', (): void => {
      // tslint:disable-next-line:max-line-length
      const expectedSummary = 'Transfer tokens from <div class="variable data">alicejones</div> to <div class="variable data">bobsmith</div>.'
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            // tslint:disable-next-line:max-line-length
            ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens from {{from}} to {{to}}.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n',
          },
        ],
      }

      const rc = rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })
      expect(rc.getMetadata().summary).toEqual(expectedSummary)
    })

    it('does not replace variables in title metadata', (): void => {
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            // tslint:disable-next-line:max-line-length
            ricardian_contract: '---\ntitle: Token Transfer from {{from}}\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n',
          },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(RicardianContractRenderError)
    })

    it('does not replace variables in icon metadata', (): void => {
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            // tslint:disable-next-line:max-line-length
            ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens from one account to another.\nicon: https://{{server}}.com/token-transfer.png\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n',
          },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(RicardianContractRenderError)
    })

    it('replaces variables in non-standard metadata', (): void => {
      const expectedSender = '<div class="variable data">alicejones</div>'
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            // tslint:disable-next-line:max-line-length
            ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\nsender: \'{{from}}\'\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n',
          },
        ],
      }

      const rc = rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })
      expect(rc.getMetadata().sender).toEqual(expectedSender)
    })

    it('throws an error on unquoted metadata value starting with a variable', (): void => {
      const newAbi: Abi = {
        ...abi,
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            // tslint:disable-next-line:max-line-length
            ricardian_contract: '---\ntitle: Token Transfer\nsummary: {{from}} Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\nsender: \'{{from}}\'\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n',
          },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(RicardianContractRenderError)
    })
  })

  describe('provided an invalid abi and/or transaction', (): void => {
    // tslint:disable-next-line:max-line-length
    it('throws an error when provided an ABI containing a Ricardian contract with out-of-context variables in body content', (): void => {
      const malformedAbi: Abi = {
        ...abi,
        actions: [{
          name: 'transfer',
          type: 'transfer',
          // tslint:disable-next-line:max-line-length
          ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\n{{whoa}}',
        }],
      }

      expect(() => rcp.process({
        abi: malformedAbi,
        transaction,
        actionIndex: 1,
      })).toThrow('Handlebars error: "whoa" not defined in')

      expect(() => rcp.process({
        abi: malformedAbi,
        transaction,
        actionIndex: 1,
      })).toThrowError(RicardianContractRenderError)
    })

    // tslint:disable-next-line:max-line-length
    it('throws an error when provided an ABI containing a Ricardian contract with out-of-context variables in metadata content', (): void => {
      const malformedAbi: Abi = {
        ...abi,
        actions: [{
          name: 'transfer',
          type: 'transfer',
          // tslint:disable-next-line:max-line-length
          ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer {{whoa}} tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\n',
        }],
      }

      expect(() => rcp.process({
        abi: malformedAbi,
        transaction,
        actionIndex: 1,
      })).toThrow('Handlebars error: "whoa" not defined in')

      expect(() => rcp.process({
        abi: malformedAbi,
        transaction,
        actionIndex: 1,
      })).toThrowError(RicardianContractRenderError)
    })

    // tslint:disable-next-line:max-line-length
    it('throws an error when it reaches the maximum number of interpolation passes and uninterpolated variables remain in body content', (): void => {
      expect(() => rcp.process({
        abi,
        transaction,
        actionIndex: 1,
        maxPasses: 1,
      })).toThrow('Contract has uninterpolated variables after maximum number of variable interpolation passes.')

      expect(() => rcp.process({
        abi,
        transaction,
        actionIndex: 1,
        maxPasses: 1,
      })).toThrowError(RicardianContractRenderError)
    })

    // tslint:disable-next-line:max-line-length
    it('throws an error when it reaches the maximum number of interpolation passes and uninterpolated variables remain in metadata content', (): void => {
      const newAbi: Abi = {
        ...abi,
        actions: [{
          name: 'transfer',
          type: 'transfer',
          // tslint:disable-next-line:max-line-length
          ricardian_contract: '---\ntitle: Token Transfer\nsummary: \'{{$metadata.summary}}\'\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\n',
        }],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 2,
        maxPasses: 1,
        // tslint:disable-next-line:max-line-length
      })).toThrow('Contract has uninterpolated metadata variables after maximum number of variable interpolation passes.')

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 1,
        maxPasses: 1,
      })).toThrowError(RicardianContractRenderError)
    })

    it('throws an error when it cannot find an action in the ABI matching the current transaction action', (): void => {
      const malformedAbi: Abi = {
        ...abi,
        actions: [{
          name: 'partyon',
          type: 'partyon',
          // tslint:disable-next-line:max-line-length
          ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\n{{whoa}}',
        }],
      }
      expect(() => rcp.process({
        abi: malformedAbi,
        transaction,
        actionIndex: 1,
      })).toThrow('Matching ABI not provided for given action.')

      expect(() => rcp.process({
        abi: malformedAbi,
        transaction,
        actionIndex: 1,
      })).toThrowError(RicardianContractRenderError)
    })

    // tslint:disable-next-line:max-line-length
    it('throws an error when provided an ABI containing a Ricardian contract with invalid HTML', (): void => {
      const malformedAbi: Abi = {
        ...abi,
        actions: [{
          name: 'transfer',
          type: 'transfer',
          // tslint:disable-next-line:max-line-length
          ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}} <div class=\'cheese\'>the magnificent',
        }],
      }

      expect(() => rcp.process({
        abi: malformedAbi,
        transaction,
        actionIndex: 1,
      })).toThrow(RicardianContractRenderError)
    })
  })

  describe('in developer mode', (): void => {
    let action: any
    beforeEach(() => {
      action = {
        name: 'transfer',
        type: 'transfer',
      }
    })

    it('doesn\'t throw with unused variables', (): void => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\ntitle: Token Transfer\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\n{{whoa}}'
      const malformedAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }
      const results = rcp.process({
        abi: malformedAbi,
        transaction,
        actionIndex: 1,
        allowUnusedVariables: true,
      })

      // tslint:disable-next-line:max-line-length
      const expected = '<h2>Transfer Terms & Conditions</h2>\n<div class="variable data"></div><br />'
      expect(results.getHtml().trim()).toEqual(expected)
    })

    it('doesn\'t throw with invalid title', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
        allowUnusedVariables: true,
      })).not.toThrow(new RicardianContractRenderError('Missing Required Field: title'))
    })

    it('doesn\'t throw with invalid icon', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\ntitle: We will rock you\nsummary: Transfer tokens from one account to another.\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
        allowUnusedVariables: true,
      })).not.toThrow(new RicardianContractRenderError('Missing Required Field: icon'))
    })

    it('doesn\'t throw with invalid summary', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\ntitle: Transfer the cash!!\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
        allowUnusedVariables: true,
      })).not.toThrow(new RicardianContractRenderError('Missing Required Field: summary'))
    })
  })

  describe('when given a complex contract', () => {
    it('should process correctly', () => {
      const complexRc = rcp.process({
        abi: complexAbi,
        transaction: complexTransaction,
        actionIndex: 0,
      })
      expect(complexRc.getMetadata()).toEqual(complexMetadata)
      expect(complexRc.getHtml()).toEqual(complexExpectedHtml)
    })
  })

  describe('When missing required fields throws an error for ', () => {
    let action: any
    beforeEach(() => {
      action = {
        name: 'transfer',
        type: 'transfer',
      }
    })

    it('missing title', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(new RicardianContractRenderError('Missing Required Field: title'))
    })

    it('empty title', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\ntitle:\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(new RicardianContractRenderError('Missing Required Field: title'))
    })

    it('missing icon', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\ntitle: We will rock you\nsummary: Transfer tokens from one account to another.\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(new RicardianContractRenderError('Missing Required Field: icon'))
    })

    it('empty icon', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\ntitle: We will rock you\nsummary: Transfer tokens from one account to another.\nicon: \n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(new RicardianContractRenderError('Missing Required Field: icon'))
    })

    it('missing summary', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\ntitle: Transfer the cash!!\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(new RicardianContractRenderError('Missing Required Field: summary'))
    })

    it('empty summary', () => {
      // tslint:disable-next-line:max-line-length
      action.ricardian_contract = '---\ntitle: Transfer the cash!!\nsummary: \nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n'

      const newAbi: Abi = {
        ...abi,
        actions: [
          { ...action },
        ],
      }

      expect(() => rcp.process({
        abi: newAbi,
        transaction,
        actionIndex: 0,
      })).toThrow(new RicardianContractRenderError('Missing Required Field: summary'))
    })
  })
})
