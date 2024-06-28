export const getPlaygroundCode = (props: {
  colorFormat: string;
  colorText: string;
  disabled: boolean;
  open: boolean;
  variant: string;
}) => {
  const propList: string[] = [];

  propList.push(`colorFormat="${props.colorFormat}"`);

  propList.push(`colorText="${props.colorText}"`);

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.open) {
    propList.push(`open`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { ColorPicker } from '@geoffcox/sterling-svelte';
</script>

<ColorPicker${propsText} />`;
};
