import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import LinkPlayground from '../../_playgrounds/link/LinkPlayground.svelte';

export const linkDoc: ComponentDoc = {
  name: 'Link',
  description: 'An interactive anchor element to navigate to a URL.',
  comments: [makeExtendsComment('HTMLAnchorElement')],
  anatomy: `<a class="sterling-link">
  {@render children()}
</a>`,
  usage: LinkPlayground
};
