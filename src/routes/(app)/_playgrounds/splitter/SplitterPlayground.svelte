<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Splitter from '$lib/Splitter.svelte';
  import Playground from '../Playground.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let horizontal = $state(false);
  let initialPrimarySize = $state('');
  let minPrimarySize = $state('');
  let minSecondarySize = $state('');
  let resetOnDoubleClick = $state(true);
  let showNestedExample = $state(false);
  let noPrimary = $state(false);
  let noSecondary = $state(false);

  let code = $derived(
    getPlaygroundCode({
      _class: _class,
      horizontal,
      initialPrimarySize,
      minPrimarySize,
      minSecondarySize,
      resetOnDoubleClick
    })
  );
</script>

{#snippet backgroundX()}
  <svg
    class="x-lines"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0,0 L100,100 M100,0 L0,100" vector-effect="non-scaling-stroke" />
  </svg>
{/snippet}

{#snippet pane(label: string)}
  <div class="pane">
    {@render backgroundX()}
    <span class="pane-label">{label}</span>
  </div>
{/snippet}

{#snippet pane1()}
  {@render pane('1')}
{/snippet}

{#snippet pane2()}
  {@render pane('2')}
{/snippet}

{#snippet pane3()}
  {@render pane('3')}
{/snippet}

{#snippet pane4()}
  {@render pane('4')}
{/snippet}

{#snippet pane5()}
  {@render pane('5')}
{/snippet}

{#snippet nestedLevel4()}
  <Splitter
    class={_class}
    initialPrimarySize="50%"
    resetOnDoubleClick
    primary={noPrimary ? undefined : pane3}
    secondary={noSecondary ? undefined : pane4}
  ></Splitter>
{/snippet}

{#snippet nestedLevel3()}
  <Splitter
    class={_class}
    initialPrimarySize="66%"
    resetOnDoubleClick
    primary={noPrimary ? undefined : nestedLevel4}
    secondary={noSecondary ? undefined : pane5}
  ></Splitter>
{/snippet}

{#snippet nestedLevel2()}
  <Splitter
    class={_class}
    horizontal
    initialPrimarySize="50%"
    resetOnDoubleClick
    primary={noPrimary ? undefined : pane2}
    secondary={noSecondary ? undefined : nestedLevel3}
  ></Splitter>
{/snippet}

{#snippet nested()}
  <Splitter
    class={_class}
    initialPrimarySize="30%"
    resetOnDoubleClick
    primary={noPrimary ? undefined : pane1}
    secondary={noSecondary ? undefined : nestedLevel2}
  >
    >
  </Splitter>
{/snippet}

<Playground {code}>
  {#snippet component()}
    <div class="splitter-container">
      {#if !showNestedExample}
        <Splitter
          {initialPrimarySize}
          {minPrimarySize}
          {minSecondarySize}
          {resetOnDoubleClick}
          {horizontal}
          class={_class}
          primary={noPrimary ? undefined : pane1}
          secondary={noSecondary ? undefined : pane2}
        ></Splitter>
      {:else}
        {@render nested()}
      {/if}
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={horizontal}>horizontal</Checkbox>
    <Label text="initialPrimarySize">
      <Input bind:value={initialPrimarySize} />
    </Label>
    <Label text="minPrimarySize">
      <Input bind:value={minPrimarySize} />
    </Label>
    <Label text="minSecondarySize">
      <Input bind:value={minSecondarySize} />
    </Label>
    <Checkbox bind:checked={resetOnDoubleClick}>resetOnDoubleClick</Checkbox>
    <VariantInput bind:class={_class} sterlingClasses={['composed']} />
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={showNestedExample}>Show Nested Example</Checkbox>
    <Checkbox bind:checked={noPrimary}>No primary</Checkbox>
    <Checkbox bind:checked={noSecondary}>No secondary</Checkbox>
  {/snippet}
</Playground>

<style>
  .splitter-container {
    width: 800px;
    height: 400px;
    background: var(--stsv-common__background-color);
  }

  .pane {
    background: var(--stsv-common__background-color--secondary);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .x-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    stroke: var(--stsv-common__background-color--subtle);
    stroke-width: 2;
    fill: none;
    pointer-events: none; /* Allow clicks to pass through */
  }

  .x-lines path {
    vector-effect: non-scaling-stroke; /* Keeps stroke width consistent */
  }

  .pane-label {
    position: relative;
    z-index: 1;
    background: var(--stsv-common__background-color--secondary);
    padding: 4px 8px;
    user-select: none;
  }
</style>
