export const getPlaygroundCode = (props: {
  disabled?: boolean | null | undefined;
  lightDismiss?: boolean | null | undefined;
  _class?: string;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.lightDismiss !== true) {
    propList.push(`lightDismiss={${props.lightDismiss}}`);
  }

  propList.push('bind:open');

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Dropdown2 } from '@geoffcox/sterling-svelte';
</script>

<Dropdown2${propsText}>
  {#snippet value()}
    <!-- TODO: value display -->
  {/snippet}
    <!-- TODO: dropdown content -->
</Dropdown>`;
};
