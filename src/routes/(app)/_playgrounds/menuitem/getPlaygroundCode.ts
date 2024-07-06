import type { MenuItemRole } from '$lib';

export const getPlaygroundCode = (props: {
  checked: boolean;
  disabled: boolean;
  menuVariant: string;
  open: boolean;
  role: MenuItemRole;
  text: string;
  value: string;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.checked) {
    propList.push(`checked`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.menuVariant) {
    propList.push(`menuVariant="${props.menuVariant.trim()}"`);
  }
  if (props.open) {
    propList.push(`open`);
  }
  if (props.role) {
    propList.push(`role="${props.role.trim()}"`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
  }
  if (props.menuVariant) {
    propList.push(`menuVariant="${props.menuVariant.trim()}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { MenuItem } from '@geoffcox/sterling-svelte';
</script>

<MenuItem${propsText}>
  <!-- <MenuItem> ... -->
</MenuItem>
`;
};
