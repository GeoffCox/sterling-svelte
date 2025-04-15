import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuBarPlayground from '../../_playgrounds/menubar/MenuBarPlayground.svelte';

export const menuBarDoc: ComponentDoc = {
  name: 'MenuBar',
  description: 'A horizontal list of menu items, often positioned at the top of a window.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'onClose',
      type: '(value: string) => void',
      comment: 'Raised when a descendant menu is closed.'
    },
    {
      name: 'onOpen',
      type: '(value: string) => void',
      comment: 'Raised when a descendant menu is opened.'
    },
    {
      name: 'onSelect',
      type: '(value: string) => void',
      comment: 'Raised when descendant menu item is selected.'
    }
  ],
  anatomy: `<div class="sterling-menu-bar">
  {@render children()}
</div>`,
  usage: MenuBarPlayground
};
