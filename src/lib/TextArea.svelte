<svelte:options runes={true} />

<script lang="ts">
  import { tick } from 'svelte';
  import type { TextAreaResize } from './TextArea.types';
  import type { FormEventHandler, HTMLTextareaAttributes } from 'svelte/elements';

  type Props = HTMLTextareaAttributes & {
    disabled?: boolean | null | undefined;
    value?: string;
    autoHeight?: boolean | null | undefined;
    resize?: TextAreaResize;
  };

  let {
    class: _class,
    disabled = false,
    value = $bindable(''),
    autoHeight = false,
    resize = $bindable('none'),
    style,
    ...rest
  }: Props = $props();

  let textAreaRef: HTMLTextAreaElement;

  const correctResize = async () => {
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

  const autoSetHeight = () => {
    if (autoHeight && textAreaRef) {
      // the style must be directly set to avoid re-rendering looping latency
      // setting to auto for a moment allows the textarea to shrink
      textAreaRef.style.height = 'auto';
      textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
    }
  };

  $effect(() => {
    autoHeight;
    resize;
    correctResize();
    autoSetHeight();
  });

  const onInput: FormEventHandler<HTMLTextAreaElement> = (event) => {
    autoSetHeight();
    rest.oninput?.(event);
  };

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

<div class={`sterling-text-area ${_class}`} class:disabled>
  <textarea
    bind:this={textAreaRef}
    bind:value
    {disabled}
    rows="1"
    {...rest}
    oninput={onInput}
    style={`--TextArea__resize: ${resize};${style}`}
  ></textarea>
</div>
