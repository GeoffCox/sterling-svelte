<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import type { ButtonShape, ButtonVariant } from '$lib';
  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Select from '$lib/Select.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Field from '$lib/Field.svelte';
  import Link from '$lib/Link.svelte';
  import type { LinkVariant } from '$lib/Link.types';

  let exampleRef: any;
  let disabled = false;
  let variant: LinkVariant = 'regular';
  let withIcon = true;
  let withText = true;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <Link {disabled} href="#" {variant} on:click={() => exampleRef.recordEvent('click')}>
      {#if withIcon}
        <SvelteIcon />
      {/if}
      {#if withText}
        sterling-svelte
      {/if}
    </Link>
  </svelte:fragment>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Field label="variant" forwardClick>
      <Select bind:selectedValue={variant} composed>
        <ListItem value="ghost">ghost</ListItem>
        <ListItem value="undecorated">undecorated</ListItem>
        <ListItem value="regular">regular</ListItem>
      </Select>
    </Field>
    <Checkbox bind:checked={withText}>with text</Checkbox>
    <Checkbox bind:checked={withIcon}>with icon</Checkbox>
  </svelte:fragment>
</Playground>
