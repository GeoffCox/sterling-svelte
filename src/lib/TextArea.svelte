<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type { TextAreaResize } from './TextArea.types';

  // ----- Props ----- //

  export let disabled = false;
  export let value: string = '';

  /** When true, the text area will resize itself vertically to fit text.*/
  export let autoHeight = false;

  /** Sets the resize handle direction. */
  export let resize: TextAreaResize = 'none';

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let textAreaRef: HTMLTextAreaElement;

  const correctResize = async () => {
    console.log('correctResize');
    await tick();
    setTimeout(() => {
      if (autoHeight) {
        if (resize === 'both') {
          console.warn(
            'The resize property cannot be set to "both" when autoHeight is true. The resize property will be set to "horizontal".'
          );
          resize = 'horizontal';
        }
        if (resize === 'vertical') {
          console.warn(
            'The resize property cannot be set to "vertical" when autoHeight is true. The resize property will be set to "none".'
          );
          resize = 'none';
        }
      }
    }, 0);
  };

  $: autoHeight, resize, correctResize();

  // ----- autoHeight ----- //

  const autoSetHeight = () => {
    if (autoHeight && textAreaRef) {
      // the style must be directly set to avoid re-rendering looping latency
      // setting to auto for a moment allows the textarea to shrink
      textAreaRef.style.height = 'auto';
      textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
    }
  };

  $: autoHeight, autoSetHeight();

  // ----- Event Handlers ----- //

  const onInput = () => {
    autoSetHeight();
  };

  onMount(() => {
    autoSetHeight();
  });

  // ----- Methods ----- //

  export const blur = () => {
    textAreaRef?.blur();
  };

  export const click = () => {
    textAreaRef?.click();
  };

  export const focus = (options?: FocusOptions) => {
    textAreaRef?.focus();
  };

  export const select = () => {
    textAreaRef?.select();
  };

  export const setSelectionRange = (
    start: number | null,
    end: number | null,
    direction?: 'forward' | 'backward' | 'none'
  ) => {
    textAreaRef?.setSelectionRange(start, end, direction);
  };

  export const setRangeText = (
    replacement: string,
    start?: number,
    end?: number,
    selectionMode?: SelectionMode
  ) => {
    if (start && end) {
      textAreaRef?.setRangeText(replacement, start, end, selectionMode);
    } else {
      textAreaRef?.setRangeText(replacement);
    }
  };
</script>

<div class={`sterling-text-area ${variant}`} class:disabled>
  <textarea
    bind:this={textAreaRef}
    bind:value
    {disabled}
    rows="1"
    style={`--TextArea__resize: ${resize};`}
    on:beforeinput
    on:blur
    on:click
    on:change
    on:copy
    on:cut
    on:paste
    on:dblclick
    on:dragend
    on:dragenter
    on:dragleave
    on:dragover
    on:dragstart
    on:drop
    on:focus
    on:focusin
    on:focusout
    on:input
    on:invalid
    on:keydown
    on:keypress
    on:keyup
    on:mousedown
    on:mouseenter
    on:mouseleave
    on:mousemove
    on:mouseover
    on:mouseout
    on:mouseup
    on:select
    on:submit
    on:reset
    on:wheel|passive
    on:input={onInput}
    {...$$restProps}
  />
</div>
