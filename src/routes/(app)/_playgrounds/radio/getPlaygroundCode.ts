export const getPlaygroundCode = (props: { _class: string; name: string }) => {
  const propList: string[] = [];
  propList.push(`bind:group={selectedValue}`);
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.name) {
    propList.push(`name="${props.name.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Radio } from '@geoffcox/sterling-svelte';

  let selectedValue : string = $state('item-1');
</script>

<Radio${propsText} value="item-1">Item 1</Radio>
<Radio${propsText} value="item-2">Item 1</Radio>
<Radio${propsText} value="item-3">Item 3</Radio>`;
};
