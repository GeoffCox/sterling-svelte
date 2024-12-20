export const getPlaygroundCode = (props: { _class: string }) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Menu } from '@geoffcox/sterling-svelte';
</script>

<Menu${propsText}>
  <!-- <MenuItem> ... -->
</Menu>
`;
};
