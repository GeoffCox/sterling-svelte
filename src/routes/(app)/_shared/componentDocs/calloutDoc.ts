import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import CalloutPlayground from '../../_playgrounds/callout/CalloutPlayground.svelte';

export const calloutDoc: ComponentDoc = {
  name: 'Callout',
  description: 'A floating box of content with an arrow pointing at the reference element',
  comments: [
    'Use Popover for floating content without the Callout style.',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'conditionalRender',
      type: 'boolean | null | undefined',
      default: 'true',
      comment: 'Conditionally renders content based on open'
    },
    {
      name: 'crossAxisOffset',
      type: 'number | undefined',
      default: '0',
      comment: 'The offset along the side of the reference element'
    },
    {
      name: 'mainAxisOffset',
      type: 'number | undefined',
      default: '0',
      comment: 'The offset towards or away from the side of the reference element'
    },
    {
      name: 'open',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the callout is open and visible'
    },
    {
      name: 'placement',
      type: 'PopoverPlacement | undefined',
      default: "'top-start'",
      comment: 'How the callout should be positioned relative to the reference element'
    },
    {
      name: 'portalHost',
      type: 'HTMLElement | undefined',
      default: 'undefined',
      comment: 'The host container for the callout'
    },
    {
      name: 'reference',
      type: 'HTMLElement | undefined',
      default: 'undefined',
      comment: 'The reference to the element anchoring the position of the callout'
    }
  ],
  anatomy: `portal (<div>)
callout (<div>)
  children (Snippet)
  arrow (<div>)`,
  usage: CalloutPlayground
};
