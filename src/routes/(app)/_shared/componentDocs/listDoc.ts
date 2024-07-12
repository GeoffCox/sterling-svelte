import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import ListPlayground from '../../_playgrounds/list/ListPlayground.svelte';

export const listDoc: ComponentDoc = {
  name: 'List',
  description: 'An interactive, scrollable set of items where a single item can be selected',
  comments: [
    'Use the default slot to provide list items.',
    'A list item is identified by having data-value and role="listitem" properties. Any content without these properties, will not participate in selection. This allows you to mix in other content with list items such as search boxes, group headers, or decorations.',
    'If no item is selected, selectNextItem selects the first item in the list and selectPreviousItem selects the last item in the list.',
    makeExtendsComment('HTMLAnchorElement')
  ],
  props: [
    {
      name: 'disabled',
      type: 'string',
      default: 'false',
      comment: 'When true, the list and all its items are disabled'
    },
    {
      name: 'horizontal',
      type: 'string',
      default: 'false',
      comment: 'When true, items are arranged horizontally'
    },
    {
      name: 'selectedValue',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value of the currently selected item'
    },
    {
      name: 'variant',
      type: 'string',
      default: "''",
      comment: 'Additional class names to apply'
    },
    commonProps.variant
  ],
  events: [
    {
      name: 'select',
      comment: 'Raised when the selectedValue changes',
      data: 'value'
    }
  ],
  methods: [
    {
      name: 'scrollToItem',
      comment: 'Scrolls to the item with the given value'
    },
    {
      name: 'selectItem',
      comment: 'Selects the item with the given value'
    },
    {
      name: 'selectNextItem',
      comment: 'Selects the item after the selected item'
    },
    {
      name: 'selectPreviousItem',
      comment: 'Selects the item before the selected item'
    },
    {
      name: 'selectFirstItem',
      comment: 'Selects the first item in the list'
    },
    {
      name: 'selectLastItem',
      comment: 'Selects the last item in the list'
    }
  ],
  anatomy: `<div class="sterling-list">
  <slot {disabled} {horizontal} {selectedValue} {variant} />
</div>`,
  usage: ListPlayground
};
