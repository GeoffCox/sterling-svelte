<script lang="ts">
  import Example from '../Example.svelte';

  import Button from '$lib/buttons/Button.svelte';
  import Dialog from '$lib/surfaces/Dialog.svelte';
  import Radio from '$lib/inputs/Radio.svelte';

  let exampleRef: any;

  let open = false;
  let delivery = 'standard';
  let message = '';

  const showDialog = () => {
    open = true;
  };

  const closeDialog = () => {
    open = false;
    message = '';
  };

  const updateMessage = () => {
    switch (delivery) {
      case 'standard':
        message = 'Sent with standard mail!';
        break;
      case 'commercial':
        message = 'Sent by commercial carrier!';
        break;
      case 'drone':
        message = 'Dropped on your doorstep by our drone army!';
        break;
    }
  };
</script>

<Example bind:this={exampleRef}>
  <div class="component" slot="component">
    <Button on:click={() => showDialog()}>Open dialog</Button>
    <Dialog bind:open>
      <div slot="title">How would you like your product delivered?</div>
      <div slot="body">
        <div class="mail-options">
          <Radio value="standard" bind:group={delivery}
            ><span slot="label">Standard Mail</span></Radio
          >
          <Radio value="commercial" bind:group={delivery}
            ><span slot="label">Commercial Carrier</span></Radio
          >
          <Radio value="drone" bind:group={delivery}><span slot="label">Drone</span></Radio>
        </div>
        {#if message}
          <div class="message">{message}</div>
        {/if}
      </div>
      <div slot="footer">
        <Button on:click={() => updateMessage()}>Send it now!</Button>
        <Button autofocus on:click={() => closeDialog()}>Done</Button>
      </div>
    </Dialog>
  </div>
  <div class="options" slot="options" />
</Example>

<style>
  .mail-options {
    max-width: 450px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 0.5em;
  }

  .message {
    margin-top: 1em;
  }
</style>
