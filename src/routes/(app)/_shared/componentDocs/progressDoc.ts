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
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the progress bar is disabled.'
    },
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
      name: 'orientation',
      type: "'ProgressOrientation | undefined'",
      default: 'horizontal',
      comment: 'Whether the progress bar is displayed horizontally or vertically.'
    }
  ],
  types: [
    {
      name: 'ProgressOrientation',
      definition: "'horizontal' | 'vertical'",
      comment: 'Used for the orientation property.'
    }
  ],
  anatomy: `progress (<div>)
  container (<div>)
    indicator (<div>)`,
  usage: ProgressPlayground
};
