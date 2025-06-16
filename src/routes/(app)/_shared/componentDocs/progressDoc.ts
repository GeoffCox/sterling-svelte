import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import ProgressPlayground from '../../_playgrounds/progress/ProgressPlayground.svelte';

export const progressDoc: ComponentDoc = {
  name: 'Progress',
  description: 'A visual indicator of a value between a minimum and a maximum.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'max',
      type: 'number | undefined',
      default: '100',
      comment: 'The maximum value.'
    },
    {
      name: 'percent',
      type: 'number | undefined',
      default: '0',
      comment: 'A read-only percentage between 0 and 100 calculated from value and max.'
    },
    {
      name: 'value',
      type: 'number | undefined',
      default: '0',
      comment: 'The current value.'
    },
    {
      name: 'vertical',
      type: 'boolean | null | undefined',
      default: 'undefined',
      comment: 'When true, the progress bar is displayed vertically.'
    },
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'Deprecated. Progress is not interactive and should not have disabled state.'
    }
  ],
  types: [
    {
      name: 'ProgressOrientation',
      definition: "'horizontal' | 'vertical'",
      comment: 'Used for the orientation property.'
    }
  ],
  anatomy: `<div class="sterling-progress">
  <div class="container">
    <div class="indicator"></div>
  </div>
</div>`,
  usage: ProgressPlayground
};
