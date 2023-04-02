# Getting started with sterling-svelte

## 1. Install the package

Use your favorite package manager to install the sterling-svelte library.

```
npm install @geoffcox/sterling-svelte
```

```
yarn add @geoffcox/sterling-svelte
```

## 2. Apply a theme

Use one of the theme actions to apply a theme at the top-level of your application.

You can choose from the built in themes or create your own:

- Use `applyLightTheme` for the default light theme
- Use `applyDarkTheme` for the default dark theme
- Use `toggleDarkTheme` to automatically choose the default light or dark theme based on `prefers-color-scheme` .

```svelte
<script>
  import { applyLightTheme } from '@geoffcox/sterling-svelte';
</script>

<div use:applyLightTheme>
  <!-- The rest of the app goes here -->
</div>
```

## 3. Add components

You can import components from svelte files under `*.svelte` (recommended) or from the library root.

```svelte
<script>
  import { toggleDarkTheme } from '@geoffcox/sterling-svelte';
  import Button from '@geoffcox/sterling-svelte/Button.svelte';
  import { Checkbox } from '@geoffcox/sterling-svelte';
</script>

<div use:toggleDarkTheme>
  <Button>Hello sterling-svelte</Button>
  <Checkbox>Ready</Checkbox>
</div>
```

## 4. Go forth and code

All the sterling-svelte components are designed and implemented to take advantage of Svelte's great features.
They have properties allowing you control over appearance and behavior. You can provide or replace content through slots.
You can bind to values or listen to events to handle changes.

Several components are simply styled native HTML elements. These components accept all the native
element's properties and raise all the native element's events. You can quickly substitute them for native elements.

Every component is designed to follow the theme, meets accessbility (ARIA) and a11y standards, and is built for composition.

Enjoy!
