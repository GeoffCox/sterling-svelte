import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import ProgressPlayground from '../../_playgrounds/progress/ProgressPlayground.svelte';

export const progressDoc: ComponentDoc = {
  name: 'Progress',
  description: 'A visual indicator of a value between a minimum and a maximum.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the progress bar is disabled.'
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      comment: 'The maximum value.'
    },
    {
      name: 'percent',
      type: 'number',
      default: '0',
      comment: 'A read-only percentage between 0 and 100 calculated from value and max.'
    },
    {
      name: 'status',
      type: 'ProgressStatus',
      default: "'none'",
      comment: 'The current status of the progress.'
    },
    {
      name: 'value',
      type: 'number',
      default: '0',
      comment: 'The current value.'
    },
    commonProps.variant,
    {
      name: 'vertical',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the progress bar is displayed vertically.'
    }
  ],
  types: [
    {
      name: 'ProgressStatus',
      definition: "'none' | 'error' | 'warning' | 'info' | 'success'",
      comment: 'Used for the Progress status property.'
    }
  ],
  anatomy: `<div class="sterling-progress">
  <div class="container">
    <div class="indicator" />
  </div>
</div>`,
  usage: ProgressPlayground
};
