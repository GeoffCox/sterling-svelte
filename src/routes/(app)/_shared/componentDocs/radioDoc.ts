import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import RadioPlayground from '../../_playgrounds/radio/RadioPlayground.svelte';

export const radioDoc: ComponentDoc = {
  name: 'Radio',
  description: 'An interactive element used to make a single choice from a set of options.',
  comments: [makeExtendsComment('HTMLInputElement')],
  props: [
    {
      name: 'group',
      type: 'any | undefined | null',
      default: 'undefined',
      comment: 'The group to bind to the selected value for a group of radio buttons.'
    }
  ],
  anatomy: `<div class="sterling-radio">
  <div class="container">
    <input type="radio" />
    <div class="indicator"></div>
  </div>
  <label>
    {@render children()}
  </label>
</div>`,
  usage: RadioPlayground
};
