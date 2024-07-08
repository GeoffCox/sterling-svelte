export const getPlaygroundCode = (props: { disabled: boolean; variant: string }) => {
  const propList: string[] = [];

  propList.push('bind:expandedValues');
  propList.push('bind:selectedValue');
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Tree } from '@geoffcox/sterling-svelte';

  let expandedValues: string[] = [];
  let selectedValue: string | undefined = undefined;
</script>

<Tree${propsText}>
  <!-- <TreeItem> ... -->
</List>
`;
};
