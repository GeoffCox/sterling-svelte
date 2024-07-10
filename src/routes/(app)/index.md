<script>
    import Gallery from './Gallery.svelte';
</script>

# sterling-svelte

Welcome! sterling-svelte is a UI component library built on Svelte.

<Gallery/>

Considerable care and effort have been taken to make each component lightweight, accessible, modern, and flexible.

- Components are headless (i.e. not default style) by default.
  This means there isn't a default style and you entirely control the CSS style.
  Of course, there is a default style available if you decide to use it.
- Component code is written in ideomatic Svelte that provides fast, compiled Javascript, slots for customization, and reactivity.
- The library is built for evergreen browsers and follows aria accessibility standards.
- Dependencies are kept to a minimum to keep bundle size as small as possible.

## Installation

1. In your Svelte application, use your favorite package manager to install the sterling-svelte library.

```
npm install @geoffcox/sterling-svelte
```

```
yarn add @geoffcox/sterling-svelte
```

2. In App.svelte, import the CSS. This shows importing the default styles.

```
import '@geoffcox/sterling-svelte/css/sterling.css';
```

3. In App.svelte, support light/dark modes. This example applies the mode class to the document.

```
<script lang="ts">
  import { applyLightDarkMode } from '@geoffcox/sterling-svelte';
</script>

<div use:applyLightDarkMode={{atDocumentRoot: true}}>
  <!-- ... -->
</div>
```

4. Add sterling-svelte components. You can import components from the .svelte file or directly from the library.

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
  - Available Sterling theme variants are listed next to the variant field.
- each property, event, and method
- usage, behavior, and design points to consider
- the anatomy of the rendered elements, classname and slots

## Contributing

- If you find bugs or missing features, please file an issue on GitHub!
- If you have a component to contribute, file an issue on GitHub and put up a PR!
- If you use sterling-svelte and want me to showcase it here, send me a link!
