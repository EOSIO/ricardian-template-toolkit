[@blockone/ricardian-template-toolkit](../README.md) > ["specVersions/v0.0/RicardianContractProcessorImpl"](../modules/_specversions_v0_0_ricardiancontractprocessorimpl_.md) > [RicardianContractProcessorImpl](../classes/_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md)

# Class: RicardianContractProcessorImpl

Processes a Ricardian contract, interpolating transaction variables and clauses, and extracting metadata and html.

## Hierarchy

**RicardianContractProcessorImpl**

↳  [RicardianContractProcessorImpl](_specversions_v0_1_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md)

## Implements

* [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md)

## Index

### Constructors

* [constructor](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#constructor)

### Properties

* [allowUnusedVariables](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#allowunusedvariables)
* [disableMetadataValidation](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#disablemetadatavalidation)

### Methods

* [convertToHtml](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#converttohtml)
* [createContext](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#createcontext)
* [getSpecVersion](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#getspecversion)
* [interpolateContract](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#interpolatecontract)
* [interpolateMetadata](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#interpolatemetadata)
* [interpolateRicardian](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#interpolatericardian)
* [process](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#process)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RicardianContractProcessorImpl**(): [RicardianContractProcessorImpl](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md)

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:27](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L27)*

Constructs the RicardianContractProcessorImpl.

**Returns:** [RicardianContractProcessorImpl](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md)

___

## Properties

<a id="allowunusedvariables"></a>

### `<Private>` allowUnusedVariables

**● allowUnusedVariables**: *`boolean`* = false

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:26](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L26)*

___
<a id="disablemetadatavalidation"></a>

### `<Private>` disableMetadataValidation

**● disableMetadataValidation**: *`boolean`* = false

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:27](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L27)*

___

## Methods

<a id="converttohtml"></a>

### `<Private>` convertToHtml

▸ **convertToHtml**(content: *`string`*): `string`

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:228](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L228)*

Given a Github flavored markdown formatted string, generate HTML. Also replaces \[variable\] tags with

s.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| content | `string` |  Markdown formatted string |

**Returns:** `string`
The generated HTML

___
<a id="createcontext"></a>

### `<Private>` createContext

▸ **createContext**(abi: *[Abi](../interfaces/_interfaces_.abi.md)*, transaction: *[Transaction](../interfaces/_interfaces_.transaction.md)*, action: *[TransactionAction](../interfaces/_interfaces_.transactionaction.md)*): [RicardianContext](../interfaces/_specversions_v0_0_ricardiancontext_.ricardiancontext.md)

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:91](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L91)*

Parses a transaction and returns an object with formatted transaction data

**Parameters:**

| Param | Type |
| ------ | ------ |
| abi | [Abi](../interfaces/_interfaces_.abi.md) |
| transaction | [Transaction](../interfaces/_interfaces_.transaction.md) |
| action | [TransactionAction](../interfaces/_interfaces_.transactionaction.md) |

**Returns:** [RicardianContext](../interfaces/_specversions_v0_0_ricardiancontext_.ricardiancontext.md)
An RicardianContext with formatted transaction data

___
<a id="getspecversion"></a>

###  getSpecVersion

▸ **getSpecVersion**(): `object`

*Implementation of [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md).[getSpecVersion](../interfaces/_interfaces_.ricardiancontractprocessor.md#getspecversion)*

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:53](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L53)*

**Returns:** `object`

___
<a id="interpolatecontract"></a>

### `<Private>` interpolateContract

▸ **interpolateContract**(rawTemplate: *`string`*, context: *[RicardianContext](../interfaces/_specversions_v0_0_ricardiancontext_.ricardiancontext.md)*, maxPasses: *`number`*): `object`

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:116](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L116)*

Interpolate variables referenced in the contract metadata and body.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| rawTemplate | `string` |
| context | [RicardianContext](../interfaces/_specversions_v0_0_ricardiancontext_.ricardiancontext.md) |  The RicardianContext contain the source data for interpolation |
| maxPasses | `number` |  The number of variable interpolation passes to make. Defaults to config.MAX_PASSES |

**Returns:** `object`
An object with parsed ContractMetadata and interpolated body

___
<a id="interpolatemetadata"></a>

### `<Private>` interpolateMetadata

▸ **interpolateMetadata**(metadata: *[ContractMetadata](../interfaces/_interfaces_.contractmetadata.md)*, context: *[RicardianContext](../interfaces/_specversions_v0_0_ricardiancontext_.ricardiancontext.md)*, maxPasses: *`number`*): [ContractMetadata](../interfaces/_interfaces_.contractmetadata.md)

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:173](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L173)*

Interpolate the variables referenced in the given ContractMetadata, performing maxPasses of intererpolation. Note that the "title" and "icon" metadata fields are NOT subject to interpolation and are returned as-is.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| metadata | [ContractMetadata](../interfaces/_interfaces_.contractmetadata.md) |  The ContractMetadata to interpolate |
| context | [RicardianContext](../interfaces/_specversions_v0_0_ricardiancontext_.ricardiancontext.md) |  The RicardianContext contain the source data for interpolation |
| maxPasses | `number` |  Maximum number of interpolation passes to make |

**Returns:** [ContractMetadata](../interfaces/_interfaces_.contractmetadata.md)
A new ContractMetadata containing the interpolated fields

___
<a id="interpolatericardian"></a>

### `<Private>` interpolateRicardian

▸ **interpolateRicardian**(contractContent: *`string`*, context: *[RicardianContext](../interfaces/_specversions_v0_0_ricardiancontext_.ricardiancontext.md)*, maxPasses: *`number`*): `string`

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:134](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L134)*

Interpolate the variables referenced in contractContent, making the specified number of passes.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| contractContent | `string` |  String containing the contract body |
| context | [RicardianContext](../interfaces/_specversions_v0_0_ricardiancontext_.ricardiancontext.md) |  The RicardianContext contain the source data for interpolation |
| maxPasses | `number` |  Maximum number of interpolation passes to make |

**Returns:** `string`
String containing the interpolated content

___
<a id="process"></a>

###  process

▸ **process**(config: *[RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md)*): [RicardianContract](../interfaces/_interfaces_.ricardiancontract.md)

*Implementation of [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md).[process](../interfaces/_interfaces_.ricardiancontractprocessor.md#process)*

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:65](https://github.com/EOSIO/contract-template-toolkit/blob/a1752bb/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L65)*

Process the RicardianContractConfig and return a RicardianContract.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| config | [RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md) |  A \`RicardianContractConfig\` object |

**Returns:** [RicardianContract](../interfaces/_interfaces_.ricardiancontract.md)

___

