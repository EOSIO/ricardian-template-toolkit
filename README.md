## EOSIO Ricardian Template Toolkit

This library contains a factory that takes an ABI object, a transaction object, and an action index (along with some developer-oriented flags). It then:

1. Selects an appropriate processor based on the `spec_version` field in the contract metadata
1. Validates the Ricardian Contracts and metadata associated with the transaction actions
1. Validates all other spec requirements, including image sizes and hashes
1. Interpolates all variables with data from the transaction or ricardian_clauses
1. On success, returns an object with metadata and Contract Markup Language (CML, a subset of HTML)
1. On error or validation failure, returns a descriptive error, along with any data it was able to successfully parse and render

Foundational Inspiration for Metadata:
- https://hiltmon.com/blog/2012/06/18/markdown-metadata/
- https://blog.github.com/2013-09-27-viewing-yaml-metadata-in-your-documents/
- https://stackoverflow.com/questions/44215896/markdown-metadata-format#answer-44222826


### Installation

`yarn add @blockone/ricardian-template-toolkit`

### Running Locally

```
yarn install
yarn build
yarn example
```

### Other Commands

* `yarn lint`
* `yarn test`

### Ricardian Specification

The Ricardian Specification and an example of a compliant Ricardian contract can now be found at https://github.com/EOSIO/ricardian-spec.

**Notice:** currently only version [`0.0.0` of the Ricardian Specification](https://github.com/EOSIO/ricardian-spec/tree/v0.0.0) is supported by this library.

### Usage

Usage is very straightforward:

```javascript
import RicardianContractFactory from '@blockone/ricardian-template-toolkit'

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

### Backward Compatibility Note

Be aware that for backward compatibility with contract specifications prior to `0.1.0`, any contracts
lacking a `spec_version` in the metadata are treated as following spec version `0.0.0`.

## Important

See LICENSE for copyright and license terms.  Block.one makes its contribution on a voluntary basis as a member of the EOSIO community and is not responsible for ensuring the overall performance of the software or any related applications.  We make no representation, warranty, guarantee or undertaking in respect of the software or any related documentation, whether expressed or implied, including but not limited to the warranties or merchantability, fitness for a particular purpose and noninfringement. In no event shall we be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or documentation or the use or other dealings in the software or documentation.  Any test results or performance figures are indicative and will not reflect performance under all conditions.  Any reference to any third party or third-party product, service or other resource is not an endorsement or recommendation by Block.one.  We are not responsible, and disclaim any and all responsibility and liability, for your use of or reliance on any of these resources. Third-party resources may be updated, changed or terminated at any time, so the information here may be out of date or inaccurate.
