import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import SliderPlayground from '../../_playgrounds/slider/SliderPlayground.svelte';

export const sliderDoc: ComponentDoc = {
  name: 'Slider',
  description: 'A value set by dragging a thumb between a minimum and maximum.',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the slider is disabled.'
    },
    {
      name: 'max',
      type: 'number | undefined',
      default: '100',
      comment: 'The maximum value of the slider.'
    },
    {
      name: 'min',
      type: 'number | undefined',
      default: '0',
      comment: 'The minimum value of the slider.'
    },
    {
      name: 'step',
      type: 'number | undefined',
      default: '1',
      comment: 'The amount the value changes by pressing arrow keys.'
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      default: 'undefined',
      comment: 'Called when the value of the slider changes.'
    },
    {
      name: 'precision',
      type: 'number | undefined',
      default: 'undefined',
      comment: 'The number of decimal places to round the value'
    },
    {
      name: 'value',
      type: 'number | undefined',
      default: '0',
      comment: 'The current value of the slider.'
    },
    {
      name: 'vertical',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the slider is displayed vertically.'
    }
  ],
  anatomy: `slider (<div>)
  container (<div>)
    track (<div>)
    fill (<div>)
    thumb (<div>)`,
  usage: SliderPlayground
};
