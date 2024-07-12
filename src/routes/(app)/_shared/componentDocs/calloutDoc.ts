import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import CalloutPlayground from '../../_playgrounds/callout/CalloutPlayground.svelte';

export const calloutDoc: ComponentDoc = {
  name: 'Callout',
  description: 'A floating box of content with an arrow pointing at the reference element',
  comments: [
    'The Popover component provides floating content without the Callout style.',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'conditionalRender',
      type: 'boolean',
      default: 'true',
      comment: 'Conditionally renders content based on open'
    },
    {
      name: 'crossAxisOffset',
      type: 'number',
      default: '0',
      comment: 'The offset along the side of the reference element'
    },
    {
      name: 'mainAxisOffset',
      type: 'number',
      default: '0',
      comment: 'The offset towards or away from the side of the reference element'
    },
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the callout is open and visible'
    },
    {
      name: 'placement',
      type: 'PopoverPlacement',
      default: "'top-start'",
      comment: 'How the callout should be positioned relative to the reference element'
    },
    {
      name: 'portalHost',
      type: 'HTMLElement',
      default: 'undefined',
      comment: 'The host container for the callout'
    },
    {
      name: 'reference',
      type: 'HTMLElement',
      default: 'undefined',
      comment: 'The reference to the element anchoring the position of the callout'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-callout-portal">
<div class="sterling-callout">
  <slot />
  <div class="arrow" />
</div>
</div>`,
  usage: CalloutPlayground
};
