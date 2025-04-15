import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import InputPlayground from '../../_playgrounds/input/InputPlayground.svelte';

export const inputDoc: ComponentDoc = {
  name: 'Input',
  description: 'An interactive element to accept data from the user.',
  comments: [
    'Prefer using the Label component rather than the label produced by children.',
    makeExtendsComment('HTMLInputElement')
  ],
  anatomy: `<label class="sterling-input-label">
  {@render children()}
</label>
<div class="sterling-input">
  <input />
</div>
`,
  usage: InputPlayground
};
