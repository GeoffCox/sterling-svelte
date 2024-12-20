import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuSeparatorPlayground from '../../_playgrounds/menuseparator/MenuSeparatorPlayground.svelte';

export const menuSeparatorDoc: ComponentDoc = {
  name: 'MenuSeparator',
  description: 'A visual separator between items in a menu',
  comments: [makeExtendsComment('HTMLDivElement')],
  anatomy: `separator (<div>)`,
  usage: MenuSeparatorPlayground
};
