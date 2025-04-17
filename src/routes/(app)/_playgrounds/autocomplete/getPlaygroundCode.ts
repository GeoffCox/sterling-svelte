export const getPlaygroundCode = (props: { _class: string }) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  propList.push(`bind:value`);

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Input } from '@geoffcox/sterling-svelte';
</script>

<Input${propsText} />`;
};
