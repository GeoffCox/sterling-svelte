<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Progress from '$lib/Progress.svelte';
  import Slider from '$lib/Slider.svelte';

  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Select from '$lib/Select.svelte';
  import type { ProgressColorful } from '$lib/Progress.types';
  import ListItem from '$lib/ListItem.svelte';

  const colorfulStates = ['none', 'auto', 'progress', 'success', 'warning', 'error'];

  let colorful: ProgressColorful = 'none';
  let disabled = false;
  let label = 'PROGRESS';
  let max = 100;
  let percent: number;
  let value = 35;
  let vertical = false;

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
    <Input value={max.toString()} on:change={onMaxChange}>max</Input>
    <Input bind:value={label}>LABEL (slot)</Input>
    <Select bind:selectedValue={colorful}>
      <svelte:fragment slot="label">colorful</svelte:fragment>
      <ListItem value="none">none</ListItem>
      <ListItem value="auto">auto</ListItem>
      <ListItem value="progress">progress</ListItem>
      <ListItem value="success">success</ListItem>
      <ListItem value="warning">warning</ListItem>
      <ListItem value="error">error</ListItem>
    </Select>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
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
