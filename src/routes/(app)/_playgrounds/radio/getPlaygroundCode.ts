export const getPlaygroundCode = (props: {
  disabled: boolean | null | undefined;
  name: string;
  text: string;
  value: string;
  variant: string;
}) => {
  const propList: string[] = [];
  propList.push(`bind:group={selectedValue}`);
  if (props.name) {
    propList.push(`name="${props.name.trim()}"`);
  }
  if (props.variant) {
    propList.push(`class="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Radio } from '@geoffcox/sterling-svelte';

  let selectedValue : string;
</script>

<Radio${propsText} value="item-1">Item 1</Radio>
<Radio${props.disabled ? ' disabled' : ''}${propsText} value="item-2">${props.text}</Radio>
<Radio${propsText} value="item-3">Item 3</Radio>`;
};
