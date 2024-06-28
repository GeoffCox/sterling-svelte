export const getPlaygroundCode = (props: {
  checked: boolean;
  disabled: boolean;
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
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Checkbox } from '@geoffcox/sterling-svelte';
</script>

<Checkbox${propsText}>${props.text}</Checkbox>`;
};
