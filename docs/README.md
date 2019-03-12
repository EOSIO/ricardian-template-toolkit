
EOSIO Ricardian Template Toolkit
--------------------------------

This library contains a factory that takes an ABI object, a transaction object, and an action index (along with some developer-oriented flags). It then:

1.  selects an appropriate processor based on the `spec_version` field in the contract metadata;
2.  validates the Ricardian Contracts and metadata associated with the transaction actions;
3.  validates all other spec requirements, including image sizes and hashes;
4.  interpolates all variables with data from the transaction or ricardian_clauses;
5.  on success, returns an object with metadata and Contract Markup Language (CML, a subset of HTML);
6.  on error or validation failure, returns a descriptive error, along with any data it was able to successfully parse and render

Foundational Inspiration for Metadata:

*   [https://hiltmon.com/blog/2012/06/18/markdown-metadata/](https://hiltmon.com/blog/2012/06/18/markdown-metadata/)
*   [https://blog.github.com/2013-09-27-viewing-yaml-metadata-in-your-documents/](https://blog.github.com/2013-09-27-viewing-yaml-metadata-in-your-documents/)
*   [https://stackoverflow.com/questions/44215896/markdown-metadata-format#answer-44222826](https://stackoverflow.com/questions/44215896/markdown-metadata-format#answer-44222826)

### Installation

`yarn add @blockone/contract-template-toolkit`

### Running Locally

```
yarn install
yarn build
yarn example
```

### Other Commands

*   `yarn lint`
*   `yarn test`

### Ricardian Specification

The Ricardian specification and an example of a compliant Ricardian contract can now be found at [https://github.com/EOSIO/ricardian-spec](https://github.com/EOSIO/ricardian-spec).

### Usage

Usage is very straightforward:

```
import RicardianContractFactory from '@blockone/contract-template-toolkit'

...

// Create the factory instance.
const factory = new RicardianContractFactory()

// Construct a RicardianContractConfig object
const config = {
  abi: myAbi,
  transaction: myTransaction,
  actionIndex: 0,
  // Optional - defaults to 3
  maxPasses: 3,
  // Optional - developer flag - if true ignore errors if a variable
  // is specified in the contract but no value is found to substitute
  allowUnusedVariables: false
}

const ricardianContract = factory.create(config)

const metadata = ricardianContract.getMetadata()
const html = ricardianContract.getHtml()
```

### Backward compatability note

Be aware that for backward compatability with contract specifications prior to `0.1.0`, any contracts lacking a `spec_version` in the metadata are treated as following spec version `0.0.0`.

## Index

### External modules

* ["RicardianContractFactory"](modules/_ricardiancontractfactory_.md)
* ["RicardianContractRenderError"](modules/_ricardiancontractrendererror_.md)
* ["bin/rc"](modules/_bin_rc_.md)
* ["config"](modules/_config_.md)
* ["factoryHelpers"](modules/_factoryhelpers_.md)
* ["interfaces"](modules/_interfaces_.md)
* ["specVersions/v0.0/RicardianContext"](modules/_specversions_v0_0_ricardiancontext_.md)
* ["specVersions/v0.0/RicardianContractProcessorImpl"](modules/_specversions_v0_0_ricardiancontractprocessorimpl_.md)
* ["specVersions/v0.0/VariableWrapper"](modules/_specversions_v0_0_variablewrapper_.md)
* ["specVersions/v0.0/WrapVariable"](modules/_specversions_v0_0_wrapvariable_.md)
* ["specVersions/v0.0/helpers"](modules/_specversions_v0_0_helpers_.md)
* ["specVersions/v0.0/index"](modules/_specversions_v0_0_index_.md)
* ["specVersions/v0.0/validators"](modules/_specversions_v0_0_validators_.md)
* ["specVersions/v0.0/whitelist"](modules/_specversions_v0_0_whitelist_.md)
* ["specVersions/v0.1/RicardianContractProcessorImpl"](modules/_specversions_v0_1_ricardiancontractprocessorimpl_.md)
* ["specVersions/v0.1/index"](modules/_specversions_v0_1_index_.md)
* ["utils/contractUtils"](modules/_utils_contractutils_.md)

---

