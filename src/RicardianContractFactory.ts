import { compareProcessors, findProcessorForVersion } from './factoryHelpers'
import { RicardianContract, RicardianContractConfig,
         RicardianContractProcessor, SpecVersion} from './interfaces'
import { RicardianContractRenderError } from './RicardianContractRenderError'
import RCP_v0_0 from './specVersions/v0.0'
import RCP_v0_1 from './specVersions/v0.1'
import RCP_v0_2 from './specVersions/v0.2'
import { getContractSpecVersion } from './utils/contractUtils'

export class RicardianContractFactory {
  private processors: RicardianContractProcessor[] = []

  constructor() {
    this.processors.push(new RCP_v0_0())
    this.processors.push(new RCP_v0_1())
    this.processors.push(new RCP_v0_2())

    this.processors.sort(compareProcessors)
  }

  private findProcessor(specVersion: SpecVersion): RicardianContractProcessor | null {
    return findProcessorForVersion(this.processors, specVersion)
  }

  public create(config: RicardianContractConfig): RicardianContract {
    const specVersion = getContractSpecVersion(config)

    const processor = this.findProcessor(specVersion)

    if (processor) {
      return processor.process(config)
    } else {
      throw new RicardianContractRenderError(
        `Unable to find a processor to handle specification version ${specVersion.major}.${specVersion.minor}`)
    }
  }
}
