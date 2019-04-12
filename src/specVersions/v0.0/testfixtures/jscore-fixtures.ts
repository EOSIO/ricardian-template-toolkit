// Extra smoke test file using some common shared data

// tslint:disable:max-line-length

const simpleRicardian = `---
title: Token Transfer
summary: Transfer tokens from {{from}} to {{to}}.
icon: http://simpleicon.com/wp-content/uploads/like.png#d0da4e5d44e4f2d325109010203fda422d3f7cd4934d874cb4ea98a62bf16cec
---

## Transfer Terms & Conditions

I, {{from}}, certify the following to be true to the best of my knowledge:

1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.
2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.
3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.

I understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}'s permissions.

If this action fails to be irreversibly confirmed after receiving goods or services from '{{to}}', I agree to either return the goods or services or resend {{quantity}} in a timely manner.
`

const complexRicardian = `---
title: Multi Token Transfer
summary: Transfer multiple different tokens from {{from}} to {{to}}.
icon: https://www.wlu.edu/images/advancement/icons/stock-transfer.png#e4289f04df9c6cf89e1bfecf1dbaa4357a9e7099c25aa2d158d6894065e4773a
---

# Super Multi Transfer with whole ABI Meta Data

<p>This contract action is <strong>NOT</strong> a real one, and not related to \`eosio.token\` at all.<br/>
Just an example of testing all the contract parsings with handlebars.</p>

## Transfer Terms & Conditions

I, {{from}}, certify the following to be true to the best of my knowledge:

1. I certify that the total amount of this transfer does not the proceeds of fraudulent or violent activities.
2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.
3. I have disclosed any contractual terms & conditions with respect to {{to}}.

`

export default {
  chainId: process.env.REACT_APP_CHAIN_ID,

  pubKeys: ['5JmqocoeJ1ury2SdjVNVgNL1n4qR2sse5cxN4upvspU2R5PEnxP'],

  transaction: {
    expiration: '2018-08-14T20:38:58',
    ref_block_num: 63462,
    ref_block_prefix: 4279361130,
    max_net_usage_words: 0,
    max_cpu_usage_ms: 0,
    delay_sec: 0,
    context_free_actions: [],
    actions: [
      {
        account: 'eosio.token',
        name: 'multitransf',
        authorization: [
          {
            actor: 'alicejones',
            permission: 'active',
          },
        ],
        data: {
          from: 'alicejones',
          to: 'bobsmith',
          quantities: ['123.0000 EOS', '456.0000 ABC', '789.0000 DEF'],
          memos: ['<i>Super</i> EOS', 'I know you like <strong>ABC</strong> tokens'],
        },
      },
      {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [
          {
            actor: 'bobsmith',
            permission: 'active',
          },
        ],
        data: {
          from: 'bobsmith',
          to: 'alicejones',
          quantity: '123.0000 EOS',
          memo: 'Testing.',
        },
      },
    ],
    transaction_extensions: [],
  },

  abis: [
    {
      account_name: 'eosio.token',
      abi: {
        types: [
          {
            type: 'name',
            new_type_name: 'account_name',
          },
        ],
        tables: [
          {
            name: 'accounts',
            type: 'account',
            key_names: [
              'currency',
            ],
            key_types: [
              'uint64',
            ],
            index_type: 'i64',
          },
          {
            name: 'stat',
            type: 'currency_stats',
            key_names: [
              'currency',
            ],
            key_types: [
              'uint64',
            ],
            index_type: 'i64',
          },
        ],
        actions: [
          {
            name: 'transfer',
            type: 'transfer',
            ricardian_contract: simpleRicardian,
          },
          {
            name: 'multitransf',
            type: 'multitransf',
            ricardian_contract: complexRicardian,
          },
          {
            name: 'issue',
            type: 'issue',
            ricardian_contract: '',
          },
          {
            name: 'create',
            type: 'create',
            ricardian_contract: '',
          },
        ],
        structs: [
          {
            base: '',
            name: 'transfer',
            fields: [
              {
                name: 'from',
                type: 'account_name',
              },
              {
                name: 'to',
                type: 'account_name',
              },
              {
                name: 'quantity',
                type: 'asset',
              },
              {
                name: 'memo',
                type: 'string',
              },
            ],
          },
          {
            base: '',
            name: 'multitransf',
            fields: [
              {
                name: 'from',
                type: 'account_name',
              },
              {
                name: 'to',
                type: 'account_name',
              },
              {
                name: 'quantities',
                type: 'asset[]',
              },
              {
                name: 'memos',
                type: 'string[]',
              },
            ],
          },
          {
            base: '',
            name: 'create',
            fields: [
              {
                name: 'issuer',
                type: 'account_name',
              },
              {
                name: 'maximum_supply',
                type: 'asset',
              },
            ],
          },
          {
            base: '',
            name: 'issue',
            fields: [
              {
                name: 'to',
                type: 'account_name',
              },
              {
                name: 'quantity',
                type: 'asset',
              },
              {
                name: 'memo',
                type: 'string',
              },
            ],
          },
          {
            base: '',
            name: 'account',
            fields: [
              {
                name: 'balance',
                type: 'asset',
              },
            ],
          },
          {
            base: '',
            name: 'currency_stats',
            fields: [
              {
                name: 'supply',
                type: 'asset',
              },
              {
                name: 'max_supply',
                type: 'asset',
              },
              {
                name: 'issuer',
                type: 'account_name',
              },
            ],
          },
        ],
        version: 'eosio::abi/1.0',
        abi_extensions: [],
        error_messages: [],
        ricardian_clauses: [
          {
            id: 'boilerplate',
            body: 'I, {{from}}, swear by the moon and the stars in the sky\nI\'ll be there\nI swear like a shadow that\'s by your side\nI\'ll be there\n\nFor better or worse, till death do us part\nI\'ll love you with every beat of my heart\nAnd I swear',
          },
          {
            id: 'ricardian_contract_images',
            body: '![EOS ricardian_contract_images](https://files.readme.io/aeb2530-small-logo_2x.png#HA8HG03SH3R3)',
          },
          {
            id: 'ricardian_clause_interpolations',
            body: 'You are sending this transfer from the account: {{from}}',
          },
        ],
      },
    },
  ],
}
