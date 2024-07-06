export const getPlaygroundCode = (props: {
  disabled: boolean;
  open: boolean;
  stayOpenOnClickAway: boolean;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.open) {
    propList.push(`open`);
  }
  if (props.stayOpenOnClickAway) {
    propList.push(`stayOpenOnClickAway`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Dropdown } from '@geoffcox/sterling-svelte';
</script>

<Dropdown${propsText}>
  <svelte:fragment slot="value">
    // dropdown value
  </svelte:fragment>
  <div>
    // dropdown content
  </div>
</Dropdown>`;
};
