import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import DropdownPlayground from '../../_playgrounds/dropdown2/Dropdown2Playground.svelte';

export const dropdown2Doc: ComponentDoc = {
  name: 'Dropdown2',
  description: 'A value and associated button to open/close a floating content box.',
  comments: ['Dropdown2 uses Popover2.', makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'allowFlip',
      type: 'Popover2FlipAxis | undefined',
      default: 'undefined',
      comment:
        'Which axis/axes allow the dropdown content to flip to the other side when there is not enough space.'
    },
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the dropdown is disabled and closed'
    },
    {
      name: 'lightDismiss',
      type: 'boolean | null | undefined',
      default: 'true',
      comment:
        'When true, the dropdown content closes when another element is clicked or focused. Also closes when another dropdown opens.'
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
      bindable: true,
      default: 'false',
      comment: 'When true, the dropdown is open'
    },
    {
      name: 'value',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'The value to display.'
    }
  ],
  anatomy: `<div class="sterling-dropdown-2">
  <div class="value">
    {@render value()}>
  </div>
  <div class="icon">
    {@render icon()}
  </div>
</div>
<Popover2>
  <div class="sterling-dropdown-2-content">
    {@render children()}
  </div>
</Popover>`,
  usage: DropdownPlayground
};
