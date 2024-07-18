import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import ColorPickerPlayground from '../../_playgrounds/colorpicker/ColorPickerPlayground.svelte';

export const colorPickerDoc: ComponentDoc = {
  name: 'ColorPicker',
  description: 'A <Dropdown> to choose a color value',
  comments: [
    'The dropdown displays a set of sliders based on the color format selected.',
    'Changing the input to a color value with a different color format, switches the selected color format.',
    'Switching from HSL to HEX or RGB rounds values to the nearest color.',
    'There are no slots due to the required coordination between sliders and the dropdown.',
    makeExtendsComment('Dropdown')
  ],
  types: [
    {
      name: 'ColorFormat',
      definition: "'hex' | 'rgb' | 'hsl'"
    }
  ],
  props: [
    {
      name: 'colorText',
      type: 'string',
      default: "'#000000'",
      comment: 'The color value in HEX, RGB, or HSL format'
    },
    {
      name: 'colorFormat',
      type: 'ColorFormat',
      default: "'hex'",
      comment: 'The current color format'
    },
    {
      name: 'sliderVariant',
      type: 'string',
      default: "''",
      comment: 'Additional classes to apply to the each slider'
    },
    {
      name: 'valueVariant',
      type: 'string',
      default: "''",
      comment: 'Additional classes to apply to the value input'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-color-picker">
  <Dropdown>
    <div class="value" slot="value">
      <div class="color-box" />
      <Input />
    </div>
    <div class="sterling-color-picker-popup">
      <div class="tabs">
        <TabList />
      </div>
      <div class="sliders">
        <HexColorSliders />
        <HslColorSliders />
        <RgbColorSliders />
      </div>
    </div>
  </Dropdown>
</div>`,
  usage: ColorPickerPlayground
};
