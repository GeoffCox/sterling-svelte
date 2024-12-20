import type { PopoverPlacement } from '$lib';

export const getPlaygroundCode = (props: {
  crossAxisOffset: number;
  mainAxisOffset: number;
  open: boolean | undefined;
  placement: PopoverPlacement;
  text: string;
  _class: string;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.crossAxisOffset !== 0) {
    propList.push(`crossAxisOffset="${props.crossAxisOffset}"`);
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

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Callout } from '@geoffcox/sterling-svelte';
  
  let reference: HTMLElement;
</script>

<div bind:this={reference}>
  <!-- TODO: the reference element content -->
</div>

<Callout${propsText} {reference}>
  <!-- TODO: the callout content -->
</Callout>`;
};
