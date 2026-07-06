import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import Tooltip2Playground from '../../_playgrounds/tooltip2/Tooltip2Playground.svelte';

export const tooltip2Doc: ComponentDoc = {
  name: 'Tooltip2',
  description:
    'A floating box of content that is automatically shown when the mouse hovers over the element.',
  comments: [
    'Includes <Popover2> props, events, and methods except anchorCssName and invokerMethod.'
  ],
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
      comment: 'The mouse hover duration before showing the tooltip.'
    },
    {
      name: 'tip',
      type: 'string | Snippet | undefined',
      default: 'undefined',
      comment: 'The content to display as the tooltip.'
    }
  ],
  anatomy: `<div class="sterling-tooltip>
  {@render children()}
</div>
<Popover2 class="callout">
  {@render tip()}
</Callout>`,
  usage: Tooltip2Playground
};
