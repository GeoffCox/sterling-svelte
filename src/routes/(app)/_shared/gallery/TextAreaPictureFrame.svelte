<script lang="ts">
  import TextArea from '$lib/TextArea.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="TextArea">
  <div class="layout">
    <TextArea placeholder="TextArea" value="TextArea" />
  </div>
</PictureFrame>

<style>
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-content: stretch;
    place-items: stretch;
    height: 5em;
  }
</style>
