import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import Autocomplete2Playground from '../../_playgrounds/autocomplete2/Autocomplete2Playground.svelte';

export const autocomplete2Doc: ComponentDoc = {
  name: 'Autocomplete2',
  description: 'An Input providing a popover list of suggestions as the user types.',
  comments: [
    'Autocomplete2 uses Popover2.',
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
  anatomy: `<div class="sterling-autocomplete-2">
  <Input />
  <Popover>
    <div class="sterling-autocomplete-2-content">
      <List class="composed">
        <!-- <ListItem> ... -->
      </List>
    </div>
  </Popover>
</div>
`,
  usage: Autocomplete2Playground
};
