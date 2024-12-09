export const getPlaygroundCode = (props: {
  disabled: boolean | undefined | null;
  text: string;
  _class: string;
}) => {
  const propList: string[] = [];

  propList.push('bind:checked');

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Checkbox } from '@geoffcox/sterling-svelte';
</script>

<Checkbox${propsText}>${props.text}</Checkbox>`;
};
