import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import * as helpers from './helpers'

import isUrl from 'is-url'

export function validateTitle(title?: string | null) {
  const maxLen = 50
  if (!title || !title.trim()) {
    throw new RicardianContractRenderError('Missing Required Field: title')
  } else if (title.length > maxLen) {
    throw new RicardianContractRenderError(`Title must be no more than ${maxLen} characters`)
  } else if (helpers.hasVariable(title)) {
    throw new RicardianContractRenderError('Title must not contain variables')
  }
}

export function validateSummary(summary?: string | null) {
  const maxLen = 116
  if (!summary || !summary.trim()) {
    throw new RicardianContractRenderError('Missing Required Field: summary')
  } else {
    // Don't want to count HTML tags wrapping any vars as part of the len
    const stripped = summary.replace(/<.+?>/g, '')
    if (stripped.length > maxLen) {
      throw new RicardianContractRenderError(`Summary must be no more than ${maxLen} characters`)
    }
  }
}

export function validateIcon(icon?: string | null) {
  if (!icon || !icon.trim()) {
    throw new RicardianContractRenderError('Missing Required Field: icon')
  } else if (helpers.hasVariable(icon)) {
    throw new RicardianContractRenderError('Icon must not contain variables')
  } else if (!isUrl(icon)) {
    throw new RicardianContractRenderError('Icon must be a valid URL')
  } else {
    const sha256Match = /#[A-Fa-f0-9]{64}$/
    if (!icon.match(sha256Match)) {
      throw new RicardianContractRenderError('Icon URL must end with a SHA256 hash')
    }
  }
}
