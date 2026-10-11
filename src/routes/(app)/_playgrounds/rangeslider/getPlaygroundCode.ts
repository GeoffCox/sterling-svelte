export const getPlaygroundCode = (props: {
  _class: string;
  disabled: boolean;
  max: number;
  min: number;
  precision: number | undefined;
  reverse: boolean;
  step: number;
  vertical: boolean;
}) => {
  const propList: string[] = [];
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  propList.push('bind:lowValue');
  propList.push('bind:highValue');

  if (props.min !== 0) {
    propList.push(`min="${props.min}"`);
  }
  if (props.max !== 100) {
    propList.push(`max="${props.max}"`);
  }
  if (props.reverse) {
    propList.push(`reverse`);
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
  if (props.disabled) {
    propList.push(`disabled`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { RangeSlider } from '@geoffcox/sterling-svelte';

  let lowValue = $state(0);
  let highValue = $state(0);
</script>

<RangeSlider${propsText}/>
`;
};
