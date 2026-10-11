import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import RangeSliderPlayground from '../../_playgrounds/rangeslider/RangeSliderPlayground.svelte';

export const rangeSliderDoc: ComponentDoc = {
  name: 'RangeSlider',
  description: `A range value set by dragging low and high thumbs between a minimum and maximum.`,
  comments: [
    makeExtendsComment('HTMLDivElement'),
    `When a thumb is the equivalent of :active, the thumb element will have the 'active' class.`,
    `When a thumb is being dragged, the thumb element will have the 'dragging' class.`,
    `When a thumb can be moved by keyboard input, the thumb element will have the 'keyboard-focus' class.`
  ],
  props: [
    {
      name: 'disabled',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the slider is disabled.'
    },
    {
      name: 'highValue',
      type: 'number | undefined',
      default: '0',
      comment: 'The high value of the range.'
    },
    {
      name: 'lowValue',
      type: 'number | undefined',
      default: '0',
      comment: 'The low value of the range.'
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
      name: 'onChange',
      type: '(value: { low?: number, high?: number}) => void',
      default: 'undefined',
      comment: 'Called when the low or high values of the slider changes.'
    },
    {
      name: 'precision',
      type: 'number | undefined',
      default: 'undefined',
      comment: 'The number of decimal places to round the values.'
    },
    {
      name: 'reverse',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the slider direction from min to max is reversed.'
    },
    {
      name: 'step',
      type: 'number | undefined',
      default: '1',
      comment: 'The amount the value changes by pressing arrow keys.'
    },
    {
      name: 'vertical',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the slider is displayed vertically.'
    }
  ],
  anatomy: `<div class="sterling-range-slider>
  <div class="container">
    <div class="track"></div>
    <div class="fill"></div>
    <div class="thumb low"></div>
    <div class="thumb high"></div>
  </div>
</div>`,
  usage: RangeSliderPlayground
};
