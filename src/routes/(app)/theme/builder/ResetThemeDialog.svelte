<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Button from '$lib/Button.svelte';
  import Dialog from '$lib/Dialog.svelte';
  import Radio from '$lib/Radio.svelte';

  export let open = false;
  export let resetToTheme = 'light';

  let dialogRef: Dialog;

  const dispatcher = createEventDispatcher();

  const raiseClose = (returnValue: string) => {
    dispatcher('close', { returnValue });
  };

  const onConfirm = () => {
    open = false;
    raiseClose(resetToTheme);
  };

  const onCancel = () => {
    open = false;
    raiseClose('');
  };
</script>

<Dialog bind:this={dialogRef} bind:open>
  <div slot="header">
    <h2>Reset theme</h2>
  </div>
  <div class="body" slot="body">
    <div class="theme-options">
      <Radio value="light" bind:group={resetToTheme}>Light theme</Radio>
      <Radio value="dark" bind:group={resetToTheme}>Dark theme</Radio>
    </div>
    <p class="warning">You will lose any theme changes by resetting.</p>
  </div>
  <div slot="footer">
    <Button on:click={onCancel} autoFocus>Cancel</Button>
    <Button on:click={onConfirm}>OK</Button>
  </div>
</Dialog>

<style>
  .body {
    min-width: 500px;
  }

  .theme-options {
    display: grid;
    grid-template-columns: auto;
    row-gap: 1em;
  }

  .warning {
    margin-top: 1em;
    color: var(--stsv-status--warning__color);
    background-color: var(--stsv-status--warning__background-color);
    border-color: var(--stsv-status--warning__border-color);
    border-width: var(--stsv-common__border-width);
    border-style: var(--stsv-common__border-style);
    padding: 0.5em;
  }
</style>
