<svelte:options runes={true} />

<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';

  import Slider from '$lib/Slider.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let value = $state(0);
  let disabled = $state(false);
  let min = $state(0);
  let max = $state(100);
  let precision: number = $state(0);
  let step: number = $state(1);
  let variant = $state('');
  let vertical = $state(false);

  let code = $derived(
    getPlaygroundCode({
      disabled,
      min,
      max,
      precision,
      step,
      variant,
      vertical
    })
  );
</script>

<Playground {code}>
  <div slot="component" class="component" class:vertical>
    <Slider
      class={variant}
      {disabled}
      {max}
      {min}
      {precision}
      {step}
      bind:value
      {vertical}
      onChange={(value) => console.log(`change value:${value}`)}
    />
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="min">
      <Input type="number" bind:value={min} />
    </Label>
    <Label text="max">
      <Input type="number" bind:value={max} />
    </Label>
    <Label text="precision">
      <Input type="number" bind:value={precision} />
    </Label>
    <Label text="step">
      <Input type="number" bind:value={step} />
    </Label>
    <VariantInput bind:class={variant} availableVariants={['colorful', 'composed']} />
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  </svelte:fragment>
  <!-- <svelte:fragment slot="status">
    <div>value: {value}</div>
  </svelte:fragment> -->
</Playground>

<style>
  .component {
    box-sizing: border-box;
    width: 450px;
    padding: 0;
  }

  .component.vertical {
    width: unset;
    height: 450px;
    padding: 0;
  }
</style>
