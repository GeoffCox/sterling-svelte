<script lang="ts">
  import Playground from '../Playground.svelte';

  import Button from '$lib/Button.svelte';
  import Dialog from '$lib/Dialog.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import { tick } from 'svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';
  import VariantInput from '../../_shared/VariantInput.svelte';

  const options = [
    { value: 'outside', text: 'Go outside and play' },
    { value: 'inside', text: 'Stay inside where it is cool' },
    { value: 'hammock', text: 'Take a nap in a hammock in the shade' },
    { value: 'boat', text: 'Put the boat in the lake' },
    { value: 'garden', text: 'Do some gardening' }
  ];

  let backdropCloses = false;
  let open = false;
  let returnValue = '';
  let variant = '';

  let formSubmit = false;

  let selectedValue = options[0].value;

  const showDialog = () => {
    open = true;
  };

  const onOK = () => {
    open = false;
    returnValue = 'OK';
  };

  const onCancel = () => {
    open = false;
    returnValue = '';
  };

  const onClose = async () => {
    await tick();
    console.log(`<Dialog> onClose returnValue:${returnValue} selectedValue:${selectedValue}`);
  };

  $: code = getPlaygroundCode({ backdropCloses, formSubmit, variant });
</script>

<Playground {code}>
  <div class="component" slot="component">
    <Button on:click={() => showDialog()}>Open</Button>
    <Dialog
      {backdropCloses}
      bind:open
      bind:returnValue
      on:submit
      on:cancel={() => console.log('<Dialog> on:cancel')}
      on:close={onClose}
    >
      <div slot="title">What to do today?</div>
      <div slot="body">
        <div class="content">
          <p>The weather is sunny with no chance of rain.</p>
          <p>What would you like to do?</p>
          <Select bind:selectedValue>
            <svelte:fragment slot="value" let:selectedValue
              >{options.find((x) => x.value === selectedValue)?.text}</svelte:fragment
            >
            {#each options as option}
              <ListItem value={option.value}>{option.text}</ListItem>
            {/each}
          </Select>
        </div>
      </div>
      <div class="footer" slot="footer">
        {#if formSubmit}
          <Button type="submit" value="OK">OK</Button>
          <Button type="submit" value="">Cancel</Button>
        {:else}
          <Button on:click={() => onOK()}>OK</Button>
          <Button on:click={() => onCancel()}>Cancel</Button>
        {/if}
      </div>
    </Dialog>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={backdropCloses}>backdropCloses</Checkbox>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={formSubmit}>Use form submit</Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    justify-items: flex-end;
    column-gap: 0.5em;
  }
</style>
