export const getPlaygroundCode = (props: {
  _class: string;
  disabled: boolean;
  max: number;
  min: number;
  precision: number | undefined;
  step: number;
  vertical: boolean;
}) => {
  const propList: string[] = [];
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
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
  if (props.vertical) {
    propList.push(`vertical`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Slider } from '@geoffcox/sterling-svelte';

  let value = $state(0);
</script>

<Slider${propsText} bind:value />
`;
};
