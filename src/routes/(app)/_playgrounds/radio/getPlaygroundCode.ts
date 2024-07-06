export const getPlaygroundCode = (props: {
  disabled: boolean;
  name: string;
  text: string;
  value: string;
  variant: string;
}) => {
  const propList: string[] = [];
  if (props.disabled) {
    propList.push(`disabled`);
  }
  propList.push(`bind:group={selectedValue}`);
  if (props.name) {
    propList.push(`name="${props.name.trim()}"`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Radio } from '@geoffcox/sterling-svelte';

  let selectedValue : string;
</script>

<Radio bind:group={selectedValue} name="${props.name}" value="item-1">Item 1</Radio>
<Radio${propsText}>${props.text}</Radio>
<Radio bind:group={selectedValue} name="${props.name}" value="item-3">Item 3</Radio>`;
};
