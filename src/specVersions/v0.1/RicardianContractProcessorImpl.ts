import { RicardianContract, RicardianContractConfig } from '../../interfaces'
import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import { getContractSpecVersion } from '../../utils/contractUtils'
import { RicardianContractProcessorImpl as RCP_0_0 } from '../v0.0/RicardianContractProcessorImpl'

export class RicardianContractProcessorImpl extends RCP_0_0 {
  private readonly major = 0
  private readonly minor = 1

  constructor() {
    super()
  }

  /**
   * Process the RicardianContractConfig and return a RicardianContract.
   *
   * @param config A `RicardianContractConfig` object
   */
  public process(config: RicardianContractConfig): RicardianContract {
    const  version = getContractSpecVersion(config)
    if (version.major === this.major && version.minor <= this.minor) {
      return super.process(config)
    } else {
      throw new RicardianContractRenderError(`Unexpected version encountered. ` +
        `Found `)
    }
  }

  public getSpecVersion() {
    return {
      major: this.major,
      minor: this.minor,
    }
  }
}
