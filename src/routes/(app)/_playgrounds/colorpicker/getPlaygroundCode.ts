export const getPlaygroundCode = (props: {
  colorFormat: string;
  colorText: string;
  disabled: boolean;
  open: boolean;
  sliderVariant: string;
  valueVariant: string;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.colorFormat !== 'hex') {
    propList.push(`colorFormat="${props.colorFormat}"`);
  }
  if (props.colorText !== '#000000') {
    propList.push(`colorText="${props.colorText}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.open) {
    propList.push(`open`);
  }
  if (props.sliderVariant) {
    propList.push(`sliderVariant="${props.sliderVariant.trim()}"`);
  }
  if (props.valueVariant) {
    propList.push(`valueVariant="${props.valueVariant.trim()}"`);
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
