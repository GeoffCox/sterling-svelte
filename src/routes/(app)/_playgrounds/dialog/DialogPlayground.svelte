<script lang="ts">
  import SvelteIcon from '../../_shared/icons/SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import Button from '$lib/Button.svelte';
  import Dialog from '$lib/Dialog.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';

  let open = false;
  let returnValue = '';

  $: code = '';

  const showDialog = () => {
    open = true;
  };
</script>

<Playground {code}>
  <div class="component" slot="component">
    <Button on:click={() => showDialog()}>Open form submit dialog</Button>
    <Dialog
      bind:open
      bind:returnValue
      on:cancel={() => console.log('cancel')}
      on:close={() => console.log('close')}
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
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0;
  }
</style>
