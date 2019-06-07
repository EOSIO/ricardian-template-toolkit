import * as Handlebars from 'handlebars'
import { ifHasValue } from './helpers'

import { RicardianContractProcessorImpl as RCP_0_1 } from '../v0.1/RicardianContractProcessorImpl'

const implVersion = {
  major: 0,
  minor: 2,
}

export class RicardianContractProcessorImpl extends RCP_0_1 {

  constructor() {
    super()

    this.registerHelper('to_json', (obj: string) => {
      return new Handlebars.SafeString('```\n' + JSON.stringify(obj, null, 2) + '\n```')
    })

    this.registerHelper('if_has_value', ifHasValue )
  }

  public getSpecVersion() {
    return implVersion
  }
}
