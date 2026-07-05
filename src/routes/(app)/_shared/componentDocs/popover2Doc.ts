import type { ComponentDoc } from './types';
import Popover2Playground from '../../_playgrounds/popover2/Popover2Playground.svelte';
import { makeExtendsComment } from './commonDoc';

export const popover2Doc: ComponentDoc = {
  name: 'Popover 2',
  description: 'An element that floats above other content.',
  comments: [
    'Uses the browser Popover API to place content on top of other content.',
    'Popover contains a content div to ensure styling the content contend with popover placement.',
    makeExtendsComment('HTMLDivElement')
  ],
  props: [
    {
      name: 'open',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the popover is open and visible.'
    },
    {
      name: 'lightDismiss',
      type: 'boolean | null | undefined',
      default: 'true',
      comment:
        'When true, this popover closes when another element is clicked or focused. Also closes when another popover opens.'
    },
    {
      name: 'placement',
      type: 'Popover2Placement | undefined',
      default: "'center-center'",
      comment:
        'How the popover should be positioned (vertically-horizontally) relative to anchor point.'
    },
    {
      name: 'anchorOrigin',
      type: 'Popover2AnchorOrigin | undefined',
      default: "'auto'",
      comment:
        "Which anchor point in a 3x3 grid should be used as the origin. When 'auto', anchorOrigin is set to match the placement value."
    },
    {
      name: 'anchorCssName',
      type: 'string | undefined',
      default: 'undefined',
      comment:
        'The CSS anchor-name value used as the anchor element for the popover. When not provided, the element with popovertarget is used.'
    },
    {
      name: 'horizontalOffset',
      type: 'number',
      default: '0',
      comment: 'The how many pixels to move the popover left (negative) or right (positive).'
    },
    {
      name: 'verticalOffset',
      type: 'number',
      default: '0',
      comment: 'The how many pixels to move the popover up (negative) or down (positive).'
    },
    {
      name: 'invokerElement',
      type: 'HTMLElement | null | undefined',
      default: 'undefined',
      comment:
        'The element that controls opening/closing the popover. Prefer to use HTML popovertarget attribute instead.'
    }
  ],
  types: [
    {
      name: 'Popover2Placement',
      definition:
        "'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'"
    },
    {
      name: 'Popover2AnchorOrigin',
      definition:
        "'auto' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'"
    }
  ],
  anatomy: `<div class="sterling-popover-2">
    <div class="content">
      {@render children()}
    </div>
  </div>
</div>`,
  usage: Popover2Playground
};
