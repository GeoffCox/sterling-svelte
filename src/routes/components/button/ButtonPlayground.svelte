<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import type { ButtonShape, ButtonVariant } from '$lib';
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';

  let exampleRef: any;
  let buttonDisabled = false;
  let buttonShape: ButtonShape = 'rounded';
  let buttonVariant: ButtonVariant = 'regular';
  let buttonWithIcon = true;
  let buttonWithText = true;
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Button
      disabled={buttonDisabled}
      shape={buttonShape}
      variant={buttonVariant}
      on:click={() => exampleRef.recordEvent('click')}
    >
      {#if buttonWithIcon}
        <SvelteIcon />
      {/if}
      {#if buttonWithText}
        Sterling
      {/if}
    </Button>
  </div>
  <div class="options" slot="options">
    <Checkbox bind:checked={buttonDisabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={buttonWithText}><span slot="label">with text</span></Checkbox>
    <Checkbox bind:checked={buttonWithIcon}><span slot="label">with icon</span></Checkbox>
    <Select bind:selectedValue={buttonShape}>
      <span slot="label">shape</span>
      <ListItem value="circular">circular</ListItem>
      <ListItem value="rounded">rounded</ListItem>
      <ListItem value="square">square</ListItem>
    </Select>
    <Select bind:selectedValue={buttonVariant}>
      <span slot="label">variant</span>
      <ListItem value="ghost">ghost</ListItem>
      <ListItem value="outline">outline</ListItem>
      <ListItem value="regular">regular</ListItem>
    </Select>
  </div>
</Playground>

<style>
  .options {
    align-items: start;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }

  .component {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0;
  }
</style>
