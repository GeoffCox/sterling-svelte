import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TreeChevronPlayground from '../../_playgrounds/treechevron/TreeChevronPlayground.svelte';

export const treeChevronDoc: ComponentDoc = {
  name: 'TreeChevron',
  description: 'An indicator of leaf and expanded/collapsed items within a hierarchy',
  comments: [
    'Provides selection, expand/collapse, and interaction within a Tree',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'expanded',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the chevron indicates the item is expanded.'
    },
    {
      name: 'hasChildren',
      type: 'boolean',
      default: 'false',
      comment: 'When false, the chevron indicates the item is a leaf.'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-tree-chevron"/>`,
  usage: TreeChevronPlayground
};
