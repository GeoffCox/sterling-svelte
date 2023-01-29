<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Progress from '$lib/display/Progress.svelte';
  import Slider from '$lib/inputs/Slider.svelte';

  import Playground from '../Playground.svelte';
  import Input from '$lib/inputs/Input.svelte';
  import Select from '$lib/inputs/Select.svelte';
  import type { ProgressColorful } from '$lib/display/Progress.types';

  const colorfulStates = ['none', 'auto', 'progress', 'success', 'warning', 'error'];

  let colorfulStateIndex = 0;
  $: colorful = colorfulStates[colorfulStateIndex] as ProgressColorful;
  let value = 35;
  let max = 100;
  let percent: number;
  let disabled = false;
  let vertical = false;
  let label = 'PROGRESS';

  // This helps fix the lost typing of forwarded events on Input
  type FormEvent<E extends Event = Event, T extends EventTarget = HTMLElement> = E & {
    currentTarget: EventTarget & T;
  };

  const _onMaxChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const parsedValue = Number.parseFloat(target.value);
    max = isNaN(parsedValue) ? 0 : parsedValue;
  };

  const onMaxChange = (e: Event): any => {
    _onMaxChange(e as FormEvent<Event, HTMLInputElement>);
  };
</script>

<Playground>
  <div class="component" class:vertical slot="component">
    <Progress {colorful} {disabled} {value} {max} bind:percent {vertical}>
      <svelte:fragment slot="label">{label}</svelte:fragment>
    </Progress>
  </div>
  <svelte:fragment slot="options">
    <div class="slider">
      <Slider bind:value min={0} {max} />
    </div>
    <Input value={max.toString()} on:change={onMaxChange}>
      <svelte:fragment slot="label">max</svelte:fragment>
    </Input>
    <Input bind:value={label}><span slot="label">LABEL (slot)</span></Input>
    <Select items={colorfulStates} bind:selectedIndex={colorfulStateIndex}>
      <svelte:fragment slot="label">colorful</svelte:fragment>
    </Select>
    <Checkbox bind:checked={disabled}>
      <svelte:fragment slot="label">disabled</svelte:fragment>
    </Checkbox>
    <Checkbox bind:checked={vertical}>
      <svelte:fragment slot="label">vertical</svelte:fragment>
    </Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="status">
    <div>value: {value}</div>
    <div>percent: {percent}%</div>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-content: center;
    place-items: center;
    padding: 0;
  }

  .slider {
    width: 250px;
  }
</style>
