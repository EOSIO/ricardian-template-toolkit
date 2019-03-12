const { RicardianContractFactory } = require('./dist/RicardianContractFactory')
const { complexEosioTokenAbi, complexTransferTransaction } = require('./dist/testfixtures/complex-fixtures')

const complexTransaction = JSON.parse(complexTransferTransaction)
const complexAbi = JSON.parse(complexEosioTokenAbi)

const factory = new RicardianContractFactory()
const complexRc = factory.create({
  abi: complexAbi,
  transaction: complexTransaction,
  actionIndex: 0,
})

console.log('\n\n***** Complex Multi-Transfer Example *****')
console.log('\n\n~~~~~METADATA~~~~~')
console.log(complexRc.getMetadata())
console.log('\n\n~~~~~HTML~~~~~')
console.log(complexRc.getHtml())