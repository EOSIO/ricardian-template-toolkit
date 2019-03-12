import frontMatter from 'front-matter'

import { Abi, AbiAction, ContractMetadata,
         RicardianContractConfig, SpecVersion,
         Transaction, TransactionAction } from '../interfaces'
import { RicardianContractRenderError } from '../RicardianContractRenderError'

/**
 * Retrieves a specifc action based off its index.
 *
 * @param actionIndex The index of an action to return from the transaction.actions array
 *
 * @returns An single action from a transaction
 */
export function getTransactionAction(transaction: Transaction, actionIndex: number): TransactionAction {
  const action = transaction.actions[actionIndex]
  return action
}

/**
 * Finds the abi for a specific action and returns the raw ricardian contract.
 *
 * @return Raw ricardian contract string
 */
export function getContractTextFromAbi(abi: Abi, action: TransactionAction): string {
  const abiAction: (AbiAction | undefined) = abi.actions.find((aa: AbiAction) => aa.name === action.name)
  if (!abiAction) {
    throw new RicardianContractRenderError('Matching ABI not provided for given action.')
  }
  return abiAction.ricardian_contract
}

/**
 * Extracts the ContractMetadata and contract body contents from the raw contract text
 *
 * @param contractText String containing the raw contract text
 *
 * @return Object containing ContractMetadata and body content
 */
export function getMetadataAndContent(contractText: string):
                { metadata: ContractMetadata, content: string } {
  try {
    const { attributes: metadata, body: content } = frontMatter(contractText)
    return { metadata, content }
  } catch (e) {
    throw new RicardianContractRenderError(e.message)
  }
}

export function getContractSpecVersion(config: RicardianContractConfig): SpecVersion {
  const versionMatcher = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/
  const action = getTransactionAction(config.transaction, config.actionIndex)
  const contractText = getContractTextFromAbi(config.abi, action)
  const { metadata } = getMetadataAndContent(contractText)
  const versionStr = metadata.spec_version
  if (!versionStr) {
    // Provide backward compatability with spec version 0.0.x
    // which had no version specifier
    return {
      major: 0,
      minor: 0,
      patch: 0,
    }
  }
  const parts = versionMatcher.exec(versionStr)
  if (parts) {
    return {
      major: parseInt(parts[1], 10),
      minor: parseInt(parts[2], 10),
      patch: parseInt(parts[3], 10),
    }
  } else {
    throw new RicardianContractRenderError('Unable to determine contract specification version')
  }
}
