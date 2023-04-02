<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import type { ButtonShape, ButtonVariant } from '$lib';

  import { BUTTON_SHAPES, BUTTON_VARIANTS } from '$lib';

  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Field from '$lib/Field.svelte';

  let exampleRef: any;
  let disabled = false;
  let shape: ButtonShape = 'rounded';
  let variant: ButtonVariant = 'regular';
  let withIcon = true;
  let withText = true;
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Button {disabled} {shape} {variant} on:click={() => exampleRef.recordEvent('click')}>
      {#if withIcon}
        <SvelteIcon />
      {/if}
      {#if withText}
        sterling-svelte
      {/if}
    </Button>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Field label="shape" forwardClick>
      <Select bind:selectedValue={shape} composed>
        {#each BUTTON_SHAPES as variantItem}
          <ListItem value={variantItem}>{variantItem}</ListItem>
        {/each}
      </Select>
    </Field>
    <Field label="variant" forwardClick>
      <Select bind:selectedValue={variant} composed>
        {#each BUTTON_VARIANTS as variantItem}
          <ListItem value={variantItem}>{variantItem}</ListItem>
        {/each}
      </Select>
    </Field>
  </svelte:fragment>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={withText}>with text</Checkbox>
    <Checkbox bind:checked={withIcon}>with icon</Checkbox>
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
