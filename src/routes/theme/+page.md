# Theme

Each theme consists of a set of CSS variables.
Components use these in styles to follow the theme and respond to theme changes.

<script>
    import ThemeExample from './ThemeExample.svelte';
    import PaletteExample from './NeutralColorsExample.svelte';
    import Swatch from './Swatch.svelte';
    import OutlineSwatch from './OutlineSwatch.svelte';
    import DisplaySwatch from './DisplaySwatch.svelte';
</script>

## Common

These are typically used for the page, containers, and lists.

<Swatch 
backgroundColor="--Common__background-color" 
borderColor="--Common__border-color"
borderRadius="--Common__border-radius"
borderStyle="--Common__border-style"
borderWidth="--Common__border-width"
color="--Common__color"
/>
<br/>
<Swatch 
backgroundColor="--Common__background-color--hover" 
borderColor="--Common__border-color--hover"
borderRadius="--Common__border-radius"
borderStyle="--Common__border-style"
borderWidth="--Common__border-width"
color="--Common__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--Common__background-color--focus" 
borderColor="--Common__border-color--focus"
borderRadius="--Common__border-radius"
borderStyle="--Common__border-style"
borderWidth="--Common__border-width"
color="--Common__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--Common__background-color--disabled" 
borderColor="--Common__border-color--disabled"
borderRadius="--Common__border-radius"
borderStyle="--Common__border-style"
borderWidth="--Common__border-width"
color="--Common__color--disabled"
/>
<br/>
<OutlineSwatch 
outlineColor="--Common__outline-color"
outlineOffset="--Common__outline-offset"
outlineStyle="--Common__outline-style"
outlineWidth="--Common__outline-width"
/>

## Button

These are used for clickable buttons that take action.

<Swatch 
backgroundColor="--Button__background-color" 
borderColor="--Button__border-color"
borderRadius="--Button__border-radius"
borderStyle="--Button__border-style"
borderWidth="--Button__border-width"
color="--Button__color"
/>
<br/>
<Swatch 
backgroundColor="--Button__background-color--hover" 
borderColor="--Button__border-color--hover"
borderRadius="--Button__border-radius"
borderStyle="--Button__border-style"
borderWidth="--Button__border-width"
color="--Button__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--Button__background-color--active" 
borderColor="--Button__border-color--active"
borderRadius="--Button__border-radius"
borderStyle="--Button__border-style"
borderWidth="--Button__border-width"
color="--Button__color--active"
/>
<br/>
<Swatch 
backgroundColor="--Button__background-color--focus" 
borderColor="--Button__border-color--focus"
borderRadius="--Button__border-radius"
borderStyle="--Button__border-style"
borderWidth="--Button__border-width"
color="--Button__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--Button__background-color--disabled" 
borderColor="--Button__border-color--disabled"
borderRadius="--Button__border-radius"
borderStyle="--Button__border-style"
borderWidth="--Button__border-width"
color="--Button__color--disabled"
/>

## Input

These are used with interactive controls that take input such as checkboxes, inputs, and radio buttons.

<Swatch 
backgroundColor="--Input__background-color" 
borderColor="--Input__border-color"
borderRadius="--Input__border-radius"
borderStyle="--Input__border-style"
borderWidth="--Input__border-width"
color="--Input__color"
/>
<br/>
<Swatch 
backgroundColor="--Input__background-color--hover" 
borderColor="--Input__border-color--hover"
borderRadius="--Input__border-radius"
borderStyle="--Input__border-style"
borderWidth="--Input__border-width"
color="--Input__color--hover"
/>
<br/>
<Swatch 
backgroundColor="--Input__background-color--focus" 
borderColor="--Input__border-color--focus"
borderRadius="--Input__border-radius"
borderStyle="--Input__border-style"
borderWidth="--Input__border-width"
color="--Input__color--focus"
/>
<br/>
<Swatch 
backgroundColor="--Input__background-color--disabled" 
borderColor="--Input__border-color--disabled"
borderRadius="--Input__border-radius"
borderStyle="--Input__border-style"
borderWidth="--Input__border-width"
color="--Input__color--disabled"
/>

## Display

These are used for non-interactive content and status such as labels and progress bars.

<Swatch 
backgroundColor="--Display__background-color" 
borderColor="--Display__border-color"
borderRadius="--Input__border-radius"
borderStyle="--Input__border-style"
borderWidth="--Input__border-width"
color="--Display__color"
/>
<br/>
<DisplaySwatch 
color="--Display__color--subtle"
/>
<DisplaySwatch 
color="--Display__color--faint"
/>

<DisplaySwatch 
color="--Display__color--disabled"
/>

Several colors can be used to give meaning to state.

<DisplaySwatch 
color="--Display__color--info"
/>
<DisplaySwatch 
color="--Display__color--progress"
/>
<DisplaySwatch 
color="--Display__color--success"
/>
<DisplaySwatch 
color="--Display__color--warning"
/>
<DisplaySwatch 
color="--Display__color--error"
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

> To allow components to conform to your theme, be sure to define a value for each CSS variable defined in either the `lightTheme` or `darkTheme`.

```ts
import type { CSSVarSet } from '@geoffcox/sterling-svelte';

export const myTheme: Theme = {
  '--Common__background-color': '#fff',
  '--Common__border-color': '#222',
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
