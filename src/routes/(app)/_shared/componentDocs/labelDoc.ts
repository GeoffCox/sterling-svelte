import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import LabelPlayground from '../../_playgrounds/label/LabelPlayground.svelte';

export const labelDoc: ComponentDoc = {
  name: 'Label',
  description: 'A <label>: a caption for another element',
  comments: [
    'An optional message and status can provide information to the user about their value.',
    'The required property and requiredReason indicate the user must fill in a value and why.',
    makeExtendsComment('HTMLLabelElement')
  ],
  props: [
    {
      name: 'forwardClick',
      type: 'string',
      default: 'false',
      comment:
        'If true, clicking the label invokes a click on the content. Typically used when for/id pairs are not present.'
    },
    {
      name: 'message',
      type: 'string | Snippet',
      default: "''",
      comment: 'The status message to display.'
    },
    {
      name: 'required',
      type: 'string',
      default: 'false',
      comment: 'When true, the label will indicate a value is required.'
    },
    {
      name: 'requiredIndicator',
      type: 'string | Snippet',
      default: "''",
      comment: `The indicator to display when required. Defaults to '*'`
    },
    {
      name: 'requiredReason',
      type: 'string | Snippet',
      default: "''",
      comment: 'The reason a value is required.'
    },
    {
      name: 'text',
      type: 'string | Snippet',
      default: "''",
      comment: 'The text to display in the label. Not used if the text slot is filled.'
    }
  ],
  anatomy: `label (<label>)
  text (string | Snippet)
  content (<div>)
    children (Snippet)
  message (string | Snippet)
  tooltip (<Tooltip>)
    required (<div>)
      requiredIndicator (string | Snippet)
    tip (ToolTip.tip)
      requiredReason (string | Snippet)
`,
  usage: LabelPlayground
};
