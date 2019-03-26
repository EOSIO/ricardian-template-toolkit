import { indexedTransferTransaction, transferTransaction } from '../../testfixtures/fixtures'
import * as helpers from './helpers'

const indexedTestTransferTransaction: any = JSON.parse(indexedTransferTransaction)
// tslint:disable-next-line:max-line-length
const transferRicardian: string = '---\ntitle: Token Transfer\nsummary: Transfer tokens from one account to another.\nicon: https://a.com/token-transfer.png#00506E08A55BCF269FE67F202BBC08CFF55F9E3C7CD4459ECB90205BF3C3B562\n---\n\n## Transfer Terms & Conditions\n\nI, {{from}}, certify the following to be true to the best of my knowledge:\n\n1. I certify that {{quantity}} is not the proceeds of fraudulent or violent activities.\n2. I certify that, to the best of my knowledge, {{to}} is not supporting initiation of violence against others.\n3. I have disclosed any contractual terms & conditions with respect to {{quantity}} to {{to}}.\n\nI understand that funds transfers are not reversible after the {{$transaction.delay_sec}} seconds or other delay as configured by {{from}}\'s permissions.\n\nIf this action fails to be irreversibly confirmed after receiving goods or services from \'{{to}}\', I agree to either return the goods or services or resend {{quantity}} in a timely manner.\n\n{{$clauses.ricardian_clause_interpolations}}\n\nOh, and one more thing...\n\n{{$clauses.boilerplate}}\n\n{{$clauses.ricardian_contract_images}}'

describe('indexTransaction Helper', (): void => {
  it('adds $index properties to every array in the transaction', (): void => {
    const indexed: any = helpers.indexTransaction(JSON.parse(transferTransaction))
    expect(indexed).toEqual(indexedTestTransferTransaction)
  })
})

describe('extractSymbolCode Helper', (): void => {
  it('extracts the symbol code from an asset', (): void => {
    const asset = '2.001 EOS'
    const code = helpers.extractSymbolCode(asset)
    expect(code).toEqual('EOS')
  })

  it('extracts the symbol code from a symbol', (): void => {
    const symbol = '4,EOS'
    const code = helpers.extractSymbolCode(symbol)
    expect(code).toEqual('EOS')
  })

  it('returns empty string on improperly formatted input', (): void => {
    const symbol = '123.456'
    const code = helpers.extractSymbolCode(symbol)
    expect(code).toEqual('')
  })
})

describe('hasVariable Helper', (): void => {
  it('detects uninterpolated variables in the Ricardian Contract', (): void => {
    expect(helpers.hasVariable(transferRicardian)).toBe(true)
  })

  it('detects the various types of uninterpolated handlebars variables', (): void => {
    const a = helpers.hasVariable('test {{> components/templates/email/includes/email-tr-spacer }} test')
    const b = helpers.hasVariable('{{# deliveryAddress }} test')
    const c = helpers.hasVariable('test {{^ deliveryAddress }}')
    const d = helpers.hasVariable('{{{ deliveryAddressReadable }}}')
    const e = helpers.hasVariable('{{/ deliveryAddress }}')
    const f = helpers.hasVariable('test {{test}}')
    expect(a && b && c && d && e && f).toBe(true)
  })

  it('returns false when the given string has no variables', (): void => {
    expect(helpers.hasVariable('This is a test.')).toBe(false)
  })
})

describe('tagTemplateVariables Helper', (): void => {
  it('wraps all valid variables', (): void => {
    const template = '{{from}} is sending {{ quantity }} to {{   to   }} for {{{memo}}}.'
    // tslint:disable-next-line:max-line-length
    const wrapped = '{{#wrap class="data"}}{{from}}{{/wrap}} is sending {{#wrap class="data"}}{{quantity}}{{/wrap}} to {{#wrap class="data"}}{{to}}{{/wrap}} for {{#wrap class="data"}}{{{memo}}}{{/wrap}}.'
    expect(helpers.tagTemplateVariables([ 'lookup' ], template)).toEqual(wrapped)
  })

  it('wraps all valid pseudo variables', (): void => {
    // tslint:disable-next-line:max-line-length
    const template: string = '{{$transaction.delay_sec}} seconds will pass before the {{ $action.account }}::{{  $action.name  }} takes place. {{{$clauses.boilerplate}}}; {{$transaction.actions.[0].data.from}}'
    // tslint:disable-next-line:max-line-length
    const wrapped: string = '{{#wrap class="transaction"}}{{$transaction.delay_sec}}{{/wrap}} seconds will pass before the {{#wrap class="action"}}{{$action.account}}{{/wrap}}::{{#wrap class="action"}}{{$action.name}}{{/wrap}} takes place. {{#wrap class="clauses"}}{{{$clauses.boilerplate}}}{{/wrap}}; {{#wrap class="transaction"}}{{$transaction.actions.[0].data.from}}{{/wrap}}'
    expect(helpers.tagTemplateVariables([ 'lookup' ], template)).toEqual(wrapped)
  })

  it('does not wrap non-variable handlebars tags', (): void => {
    // tslint:disable-next-line:max-line-length
    const template: string = '{{> from }} seconds will pass before the {{^$action.account}}::{{{^$action.name}}} takes place. {{{# $clauses.boilerplate }}}; {{/ $transaction.actions.[0].data.from }}. And {{valid}}.'
    // tslint:disable-next-line:max-line-length
    const wrapped: string = '{{> from }} seconds will pass before the {{^$action.account}}::{{{^$action.name}}} takes place. {{{# $clauses.boilerplate }}}; {{/ $transaction.actions.[0].data.from }}. And {{#wrap class="data"}}{{valid}}{{/wrap}}.'
    expect(helpers.tagTemplateVariables([ 'lookup' ], template)).toEqual(wrapped)
  })

  it('does not wrap \'if\' clause elements', () => {
    const template: string = 'This {{#if animal}}{{animal}}{{else}}{{mineral}}{{/if}} is kind of weird.'
    // tslint:disable-next-line:max-line-length
    const wrapped: string = 'This {{#if animal}}{{#wrap class="data"}}{{animal}}{{/wrap}}{{else}}{{#wrap class="data"}}{{mineral}}{{/wrap}}{{/if}} is kind of weird.'
    expect(helpers.tagTemplateVariables([ 'lookup' ], template)).toEqual(wrapped)
  })

  it('does not wrap variables surrounded by more than 3 brackets', (): void => {
    const template: string = '{{{{testing}}}} {{okay}} {{{not}}}} {{{{okay}}}'
    const wrapped: string = '{{{{testing}}}} {{#wrap class="data"}}{{okay}}{{/wrap}} {{{not}}}} {{{{okay}}}'
    expect(helpers.tagTemplateVariables([ 'lookup' ], template)).toEqual(wrapped)
  })
})

describe('sanitizeHtml Helper', (): void => {
  it('throws error on non-whitelisted tags', (): void => {
    const html = '<div>His power is over <shocked>9000</shocked></div>'
    expect(() => helpers.sanitizeHtml(html)).toThrow(/Disallowed tag "shocked" found/)
  })

  it('throws error on non-whitelisted attributes', (): void => {
    const html = '<div>His power is over <h1 mass=\'9000\'>9000</h1></div>'
    expect(() => helpers.sanitizeHtml(html)).toThrow(/Disallowed attribute "mass" found on tag "h1"/)
  })

  it('throws error on mismatched tags', () => {
    const html = '<div>His power is over <h1>9000</div></h1>'
    expect(() => helpers.sanitizeHtml(html)).toThrow(/Unexpected closing tag "div"; expected closing tag for "h1"/)
  })

  it('throws error on improper close tag for empty element', () => {
    const html = '<div>His power is over <h1>9000</h1><br></br></div>'
    expect(() => helpers.sanitizeHtml(html)).toThrow(/Unexpected closing tag for empty element "br"/)
  })

  it('throws error on unclosed tag', () => {
    const html = '<div>His power is over <h1>9000</h1>'
    expect(() => helpers.sanitizeHtml(html)).toThrow(/Expected closing tag for "div" not found/)
  })

  it('throws error on unmatched closing tag', () => {
    const html = '<div>His power is over <h1>9000</h1></h2></div>'
    expect(() => helpers.sanitizeHtml(html)).toThrow(/Unexpected closing tag "h2"; expected closing tag for "div"/)
  })

  it('throws error on unmatched trailing closing tag', () => {
    const html = '<div>His power is over <h1>9000</h1></div></h2>'
    expect(() => helpers.sanitizeHtml(html)).toThrow(/Unexpected closing tag "h2" with no open tag/)
  })
})
