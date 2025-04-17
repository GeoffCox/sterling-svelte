import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import AutocompletePlayground from '../../_playgrounds/autocomplete/AutocompletePlayground.svelte';

export const autocompleteDoc: ComponentDoc = {
  name: 'Autocomplete',
  description: 'An Input providing a popover list of suggestions as the user types.',
  comments: [
    'HTMLInputElement props are forwarded to the Input component.',
    makeExtendsComment('HTMLInputElement')
  ],
  props: [
    {
      name: 'values',
      type: 'string[] | undefined',
      default: '[]',
      comment: 'The list of value sugestions to display.'
    },
    {
      name: 'item',
      type: 'Snippet<[string]> | undefined',
      default: 'undefined',
      comment: 'The item template to use for each value suggestion.'
    },
    {
      name: 'filter',
      type: '(values: string[], text: string) => string[] | undefined',
      default: 'undefined',
      comment: `The filter function to override which values are displayed as the user types.
The default filter is a case-insensitive substring match.`
    }
  ],
  anatomy: `<div class="sterling-autocomplete">
  <Input />
  <Popover>
    <div class="sterling-autocomplete-content">
      <List class="composed">
        <!-- <ListItem> ... -->
      </List>
    </div>
  </Popover>
</div>
`,
  usage: AutocompletePlayground
};
