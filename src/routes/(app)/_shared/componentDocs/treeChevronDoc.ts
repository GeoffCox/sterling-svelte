import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TreeChevronPlayground from '../../_playgrounds/treechevron/TreeChevronPlayground.svelte';

export const treeChevronDoc: ComponentDoc = {
  name: 'TreeChevron',
  description: 'An indicator of leaf or expanded/collapsed items within a hierarchy.',
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
  anatomy: `chevron (<div>)`,
  usage: TreeChevronPlayground
};
