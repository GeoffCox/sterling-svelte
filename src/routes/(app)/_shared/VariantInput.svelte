<script lang="ts">
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import MenuButton from '$lib/MenuButton.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';

  export let labelText = 'class';

  export let variant: string = '';

  export let availableVariants: string[];

  const addVariant = (value: string) => {
    variant += ` ${value}`;
  };

  const clear = () => {
    variant = '';
  };
</script>

<Label text={labelText} for="variant-input">
  <div class="variant-input">
    <Input id="variant-input" bind:value={variant} />
    <MenuButton
      value="variants"
      title="+Sterling Theme Variant"
      disabled={availableVariants.length === 0}
    >
      +
      <svelte:fragment slot="items">
        {#each availableVariants as option}
          <MenuItem value={option} text={option} on:select={() => addVariant(option)} />
        {/each}
        <MenuSeparator />
        <MenuItem value="clear" text="clear" on:select={() => clear()} />
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
