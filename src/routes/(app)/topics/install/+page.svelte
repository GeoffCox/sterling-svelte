<script lang="ts">
  import Link from '$lib/Link.svelte';
  import { preBlocks } from './preBlocks';
</script>

<div class="topic-page">
  <h1>Installation</h1>

  <ol>
    <li>
      In your Svelte application, use your favorite package manager to install sterling-svelte.
    </li>

    <pre>{preBlocks.npmInstall}</pre>

    <pre>{preBlocks.yarnInstall}</pre>

    <li>
      Add sterling-svelte components. You can import each component from their .svelte file or
      multiple at once from the library root.
    </li>

    <pre>{preBlocks.addComponents}</pre>
  </ol>

  <h2>Use the Sterling theme (optional)</h2>
  <ol>
    <li>Add the sterling-svelte-themes package</li>
    <pre>{preBlocks.npmInstallThemes}</pre>
    <pre>{preBlocks.yarnInstallThemes}</pre>

    <li>In the root of your application (+layout.svelte), import the Sterling theme.</li>

    <pre>{preBlocks.importCss}</pre>
  </ol>
  <p>The Sterling theme automatically switches betweens light and dark modes.</p>
  <h2>How to use the Sterling theme in a REPL</h2>
  If you are in the <Link href="https://svelte.dev/playground" target="_blank"
    >Svelte playground</Link
  > or another project where you cannot import CSS from the sterling-svelte-themes package, you can use
  this alternative:

  <pre>{preBlocks.replExample}</pre>
</div>

<style>
  .topic-page {
    max-width: 900px;
  }
</style>
