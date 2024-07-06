export const getPlaygroundCode = (props: {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  variant: string;
}) => {
  const propList: string[] = [];
  if (props.hue !== 180) {
    propList.push(`hue="${props.hue}"`);
  }
  if (props.saturation !== 100) {
    propList.push(`saturation="${props.saturation}"`);
  }
  if (props.lightness !== 50) {
    propList.push(`lightness="${props.lightness}"`);
  }

  if (props.alpha !== 1) {
    propList.push(`alpha="${props.alpha}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { HslColorSliders } from '@geoffcox/sterling-svelte';
</script>

<HslColorSliders${propsText} />
`;
};
