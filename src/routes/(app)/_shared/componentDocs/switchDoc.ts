import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import SwitchPlayground from '../../_playgrounds/switch/SwitchPlayground.svelte';

export const switchDoc: ComponentDoc = {
  name: 'Switch',
  description: "An <input type='checkbox'>: toggles between two states",
  comments: [makeExtendsComment('HTMLInputElement')],
  props: [
    {
      name: 'offText',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The text appearing by the off position. Not used when the offLabel slot is filled.'
    },
    {
      name: 'onText',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The text appearing near the on position. Not used when the onLabel slot is filled.'
    },
    commonProps.variant,
    {
      name: 'vertical',
      type: 'boolean',
      default: 'false',
      comment: 'When true, the switch is displayed vertically.'
    }
  ],
  anatomy: `<div class="sterling-switch">
   <!-- hidden input -->
  <input />
  <div class="off-label">
    <slot name="offLabel" {checked} {disabled} {inputId} {offText} {variant} {vertical} />
  </div>
  <div class="switch">
    <div class="thumb" />
  </div>
  <div class="on-label">
    <slot name="onLabel" {checked} {disabled} {inputId} {onText} {variant} {vertical}>
  </div>
</div>`,
  usage: SwitchPlayground
};
