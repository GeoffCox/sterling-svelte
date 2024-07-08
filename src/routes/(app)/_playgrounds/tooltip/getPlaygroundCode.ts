import type { PopoverPlacement } from '$lib';

export const getPlaygroundCode = (props: {
  crossAxisOffset: number;
  disabled: boolean;
  hoverDelayMilliseconds: number;
  mainAxisOffset: number;
  open: boolean;
  placement: PopoverPlacement;
  text: string;
  variant: string;
}) => {
  const propList: string[] = [];
  if (props.crossAxisOffset !== 0) {
    propList.push(`crossAxisOffset="${props.crossAxisOffset}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.hoverDelayMilliseconds !== 0) {
    propList.push(`hoverDelayMilliseconds="${props.hoverDelayMilliseconds}"`);
  }
  if (props.mainAxisOffset !== 0) {
    propList.push(`mainAxisOffset="${props.mainAxisOffset}"`);
  }
  if (props.open) {
    propList.push(`open`);
  }
  if (props.placement !== 'top-start') {
    propList.push(`placement="${props.placement}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Tooltip } from '@geoffcox/sterling-svelte';
  
  let reference: HTMLElement;
</script>

<div bind:this={reference}>The reference anchor for positioning the callout.</div>

<Tooltip${propsText} {reference}>
  <div class="reference">The reference anchor for positioning the Tooltip.</div>
  <div class="tip-text" slot="tip">${props.text}</div>
</Tooltip>`;
};
