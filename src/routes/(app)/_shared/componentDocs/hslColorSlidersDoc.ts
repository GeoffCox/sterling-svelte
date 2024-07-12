import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import HslColorSlidersPlayground from '../../_playgrounds/hslcolorsliders/HslColorSlidersPlayground.svelte';

export const hslColorSlidersDoc: ComponentDoc = {
  name: 'HslColorSliders',
  description: 'A set of sliders to choose an HSL color value',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'hue',
      type: 'number',
      default: '180',
      comment: 'The hue value.'
    },
    {
      name: 'saturation',
      type: 'number',
      default: '100',
      comment: 'The saturation value.'
    },
    {
      name: 'lightness',
      type: 'number',
      default: '50',
      comment: 'The lightness value.'
    },
    {
      name: 'alpha',
      type: 'number',
      default: '1',
      comment: 'The alpha value.'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-hsl-color-sliders">
  <Slider variant="hue" />
  <Input variant="hue" />
  <Slider variant="saturation" />
  <Input variant="saturation" />
  <Slider variant="lightness" />
  <Input variant="lightness" />
  <div class="alpha-hatch" />
  <div class="alpha-gradient" />
  <Slider variant="alpha" />
  <Input variant="alpha" />
</div>`,
  usage: HslColorSlidersPlayground
};
