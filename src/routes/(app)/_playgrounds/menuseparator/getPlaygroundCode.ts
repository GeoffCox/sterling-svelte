import type { MenuItemRole } from '$lib';

export const getPlaygroundCode = (props: { _class: string }) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`variant="${props._class.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { MenuSeparator } from '@geoffcox/sterling-svelte';
</script>

<MenuSeparator${propsText} />
`;
};
