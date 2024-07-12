import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import InputPlayground from '../../_playgrounds/input/InputPlayground.svelte';

export const inputDoc: ComponentDoc = {
  name: 'Input',
  description: 'An <input>: an interactive element to accept data from the user',
  comments: [
    'Prefer using the Label component rather than the label produced by providing default slot content.',
    makeExtendsComment('HTMLInputElement')
  ],
  props: [commonProps.variant],
  anatomy: `<label class="sterling-input-label">
  <slot {disabled} {value} {variant} />
</label>
<div class="sterling-input">
  <input />
</div>`,
  usage: InputPlayground
};
