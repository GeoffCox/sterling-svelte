import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import InputPlayground from '../../_playgrounds/input/InputPlayground.svelte';

export const inputDoc: ComponentDoc = {
  name: 'Input',
  description: 'An interactive element to accept data from the user.',
  comments: [
    'Prefer using the Label component rather than the label produced by providing default slot content.',
    makeExtendsComment('HTMLInputElement')
  ],
  anatomy: `label (<label>)
  children (Snippet)
input container (<div>)
  input (<input>)`,
  usage: InputPlayground
};
