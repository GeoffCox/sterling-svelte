import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import ListItemPlayground from '../../_playgrounds/listitem/ListItemPlayground.svelte';

export const listItemDoc: ComponentDoc = {
  name: 'ListItem',
  description: 'An item within a list.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the item is disabled.'
    },
    {
      name: 'value',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value uniquely identifying this item within the list.'
    }
  ],
  anatomy: `list item (<div)
  children (Snippet)`,
  usage: ListItemPlayground
};
