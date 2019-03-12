export interface HtmlValidationErrorArgs {
  tag: string
  reason: string
}

export class RicardianContractRenderError extends Error implements RicardianContractRenderError {
  private static buildMessage(messageArgs: string | HtmlValidationErrorArgs): string {
    if (typeof messageArgs === 'string') {
      return messageArgs as string
    }
    const errorArgs = messageArgs as HtmlValidationErrorArgs
    return `Invalid or unexpected HTML found near "${errorArgs.tag}" tag. Reason: ${errorArgs.reason}`
  }

  public tag: string | null = null
  public reason: string | null = null

  constructor(message: string | HtmlValidationErrorArgs) {
    super(RicardianContractRenderError.buildMessage(message))
    this.name = 'RicardianContractError'
    Object.setPrototypeOf(this, RicardianContractRenderError.prototype)

    if (typeof message !== 'string') {
      const messageArgs = message as HtmlValidationErrorArgs
      this.tag = messageArgs.tag
      this.reason = messageArgs.reason
    }
  }
}
