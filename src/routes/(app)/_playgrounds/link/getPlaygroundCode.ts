export const getPlaygroundCode = (props: {
  _class: string;
  disabled: boolean | undefined | null;
  href: string;
  text: string;
  withIcon: boolean | undefined | null;
}) => {
  const propList: string[] = [];

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.href) {
    propList.push(`href="${props.href}"`);
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
