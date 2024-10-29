export const getPlaygroundCode = (props: {
  disabled: boolean | null | undefined;
  menuVariant: string;
  open: boolean | null | undefined;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.menuVariant) {
    propList.push(`menuClass="${props.menuVariant.trim()}"`);
  }
  if (props.open) {
    propList.push(`open`);
  }
  if (props.variant) {
    propList.push(`class="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { MenuButton } from '@geoffcox/sterling-svelte';
</script>

<MenuButton${propsText}>
  <!-- <MenuItem> ... -->
</MenuButton>
`;
};
