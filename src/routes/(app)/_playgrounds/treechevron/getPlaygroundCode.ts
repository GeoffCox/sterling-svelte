export const getPlaygroundCode = (props: {
  expanded: boolean;
  hasChildren: boolean;
  _class: string;
}) => {
  const propList: string[] = [];
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.expanded) {
    propList.push('expanded');
  }
  if (props.hasChildren) {
    propList.push('hasChildren');
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { TreeChevron } from '@geoffcox/sterling-svelte';
</script>

<TreeChevron${propsText} />`;
};
