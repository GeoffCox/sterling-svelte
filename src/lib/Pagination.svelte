<script lang="ts">
  import { tick, type Snippet } from 'svelte';
  import type { HTMLAttributes, KeyboardEventHandler } from 'svelte/elements';
  import Button from './Button.svelte';

  /*
  <<      1   2  >> 256
         ---

  <<  1   2   3  >> 256
         ---

1 <<  2   3   4  >> 256
         ---

1 << 123 124 125 >> 256
         ---

1 << 255 256     >>    
         ---

  
*/

  /** Provides the array of page numbers handling first and last cases.*/
  const getPageNumbers = (current: number, count: number) => {
    // [1]  2   3   4   5
    //  1  [2]  3   4   5
    //  1   2  [3]  4   5
    //  1   2  [3]  4   5

    // if there are fewer than 5 pages,
    // or the index is 0 or 1
    // then we start at position 0;
    let firstPosition = 1;

    // if there are more than 5 pages
    // and the index is 2 or greater
    // then we shift the first position
    if (count > 5) {
      if (current >= 3) {
        firstPosition = current - 2;
      }

      // if the last position is greater than the count
      // then we set the first position to show up to count
      const lastPosition = firstPosition + 4;
      firstPosition = lastPosition > count ? count - 4 : firstPosition;
    }

    return Array.from({ length: Math.min(5, count) }, (_, i) => {
      return firstPosition + i;
    });
  };

  type Props = HTMLAttributes<HTMLDivElement> & {
    value?: number;
    count: number;
    stepSize?: number;
    onChange?: (page: number) => void;
    pageNumber?: Snippet<[number, boolean]>;
    firstIcon?: Snippet;
    stepPreviousIcon?: Snippet;
    previousIcon?: Snippet;
    nextIcon?: Snippet;
    stepNextIcon?: Snippet;
    lastIcon?: Snippet;
  };

  let {
    class: _class,
    value = $bindable(1),
    count,
    stepSize: propsStepSize,
    onChange,
    pageNumber,
    firstIcon,
    stepPreviousIcon,
    previousIcon,
    nextIcon,
    stepNextIcon,
    lastIcon
  }: Props = $props();

  let pageNumbers = $derived(getPageNumbers(value, count));
  let stepSize = $derived(propsStepSize ?? (count > 100 ? 20 : count > 20 ? 10 : 5));
  let numberOfDigits = $derived(count.toString().length);

  const onFirst = () => {
    value = 1;
  };

  const onStepPrevious = () => {
    value = Math.max(1, value - stepSize);
  };

  const onPrevious = () => {
    value = Math.max(1, value - 1);
  };

  const onNext = () => {
    value = Math.min(value + 1, count);
  };

  const onStepNext = () => {
    value = Math.min(value + stepSize, count);
  };

  const onLast = () => {
    value = count;
  };

  const goToPage = (page: number) => {
    value = page;
  };

  const focusValue = async () => {
    await tick();
    const candidate: HTMLButtonElement | null = document.querySelector(
      `button[data-value="${value}"]`
    );
    if (candidate) {
      candidate.focus();
    }
  };

  const onPageNumberKeydown: KeyboardEventHandler<HTMLButtonElement> = (event: KeyboardEvent) => {
    console.log(event.key);
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        onPrevious();
        focusValue();
        break;
      case 'ArrowRight':
        event.preventDefault();
        onNext();
        focusValue();
        break;
      case 'Home':
        event.preventDefault();
        onFirst();
        focusValue();
        break;
      case 'End':
        event.preventDefault();
        onLast();
        focusValue();
        break;
      case 'PageUp':
        event.preventDefault();
        onStepPrevious();
        focusValue();
        break;
      case 'PageDown':
        event.preventDefault();
        onStepNext();
        focusValue();
        break;
    }
  };

  $effect(() => {
    onChange?.(value);
  });

  $effect(() => {
    value = Math.max(1, Math.min(value, count));
  });
</script>

<div class="sterling-pagination" style={`--page-number-width: ${numberOfDigits}ch`}>
  <div class="page-numbers">
    {#each pageNumbers as page}
      <Button
        class={page === value ? 'selected' : undefined}
        onclick={() => goToPage(page)}
        onkeydown={onPageNumberKeydown}
        data-value={page}
      >
        {#if pageNumber}
          {@render pageNumber(page, page === value)}
        {:else}
          <div class="page-number" class:selected={page === value}>{page}</div>
        {/if}</Button
      >
    {/each}
  </div>
  <div class="buttons">
    <Button class="first" onclick={onFirst} onkeydown={onPageNumberKeydown}>
      {#if firstIcon}
        {@render firstIcon()}
      {:else}
        |&lt;
      {/if}
    </Button>
    <Button class="step-previous" onclick={onStepPrevious} onkeydown={onPageNumberKeydown}>
      {#if stepPreviousIcon}
        {@render stepPreviousIcon()}
      {:else}
        &lt;&lt;
      {/if}
    </Button>
    <Button class="previous" onclick={onPrevious} onkeydown={onPageNumberKeydown}>
      {#if previousIcon}
        {@render previousIcon()}
      {:else}
        &lt;
      {/if}
    </Button>
    <Button class="next" onclick={onNext} onkeydown={onPageNumberKeydown}>
      {#if nextIcon}
        {@render nextIcon()}
      {:else}
        &gt;
      {/if}
    </Button>
    <Button class="step-next" onclick={onStepNext} onkeydown={onPageNumberKeydown}>
      {#if stepNextIcon}
        {@render stepNextIcon()}
      {:else}
        &gt;&gt;
      {/if}
    </Button>
    <Button class="last" onclick={onLast} onkeydown={onPageNumberKeydown}>
      {#if lastIcon}
        {@render lastIcon()}
      {:else}
        &gt;|
      {/if}
    </Button>
  </div>
</div>

<style>
  .sterling-pagination {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    row-gap: 1px;
  }

  .page-numbers {
    display: grid;
    grid-template-columns: auto;
    grid-auto-flow: column;
    justify-self: center;
    justify-items: space-evenly;
    column-gap: 1em;
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-self: center;
    justify-items: space-evenly;
  }

  .sterling-pagination :global(button) {
    background-color: transparent;
    border-color: transparent;
    border-radius: 0;
    color: var(--stsv-common__color--secondary);
  }

  .sterling-pagination :global(button:hover) {
    background-color: var(--stsv-button__background-color--hover);
    border-color: transparent;
  }

  .sterling-pagination :global(button:active) {
    background-color: var(--stsv-button__background-color--active);
    border-color: transparent;
  }

  .sterling-pagination :global(button:focus-visible) {
    border-color: var(--stsv-button__border-color--focus);
  }

  .sterling-pagination .page-numbers :global(button) {
    border: 2px solid transparent;
    padding: 0.125em;
  }

  .sterling-pagination .page-numbers :global(button.selected) {
    background-color: var(--stsv-common__background-color--secondary);
    color: var(--stsv-common__color);
  }

  .sterling-pagination .page-number {
    min-width: var(--page-number-width, 1ch);
  }

  .sterling-pagination .buttons :global(button) {
    padding: 0.25em 0.5em;
  }
</style>
