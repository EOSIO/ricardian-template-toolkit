/* tslint:disable:max-line-length */
export const transferTransaction: string = `{
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
      "name": "transfer",
      "authorization": [
        {
          "actor": "alicejones",
          "permission": "active"
        }
      ],
      "data": {
        "from": "alicejones",
        "to": "bobsmith",
        "quantity": "1500.0000 EOS",
        "memo": "This is a test of the emergency broadcasting system."
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
        "memo": "Testing.",
        "$metadata": {
          "summary": "Transfer from {{from}} to {{to}}"
        }
      }
    }
  ],
  "transaction_extensions": []
}`

export const indexedTransferTransaction: string = `{
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
      "name": "transfer",
      "authorization": [
        {
          "actor": "alicejones",
          "permission": "active",
          "$index": 0
        }
      ],
      "data": {
        "from": "alicejones",
        "to": "bobsmith",
        "quantity": "1500.0000 EOS",
        "memo": "This is a test of the emergency broadcasting system."
      },
      "$index": 0
    },
    {
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
        "memo": "Testing."
      },
      "$index": 1
    },
    {
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
          "summary": "Transfer from {{from}} to {{to}}"
        }
      },
      "$index": 2
    }
  ],
  "transaction_extensions": []
}`

export const eosioTokenAbi: string = `{
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
      "body": "You are sending this transfer with the following memo: {{memo}}"
    }
  ]
}`
