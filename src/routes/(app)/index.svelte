<script>
  import Gallery from './Gallery.svelte';
  import { preBlocks } from './indexPre';
</script>

<div>
  <h1>sterling-svelte</h1>

  Welcome! sterling-svelte is a UI component library built on Svelte 4.

  <Gallery />

  Considerable care and effort have been taken to make each component modern, accessible, and
  lightweight. - Components are headless by default. - There isn't a default style and you entirely
  control the CSS style. - There is a default style you can opt-in to using. - Component code is
  written in ideomatic Svelte that provides fast rendering, component customization, and reactivity.
  - The library targets evergreen browsers and follows aria accessibility standards. - Dependencies
  are kept to a minimum to keep bundle size as small as possible.

  <h2>Installation</h2>

  <h3>
    1. In your Svelte application, use your favorite package manager to install the sterling-svelte
    library.
  </h3>

  <pre>{preBlocks.install1}</pre>

  <pre>{preBlocks.install2}</pre>

  <h3>2. In App.svelte, import the default style and theme (or import your own).</h3>

  <pre>{preBlocks.importCss1}</pre>

  If you are working in the svelte.dev REPL or another project where you cannot import CSS directly,
  you can use this alternative:

  <pre>{preBlocks.importCss2}</pre>

  <h3>
    3. In App.svelte, support light/dark modes. If you want to use the CSS variables for the entire
    body, set atDocumentRoot to true.
  </h3>

  <pre>{preBlocks.darkLightMode}
</pre>

  <h3>
    4. Add sterling-svelte components. You can import components from the .svelte file or directly
    from the library.
  </h3>

  <pre>{preBlocks.firstButton}</pre>

  <h2>Component Documentation</h2>

  The documentation for each component includes:

  <ul>
    <li>a running playground where you can try out different properties</li>

    <ul>
      <li>As you configure properites, the component code is displayed.</li>
      <li>Available variants in the Sterling theme are listed next to the variant field.</li>
    </ul>
    <li>details of each property, event, and method</li>
    <li>usage, behavior, and design points to consider</li>
    <li>the anatomy of the rendered HTML including classes and slots</li>
  </ul>

  <h2>Contributing</h2>

  The project welcomes all contributions! Create a work item on GitHub if you find a bug, have a
  feature request, want to contribute a component, or want to showcase your app/site built using
  sterling-svelte.
</div>
