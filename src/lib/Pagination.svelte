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
