<script lang="ts">
  import { onMount } from 'svelte';

  import Example from '../Example.svelte';

  import Button from '$lib/Button.svelte';
  import Dialog from '$lib/Dialog.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';

  let exampleRef: any;

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

<Example bind:this={exampleRef}>
  <div class="component" slot="component">
    <Button on:click={() => showDialog()}>Open form submit dialog</Button>
    <Dialog
      bind:open
      bind:returnValue
      on:cancel={() => exampleRef.recordEvent('cancel')}
      on:close={() => exampleRef.recordEvent('close')}
    >
      <div slot="title">Outside or Inside?</div>
      <div slot="body">
        <div class="content">
          <div>The weather is sunny with no chance of rain. What would you like to do?</div>
          <Select>
            <ListItem value="1">Go outside</ListItem>
            <ListItem value="2">Stay inside</ListItem>
            <ListItem value="3">Take a nap in a hammock</ListItem>
          </Select>
        </div>
      </div>
      <div class="footer" slot="footer">
        <Button type="submit" value="yes">Yes</Button>
        <Button type="submit" value="no">No</Button>
        <Button autofocus type="submit" value="">Cancel</Button>
      </div>
    </Dialog>
  </div>
</Example>

<style>
  .content {
    max-width: 450px;
  }

  .footer {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: flex-end;
    justify-items: stretch;
    column-gap: 0.5em;
  }

  .footer :global(button) {
    min-width: 100px;
  }
</style>
