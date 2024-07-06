export const getPlaygroundCode = (props: {
  disabled: boolean;
  placeholder: string;
  text: string;
  value: string;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.placeholder) {
    propList.push(`placeholder="${props.placeholder}"`);
  }
  if (props.value) {
    propList.push(`value="${props.value}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  if (props.text) {
    return `<script lang="ts">
  import { Input } from '@geoffcox/sterling-svelte';
</script>

<Input${propsText}>${props.text}</Input>`;
  }

  return `<script lang="ts">
  import { Input } from '@geoffcox/sterling-svelte';
</script>

<Input${propsText} />`;
};
