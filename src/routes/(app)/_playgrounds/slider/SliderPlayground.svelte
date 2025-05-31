<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Slider from '$lib/Slider.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let value = $state(0);
  let disabled = $state(false);
  let min = $state(0);
  let max = $state(100);
  let precision: number = $state(0);
  let reverse = $state(false);
  let step: number = $state(1);
  let _class = $state('');
  let vertical = $state(false);

  let code = $derived(
    getPlaygroundCode({
      disabled,
      min,
      max,
      precision,
      reverse,
      step,
      _class,
      vertical
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component" class:vertical>
      <Slider
        class={_class}
        {disabled}
        {max}
        {min}
        {precision}
        {reverse}
        {step}
        bind:value
        {vertical}
        onChange={(value) => console.log(`<Slider> onChange value:${value}`)}
      />
    </div>
  {/snippet}
  {#snippet props()}
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
    <Checkbox bind:checked={reverse}>reverse</Checkbox>
    <Label text="step">
      <Input type="number" bind:value={step} />
    </Label>
    <Label text="value">
      <Input type="number" bind:value />
    </Label>
    <VariantInput bind:class={_class} sterlingClasses={['composed']} />
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  {/snippet}
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
