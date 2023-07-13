<script lang="ts">
  import Slider from '$lib/Slider.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Playground from '../Playground.svelte';
  import Label from '$lib/Label.svelte';

  let exampleRef: any;

  let value = 0;
  let colorful = false;
  let disabled = false;
  let min = 0;
  let max = 100;
  let step: number | undefined = undefined;
  let precision: number = 0;
  let vertical = false;
  let label = 'SLIDER';

  // This helps fix the lost typing of forwarded events on Input
  type FormEvent<E extends Event = Event, T extends EventTarget = HTMLElement> = E & {
    currentTarget: EventTarget & T;
  };

  const _onMinChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const parsedValue = Number.parseFloat(target.value);
    min = isNaN(parsedValue) ? 0 : parsedValue;
  };

  const onMinChange = (e: Event): any => {
    _onMinChange(e as FormEvent<Event, HTMLInputElement>);
  };

  const _onMaxChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const parsedValue = Number.parseFloat(target.value);
    max = isNaN(parsedValue) ? 0 : parsedValue;
  };

  const onMaxChange = (e: Event): any => {
    _onMaxChange(e as FormEvent<Event, HTMLInputElement>);
  };

  const _onStepChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
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

  const _onPrecisionChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
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
        bind:value
        bind:min
        bind:max
        bind:precision
        bind:step
        bind:vertical
        {colorful}
        {disabled}
        on:change={(e) => exampleRef.recordEvent(`change value:${e.detail.value}`)}
      />
    {:else}
      <Slider
        bind:value
        bind:min
        bind:max
        bind:precision
        bind:step
        bind:vertical
        {colorful}
        {disabled}
        on:change={(e) => exampleRef.recordEvent(`change value:${e.detail.value}`)}
      />
    {/if}
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="min">
      <Input value={min.toString()} on:change={onMinChange} composed />
    </Label>
    <Label text="max">
      <Input value={max.toString()} on:change={onMaxChange} composed />
    </Label>
    <Label text="precision">
      <Input value={precision.toString()} on:change={onPrecisionChange} composed />
    </Label>
    <Label text="step">
      <Input value={step?.toString()} on:change={onStepChange} composed />
    </Label>
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
