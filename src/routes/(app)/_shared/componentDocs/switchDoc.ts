import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import SwitchPlayground from '../../_playgrounds/switch/SwitchPlayground.svelte';

export const switchDoc: ComponentDoc = {
  name: 'Switch',
  description: 'A toggle button between two states.',
  comments: [makeExtendsComment('HTMLInputElement')],
  props: [
    {
      name: 'offLabel',
      type: 'string | LabelSnippet | undefined',
      default: 'undefined',
      comment: 'The text or snippet to display for the off position.'
    },
    {
      name: 'onLabel',
      type: 'string | LabelSnippet | undefined',
      default: 'undefined',
      comment: 'The text or snippet to display for the on position..'
    },
    {
      name: 'vertical',
      type: 'boolean | null | undefined',
      default: 'false',
      comment: 'When true, the switch is displayed vertically.'
    }
  ],
  types: [
    {
      name: 'LabelSnippet',
      definition: `Snippet<[{ 
  checked: boolean | null | undefined; 
  disabled: boolean | null | undefined; 
  inputId: string;
}]>`
    }
  ],
  anatomy: `switch (<div>)
  hidden (<input>)
  off container (<div>)
    offLabel (string | Snippet)
  toggle (<div>)
    thumb (<div>)
  on container (<div>)
    onLabel (string | Snippet)`,
  usage: SwitchPlayground
};
