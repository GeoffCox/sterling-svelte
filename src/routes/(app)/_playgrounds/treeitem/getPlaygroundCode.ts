export const getPlaygroundCode = (props: {
  disabled: boolean;
  hasChildren: boolean;
  text: string;
  value: string;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.disabled) {
    propList.push(`disabled`);
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
    import { TreeItem } from '@geoffcox/sterling-svelte';
  </script>
  
  <TreeItem${propsText}>
    <TreeItem value="child1" text="Child 1"/>
    <!-- TODO: Add more TreeItem children here -->
  </TreeItem>
  `;
  }

  return `<script lang="ts">
  import { TreeItem } from '@geoffcox/sterling-svelte';
</script>

<TreeItem${propsText} />
`;
};
