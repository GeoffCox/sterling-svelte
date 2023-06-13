<script lang="ts">
  import Input from '$lib/Input.svelte';
  import tinycolor from 'tinycolor2';

  export let colorful = false;
  export let composed = false;
  export let disabled = false;
  export let id: string | undefined = undefined;
  export let value: string = '';

  export let format: 'preserve' | 'hex' | 'rgb' | 'hsl' = 'preserve';

  const onChange: svelte.JSX.ChangeEventHandler<HTMLInputElement> = (event) => {
    let text = event?.currentTarget?.value;

    const color = tinycolor(text);
    if (color.isValid()) {
      switch (format) {
        case 'rgb':
          value = color.toRgbString();
          break;
        case 'hex':
          value = color.toHexString();
          break;
        case 'hsl':
          value = color.toHslString();
          break;
        case 'preserve':
        default:
          value = color.toString();
          break;
      }
    }
  };
</script>

<Input
  {colorful}
  {composed}
  {disabled}
  {id}
  bind:value
  on:beforeinput
  on:blur
  on:click
  on:change
  on:change={(e) => onChange(e)}
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
  on:wheel
  {...$$restProps}
/>
