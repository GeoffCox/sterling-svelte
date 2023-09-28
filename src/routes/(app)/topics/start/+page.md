# Getting started with sterling-svelte

## 1. Install the package

Use your favorite package manager to install the sterling-svelte library.

```
npm install @geoffcox/sterling-svelte
```

```
yarn add @geoffcox/sterling-svelte
```

## 2. Apply the sterling-svelte theme

This is optional if you have your own CSS to apply.

1. In your top-level application, import the styles

```ts
import '@geoffcox/sterling-svelte/css/sterling.css';
```

2. Optional - Support light/dark/auto modes

```svelte
<script lang="ts">
  import { applyLightDarkMode } from '@geoffcox/sterling-svelte';

  // For example, we use a variable to track which mode the user prefers.
  // Other UI can allow the use to change the mode.
  let mode = 'auto';
</script>

<div
  use:applyLightDarkMode={{
    atDocumentRoot: true,
    mode: mode === 'auto' ? 'auto' : mode === 'dark' ? 'dark' : 'light'
  }}
>
  <!-- ... -->
</div>
```

## 3. Add components

You can import components from svelte files under `*.svelte` (recommended) or from the library root.

```svelte
<script>
  import Button from '@geoffcox/sterling-svelte/Button.svelte';
  import { Checkbox } from '@geoffcox/sterling-svelte';
</script>

<div>
  <Button>Hello sterling-svelte</Button>
  <Checkbox>Ready</Checkbox>
</div>
```
