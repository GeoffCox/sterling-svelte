import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import ButtonPlayground from '../../_playgrounds/button/ButtonPlayground.svelte';

export const buttonDoc: ComponentDoc = {
  name: 'Button',
  description: 'An interactive element activated to perform an action.',
  comments: [
    "The type prop default is 'button' rather than 'submit'",
    makeExtendsComment('HTMLButtonElement')
  ],
  usage: ButtonPlayground,
  anatomy: `button (<button>)
  children (Snippet)`
};
