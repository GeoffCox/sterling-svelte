export const getPlaygroundCode = (props: {
  formValidation?: boolean | null;
  forwardClick?: boolean | null;
  message: string;
  required?: boolean | null;
  requiredReason: string;
  text: string;
  useFor?: boolean | null;
  variant: string;
  _class?: boolean | null;
}) => {
  const propList: string[] = [];

  if (!props._class) {
    propList.push(`vertical="${props._class}"`);
  }

  if (props.formValidation) {
    propList.push(`formValidation`);
  }

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
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
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
