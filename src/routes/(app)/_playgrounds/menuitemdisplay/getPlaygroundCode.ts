import type { MenuItemRole } from '$lib';

export const getPlaygroundCode = (props: {
  checked: boolean;
  disabled: boolean;
  hasChildren: boolean;
  isMenuBarItem: boolean;
  menuItemRole: MenuItemRole;
  text: string;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.checked) {
    propList.push(`checked`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.hasChildren) {
    propList.push(`hasChildren`);
  }
  if (props.isMenuBarItem) {
    propList.push(`isMenuBarItem`);
  }
  if (props.menuItemRole !== 'menuitem') {
    propList.push(`menuItemRole="${props.menuItemRole.trim()}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { MenuItemDisplay } from '@geoffcox/sterling-svelte';
</script>

<MenuItemDisplay${propsText}>
  ${props.text}
</MenuItemDisplay>
`;
};
