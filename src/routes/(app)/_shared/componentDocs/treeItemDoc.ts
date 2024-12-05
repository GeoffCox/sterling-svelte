import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TreeItemPlayground from '../../_playgrounds/treeitem/TreeItemPlayground.svelte';

export const treeItemDoc: ComponentDoc = {
  name: 'TreeItem',
  description: 'An item within a <Tree>',
  comments: [
    'A tree item is identified by having data-value and role="treeitem" properties',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the item and its children are disabled.'
    },
    {
      name: 'icon',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The leaf or expand/collapse icon. When undefined renders <TreeChevron>.'
    },
    {
      name: 'label',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'The label for the item. When undefined renders the value.'
    },
    {
      name: 'value',
      type: 'string',
      comment: 'The value uniquely identifying this item within the tree.'
    }
  ],
  methods: [
    {
      name: 'collapse',
      comment: 'Collapses the current item.'
    },
    {
      name: 'expand',
      comment: 'Expands the current item.'
    },
    {
      name: 'select',
      comment: 'Selects the current item.'
    },
    {
      name: 'selectParent',
      comment: 'Selects the parent of the current item.'
    },
    {
      name: 'selectPrevious',
      comment: 'Selects the previous item relative to the current item.'
    },
    {
      name: 'selectNext',
      comment: 'Selects the next item relative to the current item.'
    },
    {
      name: 'toggleExpanded',
      comment: 'Toggles the expanded state of the current item.'
    }
  ],
  anatomy: `tree-item (div)
  item (div)
    icon (Snippet)
    label (string or Snippet)
  children (Snippet)`,
  usage: TreeItemPlayground
};
