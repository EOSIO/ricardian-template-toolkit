import { RicardianContractProcessor, SpecVersion } from './interfaces'

export function compareProcessors(a: RicardianContractProcessor, b: RicardianContractProcessor): number {
  const aVer = a.getSpecVersion()
  const bVer = b.getSpecVersion()

  if (aVer.major < bVer.major) { return -1 }
  if (aVer.major > bVer.major) { return 1 }
  if (aVer.minor < bVer.minor) { return -1 }
  if (aVer.minor > bVer.minor) { return 1 }
  return 0
}

export function findProcessorForVersion(sortedProcessors: RicardianContractProcessor[],
                                        specVersion: SpecVersion): RicardianContractProcessor | null {
  const major = specVersion.major
  const minor = specVersion.minor

  let curProcessor: RicardianContractProcessor | null = null

  // Since processors are sorted by major and minor, the first match
  // with the same major value and a processor with the same or greater
  // minor value will be returned
  for (const processor of sortedProcessors) {
    const version = processor.getSpecVersion()
    if (major === version.major) {
      if (minor <= version.minor) {
        curProcessor = processor
        break
      }
    }
  }

  return curProcessor
}
