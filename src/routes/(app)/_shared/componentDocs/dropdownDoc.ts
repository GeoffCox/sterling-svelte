import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import DropdownPlayground from '../../_playgrounds/dropdown/DropdownPlayground.svelte';

export const dropdownDoc: ComponentDoc = {
  name: 'Dropdown',
  description: 'A value and button to open/close a floating content box.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'button',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'The button to open/close the dropdown.'
    },
    {
      name: 'buttonIcon',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'The icon within the button. When undefined, displays a chevron.'
    },
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the dropdown is disabled and closed'
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
    }
  ],
  anatomy: `dropdown (<div>)
  value container (<div>)
    value (<string | Snippet>)
  button (<Snippet>)
    button container <div>
      buttonIcon <Snippet>
        chevron (<div>)
  dropdown content (<Popover>)
    content (<div>)
      children (<Snippet>)`,
  usage: DropdownPlayground
};
