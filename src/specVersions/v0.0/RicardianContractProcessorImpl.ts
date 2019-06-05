import * as Handlebars from 'handlebars'
import he from 'he'
import Remarkable from 'remarkable'
import { MAX_PASSES } from '../../config'
import {
  Abi, ContractMetadata,
  RicardianClause, RicardianContract, RicardianContractConfig, RicardianContractProcessor,
  Transaction, TransactionAction,
} from '../../interfaces'
import { RicardianContractRenderError } from '../../RicardianContractRenderError'
import {
  extractSymbolCode, hasVariable, indexTransaction,
  sanitizeHtml, tagMetadataVariables, tagTemplateVariables,
} from './helpers'
import { RicardianContext } from './RicardianContext'
import { validateIcon, validateSummary, validateTitle } from './validators'

import * as utils from '../../utils/contractUtils'
import { getContractSpecVersion } from '../../utils/contractUtils'

const implVersion = {
  major: 0,
  minor: 0,
}

/**
 * Processes a Ricardian contract, interpolating transaction variables and clauses, and
 * extracting metadata and html.
 */
export class RicardianContractProcessorImpl implements RicardianContractProcessor {
  // private transaction: any
  private allowUnusedVariables = false
  private disableMetadataValidation = false

  private wrappedHelpers: string[] = ['lookup']

  /**
   * Constructs the RicardianContractProcessorImpl.
   */
  constructor() {
    Handlebars.registerHelper('wrap', function(options: any): string {
      return `<div class="variable ${options.hash.class}">`
        // @ts-ignore
        + options.fn(this)
        + '</div>'
    })

    this.registerWrappedHelper('symbol_to_symbol_code', (symbol: string) => {
      return new Handlebars.SafeString(extractSymbolCode(symbol))
    })

    this.registerWrappedHelper('asset_to_symbol_code', (asset: string) => {
      return new Handlebars.SafeString(extractSymbolCode(asset))
    })

    Handlebars.registerHelper('nowrap', (text: string) => {
      return new Handlebars.SafeString(text)
    })
  }

  // Register a helper whose output should be wrapped as a variable
  protected registerWrappedHelper(name: string, fn: Handlebars.HelperDelegate) {
    Handlebars.registerHelper(name, fn)
    this.wrappedHelpers.push(name)
  }

  protected registerHelper(name: string, fn: Handlebars.HelperDelegate) {
    Handlebars.registerHelper(name, fn)
  }

  public getSpecVersion() {
    return implVersion
  }

  /**
   * Process the RicardianContractConfig and return a RicardianContract.
   *
   * @param config A `RicardianContractConfig` object
   */
  public process(config: RicardianContractConfig): RicardianContract {
    const version = getContractSpecVersion(config)
    const specVersion = this.getSpecVersion()

    if (version.major === specVersion.major && version.minor <= specVersion.minor) {
      return this.processContract(config)
    } else {
      throw new RicardianContractRenderError(`Unexpected version encountered. ` +
        `Found ${version}`)
    }
  }

  protected processContract(config: RicardianContractConfig): RicardianContract {
    this.allowUnusedVariables = !!config.allowUnusedVariables
    this.disableMetadataValidation = !!config.allowUnusedVariables

    const maxPasses = config.maxPasses || MAX_PASSES

    const action = utils.getTransactionAction(config.transaction, config.actionIndex)
    const rawTemplate = utils.getContractTextFromAbi(config.abi, action)
    const context = this.createContext(config.abi, config.transaction, action)
    const { metadata, interpolatedRicardian } = this.interpolateContract(rawTemplate, context, maxPasses)
    if (!metadata.spec_version) {
      metadata.spec_version = '0.0.0'
    }
    const html = this.convertToHtml(interpolatedRicardian)

    return {
      getMetadata: () => metadata,
      getHtml: () => html
    }
  }

  /**
   * Parses a transaction and returns an object with formatted transaction data
   *
   * @return An RicardianContext with formatted transaction data
   */
  private createContext(abi: Abi, transaction: Transaction, action: TransactionAction): RicardianContext {
    const indexedTransaction: any = indexTransaction(transaction)
    const ricardianClauses = abi.ricardian_clauses
    return {
      ...action.data,
      $transaction: indexedTransaction,
      $action: action,
      $clauses: ricardianClauses.reduce(
        (clauses: any, current: RicardianClause): any => ({
          ...clauses,
          [current.id]: current.body,
        }
        ), {},
      ),
    } as RicardianContext
  }

  /**
   * Interpolate variables referenced in the contract metadata and body.
   *
   * @param context The RicardianContext contain the source data for interpolation
   * @param maxPasses The number of variable interpolation passes to make. Defaults to config.MAX_PASSES
   *
   * @return An object with parsed ContractMetadata and interpolated body
   */
  private interpolateContract(rawTemplate: string, context: RicardianContext, maxPasses: number):
          { metadata: ContractMetadata, interpolatedRicardian: string } {
    const { metadata: rawMetadata, content: rawContent } = utils.getMetadataAndContent(rawTemplate)
    return {
      metadata: this.interpolateMetadata(rawMetadata, context, maxPasses),
      interpolatedRicardian: this.interpolateRicardian(rawContent, context, maxPasses),
    }
  }

  /**
   * Interpolate the variables referenced in contractContent, making the specified number
   * of passes.
   * @param contractContent String containing the contract body
   * @param context The RicardianContext contain the source data for interpolation
   * @param maxPasses Maximum number of interpolation passes to make
   *
   * @return String containing the interpolated content
   */
  private interpolateRicardian(contractContent: string, context: RicardianContext, maxPasses: number): string {
    let interpolatedRicardian: string = contractContent
    let passes: number = 0
    const allowUnusedVariables = this.allowUnusedVariables
    do {
      try {
        interpolatedRicardian = tagTemplateVariables(this.wrappedHelpers, interpolatedRicardian)
        const handlebarsTemplate: Handlebars.Template = Handlebars.compile(
          interpolatedRicardian,
          { strict: !allowUnusedVariables },
        )
        interpolatedRicardian = handlebarsTemplate(context)
      } catch (e) {
        throw new RicardianContractRenderError(`Handlebars error: ${e.message}`)
      }

      passes++
    } while (passes < maxPasses && hasVariable(interpolatedRicardian))

    if (!this.allowUnusedVariables && passes === maxPasses && hasVariable(interpolatedRicardian)) {
      throw new RicardianContractRenderError(
        'Contract has uninterpolated variables after maximum number of variable interpolation passes.')
    }

    return interpolatedRicardian
  }

  /**
   * Interpolate the variables referenced in the given ContractMetadata, performing maxPasses
   * of intererpolation.
   * Note that the "title" and "icon" metadata fields are NOT subject to interpolation and are
   * returned as-is.
   *
   * @param metadata The ContractMetadata to interpolate
   * @param context The RicardianContext contain the source data for interpolation
   * @param maxPasses Maximum number of interpolation passes to make
   *
   * @return A new ContractMetadata containing the interpolated fields
   */
  private interpolateMetadata(metadata: ContractMetadata, context: RicardianContext,
                              maxPasses: number): ContractMetadata {
    const { title, icon, ...metadataTemplate } = metadata
    let interpolatedMetadata: { [index: string]: string } = metadataTemplate
    let passes: number = 0
    const allowUnusedVariables = this.allowUnusedVariables
    let hasUninterpolatedVars = false

    if (!this.disableMetadataValidation) {
      validateTitle(title)
      validateIcon(icon)
    }

    do {
      try {
        hasUninterpolatedVars = false
        interpolatedMetadata = tagMetadataVariables(this.wrappedHelpers, interpolatedMetadata)

        Object.keys(interpolatedMetadata)
          .forEach((key) => {
            const value = interpolatedMetadata[key]
            if (!!value) {
              const hbMetaTplt: Handlebars.Template = Handlebars.compile(value, { strict: !allowUnusedVariables })
              interpolatedMetadata[key] = hbMetaTplt(context)
              hasUninterpolatedVars = hasUninterpolatedVars || hasVariable(interpolatedMetadata[key])
            }
          })
      } catch (e) {
        throw new RicardianContractRenderError(`Handlebars error: ${e.message}`)
      }

      passes++
    } while (passes < maxPasses && hasUninterpolatedVars)

    if (!this.allowUnusedVariables && passes === maxPasses && hasUninterpolatedVars) {
      throw new RicardianContractRenderError(
        'Contract has uninterpolated metadata variables after maximum number of variable interpolation passes.')
    }

    // Summary may have variables, so validating post-interpolation
    if (!this.disableMetadataValidation) {
      validateSummary(interpolatedMetadata.summary)
    }

    return { title, icon, ...interpolatedMetadata } as ContractMetadata
  }

  /**
   * Given a Github flavored markdown formatted string, generate HTML.
   * Also replaces [variable] tags with <div>s.
   *
   * @param content Markdown formatted string
   *
   * @return The generated HTML
   */
  private convertToHtml(content: string): string {
    const md = new Remarkable('commonmark', {
      breaks: true,
      html: false,
    })

    let html = md.render(content)

    // Remove the somewhat funky <p> tags Remarkable adds since they
    // can break the <div> wrappings if the wrapped var contained newlines.
    html = html.replace(/<p>/g, '')
    html = html.replace(/<\/p>/g, '<br />')

    html = he.decode(html)

    html = sanitizeHtml(html)

    return html
  }
}

export default RicardianContract
