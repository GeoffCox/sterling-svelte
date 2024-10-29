<svelte:options runes={true} />

<script lang="ts">
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import MenuButton from '$lib/MenuButton.svelte';
  import MenuItem from '$lib/MenuItem.svelte';
  import MenuSeparator from '$lib/MenuSeparator.svelte';

  type Props = {
    labelText?: string;
    availableVariants: string[];
    class?: string;
  };

  let { class: _class = $bindable(''), labelText = 'class', availableVariants }: Props = $props();

  const addVariant = (value: string) => {
    console.log('addVariant', value);
    _class += ` ${value}`;
  };

  const clear = () => {
    _class = '';
  };
</script>

{#snippet menuItems()}
  {#each availableVariants as option}
    <MenuItem value={option} text={option} onSelect={() => addVariant(option)} />
  {/each}
  <MenuSeparator />
  <MenuItem value="clear" text="clear" onSelect={() => clear()} />
{/snippet}

<Label text={labelText} for="variant-input">
  <div class="variant-input">
    <Input id="variant-input" bind:value={_class} />
    <MenuButton
      value="classes"
      title="+Sterling Theme"
      disabled={availableVariants.length === 0}
      items={menuItems}
    >
      +
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
