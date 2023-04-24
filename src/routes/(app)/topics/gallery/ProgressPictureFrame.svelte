<script lang="ts">
  import Progress from '$lib/Progress.svelte';
  import PictureFrame from './PictureFrame.svelte';

  export let value = 35;
  export let verticalValue = 35;
</script>

<PictureFrame name="Progress">
  <div class="layout">
    <Progress {value} />
    <Progress value={verticalValue} vertical />
  </div>
</PictureFrame>

<style>
  .layout {
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 100px 100px;
    grid-template-rows: 100px;
    justify-items: center;
    align-items: stretch;
    column-gap: 1em;
    width: 200px;
    height: 100px;
  }
</style>
