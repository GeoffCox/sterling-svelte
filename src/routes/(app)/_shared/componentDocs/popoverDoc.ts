import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import PopoverPlayground from '../../_playgrounds/popover/PopoverPlayground.svelte';

export const popoverDoc: ComponentDoc = {
  name: 'Popover',
  description: 'Content that floats abover other content',
  comments: [
    'Floats content above the page via use:portal. Elements are moved to the end of the `body` element so they appear above them in the z-order.',
    'Popover does not provide any styling (background, border, etc.) around the floating content.'
  ],
  props: [
    {
      name: 'conditionalRender',
      type: 'boolean',
      default: 'true',
      comment: 'When true, content is rendered only when the popover is open.'
    },
    {
      name: 'crossAxisOffset',
      type: 'number',
      default: '0',
      comment: 'The offset along the side of the reference element.'
    },
    {
      name: 'mainAxisOffset',
      type: 'number',
      default: '0',
      comment: 'The offset towards or away from the side of the reference element.'
    },
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the popover is open and visible.'
    },
    {
      name: 'placement',
      type: 'PopoverPlacement',
      default: "'bottom-start'",
      comment: 'How the popover should be positioned relative to the reference element.'
    },
    {
      name: 'portalHost',
      type: 'HTMLElement | undefined',
      default: 'undefined',
      comment: 'The host container for the callout.'
    },
    {
      name: 'reference',
      type: 'HTMLElement | undefined',
      default: 'undefined',
      comment: 'The reference to the element anchoring the position of the popover.'
    }
  ],
  types: [
    {
      name: 'PopoverPlacement',
      definition:
        "'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'"
    }
  ],
  anatomy: `<div class="sterling-popover-portal" use:portal>
  <div class="sterling-popover">
    <slot {open} {variant} />
  </div>
</div>`,
  usage: PopoverPlayground
};
