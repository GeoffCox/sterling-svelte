<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Splitter from '$lib/Splitter.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let horizontal = $state(false);
  let initialPrimarySize = $state('');
  let minPrimarySize = $state('');
  let minSecondarySize = $state('');
  let resetOnDoubleClick = $state(true);
  let showNestedExample = $state(false);

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

{#snippet exampleNested_Level4()}
  <Splitter initialPrimarySize="50%" resetOnDoubleClick>
    {#snippet primary()}
      <div class="primary">
        {@render backgroundX()}
        <span class="pane-label">3</span>
      </div>
    {/snippet}
    {#snippet secondary()}
      <div class="secondary">
        {@render backgroundX()}
        <span class="pane-label">4</span>
      </div>
    {/snippet}
  </Splitter>
{/snippet}

{#snippet exampleNested_Level3()}
  <Splitter initialPrimarySize="66%" resetOnDoubleClick>
    {#snippet primary()}
      {@render exampleNested_Level4()}
    {/snippet}
    {#snippet secondary()}
      <div class="secondary">
        {@render backgroundX()}
        <span class="pane-label">5</span>
      </div>
    {/snippet}
  </Splitter>
{/snippet}

{#snippet exampleNested_Level2()}
  <Splitter horizontal initialPrimarySize="50%" resetOnDoubleClick>
    {#snippet primary()}
      <div class="primary">
        {@render backgroundX()}
        <span class="pane-label">2</span>
      </div>
    {/snippet}
    {#snippet secondary()}
      <div class="secondary">
        {@render exampleNested_Level3()}
      </div>
    {/snippet}
  </Splitter>
{/snippet}

{#snippet exampleNested_Level1()}
  <Splitter initialPrimarySize="30%" resetOnDoubleClick>
    {#snippet primary()}
      <div class="primary">
        {@render backgroundX()}
        <span class="pane-label">1</span>
      </div>
    {/snippet}
    {#snippet secondary()}
      <div class="primary">
        {@render exampleNested_Level2()}
      </div>
    {/snippet}
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
        >
          {#snippet primary()}
            <div class="primary">
              {@render backgroundX()}
              <span class="pane-label">1</span>
            </div>
          {/snippet}
          {#snippet secondary()}
            <div class="secondary">
              {@render backgroundX()}
              <span class="pane-label">2</span>
            </div>
          {/snippet}
        </Splitter>
      {:else}
        {@render exampleNested_Level1()}
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
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={showNestedExample}>Show Nested Example</Checkbox>
  {/snippet}
</Playground>

<style>
  .splitter-container {
    width: 800px;
    height: 400px;
    background: var(--stsv-common__background-color--secondary);
  }

  .primary,
  .secondary {
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
