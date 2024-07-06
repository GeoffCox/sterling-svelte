export const getPlaygroundCode = (props: {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  variant: string;
}) => {
  const propList: string[] = [];
  if (props.red !== 0) {
    propList.push(`red="${props.red}"`);
  }
  if (props.blue !== 0) {
    propList.push(`blue="${props.blue}"`);
  }
  if (props.green !== 0) {
    propList.push(`green="${props.green}"`);
  }
  if (props.alpha !== 255) {
    propList.push(`alpha="${props.alpha}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { HexColorSliders } from '@geoffcox/sterling-svelte';
</script>

<HexColorSliders${propsText} />
`;
};
