export const getPlaygroundCode = (props: {
  disabled: boolean;
  variant: string;
  vertical: boolean;
}) => {
  const propList: string[] = [];
  propList.push('bind:selectedValue');
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }
  if (props.vertical) {
    propList.push(`vertical`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { TabList, Tab } from '@geoffcox/sterling-svelte';

  let selectedValue : string;
</script>


<TabList${propsText}>
  <Tab value="First">First</Tab>
  <Tab value="Second">Second</Tab>
  <Tab value="Third">Third</Tab>
  <Tab value="Fourth">Fourth</Tab>
</TabList>
`;
};
