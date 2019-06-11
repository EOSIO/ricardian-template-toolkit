[ricardian-template-toolkit](../README.md) > ["specVersions/v0.2/RicardianContractProcessorImpl"](../modules/_specversions_v0_2_ricardiancontractprocessorimpl_.md) > [RicardianContractProcessorImpl](../classes/_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md)

# Class: RicardianContractProcessorImpl

## Hierarchy

↳  [RicardianContractProcessorImpl](_specversions_v0_1_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md)

**↳ RicardianContractProcessorImpl**

## Implements

* [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md)

## Index

### Constructors

* [constructor](_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#constructor)

### Methods

* [getSpecVersion](_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#getspecversion)
* [process](_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#process)
* [processContract](_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#processcontract)
* [registerHelper](_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#registerhelper)
* [registerWrappedHelper](_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#registerwrappedhelper)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RicardianContractProcessorImpl**(): [RicardianContractProcessorImpl](_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md)

*Overrides [RicardianContractProcessorImpl](_specversions_v0_1_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md).[constructor](_specversions_v0_1_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#constructor)*

*Defined in [specVersions/v0.2/RicardianContractProcessorImpl.ts:11](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.2/RicardianContractProcessorImpl.ts#L11)*

**Returns:** [RicardianContractProcessorImpl](_specversions_v0_2_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md)

___

## Methods

<a id="getspecversion"></a>

###  getSpecVersion

▸ **getSpecVersion**(): `object`

*Implementation of [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md).[getSpecVersion](../interfaces/_interfaces_.ricardiancontractprocessor.md#getspecversion)*

*Overrides [RicardianContractProcessorImpl](_specversions_v0_1_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md).[getSpecVersion](_specversions_v0_1_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#getspecversion)*

*Defined in [specVersions/v0.2/RicardianContractProcessorImpl.ts:23](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.2/RicardianContractProcessorImpl.ts#L23)*

**Returns:** `object`

___
<a id="process"></a>

###  process

▸ **process**(config: *[RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md)*): [RicardianContract](../interfaces/_interfaces_.ricardiancontract.md)

*Implementation of [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md).[process](../interfaces/_interfaces_.ricardiancontractprocessor.md#process)*

*Inherited from [RicardianContractProcessorImpl](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md).[process](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#process)*

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:80](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L80)*

Process the RicardianContractConfig and return a RicardianContract.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| config | [RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md) |  A \`RicardianContractConfig\` object |

**Returns:** [RicardianContract](../interfaces/_interfaces_.ricardiancontract.md)

___
<a id="processcontract"></a>

### `<Protected>` processContract

▸ **processContract**(config: *[RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md)*): [RicardianContract](../interfaces/_interfaces_.ricardiancontract.md)

*Inherited from [RicardianContractProcessorImpl](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md).[processContract](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#processcontract)*

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:92](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L92)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md) |

**Returns:** [RicardianContract](../interfaces/_interfaces_.ricardiancontract.md)

___
<a id="registerhelper"></a>

### `<Protected>` registerHelper

▸ **registerHelper**(name: *`string`*, fn: *`HelperDelegate`*): `void`

*Inherited from [RicardianContractProcessorImpl](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md).[registerHelper](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#registerhelper)*

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:67](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L67)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| fn | `HelperDelegate` |

**Returns:** `void`

___
<a id="registerwrappedhelper"></a>

### `<Protected>` registerWrappedHelper

▸ **registerWrappedHelper**(name: *`string`*, fn: *`HelperDelegate`*): `void`

*Inherited from [RicardianContractProcessorImpl](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md).[registerWrappedHelper](_specversions_v0_0_ricardiancontractprocessorimpl_.ricardiancontractprocessorimpl.md#registerwrappedhelper)*

*Defined in [specVersions/v0.0/RicardianContractProcessorImpl.ts:62](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/RicardianContractProcessorImpl.ts#L62)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| fn | `HelperDelegate` |

**Returns:** `void`

___

