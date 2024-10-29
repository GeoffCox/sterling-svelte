<svelte:options runes={true} />

<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';

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
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | null | undefined = $state(false);
  let max = $state(100);
  let percent: number = $state(0);
  let value = $state(35);
  let variant = $state('');
  let vertical: boolean | null | undefined = $state(false);

  // This helps fix the lost typing of forwarded events on Input
  type FormEvent<E extends Event = Event, T extends EventTarget = HTMLElement> = E & {
    currentTarget: EventTarget & T;
  };

  const _onMaxChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const parsedValue = Number.parseFloat(target.value);
    max = isNaN(parsedValue) ? 0 : parsedValue;
  };

  const onMaxChange = (e: Event): any => {
    _onMaxChange(e as FormEvent<Event, HTMLInputElement>);
  };

  let code = $derived(
    getPlaygroundCode({
      disabled,
      max,
      value,
      variant,
      vertical
    })
  );
</script>

<Playground {code}>
  <div class="component" slot="component">
    <div class="progress" class:vertical>
      <Progress
        {disabled}
        {value}
        {max}
        bind:percent
        class={variant}
        orientation={vertical ? 'vertical' : 'horizontal'}
      />
    </div>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="max">
      <Input bind:value={max} on:change={onMaxChange} />
    </Label>
    <Label text="value">
      <div class="slider">
        <Slider bind:value min={0} {max} precision={0} />
      </div>
    </Label>
    <VariantInput
      bind:variant
      availableVariants={[
        'auto-status',
        'info-status',
        'success-status',
        'warning-status',
        'error-status'
      ]}
    />
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
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
