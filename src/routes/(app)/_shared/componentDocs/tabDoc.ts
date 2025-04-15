import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import TabPlayground from '../../_playgrounds/tab/TabPlayground.svelte';

export const tabDoc: ComponentDoc = {
  name: 'Tab',
  description: 'An item in a tab list that, when selected, typically shows associated content.',
  comments: [makeExtendsComment('HTMLButtonElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the tab is disabled.'
    },
    {
      name: 'selected',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the tab is selected.'
    },
    {
      name: 'value',
      type: 'string',
      comment: 'The value uniquely identifying this tab within the tab list.'
    }
  ],
  anatomy: `<button class="sterling-tab">
  <div class="content">
    {@render children()}
  </div>
  <div class="indicator"></div>
</button>`,
  usage: TabPlayground
};
