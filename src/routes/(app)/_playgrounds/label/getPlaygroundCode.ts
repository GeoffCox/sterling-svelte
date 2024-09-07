import type { LabelStatus } from '$lib';

export const getPlaygroundCode = (props: {
  forwardClick?: boolean | null;
  message: string;
  required?: boolean | null;
  requiredReason: string;
  status: LabelStatus;
  text: string;
  useFor?: boolean | null;
  variant: string;
  vertical?: boolean | null;
}) => {
  const propList: string[] = [];

  if (props.forwardClick) {
    propList.push(`forwardClick`);
  }
  if (props.message) {
    propList.push(`message="${props.message}"`);
  }
  if (props.required) {
    propList.push(`required`);
  }
  if (props.requiredReason) {
    propList.push(`requiredReason="${props.requiredReason}"`);
  }
  if (props.status !== 'none') {
    propList.push(`status="${props.status}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }
  if (!props.vertical) {
    propList.push(`vertical="${props.vertical}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  if (props.text) {
    return `<script lang="ts">
  import { Label } from '@geoffcox/sterling-svelte';
</script>

<Label${propsText}>${props.text}</Label>`;
  }

  return `<script lang="ts">
  import { Input } from '@geoffcox/sterling-svelte';
</script>

<Input${propsText} />`;
};
