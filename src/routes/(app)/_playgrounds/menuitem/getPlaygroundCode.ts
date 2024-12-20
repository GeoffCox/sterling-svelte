import type { MenuItemRole } from '$lib';

export const getPlaygroundCode = (props: {
  checked: boolean | undefined | null;
  _class: string;
  disabled: boolean | undefined | null;
  menuClass: string;
  role: MenuItemRole;
  text: string;
  value: string;
}) => {
  const propList: string[] = [];

  if (props.checked) {
    propList.push(`checked`);
  }
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.menuClass) {
    propList.push(`menuClass="${props.menuClass.trim()}"`);
  }
  if (props.role && props.role !== 'menuitem') {
    propList.push(`role="${props.role.trim()}"`);
  }
  if (props.text) {
    propList.push(`text="${props.text.trim()}"`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
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
