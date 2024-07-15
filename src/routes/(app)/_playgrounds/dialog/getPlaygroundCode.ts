export const getPlaygroundCode = (props: {
  backdropCloses: boolean;
  formSubmit: boolean;
  variant: string;
}) => {
  const propList: string[] = [];

  if (props.backdropCloses) {
    propList.push('backdropCloses');
  }

  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  const handlerCode = props.formSubmit
    ? ''
    : ` 
  const onOK = () => {
    returnValue = 'OK';
    open = false;
  };

  const onCancel = () => {
    returnValue = '';
    open = false;
  };`;

  const actionCode = props.formSubmit
    ? `      <Button type="submit" value="OK">OK</Button>
      <Button type="submit" value="">Cancel</Button>`
    : `      <Button on:click={() => onOK()}>OK</Button>
      <Button on:click={() => onCancel()}>Cancel</Button>`;

  return `<script lang="ts">
  import { Button, Dialog } from '@geoffcox/sterling-svelte';

  let open = false;
  let returnValue = '';${handlerCode}
</script>

<Button on:click={() => open = true}>Open</Button>
<Dialog bind:open bind:returnValue${propsText}>
  <svelte:fragment slot="title">
    <!-- TODO: Add dialog title -->
    </svelte:fragment>
  <svelte:fragment slot="body">
    <!-- TODO: Add dialog content -->
  </svelte:fragment>
  <svelte:fragment slot="footer">
${actionCode}
  </svelte:fragment>
</Dialog>`;
};
