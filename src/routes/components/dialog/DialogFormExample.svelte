<script lang="ts">
  import { onMount } from 'svelte';

  import Playground from '../Playground.svelte';

  import Button from '$lib/buttons/Button.svelte';
  import Dialog from '$lib/surfaces/Dialog.svelte';

  let exampleRef: any;
  let formRef: HTMLFormElement;

  let open = false;
  let returnValue = '';
  let mounted = false;

  onMount(() => {
    mounted = true;
    return () => (mounted = false);
  });

  const showDialog = () => {
    open = true;
  };
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Button on:click={() => showDialog()}>Open dialog</Button>
    <Dialog
      bind:open
      bind:returnValue
      on:cancel={() => exampleRef.recordEvent('cancel')}
      on:close={() => exampleRef.recordEvent('close')}
    >
      <div slot="title">Outside or Inside?</div>
      <div slot="body">
        <div class="content">
          The weather is sunny with no chance of rain. Do you want to go outside and enjoy the fresh
          air?
        </div>
      </div>
      <div class="footer" slot="footer">
        <Button type="submit" value="yes">Yes</Button>
        <Button type="submit" value="no">No</Button>
        <Button autofocus type="submit" value="">Cancel</Button>
      </div>
    </Dialog>
  </div>
  <svelte:fragment slot="status">
    <div>returnValue: '{returnValue}'</div>
  </svelte:fragment>
</Playground>

<style>
  .content {
    max-width: 450px;
  }

  .footer {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    column-gap: 0.5em;
  }
</style>
