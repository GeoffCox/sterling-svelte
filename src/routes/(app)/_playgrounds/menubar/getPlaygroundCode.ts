export const getPlaygroundCode = (props: { variant: string }) => {
  const propList: string[] = [];

  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { MenuBar } from '@geoffcox/sterling-svelte';
</script>

<MenuBar${propsText}>
  <!-- <MenuItem> ... -->
</MenuBar>
`;
};
