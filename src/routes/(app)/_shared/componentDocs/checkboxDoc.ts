import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import CheckboxPlayground from '../../_playgrounds/checkbox/CheckboxPlayground.svelte';

export const checkboxDoc: ComponentDoc = {
  name: 'Checkbox',
  description: 'An interactive element to set a true/false value.',
  comments: [makeExtendsComment('HTMLInputElement')],
  anatomy: `<div class="sterling-checkbox">
  <div class="container">
    <input type="checkbox" />
    <div class="indicator"></div>
  </div>
  <label>
    {@render children()}
  </label>
</div>`,
  usage: CheckboxPlayground
};
