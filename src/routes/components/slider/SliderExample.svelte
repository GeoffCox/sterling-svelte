<script lang="ts">
  import Slider from '$lib/inputs/Slider.svelte';
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Input from '$lib/inputs/Input.svelte';
  import Example from '../Example.svelte';

  let exampleRef: any;

  let value = 0;
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

<Example name="Slider" bind:this={exampleRef}>
  <div slot="component" class="component" class:vertical>
    {#if label.length > 0}
      <Slider
        bind:value
        bind:min
        bind:max
        bind:precision
        bind:step
        bind:vertical
        {disabled}
        on:change={(e) => exampleRef.recordEvent(`change value:${e.detail.value}`)}
      >
        <span slot="label">{label}</span>
      </Slider>
    {:else}
      <Slider
        bind:value
        bind:min
        bind:max
        bind:precision
        bind:step
        bind:vertical
        {disabled}
        on:change={(e) => exampleRef.recordEvent(`change value:${e.detail.value}`)}
      />
    {/if}
  </div>
  <svelte:fragment slot="options">
    <div>
      <Input value={min.toString()} on:change={onMinChange}><span slot="label">min</span></Input>
    </div>
    <div>
      <Input value={max.toString()} on:change={onMaxChange}><span slot="label">max</span></Input>
    </div>
    <div>
      <Input value={step?.toString()} on:change={onStepChange}><span slot="label">step</span></Input
      >
    </div>
    <div>
      <Input value={precision.toString()} on:change={onPrecisionChange}
        ><span slot="label">precision</span></Input
      >
    </div>
    <div>
      <Checkbox bind:checked={vertical}><span slot="label">vertical</span></Checkbox>
    </div>
    <div>
      <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    </div>
    <Input bind:value={label}><span slot="label">LABEL (slot)</span></Input>
  </svelte:fragment>
  <div slot="status">
    <div>value: {value}</div>
  </div>
</Example>

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
