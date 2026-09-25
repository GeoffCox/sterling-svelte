import type { ComponentDoc } from './types';
import Popover2Playground from '../../_playgrounds/popover2/Popover2Playground.svelte';
import { makeExtendsComment } from './commonDoc';

export const popover2Doc: ComponentDoc = {
  name: 'Popover 2',
  description: 'An element that floats above other content.',
  comments: [
    'Uses the browser Popover API to place the popover on the top layer. A unique anchor-name will be set on the anchor element to connect to the popover for positioning.',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'anchor',
      type: 'HTMLElement | null | undefined',
      default: 'undefined',
      comment: 'The element the popover uses to position itself.'
    },
    {
      name: 'anchorOrigin',
      type: 'Popover2AnchorOrigin | undefined',
      default: "'auto'",
      comment:
        "The point in a 3x3 grid on the anchor that should be used as the origin. When 'auto', anchorOrigin follows placement."
    },
    {
      name: 'invoker',
      type: 'HTMLElement | null | undefined',
      default: 'undefined',
      comment:
        'The element that controls opening/closing the popover. If the anchor is not specified, the invoker is used as the anchor.'
    },
    {
      name: 'lightDismiss',
      type: 'boolean | null | undefined',
      default: 'true',
      comment:
        'When true, this popover closes when another element is clicked or focused. Also closes when another popover opens.'
    },
    {
      name: 'offsetX',
      type: 'number',
      default: '0',
      comment: 'The how many pixels to move the popover left (negative) or right (positive).'
    },
    {
      name: 'offsetY',
      type: 'number',
      default: '0',
      comment: 'The how many pixels to move the popover up (negative) or down (positive).'
    },
    {
      name: 'open',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the popover is open and visible.'
    },
    {
      name: 'placement',
      type: 'Popover2Placement | undefined',
      default: "'center-center'",
      comment:
        'How the popover should be positioned (vertically-horizontally) relative to anchor point.'
    }
  ],
  types: [
    {
      name: 'Popover2Placement',
      definition:
        "'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'"
    },
    {
      name: 'Popover2AnchorOrigin',
      definition:
        "'auto' | 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'"
    }
  ],
  anatomy: `<div 
  class="sterling-popover-2 --anchor-ident:anchor-123 --offset-x:calc(0% + 15px); --offset-y:calc(0% + 0px);"
  data-placement="top-left"
  data-flipped-x="false"
  data-flipped-y="false"
  data-anchor-origin="top-left"
  popover="auto">
    <div class="content">
      {@render children?.()}
    </div>
  </div>
</div>`,
  usage: Popover2Playground
};
