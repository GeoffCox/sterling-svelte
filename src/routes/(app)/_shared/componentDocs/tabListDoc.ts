import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import TabListPlayground from '../../_playgrounds/tablist/TabListPlayground.svelte';

export const tabListDoc: ComponentDoc = {
  name: 'TabList',
  description: 'A list of tabs where a single tab can be selected.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the tab list and its tabs are disabled.'
    },
    {
      name: 'selectedValue',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value of the currently selected tab.'
    },
    {
      name: 'vertical',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the tab list is displayed vertically.'
    },
    {
      name: 'onSelect',
      type: '(value: string) => void',
      default: 'undefined',
      comment: 'Called when the selectedValue changes.'
    }
  ],
  methods: [
    {
      name: 'selectFirstTab',
      comment: 'Selects the first tab.'
    },
    {
      name: 'selectPreviousTab',
      comment: 'Selects the previous tab.'
    },
    {
      name: 'selectNextTab',
      comment: 'Selects the next tab.'
    },
    {
      name: 'selectLastTab',
      comment: 'Selects the last tab.'
    }
  ],
  anatomy: `<div class="sterling-tab-list">
  {@render children()}
</div>`,
  usage: TabListPlayground
};
