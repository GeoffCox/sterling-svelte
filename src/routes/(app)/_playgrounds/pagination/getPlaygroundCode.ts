export const getPlaygroundCode = (props: {
  _class: string;
  itemCount: number;
  pageSize: number;
  pageStep: number;
}) => {
  const propList: string[] = [];
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  propList.push(`itemCount="${props.itemCount}"`);

  propList.push(`bind:itemRange`);

  propList.push(`bind:page`);

  propList.push(`bind:pageCount`);

  propList.push(`pageSize="${props.pageSize}"`);

  if (props.pageStep) {
    propList.push(`pageStep="${props.pageStep}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Pagination } from '@geoffcox/sterling-svelte';

  let itemRange : {index: number; count: number} = $state();
  let page : number = $state();
  let pageCount : number = $state();
</script>

<Pagination${propsText} />
`;
};
