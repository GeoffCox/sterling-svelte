export const getPlaygroundCode = (props: {
  disabled: boolean;
  horizontal: boolean;
  selectedValue?: string;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.horizontal) {
    propList.push(`horizontal`);
  }
  if (props.selectedValue) {
    propList.push(`selectedValue="${props.selectedValue}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { List } from '@geoffcox/sterling-svelte';
</script>

<List${propsText}>
  <!-- <ListItem> ... -->
</List>
`;
};
