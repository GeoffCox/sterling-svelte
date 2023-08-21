<script lang="ts">
  import SvelteIcon from '../../SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';

  let exampleRef: any;
  let disabled = false;
  let variant: string = '';
  let withIcon = true;
  let withText = true;

  const addVariantPreset = (preset: string) => {
    if (!variant.includes(preset)) {
      const newVariant = `${variant} ${preset}`;
      variant = newVariant.trim();
    } else {
      variant = variant.replace(preset, '');
    }
  };
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <Button
      variantClass="colorful"
      {disabled}
      {variant}
      on:click={() => exampleRef.recordEvent('click')}
    >
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
    <Label text="variant" forwardClick>
      <Input bind:value={variant} />
      <div class="variant-presets">
        <Button variant="capsule tool" on:click={() => addVariantPreset('colorful')}
          >colorful</Button
        >
        <Button variant="capsule tool" on:click={() => addVariantPreset('secondary')}
          >secondary</Button
        >
        <Button variant="capsule tool" on:click={() => addVariantPreset('tool')}>tool</Button>
        <Button variant="capsule tool" on:click={() => addVariantPreset('capsule')}>capsule</Button>
        <Button variant="capsule tool" on:click={() => addVariantPreset('circular')}
          >circular</Button
        >
        <Button variant="capsule tool" on:click={() => addVariantPreset('square')}>square</Button>
      </div>
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
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

  .variant-presets {
    display: flex;
    justify-items: start;
    font-size: 0.7em;
  }
</style>
