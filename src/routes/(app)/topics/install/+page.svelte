<script lang="ts">
  import { preBlocks } from './preBlocks';
</script>

<h1>Installation</h1>

<ol>
  <li>In your Svelte application, use your favorite package manager to install sterling-svelte.</li>

  <pre>{preBlocks.npmInstall}</pre>

  <pre>{preBlocks.yarnInstall}</pre>

  <li>
    Add sterling-svelte components. You can import each component from their .svelte file or
    multiple from the library.
  </li>

  <pre>{preBlocks.addComponents}</pre>
</ol>

<h2>Apply the Sterling theme (optional & recommended)</h2>
<p>
  If you don't have your own theme for sterling-svelte, it is recommended to use the Sterling theme.
</p>
<ol>
  <li>Add the sterling-svelte-themes package</li>
  <pre>{preBlocks.npmInstallThemes}</pre>
  <pre>{preBlocks.yarnInstallThemes}</pre>

  <li>In the root of your applications (+layout.svelte), import the Sterling theme.</li>

  <pre>{preBlocks.importCss}</pre>

  <li>Set either light-mode or dark-mode on the root of your application.</li>

  <pre>{preBlocks.htmlLightDark}</pre>
</ol>
<h2>Support light and dark modes (optional)</h2>
<ol>
  <li>Import the applyLightDarkMode action in the script section.</li>

  <pre>{preBlocks.importLightDark}
  </pre>

  <li>Use applyLightDark mode on the top-level div of your application.</li>

  <p>
    Recommended: Specify <code>atDocumentRoot: true</code> to apply the class at the root of the HTML
    document. This ensure styles are applied to floating UI appending to the body element's children.
  </p>

  <pre>{preBlocks.useLightDark}</pre>
</ol>

<h2>How to use the Sterling theme in Svelte REPL</h2>
If you are working in the svelte.dev REPL or another project where you cannot import CSS from Svelte
components, you can use this alternative:

<pre>{preBlocks.replImport}</pre>
