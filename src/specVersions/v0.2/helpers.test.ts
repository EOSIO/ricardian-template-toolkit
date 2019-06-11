import * as Handlebars from 'handlebars'
import { ifHasValue } from './helpers'

describe('ifHasValue', () => {
  const context = {
    nullVal: null,
    goodVal: 7,
  }

  beforeAll(() => {
    Handlebars.registerHelper('if_has_value', ifHasValue)
  })

  it ('does not render on undefined', () => {
    const template =
    `{{#if_has_value undefVal}}undefVal: {{ undefVal }}{{ else }}undefVal has no value{{/if_has_value}}`
    const t = Handlebars.compile(template)
    const result = t(context)
    expect(result).toEqual('undefVal has no value')
  })

  it ('does not render on null', () => {
    const template =
    `{{#if_has_value nullVal}}nullVal: {{ nullVal }}{{ else }}nullVal has no value{{/if_has_value}}`
    const t = Handlebars.compile(template)
    const result = t(context)
    expect(result).toEqual('nullVal has no value')
  })

  it ('does render on 0', () => {
    const template =
    `{{#if_has_value goodVal}}goodVal: {{ goodVal }}{{ else }}goodVal has no value{{/if_has_value}}`
    const t = Handlebars.compile(template)
    const result = t(context)
    expect(result).toEqual('goodVal: 7')
  })
})
