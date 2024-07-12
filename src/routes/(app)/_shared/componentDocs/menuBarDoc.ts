import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuBarPlayground from '../../_playgrounds/menubar/MenuBarPlayground.svelte';

export const menuBarDoc: ComponentDoc = {
  name: 'MenuBar',
  description: 'A horizontal list of menus, often positioned at the top of a window',
  comments: [
    'Prefer using the Label component rather than the label produced by providing default slot content.',
    makeExtendsComment('HTMLAnchorElement')
  ],
  props: [commonProps.variant],
  events: [
    {
      name: 'close',
      comment: 'Raised when a descendant menu is closed',
      data: 'value'
    },
    {
      name: 'open',
      comment: 'Raised when a descendant menu is opened',
      data: 'value'
    },
    {
      name: 'selected',
      comment: 'Raised when descendant menu item is selected',
      data: 'value'
    }
  ],
  anatomy: `<div class="sterling-menu-bar">
  <slot {variant} />
</div>`,
  usage: MenuBarPlayground
};
