import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import TooltipPlayground from '../../_playgrounds/tooltip/TooltipPlayground.svelte';

export const tooltipDoc: ComponentDoc = {
  name: 'Tooltip',
  description:
    'A floating box of content that is automatically shown when the mouse hovers over a reference element.',
  comments: [makeExtendsComment('<Callout>')],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the tooltip is disabled and will not be shown.'
    },
    {
      name: 'hoverDelayMilliseconds',
      type: 'number | undefined',
      default: '1000 (1 second)',
      comment: 'The duration of mouse hover before showing the tooltip.'
    },
    {
      name: 'onOpen',
      type: '(open: boolean | null | undefined) => void',
      default: 'undefined',
      comment: 'Called when the tooltip opens or closes'
    },
    {
      name: 'tip',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'The content passed to <Callout> children.'
    }
  ],
  anatomy: `{@render children()}
<div class="sterling-tooltip-origin"></div>
<Callout class="sterling-tooltip-callout">
  {@render tip()}
</Callout>`,
  usage: TooltipPlayground
};
