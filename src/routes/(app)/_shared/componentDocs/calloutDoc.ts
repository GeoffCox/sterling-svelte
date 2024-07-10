import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import ButtonPlayground from '../../_playgrounds/button/ButtonPlayground.svelte';

export const buttonDoc: ComponentDoc = {
  name: 'Button',
  description: 'A styled <button>',
  comments: [
    "The type prop default is 'button' rather than 'submit'",
    makeExtendsComment('HTMLButtonElement')
  ],
  props: [commonProps.variant],
  usage: ButtonPlayground,
  anatomy: `<button class="sterling-button">
  <slot {disabled} {variant} />
</button>`
};
