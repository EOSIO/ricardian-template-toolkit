import { WrapVariable } from './WrapVariable'

export class VariableWrapper {
  // Allow 2 or 3 brackets and no more. We don't want to end up with "{<div class="variable data">{{{test}}}</div>}".
  private static start = /(^|[^{])({{{?)/.source // "{{" or "{{{" but not "{{{{"
  private static end = /(}}}?)([^}]|$)/.source // "}}" or "}}}" but not "}}}}"
  private static space = /(?:[\s]*)/.source

  private static createVariableMatcher() {
    const { source: variableRoot } = /(\$?)(\w+)/ // "from" or "$transaction" or "$clauses"
    const { source: variableChild } = /(\.[\w\d\[\]\.]+)?/ // suffix ".delay_sec" or ".actions.[0].data.from"
    // tslint:disable-next-line:max-line-length
    const { source: variable } = RegExp(`${VariableWrapper.space}(?!else)(${variableRoot}${variableChild})${VariableWrapper.space}`) // " $action.name " or "from"

    // /(^|[^{])({{{?)( *(\$?)(\w+)(?:\.[\w\d\[\]\.]+)? *)([^}](?:}}}?))([^}]|$)/g
    return RegExp(`${VariableWrapper.start}${variable}${VariableWrapper.end}`, 'g')
  }

  private static createWrappedHelperMatcher(wrappedHelpers: string[]): RegExp {
    const wrappedHelperStr = wrappedHelpers.join('|')
    // The extra () near the beginning acts as a placeholder so the number of captured elements match the main regex
    const wrappedHelper = `(()(${wrappedHelperStr})\\s([^}]+))`
    const { source: variable } = RegExp(`${VariableWrapper.space}${wrappedHelper}${VariableWrapper.space}`)

    return RegExp(`${VariableWrapper.start}${variable}${VariableWrapper.end}`, 'g')
  }

  private variableMatch: RegExp = VariableWrapper.createVariableMatcher()
  private wrappedHelperMatch: RegExp

  private wrapVariable: WrapVariable

  public constructor(wrappedHelpers: string[], wrapVariable: WrapVariable) {
    this.wrapVariable = wrapVariable
    this.wrappedHelperMatch = VariableWrapper.createWrappedHelperMatcher(wrappedHelpers)
  }

  public wrap(template: string) {
    const processVariable = this.processVariable.bind(this)
    const newTemplate = template.replace(this.variableMatch, processVariable)
    return newTemplate.replace(this.wrappedHelperMatch, processVariable)
  }

  private processVariable(...p: any[]): string {
    let className: string = 'data'
    if (p[4] === '$') {
      className = p[5]
    }
    const variable = p[2] + p[3] + p[7]

    return this.wrapVariable(p[1], className, variable, p[8])
  }
}
