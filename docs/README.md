
EOSIO.CDT Ricardian Template Toolkit ![EOSIO Alpha](https://img.shields.io/badge/EOSIO-Alpha-blue.svg)
======================================================================================================

This library is a new tool in the suite of tools from [EOSIO.CDT (Contract Development Toolkit)](https://github.com/EOSIO/eosio.cdt/tree/develop), and should allow for a more robust and rich environment for writing **Ricardian** contracts for your **EOSIO** smart contracts.

Overview
--------

The Ricardian Template Toolkit is an implementation of a renderer for the [Ricardian Contract Specification](https://github.com/EOSIO/ricardian-spec) that demonstrates how Ricardian Contracts built to the specification can be displayed. This toolkit can be used by Authenticator developers to consistently render Ricardian Contracts and by Smart Contract developers as an authoring and testing tool.

Together, the Ricardian Template Toolkit and Ricardian Contract Specification projects enable a clear understanding of the agreements to which users are consenting in Authenticators which ask them to sign transactions.

This library contains a factory that takes an ABI object, a transaction object, and an action index (along with some developer-oriented flags). It then:

1.  Selects an appropriate processor based on the `spec_version` field in the contract metadata
2.  Validates the Ricardian Contracts and metadata associated with the transaction actions
3.  Validates all other spec requirements, including image sizes and hashes
4.  Interpolates all variables with data from the transaction or ricardian\_clauses
5.  On success, returns an object with metadata and Contract Markup Language (CML, a subset of HTML)
6.  On error or validation failure, returns a descriptive error, along with any data it was able to successfully parse and render

Foundational Inspiration for Metadata:

*   [https://hiltmon.com/blog/2012/06/18/markdown-metadata/](https://hiltmon.com/blog/2012/06/18/markdown-metadata/)
*   [https://blog.github.com/2013-09-27-viewing-yaml-metadata-in-your-documents/](https://blog.github.com/2013-09-27-viewing-yaml-metadata-in-your-documents/)
*   [https://stackoverflow.com/questions/44215896/markdown-metadata-format#answer-44222826](https://stackoverflow.com/questions/44215896/markdown-metadata-format#answer-44222826)

Installation
------------

`yarn add ricardian-template-toolkit`

Command Line Tool
-----------------

The toolkit includes a simple command line wrapper around the library for local testing of HTML generation. If you install the package globally, the `rc` command will be available on the command line. If running locally, use (within the project root) `./bin/rc`. Given an ABI, transaction data (fully deserialized), and optionally the transaction index (default 0) the `rc` command will output the generated HTML fragment.

Example:

```
rc -a myabi.json -t mytxn.json -i 1
```

The metadata is also available with the `--only-metadata` option.

Example:

```
rc -a myabi.json -t mytxn.json -i 1 --only-metadata
```

Help is available with `rc --help`.

Running Locally
---------------

```
yarn install
yarn build
yarn example
```

Other Commands
--------------

*   `yarn lint`
*   `yarn test`

Ricardian Specification
-----------------------

The Ricardian Specification and an example of a compliant Ricardian contract can now be found at [https://github.com/EOSIO/ricardian-spec](https://github.com/EOSIO/ricardian-spec).

Usage
-----

Usage is very straightforward:

```javascript
import { RicardianContractFactory} from 'ricardian-template-toolkit'

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

Backward Compatibility Note
---------------------------

Be aware that for backward compatibility with contract specifications prior to `0.1.0`, any contracts lacking a `spec_version` in the metadata are treated as following spec version `0.0.0`.

Example
-------

The following is based on the [example from the Ricardian Contract Specification](https://github.com/EOSIO/ricardian-spec#example-template)

Raw HTML Output

```
I, <div class="variable data">bobsmith</div>, author of the blog post "<div class="variable data">An Example Post</div>", certify that I am the original author of the contents of this blog post and have attributed all external sources appropriately.<br />
<div class="variable clauses">WARRANTY. The invoker of the contract action shall uphold its Obligations under this Contract in a timely and workmanlike manner, using knowledge and recommendations for performing the services which meet generally acceptable standards set forth by EOS.IO Blockchain Block Producers.</div><br  />
```

Styled HTML

```
<html>
  <head>
    <style>
      * {
        font-family: serif;
      }
      body {
        margin: 1rem 2rem;
      }
      .variable {
        display: inline;
        color: DarkRed;
        font-style: italic;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    I, <div class="variable data">bobsmith</div>, author of the blog post "<div class="variable data">An Example Post</div>", certify that I am the original author of the contents of this blog post and have attributed all external sources appropriately.<br />
    <div class="variable clauses">WARRANTY. The invoker of the contract action shall uphold its Obligations under this Contract in a timely and workmanlike manner, using knowledge and recommendations for performing the services which meet generally acceptable standards set forth by EOS.IO Blockchain Block Producers.</div><br />
  </body>
</html>
```

Rendered Styled HTML ![Styled HTML Example](.images/styled-example.png)

Contributing
------------

[Contributing Guide](./CONTRIBUTING.md)

[Code of Conduct](./CONTRIBUTING.md#conduct)

License
-------

[MIT](./LICENSE)

Important
---------

See LICENSE for copyright and license terms. Block.one makes its contribution on a voluntary basis as a member of the EOSIO community and is not responsible for ensuring the overall performance of the software or any related applications. We make no representation, warranty, guarantee or undertaking in respect of the software or any related documentation, whether expressed or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall we be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or documentation or the use or other dealings in the software or documentation. Any test results or performance figures are indicative and will not reflect performance under all conditions. Any reference to any third party or third-party product, service or other resource is not an endorsement or recommendation by Block.one. We are not responsible, and disclaim any and all responsibility and liability, for your use of or reliance on any of these resources. Third-party resources may be updated, changed or terminated at any time, so the information here may be out of date or inaccurate. Any person using or offering this software in connection with providing software, goods or services to third parties shall advise such third parties of these license terms, disclaimers and exclusions of liability. Block.one, EOSIO, EOSIO Labs, EOS, the heptahedron and associated logos are trademarks of Block.one.

Wallets and related components are complex software that require the highest levels of security. If incorrectly built or used, they may compromise users’ private keys and digital assets. Wallet applications and related components should undergo thorough security evaluations before being used. Only experienced developers should work with this software.

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
* ["specVersions/v0.0/validators"](modules/_specversions_v0_0_validators_.md)
* ["specVersions/v0.0/whitelist"](modules/_specversions_v0_0_whitelist_.md)
* ["specVersions/v0.1/RicardianContractProcessorImpl"](modules/_specversions_v0_1_ricardiancontractprocessorimpl_.md)
* ["specVersions/v0.1/helpers"](modules/_specversions_v0_1_helpers_.md)
* ["specVersions/v0.2/RicardianContractProcessorImpl"](modules/_specversions_v0_2_ricardiancontractprocessorimpl_.md)
* ["specVersions/v0.2/helpers"](modules/_specversions_v0_2_helpers_.md)
* ["utils/contractUtils"](modules/_utils_contractutils_.md)

---

