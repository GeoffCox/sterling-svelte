import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import SliderPlayground from '../../_playgrounds/slider/SliderPlayground.svelte';

export const sliderDoc: ComponentDoc = {
  name: 'Slider',
  description: 'A draggable <button> to choose a value between a minimum and maximum',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the slider is disabled'
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      comment: 'The maximum value of the slider'
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      comment: 'The minimum value of the slider'
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      comment: 'The amount the value changes by pressing arrow keys'
    },
    {
      name: 'precision',
      type: 'number | undefined',
      default: 'undefined',
      comment: 'The number of decimal places to round the value'
    },
    {
      name: 'value',
      type: 'number',
      default: '0',
      comment: 'The current value of the slider'
    },
    commonProps.variant,
    {
      name: 'vertical',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the slider is displayed vertically'
    }
  ],
  events: [
    {
      name: 'change',
      data: '{ value: number }',
      comment: 'Raised when the value of the slider changes'
    }
  ],
  anatomy: `<div class="sterling-slider">
  <div class="container">
    <div class="track" />
    <div class="fill" />
    <div class="thumb" />
  <div>
</div>`,
  usage: SliderPlayground
};
