<script lang="ts">
  import Callout from '$lib/Callout.svelte';
  import PictureFrame from './PictureFrame.svelte';

  let reference: HTMLDivElement;
</script>

<PictureFrame name="Callout">
  <div class="layout">
    <div class="default">
      <Callout open {reference} placement="top" mainAxisOffset={5}>
        <div class="callout-text">sterling-svelte</div></Callout
      >
      <div class="reference" bind:this={reference} />
    </div>
  </div>
</PictureFrame>

<style>
  .layout {
    place-content: center;
    place-items: center;
    display: grid;
    column-gap: 1em;
  }

  .default {
    display: grid;
    place-content: center;
    place-items: center;
    min-height: 50px;
    min-width: 50px;
  }

  .callout-text {
    padding: 0.25em;
  }

  .reference {
    margin-top: 25px;
    background-color: var(--stsv-common__background-color--secondary);
    height: 10px;
    width: 10px;
  }
</style>
