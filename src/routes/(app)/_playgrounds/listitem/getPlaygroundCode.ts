export const getPlaygroundCode = (props: {
  disabled: boolean;
  text: string;
  value: string;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { ListItem } from '@geoffcox/sterling-svelte';
</script>

<ListItem${propsText}>${props.text}
</ListItem>
`;
};
