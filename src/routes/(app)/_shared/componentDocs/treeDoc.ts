import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import TreePlayground from '../../_playgrounds/tree/TreePlayground.svelte';

export const treeDoc: ComponentDoc = {
  name: 'Tree',
  description:
    'A hierarchy of items that can be expanded/collapsed and where a single item can be selected.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
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
      type: 'string[] | undefined',
      default: '[ ]',
      comment: 'The values of items that are expanded.'
    },
    {
      name: 'onExpandCollapse',
      type: '(expandedValues: string) => null',
      default: 'undefined',
      comment: 'Called when any item in the hierarchy is expanded or collapsed.'
    },
    {
      name: 'onSelect',
      type: '(selectedValue: string) => null',
      default: 'undefined',
      comment: 'Called when any item in the hierarchy is selected.'
    }
  ],
  anatomy: `<div class="sterling-tree">
  <div class="container">
    {@render children()}
  </div>
</div>`,
  usage: TreePlayground
};
