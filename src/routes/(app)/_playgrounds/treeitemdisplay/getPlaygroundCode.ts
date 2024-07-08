export const getPlaygroundCode = (props: {
  depth: number;
  disabled: boolean;
  expanded: boolean;
  hasChildren: boolean;
  selected: boolean;
  text: string;
  value: string;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.depth) {
    propList.push(`text="${props.depth}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.expanded) {
    propList.push(`expanded`);
  }
  if (props.hasChildren) {
    propList.push(`hasChildren`);
  }
  if (props.selected) {
    propList.push(`selected`);
  }
  if (props.text) {
    propList.push(`text="${props.text.trim()}"`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  if (props.hasChildren) {
    return `<script lang="ts">
    import { TreeItemDisplay } from '@geoffcox/sterling-svelte';
  </script>
  
  <TreeItemDisplay${propsText}>${props.text}</TreeItemDisplay>`;
  }

  return `<script lang="ts">
  import { TreeItem } from '@geoffcox/sterling-svelte';
</script>

<TreeItem${propsText} />
`;
};
