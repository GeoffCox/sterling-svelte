export const getPlaygroundCode = (props: {
  disabled: boolean;
  href: string;
  text: string;
  withIcon: boolean;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.href) {
    propList.push(`href="${props.href}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Link } from '@geoffcox/sterling-svelte';
</script>

<Link${propsText}>
  ${props.withIcon ? '<SterlingIcon/>' : ''}${props.text}
</Link>
`;
};
