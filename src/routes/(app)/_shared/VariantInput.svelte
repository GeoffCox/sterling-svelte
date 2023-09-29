<script lang="ts">
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import MenuButton from '$lib/MenuButton.svelte';
  import MenuItem from '$lib/MenuItem.svelte';

  export let variant: string = '';

  export let availableVariants: string[];

  const addVariant = (value: string) => {
    variant += ` ${value}`;
  };
</script>

<Label text="variant" for="variant-input">
  <div class="variant-input">
    <Input id="variant-input" bind:value={variant} />
    <MenuButton value="variants" disabled={availableVariants.length === 0}>
      +
      <svelte:fragment slot="items">
        {#each availableVariants as option}
          <MenuItem value={option} text={option} on:select={() => addVariant(option)} />
        {/each}
      </svelte:fragment>
    </MenuButton>
  </div>
</Label>

<style>
  .variant-input {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
  }
</style>
