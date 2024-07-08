<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Switch from '$lib/Switch.svelte';
  import ChillIcon from './ChillIcon.svelte';
  import HeatIcon from './HeatIcon.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let checked = false;
  let disabled = false;
  let offText: string | undefined = undefined;
  let onText: string | undefined = undefined;
  let customLabels = false;
  let variant = '';
  let vertical = false;

  const onSwitchChange = (e: Event) => {
    const switchEvent = e as any;
    console.log(`change: ${switchEvent.currentTarget?.checked}`);
  };

  $: code = getPlaygroundCode({
    checked,
    disabled,
    offText,
    onText,
    customLabels,
    variant,
    vertical
  });
</script>

<Playground {code}>
  <div slot="component">
    {#if customLabels}
      <Switch bind:checked {disabled} {variant} {vertical} on:change={onSwitchChange}>
        <div class="chill" slot="offLabel" let:checked let:disabled let:inputId>
          <label for={inputId}>
            <ChillIcon checked={!checked} {disabled} />
          </label>
        </div>
        <div class="heat" slot="onLabel" let:checked let:disabled let:inputId>
          <label for={inputId}>
            <HeatIcon {checked} {disabled} />
          </label>
        </div>
      </Switch>
    {:else}
      <Switch
        bind:checked
        {disabled}
        {offText}
        {onText}
        {variant}
        {vertical}
        on:change={onSwitchChange}
      />
    {/if}
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked>checked</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="offText">
      <Input bind:value={offText} />
    </Label>
    <Label text="onText">
      <Input bind:value={onText} />
    </Label>
    <VariantInput bind:variant availableVariants={['colorful']} />
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={customLabels}>custom labels</Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .chill,
  .heat {
    width: 2em;
    height: 2em;
  }
</style>
