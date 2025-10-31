export const getPlaygroundCode = (props: {
  _class: string;
  horizontal: boolean;
  initialPrimarySize: string;
  minPrimarySize: string;
  minSecondarySize: string;
  resetOnDoubleClick: boolean;
}) => {
  const propList: string[] = [];
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  if (props.horizontal) {
    propList.push(`horizontal`);
  }

  if (props.initialPrimarySize) {
    propList.push(`initialPrimarySize="${props.initialPrimarySize.trim()}"`);
  }

  if (props.minPrimarySize) {
    propList.push(`initialPrimarySize="${props.minPrimarySize.trim()}"`);
  }

  if (props.minSecondarySize) {
    propList.push(`initialPrimarySize="${props.minSecondarySize.trim()}"`);
  }

  if (props.resetOnDoubleClick) {
    propList.push(`resetOnDoubleClicks`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Splitter } from '@geoffcox/sterling-svelte';
</script>

<Splitter${propsText} />
`;
};
