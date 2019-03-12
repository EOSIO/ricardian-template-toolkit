export interface RicardianClause {
  id: string
  body: string
}

export interface Abi {
  version: string
  types: Array<{ new_type_name: string, type: string }>
  structs: Array<{ name: string, base: string, fields: Array<{ name: string, type: string }> }>
  actions: AbiAction[]
  ricardian_clauses: RicardianClause[]
}

export interface AbiAction {
  name: string
  type: string
  ricardian_contract: string
}

export interface ContractMetadata {
  spec_version: string
  title: string
  summary: string
  icon: string
  [x: string]: any
}

export interface TransactionActionAuthorization {
  actor: string
  permission: string
  [x: string]: any
}

export interface TransactionAction {
  account: string
  name: string
  authorization: TransactionActionAuthorization[]
  data: any
  [x: string]: any
}

export interface Transaction {
  actions: TransactionAction[]
  expiration?: string
  ref_block_num?: number
  ref_block_prefix?: number
  max_net_usage_words?: number
  max_cpu_usage_ms?: number
  delay_sec?: number
  context_free_actions?: any[]
  transaction_extensions?: string[]
}

export interface RicardianContractConfig {
  abi: Abi
  transaction: Transaction
  actionIndex: number
  maxPasses?: number
  allowUnusedVariables?: boolean
}

export interface SpecVersion {
  major: number
  minor: number
  patch?: number
}

export interface RicardianContract {
  getHtml(): string
  getMetadata(): ContractMetadata
}

export interface RicardianContractProcessor {
  getSpecVersion(): SpecVersion
  process(config: RicardianContractConfig): RicardianContract
}
