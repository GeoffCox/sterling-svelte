import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuButton2Playground from '../../_playgrounds/menubutton2/MenuButton2Playground.svelte';

export const menuButton2Doc: ComponentDoc = {
  name: 'MenuButton2',
  description: 'A button that opens and closes a menu.',
  comments: [
    'MenuButton2 uses Popover2',
    makeExtendsComment('Button'),
    makeExtendsComment('HTMLButtonElement')
  ],
  props: [
    {
      name: 'allowFlip',
      type: 'Popover2FlipAxis | undefined',
      default: 'undefined',
      comment:
        'Which axis/axes allow the menu to flip to the other side when there is not enough space.'
    },
    {
      name: 'anchorOrigin',
      type: 'Popover2Nonant | undefined',
      default: "'bottom-left'",
      comment:
        'The point in a 3x3 grid on the anchor that should be used as the origin for the menu.'
    },
    {
      name: 'items',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The items to display in the menu.'
    },
    {
      name: 'lightDismiss',
      type: 'boolean | null | undefined',
      default: 'true',
      comment:
        'When true, the menu closes when another element is clicked or focused. Also closes when another dropdown opens.'
    },
    {
      name: 'menuClass',
      type: 'string',
      default: "''",
      comment: 'Additional class names to apply to the menu.'
    },
    {
      name: 'offsetX',
      type: 'number',
      default: '0',
      comment: 'The how many pixels to move the menu left (negative) or right (positive).'
    },
    {
      name: 'offsetY',
      type: 'number',
      default: '0',
      comment: 'The how many pixels to move the menu up (negative) or down (positive).'
    },
    {
      name: 'open',
      type: 'boolean',
      bindable: true,
      default: 'false',
      comment: 'When true, the menu is open.'
    },
    {
      name: 'onClose',
      type: '(value: string) => void',
      comment: 'Called when the menu or a descendant menu is closed.'
    },
    {
      name: 'onOpen',
      type: '(value: string) => void',
      comment: 'Called when the menu or a descendant menu is opened.'
    },
    {
      name: 'onSelect',
      type: '(value: string) => void',
      comment: 'Called when a descendant menu item is selected.'
    },
    {
      name: 'placement',
      type: "'auto'| Popover2Nonant | undefined",
      default: "'bottom-right'",
      comment:
        "How the menu should be positioned relative to the anchor point. When 'auto', placement follows anchorOrigin."
    },
    {
      name: 'value',
      type: 'string',
      default: 'undefined',
      comment: 'The value uniquely identifying this menu button as the root of the menu hierarchy.'
    }
  ],
  anatomy: `<Button class="sterling-menu-button-2">
  {@render children()}
</Button>

<Popover>
  <Menu class={menuClass}>
    {@render items()}
  </Menu>
</Popover>
`,
  usage: MenuButton2Playground
};
