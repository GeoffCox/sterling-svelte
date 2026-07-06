import type { PopoverPlacement } from '$lib';

export const getPlaygroundCode = (props: {
  _class: string;
  disabled: boolean;
  hoverDelayMilliseconds: number;
  placement: PopoverPlacement;
  text: string;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.hoverDelayMilliseconds !== 0) {
    propList.push(`hoverDelayMilliseconds="${props.hoverDelayMilliseconds}"`);
  }
  if (props.placement) {
    propList.push(`placement="${props.placement}"`);
  }

  const propsText = propList.length > 0 ? `${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Tooltip2 } from '@geoffcox/sterling-svelte';
</script>

<Tooltip2 ${propsText} >
  <div>
    <!-- TODO: the content -->
  </div>
  {#snippet tip()}
    <!-- TODO: the tip -->
  {/snippet}
</Tooltip2>`;
};
