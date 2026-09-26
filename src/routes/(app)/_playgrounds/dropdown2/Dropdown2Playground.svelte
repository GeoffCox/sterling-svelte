<svelte:options runes={true} />

<script lang="ts">
  import { Dropdown2 } from '$lib';
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Slider from '$lib/Slider.svelte';
  import Switch from '$lib/Switch.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import AnimatedProgress from './AnimatedProgress.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | null | undefined = $state(false);
  let open: boolean | null | undefined = $state(false);
  let lightDismiss: boolean | null | undefined = $state(true);
  let _class = $state('');

  let progress = $state(50);
  let animate = $state(false);
  let reverse = $state(false);
  let speed = $state(75);

  let code = $derived(getPlaygroundCode({ disabled, lightDismiss, _class: _class }));
</script>

<Playground {code}>
  {#snippet component()}
    <Dropdown2
      bind:open
      {disabled}
      {lightDismiss}
      class={_class}
      onOpen={(value) => console.log(`<Dropdown> onOpen value:${value}`)}
    >
      {#snippet value()}
        <div class="value">
          <AnimatedProgress value={progress} {animate} {reverse} {speed} />
        </div>
      {/snippet}
      <div class="popup">
        <div class="settings">
          <Switch bind:checked={animate} onLabel="Animate" />
          <Switch bind:checked={reverse} onLabel="Reverse" />
          <Label text={`Speed: ${speed}`}>
            <Slider bind:value={speed} precision={0} />
          </Label>
        </div>
      </div></Dropdown2
    >
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={lightDismiss}>lightDismiss</Checkbox>
    <VariantInput bind:class={_class} />
  {/snippet}
</Playground>

<style>
  .value {
    box-sizing: border-box;
    width: 250px;
    height: 2em;
    padding: 0.5em;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: stretch;
    align-items: center;
  }

  .settings {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    min-width: 300px;
    padding: 1em;
    row-gap: 1em;
  }
</style>
