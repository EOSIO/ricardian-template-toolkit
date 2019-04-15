import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import * as validators from './validators'

describe('title validator', () => {
  it('fails empty titles', () => {
    expect(() => { validators.validateTitle('') })
      .toThrow(RicardianContractRenderError)
  })

  it('fails titles having only whitespace', () => {
    expect(() => { validators.validateTitle('  \t\n') })
      .toThrow(RicardianContractRenderError)
  })

  it('fails null titles', () => {
    expect(() => { validators.validateTitle(null) })
      .toThrow(RicardianContractRenderError)
  })

  it('fails undefined titles', () => {
    expect(() => { validators.validateTitle() })
      .toThrow(RicardianContractRenderError)
  })

  it('fails titles > 50 chars', () => {
    const title = 'a'.repeat(51)
    expect(() => { validators.validateTitle(title) })
      .toThrow(RicardianContractRenderError)
  })

  it('fails titles containing variables', () => {
    const title = 'Bad title with {{var}}'
    expect(() => { validators.validateTitle(title) })
      .toThrow(RicardianContractRenderError)
  })

  it('passes valid a title', () => {
    const title = 'This is a very fine title!'
    expect(() => { validators.validateTitle(title) })
      .not.toThrow(RicardianContractRenderError)
  })
})

describe('summary validator', () => {
  it('fails empty summary', () => {
    expect(() => { validators.validateSummary('') })
      .toThrow(RicardianContractRenderError)
  })

  it('fails summary having only whitespace', () => {
    expect(() => { validators.validateSummary('  \t\n') })
      .toThrow(RicardianContractRenderError)
  })

  it('fails null summary', () => {
    expect(() => { validators.validateSummary(null) })
      .toThrow(RicardianContractRenderError)
  })

  it('fails undefined summary', () => {
    expect(() => { validators.validateSummary() })
      .toThrow(RicardianContractRenderError)
  })

  it('fails summary > 116 chars', () => {
    const summary = 'a'.repeat(117)
    expect(() => { validators.validateSummary(summary) })
      .toThrow(RicardianContractRenderError)
  })

  it('passes valid a summary', () => {
    const summary = 'This summary summarizes the summary quite nicely!'
    expect(() => { validators.validateTitle(summary) })
      .not.toThrow(RicardianContractRenderError)
  })

  it('passes a summary ignoring html tags', () => {
    // tslint:disable-next-line:max-line-length
    const summary = 'This <div class="variable data">summary with variable</div> should still be ok even if too long with the tags in place because html tags are removed.'
    expect(() => { validators.validateSummary(summary) })
      .not.toThrow(RicardianContractRenderError)
  })

  it('fails a summary ignoring html tags that is still too long', () => {
    // tslint:disable-next-line:max-line-length
    const summary = 'This <div class="variable data">summary with variable</div> should fail because even with the tags removed, it\'s still too long according to the specification. Falgercarb!'
    expect(() => { validators.validateSummary(summary) })
      .toThrow(RicardianContractRenderError)
  })
})

describe('icon validator', () => {
  it('fails empty icon', () => {
    expect(() => { validators.validateIcon('') })
      .toThrow(RicardianContractRenderError)
  })

  it('fails icon having only whitespace', () => {
    expect(() => { validators.validateIcon('  \t\n') })
      .toThrow(RicardianContractRenderError)
  })

  it('fails null icon', () => {
    expect(() => { validators.validateIcon(null) })
      .toThrow(RicardianContractRenderError)
  })

  it('fails undefined icon', () => {
    expect(() => { validators.validateIcon() })
      .toThrow(RicardianContractRenderError)
  })

  it('fails icon containing variables', () => {
    const url = 'https://{{a}}.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562'
    expect(() => { validators.validateIcon(url) })
      .toThrow(RicardianContractRenderError)
  })

  it('fails if icon is not url', () => {
    const url = 'Is this a URL?'
    expect(() => { validators.validateIcon(url) })
      .toThrow(RicardianContractRenderError)
  })

  it('fails if icon url does not end with a SHA256 hash', () => {
    const url = 'http://google.com'
    expect(() => { validators.validateIcon(url) })
      .toThrow(RicardianContractRenderError)
  })

  it('passes on valid icon URL', () => {
    const url = 'https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562'
    expect(() => { validators.validateIcon(url) })
      .not.toThrow(RicardianContractRenderError)
  })
})
