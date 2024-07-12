import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import HexColorSlidersPlayground from '../../_playgrounds/hexcolorsliders/HexColorSlidersPlayground.svelte';

export const hexColorSliderDoc: ComponentDoc = {
  name: 'HexColorSliders',
  description: 'A set of sliders to choose a HEX color value',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'red',
      type: 'number',
      default: '0',
      comment: 'The red value.'
    },
    {
      name: 'green',
      type: 'number',
      default: '0',
      comment: 'The green value.'
    },
    {
      name: 'blue',
      type: 'number',
      default: '0',
      comment: 'The blue value.'
    },
    {
      name: 'alpha',
      type: 'number',
      default: '255',
      comment: 'The alpha value.'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-hex-color-sliders">
  <Slider variant="red" />
  <Input variant="red" />
  <Slider variant="green" />
  <Input variant="green" />
  <Slider variant="blue" />
  <Input variant="blue" />
  <div class="alpha-hatch" />
  <div class="alpha-gradient" />
  <Slider variant="alpha" />
  <Input variant="alpha" />
</div>`,
  usage: HexColorSlidersPlayground
};
