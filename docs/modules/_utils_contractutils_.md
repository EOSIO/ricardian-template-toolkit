[ricardian-template-toolkit](../README.md) > ["utils/contractUtils"](../modules/_utils_contractutils_.md)

# External module: "utils/contractUtils"

## Index

### Functions

* [getContractSpecVersion](_utils_contractutils_.md#getcontractspecversion)
* [getContractTextFromAbi](_utils_contractutils_.md#getcontracttextfromabi)
* [getMetadataAndContent](_utils_contractutils_.md#getmetadataandcontent)
* [getTransactionAction](_utils_contractutils_.md#gettransactionaction)

---

## Functions

<a id="getcontractspecversion"></a>

###  getContractSpecVersion

▸ **getContractSpecVersion**(config: *[RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md)*): [SpecVersion](../interfaces/_interfaces_.specversion.md)

*Defined in [utils/contractUtils.ts:50](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/utils/contractUtils.ts#L50)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md) |

**Returns:** [SpecVersion](../interfaces/_interfaces_.specversion.md)

___
<a id="getcontracttextfromabi"></a>

###  getContractTextFromAbi

▸ **getContractTextFromAbi**(abi: *[Abi](../interfaces/_interfaces_.abi.md)*, action: *[TransactionAction](../interfaces/_interfaces_.transactionaction.md)*): `string`

*Defined in [utils/contractUtils.ts:25](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/utils/contractUtils.ts#L25)*

Finds the abi for a specific action and returns the raw ricardian contract.

**Parameters:**

| Name | Type |
| ------ | ------ |
| abi | [Abi](../interfaces/_interfaces_.abi.md) |
| action | [TransactionAction](../interfaces/_interfaces_.transactionaction.md) |

**Returns:** `string`
Raw ricardian contract string

___
<a id="getmetadataandcontent"></a>

###  getMetadataAndContent

▸ **getMetadataAndContent**(contractText: *`string`*): `object`

*Defined in [utils/contractUtils.ts:40](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/utils/contractUtils.ts#L40)*

Extracts the ContractMetadata and contract body contents from the raw contract text

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| contractText | `string` |  String containing the raw contract text |

**Returns:** `object`
Object containing ContractMetadata and body content

___
<a id="gettransactionaction"></a>

###  getTransactionAction

▸ **getTransactionAction**(transaction: *[Transaction](../interfaces/_interfaces_.transaction.md)*, actionIndex: *`number`*): [TransactionAction](../interfaces/_interfaces_.transactionaction.md)

*Defined in [utils/contractUtils.ts:15](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/utils/contractUtils.ts#L15)*

Retrieves a specifc action based off its index.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| transaction | [Transaction](../interfaces/_interfaces_.transaction.md) |
| actionIndex | `number` |  The index of an action to return from the transaction.actions array |

**Returns:** [TransactionAction](../interfaces/_interfaces_.transactionaction.md)
An single action from a transaction

___

