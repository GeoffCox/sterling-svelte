<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';

  import Slider from '$lib/Slider.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let value = 0;
  let disabled = false;
  let min = 0;
  let max = 100;
  let step: number = 1;
  let precision: number | undefined = undefined;
  let variant = '';
  let vertical = false;

  // This helps fix the lost typing of forwarded events on Input
  type FormEvent<E extends Event = Event, T extends EventTarget = HTMLElement> = E & {
    currentTarget: EventTarget & T;
  };

  const _onMinChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const parsedValue = Number.parseFloat(target.value);
    min = isNaN(parsedValue) ? 0 : parsedValue;
  };

  const onMinChange = (e: Event): any => {
    _onMinChange(e as FormEvent<Event, HTMLInputElement>);
  };

  const _onMaxChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const parsedValue = Number.parseFloat(target.value);
    max = isNaN(parsedValue) ? 0 : parsedValue;
  };

  const onMaxChange = (e: Event): any => {
    _onMaxChange(e as FormEvent<Event, HTMLInputElement>);
  };

  const _onStepChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (target.value) {
      const parsedValue = Number.parseFloat(target.value);
      step = isNaN(parsedValue) ? 0 : parsedValue;
    } else {
      step = 1;
    }
  };

  const onStepChange = (e: Event): any => {
    _onStepChange(e as FormEvent<Event, HTMLInputElement>);
  };

  const _onPrecisionChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const parsedValue = Number.parseFloat(target.value);
    precision = isNaN(parsedValue) ? 0 : parsedValue;
  };

  const onPrecisionChange = (e: Event): any => {
    _onPrecisionChange(e as FormEvent<Event, HTMLInputElement>);
  };

  const _onValueChange: FormEventHandler<HTMLInputElement> = (e: Event): any => {
    const target = e.target as HTMLInputElement;
    const parsedValue = Number.parseFloat(target.value);
    value = isNaN(parsedValue) ? 0 : parsedValue;
  };

  const onValueChange = (e: Event): any => {
    _onValueChange(e as FormEvent<Event, HTMLInputElement>);
  };

  $: code = getPlaygroundCode({
    disabled,
    min,
    max,
    precision,
    step,
    value,
    variant,
    vertical
  });
</script>

<Playground {code}>
  <div slot="component" class="component" class:vertical>
    <Slider
      {disabled}
      bind:max
      bind:min
      bind:precision
      bind:step
      bind:value
      {variant}
      bind:vertical
      on:change={(e) => console.log(`change value:${e.detail.value}`)}
    />
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="min">
      <Input value={min.toString()} on:change={onMinChange} />
    </Label>
    <Label text="max">
      <Input value={max.toString()} on:change={onMaxChange} />
    </Label>
    <Label text="precision">
      <Input value={precision ? precision.toString() : ''} on:change={onPrecisionChange} />
    </Label>
    <Label text="step">
      <Input value={step?.toString()} on:change={onStepChange} />
    </Label>
    <Label text="value">
      <Input value={value.toString()} on:change={onValueChange} />
    </Label>
    <VariantInput bind:variant availableVariants={['colorful', 'composed']} />
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
