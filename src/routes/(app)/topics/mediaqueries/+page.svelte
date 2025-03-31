<script lang="ts">
  import { preBlocks } from './pagePre';
</script>

<div class="topic-page">
  <h1>Media Query Stores</h1>

  <p>
    Media queries are exposed as Svelte stores. This allows you to easily subscribe to handle
    changing values.
  </p>

  <h2>prefersColorSchemeDark</h2>

  <p>
    A Svelte store that keeps a boolean up to date if the <code>prefers-color-scheme</code> media query
    matches 'dark'.
  </p>

  <pre>{preBlocks.prefersColorSchemeDark}</pre>

  <h2>prefersReducedMotion</h2>

  <p>
    A Svelte store that keeps a boolean up to date if the <code>prefers-reduced-motion</code> media query
    matches 'reduce'.
  </p>

  <pre>{preBlocks.prefersReducedMotion}</pre>

  <h2>usingKeyboard</h2>

  <p>
    A Svelte store that keeps a boolean up to date if the user is typing on the keyboard. This is a
    wrapper around Keyborg's value.
  </p>

  <pre>{preBlocks.usingKeyboard}</pre>
</div>

<style>
  .topic-page {
    max-width: 900px;
  }
</style>
