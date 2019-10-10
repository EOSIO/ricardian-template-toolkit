[ricardian-template-toolkit](../README.md) > ["RicardianContractFactory"](../modules/_ricardiancontractfactory_.md) > [RicardianContractFactory](../classes/_ricardiancontractfactory_.ricardiancontractfactory.md)

# Class: RicardianContractFactory

## Hierarchy

**RicardianContractFactory**

## Index

### Constructors

* [constructor](_ricardiancontractfactory_.ricardiancontractfactory.md#constructor)

### Properties

* [processors](_ricardiancontractfactory_.ricardiancontractfactory.md#processors)

### Methods

* [create](_ricardiancontractfactory_.ricardiancontractfactory.md#create)
* [findProcessor](_ricardiancontractfactory_.ricardiancontractfactory.md#findprocessor)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RicardianContractFactory**(): [RicardianContractFactory](_ricardiancontractfactory_.ricardiancontractfactory.md)

*Defined in [RicardianContractFactory.ts:11](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/RicardianContractFactory.ts#L11)*

**Returns:** [RicardianContractFactory](_ricardiancontractfactory_.ricardiancontractfactory.md)

___

## Properties

<a id="processors"></a>

### `<Private>` processors

**● processors**: *[RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md)[]* =  []

*Defined in [RicardianContractFactory.ts:11](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/RicardianContractFactory.ts#L11)*

___

## Methods

<a id="create"></a>

###  create

▸ **create**(config: *[RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md)*): [RicardianContract](../interfaces/_interfaces_.ricardiancontract.md)

*Defined in [RicardianContractFactory.ts:25](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/RicardianContractFactory.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| config | [RicardianContractConfig](../interfaces/_interfaces_.ricardiancontractconfig.md) |

**Returns:** [RicardianContract](../interfaces/_interfaces_.ricardiancontract.md)

___
<a id="findprocessor"></a>

### `<Private>` findProcessor

▸ **findProcessor**(specVersion: *[SpecVersion](../interfaces/_interfaces_.specversion.md)*): [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md) \| `null`

*Defined in [RicardianContractFactory.ts:21](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/RicardianContractFactory.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| specVersion | [SpecVersion](../interfaces/_interfaces_.specversion.md) |

**Returns:** [RicardianContractProcessor](../interfaces/_interfaces_.ricardiancontractprocessor.md) \| `null`

___

