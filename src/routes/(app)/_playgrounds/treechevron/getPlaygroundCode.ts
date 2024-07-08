export const getPlaygroundCode = (props: {
  expanded: boolean;
  hasChildren: boolean;
  variant: string;
}) => {
  const propList: string[] = [];
  if (props.expanded) {
    propList.push('expanded');
  }
  if (props.hasChildren) {
    propList.push('hasChildren');
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { TreeChevron } from '@geoffcox/sterling-svelte';
</script>

<TreeChevron${propsText} />`;
};
