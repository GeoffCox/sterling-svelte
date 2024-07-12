import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import DropdownPlayground from '../../_playgrounds/dropdown/DropdownPlayground.svelte';

export const dropdownDoc: ComponentDoc = {
  name: 'Dropdown',
  description: 'A value and a <button> to open/close a floating content box',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'string',
      default: 'false',
      comment: 'When true, the dropdown is disabled and closed'
    },
    {
      name: 'open',
      type: 'string',
      default: 'false',
      comment: 'When true, the dropdown is open'
    },
    {
      name: 'stayOpenOnClickAway',
      type: 'string',
      default: 'false',
      comment: 'When true and the user clicks away from the dropdown, it remains open'
    },
    {
      name: 'variant',
      type: 'string',
      default: "''",
      comment: 'Additional class names to apply'
    }
  ],
  events: [
    {
      name: 'open',
      data: '{open: boolean}',
      comment: 'Raised when the dropdown opens or closes'
    }
  ],
  anatomy: `<div class="sterling-dropdown">
  <div class="value">
    <slot name="value" {disabled} {open} {variant} />
  </div>
  <slot name="button" {disabled} {open} {variant}>
    <div class="button">
      <slot name="icon" {disabled} {open} {variant}>
        <div class="chevron" />
      </slot>
    </div>
  </slot>
  <Popover>
    <div class="sterling-dropdown-popup-content">
      <slot {disabled} {open} {variant} />
    </div>
  </Popover>
</div>`,
  usage: DropdownPlayground
};
