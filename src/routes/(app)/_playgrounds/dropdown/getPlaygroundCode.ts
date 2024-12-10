export const getPlaygroundCode = (props: {
  disabled?: boolean | null | undefined;
  stayOpenOnClickAway?: boolean | null | undefined;
  _class?: string;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  if (props.disabled) {
    propList.push(`disabled`);
  }

  propList.push('bind:open');

  if (props.stayOpenOnClickAway) {
    propList.push(`stayOpenOnClickAway`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Dropdown } from '@geoffcox/sterling-svelte';
</script>

<Dropdown${propsText}>
  {#snippet value()}
    <!-- TODO: value display -->
  {/snippet}
  {#snippet content()}
    <!-- TODO: dropdown content -->
  {/snippet}
</Dropdown>`;
};
