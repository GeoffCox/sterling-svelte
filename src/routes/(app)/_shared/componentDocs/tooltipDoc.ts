import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import TooltipPlayground from '../../_playgrounds/tooltip/TooltipPlayground.svelte';

export const tooltipDoc: ComponentDoc = {
  name: 'Tooltip',
  description:
    'A <Callout> shown when the mouse hovers over a reference element for a specific duration',
  comments: [
    'The tooltip is anchored to a sibling element that appears directly after the default slot content.',
    makeExtendsComment('Callout')
  ],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the tooltip is disabled and will not be shown.'
    },
    {
      name: 'hoverDelayMilliseconds',
      type: 'number',
      default: '1000',
      comment: 'The duration of mouse hover before showing the tooltip.'
    }
  ],
  anatomy: `<slot {disabled} {hoverDelayMilliseconds} {open} {variant} />
<!-- hidden anchor point -->
<div class="sterling-tooltip-origin" />
<Callout>
  <slot name="tip" {placement} {variant} />
</Callout>`,
  usage: TooltipPlayground
};
