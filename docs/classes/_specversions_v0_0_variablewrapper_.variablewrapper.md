[ricardian-template-toolkit](../README.md) > ["specVersions/v0.0/VariableWrapper"](../modules/_specversions_v0_0_variablewrapper_.md) > [VariableWrapper](../classes/_specversions_v0_0_variablewrapper_.variablewrapper.md)

# Class: VariableWrapper

## Hierarchy

**VariableWrapper**

## Index

### Constructors

* [constructor](_specversions_v0_0_variablewrapper_.variablewrapper.md#constructor)

### Properties

* [variableMatch](_specversions_v0_0_variablewrapper_.variablewrapper.md#variablematch)
* [wrapVariable](_specversions_v0_0_variablewrapper_.variablewrapper.md#wrapvariable)
* [wrappedHelperMatch](_specversions_v0_0_variablewrapper_.variablewrapper.md#wrappedhelpermatch)
* [end](_specversions_v0_0_variablewrapper_.variablewrapper.md#end)
* [space](_specversions_v0_0_variablewrapper_.variablewrapper.md#space)
* [start](_specversions_v0_0_variablewrapper_.variablewrapper.md#start)

### Methods

* [processVariable](_specversions_v0_0_variablewrapper_.variablewrapper.md#processvariable)
* [wrap](_specversions_v0_0_variablewrapper_.variablewrapper.md#wrap)
* [createVariableMatcher](_specversions_v0_0_variablewrapper_.variablewrapper.md#createvariablematcher)
* [createWrappedHelperMatcher](_specversions_v0_0_variablewrapper_.variablewrapper.md#createwrappedhelpermatcher)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new VariableWrapper**(wrappedHelpers: *`string`[]*, wrapVariable: *[WrapVariable](../modules/_specversions_v0_0_wrapvariable_.md#wrapvariable)*): [VariableWrapper](_specversions_v0_0_variablewrapper_.variablewrapper.md)

*Defined in [specVersions/v0.0/VariableWrapper.ts:31](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| wrappedHelpers | `string`[] |
| wrapVariable | [WrapVariable](../modules/_specversions_v0_0_wrapvariable_.md#wrapvariable) |

**Returns:** [VariableWrapper](_specversions_v0_0_variablewrapper_.variablewrapper.md)

___

## Properties

<a id="variablematch"></a>

### `<Private>` variableMatch

**● variableMatch**: *`RegExp`* =  VariableWrapper.createVariableMatcher()

*Defined in [specVersions/v0.0/VariableWrapper.ts:28](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L28)*

___
<a id="wrapvariable"></a>

### `<Private>` wrapVariable

**● wrapVariable**: *[WrapVariable](../modules/_specversions_v0_0_wrapvariable_.md#wrapvariable)*

*Defined in [specVersions/v0.0/VariableWrapper.ts:31](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L31)*

___
<a id="wrappedhelpermatch"></a>

### `<Private>` wrappedHelperMatch

**● wrappedHelperMatch**: *`RegExp`*

*Defined in [specVersions/v0.0/VariableWrapper.ts:29](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L29)*

___
<a id="end"></a>

### `<Static>``<Private>` end

**● end**: *`string`* =  /(}}}?)([^}]|$)/.source

*Defined in [specVersions/v0.0/VariableWrapper.ts:6](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L6)*

___
<a id="space"></a>

### `<Static>``<Private>` space

**● space**: *`string`* =  /(?:[\s]*)/.source

*Defined in [specVersions/v0.0/VariableWrapper.ts:7](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L7)*

___
<a id="start"></a>

### `<Static>``<Private>` start

**● start**: *`string`* =  /(^|[^{])({{{?)/.source

*Defined in [specVersions/v0.0/VariableWrapper.ts:5](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L5)*

___

## Methods

<a id="processvariable"></a>

### `<Private>` processVariable

▸ **processVariable**(...p: *`any`[]*): `string`

*Defined in [specVersions/v0.0/VariableWrapper.ts:44](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` p | `any`[] |

**Returns:** `string`

___
<a id="wrap"></a>

###  wrap

▸ **wrap**(template: *`string`*): `string`

*Defined in [specVersions/v0.0/VariableWrapper.ts:38](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L38)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| template | `string` |

**Returns:** `string`

___
<a id="createvariablematcher"></a>

### `<Static>``<Private>` createVariableMatcher

▸ **createVariableMatcher**(): `RegExp`

*Defined in [specVersions/v0.0/VariableWrapper.ts:9](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L9)*

**Returns:** `RegExp`

___
<a id="createwrappedhelpermatcher"></a>

### `<Static>``<Private>` createWrappedHelperMatcher

▸ **createWrappedHelperMatcher**(wrappedHelpers: *`string`[]*): `RegExp`

*Defined in [specVersions/v0.0/VariableWrapper.ts:19](https://github.com/EOSIO/ricardian-template-toolkit/blob/ae088d5/src/specVersions/v0.0/VariableWrapper.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| wrappedHelpers | `string`[] |

**Returns:** `RegExp`

___

