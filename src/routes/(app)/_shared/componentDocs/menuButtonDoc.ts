import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuButtonPlayground from '../../_playgrounds/menubutton/MenuButtonPlayground.svelte';

export const menuButtonDoc: ComponentDoc = {
  name: 'MenuButton',
  description: 'A button that opens and closes a menu.',
  comments: [makeExtendsComment('Button'), makeExtendsComment('HTMLButtonElement')],
  props: [
    {
      name: 'items',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment: 'The items to display in the menu.'
    },
    {
      name: 'menuClass',
      type: 'string',
      default: "''",
      comment: 'Additional class names to apply to the menu.'
    },
    {
      name: 'open',
      type: 'boolean',
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
      comment: 'Called when a descendant a menu item is selected.'
    },
    {
      name: 'popoverPlacement',
      type: 'PopoverPlacement',
      default: 'bottom-start',
      comment: 'The placement of the menu relative to the button.'
    },
    {
      name: 'value',
      type: 'string',
      default: 'undefined',
      comment: 'The value uniquely identifying this menu button as the root of the menu hierarchy.'
    }
  ],
  anatomy: `button (<Button>)
  reference (<div>)
    children (Snippet)
  popover (<Popover>)
    menu (<Menu>)
      items (Snippet)`,
  usage: MenuButtonPlayground
};
