<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import type { ButtonShape, ButtonVariant } from '$lib';
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';

  let exampleRef: any;

  const buttonVariants: ButtonVariant[] = ['regular', 'outline', 'ghost'];
  let buttonVariantIndex = 0;
  $: buttonVariant = buttonVariants[buttonVariantIndex];

  const buttonShapes: ButtonShape[] = ['circular', 'rounded', 'square'];
  let buttonShapeIndex = 1;
  $: buttonShape = buttonShapes[buttonShapeIndex];

  let buttonDisabled = false;
  let buttonWithText = true;
  let buttonWithIcon = true;
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
    <Select items={buttonShapes} bind:selectedIndex={buttonShapeIndex}>
      <span slot="label">shape</span>
    </Select>
    <Select items={buttonVariants} bind:selectedIndex={buttonVariantIndex}>
      <span slot="label">variant</span>
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
