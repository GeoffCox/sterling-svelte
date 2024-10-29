import type { ProgressStatus } from '$lib';

export const getPlaygroundCode = (props: {
  disabled: boolean | null | undefined;
  max: number;
  value: number;
  variant: string;
  vertical: boolean | null | undefined;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.max !== 0) {
    propList.push(`max="${props.max}"`);
  }
  if (props.value !== 0) {
    propList.push(`value="${props.value}"`);
  }
  if (props.variant) {
    propList.push(`class="${props.variant.trim()}"`);
  }
  if (props.vertical) {
    propList.push(`vertical`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Progress } from '@geoffcox/sterling-svelte';
</script>

<Progress${propsText} />
`;
};
