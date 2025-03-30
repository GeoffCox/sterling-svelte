<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  import type { PaginationProps } from './Pagination.types';

  let {
    class: _class,
    itemCount,
    itemRange = $bindable(), //readonly
    page = $bindable(),
    pageCount = $bindable(), //readonly
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

  let _pageCount = $derived(
    itemCount > 0 && pageSize > 0 ? Math.ceil(itemCount / pageSize) : undefined
  );

  // 1 time update of pageCount when loaded because effect runs too late
  // svelte-ignore state_referenced_locally
  pageCount = _pageCount;

  // readonly props cannot be assigned $derived values
  $effect(() => {
    pageCount = _pageCount;
  });

  // clamp the page internally
  let _page = $derived(_pageCount && page ? Math.max(1, Math.min(page, _pageCount)) : undefined);

  let _itemRange = $derived(
    _pageCount && _page
      ? {
          index: _page ? Math.max(0, (_page - 1) * pageSize) : 0,
          count: _page ? Math.max(0, Math.min(pageSize, itemCount - (_page - 1) * pageSize)) : 0
        }
      : undefined
  );

  // 1 time update of itemRange when loaded because effect runs too late
  // svelte-ignore state_referenced_locally
  itemRange = _itemRange;

  // readonly props cannot be assigned $derived values yet
  $effect(() => {
    itemRange = _itemRange;
  });

  $effect(() => {
    onChange?.(_page, _itemRange);
  });

  let firstValue = $derived(_pageCount && _page && _page >= 3 ? 1 : undefined);
  let stepPreviousValue = $derived(_pageCount && _page ? Math.max(1, _page - pageStep) : undefined);
  let previousValue = $derived(_pageCount && _page && _page >= 2 ? _page - 1 : undefined);
  // _page acts as the currentValue;
  let nextValue = $derived(_pageCount && _page && _page <= _pageCount - 1 ? _page + 1 : undefined);
  let stepNextValue = $derived(
    _pageCount && _page ? Math.min(_pageCount, _page + pageStep) : undefined
  );
  let lastValue = $derived(_pageCount && _page && _page <= _pageCount - 2 ? _pageCount : undefined);

  let numberOfDigits = $derived(_pageCount ? _pageCount.toString().length : 1);

  // clamp page when the value changes
  const setPage = (newPage?: number) => {
    page = _pageCount && newPage ? Math.max(1, Math.min(newPage, _pageCount)) : undefined;
  };

  const onFirst = () => {
    setPage(1);
  };

  const onStepPrevious = () => {
    _page && setPage(_page - Math.abs(pageStep));
  };

  const onPrevious = () => {
    _page && setPage(_page - 1);
  };

  const onNext = () => {
    _page && setPage(_page + 1);
  };

  const onStepNext = () => {
    _page && setPage(_page + Math.abs(pageStep));
  };

  const onLast = () => {
    _pageCount && setPage(_pageCount);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.currentTarget.value;
    if (inputValue.length > 0) {
      const value = parseInt(inputValue, 10);
      value && setPage(value);
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

<div class="sterling-pagination" style={`--page-number-width: ${numberOfDigits}ch`}>
  <div class="page-number first">
    <button
      disabled={firstValue === undefined}
      type="button"
      onclick={onFirst}
      onkeydown={(event) => onKeydown(event, onFirst)}
      data-value={firstValue}
    >
      {#if firstNumber}
        {@render firstNumber(firstValue)}
      {:else if firstValue}
        {firstValue}
      {:else}
        -
      {/if}</button
    >
  </div>
  <div class="page-number step-previous">
    <button
      disabled={stepPreviousValue === undefined}
      type="button"
      onmousedown={(event) => startHoldButton(event, onStepPrevious)}
      onmouseup={stopHoldButton}
      onmouseleave={stopHoldButton}
      onkeydown={(event) => onKeydown(event, onStepPrevious)}
      data-value={stepPreviousValue}
    >
      {#if stepPreviousNumber}
        {@render stepPreviousNumber(stepPreviousValue)}
      {:else if stepPreviousValue}
        &lt;&lt;
      {:else}
        -
      {/if}
    </button>
  </div>
  <div class="page-number previous">
    <button
      disabled={previousValue === undefined}
      type="button"
      onmousedown={(event) => startHoldButton(event, onPrevious)}
      onmouseup={stopHoldButton}
      onmouseleave={stopHoldButton}
      onkeydown={(event) => onKeydown(event, onPrevious)}
      data-value={previousValue}
    >
      {#if previousNumber}
        {@render previousNumber(previousValue)}
      {:else if previousValue}
        {previousValue}
      {:else}
        -
      {/if}
    </button>
  </div>
  <div class="page-number current">
    {#if _page}
      {#if currentNumber}
        {@render currentNumber(_page)}
      {:else}
        <input disabled={_page === undefined} value={_page} onchange={onInputChange} />
      {/if}
    {:else}
      -
    {/if}
  </div>
  <div class="page-number next">
    <button
      disabled={nextValue === undefined}
      type="button"
      onmousedown={(event) => startHoldButton(event, onNext)}
      onmouseup={stopHoldButton}
      onmouseleave={stopHoldButton}
      onkeydown={(event) => onKeydown(event, onNext)}
      data-value={nextValue}
    >
      {#if nextNumber}
        {@render nextNumber(nextValue)}
      {:else if nextValue}
        {nextValue}
      {:else}
        -
      {/if}
    </button>
  </div>
  <div class="page-number step-next">
    <button
      disabled={stepNextValue === undefined}
      type="button"
      onmousedown={(event) => startHoldButton(event, onStepNext)}
      onmouseup={stopHoldButton}
      onmouseleave={stopHoldButton}
      onkeydown={(event) => onKeydown(event, onStepNext)}
      data-value={stepNextValue}
    >
      {#if stepNextNumber}
        {@render stepNextNumber(stepNextValue)}
      {:else if stepNextValue}
        &gt;&gt;
      {:else}
        -
      {/if}
    </button>
  </div>
  <div class="page-number last">
    <button
      disabled={lastValue === undefined}
      type="button"
      onclick={() => onLast()}
      onkeydown={(event) => onKeydown(event, onLast)}
      data-value={lastValue}
    >
      {#if lastNumber}
        {@render lastNumber(lastValue)}
      {:else if lastValue}
        {lastValue}
      {:else}
        -
      {/if}
    </button>
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

  .sterling-pagination button:not(:disabled):hover {
    background-color: var(--stsv-button__background-color--hover);
    border-color: transparent;
    color: var(--stsv-button__color--hover);
  }

  .sterling-pagination button:not(:disabled):active {
    background-color: var(--stsv-button__background-color--active);
    border-color: transparent;
    color: var(--stsv-button__color--active);
  }

  .sterling-pagination button:not(:disabled):focus-visible {
    border-color: var(--stsv-button__border-color--focus);
  }

  .sterling-pagination button:disabled {
    cursor: not-allowed;
    position: relative;
    pointer-events: none;
    color: var(--stsv-common__color--faint);
  }

  @media (prefers-reduced-motion) {
    .sterling-pagination button {
      transition: none;
    }
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
    .sterling-pagination input {
      transition: none;
    }
  }
</style>
