import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import LinkPlayground from '../../_playgrounds/link/LinkPlayground.svelte';

export const linkDoc: ComponentDoc = {
  name: 'Link',
  description: 'An <a>: an interactive anchor element to navigate to a URL',
  comments: [makeExtendsComment('HTMLAnchorElement')],
  props: [commonProps.variant],
  anatomy: `<a class="sterling-link">
  <slot {disabled} {href} {variant} />
</a>`,
  usage: LinkPlayground
};
