import type { Popover2AnchorOrigin, Popover2Placement } from '$lib';

export const getPlaygroundCode = (props: {
  _class: string;
  lightDismiss?: boolean;
  horizontalOffset: number;
  verticalOffset: number;
  placement: Popover2Placement;
  anchorOrigin: Popover2AnchorOrigin;
  text: string;
}) => {
  const propList: string[] = [];

  propList.push(`id="MyPopover"`);
  propList.push(`bind:open`);

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.horizontalOffset !== 0) {
    propList.push(`horizontalOffset="${props.horizontalOffset}"`);
  }
  if (props.verticalOffset !== 0) {
    propList.push(`verticalOffset="${props.verticalOffset}"`);
  }
  if (!props.lightDismiss) {
    propList.push(`lightDismiss="false"`);
  }
  if (props.placement) {
    propList.push(`placement="${props.placement}"`);
  }
  if (props.anchorOrigin) {
    propList.push(`anchorOrigin="${props.anchorOrigin}"`);
  }

  const propsText = propList.length > 0 ? `${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Popover2 } from '@geoffcox/sterling-svelte';

  let open = $state(false);
</script>

<div class="my-anchor">Anchor for the popover.</div>

<Button popovertarget="MyPopover">Toggle</Button>

<Popover2 ${propsText}>
 ${props.text}
</Popover2>
`;
};
