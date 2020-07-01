import { FormDefinition } from 'botpress/sdk'

const common: FormDefinition = {
  fields: [
    {
      type: 'text',
      key: 'output',
      label: 'module.builtin.setValueTo',
      valueManipulation: {
        regex: '[^a-z0-9-_.]',
        modifier: 'gi',
        replaceChar: '_'
      }
    },
    {
      type: 'text',
      key: 'question',
      translated: true,
      label: 'message'
    },
    {
      type: 'text',
      key: 'confirm',
      translated: true,
      label: 'confirmation'
    }
  ],
  advancedSettings: [
    {
      type: 'number',
      key: 'duration',
      defaultValue: 5,
      moreInfo: {
        label: 'The number of turns (exchange between bot and user) before the prompt is cancelled automatically'
      },
      label: 'module.builtin.duration'
    },
    {
      type: 'number',
      key: 'searchBackCount',
      defaultValue: 0,
      moreInfo: { label: 'The number of previous events to analyze to try extracting the information' },
      label: 'module.builtin.searchBackCount'
    },
    {
      type: 'checkbox',
      key: 'confirmBeforeCancel',
      moreInfo: { label: 'Ask a confirmation to the user before cancelling or moving to another flow' },
      label: 'module.builtin.confirmBeforeCancel'
    }
  ]
}

export default common
