export const getPlaygroundCode = (props: {
  disabled: boolean;
  max: number;
  min: number;
  precision: number | undefined;
  step: number;
  value: number;
  variant: string;
  vertical: boolean;
}) => {
  const propList: string[] = [];
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.max !== 100) {
    propList.push(`max="${props.max}"`);
  }
  if (props.min !== 0) {
    propList.push(`min="${props.min}"`);
  }
  if (props.step !== 1) {
    propList.push(`step="${props.step}"`);
  }
  if (props.precision) {
    propList.push(`precision="${props.precision}"`);
  }
  if (props.value !== 0) {
    propList.push(`value="${props.value}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }
  if (props.vertical) {
    propList.push(`vertical`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Slider } from '@geoffcox/sterling-svelte';

</script>

<Slider${propsText} />
`;
};
