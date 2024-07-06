export const getPlaygroundCode = (props: {
  disabled: boolean;
  menuVariant: string;
  open: boolean;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.menuVariant) {
    propList.push(`menuVariant="${props.menuVariant.trim()}"`);
  }
  if (props.open) {
    propList.push(`open`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
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
