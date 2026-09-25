import type { Popover2Nonant } from '$lib';

export const getPlaygroundCode = (props: {
  _class: string;
  lightDismiss?: boolean;
  offsetX: number;
  offsetY: number;
  placement: Popover2Nonant;
  anchorOrigin: 'auto' | Popover2Nonant;
  text: string;
}) => {
  const propList: string[] = [];

  propList.push(`id="ExamplePopover"`);

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  propList.push(`{anchor}`);

  if (props.anchorOrigin && props.anchorOrigin !== 'auto') {
    propList.push(`anchorOrigin="${props.anchorOrigin}"`);
  }
  if (!props.lightDismiss) {
    propList.push(`lightDismiss="false"`);
  }
  if (props.offsetX !== undefined) {
    propList.push(`offsetX="${props.offsetX}"`);
  }
  if (props.offsetY !== undefined) {
    propList.push(`offsetY="${props.offsetY}"`);
  }
  if (props.placement) {
    propList.push(`placement="${props.placement}"`);
  }

  const propsText = propList.length > 0 ? `${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Popover2 } from '@geoffcox/sterling-svelte';

  let anchor = $state<HTMLDivElement>();
</script>

<div bind:this={anchor}>(anchor div)</div>

<Button popovertarget="ExamplePopover">Toggle</Button>

<Popover2 ${propsText}>
 ${props.text}
</Popover2>
`;
};
