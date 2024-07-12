import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TabListPlayground from '../../_playgrounds/tablist/TabListPlayground.svelte';

export const tabListDoc: ComponentDoc = {
  name: 'TabList',
  description: 'A list of interactive tabs to show one of a set of associate content',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the tab list and its tabs are disabled'
    },
    {
      name: 'selectedValue',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value of the currently selected tab'
    },
    {
      name: 'vertical',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the tab list is displayed vertically'
    },
    commonProps.variant
  ],
  events: [
    {
      name: 'select',
      comment: 'Raised when a tab is selected',
      data: 'value'
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
  <!-- children -->
  <slot {disabled} {selectedValue} {variant} {vertical} />
</div>`,
  usage: TabListPlayground
};
