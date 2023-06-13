<script lang="ts">
  import Input from '$lib/Input.svelte';

  // ----- Props ----- //
  export let radius: string = '1em';
</script>

<div class="radius-editor" style={`--current-radius: ${radius}`}>
  <div class="width-input">
    <Input bind:value={radius} />
  </div>
  <div class="previews">
    <div class="preview size-small thin-border" />
    <div class="preview size-small medium-border" />
    <div class="preview size-small thick-border" />
    <div class="preview size-medium thin-border" />
    <div class="preview size-medium medium-border" />
    <div class="preview size-medium thick-border" />
    <div class="preview size-large thin-border" />
    <div class="preview size-large medium-border" />
    <div class="preview size-large thick-border" />
  </div>
</div>

<style>
  .radius-editor {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    align-items: center;
    justify-content: flex-start;
    column-gap: 0.5em;
    row-gap: 0.5em;
  }

  .width-input {
    display: grid;
    justify-items: stretch;
  }

  .previews {
    place-content: center;
    place-items: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    column-gap: 0.125em;
    row-gap: 0.125em;
  }

  .preview {
    border: 1px solid var(--stsv-common__border-color);
    border-radius: var(--current-radius);
    box-sizing: border-box;
  }

  .preview.size-small {
    width: 1em;
    height: 1em;
  }

  .preview.size-medium {
    width: 2em;
    height: 2em;
  }

  .preview.size-large {
    width: 4em;
    height: 4em;
  }

  .preview.thin-border {
    border-width: 1px;
  }

  .preview.medium-border {
    border-width: 2px;
  }

  .preview-thick-border {
    border-width: 4px;
  }
</style>
