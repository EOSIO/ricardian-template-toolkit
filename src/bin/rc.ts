import fs from 'fs'
import yargs from 'yargs'
import { RicardianContractFactory } from '../RicardianContractFactory'

function parseArgs() {
  const argv = yargs
    .options({
      'abi': {
        alias: 'a',
        describe: 'Path to JSON file containing the ABI',
        normalize: true,
        requiresArg: true,
      },
      'transaction': {
        alias: 't',
        describe: 'Path to JSON file containing transaction data',
        normalize: true,
        requiresArg: true,
      },
      'action-index': {
        alias: 'i',
        describe: 'Index of the transaction action to use (zero-based)',
        default: 0,
        type: 'number',
      },
      'permissive': {
        alias: 'p',
        describe: 'Process the contract in permissive mode',
        default: false,
        type: 'boolean',
      },
      'max-passes': {
        alias: 'm',
        describe: 'Maximum number of variable interpolation passes to perform',
        default: 3,
        type: 'number',
      }
    })
    .demandOption(['transaction', 'abi'])
    .version()
    .parse()

  return argv
}

function loadTransaction(transactionPath: string): any {
  const txnStr = fs.readFileSync(transactionPath)
  return JSON.parse(txnStr.toString())
}

function loadAbi(abiPath: string): any {
  const abiStr = fs.readFileSync(abiPath)
  return JSON.parse(abiStr.toString())
}

function run(): void {
  const argv = parseArgs()
  // Since transaction and api are required, they won't be undefined / null
  const transaction = loadTransaction(argv.transaction!)
  const abi = loadAbi(argv.abi!)

  const config = {
    abi: abi.abi,
    transaction: transaction.transaction,
    actionIndex: argv['action-index'],
    maxPasses: argv['max-passes'],
    allowUnusedVariables: argv.permissive,
  }

  const rcf = new RicardianContractFactory()
  const rc = rcf.create(config)

  console.info(rc.getHtml())
}

module.exports.run = run
