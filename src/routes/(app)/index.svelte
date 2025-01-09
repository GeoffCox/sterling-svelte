<script>
  import Link from '$lib/Link.svelte';
  import Gallery from './Gallery.svelte';
  import { base } from '$app/paths';
</script>

<div>
  <h1>Overview</h1>

  <p>Welcome to sterling-svelte, a UI component library built for Svelte!</p>

  <p>
    Every component is modern, accessible, and fast. The code targets evergreen browsers and meets
    ARIA accessibility standards. The library quality is meant for real world, production
    applications and sites.
  </p>

  <h2>What's New</h2>
  <p>
    Version 2 of sterling-svelte is built on Svelte 5. You can keep using sterling-svelte 1, but
    this is the version getting improvements and bug fixes. Svelte 5 does have breaking changes. See
    the <Link href={`${base}/topics/migration-from-v1`}>Migration from v1</Link> guide.
  </p>

  <h2>Styling</h2>
  <p>
    The library is headless; components don't contain or apply any CSS styles. Components render
    class names and data attributes to enable rich styling. You can easily style components by using
    the <Link
      href="https://www.npmjs.com/package/@geoffcox/sterling-svelte-themes"
      target="_blank"
      class="ghost"
    >
      @geoffcox/sterling-svelte-themes</Link
    > CSS package. It contains the Sterling theme with both light and dark mode variations.
  </p>

  <p>This documentation applies the Sterling theme. Here's examples of a few components:</p>

  <Gallery />

  <h2>Dependencies</h2>
  <p>Dependencies are kept to a minimum to keep bundle size as small as possible.</p>

  <h2>Documentation</h2>

  The documentation for each component includes:

  <ul>
    <li>An interactive playground</li>
    <li>Component code that is updated as you change properties</li>
    <li>Descriptions of each type, property, event, and method</li>
    <li>Usage, behavior, and other considerations</li>
    <li>Anatomy of the component</li>
  </ul>

  <h2>Contributing</h2>

  Contributors are welcome! Create a work item on GitHub if you find a bug or have a feature
  request. Create a PR to contribute a component, feature, or fix.
</div>
