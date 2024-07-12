import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TreeItemPlayground from '../../_playgrounds/treeitem/TreeItemPlayground.svelte';

export const treeItemDoc: ComponentDoc = {
  name: 'TreeItem',
  description: 'An item within a <Tree>',
  comments: [
    'By default, renders a TreeItemDisplay',
    'A tree item is identified by having data-value and role="treeitem" properties',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the item is disabled.'
    },
    {
      name: 'text',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The text for the item. Not used when either the item or label slots are filled.'
    },
    {
      name: 'value',
      type: 'string',
      default: 'undefined', // Since `value` does not have a default in the code, it's technically required. Marking as "undefined" for consistency in structure.
      comment: 'The value uniquely identifying this item within the tree.'
    },
    commonProps.variant
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
  anatomy: `<div class="sterling-tree-item">
  <div class="item">
    <slot name="item" {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant}>
      <TreeItemDisplay>
        <slot name="label" {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant}
          >{text || value}
        </slot>
      </TreeItemDisplay>
    </slot>
  </div>
  <div class="children">
    <slot {depth} {disabled} {selected} {value} {variant} />
  </div>
</div>`,
  usage: TreeItemPlayground
};
