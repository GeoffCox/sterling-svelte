<script lang="ts">
  import Input from '$lib/Input.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="Input">
  <div class="fluent-special">
    <Input placeholder="Input" />
  </div>
</PictureFrame>

<style>
  .fluent-special :global(.sterling-input input:not(:disabled)) {
    border-bottom-color: black;
    border-bottom-width: 2px;
  }

  .fluent-special :global(.sterling-input:hover input:not(:disabled)) {
    border-bottom-color: black;
  }

  .fluent-special :global(.sterling-input input:not(:disabled):focus) {
    outline: none;
    border-bottom-color: #0078d4;
  }
</style>
