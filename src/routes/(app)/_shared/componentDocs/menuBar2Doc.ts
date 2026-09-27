import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuBar2Playground from '../../_playgrounds/menubar2/MenuBar2Playground.svelte';

export const menuBar2Doc: ComponentDoc = {
  name: 'MenuBar2',
  description: 'A horizontal list of menu items, often positioned at the top of a window.',
  comments: ['MenuBar2 uses Popover2.', makeExtendsComment('HTMLDivElement')],
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
  anatomy: `<div class="sterling-menu-bar-2">
  {@render children()}
</div>`,
  usage: MenuBar2Playground
};
