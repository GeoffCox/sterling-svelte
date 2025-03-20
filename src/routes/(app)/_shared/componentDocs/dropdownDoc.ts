import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import DropdownPlayground from '../../_playgrounds/dropdown/DropdownPlayground.svelte';

export const dropdownDoc: ComponentDoc = {
  name: 'Dropdown',
  description: 'A value and associated button to open/close a floating content box.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the dropdown is disabled and closed'
    },
    {
      name: 'icon',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The icon after the value. When undefined, displays a chevron.'
    },
    {
      name: 'onOpen',
      type: '(open: boolean | null | undefined) => void',
      default: 'undefined',
      comment: 'Called when the dropdown opens or closes'
    },
    {
      name: 'open',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the dropdown is open'
    },
    {
      name: 'stayOpenOnClickAway',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true and the user clicks away from the dropdown, it remains open'
    },
    {
      name: 'value',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'The value to display.'
    },
    {
      name: 'button',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'Deprecated. Use icon instead.'
    },
    {
      name: 'buttonIcon',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'Deprecated. Use icon instead.'
    }
  ],
  anatomy: `<div class="sterling-dropdown">
  <div class="value">
    {@render value()}>
  </div>
  <div class="icon">
    {@render icon()}
  </div>
  <Popover>
    <div class="sterling-dropdown-content">
      {@render children()}
    </div>
  </Popover>
</div>`,
  usage: DropdownPlayground
};
