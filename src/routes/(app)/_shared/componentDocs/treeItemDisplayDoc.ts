import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TreeItemDisplayPlayground from '../../_playgrounds/treeitemdisplay/TreeItemDisplayPlayground.svelte';

export const treeItemDisplayDoc: ComponentDoc = {
  name: 'TreeItemDisplay',
  description: 'The default content for a <TreeItem>',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'depth',
      type: 'number',
      default: '0',
      comment: 'The depth of the item in the tree.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the item is disabled.'
    },
    {
      name: 'expanded',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the item is expanded.'
    },
    {
      name: 'hasChildren',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the item has children.'
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the item is selected.'
    },
    {
      name: 'value',
      type: 'string',
      comment: 'The value uniquely identifying this item within the tree.'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-tree-item-display">
  <TreeChevron {expanded} {hasChildren} {variant} />
  <slot {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant} />
</div>`,
  usage: TreeItemDisplayPlayground
};
