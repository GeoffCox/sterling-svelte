export const getPlaygroundCode = (props: {
  _class: string;
  disabled: boolean | null | undefined;
  menuClass: string;
  open: boolean | null | undefined;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.menuClass) {
    propList.push(`menuClass="${props.menuClass.trim()}"`);
  }
  if (props.open) {
    propList.push(`open`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { MenuButton } from '@geoffcox/sterling-svelte';
</script>

<MenuButton${propsText}>
  <!-- button content -->
  {#snippet items()}
    <!-- <MenuItem> ... -->
  {/snippet}
</MenuButton>
`;
};
