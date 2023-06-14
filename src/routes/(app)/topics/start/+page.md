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

**_Enjoy!_**
