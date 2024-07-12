import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import ListItemPlayground from '../../_playgrounds/listitem/ListItemPlayground.svelte';

export const listItemDoc: ComponentDoc = {
  name: 'ListItem',
  description: 'An item within a <List>',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'string',
      default: 'false',
      comment: 'When true, the item is disabled'
    },
    {
      name: 'value',
      type: 'string',
      default: "''",
      comment: 'The value uniquely identifying this item within the list'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-list-item">
  <slot {disabled} {horizontal} {selected} {value} {variant}>{value}</slot>
</div>`,
  usage: ListItemPlayground
};
