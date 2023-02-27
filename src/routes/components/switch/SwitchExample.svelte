<script lang="ts">
  import Label from '$lib/Label.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Switch from '$lib/Switch.svelte';
  import Playground from '../Playground.svelte';
  import ChillIcon from './ChillIcon.svelte';
  import HeatIcon from './HeatIcon.svelte';

  let exampleRef: any;
  let checked = false;
  let disabled = false;
  let vertical = false;
  let offText = 'off';
  let onText = 'on';
  let customLabels = false;
</script>

<Playground bind:this={exampleRef}>
  <div slot="component">
    {#if customLabels}
      <Switch bind:checked {disabled} {vertical}>
        <div class="chill" slot="off-label" let:checked let:disabled let:inputId>
          <Label for={inputId}>
            <ChillIcon checked={!checked} {disabled} />
          </Label>
        </div>
        <div class="heat" slot="on-label" let:checked let:disabled let:inputId>
          <Label for={inputId}>
            <HeatIcon {checked} {disabled} />
          </Label>
        </div>
      </Switch>
    {:else}
      <Switch bind:checked {disabled} {vertical} {onText} {offText} />
    {/if}
  </div>
  <svelte:fragment slot="status">
    <div>checked: {checked}</div>
  </svelte:fragment>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
    <Checkbox bind:checked={vertical}><span slot="label">vertical</span></Checkbox>
    <Input bind:value={offText}><span slot="label">offText</span></Input>
    <Input bind:value={onText}><span slot="label">onText</span></Input>
    <Checkbox bind:checked={customLabels}><span slot="label">custom labels</span></Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .chill,
  .heat {
    width: 2em;
    height: 2em;
  }
</style>
