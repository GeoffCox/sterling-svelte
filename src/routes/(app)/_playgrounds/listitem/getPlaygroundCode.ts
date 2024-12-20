export const getPlaygroundCode = (props: {
  _class: string;
  disabled: boolean;
  text: string;
  value: string;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { ListItem } from '@geoffcox/sterling-svelte';
</script>

<ListItem${propsText}>${props.text}</ListItem>`;
};
