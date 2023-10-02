<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';

  import Slider from '$lib/Slider.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';

  let exampleRef: any;

  let value = 0;
  let disabled = false;
  let label = 'SLIDER';
  let min = 0;
  let max = 100;
  let step: number | undefined = undefined;
  let precision: number = 0;
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
      step = undefined;
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
</script>

<Playground bind:this={exampleRef}>
  <div slot="component" class="component" class:vertical>
    {#if label.length > 0}
      <Slider
        {disabled}
        bind:max
        bind:min
        bind:precision
        bind:step
        bind:value
        {variant}
        bind:vertical
        on:change={(e) => exampleRef.recordEvent(`change value:${e.detail.value}`)}
      />
    {:else}
      <Slider
        {disabled}
        bind:max
        bind:min
        bind:precision
        bind:step
        bind:value
        {variant}
        bind:vertical
        on:change={(e) => exampleRef.recordEvent(`change value:${e.detail.value}`)}
      />
    {/if}
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
      <Input value={precision.toString()} on:change={onPrecisionChange} />
    </Label>
    <Label text="step">
      <Input value={step?.toString()} on:change={onStepChange} />
    </Label>
    <VariantInput bind:variant availableVariants={['colorful', 'composed']} />
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>value: {value}</div>
  </svelte:fragment>
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
