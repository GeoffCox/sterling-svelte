<script>
    import Gallery from './Gallery.svelte';
</script>

# sterling-svelte

Welcome! sterling-svelte is a UI component library built on Svelte 4.

<Gallery/>

Considerable care and effort have been taken to make each component modern, accessible, and lightweight.

- Components are headless by default.
  - There isn't a default style and you entirely control the CSS style.
  - There is a default style you can opt-in to using.
- Component code is written in ideomatic Svelte that provides fast rendering, component customization, and reactivity.
- The library targets evergreen browsers and follows aria accessibility standards.
- Dependencies are kept to a minimum to keep bundle size as small as possible.

## Installation

### 1. In your Svelte application, use your favorite package manager to install the sterling-svelte library.

```
npm install @geoffcox/sterling-svelte
```

```
yarn add @geoffcox/sterling-svelte
```

### 2. In App.svelte, import the default style and theme (or import your own).

```
import '@geoffcox/sterling-svelte/css/sterling.css';
```

If you are working in the svelte.dev REPL or another project where you cannot import CSS directly, you can use this alternative:

```
<svelte:head>
	<link href="https://unpkg.com/@geoffcox/sterling-svelte/dist/css/sterling.css" rel="stylesheet">
</svelte:head>
```

### 3. In App.svelte, support light/dark modes. If you want to use the CSS variables for the entire body, set atDocumentRoot to true.

```
<script lang="ts">
  import { applyLightDarkMode } from '@geoffcox/sterling-svelte';
</script>

<div use:applyLightDarkMode={{atDocumentRoot: true}}>
  <!-- ... -->
</div>
```

### 4. Add sterling-svelte components. You can import components from the .svelte file or directly from the library.

```
<script>
  import Button from '@geoffcox/sterling-svelte/Button.svelte';
  import { Checkbox } from '@geoffcox/sterling-svelte';
</script>

<div>
  <Button>Hello sterling-svelte</Button>
  <Checkbox>Ready</Checkbox>
</div>
```

## Component Documentation

The documentation for each component includes:

- a running playground where you can try out different properties
  - As you configure properites, the component code is displayed.
  - Available variants in the Sterling theme are listed next to the variant field.
- details of each property, event, and method
- usage, behavior, and design points to consider
- the anatomy of the rendered HTML including classes and slots

## Contributing

The project welcomes all contributions!

Create a work item on GitHub if you find a bug, have a feature request, want to contribute a component, or want to showcase your app/site built using sterling-svelte.
