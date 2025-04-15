import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import TreeChevronPlayground from '../../_playgrounds/treechevron/TreeChevronPlayground.svelte';

export const treeChevronDoc: ComponentDoc = {
  name: 'TreeChevron',
  description: 'An indicator for a leaf or expanded/collapsed item within a tree hierarchy.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'expanded',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true and hasChildren is true, indicates the item is expanded.'
    },
    {
      name: 'hasChildren',
      type: 'boolean | null | undefined',
      default: 'false',
      comment:
        'When true, indicates the item can be expanded. Otherwise, indicates the item is a leaf.'
    }
  ],
  anatomy: `<div class="sterling-tree-chevron"></div>`,
  usage: TreeChevronPlayground
};
