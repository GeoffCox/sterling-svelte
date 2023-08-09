<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import { LINK_VARIANTS, type ButtonShape, type ButtonVariant } from '$lib';
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Label from '$lib/Label.svelte';
  import Link from '$lib/Link.svelte';
  import type { LinkVariant } from '$lib/Link.types';

  let exampleRef: any;
  let disabled = false;
  let colorful = false;
  let variant: LinkVariant = 'regular';
  let withIcon = true;
  let withText = true;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <Link {colorful} {disabled} href="#" {variant} on:click={() => exampleRef.recordEvent('click')}>
      {#if withIcon}
        <SvelteIcon />
      {/if}
      {#if withText}
        sterling-svelte
      {/if}
    </Link>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="variant" forwardClick>
      <Select bind:selectedValue={variant}>
        {#each LINK_VARIANTS as linkVariant}
          <ListItem value={linkVariant}>{linkVariant}</ListItem>
        {/each}
      </Select>
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={withText}>with text</Checkbox>
    <Checkbox bind:checked={withIcon}>with icon</Checkbox>
  </svelte:fragment>
</Playground>
