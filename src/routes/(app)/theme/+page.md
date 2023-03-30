# Theme

Each theme consists of a set of CSS variables.
Components use these in styles to follow the theme and respond to theme changes.
Each CSS variable that is a part of the sterling-svelte design is prefixed with stsv.

<script>
    import PaletteExample from './NeutralColorsExample.svelte';
    import Swatch from './Swatch.svelte';
</script>

## Common

These are typically used for the page and containers like lists and trees.

<Swatch 
backgroundColor="--stsv-Common__background-color" 
borderColor="--stsv-Common__border-color"
borderRadius="--stsv-Common__border-radius"
borderStyle="--stsv-Common__border-style"
borderWidth="--stsv-Common__border-width"
color="--stsv-Common__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--hover" 
borderColor="--stsv-Common__border-color--hover"
borderRadius="--stsv-Common__border-radius"
borderStyle="--stsv-Common__border-style"
borderWidth="--stsv-Common__border-width"
color="--stsv-Common__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--focus" 
borderColor="--stsv-Common__border-color--focus"
borderRadius="--stsv-Common__border-radius"
borderStyle="--stsv-Common__border-style"
borderWidth="--stsv-Common__border-width"
color="--stsv-Common__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--disabled" 
borderColor="--stsv-Common__border-color--disabled"
borderRadius="--stsv-Common__border-radius"
borderStyle="--stsv-Common__border-style"
borderWidth="--stsv-Common__border-width"
color="--stsv-Common__color--disabled"
/>
<br/>
<Swatch 
outlineColor="--stsv-Common__outline-color"
outlineOffset="--stsv-Common__outline-offset"
outlineStyle="--stsv-Common__outline-style"
outlineWidth="--stsv-Common__outline-width"
/>

## Button

These are used for clickable buttons that take action.

<Swatch 
backgroundColor="--stsv-Button__background-color" 
borderColor="--stsv-Button__border-color"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Button__background-color--hover" 
borderColor="--stsv-Button__border-color--hover"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Button__background-color--active" 
borderColor="--stsv-Button__border-color--active"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button__color--active"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Button__background-color--focus" 
borderColor="--stsv-Button__border-color--focus"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Button__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--disabled" 
borderColor="--stsv-Common__border-color--disabled"
borderRadius="--stsv-Button__border-radius"
borderStyle="--stsv-Button__border-style"
borderWidth="--stsv-Button__border-width"
color="--stsv-Common__color--disabled"
/>

## Input

These are used with interactive controls that take input such as checkboxes, inputs, and radio buttons.

<Swatch 
backgroundColor="--stsv-Input__background-color" 
borderColor="--stsv-Input__border-color"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input__color"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Input__background-color--hover" 
borderColor="--stsv-Input__border-color--hover"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Input__background-color--focus" 
borderColor="--stsv-Input__border-color--focus"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Input__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--stsv-Common__background-color--disabled" 
borderColor="--stsv-Common__border-color--disabled"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Common__color--disabled"
/>

## Display

These are used for non-interactive content and status such as labels and progress bars.

<Swatch 
backgroundColor="--stsv-Display__background-color" 
borderColor="--stsv-Display__border-color"
borderRadius="--stsv-Input__border-radius"
borderStyle="--stsv-Input__border-style"
borderWidth="--stsv-Input__border-width"
color="--stsv-Display__color"
/>
<br/>
<Swatch 
color="--stsv-Display__color--subtle"
/>
<br/>
<Swatch 
color="--stsv-Display__color--faint"
/>
<br/>
<Swatch 
color="--stsv-Display__color--disabled"
/>
<br/>

## Status colors

Several colors can be used to give meaning to status.

<Swatch
backgroundColor="--stsv-Info__background-color"
borderColor="--stsv-Info__border-color"
color="--stsv-Info__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-Success__background-color"
borderColor="--stsv-Success__border-color"
color="--stsv-Success__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-Warning__background-color"
borderColor="--stsv-Warning__border-color"
color="--stsv-Warning__color"
/>
<br/>
<Swatch
backgroundColor="--stsv-Error__background-color"
borderColor="--stsv-Error__border-color"
color="--stsv-Error__color"
/>
<br/>

## Layers

Layers can be used to distinguish areas of the UI.

<Swatch 
backgroundColor="--stsv-Layer__background-color--1" 
color="--stsv-Layer__color--1"
/>

<Swatch 
backgroundColor="--stsv-Layer__background-color--2" 
color="--stsv-Layer__color--2"
/>

<Swatch 
backgroundColor="--stsv-Layer__background-color--3" 
color="--stsv-Layer__color--3"
/>

## Neutral Colors

The built-in dark and light themes use these neutral colors.

<PaletteExample />

## Basic Usage

You can apply a theme with `use:theme`.

```
<div use:theme={{theme: myTheme}}>
  <!-- Components go here -->
</div>
```

You can directly use either of the built-in themes with `use:lightTheme` or `use:darkTheme`.

```
<div use:lightTheme>
	<!-- Components go here -->
</div>
```

```
<div use:darkTheme>
  <!-- Components go here -->
</div>
```

## Toggling between Light and Dark

You can toggle between the light and dark themes with `use:toggleDarkTheme`.
This will automatically follow the OS/browser light or dark theme setting.

```
<div use:toggleDarkTheme>
  <!-- Components go here -->
</div>
```

You can also provide the dark value to directly control the toggling.

```
<div use:toggleDarkTheme={{dark: myToggleValue}}>
  <!-- Components go here -->
</div>
```

## Applying to Document Root

Applying a theme to an element within the body may cause the document element
colors to not match. This often appears as a mismatched background color on the page
when the user scrolls to the top or bottom of the document.

You can apply a theme to the root docment element with any of the theme actions.

```
<div use:theme={{theme: myTheme, atDocumentRoot: true}}>
  <!-- Components go here -->
</div>
```

```
<div use:toggleDarkTheme={atDocumentRoot: true}}>
  <!-- Components go here -->
</div>
```

# Creating a Custom Theme

You can create a custom theme by defining a map of CSS variables to color value.

To allow components to conform to your theme, be sure to define a value for each
CSS variable defined in either the `lightTheme` or `darkTheme`.

```ts
import type { CSSVarSet } from '@geoffcox/sterling-svelte';

export const myTheme: Theme = {
  '--stsv-Common__background-color': '#fff',
  '--stsv-Common__border-color': '#222',
  //...
```

If you want to make using your theme easier, you can write a Svelte action.

```ts
export const applyMyTheme = (node: HTMLElement, params?: Omit<ThemeActionParams, 'theme'>) => {
  return applyTheme(node, { ...params, theme: myTheme });
};
```

```
<div use:applyMyTheme>
  <!-- Components go here -->
</div>
```
