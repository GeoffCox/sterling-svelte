import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuButtonPlayground from '../../_playgrounds/menubutton/MenuButtonPlayground.svelte';

export const menuButtonDoc: ComponentDoc = {
  name: 'MenuButton',
  description: 'A <Button> that opens/closes a <Menu>',
  comments: [makeExtendsComment('Button'), makeExtendsComment('HTMLButtonElement')],
  props: [
    {
      name: 'open',
      type: 'string',
      default: 'false',
      comment: 'When true, the menu is open'
    },
    {
      name: 'menuVariant',
      type: 'string',
      default: "''",
      comment: 'Additional class names to apply to the Menu'
    },
    {
      name: 'value',
      type: 'string',
      default: "''",
      comment: 'The value uniquely identifying this menu button as the root of the menu hierarchy'
    },
    commonProps.variant
  ],
  events: [
    {
      name: 'close',
      comment: 'Raised when the menu or a descendant menu is closed',
      data: '{ value: string }'
    },
    {
      name: 'open',
      comment: 'Raised when the menu or a descendant menu is opened',
      data: '{ value: string }'
    },
    {
      name: 'selected',
      comment: 'Raised when a descendant a menu item is selected',
      data: '{ value: string }'
    }
  ],
  anatomy: `<Button>
  <div class="reference">
    <slot {open} {value} {variant} />
  </div>
  <Popover>
    <Menu variant={menuVariant}>
      <slot name="items" />
    </Menu>
  </Popover>
</Button>`,
  usage: MenuButtonPlayground
};
