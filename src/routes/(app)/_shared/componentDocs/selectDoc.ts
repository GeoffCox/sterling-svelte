import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import SelectPlayground from '../../_playgrounds/select/SelectPlayground.svelte';

export const selectDoc: ComponentDoc = {
  name: 'Select',
  description: 'A value and a button to open/close a list of choices.',
  comments: [
    'Due to lack of styling capabilities with <select>, the Select component does not use <select>',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: "When true, the select's button is disabled and list is closed."
    },
    {
      name: 'icon',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The snippet to render the icon. Defaults to a chevron.'
    },
    {
      name: 'listClass',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'Additional class names to apply to the list.'
    },
    {
      name: 'onPending',
      type: '(value: string) => void',
      default: 'undefined',
      comment: 'Called when a value is selected in the list but not yet committed.'
    },
    {
      name: 'onSelect',
      type: '(value: string) => void',
      default: 'undefined',
      comment: 'Called when a value is selected.'
    },
    {
      name: 'open',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: "When true, the select's dropdown is open."
    },
    {
      name: 'selectedValue',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value of the selected item.'
    },
    {
      name: 'value',
      type: 'Snippet<[string | undefined]> | string | undefined',
      default: 'undefined',
      comment:
        'The string or snippet to display the value. The snippet is passed the selected value. If undefined, the selectedValue is displayed.'
    },
    {
      name: 'buttonSnippet',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'Deprecated. Use icon instead.'
    },
    {
      name: 'valueSnippet',
      type: 'Snippet<[string | undefined]> | undefined',
      default: 'undefined',
      comment: 'Deprecated. Use value instead.'
    }
  ],
  methods: [
    {
      name: 'scrollToSelectedItem',
      comment: 'Scrolls to the selected item.'
    }
  ],
  anatomy: `<div class="sterling-select">
  <div class="value">
    {@render value()}
  </div>
  <div class="icon">
    {@render icon()}
  </div>
  <Popover>
    <div class="sterling-select-popup-content">
      <List>
        {@render children()}
      </List>
    </div>
  </Popover>
</div>`,
  usage: SelectPlayground
};
