import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import RadioPlayground from '../../_playgrounds/radio/RadioPlayground.svelte';

export const radioDoc: ComponentDoc = {
  name: 'Radio',
  description:
    "An <input type='radio'>: an interactive element to choose a single value from a set of choices",
  comments: [makeExtendsComment('HTMLInputElement')],
  props: [
    {
      name: 'group',
      type: 'string',
      default: "''",
      comment: 'The group to bind to the selected value for a group of radio buttons'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-radio">
  <div class="container">
    <!-- hidden -->
    <input />
    <div class="indicator" />
  </div>
  <label>
    <slot {checked} {disabled} {group} {inputId} {value} {variant} />
  </label>
</div>`,
  usage: RadioPlayground
};
