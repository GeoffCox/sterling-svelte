export const getPlaygroundCode = (props: { _class: string; disabled: boolean }) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  propList.push('bind:expandedValues');
  propList.push('bind:selectedValue');

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Tree } from '@geoffcox/sterling-svelte';

  let expandedValues: string[] = [];
  let selectedValue: string | undefined = undefined;
</script>

<Tree${propsText}>
  <!-- <TreeItem> ... -->
</List>
`;
};
