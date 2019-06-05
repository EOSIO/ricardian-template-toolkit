import { compareProcessors, findProcessorForVersion } from './factoryHelpers'
import { RicardianContractProcessor } from './interfaces'

function createMockProcessor(major: number, minor: number) {
  return jest.fn<RicardianContractProcessor>(() => ({
    getSpecVersion: () => {
      return { major, minor }
    }
  }))()
}

describe('compareProcessors', () => {

  describe('when major versions differ', () => {
    it('compares correctly if a major < b major', () => {
      const mockA = createMockProcessor(1, 2)
      const mockB = createMockProcessor(2, 2)

      expect(compareProcessors(mockA, mockB)).toEqual(-1)
    })

    it('compares correctly if a major > b major', () => {
      const mockA = createMockProcessor(2, 2)
      const mockB = createMockProcessor(1, 2)

      expect(compareProcessors(mockA, mockB)).toEqual(1)
    })
  })

  describe('when major versions are equal', () => {
    it('compares correctly if a minor == b minor', () => {
      const mockA = createMockProcessor(1, 2)
      const mockB = createMockProcessor(1, 2)

      expect(compareProcessors(mockA, mockB)).toEqual(0)
    })

    it('compares correctly if a minor < b minor', () => {
      const mockA = createMockProcessor(1, 1)
      const mockB = createMockProcessor(1, 2)

      expect(compareProcessors(mockA, mockB)).toEqual(-1)
    })

    it('compares correctly if a minor > b minor', () => {
      const mockA = createMockProcessor(1, 2)
      const mockB = createMockProcessor(1, 1)

      expect(compareProcessors(mockA, mockB)).toEqual(1)
    })
  })

  it('can correctly sort an array of processors', () => {
    const processors = [
      createMockProcessor(0, 3),
      createMockProcessor(2, 2),
      createMockProcessor(3, 4),
      createMockProcessor(0, 1),
      createMockProcessor(2, 1),
      createMockProcessor(3, 2),
    ]

    processors.sort(compareProcessors)

    expect(processors[0].getSpecVersion()).toEqual({ major: 0, minor: 1})
    expect(processors[5].getSpecVersion()).toEqual({ major: 3, minor: 4})
    expect(processors[3].getSpecVersion()).toEqual({ major: 2, minor: 2})
  })
})

describe('findProcessorForVersion', () => {
  const processors = [
    createMockProcessor(0, 3),
    createMockProcessor(2, 2),
    createMockProcessor(3, 4),
    createMockProcessor(0, 1),
    createMockProcessor(2, 1),
    createMockProcessor(3, 2),
  ].sort(compareProcessors)

  it('finds a processor for an exact version match', () => {
    const specVersion = { major: 2, minor: 1 }

    const processor = findProcessorForVersion(processors, specVersion)

    expect(processor).not.toBeNull()
    if (processor) {
      expect(processor.getSpecVersion()).toEqual(specVersion)
    }
  })

  it('finds a processor for equal major and lesser minor', () => {
    const specVersion = { major: 3, minor: 3 }

    const processor = findProcessorForVersion(processors, specVersion)

    expect(processor).not.toBeNull()
    if (processor) {
      expect(processor.getSpecVersion()).toEqual({ major: 3, minor: 4})
    }
  })

  it('finds nothing for equal major and greater minor', () => {
    const specVersion = { major: 3, minor: 5 }

    const processor = findProcessorForVersion(processors, specVersion)

    expect(processor).toBeNull()
  })

  it('finds nothing for unknown major', () => {
    const specVersion = { major: 5, minor: 5 }

    const processor = findProcessorForVersion(processors, specVersion)

    expect(processor).toBeNull()
  })
})
