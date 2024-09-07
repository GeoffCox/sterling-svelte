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
      comment: 'If true, clicking the label invokes a click on the content.'
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
  anatomy: `<label class="sterling-label">
  <slot name="text" {disabled} {for} {forwardClick} {required} {text} {variant}>
    <div class="text">{text}</div>
  </slot>
  <div class="content">
    <slot />
  </div>
  <slot name="message" {disabled} {message} {required} {status} {variant}>
    <div class="message">{message}</div>
  </slot>
  <slot name="required" {requiredReason} {variant}>
    <Tooltip>
      <span class="required-reason" slot="tip">{requiredReason}</span>
      <div class="required">*</div>
    </Tooltip>
  </slot>
</label>`,
  usage: LabelPlayground
};
