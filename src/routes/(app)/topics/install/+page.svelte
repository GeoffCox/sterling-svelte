<script>
  // @ts-nocheck

  import { preBlocks } from './indexPre';
</script>

<h1>Installation</h1>

<ol>
  <li>In your Svelte application, use your favorite package manager to install sterling-svelte.</li>

  <pre>{`npm install @geoffcox/sterling-svelte`}</pre>

  <pre>{`yarn add @geoffcox/sterling-svelte`}</pre>

  <li>
    Add sterling-svelte components. You can import each component from their .svelte file or
    multiple from the library.
  </li>

  <pre>{`<script>
  import Button from '@geoffcox/sterling-svelte/Button.svelte';
  import { Checkbox } from '@geoffcox/sterling-svelte';
</script>

<div>
  <Button>Hello sterling-svelte</Button>
  <Checkbox>Ready</Checkbox>
</div>`}</pre>
</ol>

<h2>Apply the Sterling theme (optional & recommended)</h2>
<p>
  If you don't have your own theme for sterling-svelte, it is recommended to use the Sterling theme.
</p>
<ol>
  <li>Add the sterling-svelte-themes package</li>
  <pre>{`npm install @geoffcox/sterling-svelte-themes`}</pre>

  <pre>{`yarn add @geoffcox/sterling-svelte-themes`}</pre>

  <li>In the root of your applications (+layout.svelte), import the Sterling theme.</li>

  <pre>{`import '@geoffcox/sterling-svelte-themes/sterling.css';`}</pre>

  <li>Set either light-mode or dark-mode on the root of your application.</li>

  <pre>{`<html class="light-mode"></html>`}</pre>
</ol>
<h2>Support light and dark modes (optional)</h2>
<ol>
  <li>Import the applyLightDarkMode action in the script section.</li>

  <pre>{`import { applyLightDarkMode } from '@geoffcox/sterling-svelte';

// TODO: Provide UI to toggle this between auto, light, or dark.
let mode = $state('auto');`}
  </pre>

  <li>Use applyLightDark mode on the top-level div of your application.</li>

  <p>
    Recommended: Specify <code>atDocumentRoot: true</code> to apply the class at the root of the HTML
    document. This ensure styles are applied to floating UI appending to the body element's children.
  </p>

  <pre>{`<div use:applyLightDarkMode={{atDocumentRoot: true, mode}}>
  ...
</div>`}</pre>
</ol>

<h2>How to use the Sterling theme in Svelte REPL</h2>
If you are working in the svelte.dev REPL or another project where you cannot import CSS from Svelte
components, you can use this alternative:

<pre>{`<svelte:head>
  <link href="https://unpkg.com/@geoffcox/sterling-svelte-themes/css/sterling.css" rel="stylesheet">
</svelte:head>`}</pre>
