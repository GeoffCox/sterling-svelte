<svelte:options runes={true} />

<script lang="ts">
  import Playground from '../Playground.svelte';

  import Button from '$lib/Button.svelte';
  import Dialog from '$lib/Dialog.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import { tick } from 'svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';
  import VariantInput from '../../_shared/ClassInput.svelte';

  const options = [
    { value: 'outside', text: 'Go outside and play' },
    { value: 'inside', text: 'Stay inside where it is cool' },
    { value: 'hammock', text: 'Take a nap in a hammock in the shade' },
    { value: 'boat', text: 'Put the boat in the lake' },
    { value: 'garden', text: 'Do some gardening' }
  ];

  let backdropCloses: boolean | null | undefined = $state(false);
  let open: boolean | null | undefined = $state(false);
  let returnValue = $state('');
  let _close = $state('');

  let formSubmit: boolean | null | undefined = $state(false);

  let selectedValue = $state(options[0].value);

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

  const onDialogCancel = async () => {
    await tick();
    console.log(`Dialog oncancel returnValue:${returnValue} selectedValue:${selectedValue}`);
  };

  const onDialogClose = async () => {
    await tick();
    console.log(`Dialog onclose returnValue:${returnValue} selectedValue:${selectedValue}`);
  };

  let code = $derived(getPlaygroundCode({ backdropCloses, formSubmit, _class: _close }));
</script>

<Playground {code}>
  {#snippet component()}
    <Button onclick={() => showDialog()}>Open</Button>
    <Dialog
      {backdropCloses}
      bind:open
      bind:returnValue
      headerTitle="What to do today?"
      oncancel={onDialogCancel}
      onclose={onDialogClose}
    >
      {#snippet body()}
        <div class="content">
          <p>The weather is sunny with no chance of rain.</p>
          <p>What would you like to do?</p>
          <Select bind:selectedValue>
            {#snippet value()}
              <span>{options.find((x) => x.value === selectedValue)?.text}</span>
            {/snippet}
            {#each options as option}
              <ListItem value={option.value}>{option.text}</ListItem>
            {/each}
          </Select>
        </div>
      {/snippet}
      {#snippet footer()}
        <div class="footer">
          {#if formSubmit}
            <Button type="submit" value="OK">OK</Button>
            <Button type="submit" value="">Cancel</Button>
          {:else}
            <Button onclick={() => onOK()}>OK</Button>
            <Button onclick={() => onCancel()}>Cancel</Button>
          {/if}
        </div>
      {/snippet}
    </Dialog>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={backdropCloses}>backdropCloses</Checkbox>
    <VariantInput bind:class={_close} sterlingClasses={[]} />
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={formSubmit}>Use form submit</Checkbox>
  {/snippet}
</Playground>

<style>
  .footer {
    display: flex;
    justify-content: flex-end;
    justify-items: flex-end;
    column-gap: 0.5em;
  }
</style>
