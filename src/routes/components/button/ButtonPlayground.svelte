<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import type { ButtonShape, ButtonVariant } from '$lib';
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Field from '$lib/Field.svelte';

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
        sterling-svelte
      {/if}
    </Button>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={buttonDisabled}>disabled</Checkbox>
    <Checkbox bind:checked={buttonWithText}>with text</Checkbox>
    <Checkbox bind:checked={buttonWithIcon}>with icon</Checkbox>
    <Field label="shape" forwardClick>
      <Select bind:selectedValue={buttonShape} composed>
        <ListItem value="circular">circular</ListItem>
        <ListItem value="rounded">rounded</ListItem>
        <ListItem value="square">square</ListItem>
      </Select>
    </Field>
    <Field label="variant" forwardClick>
      <Select bind:selectedValue={buttonVariant} composed>
        <ListItem value="ghost">ghost</ListItem>
        <ListItem value="outline">outline</ListItem>
        <ListItem value="regular">regular</ListItem>
      </Select>
    </Field>
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
</style>
