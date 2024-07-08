export const getPlaygroundCode = (props: {
  disabled: boolean;
  selected: boolean;
  text?: string;
  value: string;
  variant: string;
  vertical: boolean;
}) => {
  const propList: string[] = [];
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.selected) {
    propList.push(`selected`);
  }
  if (props.text) {
    propList.push(`text="${props.text.trim()}"`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }
  if (props.vertical) {
    propList.push(`vertical`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Tab } from '@geoffcox/sterling-svelte';
</script>

<Tab${propsText} />
`;
};
