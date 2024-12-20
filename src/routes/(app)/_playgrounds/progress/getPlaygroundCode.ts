import type { ProgressOrientation } from '$lib';

export const getPlaygroundCode = (props: {
  disabled: boolean | null | undefined;
  max: number;
  value: number;
  _class: string;
  orientation: ProgressOrientation;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.max !== 0) {
    propList.push(`max="${props.max}"`);
  }
  if (props.value !== 0) {
    propList.push(`value="${props.value}"`);
  }
  if (props.orientation) {
    propList.push(`orientation="${props.orientation}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Progress } from '@geoffcox/sterling-svelte';
</script>

<Progress${propsText} />
`;
};
