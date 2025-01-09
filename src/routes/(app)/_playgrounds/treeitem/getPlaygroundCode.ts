export const getPlaygroundCode = (props: {
  class: string;
  disabled: boolean;
  hasChildren: boolean;
  label: string;
  value: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.label) {
    propList.push(`label="${props.label.trim()}"`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
  }
  if (props.class) {
    propList.push(`class="${props.class.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  if (props.hasChildren) {
    return `<script lang="ts">
    import { TreeItem } from '@geoffcox/sterling-svelte';
  </script>
  
  <TreeItem${propsText}>
    <TreeItem value="child1" text="Child 1"/>
    <!-- ... -->
  </TreeItem>
  `;
  }

  return `<script lang="ts">
  import { TreeItem } from '@geoffcox/sterling-svelte';
</script>

<TreeItem${propsText} />
`;
};
