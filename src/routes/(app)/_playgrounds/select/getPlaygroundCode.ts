export const getPlaygroundCode = (props: {
  disabled: boolean | undefined | null;
  open: boolean | undefined | null;
  listVariant: string;
  variant: string;
}) => {
  const propList: string[] = [];
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.open) {
    propList.push(`open`);
  }
  if (props.listVariant) {
    propList.push(`listVariant="${props.listVariant.trim()}"`);
  }
  propList.push('bind:selectedValue');
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Select, ListItem } from '@geoffcox/sterling-svelte';

  let selectedValue : string;
  let items = [/* list of items */];
</script>

<Select${propsText}>
  {#each items as item}
    <ListItem value={item} />
  {/each}
</Select>
`;
};
