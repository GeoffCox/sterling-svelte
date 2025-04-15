import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import LabelPlayground from '../../_playgrounds/label/LabelPlayground.svelte';

export const labelDoc: ComponentDoc = {
  name: 'Label',
  description: 'A caption naming or describing a form element.',
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
      comment: 'The text to display in the label.'
    }
  ],
  anatomy: `<label class="sterling-label">
  <div class="text">
    {@render text()}
  </div>
  <div class="content">
    {@render children()}
  </div>
  <div class="message">
    {@render message()}
  </div>
  <Tooltip>
    <div class="required">
      {@render requiredIndicator()}
    </div>
    {#snippet tip()}
      {@render requiredReason()}
    {/snippet}
  </ToolTip>
</label>`,
  usage: LabelPlayground
};
