export const getPlaygroundCode = (props: {
  disabled: boolean;
  variant: string;
  withIcon: boolean;
  text: string;
}) => {
  const propList: string[] = [];
  if (props.disabled) {
    propList.push('disabled');
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Button } from '@geoffcox/sterling-svelte';
</script>

<Button${propsText}>
  ${props.withIcon ? '<SterlingIcon/>' : ''}${props.text}
</Button>
`;
};
