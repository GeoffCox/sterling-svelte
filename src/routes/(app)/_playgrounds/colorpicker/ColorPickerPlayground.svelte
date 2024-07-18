<script lang="ts">
  import type { ColorFormat } from '$lib/ColorPicker.types';

  import Checkbox from '$lib/Checkbox.svelte';
  import ColorPicker from '$lib/ColorPicker.svelte';

  import Playground from '../Playground.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let colorText = '#000000';
  let colorFormat: ColorFormat = 'hex';

  let disabled = false;
  let open = false;
  let sliderVariant: string = '';
  let valueVariant: string = '';
  let variant: string = '';

  $: code = getPlaygroundCode({
    colorFormat,
    colorText,
    disabled,
    open,
    sliderVariant,
    valueVariant,
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <ColorPicker
      bind:colorText
      bind:colorFormat
      bind:open
      {disabled}
      {sliderVariant}
      {valueVariant}
      {variant}
    />
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <VariantInput labelText="valueVariant" bind:variant={valueVariant} availableVariants={[]} />
    <VariantInput labelText="sliderVariant" bind:variant={sliderVariant} availableVariants={[]} />
    <VariantInput bind:variant availableVariants={['colorful']} />
  </svelte:fragment>
</Playground>
