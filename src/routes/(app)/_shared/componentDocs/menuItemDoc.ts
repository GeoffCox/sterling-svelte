import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuItemPlayground from '../../_playgrounds/menuitem/MenuItemPlayground.svelte';

export const menuItemDoc: ComponentDoc = {
  name: 'MenuItem',
  description: 'An actionable item within a <Menu>',
  comments: [
    'MenuItem uses MenuItemContext set by the Menu for some properties and events.',
    makeExtendsComment('HTMLButtonElement')
  ],
  props: [
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the menu item is checked'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the menu item is disabled'
    },
    {
      name: 'role',
      type: 'MenuItemRole',
      default: "''",
      comment: 'The role of the menu item'
    },
    {
      name: 'text',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The text of the menu item'
    },
    {
      name: 'value',
      type: 'string',
      default: "''",
      comment: 'The value uniquely identifying this menu item within the menu hierarchy'
    },
    commonProps.variant
  ],
  events: [
    {
      name: 'close',
      comment: 'Raised when the menu item is closed',
      data: '{ value: string }'
    },
    {
      name: 'open',
      comment: 'Raised when the menu item is opened',
      data: '{ value: string }'
    },
    {
      name: 'select',
      comment: 'Raised when the menu item is selected',
      data: '{ value: string }'
    }
  ],
  types: [
    {
      name: 'MenuItemRole',
      definition: "'menuitem' | 'menuitemcheckbox' | 'menuitemradio'",
      comment: 'Used for the MenuItem role property.'
    }
  ],
  anatomy: `<button class="sterling-menu-item">
  <div class="item">
    <slot
      name="item"
      {checked}
      {depth}
      {disabled}
      {hasChildren}
      {isMenuBarItem}
      {open}
      {role}
      {text}
      {value}
      {variant}
    >
      <MenuItemDisplay>{text}</MenuItemDisplay>
    </slot>
  </div>
  <Popover>
    <Menu>
      <slot {depth} {disabled} />
    </Menu>
  </Popover>
</button>`,
  usage: MenuItemPlayground
};
