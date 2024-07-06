import type { ProgressStatus } from '$lib';

export const getPlaygroundCode = (props: {
  disabled: boolean;
  max: number;
  percent: number;
  status: ProgressStatus;
  value: number;
  variant: string;
  vertical: boolean;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.max !== 0) {
    propList.push(`max="${props.max}"`);
  }
  if (props.percent !== 0) {
    propList.push(`percent="${props.percent}"`);
  }
  if (props.status !== 'none') {
    propList.push(`status="${props.status}"`);
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
  import { Progress } from '@geoffcox/sterling-svelte';
</script>

<Progress${propsText} />
`;
};
