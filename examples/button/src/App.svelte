<script lang="ts">
  import '@geoffcox/sterling-svelte/css/sterling.css';
  import ButtonExamples from './ButtonExamples.svelte';
</script>

<main>
  <div class="light-mode">
    <ButtonExamples />
  </div>
</main>

<style>
  @import '@fontsource/open-sans';
  @import '@fontsource/source-code-pro';

  :global(:root) {
    color: var(--stsv-common__color);
    background-color: var(--stsv-common__background-color);
  }

  :global(html) {
    padding: 0;
    margin: 0;
  }

  :global(body) {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
  }

  :global(h1),
  :global(h2),
  :global(h3) {
    margin-block-start: 0.7em;
    margin-block-end: 0.25em;
  }

  :global(p) {
    margin-block-start: 0.25em;
    margin-block-end: 0.25em;
    line-height: 1.6em;
  }
</style>
