import { ExtractionResult, IO, Prompt, PromptConfig, ValidationResult } from 'botpress/sdk'
import lang from 'common/lang'

import common from './common'

class PromptEnum implements Prompt {
  private _entity: string

  constructor({ entity }) {
    this._entity = entity
  }

  extraction(event: IO.IncomingEvent): ExtractionResult[] {
    const entities = event.nlu?.entities?.filter(x => x.type === `custom.list.${this._entity}`) ?? []
    return entities.map(entity => ({
      value: entity.data.value,
      confidence: entity.meta.confidence
    }))
  }

  validate(value): ValidationResult {
    if (value == undefined) {
      return { valid: false, message: lang.tr('module.builtin.prompt.invalid') }
    }

    return { valid: true }
  }
}

const config: PromptConfig = {
  type: 'enum',
  label: 'Enum',
  valueType: 'string',
  fields: [
    ...common.fields,
    {
      type: 'select',
      key: 'entity',
      dynamicOptions: {
        endpoint: 'BOT_API_PATH/mod/nlu/entities?ignoreSystem=true',
        valueField: 'id',
        labelField: 'name'
      },
      label: 'module.builtin.entity'
    },
    {
      type: 'checkbox',
      key: 'useDropdown',
      label: 'module.builtin.useDropdown'
    }
  ],
  advancedSettings: common.advancedSettings
}

export default { id: 'enum', config, prompt: PromptEnum }
