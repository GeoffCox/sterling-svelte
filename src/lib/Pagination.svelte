<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  import type { PaginationProps } from './Pagination.types';

  let {
    class: _class,
    itemCount,
    itemRange = $bindable(),
    page = $bindable(0),
    pageCount = $bindable(0),
    pageSize = 1,
    pageStep = 10,
    onChange,
    firstNumber,
    stepPreviousNumber,
    previousNumber,
    currentNumber,
    nextNumber,
    stepNextNumber,
    lastNumber
  }: PaginationProps = $props();

  const setValue = (newValue: number) => {
    page = pageCount > 0 ? Math.max(1, Math.min(newValue, pageCount)) : 0;
  };

  let _pageCount = $derived(itemCount > 0 ? Math.ceil(itemCount / pageSize) : 0);

  let _itemRange = $derived({
    index: Math.max(0, (page - 1) * pageSize),
    count: Math.max(0, Math.min(pageSize, itemCount - (page - 1) * pageSize))
  });

  // readonly props cannot be assigned $derived values yet
  // svelte 5.9.0 supports some get/set $bindable syntax that may help
  $effect(() => {
    pageCount = _pageCount;
  });

  // readonly props cannot be assigned $derived values yet
  // svelte 5.9.0 supports some get/set $bindable syntax that may help
  $effect(() => {
    itemRange = _itemRange;
  });

  $effect(() => {
    onChange?.(page, _itemRange);
  });

  // clamp the page
  $effect(() => {
    page = pageCount > 0 ? Math.max(1, Math.min(page, pageCount)) : 0;
  });

  let firstValue = $derived(pageCount > 0 && page >= 3 ? 1 : undefined);
  let stepPreviousValue = $derived(pageCount > 0 ? Math.max(1, page - pageStep) : undefined);
  let previousValue = $derived(pageCount > 0 && page >= 2 ? page - 1 : undefined);
  let nextValue = $derived(pageCount > 0 && page <= pageCount - 1 ? page + 1 : undefined);
  let stepNextValue = $derived(pageCount > 0 ? Math.min(pageCount, page + pageStep) : undefined);
  let lastValue = $derived(pageCount > 0 && page <= pageCount - 2 ? pageCount : undefined);

  let numberOfDigits = $derived(pageCount.toString().length);

  const onFirst = () => {
    setValue(1);
  };

  const onStepPrevious = () => {
    setValue(page - Math.abs(pageStep));
  };

  const onPrevious = () => {
    setValue(page - 1);
  };

  const onNext = () => {
    setValue(page + 1);
  };

  const onStepNext = () => {
    setValue(page + Math.abs(pageStep));
  };

  const onLast = () => {
    setValue(pageCount);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.currentTarget.value;
    if (inputValue.length > 0) {
      const page = parseInt(inputValue, 10);
      setValue(page);
    } else {
      setValue(0);
    }
  };

  let holdTimeout: NodeJS.Timeout | undefined = undefined;
  let holdInterval: NodeJS.Timeout | undefined = undefined;

  const startHoldButton = (
    event: MouseEvent,
    action: () => void,
    delayMs: number = 500,
    repeatMs: number = 100
  ) => {
    clearInterval(holdTimeout);
    clearInterval(holdInterval);
    if (event.button !== 0) {
      return;
    }
    action();
    holdTimeout = setTimeout(() => {
      holdInterval = setInterval(action, repeatMs);
    }, delayMs);
  };

  const stopHoldButton = (event: MouseEvent) => {
    clearInterval(holdTimeout);
    clearInterval(holdInterval);
  };

  const onKeydown = (event: KeyboardEvent, action: () => void) => {
    if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      action();
      return false;
    }
  };
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="sterling-pagination" style={`--page-number-width: ${numberOfDigits}ch`}>
  <div class="page-number first">
    {#if firstValue}
      <button
        type="button"
        onclick={onFirst}
        onkeydown={(event) => onKeydown(event, onFirst)}
        data-value={firstValue}
      >
        {#if firstNumber}
          {@render firstNumber(firstValue)}
        {:else}
          {firstValue}
        {/if}</button
      >
    {:else}
      <div class="empty"></div>
    {/if}
  </div>
  <div class="page-number step-previous">
    {#if stepPreviousValue}
      <button
        type="button"
        onmousedown={(event) => startHoldButton(event, onStepPrevious)}
        onmouseup={stopHoldButton}
        onmouseleave={stopHoldButton}
        onkeydown={(event) => onKeydown(event, onStepPrevious)}
        data-value={stepPreviousValue}
      >
        {#if stepPreviousNumber}
          {@render stepPreviousNumber(stepPreviousValue)}
        {:else}
          &lt;&lt;
        {/if}
      </button>
    {:else}
      <div class="empty"></div>
    {/if}
  </div>
  <div class="page-number previous">
    {#if previousValue}
      <button
        type="button"
        onmousedown={(event) => startHoldButton(event, onPrevious)}
        onmouseup={stopHoldButton}
        onmouseleave={stopHoldButton}
        onkeydown={(event) => onKeydown(event, onPrevious)}
        data-value={previousValue}
      >
        {#if previousNumber}
          {@render previousNumber(previousValue)}
        {:else}
          {previousValue}
        {/if}
      </button>
    {:else}
      <div class="empty"></div>
    {/if}
  </div>
  <div class="page-number current">
    {#if page}
      {#if currentNumber}
        {@render currentNumber(page)}
      {:else}
        <input value={page} onchange={onInputChange} />
      {/if}
    {:else}
      <div class="empty"></div>
    {/if}
  </div>
  <div class="page-number next">
    {#if nextValue}
      <button
        type="button"
        onmousedown={(event) => startHoldButton(event, onNext)}
        onmouseup={stopHoldButton}
        onmouseleave={stopHoldButton}
        onkeydown={(event) => onKeydown(event, onNext)}
        data-value={nextValue}
      >
        {#if nextNumber}
          {@render nextNumber(nextValue)}
        {:else}
          {nextValue}
        {/if}
      </button>
    {:else}
      <div class="empty"></div>
    {/if}
  </div>
  <div class="page-number step-next">
    {#if stepNextValue}
      <button
        type="button"
        disabled={stepNextValue === undefined}
        onmousedown={(event) => startHoldButton(event, onStepNext)}
        onmouseup={stopHoldButton}
        onmouseleave={stopHoldButton}
        onkeydown={(event) => onKeydown(event, onStepNext)}
        data-value={stepNextValue}
      >
        {#if stepNextNumber}
          {@render stepNextNumber(stepNextValue)}
        {:else}
          &gt;&gt;
        {/if}
      </button>
    {:else}
      <div class="empty"></div>
    {/if}
  </div>
  <div class="page-number last">
    {#if lastValue}
      <button
        type="button"
        onclick={() => onLast()}
        onkeydown={(event) => onKeydown(event, onLast)}
        data-value={lastValue}
      >
        {#if lastNumber}
          {@render lastNumber(lastValue)}
        {:else}
          {lastValue}
        {/if}
      </button>
    {:else}
      <div class="empty"></div>
    {/if}
  </div>
</div>

<style>
  .sterling-pagination {
    box-sizing: border-box;
    column-gap: 3px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-self: center;
    place-content: center;
    place-items: stretch;
    width: min-content;
    overscroll-behavior: contain;
  }

  .sterling-pagination .page-number {
    display: grid;
    place-items: stretch;
    place-content: stretch;
    min-width: calc(var(--page-number-width, 1ch) + 1em);
  }

  .sterling-pagination .empty {
    appearance: none;
    border: 2px solid transparent;
    box-sizing: border-box;
    min-width: calc(var(--page-number-width, 1ch) + 1em);
  }

  /* ----- button ----- */

  .sterling-pagination button {
    align-content: center;
    align-items: center;
    appearance: none;
    background-color: transparent;
    border-color: transparent;
    border-radius: 0;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    color: var(--stsv-button__color);
    cursor: pointer;
    display: inline-flex;
    flex-direction: row;
    font: inherit;
    justify-content: center;
    justify-items: center;
    column-gap: 0.25em;
    overflow: hidden;
    outline: none;
    padding: 0.5em 1em;
    padding: 0;
    text-decoration: none;
    text-overflow: ellipsis;
    transition:
      background-color 250ms,
      color 250ms,
      border-color 250ms;
    white-space: nowrap;
    user-select: none;
  }

  .sterling-pagination button:hover {
    background-color: var(--stsv-button__background-color--hover);
    border-color: transparent;
    color: var(--stsv-button__color--hover);
  }

  .sterling-pagination button:active {
    background-color: var(--stsv-button__background-color--active);
    border-color: transparent;
    color: var(--stsv-button__color--active);
  }

  .sterling-pagination button:focus-visible {
    border-color: var(--stsv-button__border-color--focus);
  }

  /* ----- input ----- */

  .sterling-pagination input {
    appearance: none;
    background-color: var(--stsv-input__background-color);
    border-color: transparent;
    border-bottom-color: var(--stsv-input__border-color);
    border-radius: 3px;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    color: var(--stsv-input__color);
    display: block;
    font: inherit;
    height: 100%;
    margin: 0;
    outline: none;
    padding: 0;
    text-align: center;
    transition:
      background-color 250ms,
      color 250ms,
      border-color 250ms;
    width: 100%;
    min-width: calc(var(--page-number-width, 1ch) + 1em);
  }

  .sterling-pagination input:not(:disabled) {
    background-color: var(--stsv-input__background-color--hover);
    border-bottom-color: var(--stsv-input__border-color--hover);
    color: var(--stsv-input__color--hover);
  }

  .sterling-pagination input:focus,
  .sterling-pagination input:focus {
    background-color: var(--stsv-input__background-color--focus);
    border-bottom-color: var(--stsv-input__border-color--focus);
    color: var(--stsv-input__color--focus);
  }

  .sterling-pagination input:focus-visible {
    outline-color: var(--stsv-common__outline-color);
    outline-offset: 0;
    outline-style: solid;
    outline-width: 2px;
    outline: none;
  }
  @media (prefers-reduced-motion) {
    .sterling-pagination button,
    .sterling-pagination input {
      transition: none;
    }
  }
</style>
