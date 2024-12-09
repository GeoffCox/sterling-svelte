import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import CheckboxPlayground from '../../_playgrounds/checkbox/CheckboxPlayground.svelte';

export const checkboxDoc: ComponentDoc = {
  name: 'Checkbox',
  description: 'An interactive element to set a boolean value',
  comments: [makeExtendsComment('HTMLInputElement')],
  anatomy: `checkbox (<div>)
  container (<div>)
    input (<input>) 
    indicator (<div>)
  label (<label>)
    children (Snippet)`,
  usage: CheckboxPlayground
};
