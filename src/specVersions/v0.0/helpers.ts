import xss from 'xss'
import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import { VariableWrapper } from './VariableWrapper'
import { EmptyElements, WhiteList } from './whitelist'

// Recursively adds $index properties to every array in the provided transaction
export function indexTransaction(entry: any): any {
  if (Array.isArray(entry)) {
    entry.forEach((item: any, index: number): any => {
      item.$index = index
      indexTransaction(item)
    })
    return
  }

  for (const [, value] of Object.entries(entry)) {
    if (Array.isArray(value) && value.length) {
      indexTransaction(value)
    }
  }

  return entry
}

export function hasVariable(text: string): boolean {
  const regex: RegExp = RegExp('{{[{]?(.*?)[}]?}}')
  return regex.test(text)
}

export function tagTemplateVariables(wrappedHelpers: string[], template: string): string {
  const variableWrapper = new VariableWrapper(wrappedHelpers, (prefix, className, variable, suffix) => {
    return `${prefix}{{#wrap class="${className}"}}${variable}{{/wrap}}${suffix}`
  })

  return variableWrapper.wrap(template)
}

export function tagMetadataVariables(
    wrappedHelpers: string[],
    metadata: { [index: string]: string }): { [index: string]: string } {
  const variableWrapper = new VariableWrapper(wrappedHelpers, (prefix, className, variable, suffix) => {
    return `${prefix}<div class="variable ${className}">${variable}</div>${suffix}`
  })

  const processedMetadata: { [index: string]: string } = {}
  Object.keys(metadata).forEach((key) => {
    if (metadata[key]) {
      processedMetadata[key] = variableWrapper.wrap(metadata[key])
    }
  })

  return processedMetadata
}

export function extractSymbolCode(text: string): string {
  const regex: RegExp = RegExp('.+[^A-Za-z]([A-Za-z]+)$')
  const match = text.match(regex)
  if (match) {
    return match[1]
  }

  return ''
}

export function sanitizeHtml(html: string): string {
  const tagStack: string[] = []
  const whiteList = getWhiteList()

  const sanitizer = new xss.FilterXSS({
    whiteList,
    onTag: (tag: string, _1: string, options: any): string | void => {
      return processTag(tagStack, tag, options)
    },
    onIgnoreTag: (tag: string, _1: string, options: any) => {
      throw new RicardianContractRenderError({
        tag, reason: `Disallowed tag "${tag}" found at position ${options.sourcePosition}`,
      })
    },
    onIgnoreTagAttr: (tag: string, name: string, _1: string, _2: boolean) => {
      throw new RicardianContractRenderError({
        tag, reason: `Disallowed attribute "${name}" found on tag "${tag}"`,
      })
    },
  })

  const sanitized = sanitizer.process(html)

  if (tagStack.length !== 0) {
    const tag = tagStack.pop() as string
    throw new RicardianContractRenderError({
      tag, reason: `Expected closing tag for "${tag}" not found`,
    })
  }

  return sanitized
}

function processTag(tagStack: string[], tag: string, options: any): void {
  if (!options.isWhite) {
    return
  }

  if (options.isClosing) {
    if (EmptyElements.includes(tag)) {
      throw new RicardianContractRenderError({
        tag, reason: `Unexpected closing tag for empty element "${tag}"`,
      })
    }

    const openTag = tagStack.pop()
    if (openTag == null) {
      throw new RicardianContractRenderError({
        tag, reason: `Unexpected closing tag "${tag}" with no open tag`,
      })
    } else if (tag !== openTag) {
      throw new RicardianContractRenderError({
        tag, reason: `Unexpected closing tag "${tag}"; expected closing tag for "${openTag}"`,
      })
    }
  } else if (!EmptyElements.includes(tag)) {
    tagStack.push(tag)
  }
}

function getWhiteList(): { [index: string]: string[] } {
  const processedWL: { [index: string]: string[] } = {}
  Object.keys(WhiteList).forEach((tag) => {
    if (tag !== '_commonattrs_') {
      processedWL[tag] = [...WhiteList[tag], ...WhiteList._commonattrs_]
    }
  })

  return processedWL
}
