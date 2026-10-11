<svelte:options runes={true} />

<script lang="ts">
  import { Button } from '$lib';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import RangeSlider from '$lib/RangeSlider.svelte';
  import Slider from '$lib/Slider.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let lowValue: number | undefined = $state(25);
  let highValue: number | undefined = $state(75);
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

  const onUnsetValues = () => {
    lowValue = undefined;
    highValue = undefined;
  };
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component" class:vertical>
      <RangeSlider
        class={_class}
        {disabled}
        {max}
        {min}
        {precision}
        {reverse}
        {step}
        bind:lowValue
        bind:highValue
        {vertical}
        onChange={(value) => console.log(`<Slider> onChange [${value.low},${value.high}]`)}
      />
    </div>
  {/snippet}
  {#snippet props()}
    <VariantInput bind:class={_class} sterlingClasses={['composed']} />

    <Label text="min">
      <Input type="number" bind:value={min} />
    </Label>
    <Label text="max">
      <Input type="number" bind:value={max} />
    </Label>
    <Label text="lowValue">
      <Input type="number" bind:value={lowValue} />
    </Label>
    <Label text="highValue">
      <Input type="number" bind:value={highValue} />
    </Label>
    <Label text="precision">
      <Input type="number" bind:value={precision} />
    </Label>
    <Checkbox bind:checked={reverse}>reverse</Checkbox>
    <Label text="step">
      <Input type="number" bind:value={step} />
    </Label>
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
  {/snippet}
  {#snippet tweaks()}
    <Button onclick={onUnsetValues}>Unset values</Button>
  {/snippet}s
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
