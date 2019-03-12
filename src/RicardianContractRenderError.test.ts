import { RicardianContractRenderError } from './RicardianContractRenderError'

describe('RicardianContractRenderError', () => {
  it('constructs message from string properly', () => {
    const expected = 'Danger, Will Robinson!'
    const error = new RicardianContractRenderError(expected)
    expect(error.message).toEqual(expected)
    expect(error.tag).toBeNull()
    expect(error.reason).toBeNull()
  })

  it('constructs message from HtmlValidationErrorArgs properly', () => {
    const tag = 'body'
    const reason = `"${tag}" tag is present`
    const error = new RicardianContractRenderError({ tag, reason })
    expect(error.message)
      .toEqual(`Invalid or unexpected HTML found near "${tag}" tag. Reason: ${reason}`)
    expect(error.tag).toEqual(tag)
    expect(error.reason).toEqual(reason)
  })
})
