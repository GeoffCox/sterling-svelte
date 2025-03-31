<script>
  import { base } from '$app/paths';
  import Link from '$lib/Link.svelte';
  import Gallery from './Gallery.svelte';
</script>

<div class="topic-page">
  <h1>Overview</h1>

  <p>Welcome to sterling-svelte, a UI component library built on Svelte!</p>

  <p>
    Each component is modern, accessible, and fast. The code works across evergreen browsers and
    meets ARIA accessibility standards. The library was built for real-world, production sites and
    applications.
  </p>

  <h2>What's New</h2>
  <p>
    This version, v2, is built on Svelte 5. You can keep using sterling-svelte v1, but it won't get
    improvements or bug fixes. Svelte 5 introduces a whole new way of building components and
    managing state. That means breaking changes, but they aren't too bad. Check out the <Link
      href={`${base}/topics/migration-from-v1`}>Migration from v1</Link
    > guide.
  </p>

  <h2>Styling</h2>
  <p>
    The library is headless. This package does not contain CSS and components do not have a default
    style. Instead, components apply semantic class names that can be used to apply any style.
  </p>
  <p>
    Of course there is a ready-made style you can use: Sterling. <Link
      href="https://www.npmjs.com/package/@geoffcox/sterling-svelte-themes"
      target="_blank"
      class="ghost"
    >
      @geoffcox/sterling-svelte-themes</Link
    > provides a clean, modern, and accessible theme. It supports both light and dark modes.
  </p>

  <p>This documentation site uses the Sterling theme. Here's some examples:</p>

  <Gallery />

  <h2>Dependencies</h2>
  <p>Dependencies are kept to a minimum to keep bundle size as small as possible.</p>

  <ul>
    <li>@floating-ui/dom: provides positioning of floating elements like menus and popovers.</li>
    <li>
      keyborg: tracks if the user is using the keyboard to distinguish between focus and keyboard
      focus styles.
    </li>
    <li>lodash-es: provides robust helper function for math, collections, and debounce.</li>
  </ul>

  <h2>Documentation</h2>

  The documentation for each component includes:

  <ul>
    <li>An interactive playground</li>
    <li>A live code example</li>
    <li>Details about each type, property, event, and method</li>
    <li>Usage, behavior, and other considerations</li>
    <li>Component anatomy</li>
  </ul>

  <h2>Contributing</h2>

  Contributors are welcome! Create a work item on GitHub if you find a bug or have a feature
  request. Create a PR to contribute a component, feature, or fix.
</div>

<style>
  .topic-page {
    max-width: 900px;
  }
</style>
