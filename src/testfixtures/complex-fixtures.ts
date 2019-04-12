
/* tslint:disable:max-line-length */
const complexMultiTransf: string = `---
title: Multi Token Transfer
summary: Transfer multiple different tokens from {{from}} to {{to}}.
icon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562
---

# Super Multi Transfer with whole ABI Meta Data

![header-img](https://cdn-images-1.medium.com/max/900/1*zkkZqd1_ShN9rRqBG_Wu3A@2x.png#HA8HG03SH3R3HA8HG03SH3R3HA8HG03SH3R3)

<p>This contract action is <strong>NOT</strong> a real one, and not related to \`eosio.token\` at all.<br/>
Just an example of testing all the contract parsings with handlebars.</p>

## Transfer Terms & Conditions

I, {{from}}, certify the following to be true to the best of my knowledge:

1. I certify that the total amount of this transfer does not the proceeds of fraudulent or violent activities.
2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.
3. I have disclosed any contractual terms & conditions with respect to {{to}}.

The transfered tokens are:

{{#each quantities}}
  - {{@index}}: {{{lookup ../memos @index}}} {{this}}
{{else}}
  Not transfer
{{/each}}

And these are the reasons:

{{#each memos}}
  {{{this}}}
{{else}}
  Not transfer
{{/each}}

I understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}'s permissions.

If this action fails to be irreversibly confirmed after receiving goods or services from '{{to}}', I agree to either return the goods or services or resend all over again in a timely manner.

### Transaction metadata

- expiration: {{$transaction.expiration}}
- ref_block_num: {{$transaction.ref_block_num}}
- ref_block_prefix: {{$transaction.ref_block_prefix}}
- max_net_usage_words: {{$transaction.max_net_usage_words}}
- max_cpu_usage_ms: {{$transaction.max_cpu_usage_ms}}
- delay_sec: {{$transaction.delay_sec}}
- context_free_actions: {{$transaction.context_free_actions}}

### Action Metadata

- account: {{$action.account}}
- name: {{$action.name}}
- authorization: {{$action.authorization}}
- authorization.[0].actor: {{$action.authorization.[0].actor}}
- authorization.[0].permission: {{$action.authorization.[0].permission}}

{{#if $transaction.actions.[1]}}
  ### That's not all!!! :)

  I'm also sending you {{$transaction.actions.[1].data.quantity}} - because {{$transaction.actions.[1].data.memo}}
{{else}}
  **That's it!**
{{/if}}


#### Transaction Contract Clauses

{{$clauses.boilerplate}}

{{$clauses.ricardian_contract_images}}

{{$clauses.ricardian_clause_interpolations}}
`

/* tslint:disable:max-line-length */
export const complexTransferTransaction: string = `{
  "expiration": "2018-08-14T20:38:58",
  "ref_block_num": 63462,
  "ref_block_prefix": 4279361130,
  "max_net_usage_words": 0,
  "max_cpu_usage_ms": 0,
  "delay_sec": 0,
  "context_free_actions": [],
  "actions": [
    {
      "account": "eosio.token",
      "name": "multitransf",
      "authorization": [
        {
          "actor": "alicejones",
          "permission": "active"
        }
      ],
      "data": {
        "from": "alicejones",
        "to": "bobsmith",
        "quantities": ["123.0000 EOS", "456.0000 ABC", "789.0000 DEF"],
        "memos": ["<i>Super</i> EOS", "I know you like <strong>ABC</strong> tokens"]
      }
    },
    {
      "account": "eosio.token",
      "name": "transfer",
      "authorization": [
        {
          "actor": "bobsmith",
          "permission": "active"
        }
      ],
      "data": {
        "from": "bobsmith",
        "to": "alicejones",
        "quantity": "123.0000 EOS",
        "memo": "Testing."
      }
    }
  ],
  "transaction_extensions": []
}`

export const complexEosioTokenAbi: string = `{
  "types": [
    {
      "type": "name",
      "new_type_name": "account_name"
    }
  ],
  "tables": [
    {
      "name": "accounts",
      "type": "account",
      "key_names": [
        "currency"
      ],
      "key_types": [
        "uint64"
      ],
      "index_type": "i64"
    },
    {
      "name": "stat",
      "type": "currency_stats",
      "key_names": [
        "currency"
      ],
      "key_types": [
        "uint64"
      ],
      "index_type": "i64"
    }
  ],
  "actions": [
    {
      "name": "transfer",
      "type": "transfer",
      "ricardian_contract": "---\\ntitle: Token Transfer\\nsummary: Transfer tokens from one account to another.\\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\\n---\\n\\n## Transfer Terms & Conditions\\n\\nI, {{from}}, certify the following to be true to the best of my knowledge:\\n\\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\\n\\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}'s permissions.\\n\\nIf this action fails to be irreversibly confirmed after receiving goods or services from '{{to}}', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\\n\\n{{$clauses.ricardian_clause_interpolations}}\\n\\nOh, and one more thing...\\n\\n{{$clauses.boilerplate}}\\n\\n{{$clauses.ricardian_contract_images}}"
    },
    {
      "name": "multitransf",
      "type": "multitransf",
      "ricardian_contract": ${JSON.stringify(complexMultiTransf)}
    },
    {
      "name": "issue",
      "type": "issue",
      "ricardian_contract": ""
    },
    {
      "name": "create",
      "type": "create",
      "ricardian_contract": ""
    }
  ],
  "structs": [
    {
      "base": "",
      "name": "transfer",
      "fields": [
        {
          "name": "from",
          "type": "account_name"
        },
        {
          "name": "to",
          "type": "account_name"
        },
        {
          "name": "quantity",
          "type": "asset"
        },
        {
          "name": "memo",
          "type": "string"
        }
      ]
    },
    {
      "base": "",
      "name": "multitransf",
      "fields": [
        {
          "name": "from",
          "type": "account_name"
        },
        {
          "name": "to",
          "type": "account_name"
        },
        {
          "name": "quantities",
          "type": "asset[]"
        },
        {
          "name": "memos",
          "type": "string[]"
        }
      ]
    },
    {
      "base": "",
      "name": "create",
      "fields": [
        {
          "name": "issuer",
          "type": "account_name"
        },
        {
          "name": "maximum_supply",
          "type": "asset"
        }
      ]
    },
    {
      "base": "",
      "name": "issue",
      "fields": [
        {
          "name": "to",
          "type": "account_name"
        },
        {
          "name": "quantity",
          "type": "asset"
        },
        {
          "name": "memo",
          "type": "string"
        }
      ]
    },
    {
      "base": "",
      "name": "account",
      "fields": [
        {
          "name": "balance",
          "type": "asset"
        }
      ]
    },
    {
      "base": "",
      "name": "currency_stats",
      "fields": [
        {
          "name": "supply",
          "type": "asset"
        },
        {
          "name": "max_supply",
          "type": "asset"
        },
        {
          "name": "issuer",
          "type": "account_name"
        }
      ]
    }
  ],
  "version": "eosio::abi/1.0",
  "abi_extensions": [],
  "error_messages": [],
  "ricardian_clauses": [
    {
      "id": "boilerplate",
      "body": "I, {{from}}, swear by the moon and the stars in the sky\\nI'll be there\\nI swear like a shadow that's by your side\\nI'll be there\\n\\nFor better or worse, till death do us part\\nI'll love you with every beat of my heart\\nAnd I swear"
    },
    {
      "id": "ricardian_contract_images",
      "body": "![EOS ricardian_contract_images](https://files.readme.io/aeb2530-small-logo_2x.png#HA8HG03SH3R3)"
    },
    {
      "id": "ricardian_clause_interpolations",
      "body": "You are sending this transfer from the account: {{from}}"
    }
  ]
}`

export const complexExpectedMetadata =
`{
  "spec_version": "0.0.0",
  "title": "Multi Token Transfer",
  "icon": "https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562",
  "summary": "Transfer multiple different tokens from <div class=\\"variable data\\">alicejones</div> to <div class=\\"variable data\\">bobsmith</div>."
}`

export const complexExpectedHtml =
`<h1>Super Multi Transfer with whole ABI Meta Data</h1>
<img src="https://cdn-images-1.medium.com/max/900/1*zkkZqd1_ShN9rRqBG_Wu3A@2x.png#HA8HG03SH3R3HA8HG03SH3R3HA8HG03SH3R3" alt="header-img" /><br />
<p>This contract action is <strong>NOT</strong> a real one, and not related to <code>eosio.token</code> at all.<br /><br />
Just an example of testing all the contract parsings with handlebars.</p><br />
<h2>Transfer Terms & Conditions</h2>
I, <div class="variable data">alicejones</div>, certify the following to be true to the best of my knowledge:<br />
<ol>
<li>I certify that the total amount of this transfer does not the proceeds of fraudulent or violent activities.</li>
<li>I certify that, to the best of my knowledge, <div class="variable data">bobsmith</div> is not supporting initiation of violence against others.</li>
<li>I have disclosed any contractual terms & conditions with respect to <div class="variable data">bobsmith</div>.</li>
</ol>
The transfered tokens are:<br />
<ul>
<li>0: <div class="variable data"><i>Super</i> EOS</div> <div class="variable data">123.0000 EOS</div></li>
<li>1: <div class="variable data">I know you like <strong>ABC</strong> tokens</div> <div class="variable data">456.0000 ABC</div></li>
<li>2: <div class="variable data"></div> <div class="variable data">789.0000 DEF</div></li>
</ul>
And these are the reasons:<br />
<div class="variable data"><i>Super</i> EOS</div><br />
<div class="variable data">I know you like <strong>ABC</strong> tokens</div><br />
I understand that funds transfers are not reversible after the <div class="variable transaction">0</div> seconds or other delay as configured by <div class="variable data">alicejones</div>\'s permissions.<br />
If this action fails to be irreversibly confirmed after receiving goods or services from \'<div class="variable data">bobsmith</div>\', I agree to either return the goods or services or resend all over again in a timely manner.<br />
<h3>Transaction metadata</h3>
<ul>
<li>expiration: <div class="variable transaction">2018-08-14T20:38:58</div></li>
<li>ref_block_num: <div class="variable transaction">63462</div></li>
<li>ref_block_prefix: <div class="variable transaction">4279361130</div></li>
<li>max_net_usage_words: <div class="variable transaction">0</div></li>
<li>max_cpu_usage_ms: <div class="variable transaction">0</div></li>
<li>delay_sec: <div class="variable transaction">0</div></li>
<li>context_free_actions: <div class="variable transaction"></div></li>
</ul>
<h3>Action Metadata</h3>
<ul>
<li>account: <div class="variable action">eosio.token</div><br /></li>
<li>name: <div class="variable action">multitransf</div><br /></li>
<li>authorization: <div class="variable action">[object Object]</div><br /></li>
<li>authorization.[0].actor: <div class="variable action">alicejones</div><br /></li>
<li>authorization.[0].permission: <div class="variable action">active</div><br />
<h3>That\'s not all!!! :)</h3>
I\'m also sending you <div class="variable transaction">123.0000 EOS</div> - because <div class="variable transaction">Testing.</div><br /></li>
</ul>
<h4>Transaction Contract Clauses</h4>
<div class="variable clauses">I, <div class="variable data">alicejones</div>, swear by the moon and the stars in the sky<br />
I\'ll be there<br />
I swear like a shadow that\'s by your side<br />
I\'ll be there<br />
For better or worse, till death do us part<br />
I\'ll love you with every beat of my heart<br />
And I swear</div><br />
<div class="variable clauses"><img src="https://files.readme.io/aeb2530-small-logo_2x.png#HA8HG03SH3R3" alt="EOS ricardian_contract_images" /></div><br />
<div class="variable clauses">You are sending this transfer from the account: <div class="variable data">alicejones</div></div><br />
`
