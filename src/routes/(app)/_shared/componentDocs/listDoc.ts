import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import ListPlayground from '../../_playgrounds/list/ListPlayground.svelte';

export const listDoc: ComponentDoc = {
  name: 'List',
  description: 'An scrollable set of items where a single item can be selected.',
  comments: [
    'Use the children to provide list items.',
    'A list item is identified by having data-value and role="listitem" properties. Any content without these properties, will not participate in selection. This allows you to mix in other content with list items such as search boxes, group headers, or decorations.',
    'If no item is selected, selectNextItem selects the first item in the list and selectPreviousItem selects the last item in the list.',
    'A container wraps the children to allow scrolling when the list dimensions are not set and take up available room.',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the list and all its items are disabled.'
    },
    {
      name: 'horizontal',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, items are arranged horizontally.'
    },
    {
      name: 'selectedValue',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value of the currently selected item.'
    },
    {
      name: 'onSelect',
      type: '(value: string | undefined) => void',
      comment: 'Called when the selectedValue changes.'
    }
  ],
  methods: [
    {
      name: 'scrollToItem',
      comment: 'Scrolls to the item with the given value.'
    },
    {
      name: 'selectItem',
      comment: 'Selects the item with the given value.'
    },
    {
      name: 'selectNextItem',
      comment: 'Selects the item after the selected item.'
    },
    {
      name: 'selectPreviousItem',
      comment: 'Selects the item before the selected item.'
    },
    {
      name: 'selectFirstItem',
      comment: 'Selects the first item in the list.'
    },
    {
      name: 'selectLastItem',
      comment: 'Selects the last item in the list.'
    }
  ],
  anatomy: `<div class="sterling-list">
  <div class="container">
    {@render children()}
  </div>
</div>`,
  usage: ListPlayground
};
