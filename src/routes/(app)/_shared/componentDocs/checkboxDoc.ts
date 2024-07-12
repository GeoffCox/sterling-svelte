import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import CheckboxPlayground from '../../_playgrounds/checkbox/CheckboxPlayground.svelte';

export const checkboxDoc: ComponentDoc = {
  name: 'Checkbox',
  description: "An <input type='checkbox'>: an interactive element to select/deselect a value",
  comments: [makeExtendsComment('HTMLInputElement')],
  props: [commonProps.variant],
  anatomy: `<div class="sterling-checkbox">
  <div class="container">
    <!-- hidden-->
    <input />
    <div class="indicator" />
  </div>
  <label>
    <slot {checked} {disabled} {inputId} {value} {variant} />
  </label>
</div>`,
  usage: CheckboxPlayground
};
