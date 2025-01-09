import type { PopoverPlacement } from '$lib';

export const getPlaygroundCode = (props: {
  _class: string;
  crossAxisOffset: number;
  disabled: boolean;
  hoverDelayMilliseconds: number;
  mainAxisOffset: number;
  open: boolean;
  placement: PopoverPlacement;
  text: string;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
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

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Tooltip } from '@geoffcox/sterling-svelte';
</script>

<Tooltip${propsText} {reference}>
  <!-- TODO: the reference element -->
  {#snippet tip()}
    <!-- TODO: the tip content -->
  {/snippet}
</Tooltip>`;
};
