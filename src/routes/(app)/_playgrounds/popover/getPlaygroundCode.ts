import type { PopoverPlacement } from '$lib';

export const getPlaygroundCode = (props: {
  _class: string;
  crossAxisOffset: number;
  mainAxisOffset: number;
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
  if (props.mainAxisOffset !== 0) {
    propList.push(`mainAxisOffset="${props.mainAxisOffset}"`);
  }
  if (props.placement !== 'top-start') {
    propList.push(`placement="${props.placement}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Popover } from '@geoffcox/sterling-svelte';

  let reference: HTMLElement;

</script>

<div bind:this={reference}>Anchor for the popover position.</div>

<Popover${propsText} bind:open {reference}>
  ${props.text}
</Popover>
`;
};
