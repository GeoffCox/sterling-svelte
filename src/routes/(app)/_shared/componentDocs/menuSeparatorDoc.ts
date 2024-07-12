import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuSeparatorPlayground from '../../_playgrounds/menuseparator/MenuSeparatorPlayground.svelte';

export const menuSeparatorDoc: ComponentDoc = {
  name: 'MenuSeparator',
  description: 'A visual separator of items in a menu',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [commonProps.variant],
  anatomy: `<div class="sterling-menu-separator" />`,
  usage: MenuSeparatorPlayground
};
