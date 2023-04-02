<script lang="ts">
  import Label from '$lib/Label.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Switch from '$lib/Switch.svelte';
  import Playground from '../Playground.svelte';
  import ChillIcon from './ChillIcon.svelte';
  import HeatIcon from './HeatIcon.svelte';
  import Field from '$lib/Field.svelte';

  let exampleRef: any;
  let checked = false;
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
      <Switch bind:checked {disabled} {vertical} on:change={onSwitchChange}>
        <div class="chill" slot="offLabel" let:checked let:disabled let:inputId>
          <Label for={inputId}>
            <ChillIcon checked={!checked} {disabled} />
          </Label>
        </div>
        <div class="heat" slot="onLabel" let:checked let:disabled let:inputId>
          <Label for={inputId}>
            <HeatIcon {checked} {disabled} />
          </Label>
        </div>
      </Switch>
    {:else}
      <Switch bind:checked {disabled} {vertical} {onText} {offText} on:change={onSwitchChange} />
    {/if}
  </div>
  <svelte:fragment slot="status">
    <div>checked: {checked}</div>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Field label="offText">
      <Input bind:value={offText} composed />
    </Field>
    <Field label="onText">
      <Input bind:value={onText} composed />
    </Field>
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  </svelte:fragment>
  <svelte:fragment slot="options">
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
