<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Progress from '$lib/Progress.svelte';
  import Slider from '$lib/Slider.svelte';

  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Select from '$lib/Select.svelte';
  import type { ProgressStatus } from '$lib/Progress.types';
  import ListItem from '$lib/ListItem.svelte';
  import Label from '$lib/Label.svelte';
  import { PROGRESS_STATUSES } from '$lib';

  let disabled = false;
  let max = 100;
  let percent: number;
  let status: ProgressStatus = 'none';
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
  <div class="component" slot="component">
    <div class="progress" class:vertical>
      <Progress {status} {disabled} {value} {max} bind:percent {vertical} />
    </div>
  </div>
  <svelte:fragment slot="props">
    <div class="slider">
      <Slider bind:value min={0} {max} />
    </div>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="status" forwardClick>
      <Select bind:selectedValue={status} composed>
        {#each PROGRESS_STATUSES as progressStatus}
          <ListItem value={progressStatus}>{progressStatus}</ListItem>
        {/each}
      </Select>
    </Label>
    <Label text="max">
      <Input value={max.toString()} on:change={onMaxChange} composed />
    </Label>
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

  .progress {
    display: grid;
    width: 100px;
  }

  .progress.vertical {
    width: unset;
    height: 100px;
  }

  .slider {
    width: 250px;
  }
</style>
