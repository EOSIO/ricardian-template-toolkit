import { Abi } from '../../interfaces'
import { RicardianContractProcessorImpl } from './RicardianContractProcessorImpl'

import { eosioTokenAbi, transferTransaction } from '../../testfixtures/fixtures'

const transaction = JSON.parse(transferTransaction)
const abi = JSON.parse(eosioTokenAbi)

// tslint:disable:max-line-length
describe('RicardianContractProcessorImp - v0.2', () => {
  const rcp = new RicardianContractProcessorImpl()

  it('dumps variable as JSON', () => {
    const expectedHtml =
`<h2>We got a action over here!</h2>
<pre><code>{
  "account": "eosio.token",
  "name": "transfer",
  "authorization": [
    {
      "actor": "bobsmith",
      "permission": "active",
      "$index": 0
    }
  ],
  "data": {
    "from": "bobsmith",
    "to": "alicejones",
    "quantity": "123.0000 EOS",
    "memo": "Testing.",
    "$metadata": {
      "summary": "Transfer from <div class="variable data">bobsmith</div> to <div class="variable data">alicejones</div>"
    }
  },
  "$index": 2
}
</code></pre>
`
    const newAbi: Abi = {
      ...abi,
      actions: [
        {
          name: 'transfer',
          type: 'transfer',
          ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens between accounts.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## We got a action over here!\n{{to_json $action}}\n',
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

  it('renders block if value defined', () => {
    const expectedHtml = `<h2>We got a action over here!</h2>\nDo we have a memo? <div class="variable data">Testing.</div><br />\n`
    const newAbi: Abi = {
      ...abi,
      actions: [
        {
          name: 'transfer',
          type: 'transfer',
          ricardian_contract: '---\ntitle: Token Transfer\nsummary: Transfer tokens between accounts.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## We got a action over here!\nDo we have a memo? {{#if_has_value memo}}{{memo}}{{else}}{{No memo given}}{{/if_has_value}}\n',
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
