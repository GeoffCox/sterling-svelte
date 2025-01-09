import MenuPlayground from '../../_playgrounds/menu/MenuPlayground.svelte';
import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';

export const menuDoc: ComponentDoc = {
  name: 'Menu',
  description: 'An interactive list of menu items.',
  comments: [
    'Menu is a building block for a hierarchy of others components such as MenuBar, MenuButton, MenuItem, and MenuSeparator.',
    'Position is based on the reference element.',
    'The menu floats above other elements on the page via portal.',
    makeExtendsComment('HTMLDivElement')
  ],
  methods: [
    {
      name: 'focusFirstMenuItem',
      comment: 'Focuses the first menu item.'
    },
    {
      name: 'focusPreviousMenuItem',
      comment: 'Focuses the previous menu item.'
    },
    {
      name: 'focusNextMenuItem',
      comment: 'Focuses the next menu item.'
    },
    {
      name: 'focusLastMenuItem',
      comment: 'Focuses the last menu item.'
    }
  ],
  anatomy: `menu (<div>)
  menu items (<div>)
    children (Snippet)`,
  usage: MenuPlayground
};
