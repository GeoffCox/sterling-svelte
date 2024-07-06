import type { PopoverPlacement } from '$lib';

export const getPlaygroundCode = (props: {
  crossAxisOffset: number;
  mainAxisOffset: number;
  placement: PopoverPlacement;
  text: string;
  variant: string;
}) => {
  const propList: string[] = [];
  if (props.placement !== 'top-start') {
    propList.push(`placement="${props.placement}"`);
  }
  if (props.crossAxisOffset !== 0) {
    propList.push(`crossAxisOffset="${props.crossAxisOffset}"`);
  }
  if (props.mainAxisOffset !== 0) {
    propList.push(`mainAxisOffset="${props.mainAxisOffset}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Callout } from '@geoffcox/sterling-svelte';
  
  let reference: HTMLElement;
</script>

<div bind:this={reference}>The reference anchor for positioning the popover.</div>

<Callout${propsText} {reference}>${props.text}</Callout>`;
};
