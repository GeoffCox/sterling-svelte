export const getPlaygroundCode = (props: {
  _class: string;
  disabled: boolean;
  vertical: boolean;
}) => {
  const propList: string[] = [];
  propList.push('bind:selectedValue');
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
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
  <!-- ... --->
</TabList>
`;
};
