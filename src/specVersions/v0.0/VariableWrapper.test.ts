import { VariableWrapper } from './VariableWrapper'

describe('VariableWrapper', () => {
  const variableWrapper = new VariableWrapper(
    [ 'lookup' ],
    (prefix, className, variable, suffix) => {
      return `${prefix}<div class="${className}">${variable}</div>${suffix}`
    })

  it('should wrap variables surrounded by {{ }}', () => {
    const template = 'This string has a {{var}} inside'
    const expectedWrapped = 'This string has a <div class="data">{{var}}</div> inside'
    const wrapped = variableWrapper.wrap(template)
    expect(wrapped).toEqual(expectedWrapped)
  })

  it('should wrap variables surrounded by {{lookup }}', () => {
    const template = 'This string has a {{lookup var}} inside'
    const expectedWrapped = 'This string has a <div class="data">{{lookup var}}</div> inside'
    const wrapped = variableWrapper.wrap(template)
    expect(wrapped).toEqual(expectedWrapped)
  })

  it('should wrap variables surrounded by {{{ }}}', () => {
    const template = 'This string has a {{{var}}} inside'
    const expectedWrapped = 'This string has a <div class="data">{{{var}}}</div> inside'
    const wrapped = variableWrapper.wrap(template)
    expect(wrapped).toEqual(expectedWrapped)
  })

  it('should not wrap variables surrounded by {{{{ }}}} or more', () => {
    const template = 'This string has a {{{{var}}}} inside'
    const expectedWrapped = template
    const wrapped = variableWrapper.wrap(template)
    expect(wrapped).toEqual(expectedWrapped)
  })

  it('should not wrap variables surrounded by { }', () => {
    const template = 'This string has a {var} inside'
    const expectedWrapped = template
    const wrapped = variableWrapper.wrap(template)
    expect(wrapped).toEqual(expectedWrapped)
  })
})
