import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import SelectPlayground from '../../_playgrounds/select/SelectPlayground.svelte';

export const selectDoc: ComponentDoc = {
  name: 'Select',
  description: 'A value and a button to open/close a list of choices and select a single value',
  comments: [
    'Due to lack of styling capabilities with <select>, the Select component does not use <select>',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      comment: "When true, the select's dropdown is open."
    },
    {
      name: 'selectedValue',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The value of the selected item.'
    },
    commonProps.variant,
    {
      name: 'listVariant',
      type: 'string',
      default: "''",
      comment: 'Additional class names to apply to the List'
    }
  ],
  events: [
    {
      name: 'pending',
      data: '{ value: string }',
      comment: 'Raised when a value is selected but not yet committed'
    },
    {
      name: 'select',
      data: '{ value: string }',
      comment: 'Raised when a value is selected'
    }
  ],
  methods: [
    {
      name: 'scrollToSelectedItem',
      comment: 'Scrolls to the selected item'
    }
  ],
  anatomy: `<div class="sterling-select">
  <div class="value">
    <slot name="value" {disabled} {open} {selectedValue} {variant}>
      {selectedValue}
    </slot>
  </div>
  <div class="button">
    <slot name="button" {disabled} {open} {selectedValue} {variant}>
      <slot name="icon" {disabled} {open} {selectedValue} {variant}>
        <div class="chevron" />
      </slot>
    </slot>
  </div>
  <Popover>
    <div class="sterling-select-popup-content">
      <List>
        <!-- Items to display in the dropdown -->
        <slot {variant} {listVariant} />
      </List>
    </div>
  </Popover>
</div>`,
  usage: SelectPlayground
};
