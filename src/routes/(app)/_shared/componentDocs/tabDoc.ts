import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TabPlayground from '../../_playgrounds/tab/TabPlayground.svelte';

export const tabDoc: ComponentDoc = {
  name: 'Tab',
  description:
    'A <button>: an interactive element in a tab list activated to show associated content',
  comments: [
    'When the parent TabList is disabled, the Tab is also disabled.',
    makeExtendsComment('HTMLButtonElement')
  ],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the tab is disabled'
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the tab is selected'
    },
    {
      name: 'text',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The text of the tab; not used when the default slot is filled'
    },
    {
      name: 'value',
      type: 'string',
      comment: 'The value uniquely identifying this tab within the tab list'
    },
    commonProps.variant
  ],
  anatomy: `<button class="sterling-tab">
  <slot {disabled} {selected} {text} {value} {variant}>
    <div class="text">{text || value}</div>
  </slot>
  <div class="indicator" />
</button>`,
  usage: TabPlayground
};
