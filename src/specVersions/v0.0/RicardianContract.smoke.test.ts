// Extra smoke test file using some common shared data

import RicardianContractImpl from '.'
import { RicardianContractRenderError } from '../../RicardianContractRenderError'

import Fixture from './testfixtures/jscore-fixtures'

const transaction = Fixture.transaction
const abi = Fixture.abis[0].abi

describe('RicardianContract', (): void => {
  const rcp = new RicardianContractImpl()

  describe('provided a valid transaction and ABI', (): void => {

    it('parses a simple contract', () => {
      expect(() => rcp.process({
        abi,
        transaction,
        actionIndex: 1,
        allowUnusedVariables: true,
      })).not.toThrow(RicardianContractRenderError)
    })

    it('parses a complex contract', () => {
      expect(() => rcp.process({
        abi,
        transaction,
        actionIndex: 0,
      })).not.toThrow(RicardianContractRenderError)
    })
  })
})
