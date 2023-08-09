<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Switch from '$lib/Switch.svelte';
  import Playground from '../Playground.svelte';
  import ChillIcon from './ChillIcon.svelte';
  import HeatIcon from './HeatIcon.svelte';
  import Label from '$lib/Label.svelte';

  let exampleRef: any;
  let checked = false;
  let colorful = false;
  let disabled = false;
  let vertical = false;
  let offText = 'off';
  let onText = 'on';
  let customLabels = false;

  const onSwitchChange = (e: Event) => {
    const switchEvent = e as any;
    exampleRef.recordEvent(`change: ${switchEvent.currentTarget?.checked}`);
  };
</script>

<Playground bind:this={exampleRef}>
  <div slot="component">
    {#if customLabels}
      <Switch bind:checked {colorful} {disabled} {vertical} on:change={onSwitchChange}>
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
        {colorful}
        {disabled}
        {vertical}
        {onText}
        {offText}
        on:change={onSwitchChange}
      />
    {/if}
  </div>
  <svelte:fragment slot="status">
    <div>checked: {checked}</div>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={colorful}>colorful</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="offText">
      <Input bind:value={offText} />
    </Label>
    <Label text="onText">
      <Input bind:value={onText} />
    </Label>
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
