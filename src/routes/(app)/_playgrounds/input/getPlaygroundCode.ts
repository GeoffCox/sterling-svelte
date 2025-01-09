export const getPlaygroundCode = (props: {
  disabled: boolean | null;
  placeholder: string;
  text: string;
  _class: string;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.placeholder) {
    propList.push(`placeholder="${props.placeholder}"`);
  }

  propList.push(`bind:value`);

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
