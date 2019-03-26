[ricardian-template-toolkit](../README.md) > ["factoryHelpers"](../modules/_factoryhelpers_.md)

# External module: "factoryHelpers"

## Index

### Functions

* [compareProcessors](_factoryhelpers_.md#compareprocessors)
* [findProcessorForVersion](_factoryhelpers_.md#findprocessorforversion)

---

## Functions

<a id="compareprocessors"></a>

###  compareProcessors

▸ **compareProcessors**(a: *[RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md)*, b: *[RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md)*): `number`

*Defined in [factoryHelpers.ts:3](https://github.com/EOSIO/ricardian-template-toolkit/blob/3c49e9d/src/factoryHelpers.ts#L3)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| a | [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md) |
| b | [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md) |

**Returns:** `number`

___
<a id="findprocessorforversion"></a>

###  findProcessorForVersion

▸ **findProcessorForVersion**(sortedProcessors: *[RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md)[]*, specVersion: *[SpecVersion](../interfaces/_interfaces_.specversion.md)*):  [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md) &#124; `null`

*Defined in [factoryHelpers.ts:14](https://github.com/EOSIO/ricardian-template-toolkit/blob/3c49e9d/src/factoryHelpers.ts#L14)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| sortedProcessors | [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md)[] |
| specVersion | [SpecVersion](../interfaces/_interfaces_.specversion.md) |

**Returns:**  [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md) &#124; `null`

___

