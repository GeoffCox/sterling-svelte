import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TreePlayground from '../../_playgrounds/tree/TreePlayground.svelte';

export const treeDoc: ComponentDoc = {
  name: 'Tree',
  description:
    'A hierarchy of items that can be expanded/collapsed and a single item can be selected',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the tree and its descendants are disabled.'
    },
    {
      name: 'selectedValue',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value of the currently selected item.'
    },
    {
      name: 'expandedValues',
      type: 'string[]',
      default: '[]',
      comment: 'The values of items that are expanded.'
    },
    commonProps.variant
  ],
  events: [
    {
      name: 'expandCollapse',
      comment: 'Raised when an item is expanded or collapsed',
      data: '{ expandedValues: string[] }'
    },
    {
      name: 'select',
      comment: 'Raised when an item is selected',
      data: '{ selectedValue: string }'
    }
  ],
  anatomy: `<div class="sterling-tree">
  <!-- children -->
  <slot {disabled} {expandedValues} {selectedValue} {variant} />
</div>`,
  usage: TreePlayground
};
