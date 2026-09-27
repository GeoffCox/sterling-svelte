import type { ComponentDoc } from './types';
import Tooltip2Playground from '../../_playgrounds/tooltip2/Tooltip2Playground.svelte';

export const tooltip2Doc: ComponentDoc = {
  name: 'Popover2/Tooltip',
  description: 'The popoverHover action replaces Tooltip as its own component.',
  comments: [],
  props: [
    {
      name: 'delayMilliseconds',
      type: 'number | undefined',
      default: '1000 (1 second)',
      comment: 'The mouse hover duration before showing the popover.'
    },
    {
      name: 'popovertarget',
      type: 'string',
      default: 'undefined',
      comment: 'The id of the Popover2.'
    }
  ],
  usage: Tooltip2Playground
};
