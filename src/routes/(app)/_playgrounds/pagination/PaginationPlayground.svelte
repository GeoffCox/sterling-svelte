<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import Pagination from '$lib/Pagination.svelte';
  import Slider from '$lib/Slider.svelte';
  import type { ChangeEventHandler } from 'svelte/elements';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import { countries } from '../../_shared/sampleData/countries';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';
  import StepNextIcon from './StepNextIcon.svelte';
  import StepPreviousIcon from './StepPreviousIcon.svelte';

  let itemCount: number = $state(countries.length);
  let itemRange: { index: number; count: number } = $state({ index: 0, count: 0 });
  let page: number = $state(1);
  let pageCount: number = $state(0);
  let pageSize: number = $state(7);
  let pageStep: number = $state(5);
  let customPageNumbers: boolean = $state(false);

  let _class: string = $state('');

  let code = $derived(getPlaygroundCode({ _class, itemCount, pageSize, pageStep }));

  let currentPageItemCount: number = $derived(Math.min(pageSize, itemCount, itemRange?.count || 0));

  let items: number[] = $derived(Array.from({ length: currentPageItemCount }, (_, i) => i + 1));

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (customPageNumbers) {
      const inputValue = event.currentTarget.value;
      if (inputValue.length > 0) {
        const newPage = parseInt(inputValue, 10);
        page = newPage;
      } else {
        page = 0;
      }
    }
  };

  $inspect(page, 'playground page');
</script>

<Playground {code}>
  {#snippet component()}
    <div class="component">
      <h3>Countries</h3>
      <div class="pagination-state">
        <div>
          {#each items as item}
            {@const itemIndex = itemRange.index + item - 1}
            <div class="item">{itemIndex + 1} {countries[itemIndex % countries.length]}</div>
          {/each}
        </div>
      </div>
      {#if customPageNumbers}
        <Pagination
          class={_class}
          {itemCount}
          bind:itemRange
          bind:page
          bind:pageCount
          {pageSize}
          pageStep={pageStep > 0 ? pageStep : undefined}
          onChange={(value, itemrange) =>
            console.log(`Pagination onChange value:${value} itemrange:${itemrange}`)}
        >
          {#snippet firstNumber(value?: number)}
            <div class="circle-number">{value}</div>
          {/snippet}
          {#snippet stepPreviousNumber()}
            <div class="circle-number">
              <StepPreviousIcon width="1em" height="1em" />
            </div>
          {/snippet}
          {#snippet previousNumber(value?: number)}
            <div class="circle-number">{value}</div>
          {/snippet}
          {#snippet currentNumber(currentValue?: number)}
            <Input value={currentValue} class="circle-input" onchange={onInputChange} />
          {/snippet}
          {#snippet nextNumber(value?: number)}
            <div class="circle-number">{value}</div>
          {/snippet}
          {#snippet stepNextNumber()}
            <div class="circle-number">
              <StepNextIcon width="1em" height="1em" />
            </div>
          {/snippet}
          {#snippet lastNumber(value?: number)}
            <div class="circle-number">{value}</div>
          {/snippet}
        </Pagination>
      {:else}
        <Pagination
          class={_class}
          {itemCount}
          bind:itemRange
          bind:page
          bind:pageCount
          {pageSize}
          pageStep={pageStep > 0 ? pageStep : undefined}
          onChange={(value, itemrange) =>
            console.log(`Pagination onChange value:${value} itemrange:${itemrange}`)}
        />
      {/if}
    </div>
  {/snippet}
  {#snippet props()}
    <Label text="itemCount">
      <Input type="number" bind:value={itemCount} />
    </Label>
    <Label text="page">
      <div class="slider">
        <Slider bind:value={page} min={1} max={pageCount || 1} step={1} />
        <div>{page}</div>
      </div>
    </Label>
    <Label text="pageSize">
      <Input type="number" bind:value={pageSize} />
    </Label>
    <Label text="pageStep">
      <Input type="number" bind:value={pageStep} />
    </Label>
    <VariantInput bind:class={_class} sterlingClasses={[]} />
  {/snippet}
  {#snippet snippets()}
    <Checkbox bind:checked={customPageNumbers}>Blue number circles</Checkbox>
  {/snippet}
</Playground>

<style>
  .component {
    display: grid;
    grid-template-rows: auto auto;
    gap: 0.5em;
    justify-items: center;
    align-items: flex-start;
  }
  .pagination-state {
    justify-self: stretch;
    display: grid;
    grid-template-rows: auto auto;
    gap: 0.5em;
    margin-bottom: 1em;
    justify-items: flex-start;
    align-items: flex-start;
    padding: 1em;
    background: var(--stsv-common__background-color--faint);
    border: var(--stsv-common__color--faint) 1px solid;
    min-height: 130px;
  }
  .slider {
    display: grid;
    grid-template-rows: auto auto;
    justify-items: stretch;
    align-items: stretch;
    font-size: 0.8em;
  }

  .circle-number {
    border-radius: 10000px;
    aspect-ratio: 1 / 1;
    border: 2px solid transparent;
    background-color: var(--stsv-button__background-color--blue);
    color: var(--stsv-button__color--blue);
    width: calc(100% - 0.25em);
    display: grid;
    place-items: center;
    place-content: center;
  }

  .circle-number :global(svg) {
    min-width: 1em;
    min-height: 1em;
  }

  :global(.circle-input) {
    display: grid;
    place-items: stretch;
    place-content: stretch;
    justify-self: center;
    align-self: center;
    justify-items: center;
    width: calc(100% - 0.25em);
  }

  :global(.circle-input input:not(:disabled)) {
    border-radius: 10000px;
    aspect-ratio: 1 / 1;
    text-align: center;
    padding: 0;
  }

  :global(.circle-input input:not(:disabled):not(:hover):not(:focus-visible)) {
    background-color: var(--stsv-button__background-color--blue);
    border-bottom-color: var(--stsv-button__border-color--blue);
    color: var(--stsv-button__color--blue);
  }
</style>
